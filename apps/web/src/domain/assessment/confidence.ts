import type { ConfidenceLevel } from "./types";

/** Overall self-rated leadership confidence options. */
export const CONFIDENCE_LEVELS: readonly ConfidenceLevel[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
] as const;
