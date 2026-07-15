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
 * Client-only dashboard host. Reads the locked assessment storage key so
 * completed /assessment flows populate the executive view.
 */
export function ExecutiveDashboardApp() {
  const [state, setState] = useState<AssessmentAnswers>(() =>
    loadAssessmentAnswers(),
  );
  const developerMode = useMemo(() => isDeveloperModeEnabled(), []);

  return (
    <ExecutiveDashboard
      state={state}
      assessmentVersion="v0.3.1"
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
