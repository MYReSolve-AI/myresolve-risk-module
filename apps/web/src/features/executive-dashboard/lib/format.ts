/**
 * Presentation helpers only (formatting). No scoring logic.
 */

export function formatGbp(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatScore(score: number): string {
  return `${score}/100`;
}
