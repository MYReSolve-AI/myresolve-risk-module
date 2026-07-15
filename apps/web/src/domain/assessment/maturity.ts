import type {
  MaturityLevel,
  MaturityLevelName,
  MaturityValue,
} from "./types";

/** Exact maturity scale from legacy/v0.3.1/index.html */
export const MATURITY_LEVELS: readonly MaturityLevel[] = [
  { value: 1, name: "Critical" },
  { value: 2, name: "Developing" },
  { value: 3, name: "Established" },
  { value: 4, name: "Strong" },
  { value: 5, name: "Leading" },
] as const;

export function maturityValueToName(value: MaturityValue): MaturityLevelName {
  const found = MATURITY_LEVELS.find((m) => m.value === value);
  if (!found) {
    throw new Error(`Unknown maturity value: ${value}`);
  }
  return found.name;
}

/**
 * Map a 0–100 maturity score to a maturity band name.
 * Exact thresholds from v0.3.1 `maturityName(score)`.
 */
export function maturityNameFromScore(score: number): MaturityLevelName {
  if (score >= 88) return "Leading";
  if (score >= 63) return "Strong";
  if (score >= 38) return "Established";
  if (score >= 13) return "Developing";
  return "Critical";
}
