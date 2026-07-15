import type { ReactNode } from "react";
import styles from "./DashboardSection.module.css";

export type DashboardSectionProps = {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
  "aria-labelledby"?: string;
  "data-testid"?: string;
};

export function DashboardSection({
  children,
  header,
  className,
  "aria-labelledby": labelledBy,
  "data-testid": testId,
}: DashboardSectionProps) {
  return (
    <section
      className={[styles.section, className].filter(Boolean).join(" ")}
      aria-labelledby={labelledBy}
      data-testid={testId}
    >
      {header ? <div className={styles.header}>{header}</div> : null}
      <div className={styles.body}>{children}</div>
    </section>
  );
}
