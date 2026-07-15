import type { OrganisationProfile } from "@/src/domain/organisationProfile";
import { createEmptyOrganisationProfile } from "@/src/domain/organisationProfile";

/** Minimal required field set — does not set completedAt (not yet explicitly complete). */
export function fillRequiredOrganisationProfile(
  overrides: Partial<OrganisationProfile> = {},
): OrganisationProfile {
  const base = createEmptyOrganisationProfile();
  return {
    ...base,
    organisation: {
      name: "Acme Operations Ltd",
      industry: "Manufacturing",
      country: "United Kingdom",
      employeeBand: "51_200",
      annualRevenueBand: "20m_50m",
      operatingLocations: 3,
      growthStage: "growth",
    },
    operations: {
      ...base.operations,
      operatingModels: ["manufacturing"],
      operatingModelOther: "",
    },
    people: {
      ...base.people,
      totalHeadcount: 120,
    },
    strategicPriorities: {
      priority1: "Improve first-time fix",
      priority2: "Reduce cost to serve",
      priority3: "Strengthen leadership bench",
      biggestConcern: "Capacity and margin pressure",
      successIn12Months: "Stable service and clearer priorities",
      greatestValueArea: "Process discipline",
    },
    completedAt: null,
    ...overrides,
  };
}

/** Explicitly completed profile (fields complete + valid completedAt). */
export function completeOrganisationProfile(
  overrides: Partial<OrganisationProfile> = {},
): OrganisationProfile {
  return fillRequiredOrganisationProfile({
    completedAt: "2026-07-15T12:00:00.000Z",
    ...overrides,
  });
}
