import styles from "./ProgressBar.module.css";

export type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
  valueLabel?: string;
  color?: string;
  "data-testid"?: string;
};

export function ProgressBar({
  value,
  max = 100,
  label,
  valueLabel,
  color = "var(--mr-green)",
  "data-testid": testId,
}: ProgressBarProps) {
  const pct = max <= 0 ? 0 : Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div data-testid={testId}>
      {(label || valueLabel) && (
        <div className={styles.labelRow}>
          <span className={styles.labelStrong}>{label}</span>
          <span>{valueLabel ?? `${Math.round(pct)}%`}</span>
        </div>
      )}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={styles.fill}
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

/** Score colour alignment with locked prototype thresholds */
export function scoreBarColor(score: number): string {
  if (score >= 75) return "var(--mr-good)";
  if (score >= 50) return "var(--mr-amber)";
  return "var(--mr-danger)";
}
