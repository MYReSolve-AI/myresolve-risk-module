import type { ExecutiveHealth } from "../model/buildExecutiveDashboard";
import { formatScore } from "../lib/format";
import {
  MetricCard,
  MetricHeadline,
  MetricRow,
  MetricSupport,
} from "./MetricCard";
import { StatusBadge, maturityTone, riskTone } from "../ui/StatusBadge";
import sr from "../ui/sr.module.css";

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
      <MetricHeadline>{health.score}</MetricHeadline>
      <span className={sr.srOnly}>{formatScore(health.score)}</span>
      <MetricSupport>Operational Health</MetricSupport>
      <MetricRow>
        <StatusBadge
          label={health.maturityLevel}
          tone={maturityTone(health.maturityLevel)}
        />
        <StatusBadge
          label={health.riskRating}
          tone={riskTone(health.riskRating)}
        />
      </MetricRow>
    </MetricCard>
  );
}
