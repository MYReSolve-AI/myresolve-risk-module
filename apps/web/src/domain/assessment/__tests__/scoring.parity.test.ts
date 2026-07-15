import { describe, expect, it } from "vitest";
import {
  CONFIDENCE_LEVELS,
  MATURITY_LEVELS,
  SECTIONS,
  TOTAL_QUESTIONS,
  STORAGE_KEY,
  allDepartmentCostRanges,
  allQuestions,
  buildCsvRows,
  exportAssessmentCsv,
  maturityNameFromScore,
  overallScore,
  priorityCount,
  rankDepartmentsByRisk,
  rating,
  sectionCost,
  sectionRisk,
  sectionScore,
  topPriorities,
  totalActiveCost,
  allDepartmentResults,
} from "../index";
import {
  allCriticalLow,
  allEstablishedMedium,
  allLeadingHigh,
  emptyAssessment,
  incompleteAssessment,
  mixedAssessment,
} from "../__fixtures__/states";
import {
  costRanges,
  criticalLow,
  empty,
  establishedMedium,
  incomplete,
  leadingHigh,
  mixed,
  type GoldenCase,
} from "../__fixtures__/golden";
import type { AssessmentAnswers } from "../types";

function assertParity(state: AssessmentAnswers, golden: GoldenCase) {
  const depts = allDepartmentResults(state);
  expect(depts).toHaveLength(6);

  golden.depts.forEach((g, i) => {
    expect(depts[i].name).toBe(g.name);
    expect(sectionScore(i, state.answers)).toBe(g.score);
    expect(sectionRisk(i, state.answers)).toBe(g.risk);
    expect(sectionCost(i, state.answers, state.confidence)).toBe(g.cost);
    expect(depts[i].maturityLevel).toBe(g.maturity);
    expect(depts[i].riskRating).toBe(g.rating);
    expect(depts[i].hasAnswers).toBe(g.has);
    expect(depts[i].cost).toBe(g.cost);
    // annual cost low/high assumptions unchanged
    expect(depts[i].name).toBe(costRanges[i].name);
  });

  const overall = overallScore(state.answers);
  expect(overall).toBe(golden.overall);
  expect(rating(overall)).toBe(golden.overallRating);
  expect(maturityNameFromScore(overall)).toBe(golden.overallMaturity);

  const ranked = rankDepartmentsByRisk(state);
  expect(ranked.map((d) => d.name)).toEqual(golden.ranked);
  expect(topPriorities(state).map((d) => d.name)).toEqual(golden.top3);
  expect(priorityCount(state)).toBe(golden.priorityCount);
  expect(totalActiveCost(state)).toBe(golden.totalCost);

  const rows = buildCsvRows(state);
  expect(rows).toEqual(golden.csv);

  const csvText = exportAssessmentCsv(state);
  const expectedText = golden.csv
    .map((r) => r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  expect(csvText).toBe(expectedText);
}

describe("v0.3.1 locked catalogue", () => {
  it("preserves six departments, 24 questions and stable IDs", () => {
    expect(SECTIONS).toHaveLength(6);
    expect(TOTAL_QUESTIONS).toBe(24);
    expect(allQuestions().map((q) => q.id)).toEqual([
      "0-0", "0-1", "0-2", "0-3",
      "1-0", "1-1", "1-2", "1-3",
      "2-0", "2-1", "2-2", "2-3",
      "3-0", "3-1", "3-2", "3-3",
      "4-0", "4-1", "4-2", "4-3",
      "5-0", "5-1", "5-2", "5-3",
    ]);
    expect(SECTIONS.map((s) => s.name)).toEqual([
      "People",
      "Process",
      "Customer",
      "Operations",
      "Technology",
      "Finance",
    ]);
  });

  it("preserves exact question wording in order", () => {
    expect(SECTIONS[0].questions.map((q) => q.text)).toEqual([
      "Do we have the right people in the right roles?",
      "Are teams clear on what good performance looks like?",
      "Do we invest in people consistently?",
      "Is accountability clear and reinforced?",
    ]);
    expect(SECTIONS[5].questions.map((q) => q.text)).toEqual([
      "Do we understand the true cost of serving customers?",
      "Are forecasts and reports trusted?",
      "Is commercial discipline consistently strong?",
      "Are we investing in the right areas?",
    ]);
  });

  it("preserves maturity labels/values and confidence multipliers", () => {
    expect(MATURITY_LEVELS).toEqual([
      { value: 1, name: "Critical" },
      { value: 2, name: "Developing" },
      { value: 3, name: "Established" },
      { value: 4, name: "Strong" },
      { value: 5, name: "Leading" },
    ]);
    expect(CONFIDENCE_LEVELS.map((c) => [c.value, c.factor])).toEqual([
      ["low", 1.15],
      ["medium", 1.07],
      ["high", 1.0],
    ]);
    expect(STORAGE_KEY).toBe("myresolve_answers_v03");
  });

  it("preserves department cost low/high ranges", () => {
    expect(allDepartmentCostRanges()).toEqual(
      costRanges.map(({ name, low, high }) => ({ name, low, high })),
    );
  });

  it("preserves rating and maturity-name thresholds", () => {
    expect(rating(79)).toBe("MODERATE");
    expect(rating(80)).toBe("LOW");
    expect(rating(60)).toBe("MODERATE");
    expect(rating(59)).toBe("HIGH");
    expect(rating(40)).toBe("HIGH");
    expect(rating(39)).toBe("CRITICAL");

    expect(maturityNameFromScore(88)).toBe("Leading");
    expect(maturityNameFromScore(87)).toBe("Strong");
    expect(maturityNameFromScore(63)).toBe("Strong");
    expect(maturityNameFromScore(62)).toBe("Established");
    expect(maturityNameFromScore(38)).toBe("Established");
    expect(maturityNameFromScore(37)).toBe("Developing");
    expect(maturityNameFromScore(13)).toBe("Developing");
    expect(maturityNameFromScore(12)).toBe("Critical");
  });
});

describe("golden parity scenarios", () => {
  it("all answers Critical + Low confidence", () => {
    assertParity(allCriticalLow, criticalLow);
  });

  it("all answers Established + Medium confidence", () => {
    assertParity(allEstablishedMedium, establishedMedium);
  });

  it("all answers Leading + High confidence", () => {
    assertParity(allLeadingHigh, leadingHigh);
  });

  it("mixed answers covering every department", () => {
    assertParity(mixedAssessment(), mixed);
  });

  it("incomplete assessment behaviour", () => {
    assertParity(incompleteAssessment(), incomplete);
  });

  it("empty assessment behaviour", () => {
    assertParity(emptyAssessment, empty);
  });
});

describe("incomplete handling specifics", () => {
  it("averages only answered questions within a partial section", () => {
    const state = incompleteAssessment();
    // People: only Q1 = Developing (2) → score 25
    expect(sectionScore(0, state.answers)).toBe(25);
    // Process: Strong(4)+Leading(5) → avg 4.5 → 88
    expect(sectionScore(1, state.answers)).toBe(88);
    // Unanswered departments: score 0, CSV still lists high cost band * factor 1
    expect(sectionCost(2, state.answers, state.confidence)).toBe(2_800_000);
    expect(rankDepartmentsByRisk(state).map((d) => d.name)).toEqual([
      "People",
      "Process",
    ]);
  });

  it("defaults missing confidence to medium for cost factor", () => {
    const answers = { "0-0": 3, "0-1": 3, "0-2": 3, "0-3": 3 };
    const confidence = {}; // none set
    // score 50, risk 50, factor 1.07 → 1203750
    expect(sectionCost(0, answers, confidence)).toBe(1_203_750);
  });
});
