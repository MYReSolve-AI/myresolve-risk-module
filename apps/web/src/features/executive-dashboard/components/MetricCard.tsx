import type { ReactNode } from "react";
import styles from "./MetricCard.module.css";

export type MetricCardProps = {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  /** When true, the primary number leads and the title follows underneath */
  valueFirst?: boolean;
  className?: string;
  "data-testid"?: string;
};

export function MetricCard({
  eyebrow,
  title,
  children,
  valueFirst = false,
  className,
  "data-testid": testId,
}: MetricCardProps) {
  return (
    <article
      className={[
        styles.card,
        valueFirst ? styles.valueFirst : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-testid={testId}
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.body}>{children}</div>
    </article>
  );
}

export function MetricHeadline({ children }: { children: ReactNode }) {
  return <p className={styles.headline}>{children}</p>;
}

export function MetricSupport({ children }: { children: ReactNode }) {
  return <p className={styles.support}>{children}</p>;
}

export function MetricRow({ children }: { children: ReactNode }) {
  return <div className={styles.row}>{children}</div>;
}
