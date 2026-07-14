import type { ConfidenceLevel, ConfidenceValue } from "./types";

/**
 * Exact confidence levels and cost multipliers from legacy/v0.3.1/index.html.
 * Low confidence increases estimated cost; high confidence leaves cost unscaled.
 */
export const CONFIDENCE_LEVELS: readonly ConfidenceLevel[] = [
  { value: "low", label: "Low", factor: 1.15 },
  { value: "medium", label: "Medium", factor: 1.07 },
  { value: "high", label: "High", factor: 1.0 },
] as const;

/** Default applied by the prototype when maturity is chosen without confidence */
export const DEFAULT_CONFIDENCE: ConfidenceValue = "medium";

export function confidenceFactorForValue(
  value: ConfidenceValue | string | undefined,
): number {
  const resolved = (value || DEFAULT_CONFIDENCE) as ConfidenceValue;
  const found = CONFIDENCE_LEVELS.find((c) => c.value === resolved);
  return found ? found.factor : CONFIDENCE_LEVELS.find((c) => c.value === DEFAULT_CONFIDENCE)!.factor;
}
