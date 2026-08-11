import {
  TOTAL_QUESTIONS,
  allDepartmentResults,
  completedCount,
  departmentCostRange,
  maturityNameFromScore,
  overallScore,
  priorityCount,
  progressPercent,
  rankDepartmentsByRisk,
  rating,
  topPriorities,
  totalActiveCost,
  type AssessmentAnswers,
  type ConfidenceLabel,
  type ConfidenceValue,
  type DepartmentResult,
  type MaturityLevelName,
  type RiskRating,
} from "@/src/domain/assessment";

export type ExecutiveHealth = {
  score: number;
  maturityLevel: MaturityLevelName;
  riskRating: RiskRating;
};

/** @deprecated Prefer ExecutiveHealth — retained for existing dashboard callers */
export type OperationalHealth = ExecutiveHealth;

export type AnnualValueAtRisk = {
  /** Sum of domain department cost-range lows for departments with answers */
  low: number;
  /** Sum of domain department cost-range highs for departments with answers */
  high: number;
  /** Domain totalActiveCost — risk-position point estimate */
  current: number;
};

export type AssessmentConfidenceSummary = {
  value: ConfidenceValue | null;
  label: ConfidenceLabel | null;
};

export type RiskHeatCell = {
  index: number;
  name: string;
  score: number;
  risk: number;
  riskRating: RiskRating;
  maturityLevel: MaturityLevelName;
  hasAnswers: boolean;
};

/**
 * Presentation model for the executive dashboard.
 * Assembles domain outputs only — no alternate scoring.
 */
export type ExecutiveDashboardModel = {
  hasAnyAnswers: boolean;
  progressPercent: number;
  completedCount: number;
  totalQuestions: number;
  executiveHealth: ExecutiveHealth;
  /** @deprecated alias retained for callers; use executiveHealth */
  operationalHealth: ExecutiveHealth;
  annualValueAtRisk: AnnualValueAtRisk;
  assessmentConfidence: AssessmentConfidenceSummary;
  highestRiskDepartment: DepartmentResult | null;
  departments: DepartmentResult[];
  riskHeatMap: RiskHeatCell[];
  topPriorities: DepartmentResult[];
  priorityCount: number;
};

function annualValueAtRiskEnvelope(
  departments: DepartmentResult[],
): Pick<AnnualValueAtRisk, "low" | "high"> {
  return departments
    .filter((d) => d.hasAnswers)
    .reduce(
      (acc, d) => {
        const [low, high] = departmentCostRange(d.index);
        return { low: acc.low + low, high: acc.high + high };
      },
      { low: 0, high: 0 },
    );
}

function buildAssessmentConfidence(
  state: AssessmentAnswers,
): AssessmentConfidenceSummary {
  const value = state.overallConfidence ?? null;
  const label = value
    ? (`${value.charAt(0).toUpperCase()}${value.slice(1)}` as ConfidenceLabel)
    : null;
  return { value, label };
}

export function buildExecutiveDashboard(
  state: AssessmentAnswers,
): ExecutiveDashboardModel {
  const departments = allDepartmentResults(state);
  const ranked = rankDepartmentsByRisk(state);
  const score = overallScore(state.answers);
  const envelope = annualValueAtRiskEnvelope(departments);
  const health: ExecutiveHealth = {
    score,
    maturityLevel: maturityNameFromScore(score),
    riskRating: rating(score),
  };

  const riskHeatMap: RiskHeatCell[] = departments.map((d) => ({
    index: d.index,
    name: d.name,
    score: d.score,
    risk: d.risk,
    riskRating: d.riskRating,
    maturityLevel: d.maturityLevel,
    hasAnswers: d.hasAnswers,
  }));

  return {
    hasAnyAnswers: ranked.length > 0,
    progressPercent: progressPercent(state.answers),
    completedCount: completedCount(state.answers),
    totalQuestions: TOTAL_QUESTIONS,
    executiveHealth: health,
    operationalHealth: health,
    annualValueAtRisk: {
      low: envelope.low,
      high: envelope.high,
      current: totalActiveCost(state),
    },
    assessmentConfidence: buildAssessmentConfidence(state),
    highestRiskDepartment: ranked[0] ?? null,
    departments,
    riskHeatMap,
    topPriorities: topPriorities(state, 3),
    priorityCount: priorityCount(state),
  };
}
