import type { AssessmentQuestion } from "@/src/domain/assessment";
import type { MaturityValue } from "@/src/domain/assessment";
import {
  assessmentQuestionGuidance,
  assessmentQuestionTitle,
} from "../constants";
import { MaturityScale } from "./MaturityScale";
import styles from "./QuestionCard.module.css";

export type QuestionCardProps = {
  question: AssessmentQuestion;
  departmentName: string;
  departmentIntro: string;
  questionInDepartment: number;
  questionsInDepartment: number;
  maturity: MaturityValue | null;
  onMaturityChange: (value: MaturityValue) => void;
};

export function QuestionCard({
  question,
  departmentName,
  departmentIntro,
  questionInDepartment,
  questionsInDepartment,
  maturity,
  onMaturityChange,
}: QuestionCardProps) {
  return (
    <article className={styles.card} data-testid="question-card">
      <div>
        <p className={styles.kicker}>
          {departmentName} · Question {questionInDepartment} of{" "}
          {questionsInDepartment}
        </p>
        <h2 className={styles.title} data-testid="question-text">
          {assessmentQuestionTitle(question.id, question.text)}
        </h2>
        <p className={styles.help} data-testid="question-guidance">
          {assessmentQuestionGuidance(question.id)}
        </p>
      </div>

      <p className={styles.intro}>{departmentIntro}</p>

      <MaturityScale
        value={maturity}
        onChange={onMaturityChange}
        name={`maturity-${question.id}`}
      />
    </article>
  );
}
