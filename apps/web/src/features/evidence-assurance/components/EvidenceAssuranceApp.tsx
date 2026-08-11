"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  allDepartmentResults,
  type AssessmentAnswers,
} from "@/src/domain/assessment";
import {
  ASSURANCE_STATUS_OPTIONS,
  assuranceReviewFor,
  assuranceStatusLabel,
  evidenceAssuranceSummary,
  type AssuranceStatus,
  type DepartmentAssuranceReview,
  type EvidenceAssuranceState,
} from "@/src/domain/evidenceAssurance";
import { loadAssessmentAnswers } from "@/src/lib/assessmentPersistence";
import {
  loadEvidenceAssurance,
  saveEvidenceAssurance,
} from "@/src/lib/evidenceAssurancePersistence";
import styles from "./EvidenceAssuranceApp.module.css";

function updateReview(
  state: EvidenceAssuranceState,
  departmentIndex: number,
  patch: Partial<DepartmentAssuranceReview>,
): EvidenceAssuranceState {
  return {
    ...state,
    reviews: {
      ...state.reviews,
      [String(departmentIndex)]: {
        ...assuranceReviewFor(state, departmentIndex),
        ...patch,
        departmentIndex,
        updatedAt: new Date().toISOString(),
      },
    },
  };
}

export function EvidenceAssuranceApp() {
  const [assessment] = useState<AssessmentAnswers>(() => loadAssessmentAnswers());
  const [assurance, setAssurance] = useState<EvidenceAssuranceState>(() =>
    loadEvidenceAssurance(),
  );
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null,
  );

  const departments = useMemo(
    () =>
      allDepartmentResults(assessment).sort(
        (a, b) =>
          Number(b.hasAnswers) - Number(a.hasAnswers) ||
          b.risk - a.risk ||
          a.index - b.index,
      ),
    [assessment],
  );
  const summary = evidenceAssuranceSummary(assurance);

  const savePatch = (
    departmentIndex: number,
    patch: Partial<DepartmentAssuranceReview>,
  ) => {
    setAssurance((current) => {
      const next = updateReview(current, departmentIndex, patch);
      saveEvidenceAssurance(next);
      return next;
    });
  };

  const active = departments.find((d) => d.index === selectedDepartment);
  const activeReview = active
    ? assuranceReviewFor(assurance, active.index)
    : null;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>MYReSolve prototype</p>
          <h1>Evidence and Assurance</h1>
          <p>
            Validate leadership judgement department by department without
            changing assessment scores or financial estimates.
          </p>
        </div>
        <Link href="/dashboard" className={styles.backLink}>
          Back to dashboard
        </Link>
      </header>

      <section className={styles.notice} aria-label="Prototype data guidance">
        <strong>Use synthetic or redacted references only.</strong> This
        browser-local prototype is not approved for confidential evidence,
        personal data or file uploads. Nothing is sent to MYReSolve.
      </section>

      <section className={styles.summary} aria-label="Assurance progress">
        <div>
          <span>{summary.reviewedCount}</span>
          <small>Evidence reviewed</small>
        </div>
        <div>
          <span>{summary.partlyEvidencedCount}</span>
          <small>Partly evidenced</small>
        </div>
        <div>
          <span>{summary.notReviewedCount}</span>
          <small>Not reviewed</small>
        </div>
      </section>

      {active && activeReview ? (
        <section className={styles.editor} data-testid="assurance-editor">
          <div className={styles.editorHeading}>
            <div>
              <p className={styles.eyebrow}>Department review</p>
              <h2>{active.name}</h2>
              <p>
                Health Score {active.score}/100 · Risk {active.riskRating}
              </p>
            </div>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => setSelectedDepartment(null)}
            >
              Return to departments
            </button>
          </div>

          <fieldset className={styles.statusFieldset}>
            <legend>Evidence status</legend>
            {ASSURANCE_STATUS_OPTIONS.map((option) => (
              <label key={option.value} className={styles.statusOption}>
                <input
                  type="radio"
                  name="assurance-status"
                  checked={activeReview.status === option.value}
                  onChange={() =>
                    savePatch(active.index, {
                      status: option.value as AssuranceStatus,
                    })
                  }
                />
                <span>
                  <strong>{option.label}</strong>
                  <small>{option.description}</small>
                </span>
              </label>
            ))}
          </fieldset>

          <div className={styles.formGrid}>
            <label>
              Reviewer name or role
              <input
                value={activeReview.reviewer}
                onChange={(event) =>
                  savePatch(active.index, { reviewer: event.target.value })
                }
                placeholder="Example: Operations lead"
              />
            </label>
            <label>
              Review date
              <input
                type="date"
                value={activeReview.reviewDate}
                onChange={(event) =>
                  savePatch(active.index, { reviewDate: event.target.value })
                }
              />
            </label>
            <label className={styles.fullWidth}>
              Redacted evidence references and notes
              <textarea
                value={activeReview.evidenceReferences}
                onChange={(event) =>
                  savePatch(active.index, {
                    evidenceReferences: event.target.value,
                  })
                }
                placeholder="Reference document, dashboard or report names only. Do not paste confidential content."
              />
            </label>
            <label className={styles.fullWidth}>
              Missing information or follow-up required
              <textarea
                value={activeReview.missingInformation}
                onChange={(event) =>
                  savePatch(active.index, {
                    missingInformation: event.target.value,
                  })
                }
                placeholder="What still needs to be checked, obtained or clarified?"
              />
            </label>
          </div>
          <p className={styles.saved}>Changes save automatically in this browser.</p>
        </section>
      ) : (
        <section className={styles.departmentList}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>Review queue</p>
              <h2>Departments in risk-priority order</h2>
            </div>
            <p>Start with the highest-risk area that has not been reviewed.</p>
          </div>
          <div className={styles.cards} data-testid="assurance-department-list">
            {departments.map((department, position) => {
              const review = assuranceReviewFor(assurance, department.index);
              return (
                <article className={styles.card} key={department.index}>
                  <div>
                    <p className={styles.rank}>Priority {position + 1}</p>
                    <h3>{department.name}</h3>
                    <p className={styles.metrics}>
                      Health {department.score}/100 · Risk {department.riskRating}
                    </p>
                  </div>
                  <div className={styles.cardAction}>
                    <span data-status={review.status}>
                      {assuranceStatusLabel(review.status)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedDepartment(department.index)}
                      data-testid={`review-department-${department.index}`}
                    >
                      {review.status === "not_reviewed"
                        ? "Start review"
                        : "Continue review"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
