/** @vitest-environment jsdom */
import { beforeEach, describe, expect, it } from "vitest";
import { STORAGE_KEY as ASSESSMENT_STORAGE_KEY } from "@/src/domain/assessment";
import {
  ORGANISATION_PROFILE_SCHEMA_VERSION,
  createEmptyOrganisationProfile,
} from "@/src/domain/organisationProfile";
import {
  completeOrganisationProfile,
  fillRequiredOrganisationProfile,
} from "@/src/domain/organisationProfile/__fixtures__/profile";
import {
  ORGANISATION_PROFILE_STORAGE_KEY,
  loadOrganisationProfile,
  normaliseOrganisationProfile,
  saveOrganisationProfile,
} from "@/src/lib/organisationProfilePersistence";

describe("organisationProfilePersistence", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("autosaves and restores the typed schemaVersion 2 shape", () => {
    const profile = completeOrganisationProfile();
    saveOrganisationProfile(profile);
    const raw = JSON.parse(
      localStorage.getItem(ORGANISATION_PROFILE_STORAGE_KEY) || "{}",
    );
    expect(raw.schemaVersion).toBe(ORGANISATION_PROFILE_SCHEMA_VERSION);
    expect(raw.schemaVersion).toBe(2);
    expect(raw.organisation.name).toBe("Acme Operations Ltd");
    expect(raw.operations.operatingModels).toEqual(["manufacturing"]);
    expect(raw.operations.operatingModel).toBeUndefined();
    expect(loadOrganisationProfile().organisation.name).toBe(
      "Acme Operations Ltd",
    );
  });

  it("migrates singular operatingModel to operatingModels array", () => {
    const normalised = normaliseOrganisationProfile({
      schemaVersion: 1,
      organisation: { name: "Legacy Co" },
      operations: { operatingModel: "retail" },
    });
    expect(normalised.schemaVersion).toBe(2);
    expect(normalised.operations.operatingModels).toEqual(["retail"]);
    expect(normalised.organisation.name).toBe("Legacy Co");
  });

  it("maps legacy service id and preserves hybrid as other + description", () => {
    expect(
      normaliseOrganisationProfile({
        schemaVersion: 1,
        operations: { operatingModel: "service" },
      }).operations,
    ).toMatchObject({
      operatingModels: ["professional_services"],
      operatingModelOther: "",
    });

    expect(
      normaliseOrganisationProfile({
        schemaVersion: 1,
        operations: { operatingModel: "hybrid" },
      }).operations,
    ).toMatchObject({
      operatingModels: ["other"],
      operatingModelOther: "hybrid",
    });
  });

  it("sanitises unsafe and oversized unmappable legacy values into other", () => {
    const long = "x".repeat(250);
    const migrated = normaliseOrganisationProfile({
      schemaVersion: 1,
      operations: {
        operatingModel: `<script>alert(1)</script>${long}`,
      },
    });
    expect(migrated.operations.operatingModels).toEqual(["other"]);
    expect(migrated.operations.operatingModelOther.includes("<script>")).toBe(
      false,
    );
    expect(migrated.operations.operatingModelOther.length).toBeLessThanOrEqual(
      200,
    );
  });

  it("does not invent a selection for empty or malformed singular values", () => {
    expect(
      normaliseOrganisationProfile({
        schemaVersion: 1,
        operations: { operatingModel: "" },
      }).operations.operatingModels,
    ).toEqual([]);
    expect(
      normaliseOrganisationProfile({
        schemaVersion: 1,
        operations: { operatingModel: null },
      }).operations.operatingModels,
    ).toEqual([]);
    expect(
      normaliseOrganisationProfile({
        schemaVersion: 1,
        operations: { operatingModel: 12 },
      }).operations.operatingModels,
    ).toEqual([]);
  });

  it("handles malformed payloads as empty profiles", () => {
    expect(normaliseOrganisationProfile(null)).toEqual(
      createEmptyOrganisationProfile(),
    );
    expect(normaliseOrganisationProfile("bad")).toEqual(
      createEmptyOrganisationProfile(),
    );
    expect(normaliseOrganisationProfile({ schemaVersion: "x" })).toEqual(
      createEmptyOrganisationProfile(),
    );
  });

  it("handles unknown future schema versions safely", () => {
    const normalised = normaliseOrganisationProfile({
      schemaVersion: 99,
      organisation: { name: "Should not load" },
    });
    expect(normalised).toEqual(createEmptyOrganisationProfile());
  });

  it("clears invalid completedAt on load", () => {
    const normalised = normaliseOrganisationProfile({
      ...fillRequiredOrganisationProfile(),
      completedAt: "banana",
    });
    expect(normalised.completedAt).toBeNull();
  });

  it("clears Other description when other is not selected on save", () => {
    saveOrganisationProfile(
      fillRequiredOrganisationProfile({
        operations: {
          ...fillRequiredOrganisationProfile().operations,
          operatingModels: ["manufacturing"],
          operatingModelOther: "should clear",
        },
      }),
    );
    const raw = JSON.parse(
      localStorage.getItem(ORGANISATION_PROFILE_STORAGE_KEY) || "{}",
    );
    expect(raw.operations.operatingModelOther).toBe("");
  });

  it("does not corrupt existing assessment storage", () => {
    localStorage.setItem(
      ASSESSMENT_STORAGE_KEY,
      JSON.stringify({
        answers: { "0-0": 3 },
        confidence: { "0-0": "high" },
      }),
    );
    saveOrganisationProfile(completeOrganisationProfile());
    expect(
      JSON.parse(localStorage.getItem(ASSESSMENT_STORAGE_KEY) || "{}"),
    ).toEqual({
      answers: { "0-0": 3 },
      confidence: { "0-0": "high" },
    });
    expect(ORGANISATION_PROFILE_STORAGE_KEY).not.toBe(ASSESSMENT_STORAGE_KEY);
  });

  it("round-trips multi-select models including other", () => {
    const profile = completeOrganisationProfile({
      operations: {
        ...fillRequiredOrganisationProfile().operations,
        operatingModels: ["manufacturing", "other", "manufacturing"],
        operatingModelOther: "Custom fulfilment",
      },
    });
    saveOrganisationProfile(profile);
    const loaded = loadOrganisationProfile();
    expect(loaded.operations.operatingModels).toEqual([
      "manufacturing",
      "other",
    ]);
    expect(loaded.operations.operatingModelOther).toBe("Custom fulfilment");
    expect(loaded.schemaVersion).toBe(2);
  });
});
