import { describe, expect, it } from "vitest";
import {
  assuranceReviewFor,
  createEmptyEvidenceAssuranceState,
  evidenceAssuranceSummary,
  normaliseEvidenceAssuranceState,
} from ".";

describe("evidenceAssurance", () => {
  it("starts with six not-reviewed departments", () => {
    expect(evidenceAssuranceSummary(createEmptyEvidenceAssuranceState())).toEqual(
      {
        totalDepartments: 6,
        reviewedCount: 0,
        partlyEvidencedCount: 0,
        notReviewedCount: 6,
      },
    );
  });

  it("normalises known reviews and rejects unknown departments", () => {
    const state = normaliseEvidenceAssuranceState({
      schemaVersion: 1,
      reviews: {
        0: {
          status: "evidence_reviewed",
          reviewer: "Operations lead",
          reviewDate: "2026-08-11",
          evidenceReferences: "Redacted KPI dashboard",
          missingInformation: "",
          updatedAt: "2026-08-11T10:00:00.000Z",
        },
        99: { status: "evidence_reviewed" },
      },
    });
    expect(assuranceReviewFor(state, 0).status).toBe("evidence_reviewed");
    expect(state.reviews["99"]).toBeUndefined();
    expect(evidenceAssuranceSummary(state).reviewedCount).toBe(1);
  });
});
