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
  help: string;
};

export const PROFILE_FIELDS: readonly ProfileFieldDefinition[] = [
  // Organisation — required
  {
    path: "organisation.name",
    sectionId: "organisation",
    label: "Company name",
    governance: "required",
    help: "Enter the company name your leaders and teams use day to day.",
  },
  {
    path: "organisation.industry",
    sectionId: "organisation",
    label: "Industry",
    governance: "required",
    help: "Choose the main sector your company operates in.",
  },
  {
    path: "organisation.country",
    sectionId: "organisation",
    label: "Country",
    governance: "required",
    help: "Enter the main country where the company is based or managed.",
  },
  {
    path: "organisation.employeeBand",
    sectionId: "organisation",
    label: "Number of employees",
    governance: "required",
    help: "Select the band that best reflects your current workforce size.",
  },
  {
    path: "organisation.annualRevenueBand",
    sectionId: "organisation",
    label: "Company size by annual revenue",
    governance: "required",
    help: "Use the most recent full-year revenue band. An exact figure is not needed.",
  },
  {
    path: "organisation.operatingLocations",
    sectionId: "organisation",
    label: "Number of sites",
    governance: "required",
    help: "Include the offices, stores, depots, warehouses or other sites you operate.",
  },
  {
    path: "organisation.growthStage",
    sectionId: "organisation",
    label: "Growth stage",
    governance: "required",
    help: "Select the description that best matches the company today.",
  },

  // Customers — recommended / optional
  {
    path: "customers.customerType",
    sectionId: "customers",
    label: "Customer type",
    governance: "recommended",
    help: "Tell us whether you mainly serve businesses, consumers or a mixture of both.",
  },
  {
    path: "customers.activeCustomers",
    sectionId: "customers",
    label: "Number of active customers",
    governance: "recommended",
    help: "Enter the approximate number of customers currently buying from or using the company.",
  },
  {
    path: "customers.nps",
    sectionId: "customers",
    label: "NPS",
    governance: "optional",
    help: "Enter your latest Net Promoter Score, if measured. It shows how likely customers are to recommend you.",
  },
  {
    path: "customers.customerRetentionPercent",
    sectionId: "customers",
    label: "Customer retention or repeat purchase rate",
    governance: "recommended",
    help: "Use the percentage of customers who stay or buy again during your normal reporting period.",
  },
  {
    path: "customers.serviceLevelPercent",
    sectionId: "customers",
    label: "OTIF or service level",
    governance: "optional",
    help: "Enter the latest percentage delivered on time and in full, or within your service commitment.",
  },
  {
    path: "customers.complaintRatePercent",
    sectionId: "customers",
    label: "Complaint rate",
    governance: "optional",
    help: "Enter your latest measured complaint rate using the same period as your usual reporting.",
  },

  // Operations
  {
    path: "operations.operatingModels",
    sectionId: "operations",
    label: "Which operating models apply?",
    governance: "required",
    help: "Select every operating model used to deliver products or services to customers.",
  },
  {
    path: "operations.operatingModelOther",
    sectionId: "operations",
    label: "Please describe the other operating model",
    governance: "optional",
    help: "Describe the additional operating model in a short phrase.",
  },
  {
    path: "operations.sitesOrWarehouses",
    sectionId: "operations",
    label: "Number of sites or warehouses",
    governance: "recommended",
    help: "Enter the current number of operational sites, warehouses, stores, depots or service locations.",
  },
  {
    path: "operations.weeklyTransactions",
    sectionId: "operations",
    label: "Deliveries, orders or transactions per week",
    governance: "recommended",
    help: "Use a typical week and include the main unit of work, such as orders, deliveries, cases or calls.",
  },
  {
    path: "operations.outsourcedOperations",
    sectionId: "operations",
    label: "Outsourced operations",
    governance: "recommended",
    help: "Tell us whether any important operational activity is delivered by an external partner.",
  },
  {
    path: "operations.capacityUtilisationPercent",
    sectionId: "operations",
    label: "Capacity utilisation",
    governance: "optional",
    help: "This is how much of your available capacity is currently being used. For example, 75% means roughly one quarter remains available.",
  },
  {
    path: "operations.primaryConstraint",
    sectionId: "operations",
    label: "What is currently holding your operation back most?",
    governance: "recommended",
    help: "Name the main bottleneck limiting performance, customer service or growth today.",
  },

  // People
  {
    path: "people.totalHeadcount",
    sectionId: "people",
    label: "Total headcount",
    governance: "required",
    help: "Enter the total number of people currently working in the company.",
  },
  {
    path: "people.leadershipTeamSize",
    sectionId: "people",
    label: "Leadership team size",
    governance: "recommended",
    help: "Enter the number of people who form the main leadership or executive team.",
  },
  {
    path: "people.employeeTurnoverPercent",
    sectionId: "people",
    label: "Employee turnover",
    governance: "recommended",
    help: "Enter the percentage of employees who left during the most recent 12-month period.",
  },
  {
    path: "people.absenceRatePercent",
    sectionId: "people",
    label: "Absence rate",
    governance: "optional",
    help: "Enter the latest percentage of working time lost to employee absence.",
  },
  {
    path: "people.engagementScore",
    sectionId: "people",
    label: "Engagement score",
    governance: "optional",
    help: "Enter your latest employee engagement score if you use a 0–100 measure.",
  },

  // Finance
  {
    path: "finance.annualRevenueBand",
    sectionId: "finance",
    label: "Annual revenue band",
    governance: "optional",
    help: "Use this only if the finance view needs a more current revenue band than the company overview.",
  },
  {
    path: "finance.ebitdaMarginBand",
    sectionId: "finance",
    label: "EBITDA margin band",
    governance: "recommended",
    help: "Choose the latest margin band before interest, tax, depreciation and amortisation.",
  },
  {
    path: "finance.costPressures",
    sectionId: "finance",
    label: "Major cost pressures",
    governance: "recommended",
    help: "Select the cost areas creating the greatest pressure on performance or margin.",
  },

  // Strategic priorities
  {
    path: "strategicPriorities.priority1",
    sectionId: "priorities",
    label: "Strategic priority 1",
    governance: "required",
    help: "Enter the first priority from your current company strategy, annual plan or leadership agenda.",
  },
  {
    path: "strategicPriorities.priority2",
    sectionId: "priorities",
    label: "Strategic priority 2",
    governance: "required",
    help: "Enter the second priority from your current company strategy, annual plan or leadership agenda.",
  },
  {
    path: "strategicPriorities.priority3",
    sectionId: "priorities",
    label: "Strategic priority 3",
    governance: "required",
    help: "Enter the third priority from your current company strategy, annual plan or leadership agenda.",
  },
  {
    path: "strategicPriorities.biggestConcern",
    sectionId: "priorities",
    label: "Biggest concern today",
    governance: "required",
    help: "Describe the issue leadership is most concerned could prevent the strategy being delivered.",
  },
  {
    path: "strategicPriorities.successIn12Months",
    sectionId: "priorities",
    label: "What success looks like in 12 months",
    governance: "required",
    help: "Describe the clear result leaders want the company to have achieved within the next year.",
  },
  {
    path: "strategicPriorities.greatestValueArea",
    sectionId: "priorities",
    label: "Area that would create the greatest value if improved",
    governance: "required",
    help: "Name the area where improvement would make the biggest difference to customers, people, performance or value.",
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
