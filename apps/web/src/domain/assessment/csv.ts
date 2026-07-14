import { maturityNameFromScore } from "./maturity";
import { SECTIONS } from "./questions";
import { rating, sectionCost, sectionScore } from "./scoring";
import type { AssessmentAnswers } from "./types";

/** Exact CSV header row from v0.3.1 exportCSV() */
export const CSV_HEADERS = [
  "Department",
  "Maturity Score",
  "Maturity Level",
  "Risk Rating",
  "Estimated Annual Cost",
] as const;

export type CsvCell = string | number;

/**
 * Build CSV data rows for every department (including unanswered),
 * matching v0.3.1 exportCSV() which always iterates all sections.
 */
export function buildCsvRows(state: AssessmentAnswers): CsvCell[][] {
  const rows: CsvCell[][] = [[...CSV_HEADERS]];
  SECTIONS.forEach((s, i) => {
    const score = sectionScore(i, state.answers);
    rows.push([
      s.name,
      score,
      maturityNameFromScore(score),
      rating(score),
      sectionCost(i, state.answers, state.confidence),
    ]);
  });
  return rows;
}

/** Escape and join exactly as v0.3.1: `"${String(v).replaceAll('"','""')}"` */
export function formatCsv(rows: CsvCell[][]): string {
  return rows
    .map((r) =>
      r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(","),
    )
    .join("\n");
}

export function exportAssessmentCsv(state: AssessmentAnswers): string {
  return formatCsv(buildCsvRows(state));
}

export const CSV_DOWNLOAD_FILENAME =
  "MYReSolve_Executive_Maturity_Risk_Assessment.csv" as const;
