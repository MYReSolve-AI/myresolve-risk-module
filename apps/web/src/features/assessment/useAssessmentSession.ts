"use client";

import { useCallback, useMemo, useState } from "react";
import {
  DEFAULT_CONFIDENCE,
  TOTAL_QUESTIONS,
  allQuestions,
  isAnswered,
  type AssessmentAnswers,
  type AssessmentQuestion,
  type MaturityValue,
  SECTIONS,
} from "@/src/domain/assessment";
import {
  loadAssessmentAnswers,
  saveAssessmentAnswers,
  type SaveStatus,
} from "@/src/lib/assessmentPersistence";

export type AssessmentMode = "question" | "review";

export type UnansweredItem = {
  index: number;
  question: AssessmentQuestion;
  departmentName: string;
};

function clampIndex(index: number): number {
  return Math.max(0, Math.min(TOTAL_QUESTIONS - 1, index));
}

export function useAssessmentSession(initial?: AssessmentAnswers) {
  const questions = useMemo(() => allQuestions(), []);
  const [state, setState] = useState<AssessmentAnswers>(
    () => initial ?? loadAssessmentAnswers(),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<AssessmentMode>("question");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [showValidation, setShowValidation] = useState(false);

  const persist = useCallback((next: AssessmentAnswers) => {
    setSaveStatus("saving");
    try {
      saveAssessmentAnswers(next);
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  }, []);

  const currentQuestion = questions[currentIndex]!;
  const currentDepartment = SECTIONS[currentQuestion.sectionIndex]!;

  const answeredCount = useMemo(
    () => Object.keys(state.answers).filter((k) => isAnswered(state.answers, k)).length,
    [state.answers],
  );

  const progressPercent = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);

  const unanswered = useMemo<UnansweredItem[]>(() => {
    return questions
      .map((question, index) => ({
        index,
        question,
        departmentName: SECTIONS[question.sectionIndex]!.name,
      }))
      .filter((item) => !isAnswered(state.answers, item.question.id));
  }, [questions, state.answers]);

  const isComplete = unanswered.length === 0;

  const setMaturity = useCallback(
    (value: MaturityValue) => {
      const key = currentQuestion.id;
      setState((prev) => {
        const confidence = { ...prev.confidence };
        if (!confidence[key]) {
          confidence[key] = DEFAULT_CONFIDENCE;
        }
        const next = {
          answers: { ...prev.answers, [key]: value },
          confidence,
        };
        persist(next);
        return next;
      });
      setShowValidation(false);
    },
    [currentQuestion.id, persist],
  );

  const goNext = useCallback(() => {
    if (currentIndex >= TOTAL_QUESTIONS - 1) {
      setMode("review");
      return;
    }
    setCurrentIndex((i) => clampIndex(i + 1));
  }, [currentIndex]);

  const goPrevious = useCallback(() => {
    if (mode === "review") {
      setMode("question");
      setCurrentIndex(TOTAL_QUESTIONS - 1);
      return;
    }
    setCurrentIndex((i) => clampIndex(i - 1));
  }, [mode]);

  const openReview = useCallback(() => {
    setMode("review");
    setShowValidation(false);
  }, []);

  const saveAndExit = useCallback(() => {
    persist(state);
  }, [persist, state]);

  const attemptComplete = useCallback((): boolean => {
    persist(state);
    if (!isComplete) {
      setShowValidation(true);
      setMode("review");
      return false;
    }
    setShowValidation(false);
    return true;
  }, [isComplete, persist, state]);

  const rawMaturity = Number(state.answers[currentQuestion.id]);
  const maturityValue: MaturityValue | null =
    rawMaturity >= 1 && rawMaturity <= 5
      ? (rawMaturity as MaturityValue)
      : null;
  return {
    questions,
    state,
    mode,
    currentIndex,
    currentQuestion,
    currentDepartment,
    maturityValue,
    answeredCount,
    progressPercent,
    unanswered,
    isComplete,
    saveStatus,
    showValidation,
    setMaturity,
    goNext,
    goPrevious,
    openReview,
    saveAndExit,
    attemptComplete,
    setMode,
  };
}

export type AssessmentSession = ReturnType<typeof useAssessmentSession>;
