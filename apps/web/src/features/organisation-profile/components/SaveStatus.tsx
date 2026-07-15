import type { OrganisationProfileSaveStatus } from "@/src/lib/organisationProfilePersistence";
import styles from "./SaveStatus.module.css";

export function SaveStatus({
  status,
}: {
  status: OrganisationProfileSaveStatus;
}) {
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
      data-testid="profile-save-status"
      aria-live="polite"
    >
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </p>
  );
}
