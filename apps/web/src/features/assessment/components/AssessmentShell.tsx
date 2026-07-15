import type { ReactNode } from "react";
import styles from "./AssessmentShell.module.css";

export type AssessmentShellProps = {
  children: ReactNode;
  trailing?: ReactNode;
};

export function AssessmentShell({ children, trailing }: AssessmentShellProps) {
  return (
    <div className={styles.shell} data-testid="assessment-shell">
      <div className={styles.inner}>
        <div className={styles.topBar}>
          <div>
            <p className={styles.brand}>MYReSolve</p>
            <p className={styles.product}>Executive assessment</p>
          </div>
          {trailing}
        </div>
        {children}
      </div>
    </div>
  );
}
