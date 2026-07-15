import type { AnnualValueAtRisk } from "../model/buildExecutiveDashboard";
import { formatGbp } from "../lib/format";
import {
  MetricCard,
  MetricHeadline,
  MetricSupport,
} from "./MetricCard";

export type AnnualValueAtRiskCardProps = {
  valueAtRisk: AnnualValueAtRisk;
};

export function AnnualValueAtRiskCard({
  valueAtRisk,
}: AnnualValueAtRiskCardProps) {
  return (
    <MetricCard
      title="Annual Value at Risk"
      valueFirst
      data-testid="metric-var"
    >
      <MetricHeadline>{formatGbp(valueAtRisk.current)}</MetricHeadline>
      <MetricSupport>
        Low {formatGbp(valueAtRisk.low)} · High {formatGbp(valueAtRisk.high)}
      </MetricSupport>
    </MetricCard>
  );
}
