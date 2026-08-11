import { describe, expect, it } from "vitest";
import { buildExecutiveDashboard } from "./buildExecutiveDashboard";
import {
  allCriticalLow,
  allLeadingHigh,
  emptyAssessment,
  mixedAssessment,
} from "@/src/domain/assessment/__fixtures__/states";
import {
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
    expect(model.assessmentConfidence.value).toBeNull();
    expect(model.assessmentConfidence.label).toBeNull();
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
    expect(model.annualValueAtRisk.current).toBe(7_946_000);
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

  it("surfaces the one overall self-rated confidence response", () => {
    const model = buildExecutiveDashboard(mixedAssessment());
    expect(model.assessmentConfidence).toEqual({
      value: "medium",
      label: "Medium",
    });
  });

  it("keeps confidence separate from current VaR", () => {
    expect(
      buildExecutiveDashboard(allCriticalLow).annualValueAtRisk.current,
    ).toBe(10_700_000);
    expect(
      buildExecutiveDashboard(allLeadingHigh).annualValueAtRisk.current,
    ).toBe(4_750_000);
    expect(
      buildExecutiveDashboard(allLeadingHigh).annualValueAtRisk.low,
    ).toBe(leadingHigh.totalCost);
    expect(
      buildExecutiveDashboard(allCriticalLow).assessmentConfidence.label,
    ).toBe("Low");
    expect(
      buildExecutiveDashboard(allLeadingHigh).assessmentConfidence.label,
    ).toBe("High");
  });
});
