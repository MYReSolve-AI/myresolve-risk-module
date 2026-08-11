import {
  STORAGE_KEY,
  type AssessmentAnswers,
  type StoredAssessmentState,
} from "@/src/domain/assessment";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

const EMPTY: AssessmentAnswers = { answers: {} };

function validOverallConfidence(value: unknown): AssessmentAnswers["overallConfidence"] {
  return value === "low" || value === "medium" || value === "high"
    ? value
    : undefined;
}

/**
 * Load assessment answers using the established localStorage key.
 * Key: `myresolve_answers_v03`
 * Legacy per-question confidence is intentionally not converted into an
 * overall response: the respondent must make that new judgement explicitly.
 */
export function loadAssessmentAnswers(): AssessmentAnswers {
  if (typeof window === "undefined") return { ...EMPTY, answers: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { answers: {} };
    const parsed = JSON.parse(raw) as StoredAssessmentState;
    return {
      answers: parsed.answers ?? {},
      overallConfidence: validOverallConfidence(parsed.overallConfidence),
    };
  } catch {
    return { answers: {} };
  }
}

/** Persist maturity answers plus one overall self-rated confidence response. */
export function saveAssessmentAnswers(state: AssessmentAnswers): void {
  if (typeof window === "undefined") return;
  const payload: StoredAssessmentState = {
    answers: state.answers,
    ...(state.overallConfidence
      ? { overallConfidence: state.overallConfidence }
      : {}),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function clearAssessmentAnswers(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
