import type { AssessmentQuestion } from "@/src/domain/assessment";
import type { ConfidenceValue, MaturityValue } from "@/src/domain/assessment";
import { ASSESSMENT_QUESTION_HELP } from "../constants";
import { MaturityScale } from "./MaturityScale";
import { ConfidenceSelector } from "./ConfidenceSelector";
import styles from "./QuestionCard.module.css";

export type QuestionCardProps = {
  question: AssessmentQuestion;
  departmentName: string;
  departmentIntro: string;
  questionInDepartment: number;
  questionsInDepartment: number;
  maturity: MaturityValue | null;
  confidence: ConfidenceValue | null;
  onMaturityChange: (value: MaturityValue) => void;
  onConfidenceChange: (value: ConfidenceValue) => void;
};

export function QuestionCard({
  question,
  departmentName,
  departmentIntro,
  questionInDepartment,
  questionsInDepartment,
  maturity,
  confidence,
  onMaturityChange,
  onConfidenceChange,
}: QuestionCardProps) {
  return (
    <article className={styles.card} data-testid="question-card">
      <div>
        <p className={styles.kicker}>
          {departmentName} · Question {questionInDepartment} of{" "}
          {questionsInDepartment}
        </p>
        <h2 className={styles.title} data-testid="question-text">
          {question.text}
        </h2>
        <p className={styles.help}>{ASSESSMENT_QUESTION_HELP}</p>
      </div>

      <p className={styles.intro}>{departmentIntro}</p>

      <MaturityScale
        value={maturity}
        onChange={onMaturityChange}
        name={`maturity-${question.id}`}
      />
      <ConfidenceSelector
        value={confidence}
        onChange={onConfidenceChange}
        name={`confidence-${question.id}`}
      />
    </article>
  );
}
