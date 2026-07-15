import {
  STORAGE_KEY,
  type AssessmentAnswers,
  type StoredAssessmentState,
} from "@/src/domain/assessment";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

const EMPTY: AssessmentAnswers = { answers: {}, confidence: {} };

/**
 * Load assessment answers using the locked v0.3.1 localStorage key/schema.
 * Key: `myresolve_answers_v03`
 * Payload: `{ answers: Record<string, number>, confidence: Record<string, string> }`
 */
export function loadAssessmentAnswers(): AssessmentAnswers {
  if (typeof window === "undefined") return { ...EMPTY, answers: {}, confidence: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { answers: {}, confidence: {} };
    const parsed = JSON.parse(raw) as StoredAssessmentState;
    return {
      answers: parsed.answers ?? {},
      confidence: parsed.confidence ?? {},
    };
  } catch {
    return { answers: {}, confidence: {} };
  }
}

/** Persist using the locked v0.3.1 schema (autosave / save and exit). */
export function saveAssessmentAnswers(state: AssessmentAnswers): void {
  if (typeof window === "undefined") return;
  const payload: StoredAssessmentState = {
    answers: state.answers,
    confidence: state.confidence as Record<string, string>,
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function clearAssessmentAnswers(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
