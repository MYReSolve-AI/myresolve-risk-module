import {
  PROFILE_FIELDS,
  areProfileFieldsComplete,
  isFieldFilled,
  isProfileComplete,
  operatingModelLabel,
  type OrganisationProfile,
  type ProfileFieldPath,
  type ProfileSectionId,
} from "@/src/domain/organisationProfile";
import styles from "./ProfileReview.module.css";

function displayValue(
  profile: OrganisationProfile,
  path: ProfileFieldPath,
): string {
  if (path === "operations.operatingModels") {
    const models = profile.operations.operatingModels;
    if (models.length === 0) return "Needed";
    return models.map((id) => operatingModelLabel(id)).join(", ");
  }
  if (path === "operations.operatingModelOther") {
    return profile.operations.operatingModelOther.trim() || "Needed";
  }
  return isFieldFilled(profile, path) ? "Complete" : "Needed";
}

export function ProfileReview({
  profile,
  missingRequired,
  showValidation,
  onEditSection,
  onBack,
  onComplete,
}: {
  profile: OrganisationProfile;
  missingRequired: ProfileFieldPath[];
  showValidation: boolean;
  onEditSection: (sectionId: ProfileSectionId) => void;
  onBack: () => void;
  onComplete: () => void;
}) {
  const required = PROFILE_FIELDS.filter((f) => {
    if (f.path === "operations.operatingModelOther") {
      return profile.operations.operatingModels.includes("other");
    }
    return f.governance === "required";
  });
  const fieldsComplete = areProfileFieldsComplete(profile);
  const explicitlyComplete = isProfileComplete(profile);

  return (
    <section className={styles.panel} data-testid="profile-review">
      <h2 className={styles.title}>Review organisation profile</h2>
      <p className={styles.lede}>
        Confirm the required details. Optional and recommended fields can stay
        blank — they will enrich future briefings when available. Explicitly
        complete the profile to unlock the assessment and dashboard Company
        display.
      </p>

      {explicitlyComplete ? (
        <p
          className={styles.statusNote}
          data-testid="profile-status-complete"
        >
          Profile completed. Editing any field clears completion until you
          complete again.
        </p>
      ) : fieldsComplete ? (
        <p
          className={styles.statusNote}
          data-testid="profile-status-ready"
        >
          Required fields look complete. Select Complete and start assessment
          to record completion and continue.
        </p>
      ) : (
        <p
          className={styles.statusNote}
          data-testid="profile-status-incomplete"
        >
          Profile is not yet complete.
        </p>
      )}

      {showValidation && missingRequired.length > 0 ? (
        <p className={styles.alert} data-testid="profile-validation">
          {missingRequired.length} required field
          {missingRequired.length === 1 ? "" : "s"} still needed before
          continuing to the assessment.
        </p>
      ) : null}

      <ul className={styles.list}>
        {required.map((field) => {
          const filled = isFieldFilled(profile, field.path);
          return (
            <li
              key={field.path}
              className={[styles.item, !filled ? styles.missing : ""]
                .filter(Boolean)
                .join(" ")}
              data-testid={`review-${field.path}`}
            >
              <p className={styles.label}>{field.label}</p>
              <div>
                <p className={styles.status}>{displayValue(profile, field.path)}</p>
                {!filled ? (
                  <button
                    type="button"
                    className={`${styles.button} ${styles.secondary}`}
                    onClick={() => onEditSection(field.sectionId)}
                  >
                    Edit
                  </button>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.button} ${styles.secondary}`}
          onClick={onBack}
          data-testid="profile-review-back"
        >
          Back
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={onComplete}
          data-testid="profile-review-complete"
        >
          Complete and start assessment
        </button>
      </div>
    </section>
  );
}
