/** @vitest-environment jsdom */
import { beforeEach, describe, expect, it } from "vitest";
import {
  EVIDENCE_ASSURANCE_STORAGE_KEY,
  createEmptyEvidenceAssuranceState,
} from "@/src/domain/evidenceAssurance";
import {
  clearEvidenceAssurance,
  loadEvidenceAssurance,
  saveEvidenceAssurance,
} from "./evidenceAssurancePersistence";

describe("evidenceAssurancePersistence", () => {
  beforeEach(() => localStorage.clear());

  it("round-trips the separate browser-local schema", () => {
    const state = createEmptyEvidenceAssuranceState();
    state.reviews["2"] = {
      departmentIndex: 2,
      status: "partly_evidenced",
      reviewer: "Customer lead",
      reviewDate: "2026-08-11",
      evidenceReferences: "Redacted complaints trend",
      missingInformation: "Retention cohort",
      updatedAt: "2026-08-11T10:00:00.000Z",
    };
    saveEvidenceAssurance(state);
    expect(localStorage.getItem(EVIDENCE_ASSURANCE_STORAGE_KEY)).toBeTruthy();
    expect(loadEvidenceAssurance().reviews["2"]).toMatchObject({
      status: "partly_evidenced",
      reviewer: "Customer lead",
    });
    clearEvidenceAssurance();
    expect(loadEvidenceAssurance()).toEqual(createEmptyEvidenceAssuranceState());
  });
});
