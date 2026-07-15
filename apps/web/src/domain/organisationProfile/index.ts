export {
  ORGANISATION_PROFILE_SCHEMA_VERSION,
  type FieldGovernance,
  type OrganisationProfile,
  type OrganisationDetails,
  type CustomerProfile,
  type OperationsProfile,
  type PeopleProfile,
  type FinanceProfile,
  type StrategicPriorities,
  type ProfileCompletionStatus,
  type ProfileCompletionSummary,
  type ProfileSectionId,
  type RevenueBand,
  type CostPressure,
  type OperatingModel,
} from "./types";

export {
  PROFILE_FIELDS,
  PROFILE_SECTION_META,
  fieldsForSection,
  requiredFields,
  type ProfileFieldPath,
  type ProfileFieldDefinition,
} from "./fields";

export {
  GROWTH_STAGE_OPTIONS,
  CUSTOMER_TYPE_OPTIONS,
  OPERATING_MODEL_OPTIONS,
  OUTSOURCED_OPTIONS,
  REVENUE_BAND_OPTIONS,
  EBITDA_BAND_OPTIONS,
  EMPLOYEE_BAND_OPTIONS,
  COST_PRESSURE_OPTIONS,
  INDUSTRY_SUGGESTIONS,
  OPERATING_MODEL_IDS,
  OPERATING_MODEL_OTHER_MAX_LENGTH,
  coerceLegacyOperatingModelId,
  migrateSingularOperatingModel,
  sanitiseOperatingModelOther,
  operatingModelLabel,
  ORGANISATION_PROFILE_PRIVACY_COPY,
} from "./options";
export type { SelectOption, LegacySingularMigration } from "./options";

export { createEmptyOrganisationProfile } from "./defaults";
export {
  isFieldFilled,
  areProfileFieldsComplete,
  isCurrentProfileSchema,
  hasValidCompletedAt,
  isProfileComplete,
  missingRequiredFields,
  validateFieldValue,
  hasOperatingModel,
} from "./validation";
export type { FieldValidationIssue } from "./validation";
export {
  getProfileCompletion,
  getSectionCompletion,
  SECTION_ORDER,
} from "./completion";
