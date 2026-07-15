import {
  COST_PRESSURE_OPTIONS,
  CUSTOMER_TYPE_OPTIONS,
  EBITDA_BAND_OPTIONS,
  EMPLOYEE_BAND_OPTIONS,
  GROWTH_STAGE_OPTIONS,
  INDUSTRY_SUGGESTIONS,
  OUTSOURCED_OPTIONS,
  PROFILE_SECTION_META,
  type CostPressure,
  type OperatingModel,
  type OrganisationProfile,
  type ProfileSectionId,
  type RevenueBand,
} from "@/src/domain/organisationProfile";
import { ProfileField } from "./ProfileField";
import { RevenueBandSelector } from "./RevenueBandSelector";
import { PercentageField } from "./PercentageField";
import { MultiSelect } from "./MultiSelect";
import { StrategicPriorityField } from "./StrategicPriorityField";
import { OperatingModelsField } from "./OperatingModelsField";
import styles from "./ProfileSection.module.css";

export function ProfileSection({
  sectionId,
  profile,
  onChange,
  showOperatingModelErrors = false,
}: {
  sectionId: ProfileSectionId;
  profile: OrganisationProfile;
  onChange: (path: string, value: unknown) => void;
  showOperatingModelErrors?: boolean;
}) {
  const meta = PROFILE_SECTION_META[sectionId];

  return (
    <section
      className={styles.section}
      data-testid={`profile-section-${sectionId}`}
    >
      <p className={styles.subtitle}>{meta.subtitle}</p>
      <div className={styles.stack}>
        {renderFields(
          sectionId,
          profile,
          onChange,
          showOperatingModelErrors,
        )}
      </div>
    </section>
  );
}

function renderFields(
  sectionId: ProfileSectionId,
  profile: OrganisationProfile,
  onChange: (path: string, value: unknown) => void,
  showOperatingModelErrors = false,
) {
  switch (sectionId) {
    case "organisation":
      return (
        <>
          <ProfileField label="Organisation name" governance="required" htmlFor="org-name">
            <input
              id="org-name"
              value={profile.organisation.name}
              onChange={(e) => onChange("organisation.name", e.target.value)}
              data-testid="organisation.name"
            />
          </ProfileField>
          <ProfileField label="Industry" governance="required" htmlFor="org-industry">
            <input
              id="org-industry"
              list="industry-suggestions"
              value={profile.organisation.industry}
              onChange={(e) => onChange("organisation.industry", e.target.value)}
              data-testid="organisation.industry"
            />
            <datalist id="industry-suggestions">
              {INDUSTRY_SUGGESTIONS.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>
          </ProfileField>
          <ProfileField label="Country" governance="required" htmlFor="org-country">
            <input
              id="org-country"
              value={profile.organisation.country}
              onChange={(e) => onChange("organisation.country", e.target.value)}
              data-testid="organisation.country"
            />
          </ProfileField>
          <ProfileField label="Number of employees" governance="required" htmlFor="org-employees">
            <select
              id="org-employees"
              value={profile.organisation.employeeBand}
              onChange={(e) => onChange("organisation.employeeBand", e.target.value)}
              data-testid="organisation.employeeBand"
            >
              <option value="">Select…</option>
              {EMPLOYEE_BAND_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </ProfileField>
          <ProfileField label="Annual revenue band" governance="required" htmlFor="org-revenue">
            <RevenueBandSelector
              name="organisation.annualRevenueBand"
              value={profile.organisation.annualRevenueBand}
              onChange={(v: RevenueBand) =>
                onChange("organisation.annualRevenueBand", v)
              }
            />
          </ProfileField>
          <ProfileField
            label="Number of operating locations"
            governance="required"
            htmlFor="org-locations"
          >
            <input
              id="org-locations"
              type="number"
              min={0}
              value={profile.organisation.operatingLocations ?? ""}
              onChange={(e) =>
                onChange(
                  "organisation.operatingLocations",
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
              data-testid="organisation.operatingLocations"
            />
          </ProfileField>
          <ProfileField label="Growth stage" governance="required" htmlFor="org-growth">
            <select
              id="org-growth"
              value={profile.organisation.growthStage}
              onChange={(e) => onChange("organisation.growthStage", e.target.value)}
              data-testid="organisation.growthStage"
            >
              <option value="">Select…</option>
              {GROWTH_STAGE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </ProfileField>
        </>
      );
    case "customers":
      return (
        <>
          <ProfileField label="Customer type" governance="recommended" htmlFor="cust-type">
            <select
              id="cust-type"
              value={profile.customers.customerType}
              onChange={(e) => onChange("customers.customerType", e.target.value)}
              data-testid="customers.customerType"
            >
              <option value="">Select…</option>
              {CUSTOMER_TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </ProfileField>
          <ProfileField
            label="Number of active customers"
            governance="recommended"
            htmlFor="cust-active"
          >
            <input
              id="cust-active"
              type="number"
              min={0}
              value={profile.customers.activeCustomers ?? ""}
              onChange={(e) =>
                onChange(
                  "customers.activeCustomers",
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
              data-testid="customers.activeCustomers"
            />
          </ProfileField>
          <ProfileField label="NPS" governance="optional" htmlFor="cust-nps" help="Net Promoter Score, if measured">
            <input
              id="cust-nps"
              type="number"
              value={profile.customers.nps ?? ""}
              onChange={(e) =>
                onChange(
                  "customers.nps",
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
              data-testid="customers.nps"
            />
          </ProfileField>
          <ProfileField label="Customer retention" governance="recommended" htmlFor="cust-retention">
            <PercentageField
              id="customers.customerRetentionPercent"
              value={profile.customers.customerRetentionPercent}
              onChange={(v) => onChange("customers.customerRetentionPercent", v)}
            />
          </ProfileField>
          <ProfileField label="OTIF or service level" governance="optional" htmlFor="cust-otif">
            <PercentageField
              id="customers.serviceLevelPercent"
              value={profile.customers.serviceLevelPercent}
              onChange={(v) => onChange("customers.serviceLevelPercent", v)}
            />
          </ProfileField>
          <ProfileField label="Complaint rate" governance="optional" htmlFor="cust-complaints">
            <PercentageField
              id="customers.complaintRatePercent"
              value={profile.customers.complaintRatePercent}
              onChange={(v) => onChange("customers.complaintRatePercent", v)}
            />
          </ProfileField>
        </>
      );
    case "operations":
      return (
        <>
          <ProfileField
            label="Which operating models apply?"
            governance="required"
            help="Select all that apply."
          >
            <OperatingModelsField
              selected={profile.operations.operatingModels}
              otherDescription={profile.operations.operatingModelOther}
              showErrors={showOperatingModelErrors}
              modelsError={
                profile.operations.operatingModels.length === 0
                  ? "Select at least one operating model."
                  : null
              }
              otherError={
                profile.operations.operatingModels.includes("other") &&
                !profile.operations.operatingModelOther.trim()
                  ? "Describe the other operating model."
                  : null
              }
              onChangeSelected={(next) =>
                onChange("operations.operatingModels", next as OperatingModel[])
              }
              onChangeOtherDescription={(next) =>
                onChange("operations.operatingModelOther", next)
              }
            />
          </ProfileField>
          <ProfileField
            label="Number of sites or warehouses"
            governance="recommended"
            htmlFor="ops-sites"
          >
            <input
              id="ops-sites"
              type="number"
              min={0}
              value={profile.operations.sitesOrWarehouses ?? ""}
              onChange={(e) =>
                onChange(
                  "operations.sitesOrWarehouses",
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
              data-testid="operations.sitesOrWarehouses"
            />
          </ProfileField>
          <ProfileField
            label="Deliveries, orders or transactions per week"
            governance="recommended"
            htmlFor="ops-tx"
          >
            <input
              id="ops-tx"
              type="number"
              min={0}
              value={profile.operations.weeklyTransactions ?? ""}
              onChange={(e) =>
                onChange(
                  "operations.weeklyTransactions",
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
              data-testid="operations.weeklyTransactions"
            />
          </ProfileField>
          <ProfileField label="Outsourced operations" governance="recommended" htmlFor="ops-out">
            <select
              id="ops-out"
              value={profile.operations.outsourcedOperations}
              onChange={(e) =>
                onChange("operations.outsourcedOperations", e.target.value)
              }
              data-testid="operations.outsourcedOperations"
            >
              <option value="">Select…</option>
              {OUTSOURCED_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </ProfileField>
          <ProfileField label="Capacity utilisation" governance="optional" htmlFor="ops-capacity">
            <PercentageField
              id="operations.capacityUtilisationPercent"
              value={profile.operations.capacityUtilisationPercent}
              onChange={(v) => onChange("operations.capacityUtilisationPercent", v)}
              placeholder="e.g. 75"
            />
          </ProfileField>
          <ProfileField
            label="Primary operational constraint"
            governance="recommended"
            htmlFor="ops-constraint"
          >
            <input
              id="ops-constraint"
              value={profile.operations.primaryConstraint}
              onChange={(e) =>
                onChange("operations.primaryConstraint", e.target.value)
              }
              data-testid="operations.primaryConstraint"
            />
          </ProfileField>
        </>
      );
    case "people":
      return (
        <>
          <ProfileField label="Total headcount" governance="required" htmlFor="people-headcount">
            <input
              id="people-headcount"
              type="number"
              min={0}
              value={profile.people.totalHeadcount ?? ""}
              onChange={(e) =>
                onChange(
                  "people.totalHeadcount",
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
              data-testid="people.totalHeadcount"
            />
          </ProfileField>
          <ProfileField label="Leadership team size" governance="recommended" htmlFor="people-leaders">
            <input
              id="people-leaders"
              type="number"
              min={0}
              value={profile.people.leadershipTeamSize ?? ""}
              onChange={(e) =>
                onChange(
                  "people.leadershipTeamSize",
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
              data-testid="people.leadershipTeamSize"
            />
          </ProfileField>
          <ProfileField label="Employee turnover" governance="recommended" htmlFor="people-turnover">
            <PercentageField
              id="people.employeeTurnoverPercent"
              value={profile.people.employeeTurnoverPercent}
              onChange={(v) => onChange("people.employeeTurnoverPercent", v)}
            />
          </ProfileField>
          <ProfileField label="Absence rate" governance="optional" htmlFor="people-absence">
            <PercentageField
              id="people.absenceRatePercent"
              value={profile.people.absenceRatePercent}
              onChange={(v) => onChange("people.absenceRatePercent", v)}
            />
          </ProfileField>
          <ProfileField
            label="Engagement score"
            governance="optional"
            htmlFor="people-engagement"
            help="If you use a 0–100 engagement measure"
          >
            <PercentageField
              id="people.engagementScore"
              value={profile.people.engagementScore}
              onChange={(v) => onChange("people.engagementScore", v)}
            />
          </ProfileField>
        </>
      );
    case "finance":
      return (
        <>
          <ProfileField
            label="Annual revenue band"
            governance="optional"
            htmlFor="fin-revenue"
            help="Optional refinement — organisation revenue is already captured"
          >
            <RevenueBandSelector
              name="finance.annualRevenueBand"
              value={profile.finance.annualRevenueBand}
              onChange={(v) => onChange("finance.annualRevenueBand", v)}
            />
          </ProfileField>
          <ProfileField label="EBITDA margin band" governance="recommended" htmlFor="fin-ebitda">
            <select
              id="fin-ebitda"
              value={profile.finance.ebitdaMarginBand}
              onChange={(e) => onChange("finance.ebitdaMarginBand", e.target.value)}
              data-testid="finance.ebitdaMarginBand"
            >
              <option value="">Select…</option>
              {EBITDA_BAND_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </ProfileField>
          <ProfileField label="Major cost pressures" governance="recommended" htmlFor="fin-costs">
            <MultiSelect<CostPressure>
              name="finance.costPressures"
              options={COST_PRESSURE_OPTIONS}
              value={profile.finance.costPressures}
              onChange={(v) => onChange("finance.costPressures", v)}
            />
          </ProfileField>
        </>
      );
    case "priorities":
      return (
        <StrategicPriorityField
          values={profile.strategicPriorities}
          onChange={onChange}
        />
      );
  }
}
