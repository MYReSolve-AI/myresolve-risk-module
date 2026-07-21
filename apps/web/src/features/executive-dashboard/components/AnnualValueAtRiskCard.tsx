import type { AnnualValueAtRisk } from "../model/buildExecutiveDashboard";
import { formatGbp } from "../lib/format";
import {
  MetricCard,
  MetricHeadline,
  MetricSupport,
} from "./MetricCard";
import styles from "./AnnualValueAtRiskCard.module.css";

export type AnnualValueAtRiskCardProps = {
  valueAtRisk: AnnualValueAtRisk;
};

export function AnnualValueAtRiskCard({
  valueAtRisk,
}: AnnualValueAtRiskCardProps) {
  return (
    <MetricCard
      title="Total Estimated Annual Value at Risk"
      valueFirst
      data-testid="metric-var"
    >
      <MetricHeadline>{formatGbp(valueAtRisk.current)}</MetricHeadline>
      <MetricSupport>
        Low {formatGbp(valueAtRisk.low)} · High {formatGbp(valueAtRisk.high)}
      </MetricSupport>
      <p className={styles.explanation}>
        An illustrative estimate of the annual value that may be exposed
        through the risks identified in this assessment.
      </p>
      <p className={styles.disclaimer}>
        The total combines six department estimates using fixed MYReSolve
        scenario ranges. It is not an audited loss calculation or financial
        forecast.
      </p>
    </MetricCard>
  );
}
