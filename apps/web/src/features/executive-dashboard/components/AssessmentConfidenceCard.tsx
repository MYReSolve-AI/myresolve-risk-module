import type { AssessmentConfidenceSummary } from "../model/buildExecutiveDashboard";
import {
  MetricCard,
  MetricHeadline,
  MetricSupport,
} from "./MetricCard";

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
    </MetricCard>
  );
}
