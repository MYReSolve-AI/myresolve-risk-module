import Link from "next/link";
import type { EvidenceAssuranceSummary } from "@/src/domain/evidenceAssurance";
import styles from "./EvidenceAssuranceCard.module.css";

export function EvidenceAssuranceCard({
  summary,
}: {
  summary: EvidenceAssuranceSummary;
}) {
  return (
    <section className={styles.card} aria-labelledby="assurance-card-title">
      <div>
        <p className={styles.eyebrow}>Validation</p>
        <h2 id="assurance-card-title">Evidence and Assurance</h2>
        <p className={styles.progress}>
          {summary.reviewedCount} of {summary.totalDepartments} departments
          reviewed
        </p>
        <p className={styles.copy}>
          Keep leadership judgement separate from supporting evidence. Start
          with the highest-risk department that has not yet been reviewed.
        </p>
      </div>
      <Link href="/evidence-assurance" className={styles.action}>
        Review department evidence
      </Link>
    </section>
  );
}
