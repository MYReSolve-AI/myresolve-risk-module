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
import styles from "./ExecutiveHealthScore.module.css";

export type ExecutiveHealthScoreProps = {
  health: ExecutiveHealth;
};

const MATURITY_BANDS = [
  { name: "Leading", className: "leading" },
  { name: "Strong", className: "strong" },
  { name: "Established", className: "established" },
  { name: "Developing", className: "developing" },
  { name: "Critical", className: "critical" },
] as const;

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
        <StatusBadge
          label={health.riskRating}
          tone={riskTone(health.riskRating)}
        />
      </MetricRow>
      <div
        className={styles.scale}
        aria-label={`Maturity scale. Current position ${health.maturityLevel}.`}
      >
        {MATURITY_BANDS.map((band) => {
          const current = band.name === health.maturityLevel;
          return (
            <div
              key={band.name}
              aria-current={current ? "true" : undefined}
              className={[
                styles.band,
                styles[band.className],
                current ? styles.current : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span>{band.name}</span>
              {current ? <strong>Current</strong> : null}
            </div>
          );
        })}
      </div>
      <p className={styles.explanation}>
        Based on 24 self-assessed responses across six areas of the company.
        This is a MYReSolve maturity measure, not an industry benchmark.
      </p>
    </MetricCard>
  );
}
