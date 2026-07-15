import {
  ORGANISATION_PROFILE_SCHEMA_VERSION,
  type OrganisationProfile,
} from "./types";

export function createEmptyOrganisationProfile(): OrganisationProfile {
  return {
    schemaVersion: ORGANISATION_PROFILE_SCHEMA_VERSION,
    organisation: {
      name: "",
      industry: "",
      country: "",
      employeeBand: "",
      annualRevenueBand: "",
      operatingLocations: null,
      growthStage: "",
    },
    customers: {
      customerType: "",
      activeCustomers: null,
      nps: null,
      customerRetentionPercent: null,
      serviceLevelPercent: null,
      complaintRatePercent: null,
    },
    operations: {
      operatingModels: [],
      operatingModelOther: "",
      sitesOrWarehouses: null,
      weeklyTransactions: null,
      outsourcedOperations: "",
      capacityUtilisationPercent: null,
      primaryConstraint: "",
    },
    people: {
      totalHeadcount: null,
      leadershipTeamSize: null,
      employeeTurnoverPercent: null,
      absenceRatePercent: null,
      engagementScore: null,
    },
    finance: {
      annualRevenueBand: "",
      ebitdaMarginBand: "",
      costPressures: [],
    },
    strategicPriorities: {
      priority1: "",
      priority2: "",
      priority3: "",
      biggestConcern: "",
      successIn12Months: "",
      greatestValueArea: "",
    },
    updatedAt: null,
    completedAt: null,
  };
}
