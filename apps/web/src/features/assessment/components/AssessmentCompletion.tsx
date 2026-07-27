import Link from "next/link";
import styles from "./AssessmentCompletion.module.css";

const UPDATES_EMAIL =
  "mailto:rob.myresolve@gmail.com?subject=MYReSolve%20updates";

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
        Your responses have been saved and your dashboard is ready. You can
        review your results now, contact Rob to discuss what they mean, or
        register your interest in future updates.
      </p>
      <div className={styles.actions}>
        <Link
          href="/dashboard"
          className={`${styles.action} ${styles.primary}`}
          data-testid="completion-dashboard"
        >
          View dashboard
        </Link>
        <Link
          href="/contact"
          className={`${styles.action} ${styles.secondary}`}
          data-testid="completion-contact"
        >
          Contact Rob
        </Link>
        <a
          href={UPDATES_EMAIL}
          className={`${styles.action} ${styles.secondary}`}
          data-testid="completion-updates"
        >
          Register interest
        </a>
      </div>
    </section>
  );
}
