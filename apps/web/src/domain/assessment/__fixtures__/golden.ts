/**
 * Golden expected outputs for v0.3.1 behavioural parity.
 * Values computed from the locked formulas in legacy/v0.3.1/index.html.
 */

export const costRanges = [
  { name: "People", low: 750_000, high: 1_500_000 },
  { name: "Process", low: 1_000_000, high: 2_200_000 },
  { name: "Customer", low: 1_200_000, high: 2_800_000 },
  { name: "Operations", low: 800_000, high: 1_800_000 },
  { name: "Technology", low: 400_000, high: 1_000_000 },
  { name: "Finance", low: 600_000, high: 1_400_000 },
] as const;

export type GoldenDept = {
  name: string;
  score: number;
  risk: number;
  cost: number;
  maturity: string;
  rating: string;
  has: boolean;
};

export type GoldenCase = {
  depts: GoldenDept[];
  ranked: string[];
  top3: string[];
  priorityCount: number;
  overall: number;
  overallRating: string;
  overallMaturity: string;
  totalCost: number;
  csv: (string | number)[][];
};

export const criticalLow: GoldenCase = {
  depts: [
    { name: "People", score: 0, risk: 100, cost: 1_725_000, maturity: "Critical", rating: "CRITICAL", has: true },
    { name: "Process", score: 0, risk: 100, cost: 2_530_000, maturity: "Critical", rating: "CRITICAL", has: true },
    { name: "Customer", score: 0, risk: 100, cost: 3_220_000, maturity: "Critical", rating: "CRITICAL", has: true },
    { name: "Operations", score: 0, risk: 100, cost: 2_070_000, maturity: "Critical", rating: "CRITICAL", has: true },
    { name: "Technology", score: 0, risk: 100, cost: 1_150_000, maturity: "Critical", rating: "CRITICAL", has: true },
    { name: "Finance", score: 0, risk: 100, cost: 1_610_000, maturity: "Critical", rating: "CRITICAL", has: true },
  ],
  ranked: ["People", "Process", "Customer", "Operations", "Technology", "Finance"],
  top3: ["People", "Process", "Customer"],
  priorityCount: 6,
  overall: 0,
  overallRating: "CRITICAL",
  overallMaturity: "Critical",
  totalCost: 12_305_000,
  csv: [
    ["Department", "Maturity Score", "Maturity Level", "Risk Rating", "Estimated Annual Cost"],
    ["People", 0, "Critical", "CRITICAL", 1_725_000],
    ["Process", 0, "Critical", "CRITICAL", 2_530_000],
    ["Customer", 0, "Critical", "CRITICAL", 3_220_000],
    ["Operations", 0, "Critical", "CRITICAL", 2_070_000],
    ["Technology", 0, "Critical", "CRITICAL", 1_150_000],
    ["Finance", 0, "Critical", "CRITICAL", 1_610_000],
  ],
};

export const establishedMedium: GoldenCase = {
  depts: [
    { name: "People", score: 50, risk: 50, cost: 1_203_750, maturity: "Established", rating: "HIGH", has: true },
    { name: "Process", score: 50, risk: 50, cost: 1_712_000, maturity: "Established", rating: "HIGH", has: true },
    { name: "Customer", score: 50, risk: 50, cost: 2_140_000, maturity: "Established", rating: "HIGH", has: true },
    { name: "Operations", score: 50, risk: 50, cost: 1_391_000, maturity: "Established", rating: "HIGH", has: true },
    { name: "Technology", score: 50, risk: 50, cost: 749_000, maturity: "Established", rating: "HIGH", has: true },
    { name: "Finance", score: 50, risk: 50, cost: 1_070_000, maturity: "Established", rating: "HIGH", has: true },
  ],
  ranked: ["People", "Process", "Customer", "Operations", "Technology", "Finance"],
  top3: ["People", "Process", "Customer"],
  priorityCount: 6,
  overall: 50,
  overallRating: "HIGH",
  overallMaturity: "Established",
  totalCost: 8_265_750,
  csv: [
    ["Department", "Maturity Score", "Maturity Level", "Risk Rating", "Estimated Annual Cost"],
    ["People", 50, "Established", "HIGH", 1_203_750],
    ["Process", 50, "Established", "HIGH", 1_712_000],
    ["Customer", 50, "Established", "HIGH", 2_140_000],
    ["Operations", 50, "Established", "HIGH", 1_391_000],
    ["Technology", 50, "Established", "HIGH", 749_000],
    ["Finance", 50, "Established", "HIGH", 1_070_000],
  ],
};

export const leadingHigh: GoldenCase = {
  depts: [
    { name: "People", score: 100, risk: 0, cost: 750_000, maturity: "Leading", rating: "LOW", has: true },
    { name: "Process", score: 100, risk: 0, cost: 1_000_000, maturity: "Leading", rating: "LOW", has: true },
    { name: "Customer", score: 100, risk: 0, cost: 1_200_000, maturity: "Leading", rating: "LOW", has: true },
    { name: "Operations", score: 100, risk: 0, cost: 800_000, maturity: "Leading", rating: "LOW", has: true },
    { name: "Technology", score: 100, risk: 0, cost: 400_000, maturity: "Leading", rating: "LOW", has: true },
    { name: "Finance", score: 100, risk: 0, cost: 600_000, maturity: "Leading", rating: "LOW", has: true },
  ],
  ranked: ["People", "Process", "Customer", "Operations", "Technology", "Finance"],
  top3: ["People", "Process", "Customer"],
  priorityCount: 0,
  overall: 100,
  overallRating: "LOW",
  overallMaturity: "Leading",
  totalCost: 4_750_000,
  csv: [
    ["Department", "Maturity Score", "Maturity Level", "Risk Rating", "Estimated Annual Cost"],
    ["People", 100, "Leading", "LOW", 750_000],
    ["Process", 100, "Leading", "LOW", 1_000_000],
    ["Customer", 100, "Leading", "LOW", 1_200_000],
    ["Operations", 100, "Leading", "LOW", 800_000],
    ["Technology", 100, "Leading", "LOW", 400_000],
    ["Finance", 100, "Leading", "LOW", 600_000],
  ],
};

export const mixed: GoldenCase = {
  depts: [
    { name: "People", score: 0, risk: 100, cost: 1_725_000, maturity: "Critical", rating: "CRITICAL", has: true },
    { name: "Process", score: 25, risk: 75, cost: 2_033_000, maturity: "Developing", rating: "CRITICAL", has: true },
    { name: "Customer", score: 50, risk: 50, cost: 2_000_000, maturity: "Established", rating: "HIGH", has: true },
    { name: "Operations", score: 75, risk: 25, cost: 1_123_500, maturity: "Strong", rating: "MODERATE", has: true },
    { name: "Technology", score: 100, risk: 0, cost: 400_000, maturity: "Leading", rating: "LOW", has: true },
    { name: "Finance", score: 38, risk: 62, cost: 1_175_460, maturity: "Established", rating: "CRITICAL", has: true },
  ],
  ranked: ["People", "Process", "Finance", "Customer", "Operations", "Technology"],
  top3: ["People", "Process", "Finance"],
  priorityCount: 4,
  overall: 48,
  overallRating: "HIGH",
  overallMaturity: "Established",
  totalCost: 8_456_960,
  csv: [
    ["Department", "Maturity Score", "Maturity Level", "Risk Rating", "Estimated Annual Cost"],
    ["People", 0, "Critical", "CRITICAL", 1_725_000],
    ["Process", 25, "Developing", "CRITICAL", 2_033_000],
    ["Customer", 50, "Established", "HIGH", 2_000_000],
    ["Operations", 75, "Strong", "MODERATE", 1_123_500],
    ["Technology", 100, "Leading", "LOW", 400_000],
    ["Finance", 38, "Established", "CRITICAL", 1_175_460],
  ],
};

export const incomplete: GoldenCase = {
  depts: [
    { name: "People", score: 25, risk: 75, cost: 1_509_375, maturity: "Developing", rating: "CRITICAL", has: true },
    { name: "Process", score: 88, risk: 12, cost: 1_144_000, maturity: "Leading", rating: "LOW", has: true },
    { name: "Customer", score: 0, risk: 100, cost: 2_800_000, maturity: "Critical", rating: "CRITICAL", has: false },
    { name: "Operations", score: 0, risk: 100, cost: 1_800_000, maturity: "Critical", rating: "CRITICAL", has: false },
    { name: "Technology", score: 0, risk: 100, cost: 1_000_000, maturity: "Critical", rating: "CRITICAL", has: false },
    { name: "Finance", score: 0, risk: 100, cost: 1_400_000, maturity: "Critical", rating: "CRITICAL", has: false },
  ],
  ranked: ["People", "Process"],
  top3: ["People", "Process"],
  priorityCount: 1,
  overall: 57,
  overallRating: "HIGH",
  overallMaturity: "Established",
  totalCost: 2_653_375,
  csv: [
    ["Department", "Maturity Score", "Maturity Level", "Risk Rating", "Estimated Annual Cost"],
    ["People", 25, "Developing", "CRITICAL", 1_509_375],
    ["Process", 88, "Leading", "LOW", 1_144_000],
    ["Customer", 0, "Critical", "CRITICAL", 2_800_000],
    ["Operations", 0, "Critical", "CRITICAL", 1_800_000],
    ["Technology", 0, "Critical", "CRITICAL", 1_000_000],
    ["Finance", 0, "Critical", "CRITICAL", 1_400_000],
  ],
};

export const empty: GoldenCase = {
  depts: [
    { name: "People", score: 0, risk: 100, cost: 1_500_000, maturity: "Critical", rating: "CRITICAL", has: false },
    { name: "Process", score: 0, risk: 100, cost: 2_200_000, maturity: "Critical", rating: "CRITICAL", has: false },
    { name: "Customer", score: 0, risk: 100, cost: 2_800_000, maturity: "Critical", rating: "CRITICAL", has: false },
    { name: "Operations", score: 0, risk: 100, cost: 1_800_000, maturity: "Critical", rating: "CRITICAL", has: false },
    { name: "Technology", score: 0, risk: 100, cost: 1_000_000, maturity: "Critical", rating: "CRITICAL", has: false },
    { name: "Finance", score: 0, risk: 100, cost: 1_400_000, maturity: "Critical", rating: "CRITICAL", has: false },
  ],
  ranked: [],
  top3: [],
  priorityCount: 0,
  overall: 0,
  overallRating: "CRITICAL",
  overallMaturity: "Critical",
  totalCost: 0,
  csv: [
    ["Department", "Maturity Score", "Maturity Level", "Risk Rating", "Estimated Annual Cost"],
    ["People", 0, "Critical", "CRITICAL", 1_500_000],
    ["Process", 0, "Critical", "CRITICAL", 2_200_000],
    ["Customer", 0, "Critical", "CRITICAL", 2_800_000],
    ["Operations", 0, "Critical", "CRITICAL", 1_800_000],
    ["Technology", 0, "Critical", "CRITICAL", 1_000_000],
    ["Finance", 0, "Critical", "CRITICAL", 1_400_000],
  ],
};
