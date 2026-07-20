import type { ReactNode } from "react";
import {
  PROFILE_FIELDS,
  type FieldGovernance,
  type ProfileFieldPath,
} from "@/src/domain/organisationProfile";
import styles from "./ProfileField.module.css";

export function ProfileField({
  label,
  governance,
  help,
  children,
  htmlFor,
}: {
  label: string;
  governance: FieldGovernance;
  help: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className={styles.field} data-testid={`field-${htmlFor ?? label}`}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
        </label>
        <span
          className={[
            styles.badge,
            governance === "required"
              ? styles.required
              : governance === "recommended"
                ? styles.recommended
                : styles.optional,
          ].join(" ")}
        >
          {governance}
        </span>
      </div>
      {help ? <p className={styles.help}>{help}</p> : null}
      <div className={styles.control}>{children}</div>
    </div>
  );
}

export function profileField(path: ProfileFieldPath) {
  const definition = PROFILE_FIELDS.find((field) => field.path === path);
  if (!definition) {
    throw new Error(`Unknown Organisation Profile field: ${path}`);
  }

  return {
    label: definition.label,
    governance: definition.governance,
    help: definition.help,
  };
}
