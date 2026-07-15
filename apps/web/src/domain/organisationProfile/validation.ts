import { ORGANISATION_PROFILE_SCHEMA_VERSION } from "./types";
import { PROFILE_FIELDS, type ProfileFieldPath } from "./fields";
import type { OrganisationProfile, OperatingModel } from "./types";

function getValueAtPath(
  profile: OrganisationProfile,
  path: ProfileFieldPath,
): unknown {
  const [root, leaf] = path.split(".") as [keyof OrganisationProfile, string];
  const section = profile[root];
  if (!section || typeof section !== "object") return undefined;
  return (section as unknown as Record<string, unknown>)[leaf];
}

export function isFieldFilled(
  profile: OrganisationProfile,
  path: ProfileFieldPath,
): boolean {
  const value = getValueAtPath(profile, path);
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return Number.isFinite(value);
  if (Array.isArray(value)) return value.length > 0;
  return false;
}

function otherDescriptionRequired(profile: OrganisationProfile): boolean {
  return profile.operations.operatingModels.includes("other");
}

export function missingRequiredFields(
  profile: OrganisationProfile,
): ProfileFieldPath[] {
  const missing = PROFILE_FIELDS.filter((f) => {
    if (f.path === "operations.operatingModelOther") {
      return (
        otherDescriptionRequired(profile) &&
        !isFieldFilled(profile, "operations.operatingModelOther")
      );
    }
    return f.governance === "required" && !isFieldFilled(profile, f.path);
  }).map((f) => f.path);

  return missing;
}

/** Required + conditional fields only — does not imply explicit completion. */
export function areProfileFieldsComplete(
  profile: OrganisationProfile,
): boolean {
  return missingRequiredFields(profile).length === 0;
}

export function isCurrentProfileSchema(
  profile: OrganisationProfile,
): boolean {
  return profile.schemaVersion === ORGANISATION_PROFILE_SCHEMA_VERSION;
}

/** Valid ISO-8601 (or Date-parseable) completion timestamp. */
export function hasValidCompletedAt(value: unknown): boolean {
  if (typeof value !== "string" || !value.trim()) return false;
  const ms = Date.parse(value);
  return Number.isFinite(ms);
}

/**
 * Authoritative completed-profile condition for gates, Company display,
 * and other downstream consumers:
 * - current schema is valid
 * - all required and conditional fields are complete
 * - completedAt contains a valid completion timestamp
 */
export function isProfileComplete(profile: OrganisationProfile): boolean {
  return (
    isCurrentProfileSchema(profile) &&
    areProfileFieldsComplete(profile) &&
    hasValidCompletedAt(profile.completedAt)
  );
}

export type FieldValidationIssue = {
  path: ProfileFieldPath;
  message: string;
};

/** Soft validation — numbers in sensible ranges where relevant */
export function validateFieldValue(
  path: ProfileFieldPath,
  value: unknown,
): FieldValidationIssue | null {
  if (value === null || value === undefined || value === "") return null;

  if (path === "operations.operatingModels" && Array.isArray(value)) {
    if (value.length === 0) {
      return {
        path,
        message: "Select at least one operating model.",
      };
    }
  }

  if (path === "operations.operatingModelOther" && typeof value === "string") {
    if (value.trim().length > 200) {
      return {
        path,
        message: "Keep the description to a short phrase (max 200 characters).",
      };
    }
  }

  const percentPaths: ProfileFieldPath[] = [
    "customers.customerRetentionPercent",
    "customers.serviceLevelPercent",
    "customers.complaintRatePercent",
    "operations.capacityUtilisationPercent",
    "people.employeeTurnoverPercent",
    "people.absenceRatePercent",
    "people.engagementScore",
  ];

  if (percentPaths.includes(path) && typeof value === "number") {
    if (value < 0 || value > 100) {
      return { path, message: "Enter a percentage between 0 and 100." };
    }
  }

  if (path === "customers.nps" && typeof value === "number") {
    if (value < -100 || value > 100) {
      return { path, message: "NPS is typically between -100 and 100." };
    }
  }

  if (
    (path === "organisation.operatingLocations" ||
      path === "operations.sitesOrWarehouses" ||
      path === "operations.weeklyTransactions" ||
      path === "customers.activeCustomers" ||
      path === "people.totalHeadcount" ||
      path === "people.leadershipTeamSize") &&
    typeof value === "number" &&
    value < 0
  ) {
    return { path, message: "Enter a non-negative number." };
  }

  return null;
}

export function hasOperatingModel(
  profile: OrganisationProfile,
  id: OperatingModel,
): boolean {
  return profile.operations.operatingModels.includes(id);
}
