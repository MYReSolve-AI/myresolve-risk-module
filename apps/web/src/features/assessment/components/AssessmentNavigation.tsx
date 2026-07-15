import styles from "./AssessmentNavigation.module.css";

export type AssessmentNavigationProps = {
  canGoPrevious: boolean;
  isLastQuestion: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSaveAndExit: () => void;
  onReview: () => void;
  nextLabel?: string;
};

export function AssessmentNavigation({
  canGoPrevious,
  isLastQuestion,
  onPrevious,
  onNext,
  onSaveAndExit,
  onReview,
  nextLabel,
}: AssessmentNavigationProps) {
  return (
    <nav className={styles.nav} aria-label="Assessment navigation" data-testid="assessment-nav">
      <div className={styles.group}>
        <button
          type="button"
          className={`${styles.button} ${styles.secondary}`}
          onClick={onPrevious}
          disabled={!canGoPrevious}
          data-testid="nav-previous"
        >
          Previous
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={onNext}
          data-testid="nav-next"
        >
          {nextLabel ?? (isLastQuestion ? "Review answers" : "Next")}
        </button>
      </div>
      <div className={styles.group}>
        <button
          type="button"
          className={`${styles.button} ${styles.ghost}`}
          onClick={onReview}
          data-testid="nav-review"
        >
          Review answers
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.secondary}`}
          onClick={onSaveAndExit}
          data-testid="nav-save-exit"
        >
          Save and exit
        </button>
      </div>
    </nav>
  );
}
