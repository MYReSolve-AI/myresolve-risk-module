import {
  ORGANISATION_PROFILE_SCHEMA_VERSION,
  createEmptyOrganisationProfile,
  type OrganisationProfile,
  type OperatingModel,
} from "@/src/domain/organisationProfile";
import {
  OPERATING_MODEL_IDS,
  coerceLegacyOperatingModelId,
  migrateSingularOperatingModel,
  sanitiseOperatingModelOther,
} from "@/src/domain/organisationProfile/options";

/** Separate from assessment answer storage (`myresolve_answers_v03`). */
export const ORGANISATION_PROFILE_STORAGE_KEY =
  "myresolve_organisation_profile_v1" as const;

export type OrganisationProfileSaveStatus =
  | "idle"
  | "saving"
  | "saved"
  | "error";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function uniqueValidModels(ids: unknown[]): OperatingModel[] {
  const out: OperatingModel[] = [];
  for (const raw of ids) {
    const id =
      typeof raw === "string" &&
      (OPERATING_MODEL_IDS as readonly string[]).includes(raw)
        ? (raw as OperatingModel)
        : coerceLegacyOperatingModelId(raw);
    if (id && !out.includes(id)) out.push(id);
  }
  return out;
}

/**
 * Load-time normaliser (PO-3 / Correction 2).
 * - Accepts legacy schemaVersion 1 singular `operatingModel`
 * - Known equivalents → A1 id; unmappable non-empty → other + sanitised text
 * - Emits / saves schemaVersion 2 only
 * - Unknown future versions → empty profile (non-destructive to assessment key)
 */
export function normaliseOrganisationProfile(
  raw: unknown,
): OrganisationProfile {
  const empty = createEmptyOrganisationProfile();
  if (!isObject(raw)) return empty;

  const version = Number(raw.schemaVersion);
  if (!Number.isFinite(version) || version > ORGANISATION_PROFILE_SCHEMA_VERSION) {
    return empty;
  }

  const opsRaw = isObject(raw.operations) ? raw.operations : {};
  let operatingModels: OperatingModel[] = [];
  let operatingModelOther = "";

  if (Array.isArray(opsRaw.operatingModels)) {
    operatingModels = uniqueValidModels(opsRaw.operatingModels);
    if (typeof opsRaw.operatingModelOther === "string") {
      operatingModelOther = sanitiseOperatingModelOther(
        opsRaw.operatingModelOther,
      );
    }
  } else if ("operatingModel" in opsRaw) {
    const migrated = migrateSingularOperatingModel(opsRaw.operatingModel);
    operatingModels = migrated.operatingModels;
    operatingModelOther = migrated.operatingModelOther;
  } else if (typeof opsRaw.operatingModelOther === "string") {
    operatingModelOther = sanitiseOperatingModelOther(
      opsRaw.operatingModelOther,
    );
  }

  if (!operatingModels.includes("other")) {
    operatingModelOther = "";
  } else {
    operatingModelOther = sanitiseOperatingModelOther(operatingModelOther);
  }

  const opsRest: Record<string, unknown> = { ...opsRaw };
  delete opsRest.operatingModel;
  delete opsRest.operatingModels;
  delete opsRest.operatingModelOther;

  const organisationRaw = isObject(raw.organisation) ? raw.organisation : {};
  const customersRaw = isObject(raw.customers) ? raw.customers : {};
  const peopleRaw = isObject(raw.people) ? raw.people : {};
  const financeRaw = isObject(raw.finance) ? raw.finance : {};
  const prioritiesRaw = isObject(raw.strategicPriorities)
    ? raw.strategicPriorities
    : {};

  const completedAt =
    typeof raw.completedAt === "string" &&
    Number.isFinite(Date.parse(raw.completedAt))
      ? raw.completedAt
      : null;

  return {
    ...empty,
    schemaVersion: ORGANISATION_PROFILE_SCHEMA_VERSION,
    organisation: {
      ...empty.organisation,
      ...organisationRaw,
      name:
        typeof organisationRaw.name === "string"
          ? organisationRaw.name
          : empty.organisation.name,
      industry:
        typeof organisationRaw.industry === "string"
          ? organisationRaw.industry
          : empty.organisation.industry,
      country:
        typeof organisationRaw.country === "string"
          ? organisationRaw.country
          : empty.organisation.country,
    },
    customers: {
      ...empty.customers,
      ...customersRaw,
    },
    operations: {
      ...empty.operations,
      ...opsRest,
      operatingModels,
      operatingModelOther,
    },
    people: {
      ...empty.people,
      ...peopleRaw,
    },
    finance: {
      ...empty.finance,
      ...financeRaw,
      costPressures: Array.isArray(financeRaw.costPressures)
        ? financeRaw.costPressures
        : [],
    },
    strategicPriorities: {
      ...empty.strategicPriorities,
      ...prioritiesRaw,
    },
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : null,
    completedAt,
  } as OrganisationProfile;
}

export function loadOrganisationProfile(): OrganisationProfile {
  if (typeof window === "undefined") {
    return createEmptyOrganisationProfile();
  }
  try {
    const raw = window.localStorage.getItem(ORGANISATION_PROFILE_STORAGE_KEY);
    if (!raw) return createEmptyOrganisationProfile();
    return normaliseOrganisationProfile(JSON.parse(raw));
  } catch {
    return createEmptyOrganisationProfile();
  }
}

export function saveOrganisationProfile(profile: OrganisationProfile): void {
  if (typeof window === "undefined") return;
  const models = Array.from(new Set(profile.operations.operatingModels));
  const other = models.includes("other")
    ? sanitiseOperatingModelOther(profile.operations.operatingModelOther)
    : "";
  const payload: OrganisationProfile = {
    ...profile,
    schemaVersion: ORGANISATION_PROFILE_SCHEMA_VERSION,
    operations: {
      ...profile.operations,
      operatingModels: models,
      operatingModelOther: other,
    },
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(
    ORGANISATION_PROFILE_STORAGE_KEY,
    JSON.stringify(payload),
  );
}

export function clearOrganisationProfile(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ORGANISATION_PROFILE_STORAGE_KEY);
}
