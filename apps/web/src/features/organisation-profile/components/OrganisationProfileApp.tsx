"use client";

import { useRouter } from "next/navigation";
import {
  ORGANISATION_PROFILE_PRIVACY_COPY,
  PROFILE_SECTION_META,
  SECTION_ORDER,
} from "@/src/domain/organisationProfile";
import { useOrganisationProfileSession } from "../useOrganisationProfileSession";
import { OrganisationProfileShell } from "./OrganisationProfileShell";
import { ProfileProgress } from "./ProfileProgress";
import { ProfileSection } from "./ProfileSection";
import { ProfileNavigation } from "./ProfileNavigation";
import { ProfileReview } from "./ProfileReview";
import { SaveStatus } from "./SaveStatus";
import styles from "./OrganisationProfileApp.module.css";

export function OrganisationProfileApp() {
  const router = useRouter();
  const session = useOrganisationProfileSession();
  const meta = PROFILE_SECTION_META[session.currentSectionId];

  return (
    <OrganisationProfileShell
      trailing={<SaveStatus status={session.saveStatus} />}
    >
      {session.mode === "section" ? (
        <>
          <ProfileProgress
            sectionTitle={meta.title}
            sectionIndex={session.sectionIndex}
            sectionCount={session.sectionCount}
            percentComplete={session.completion.percentComplete}
            requiredComplete={session.completion.requiredComplete}
            requiredTotal={session.completion.requiredTotal}
          />
          <ProfileSection
            sectionId={session.currentSectionId}
            profile={session.profile}
            onChange={session.updateField}
            showOperatingModelErrors={
              session.showValidation &&
              session.currentSectionId === "operations"
            }
          />
          <ProfileNavigation
            canGoPrevious={session.sectionIndex > 0}
            isLastSection={
              session.sectionIndex === SECTION_ORDER.length - 1
            }
            onPrevious={session.goPrevious}
            onNext={session.goNext}
            onReview={session.openReview}
            onSaveAndExit={() => {
              session.saveAndExit();
              router.push("/");
            }}
          />
        </>
      ) : (
        <ProfileReview
          profile={session.profile}
          missingRequired={session.missingRequired}
          showValidation={session.showValidation}
          onEditSection={session.goToSection}
          onBack={() => session.setMode("section")}
          onComplete={() => {
            const ok = session.attemptComplete();
            if (!ok) return;
            router.push("/assessment");
          }}
        />
      )}
      <aside
        className={styles.privacy}
        data-testid="organisation-profile-privacy"
      >
        <p className={styles.privacyTitle}>Browser-local storage</p>
        <p className={styles.privacyCopy}>{ORGANISATION_PROFILE_PRIVACY_COPY}</p>
      </aside>
    </OrganisationProfileShell>
  );
}
