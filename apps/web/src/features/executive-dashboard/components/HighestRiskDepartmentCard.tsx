import type { DepartmentResult } from "@/src/domain/assessment";
import { formatGbp } from "../lib/format";
import {
  MetricCard,
  MetricHeadline,
  MetricRow,
  MetricSupport,
} from "./MetricCard";
import { RiskBadge, StatusBadge, maturityTone } from "../ui/StatusBadge";

export type HighestRiskDepartmentCardProps = {
  department: DepartmentResult | null;
};

export function HighestRiskDepartmentCard({
  department,
}: HighestRiskDepartmentCardProps) {
  return (
    <MetricCard
      title="Highest Risk Department"
      valueFirst
      data-testid="metric-highest-risk"
    >
      <MetricHeadline>{department ? department.name : "—"}</MetricHeadline>
      {department ? (
        <>
          <MetricRow>
            <RiskBadge rating={department.riskRating} />
            <StatusBadge
              label={department.maturityLevel}
              tone={maturityTone(department.maturityLevel)}
            />
          </MetricRow>
          <MetricSupport>
            Risk {department.risk} · {formatGbp(department.cost)}
          </MetricSupport>
        </>
      ) : (
        <MetricSupport>Available once departments are scored.</MetricSupport>
      )}
    </MetricCard>
  );
}
