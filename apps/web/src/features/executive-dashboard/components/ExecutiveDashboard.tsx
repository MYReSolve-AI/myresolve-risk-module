"use client";

import type { ReactNode } from "react";
import type { AssessmentAnswers } from "@/src/domain/assessment";
import { buildExecutiveDashboard } from "../model/buildExecutiveDashboard";
import { ExecutiveHealthScore } from "./ExecutiveHealthScore";
import { AnnualValueAtRiskCard } from "./AnnualValueAtRiskCard";
import { AssessmentConfidenceCard } from "./AssessmentConfidenceCard";
import { HighestRiskDepartmentCard } from "./HighestRiskDepartmentCard";
import { DepartmentScoreGrid } from "./DepartmentScoreCard";
import { PrioritiesPanel } from "./PrioritiesList";
import { DashboardSection } from "../ui/DashboardSection";
import { SectionHeading } from "../ui/SectionHeading";
import sr from "../ui/sr.module.css";
import styles from "./ExecutiveDashboard.module.css";

export type ExecutiveDashboardProps = {
  state: AssessmentAnswers;
  /** Optional developer actions — must only be supplied in Developer Mode */
  actions?: ReactNode;
  /** Organisation name when available; omit or leave empty to hide */
  companyName?: string;
  /** Completion date when available; omit or leave empty to hide */
  assessmentDate?: string;
};

function hasDisplayValue(value: string | undefined): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed !== "—";
}

export function ExecutiveDashboard({
  state,
  actions,
  companyName,
  assessmentDate,
}: ExecutiveDashboardProps) {
  const model = buildExecutiveDashboard(state);
  const assessmentCompleted =
    model.completedCount === model.totalQuestions && model.totalQuestions > 0
      ? "Yes"
      : model.hasAnyAnswers
        ? "In progress"
        : "Not started";

  const showCompany = hasDisplayValue(companyName);
  const showDate = hasDisplayValue(assessmentDate);

  return (
    <div className={styles.page} data-testid="executive-dashboard">
      <header className={styles.appHeader}>
        <div className={styles.appHeaderInner}>
          <div className={styles.brandBlock}>
            <h1 className={styles.brandName}>MYReSolve</h1>
            <p className={styles.productLine}>
              Executive Operational Intelligence
            </p>
          </div>
          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <p className={styles.metaLabel}>Assessment completed</p>
              <p className={styles.metaValue}>{assessmentCompleted}</p>
            </div>
            {showDate ? (
              <div className={styles.metaItem}>
                <p className={styles.metaLabel}>Date</p>
                <p className={styles.metaValue}>{assessmentDate}</p>
              </div>
            ) : null}
            {showCompany ? (
              <div className={styles.metaItem}>
                <p className={styles.metaLabel}>Company</p>
                <p className={styles.metaValue}>{companyName}</p>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div className={styles.inner}>
        {/* Progress remains in the assessment experience; retained for a11y/test parity only */}
        <div className={sr.srOnly} data-testid="assessment-progress">
          {model.completedCount}/{model.totalQuestions} · {model.progressPercent}
          %
        </div>

        {actions ? <div className={styles.devPanel}>{actions}</div> : null}

        {!model.hasAnyAnswers ? (
          <p className={styles.emptyBanner} data-testid="empty-banner">
            No assessment responses loaded yet. Values below remain at the
            domain empty baseline until answers are provided.
          </p>
        ) : null}

        <section className={styles.metrics} aria-label="Executive metrics">
          <ExecutiveHealthScore health={model.executiveHealth} />
          <AnnualValueAtRiskCard valueAtRisk={model.annualValueAtRisk} />
          <AssessmentConfidenceCard confidence={model.assessmentConfidence} />
          <HighestRiskDepartmentCard
            department={model.highestRiskDepartment}
          />
        </section>

        <DashboardSection
          aria-labelledby="dept-heading"
          header={
            <SectionHeading
              id="dept-heading"
              eyebrow="Exposure"
              title="Department Risk Overview"
              subtitle="Health, maturity and risk rating by department."
            />
          }
        >
          <DepartmentScoreGrid departments={model.departments} />
        </DashboardSection>

        <DashboardSection
          aria-labelledby="priorities-heading"
          header={
            <SectionHeading
              id="priorities-heading"
              eyebrow="Focus"
              title="Top Three Risk Areas"
            />
          }
        >
          <PrioritiesPanel
            priorities={model.topPriorities}
            priorityCount={model.priorityCount}
          />
        </DashboardSection>
      </div>
    </div>
  );
}
