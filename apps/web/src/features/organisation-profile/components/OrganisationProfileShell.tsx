import type { ReactNode } from "react";
import styles from "./OrganisationProfileShell.module.css";

export function OrganisationProfileShell({
  children,
  trailing,
}: {
  children: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <div className={styles.shell} data-testid="organisation-profile-shell">
      <div className={styles.inner}>
        <div className={styles.topBar}>
          <div>
            <p className={styles.brand}>MYReSolve</p>
            <p className={styles.product}>Organisation profile</p>
          </div>
          {trailing}
        </div>
        {children}
      </div>
    </div>
  );
}
