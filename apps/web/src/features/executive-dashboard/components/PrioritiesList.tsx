import type { DepartmentResult } from "@/src/domain/assessment";
import type { RiskRating } from "@/src/domain/assessment";
import { formatGbp, formatScore } from "../lib/format";
import { RiskBadge, StatusBadge, maturityTone } from "../ui/StatusBadge";
import styles from "./PrioritiesList.module.css";

export type PrioritiesListProps = {
  priorities: DepartmentResult[];
};

function riskClass(rating: RiskRating): string {
  switch (rating) {
    case "CRITICAL":
      return styles.critical;
    case "HIGH":
      return styles.high;
    case "MODERATE":
      return styles.moderate;
    case "LOW":
      return styles.low;
  }
}

function ordinal(index: number): string {
  return ["first", "second", "third"][index] ?? `${index + 1}th`;
}

export function PrioritiesList({ priorities }: PrioritiesListProps) {
  if (priorities.length === 0) {
    return (
      <p className={styles.empty} data-testid="priorities-empty">
        Complete at least one assessment question to see top risk areas.
      </p>
    );
  }

  return (
    <ol className={styles.list} data-testid="priorities-list">
      {priorities.map((item, index) => (
        <li
          key={item.index}
          className={[styles.item, riskClass(item.riskRating)]
            .filter(Boolean)
            .join(" ")}
          data-risk={item.riskRating.toLowerCase()}
        >
          <p className={styles.rank}>Priority {index + 1}</p>
          <div className={styles.headingRow}>
            <h3 className={styles.name}>{item.name}</h3>
            <RiskBadge rating={item.riskRating} />
          </div>
          <div className={styles.maturity}>
            <StatusBadge
              label={item.maturityLevel}
              tone={maturityTone(item.maturityLevel)}
            />
          </div>
          <dl className={styles.metrics}>
            <div>
              <dt>Health Score</dt>
              <dd>{formatScore(item.score)}</dd>
            </div>
            <div>
              <dt>Risk score</dt>
              <dd>{formatScore(item.risk)}</dd>
            </div>
            <div>
              <dt>Estimated value at risk</dt>
              <dd>{formatGbp(item.cost)}</dd>
            </div>
          </dl>
          <p className={styles.explanation}>
            Ranked {ordinal(index)} because it has one of the highest current
            risk scores among departments with assessment answers.
          </p>
          <p className={styles.action}>
            <strong>Next action:</strong> Review the four {item.name} responses
            and the evidence supporting them.
          </p>
        </li>
      ))}
    </ol>
  );
}

export type PrioritiesPanelProps = {
  priorities: DepartmentResult[];
  priorityCount: number;
};

export function PrioritiesPanel({
  priorities,
  priorityCount,
}: PrioritiesPanelProps) {
  return (
    <div className={styles.panel} data-testid="metric-priorities">
      <p className={styles.note}>
        Departments needing attention (health score &lt; 60):{" "}
        <strong>{priorityCount}</strong>
      </p>
      <PrioritiesList priorities={priorities} />
    </div>
  );
}
