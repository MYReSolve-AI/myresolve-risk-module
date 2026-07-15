import type { DepartmentResult } from "@/src/domain/assessment";
import { formatGbp, formatScore } from "../lib/format";
import { ProgressBar, scoreBarColor } from "./ProgressBar";
import { RiskBadge, StatusBadge, maturityTone } from "../ui/StatusBadge";
import styles from "./DepartmentScoreCard.module.css";

export type DepartmentScoreCardProps = {
  department: DepartmentResult;
};

export function DepartmentScoreCard({ department }: DepartmentScoreCardProps) {
  return (
    <article
      className={styles.card}
      data-testid={`department-card-${department.name}`}
    >
      <div className={styles.header}>
        <h3 className={styles.name}>{department.name}</h3>
        <p className={styles.score}>{department.score}</p>
      </div>
      <ProgressBar
        value={department.score}
        color={scoreBarColor(department.score)}
        label="Health"
        valueLabel={formatScore(department.score)}
        data-testid={`department-progress-${department.name}`}
      />
      <div className={styles.meta}>
        <StatusBadge
          label={department.maturityLevel}
          tone={maturityTone(department.maturityLevel)}
        />
        <RiskBadge rating={department.riskRating} />
      </div>
      <p className={styles.cost}>Est. VaR {formatGbp(department.cost)}</p>
      {!department.hasAnswers ? (
        <p className={styles.empty}>No answers yet for this department.</p>
      ) : null}
    </article>
  );
}

export type DepartmentScoreGridProps = {
  departments: DepartmentResult[];
};

export function DepartmentScoreGrid({ departments }: DepartmentScoreGridProps) {
  return (
    <div className={styles.grid} data-testid="department-score-grid">
      {departments.map((department) => (
        <DepartmentScoreCard key={department.index} department={department} />
      ))}
    </div>
  );
}
