import type { ExecutiveHealth } from "../model/buildExecutiveDashboard";
import { formatScore } from "../lib/format";
import {
  MetricCard,
  MetricHeadline,
  MetricRow,
  MetricSupport,
} from "./MetricCard";
import { RiskBadge, StatusBadge, maturityTone } from "../ui/StatusBadge";
import sr from "../ui/sr.module.css";
import styles from "./ExecutiveHealthScore.module.css";

export type ExecutiveHealthScoreProps = {
  health: ExecutiveHealth;
};

export function ExecutiveHealthScore({ health }: ExecutiveHealthScoreProps) {
  return (
    <MetricCard
      title="Executive Health Score"
      valueFirst
      data-testid="metric-health"
    >
      <MetricHeadline>{health.score} / 100</MetricHeadline>
      <span className={sr.srOnly}>{formatScore(health.score)}</span>
      <MetricSupport>Position on the MYReSolve maturity scale</MetricSupport>
      <MetricRow>
        <StatusBadge
          label={health.maturityLevel}
          tone={maturityTone(health.maturityLevel)}
        />
        <RiskBadge rating={health.riskRating} />
      </MetricRow>
      <p className={styles.explanation}>
        Based on 24 self-assessed responses across six areas of the company.
        This is a MYReSolve maturity measure, not an industry benchmark.
      </p>
    </MetricCard>
  );
}
