import {
  PROFILE_FIELDS,
  fieldsForSection,
  type ProfileFieldPath,
} from "./fields";
import {
  areProfileFieldsComplete,
  isFieldFilled,
  isProfileComplete,
} from "./validation";
import type {
  OrganisationProfile,
  ProfileCompletionStatus,
  ProfileCompletionSummary,
  ProfileSectionId,
} from "./types";

const SECTION_ORDER: ProfileSectionId[] = [
  "organisation",
  "customers",
  "operations",
  "people",
  "finance",
  "priorities",
];

function requiredPathsForProfile(
  profile: OrganisationProfile,
): ProfileFieldPath[] {
  return PROFILE_FIELDS.filter((f) => {
    if (f.path === "operations.operatingModelOther") {
      return profile.operations.operatingModels.includes("other");
    }
    return f.governance === "required";
  }).map((f) => f.path);
}

export function getSectionCompletion(
  profile: OrganisationProfile,
  sectionId: ProfileSectionId,
): ProfileCompletionStatus {
  const fields = fieldsForSection(sectionId);
  const required = fields.filter((f) => {
    if (f.path === "operations.operatingModelOther") {
      return profile.operations.operatingModels.includes("other");
    }
    return f.governance === "required";
  });
  const recommended = fields.filter((f) => f.governance === "recommended");
  const requiredComplete = required.filter((f) =>
    isFieldFilled(profile, f.path),
  ).length;
  const recommendedComplete = recommended.filter((f) =>
    isFieldFilled(profile, f.path),
  ).length;

  return {
    sectionId,
    requiredTotal: required.length,
    requiredComplete,
    recommendedTotal: recommended.length,
    recommendedComplete,
    isSectionComplete:
      required.length === 0 || requiredComplete === required.length,
  };
}

export function getProfileCompletion(
  profile: OrganisationProfile,
): ProfileCompletionSummary {
  const sections = SECTION_ORDER.map((id) => getSectionCompletion(profile, id));
  const requiredPaths = requiredPathsForProfile(profile);
  const requiredTotal = requiredPaths.length;
  const requiredComplete = requiredPaths.filter((path) =>
    isFieldFilled(profile, path),
  ).length;
  const percentComplete =
    requiredTotal === 0
      ? 100
      : Math.round((requiredComplete / requiredTotal) * 100);

  return {
    sections,
    requiredTotal,
    requiredComplete,
    fieldsComplete: areProfileFieldsComplete(profile),
    isComplete: isProfileComplete(profile),
    percentComplete,
  };
}

export { SECTION_ORDER };
