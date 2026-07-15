import styles from "./ProfileNavigation.module.css";

export function ProfileNavigation({
  canGoPrevious,
  isLastSection,
  onPrevious,
  onNext,
  onReview,
  onSaveAndExit,
}: {
  canGoPrevious: boolean;
  isLastSection: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onReview: () => void;
  onSaveAndExit: () => void;
}) {
  return (
    <nav className={styles.nav} aria-label="Profile navigation" data-testid="profile-nav">
      <div className={styles.group}>
        <button
          type="button"
          className={`${styles.button} ${styles.secondary}`}
          onClick={onPrevious}
          disabled={!canGoPrevious}
          data-testid="profile-previous"
        >
          Previous
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={onNext}
          data-testid="profile-next"
        >
          {isLastSection ? "Review" : "Next"}
        </button>
      </div>
      <div className={styles.group}>
        <button
          type="button"
          className={`${styles.button} ${styles.ghost}`}
          onClick={onReview}
          data-testid="profile-open-review"
        >
          Review
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.secondary}`}
          onClick={onSaveAndExit}
          data-testid="profile-save-exit"
        >
          Save and exit
        </button>
      </div>
    </nav>
  );
}
