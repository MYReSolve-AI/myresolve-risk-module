"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { TOTAL_QUESTIONS, SECTIONS } from "@/src/domain/assessment";
import { isProfileComplete } from "@/src/domain/organisationProfile";
import { loadOrganisationProfile } from "@/src/lib/organisationProfilePersistence";
import { useAssessmentSession } from "../useAssessmentSession";
import { AssessmentShell } from "./AssessmentShell";
import { ProgressHeader } from "./ProgressHeader";
import { QuestionCard } from "./QuestionCard";
import { AssessmentNavigation } from "./AssessmentNavigation";
import { SaveStatus } from "./SaveStatus";
import { ReviewAnswers } from "./ReviewAnswers";
import { saveAssessmentAnswers } from "@/src/lib/assessmentPersistence";
import styles from "./AssessmentProfileGate.module.css";

function subscribeNoop() {
  return () => {};
}

function readProfileReady(): boolean {
  return isProfileComplete(loadOrganisationProfile());
}

export function AssessmentApp() {
  const router = useRouter();
  const session = useAssessmentSession();
  const profileReady = useSyncExternalStore(
    subscribeNoop,
    readProfileReady,
    () => null as boolean | null,
  );

  const handleSaveAndExit = () => {
    session.saveAndExit();
    router.push("/");
  };

  const handleComplete = () => {
    const ok = session.attemptComplete();
    if (!ok) return;
    saveAssessmentAnswers(session.state);
    router.push("/dashboard");
  };

  if (profileReady === null) {
    return (
      <AssessmentShell>
        <p data-testid="assessment-profile-check">Checking organisation profile…</p>
      </AssessmentShell>
    );
  }

  if (!profileReady) {
    return (
      <AssessmentShell>
        <section
          className={styles.gate}
          data-testid="assessment-profile-gate"
          aria-labelledby="profile-gate-title"
        >
          <h2 id="profile-gate-title" className={styles.title}>
            Complete your Organisation Profile first
          </h2>
          <p className={styles.copy}>
            The Organisation Profile captures business context before the
            assessment. It must be completed before you begin or continue the
            assessment. Existing assessment answers are preserved.
          </p>
          <p className={styles.copy}>
            <Link
              href="/organisation-profile"
              className={styles.link}
              data-testid="assessment-profile-gate-link"
            >
              Continue to Organisation Profile
            </Link>
          </p>
        </section>
      </AssessmentShell>
    );
  }

  return (
    <AssessmentShell trailing={<SaveStatus status={session.saveStatus} />}>
      {session.mode === "question" ? (
        <>
          <ProgressHeader
            departmentName={session.currentDepartment.name}
            questionPosition={session.currentIndex + 1}
            totalQuestions={TOTAL_QUESTIONS}
            answeredCount={session.answeredCount}
            progressPercent={session.progressPercent}
          />
          <QuestionCard
            question={session.currentQuestion}
            departmentName={session.currentDepartment.name}
            departmentIntro={session.currentDepartment.intro}
            questionInDepartment={session.currentQuestion.questionIndex + 1}
            questionsInDepartment={session.currentDepartment.questions.length}
            maturity={session.maturityValue}
            onMaturityChange={session.setMaturity}
          />
          <AssessmentNavigation
            canGoPrevious={session.currentIndex > 0}
            isLastQuestion={session.currentIndex === TOTAL_QUESTIONS - 1}
            onPrevious={session.goPrevious}
            onNext={session.goNext}
            onSaveAndExit={handleSaveAndExit}
            onReview={session.openReview}
          />
        </>
      ) : (
        <ReviewAnswers
          questions={session.questions}
          state={session.state}
          unanswered={session.unanswered}
          showValidation={session.showValidation}
          departmentNameFor={(i) => SECTIONS[i]!.name}
          onBackToQuestions={() => session.setMode("question")}
          onComplete={handleComplete}
        />
      )}
    </AssessmentShell>
  );
}
