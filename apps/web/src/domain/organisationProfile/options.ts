import type {
  CostPressure,
  CustomerType,
  EbitdaMarginBand,
  EmployeeBand,
  GrowthStage,
  OperatingModel,
  OutsourcedOperations,
  RevenueBand,
} from "./types";

export type SelectOption<T extends string> = {
  value: T;
  label: string;
};

export const GROWTH_STAGE_OPTIONS: SelectOption<GrowthStage>[] = [
  { value: "startup", label: "Startup" },
  { value: "growth", label: "Growth" },
  { value: "scale", label: "Scale" },
  { value: "mature", label: "Mature" },
  { value: "turnaround", label: "Turnaround" },
];

export const CUSTOMER_TYPE_OPTIONS: SelectOption<CustomerType>[] = [
  { value: "b2b", label: "B2B" },
  { value: "b2c", label: "B2C" },
  { value: "mixed", label: "Mixed" },
];

/**
 * MR-ENG-004-A1 / PO-8 stable IDs with approved display labels.
 * Labels follow Product Owner Sprint 005 decision list.
 */
export const OPERATING_MODEL_OPTIONS: SelectOption<OperatingModel>[] = [
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "wholesale", label: "Wholesale" },
  { value: "distribution", label: "Distribution" },
  { value: "warehousing_fulfilment", label: "Warehousing and fulfilment" },
  { value: "transport_logistics", label: "Transport and logistics" },
  {
    value: "installation_field_services",
    label: "Installation/field services",
  },
  { value: "repairs_aftercare", label: "Repairs/aftercare" },
  {
    value: "customer_service_contact_centre",
    label: "Customer service / contact centre",
  },
  { value: "professional_services", label: "Professional services" },
  { value: "other", label: "Other" },
];

export const OPERATING_MODEL_IDS: readonly OperatingModel[] =
  OPERATING_MODEL_OPTIONS.map((o) => o.value);

/** Approved max length for operating-model Other description (plain text). */
export const OPERATING_MODEL_OTHER_MAX_LENGTH = 200;

/**
 * Sanitise migrated / entered Other description:
 * - plain text only (strip tags; never treat as markup)
 * - drop control characters
 * - truncate to the approved field limit
 */
export function sanitiseOperatingModelOther(raw: string): string {
  const withoutControls = raw.replace(
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,
    "",
  );
  const withoutTags = withoutControls.replace(/<\/?[^>]*>/g, "");
  const trimmed = withoutTags.trim();
  if (trimmed.length <= OPERATING_MODEL_OTHER_MAX_LENGTH) return trimmed;
  return trimmed.slice(0, OPERATING_MODEL_OTHER_MAX_LENGTH);
}

/**
 * Map pre-A1 singular ids (and loose labels) into A1 ids where a known
 * equivalent exists. Returns null for empty / unmappable values.
 */
export function coerceLegacyOperatingModelId(
  raw: unknown,
): OperatingModel | null {
  if (typeof raw !== "string" || !raw.trim()) return null;
  const key = raw.trim().toLowerCase().replace(/[\s/-]+/g, "_");

  const direct = OPERATING_MODEL_IDS.find((id) => id === key);
  if (direct) return direct;

  // Legacy v1 option set with known A1 equivalents
  if (key === "service") return "professional_services";

  return null;
}

export type LegacySingularMigration = {
  operatingModels: OperatingModel[];
  operatingModelOther: string;
};

/**
 * Migrate a legacy singular operatingModel value:
 * - known equivalent → A1 machine ID
 * - recognisable but unmappable non-empty string (e.g. hybrid) → other +
 *   sanitised original text in operatingModelOther
 * - empty / non-string → no selection invented
 */
export function migrateSingularOperatingModel(
  raw: unknown,
): LegacySingularMigration {
  if (typeof raw !== "string") {
    return { operatingModels: [], operatingModelOther: "" };
  }
  const trimmed = raw.trim();
  if (!trimmed) {
    return { operatingModels: [], operatingModelOther: "" };
  }

  const mapped = coerceLegacyOperatingModelId(trimmed);
  if (mapped) {
    return { operatingModels: [mapped], operatingModelOther: "" };
  }

  return {
    operatingModels: ["other"],
    operatingModelOther: sanitiseOperatingModelOther(trimmed),
  };
}

export function operatingModelLabel(id: OperatingModel): string {
  return OPERATING_MODEL_OPTIONS.find((o) => o.value === id)?.label ?? id;
}

export const OUTSOURCED_OPTIONS: SelectOption<OutsourcedOperations>[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "mixed", label: "Mixed" },
];

export const REVENUE_BAND_OPTIONS: SelectOption<RevenueBand>[] = [
  { value: "under_1m", label: "Under £1m" },
  { value: "1m_5m", label: "£1m – £5m" },
  { value: "5m_20m", label: "£5m – £20m" },
  { value: "20m_50m", label: "£20m – £50m" },
  { value: "50m_100m", label: "£50m – £100m" },
  { value: "100m_250m", label: "£100m – £250m" },
  { value: "250m_plus", label: "£250m+" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

export const EBITDA_BAND_OPTIONS: SelectOption<EbitdaMarginBand>[] = [
  { value: "negative", label: "Negative" },
  { value: "0_5", label: "0 – 5%" },
  { value: "5_10", label: "5 – 10%" },
  { value: "10_15", label: "10 – 15%" },
  { value: "15_20", label: "15 – 20%" },
  { value: "20_plus", label: "20%+" },
  { value: "unknown", label: "Not sure" },
];

export const EMPLOYEE_BAND_OPTIONS: SelectOption<EmployeeBand>[] = [
  { value: "1_10", label: "1 – 10" },
  { value: "11_50", label: "11 – 50" },
  { value: "51_200", label: "51 – 200" },
  { value: "201_500", label: "201 – 500" },
  { value: "501_1000", label: "501 – 1,000" },
  { value: "1001_5000", label: "1,001 – 5,000" },
  { value: "5000_plus", label: "5,000+" },
];

export const COST_PRESSURE_OPTIONS: SelectOption<CostPressure>[] = [
  { value: "labour", label: "Labour" },
  { value: "transport", label: "Transport" },
  { value: "materials", label: "Materials" },
  { value: "technology", label: "Technology" },
  { value: "property", label: "Property" },
  { value: "other", label: "Other" },
];

export const INDUSTRY_SUGGESTIONS = [
  "Manufacturing",
  "Logistics & Distribution",
  "Retail",
  "Professional Services",
  "Healthcare",
  "Technology",
  "Construction",
  "Hospitality",
  "Financial Services",
  "Other",
] as const;

/** Short privacy guidance shown on the Organisation Profile (PO-7). */
export const ORGANISATION_PROFILE_PRIVACY_COPY =
  "Your Organisation Profile is saved only in this browser on this device. It is not synced to a cloud account. Anyone using this browser may be able to access it, and clearing browser data may remove it. Avoid entering unnecessary confidential or personal information.";
