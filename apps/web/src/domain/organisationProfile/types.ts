/**
 * Organisation Profile domain types.
 * Context capture only — does not alter assessment scoring.
 */

/** Current schema after MR-ENG-004-A1 (operating models multi-select). */
export const ORGANISATION_PROFILE_SCHEMA_VERSION = 2 as const;

/** Previous deferred singular operating-model schema. */
export const ORGANISATION_PROFILE_LEGACY_SCHEMA_VERSION = 1 as const;

export type FieldGovernance = "required" | "recommended" | "optional";

export type GrowthStage =
  | "startup"
  | "growth"
  | "scale"
  | "mature"
  | "turnaround";

export type CustomerType = "b2b" | "b2c" | "mixed";

/** Stable snake_case IDs — MR-ENG-004-A1 / PO-8 */
export type OperatingModel =
  | "manufacturing"
  | "retail"
  | "ecommerce"
  | "wholesale"
  | "distribution"
  | "warehousing_fulfilment"
  | "transport_logistics"
  | "installation_field_services"
  | "repairs_aftercare"
  | "professional_services"
  | "other";

export type OutsourcedOperations = "yes" | "no" | "mixed";

export type RevenueBand =
  | "under_1m"
  | "1m_5m"
  | "5m_20m"
  | "20m_50m"
  | "50m_100m"
  | "100m_250m"
  | "250m_plus"
  | "prefer_not_to_say";

export type EbitdaMarginBand =
  | "negative"
  | "0_5"
  | "5_10"
  | "10_15"
  | "15_20"
  | "20_plus"
  | "unknown";

export type CostPressure =
  | "labour"
  | "transport"
  | "materials"
  | "technology"
  | "property"
  | "other";

export type EmployeeBand =
  | "1_10"
  | "11_50"
  | "51_200"
  | "201_500"
  | "501_1000"
  | "1001_5000"
  | "5000_plus";

export interface OrganisationDetails {
  name: string;
  industry: string;
  country: string;
  employeeBand: EmployeeBand | "";
  annualRevenueBand: RevenueBand | "";
  operatingLocations: number | null;
  growthStage: GrowthStage | "";
}

export interface CustomerProfile {
  customerType: CustomerType | "";
  activeCustomers: number | null;
  nps: number | null;
  customerRetentionPercent: number | null;
  serviceLevelPercent: number | null;
  complaintRatePercent: number | null;
}

export interface OperationsProfile {
  /** Multi-select operating models (MR-ENG-004-A1). */
  operatingModels: OperatingModel[];
  /** Required when `other` is selected; cleared when Other is removed. */
  operatingModelOther: string;
  sitesOrWarehouses: number | null;
  weeklyTransactions: number | null;
  outsourcedOperations: OutsourcedOperations | "";
  capacityUtilisationPercent: number | null;
  primaryConstraint: string;
}

export interface PeopleProfile {
  totalHeadcount: number | null;
  leadershipTeamSize: number | null;
  employeeTurnoverPercent: number | null;
  absenceRatePercent: number | null;
  engagementScore: number | null;
}

export interface FinanceProfile {
  /** Canonical revenue lives on OrganisationDetails; optional here for refinement */
  annualRevenueBand: RevenueBand | "";
  ebitdaMarginBand: EbitdaMarginBand | "";
  costPressures: CostPressure[];
}

export interface StrategicPriorities {
  priority1: string;
  priority2: string;
  priority3: string;
  biggestConcern: string;
  successIn12Months: string;
  greatestValueArea: string;
}

export interface OrganisationProfile {
  schemaVersion: typeof ORGANISATION_PROFILE_SCHEMA_VERSION;
  organisation: OrganisationDetails;
  customers: CustomerProfile;
  operations: OperationsProfile;
  people: PeopleProfile;
  finance: FinanceProfile;
  strategicPriorities: StrategicPriorities;
  updatedAt: string | null;
  completedAt: string | null;
}

export type ProfileSectionId =
  | "organisation"
  | "customers"
  | "operations"
  | "people"
  | "finance"
  | "priorities";

export interface ProfileCompletionStatus {
  sectionId: ProfileSectionId;
  requiredTotal: number;
  requiredComplete: number;
  recommendedTotal: number;
  recommendedComplete: number;
  isSectionComplete: boolean;
}

export interface ProfileCompletionSummary {
  sections: ProfileCompletionStatus[];
  requiredTotal: number;
  requiredComplete: number;
  /** Required + conditional fields only (explicit completedAt not required). */
  fieldsComplete: boolean;
  /** Authoritative: schema + fields + valid completedAt. */
  isComplete: boolean;
  percentComplete: number;
}
