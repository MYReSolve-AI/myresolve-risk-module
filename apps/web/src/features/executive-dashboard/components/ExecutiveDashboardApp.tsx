"use client";

import { useMemo, useState } from "react";
import {
  emptyAssessment,
  mixedAssessment,
} from "@/src/domain/assessment/__fixtures__/states";
import type { AssessmentAnswers } from "@/src/domain/assessment";
import {
  loadAssessmentAnswers,
  saveAssessmentAnswers,
} from "@/src/lib/assessmentPersistence";
import {
  isProfileComplete,
} from "@/src/domain/organisationProfile";
import { loadOrganisationProfile } from "@/src/lib/organisationProfilePersistence";
import { ExecutiveDashboard } from "./ExecutiveDashboard";
import styles from "./ExecutiveDashboard.module.css";

function isDeveloperModeEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("dev") === "1") return true;
    return window.localStorage.getItem("myresolve_dev_mode") === "1";
  } catch {
    return false;
  }
}

/**
 * Client-only dashboard host. Assessment storage remains the sole scoring input.
 * Organisation name is display-only context when a completed profile exists (PO-5).
 */
export function ExecutiveDashboardApp() {
  const [state, setState] = useState<AssessmentAnswers>(() =>
    loadAssessmentAnswers(),
  );
  const developerMode = useMemo(() => isDeveloperModeEnabled(), []);
  const companyName = useMemo(() => {
    const profile = loadOrganisationProfile();
    if (!isProfileComplete(profile)) return undefined;
    const name = profile.organisation.name.trim();
    return name.length > 0 ? name : undefined;
  }, []);

  return (
    <ExecutiveDashboard
      state={state}
      companyName={companyName}
      actions={
        developerMode ? (
          <>
            <p className={styles.devLabel}>Developer Mode</p>
            <button
              type="button"
              className={styles.button}
              onClick={() => {
                const sample = mixedAssessment();
                saveAssessmentAnswers(sample);
                setState(sample);
              }}
            >
              Preview mixed sample
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonSecondary}`}
              onClick={() => setState(loadAssessmentAnswers())}
            >
              Load saved assessment
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonSecondary}`}
              onClick={() => {
                saveAssessmentAnswers(emptyAssessment);
                setState(emptyAssessment);
              }}
            >
              Clear preview
            </button>
          </>
        ) : undefined
      }
    />
  );
}
