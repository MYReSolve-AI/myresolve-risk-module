import type { AssessmentAnswers, ConfidenceValue, MaturityValue } from "../types";
import { SECTIONS, answerKey } from "../questions";

/** Fill every question with the same maturity + confidence */
export function fillAll(
  maturity: MaturityValue,
  confidence: ConfidenceValue,
): AssessmentAnswers {
  const answers: Record<string, number> = {};
  const conf: Record<string, string> = {};
  SECTIONS.forEach((s, i) => {
    s.questions.forEach((_, q) => {
      const key = answerKey(i, q);
      answers[key] = maturity;
      conf[key] = confidence;
    });
  });
  return { answers, confidence: conf };
}

/** Set one question */
export function setAnswer(
  state: AssessmentAnswers,
  sectionIndex: number,
  questionIndex: number,
  maturity: MaturityValue,
  confidence: ConfidenceValue = "medium",
): AssessmentAnswers {
  const key = answerKey(sectionIndex, questionIndex);
  return {
    answers: { ...state.answers, [key]: maturity },
    confidence: { ...state.confidence, [key]: confidence },
  };
}

/** Empty incomplete state */
export const emptyAssessment: AssessmentAnswers = {
  answers: {},
  confidence: {},
};

/**
 * Mixed answer set covering every department with differentiated scores
 * so risk ordering is unambiguous.
 *
 * Expected section maturity scores (all 4 questions answered uniformly
 * unless noted):
 * - People (1): all Critical → score 0, risk 100
 * - Process (2): all Developing → score 25, risk 75
 * - Customer (3): all Established → score 50, risk 50
 * - Operations (4): all Strong → score 75, risk 25
 * - Technology (5): all Leading → score 100, risk 0
 * - Finance (6): mixed 1,2,3,4 → avg 2.5 → score 38, risk 62
 */
export function mixedAssessment(): AssessmentAnswers {
  let state = emptyAssessment;
  const applySection = (
    i: number,
    values: MaturityValue[],
    conf: ConfidenceValue[],
  ) => {
    values.forEach((v, q) => {
      state = setAnswer(state, i, q, v, conf[q] ?? "medium");
    });
  };

  applySection(0, [1, 1, 1, 1], ["low", "low", "low", "low"]);
  applySection(1, [2, 2, 2, 2], ["medium", "medium", "medium", "medium"]);
  applySection(2, [3, 3, 3, 3], ["high", "high", "high", "high"]);
  applySection(3, [4, 4, 4, 4], ["medium", "medium", "medium", "medium"]);
  applySection(4, [5, 5, 5, 5], ["high", "high", "high", "high"]);
  applySection(5, [1, 2, 3, 4], ["low", "medium", "high", "medium"]);

  return state;
}

/**
 * Incomplete: only People Q1 and Process Q1–Q2 answered.
 * Unanswered departments still appear in CSV with score 0 and high cost band.
 */
export function incompleteAssessment(): AssessmentAnswers {
  let state = emptyAssessment;
  state = setAnswer(state, 0, 0, 2, "low"); // People Q1 Developing + Low
  state = setAnswer(state, 1, 0, 4, "high"); // Process Q1 Strong + High
  state = setAnswer(state, 1, 1, 5, "high"); // Process Q2 Leading + High
  return state;
}

export const allCriticalLow = fillAll(1, "low");
export const allEstablishedMedium = fillAll(3, "medium");
export const allLeadingHigh = fillAll(5, "high");
