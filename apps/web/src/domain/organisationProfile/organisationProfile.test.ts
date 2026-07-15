import { describe, expect, it } from "vitest";
import {
  OPERATING_MODEL_OPTIONS,
  OPERATING_MODEL_IDS,
  PROFILE_FIELDS,
  areProfileFieldsComplete,
  coerceLegacyOperatingModelId,
  createEmptyOrganisationProfile,
  getProfileCompletion,
  hasValidCompletedAt,
  isFieldFilled,
  isProfileComplete,
  migrateSingularOperatingModel,
  missingRequiredFields,
  operatingModelLabel,
  sanitiseOperatingModelOther,
  validateFieldValue,
} from "./index";
import {
  completeOrganisationProfile,
  fillRequiredOrganisationProfile,
} from "./__fixtures__/profile";

describe("organisation profile domain", () => {
  it("exposes fixed A1 operating-model options with PO-8 labels", () => {
    expect(OPERATING_MODEL_OPTIONS.map((o) => o.value)).toEqual([
      "manufacturing",
      "retail",
      "ecommerce",
      "wholesale",
      "distribution",
      "warehousing_fulfilment",
      "transport_logistics",
      "installation_field_services",
      "repairs_aftercare",
      "professional_services",
      "other",
    ]);
    expect(operatingModelLabel("ecommerce")).toBe("E-commerce");
    expect(operatingModelLabel("installation_field_services")).toBe(
      "Installation/field services",
    );
    expect(operatingModelLabel("repairs_aftercare")).toBe("Repairs/aftercare");
    expect(OPERATING_MODEL_IDS).toHaveLength(11);
  });

  it("requires at least one operating model", () => {
    const profile = fillRequiredOrganisationProfile({
      operations: {
        ...fillRequiredOrganisationProfile().operations,
        operatingModels: [],
      },
    });
    expect(missingRequiredFields(profile)).toContain(
      "operations.operatingModels",
    );
    expect(areProfileFieldsComplete(profile)).toBe(false);
    expect(isProfileComplete(profile)).toBe(false);
    expect(
      validateFieldValue("operations.operatingModels", []),
    ).toMatchObject({
      message: "Select at least one operating model.",
    });
  });

  it("requires Other description only when other is selected", () => {
    const withOtherEmpty = fillRequiredOrganisationProfile({
      operations: {
        ...fillRequiredOrganisationProfile().operations,
        operatingModels: ["manufacturing", "other"],
        operatingModelOther: "",
      },
    });
    expect(missingRequiredFields(withOtherEmpty)).toContain(
      "operations.operatingModelOther",
    );
    expect(areProfileFieldsComplete(withOtherEmpty)).toBe(false);

    const withOtherFilled = fillRequiredOrganisationProfile({
      operations: {
        ...fillRequiredOrganisationProfile().operations,
        operatingModels: ["other"],
        operatingModelOther: "Franchise network",
      },
    });
    expect(areProfileFieldsComplete(withOtherFilled)).toBe(true);
    expect(isProfileComplete(withOtherFilled)).toBe(false);
  });

  it("treats filled required fields without completedAt as incomplete", () => {
    const filled = fillRequiredOrganisationProfile();
    expect(areProfileFieldsComplete(filled)).toBe(true);
    expect(filled.completedAt).toBeNull();
    expect(isProfileComplete(filled)).toBe(false);
    expect(getProfileCompletion(filled).fieldsComplete).toBe(true);
    expect(getProfileCompletion(filled).isComplete).toBe(false);
  });

  it("requires schema, fields, and valid completedAt for authoritative completion", () => {
    expect(isProfileComplete(createEmptyOrganisationProfile())).toBe(false);
    expect(isProfileComplete(fillRequiredOrganisationProfile())).toBe(false);
    expect(
      isProfileComplete(
        fillRequiredOrganisationProfile({ completedAt: "not-a-date" }),
      ),
    ).toBe(false);
    expect(isProfileComplete(completeOrganisationProfile())).toBe(true);
    expect(hasValidCompletedAt("2026-07-15T12:00:00.000Z")).toBe(true);
    expect(hasValidCompletedAt("")).toBe(false);
  });

  it("treats completedAt with incomplete fields as incomplete", () => {
    const broken = completeOrganisationProfile({
      organisation: {
        ...completeOrganisationProfile().organisation,
        name: "",
      },
    });
    expect(areProfileFieldsComplete(broken)).toBe(false);
    expect(isProfileComplete(broken)).toBe(false);
  });

  it("blocks field completion only on required fields", () => {
    const empty = createEmptyOrganisationProfile();
    expect(areProfileFieldsComplete(empty)).toBe(false);
    expect(missingRequiredFields(empty).length).toBeGreaterThan(0);

    const filled = fillRequiredOrganisationProfile();
    expect(missingRequiredFields(filled)).toEqual([]);
    expect(areProfileFieldsComplete(filled)).toBe(true);
    expect(isFieldFilled(filled, "customers.nps")).toBe(false);
  });

  it("reports field progress independently of completedAt", () => {
    const empty = createEmptyOrganisationProfile();
    expect(getProfileCompletion(empty).percentComplete).toBe(0);

    const filled = fillRequiredOrganisationProfile();
    expect(getProfileCompletion(filled).percentComplete).toBe(100);
    expect(getProfileCompletion(filled).isComplete).toBe(false);

    const completed = completeOrganisationProfile();
    expect(getProfileCompletion(completed).isComplete).toBe(true);
  });

  it("classifies every field as required, recommended or optional", () => {
    for (const field of PROFILE_FIELDS) {
      expect(["required", "recommended", "optional"]).toContain(
        field.governance,
      );
    }
  });

  it("coerces known legacy operating-model ids and preserves unmappable as other", () => {
    expect(coerceLegacyOperatingModelId("manufacturing")).toBe("manufacturing");
    expect(coerceLegacyOperatingModelId("service")).toBe(
      "professional_services",
    );
    expect(coerceLegacyOperatingModelId("hybrid")).toBeNull();
    expect(migrateSingularOperatingModel("hybrid")).toEqual({
      operatingModels: ["other"],
      operatingModelOther: "hybrid",
    });
    expect(migrateSingularOperatingModel("")).toEqual({
      operatingModels: [],
      operatingModelOther: "",
    });
    expect(migrateSingularOperatingModel(42)).toEqual({
      operatingModels: [],
      operatingModelOther: "",
    });
  });

  it("sanitises Other descriptions without treating them as markup", () => {
    expect(sanitiseOperatingModelOther('<img src=x onerror=alert(1)>hybrid')).toBe(
      "hybrid",
    );
    expect(sanitiseOperatingModelOther("a".repeat(250)).length).toBe(200);
  });
});
