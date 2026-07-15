import type { AssessmentConfidenceSummary } from "../model/buildExecutiveDashboard";
import {
  MetricCard,
  MetricHeadline,
  MetricSupport,
} from "./MetricCard";
import { StatusBadge } from "../ui/StatusBadge";
import styles from "./ExecutiveMetric.module.css";

export type AssessmentConfidenceCardProps = {
  confidence: AssessmentConfidenceSummary;
};

export function AssessmentConfidenceCard({
  confidence,
}: AssessmentConfidenceCardProps) {
  const hasAnswers = confidence.answeredCount > 0;

  return (
    <MetricCard
      title="Assessment Confidence"
      valueFirst
      data-testid="metric-confidence"
    >
      <MetricHeadline>
        {hasAnswers ? `${confidence.predominant} confidence` : "—"}
      </MetricHeadline>
      <MetricSupport>
        {hasAnswers
          ? `${confidence.answeredCount} responses`
          : "Awaiting assessment responses"}
      </MetricSupport>
      {hasAnswers ? (
        <ul className={styles.confidenceBreakdown} aria-label="Confidence mix">
          <li>
            <StatusBadge label={`High ${confidence.counts.high}`} tone="good" />
          </li>
          <li>
            <StatusBadge
              label={`Medium ${confidence.counts.medium}`}
              tone="gold"
            />
          </li>
          <li>
            <StatusBadge label={`Low ${confidence.counts.low}`} tone="amber" />
          </li>
        </ul>
      ) : null}
    </MetricCard>
  );
}
