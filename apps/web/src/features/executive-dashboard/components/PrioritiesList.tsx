import type { DepartmentResult } from "@/src/domain/assessment";
import { formatGbp } from "../lib/format";
import styles from "./PrioritiesList.module.css";

export type PrioritiesListProps = {
  priorities: DepartmentResult[];
};

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
        <li key={item.index} className={styles.item}>
          <h3 className={styles.name}>
            {index + 1}. {item.name}
          </h3>
          <p className={styles.detail}>
            <strong>{item.maturityLevel}</strong> maturity · risk rating{" "}
            <strong>{item.riskRating}</strong> · estimated annual value at risk{" "}
            <strong>{formatGbp(item.cost)}</strong>
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
