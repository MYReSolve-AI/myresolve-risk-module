import styles from "./ProgressHeader.module.css";

export type ProgressHeaderProps = {
  departmentName: string;
  questionPosition: number;
  totalQuestions: number;
  answeredCount: number;
  progressPercent: number;
};

export function ProgressHeader({
  departmentName,
  questionPosition,
  totalQuestions,
  answeredCount,
  progressPercent,
}: ProgressHeaderProps) {
  return (
    <header className={styles.header} data-testid="progress-header">
      <div className={styles.row}>
        <p className={styles.department}>{departmentName}</p>
        <p className={styles.meta}>
          Viewing question {questionPosition} of {totalQuestions}
        </p>
      </div>
      <div className={styles.row}>
        <p className={styles.meta}>
          {answeredCount} of {totalQuestions} answered
          {progressPercent === 100 ? " · Complete" : ""}
        </p>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Assessment progress"
      >
        <div
          className={styles.fill}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
}
