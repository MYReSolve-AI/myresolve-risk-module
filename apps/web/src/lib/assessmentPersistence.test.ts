/** @vitest-environment jsdom */
import { beforeEach, describe, expect, it } from "vitest";
import {
  STORAGE_KEY,
} from "@/src/domain/assessment";
import {
  clearAssessmentAnswers,
  loadAssessmentAnswers,
  saveAssessmentAnswers,
} from "@/src/lib/assessmentPersistence";

describe("assessmentPersistence", () => {
  beforeEach(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.clear();
    }
  });

  it("round-trips answers and one overall confidence response", () => {
    saveAssessmentAnswers({
      answers: { "0-0": 2, "5-3": 4 },
      overallConfidence: "high",
    });
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    expect(STORAGE_KEY).toBe("myresolve_answers_v03");
    expect(raw).toEqual({
      answers: { "0-0": 2, "5-3": 4 },
      overallConfidence: "high",
    });
    expect(loadAssessmentAnswers()).toEqual({
      answers: { "0-0": 2, "5-3": 4 },
      overallConfidence: "high",
    });
    clearAssessmentAnswers();
    expect(loadAssessmentAnswers()).toEqual({ answers: {} });
  });

  it("preserves legacy answers without inventing an overall confidence", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        answers: { "0-0": 4 },
        confidence: { "0-0": "low" },
      }),
    );
    expect(loadAssessmentAnswers()).toEqual({
      answers: { "0-0": 4 },
      overallConfidence: undefined,
    });
  });
});
