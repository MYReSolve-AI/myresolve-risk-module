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

  it("round-trips the locked v0.3.1 storage schema", () => {
    saveAssessmentAnswers({
      answers: { "0-0": 2, "5-3": 4 },
      confidence: { "0-0": "low", "5-3": "high" },
    });
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    expect(STORAGE_KEY).toBe("myresolve_answers_v03");
    expect(raw).toEqual({
      answers: { "0-0": 2, "5-3": 4 },
      confidence: { "0-0": "low", "5-3": "high" },
    });
    expect(loadAssessmentAnswers()).toEqual({
      answers: { "0-0": 2, "5-3": 4 },
      confidence: { "0-0": "low", "5-3": "high" },
    });
    clearAssessmentAnswers();
    expect(loadAssessmentAnswers()).toEqual({ answers: {}, confidence: {} });
  });
});
