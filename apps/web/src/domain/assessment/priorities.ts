import { allDepartmentResults } from "./scoring";
import type { AssessmentAnswers, DepartmentResult } from "./types";

/**
 * Rank departments that have at least one answer by risk descending.
 * Matches v0.3.1 `updateAll` sort: `.sort((a,b)=>b.risk-a.risk)`.
 * Equal-risk ties keep relative order (stable sort in modern JS engines).
 */
export function rankDepartmentsByRisk(
  state: AssessmentAnswers,
): DepartmentResult[] {
  return allDepartmentResults(state)
    .filter((d) => d.hasAnswers)
    .sort((a, b) => b.risk - a.risk);
}

/** Top N priorities (prototype shows 3) */
export function topPriorities(
  state: AssessmentAnswers,
  limit = 3,
): DepartmentResult[] {
  return rankDepartmentsByRisk(state).slice(0, limit);
}

/**
 * Count of ranked (active) departments with maturity score < 60.
 * Matches v0.3.1 `priorityCount`.
 */
export function priorityCount(state: AssessmentAnswers): number {
  return rankDepartmentsByRisk(state).filter((d) => d.score < 60).length;
}
