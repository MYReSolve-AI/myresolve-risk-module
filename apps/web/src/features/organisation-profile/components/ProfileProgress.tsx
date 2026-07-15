import styles from "./ProfileProgress.module.css";

export function ProfileProgress({
  sectionTitle,
  sectionIndex,
  sectionCount,
  percentComplete,
  requiredComplete,
  requiredTotal,
}: {
  sectionTitle: string;
  sectionIndex: number;
  sectionCount: number;
  percentComplete: number;
  requiredComplete: number;
  requiredTotal: number;
}) {
  return (
    <header className={styles.header} data-testid="profile-progress">
      <div className={styles.row}>
        <p className={styles.title}>{sectionTitle}</p>
        <p className={styles.meta}>
          Section {sectionIndex + 1} of {sectionCount}
        </p>
      </div>
      <p className={styles.meta}>
        {requiredComplete}/{requiredTotal} required · {percentComplete}%
      </p>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={percentComplete}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Organisation profile progress"
      >
        <div
          className={styles.fill}
          style={{ width: `${percentComplete}%` }}
        />
      </div>
    </header>
  );
}
