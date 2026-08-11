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
  return (
    <MetricCard
      title="Leadership Confidence"
      valueFirst
      data-testid="metric-confidence"
    >
      <MetricHeadline>
        {confidence.label ? `${confidence.label} — self-rated` : "—"}
      </MetricHeadline>
      <MetricSupport>
        {confidence.label
          ? "Next: validate the highest-risk departments with evidence"
          : "Complete the overall confidence step after reviewing answers"}
      </MetricSupport>
    </MetricCard>
  );
}
