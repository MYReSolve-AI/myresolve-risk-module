"use client";

import { useRouter } from "next/navigation";
import { TOTAL_QUESTIONS, SECTIONS } from "@/src/domain/assessment";
import { useAssessmentSession } from "../useAssessmentSession";
import { AssessmentShell } from "./AssessmentShell";
import { ProgressHeader } from "./ProgressHeader";
import { QuestionCard } from "./QuestionCard";
import { AssessmentNavigation } from "./AssessmentNavigation";
import { SaveStatus } from "./SaveStatus";
import { ReviewAnswers } from "./ReviewAnswers";
import { saveAssessmentAnswers } from "@/src/lib/assessmentPersistence";

export function AssessmentApp() {
  const router = useRouter();
  const session = useAssessmentSession();

  const handleSaveAndExit = () => {
    session.saveAndExit();
    router.push("/");
  };

  const handleComplete = () => {
    const ok = session.attemptComplete();
    if (!ok) return;
    // Ensure latest answers are on disk for the dashboard consumer
    saveAssessmentAnswers(session.state);
    router.push("/dashboard");
  };

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
            confidence={session.confidenceValue}
            onMaturityChange={session.setMaturity}
            onConfidenceChange={session.setConfidence}
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
          onEdit={session.goToQuestion}
          onBackToQuestions={() => session.setMode("question")}
          onComplete={handleComplete}
        />
      )}
    </AssessmentShell>
  );
}
