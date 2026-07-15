import type { FieldGovernance, ProfileSectionId } from "./types";

export type ProfileFieldPath =
  | "organisation.name"
  | "organisation.industry"
  | "organisation.country"
  | "organisation.employeeBand"
  | "organisation.annualRevenueBand"
  | "organisation.operatingLocations"
  | "organisation.growthStage"
  | "customers.customerType"
  | "customers.activeCustomers"
  | "customers.nps"
  | "customers.customerRetentionPercent"
  | "customers.serviceLevelPercent"
  | "customers.complaintRatePercent"
  | "operations.operatingModels"
  | "operations.operatingModelOther"
  | "operations.sitesOrWarehouses"
  | "operations.weeklyTransactions"
  | "operations.outsourcedOperations"
  | "operations.capacityUtilisationPercent"
  | "operations.primaryConstraint"
  | "people.totalHeadcount"
  | "people.leadershipTeamSize"
  | "people.employeeTurnoverPercent"
  | "people.absenceRatePercent"
  | "people.engagementScore"
  | "finance.annualRevenueBand"
  | "finance.ebitdaMarginBand"
  | "finance.costPressures"
  | "strategicPriorities.priority1"
  | "strategicPriorities.priority2"
  | "strategicPriorities.priority3"
  | "strategicPriorities.biggestConcern"
  | "strategicPriorities.successIn12Months"
  | "strategicPriorities.greatestValueArea";

export type ProfileFieldDefinition = {
  path: ProfileFieldPath;
  sectionId: ProfileSectionId;
  label: string;
  governance: FieldGovernance;
  help?: string;
};

export const PROFILE_FIELDS: readonly ProfileFieldDefinition[] = [
  // Organisation — required
  {
    path: "organisation.name",
    sectionId: "organisation",
    label: "Organisation name",
    governance: "required",
  },
  {
    path: "organisation.industry",
    sectionId: "organisation",
    label: "Industry",
    governance: "required",
  },
  {
    path: "organisation.country",
    sectionId: "organisation",
    label: "Country",
    governance: "required",
  },
  {
    path: "organisation.employeeBand",
    sectionId: "organisation",
    label: "Number of employees",
    governance: "required",
  },
  {
    path: "organisation.annualRevenueBand",
    sectionId: "organisation",
    label: "Annual revenue band",
    governance: "required",
  },
  {
    path: "organisation.operatingLocations",
    sectionId: "organisation",
    label: "Number of operating locations",
    governance: "required",
  },
  {
    path: "organisation.growthStage",
    sectionId: "organisation",
    label: "Growth stage",
    governance: "required",
  },

  // Customers — recommended / optional
  {
    path: "customers.customerType",
    sectionId: "customers",
    label: "Customer type",
    governance: "recommended",
  },
  {
    path: "customers.activeCustomers",
    sectionId: "customers",
    label: "Number of active customers",
    governance: "recommended",
  },
  {
    path: "customers.nps",
    sectionId: "customers",
    label: "NPS",
    governance: "optional",
    help: "Net Promoter Score, if measured",
  },
  {
    path: "customers.customerRetentionPercent",
    sectionId: "customers",
    label: "Customer retention",
    governance: "recommended",
  },
  {
    path: "customers.serviceLevelPercent",
    sectionId: "customers",
    label: "OTIF or service level",
    governance: "optional",
  },
  {
    path: "customers.complaintRatePercent",
    sectionId: "customers",
    label: "Complaint rate",
    governance: "optional",
  },

  // Operations
  {
    path: "operations.operatingModels",
    sectionId: "operations",
    label: "Which operating models apply?",
    governance: "required",
    help: "Select all that apply.",
  },
  {
    path: "operations.operatingModelOther",
    sectionId: "operations",
    label: "Please describe the other operating model",
    governance: "optional",
    help: "Required when Other is selected.",
  },
  {
    path: "operations.sitesOrWarehouses",
    sectionId: "operations",
    label: "Number of sites or warehouses",
    governance: "recommended",
  },
  {
    path: "operations.weeklyTransactions",
    sectionId: "operations",
    label: "Deliveries, orders or transactions per week",
    governance: "recommended",
  },
  {
    path: "operations.outsourcedOperations",
    sectionId: "operations",
    label: "Outsourced operations",
    governance: "recommended",
  },
  {
    path: "operations.capacityUtilisationPercent",
    sectionId: "operations",
    label: "Capacity utilisation",
    governance: "optional",
  },
  {
    path: "operations.primaryConstraint",
    sectionId: "operations",
    label: "Primary operational constraint",
    governance: "recommended",
  },

  // People
  {
    path: "people.totalHeadcount",
    sectionId: "people",
    label: "Total headcount",
    governance: "required",
  },
  {
    path: "people.leadershipTeamSize",
    sectionId: "people",
    label: "Leadership team size",
    governance: "recommended",
  },
  {
    path: "people.employeeTurnoverPercent",
    sectionId: "people",
    label: "Employee turnover",
    governance: "recommended",
  },
  {
    path: "people.absenceRatePercent",
    sectionId: "people",
    label: "Absence rate",
    governance: "optional",
  },
  {
    path: "people.engagementScore",
    sectionId: "people",
    label: "Engagement score",
    governance: "optional",
    help: "If you use a 0–100 engagement measure",
  },

  // Finance
  {
    path: "finance.annualRevenueBand",
    sectionId: "finance",
    label: "Annual revenue band",
    governance: "optional",
    help: "Optional refinement — organisation revenue is already captured",
  },
  {
    path: "finance.ebitdaMarginBand",
    sectionId: "finance",
    label: "EBITDA margin band",
    governance: "recommended",
  },
  {
    path: "finance.costPressures",
    sectionId: "finance",
    label: "Major cost pressures",
    governance: "recommended",
  },

  // Strategic priorities
  {
    path: "strategicPriorities.priority1",
    sectionId: "priorities",
    label: "Strategic priority 1",
    governance: "required",
  },
  {
    path: "strategicPriorities.priority2",
    sectionId: "priorities",
    label: "Strategic priority 2",
    governance: "required",
  },
  {
    path: "strategicPriorities.priority3",
    sectionId: "priorities",
    label: "Strategic priority 3",
    governance: "required",
  },
  {
    path: "strategicPriorities.biggestConcern",
    sectionId: "priorities",
    label: "Biggest concern today",
    governance: "required",
  },
  {
    path: "strategicPriorities.successIn12Months",
    sectionId: "priorities",
    label: "What success looks like in 12 months",
    governance: "required",
  },
  {
    path: "strategicPriorities.greatestValueArea",
    sectionId: "priorities",
    label: "Area that would create the greatest value if improved",
    governance: "required",
  },
] as const;

export const PROFILE_SECTION_META: Record<
  ProfileSectionId,
  { title: string; subtitle: string }
> = {
  organisation: {
    title: "Organisation",
    subtitle: "The essentials that situate MYReSolve in your business.",
  },
  customers: {
    title: "Customers",
    subtitle: "Optional context that sharpens demand and service insight.",
  },
  operations: {
    title: "Operations",
    subtitle: "How work flows through your organisation.",
  },
  people: {
    title: "People",
    subtitle: "Leadership depth and workforce signals.",
  },
  finance: {
    title: "Finance",
    subtitle: "High-level financial context for cost and risk framing.",
  },
  priorities: {
    title: "Strategic priorities",
    subtitle: "What matters most to leadership over the next year.",
  },
};

export function fieldsForSection(sectionId: ProfileSectionId) {
  return PROFILE_FIELDS.filter((f) => f.sectionId === sectionId);
}

export function requiredFields() {
  return PROFILE_FIELDS.filter((f) => f.governance === "required");
}
