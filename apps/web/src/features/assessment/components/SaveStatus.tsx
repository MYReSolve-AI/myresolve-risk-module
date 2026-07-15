import type { SaveStatus as SaveStatusValue } from "@/src/lib/assessmentPersistence";
import styles from "./SaveStatus.module.css";

export type SaveStatusProps = {
  status: SaveStatusValue;
};

export function SaveStatus({ status }: SaveStatusProps) {
  const label =
    status === "saved"
      ? "Saved"
      : status === "saving"
        ? "Saving…"
        : status === "error"
          ? "Save failed"
          : "Not saved yet";

  return (
    <p
      className={[
        styles.status,
        status === "saved" ? styles.saved : "",
        status === "saving" ? styles.saving : "",
        status === "error" ? styles.error : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-testid="save-status"
      aria-live="polite"
    >
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </p>
  );
}
