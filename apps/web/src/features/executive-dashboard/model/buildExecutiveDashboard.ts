import {
  CONFIDENCE_LEVELS,
  DEFAULT_CONFIDENCE,
  TOTAL_QUESTIONS,
  allDepartmentResults,
  completedCount,
  confidenceFactorForValue,
  departmentCostRange,
  isAnswered,
  maturityNameFromScore,
  overallScore,
  priorityCount,
  progressPercent,
  rankDepartmentsByRisk,
  rating,
  sectionConfidenceFactor,
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
  /** Domain totalActiveCost — confidence-adjusted point estimate */
  current: number;
};

export type AssessmentConfidenceSummary = {
  answeredCount: number;
  counts: Record<ConfidenceValue, number>;
  /** Mean of domain confidenceFactorForValue across answered questions */
  averageFactor: number;
  predominant: ConfidenceLabel | null;
  /** Per-department domain sectionConfidenceFactor for answered departments */
  departmentFactors: ReadonlyArray<{
    name: string;
    factor: number;
    hasAnswers: boolean;
  }>;
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

function resolveConfidenceValue(
  raw: string | undefined,
): ConfidenceValue {
  const match = CONFIDENCE_LEVELS.find((c) => c.value === raw);
  return match ? match.value : DEFAULT_CONFIDENCE;
}

function buildAssessmentConfidence(
  state: AssessmentAnswers,
  departments: DepartmentResult[],
): AssessmentConfidenceSummary {
  const counts: Record<ConfidenceValue, number> = {
    low: 0,
    medium: 0,
    high: 0,
  };
  const factors: number[] = [];

  Object.keys(state.answers).forEach((key) => {
    if (!isAnswered(state.answers, key)) return;
    const value = resolveConfidenceValue(state.confidence[key]);
    counts[value] += 1;
    factors.push(confidenceFactorForValue(value));
  });

  const answeredCount = factors.length;
  const averageFactor = answeredCount
    ? factors.reduce((a, b) => a + b, 0) / answeredCount
    : 1;

  let predominant: ConfidenceLabel | null = null;
  if (answeredCount > 0) {
    const top = (Object.keys(counts) as ConfidenceValue[]).sort(
      (a, b) => counts[b] - counts[a] || a.localeCompare(b),
    )[0];
    predominant =
      CONFIDENCE_LEVELS.find((c) => c.value === top)?.label ?? null;
  }

  const departmentFactors = departments.map((d) => ({
    name: d.name,
    factor: sectionConfidenceFactor(d.index, state.answers, state.confidence),
    hasAnswers: d.hasAnswers,
  }));

  return {
    answeredCount,
    counts,
    averageFactor,
    predominant,
    departmentFactors,
  };
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
    assessmentConfidence: buildAssessmentConfidence(state, departments),
    highestRiskDepartment: ranked[0] ?? null,
    departments,
    riskHeatMap,
    topPriorities: topPriorities(state, 3),
    priorityCount: priorityCount(state),
  };
}
