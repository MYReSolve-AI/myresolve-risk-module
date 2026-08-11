import { maturityNameFromScore } from "./maturity";
import { SECTIONS } from "./questions";
import type {
  AssessmentAnswers,
  DepartmentResult,
  RiskRating,
} from "./types";

/**
 * v0.3.1 answered() — maturity value must be in 1..5.
 */
export function isAnswered(
  answers: Record<string, number>,
  key: string,
): boolean {
  const v = Number(answers[key]);
  return v >= 1 && v <= 5;
}

/**
 * Section maturity score 0–100.
 * Averages answered questions only (v >= 1 in legacy sectionScore; unanswered ignored).
 * Formula: Math.round(((avg - 1) / 4) * 100)
 * Returns 0 when the section has no scored answers.
 */
export function sectionScore(
  sectionIndex: number,
  answers: Record<string, number>,
): number {
  const section = SECTIONS[sectionIndex];
  if (!section) return 0;

  let total = 0;
  let count = 0;
  section.questions.forEach((_, q) => {
    const v = Number(answers[`${sectionIndex}-${q}`]);
    if (v >= 1) {
      total += v;
      count++;
    }
  });
  return count ? Math.round(((total / count - 1) / 4) * 100) : 0;
}

/** Risk = 100 − maturity score */
export function sectionRisk(
  sectionIndex: number,
  answers: Record<string, number>,
): number {
  return 100 - sectionScore(sectionIndex, answers);
}

/**
 * Estimated annual cost for a department (GBP).
 * Math.round(lo + (hi - lo) * riskRatio)
 */
export function sectionCost(
  sectionIndex: number,
  answers: Record<string, number>,
): number {
  const section = SECTIONS[sectionIndex];
  if (!section) return 0;
  const risk = sectionRisk(sectionIndex, answers) / 100;
  const [lo, hi] = section.cost;
  return Math.round(lo + (hi - lo) * risk);
}

/**
 * Overall maturity score: mean of section scores for departments that have
 * at least one answered question. Returns 0 when none.
 */
export function overallScore(answers: Record<string, number>): number {
  const vals = SECTIONS.map((_, i) => sectionScore(i, answers)).filter(
    (_, i) =>
      SECTIONS[i].questions.some((_, q) =>
        isAnswered(answers, `${i}-${q}`),
      ),
  );
  return vals.length
    ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
    : 0;
}

/**
 * Risk rating from a maturity score (not from risk score).
 * Exact thresholds from v0.3.1 `rating(score)`.
 */
export function rating(score: number): RiskRating {
  if (score >= 80) return "LOW";
  if (score >= 60) return "MODERATE";
  if (score >= 40) return "HIGH";
  return "CRITICAL";
}

export function sectionHasAnswers(
  sectionIndex: number,
  answers: Record<string, number>,
): boolean {
  const section = SECTIONS[sectionIndex];
  if (!section) return false;
  return section.questions.some((_, q) =>
    isAnswered(answers, `${sectionIndex}-${q}`),
  );
}

export function completedCount(answers: Record<string, number>): number {
  return Object.keys(answers).filter((k) => isAnswered(answers, k)).length;
}

export function progressPercent(answers: Record<string, number>): number {
  const totalQs = SECTIONS.reduce((n, s) => n + s.questions.length, 0);
  return Math.round((completedCount(answers) / totalQs) * 100);
}

export function departmentResult(
  sectionIndex: number,
  state: AssessmentAnswers,
): DepartmentResult {
  const section = SECTIONS[sectionIndex];
  const score = sectionScore(sectionIndex, state.answers);
  return {
    index: sectionIndex,
    name: section.name,
    score,
    risk: sectionRisk(sectionIndex, state.answers),
    cost: sectionCost(sectionIndex, state.answers),
    hasAnswers: sectionHasAnswers(sectionIndex, state.answers),
    maturityLevel: maturityNameFromScore(score),
    riskRating: rating(score),
  };
}

export function allDepartmentResults(
  state: AssessmentAnswers,
): DepartmentResult[] {
  return SECTIONS.map((_, i) => departmentResult(i, state));
}

/** Total estimated annual cost across departments that have answers */
export function totalActiveCost(state: AssessmentAnswers): number {
  return allDepartmentResults(state)
    .filter((d) => d.hasAnswers)
    .reduce((n, d) => n + d.cost, 0);
}
