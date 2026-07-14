/**
 * Domain types for the locked MYReSolve v0.3.1 assessment.
 * Behaviour must match legacy/v0.3.1/index.html until parity is formally approved.
 */

/** localStorage key used by the locked v0.3.1 prototype */
export const STORAGE_KEY = "myresolve_answers_v03" as const;

/** Maturity scale values (1–5) */
export type MaturityValue = 1 | 2 | 3 | 4 | 5;

export type MaturityLevelName =
  | "Critical"
  | "Developing"
  | "Established"
  | "Strong"
  | "Leading";

export type ConfidenceValue = "low" | "medium" | "high";

export type ConfidenceLabel = "Low" | "Medium" | "High";

/** Risk rating labels produced by `rating(maturityScore)` in v0.3.1 */
export type RiskRating = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

/**
 * Answer key format from v0.3.1: `${sectionIndex}-${questionIndex}`
 * Example: `0-0` … `5-3`
 */
export type AnswerKey = `${number}-${number}`;

export interface MaturityLevel {
  value: MaturityValue;
  name: MaturityLevelName;
}

export interface ConfidenceLevel {
  value: ConfidenceValue;
  label: ConfidenceLabel;
  /** Cost multiplier applied in sectionCost */
  factor: number;
}

export interface AssessmentQuestion {
  /** Stable key matching v0.3.1 localStorage answer keys */
  id: AnswerKey;
  sectionIndex: number;
  questionIndex: number;
  text: string;
}

export interface AssessmentSection {
  index: number;
  name: string;
  intro: string;
  /** [low, high] estimated annual GBP cost range assumptions */
  cost: readonly [number, number];
  questions: readonly AssessmentQuestion[];
}

/** Persisted payload shape under STORAGE_KEY */
export interface StoredAssessmentState {
  answers: Record<string, number>;
  confidence: Record<string, string>;
}

export interface AssessmentAnswers {
  answers: Record<string, number>;
  confidence: Record<string, ConfidenceValue | string>;
}

export interface DepartmentResult {
  index: number;
  name: string;
  /** Maturity score 0–100 */
  score: number;
  /** Risk score 0–100 (= 100 - score) */
  risk: number;
  /** Estimated annual cost (GBP, rounded) */
  cost: number;
  /** True if at least one question in the department is answered */
  hasAnswers: boolean;
  maturityLevel: MaturityLevelName;
  riskRating: RiskRating;
}
