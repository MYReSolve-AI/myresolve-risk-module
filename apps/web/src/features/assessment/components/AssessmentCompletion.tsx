import Link from "next/link";
import { ORGANISATION_PROFILE_PRIVACY_COPY } from "@/src/domain/organisationProfile";
import styles from "./AssessmentCompletion.module.css";

export function AssessmentCompletion() {
  return (
    <section
      className={styles.panel}
      aria-labelledby="assessment-complete-title"
      data-testid="assessment-completion"
    >
      <h2 id="assessment-complete-title" className={styles.title}>
        Assessment complete
      </h2>
      <p className={styles.copy}>
        Your responses have been saved and your dashboard is ready.
      </p>
      <div className={styles.actions}>
        <Link
          href="/dashboard"
          className={`${styles.action} ${styles.primary}`}
          data-testid="completion-dashboard"
        >
          View dashboard
        </Link>
      </div>
      <div className={styles.booking} data-testid="completion-booking">
        <h3 className={styles.bookingTitle}>Want to go deeper on your results?</h3>
        <p className={styles.bookingCopy}>
          I&apos;m working directly with a small number of leaders as MYReSolve
          develops. If your assessment surfaced something worth acting on,
          book a free 30-minute conversation — no pitch, just a closer look at
          your priorities and what would actually help.
        </p>
        <Link
          href="/contact"
          className={`${styles.action} ${styles.primary}`}
          data-testid="completion-contact"
        >
          Book a 30-minute conversation
        </Link>
      </div>
      <p className={styles.privacy} data-testid="completion-privacy">
        <strong>Private preview.</strong> {ORGANISATION_PROFILE_PRIVACY_COPY}
      </p>
    </section>
  );
}
