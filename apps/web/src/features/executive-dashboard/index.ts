export { buildExecutiveDashboard } from "./model/buildExecutiveDashboard";
export type {
  AnnualValueAtRisk,
  AssessmentConfidenceSummary,
  ExecutiveDashboardModel,
  ExecutiveHealth,
  OperationalHealth,
  RiskHeatCell,
} from "./model/buildExecutiveDashboard";

export { ExecutiveDashboard } from "./components/ExecutiveDashboard";
export { ExecutiveDashboardApp } from "./components/ExecutiveDashboardApp";
export { ExecutiveDashboardClient } from "./components/ExecutiveDashboardClient";
export { MetricCard } from "./components/MetricCard";
export { ProgressBar, scoreBarColor } from "./components/ProgressBar";
export {
  DepartmentScoreCard,
  DepartmentScoreGrid,
} from "./components/DepartmentScoreCard";
export { StatusBadge, RiskBadge, maturityTone, riskTone } from "./ui/StatusBadge";
export { SectionHeading } from "./ui/SectionHeading";
export { DashboardSection } from "./ui/DashboardSection";
export { PrioritiesList, PrioritiesPanel } from "./components/PrioritiesList";
export { ExecutiveHealthScore } from "./components/ExecutiveHealthScore";
export { AnnualValueAtRiskCard } from "./components/AnnualValueAtRiskCard";
export { AssessmentConfidenceCard } from "./components/AssessmentConfidenceCard";
export { HighestRiskDepartmentCard } from "./components/HighestRiskDepartmentCard";
export { formatGbp, formatScore } from "./lib/format";
