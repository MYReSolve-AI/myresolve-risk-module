import { describe, expect, it } from "vitest";
import { buildExecutiveDashboard } from "./buildExecutiveDashboard";
import {
  allCriticalLow,
  allLeadingHigh,
  emptyAssessment,
  mixedAssessment,
} from "@/src/domain/assessment/__fixtures__/states";
import {
  criticalLow,
  leadingHigh,
  mixed,
} from "@/src/domain/assessment/__fixtures__/golden";

describe("buildExecutiveDashboard", () => {
  it("maps empty assessment to empty dashboard baseline", () => {
    const model = buildExecutiveDashboard(emptyAssessment);
    expect(model.hasAnyAnswers).toBe(false);
    expect(model.progressPercent).toBe(0);
    expect(model.executiveHealth.score).toBe(0);
    expect(model.annualValueAtRisk).toEqual({
      low: 0,
      high: 0,
      current: 0,
    });
    expect(model.assessmentConfidence.answeredCount).toBe(0);
    expect(model.assessmentConfidence.predominant).toBeNull();
    expect(model.highestRiskDepartment).toBeNull();
    expect(model.topPriorities).toEqual([]);
    expect(model.departments).toHaveLength(6);
    expect(model.riskHeatMap).toHaveLength(6);
  });

  it("surfaces domain scores for mixed assessment without altering them", () => {
    const model = buildExecutiveDashboard(mixedAssessment());
    expect(model.executiveHealth.score).toBe(mixed.overall);
    expect(model.executiveHealth.riskRating).toBe(mixed.overallRating);
    expect(model.executiveHealth.maturityLevel).toBe(mixed.overallMaturity);
    expect(model.annualValueAtRisk.current).toBe(mixed.totalCost);
    expect(model.highestRiskDepartment?.name).toBe(mixed.top3[0]);
    expect(model.topPriorities.map((p) => p.name)).toEqual(mixed.top3);
    expect(model.priorityCount).toBe(mixed.priorityCount);
    expect(model.departments.map((d) => d.score)).toEqual(
      mixed.depts.map((d) => d.score),
    );
    expect(model.riskHeatMap.map((c) => c.risk)).toEqual(
      mixed.depts.map((d) => d.risk),
    );
    expect(model.annualValueAtRisk.low).toBe(
      750_000 + 1_000_000 + 1_200_000 + 800_000 + 400_000 + 600_000,
    );
    expect(model.annualValueAtRisk.high).toBe(
      1_500_000 + 2_200_000 + 2_800_000 + 1_800_000 + 1_000_000 + 1_400_000,
    );
  });

  it("derives assessment confidence counts from domain answer confidence", () => {
    const model = buildExecutiveDashboard(mixedAssessment());
    // mixed fixture: People 4 low, Process 4 medium, Customer 4 high,
    // Operations 4 medium, Technology 4 high, Finance 1 low + 2 medium + 1 high
    expect(model.assessmentConfidence.counts).toEqual({
      low: 5,
      medium: 10,
      high: 9,
    });
    expect(model.assessmentConfidence.answeredCount).toBe(24);
    expect(model.assessmentConfidence.predominant).toBe("Medium");
    expect(model.assessmentConfidence.averageFactor).toBeCloseTo(
      (5 * 1.15 + 10 * 1.07 + 9 * 1.0) / 24,
      5,
    );
  });

  it("uses critical/leading golden totals for current VaR", () => {
    expect(
      buildExecutiveDashboard(allCriticalLow).annualValueAtRisk.current,
    ).toBe(criticalLow.totalCost);
    expect(
      buildExecutiveDashboard(allLeadingHigh).annualValueAtRisk.current,
    ).toBe(leadingHigh.totalCost);
    expect(
      buildExecutiveDashboard(allLeadingHigh).annualValueAtRisk.low,
    ).toBe(leadingHigh.totalCost);
    expect(
      buildExecutiveDashboard(allCriticalLow).assessmentConfidence.predominant,
    ).toBe("Low");
    expect(
      buildExecutiveDashboard(allLeadingHigh).assessmentConfidence.predominant,
    ).toBe("High");
  });
});
