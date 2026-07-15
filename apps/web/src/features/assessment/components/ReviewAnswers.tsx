import {
  MATURITY_LEVELS,
  CONFIDENCE_LEVELS,
  type AssessmentAnswers,
  type AssessmentQuestion,
} from "@/src/domain/assessment";
import { isAnswered } from "@/src/domain/assessment";
import type { UnansweredItem } from "../useAssessmentSession";
import styles from "./ReviewAnswers.module.css";

export type ReviewAnswersProps = {
  questions: AssessmentQuestion[];
  state: AssessmentAnswers;
  unanswered: UnansweredItem[];
  showValidation: boolean;
  departmentNameFor: (sectionIndex: number) => string;
  onEdit: (index: number) => void;
  onBackToQuestions: () => void;
  onComplete: () => void;
};

function maturityLabel(value: number): string {
  return MATURITY_LEVELS.find((m) => m.value === value)?.name ?? "—";
}

function confidenceLabel(value: string | undefined): string {
  return (
    CONFIDENCE_LEVELS.find((c) => c.value === value)?.label ?? "Medium"
  );
}

export function ReviewAnswers({
  questions,
  state,
  unanswered,
  showValidation,
  departmentNameFor,
  onEdit,
  onBackToQuestions,
  onComplete,
}: ReviewAnswersProps) {
  return (
    <section className={styles.panel} data-testid="review-answers">
      <h2 className={styles.title}>Review answers</h2>
      <p className={styles.lede}>
        Confirm every response before viewing your executive dashboard. You can
        edit any question.
      </p>

      {showValidation && unanswered.length > 0 ? (
        <p className={styles.alert} data-testid="review-validation">
          {unanswered.length} question
          {unanswered.length === 1 ? "" : "s"} still unanswered. Complete them
          before finishing.
        </p>
      ) : null}

      <ul className={styles.list}>
        {questions.map((question, index) => {
          const answered = isAnswered(state.answers, question.id);
          const maturity = Number(state.answers[question.id]);
          return (
            <li
              key={question.id}
              className={[
                styles.item,
                !answered ? styles.itemUnanswered : "",
              ]
                .filter(Boolean)
                .join(" ")}
              data-testid={`review-item-${question.id}`}
            >
              <div>
                <p className={styles.qMeta}>
                  {departmentNameFor(question.sectionIndex)} · Q
                  {question.questionIndex + 1}
                </p>
                <p className={styles.qText}>{question.text}</p>
                <p className={styles.qAnswer}>
                  {answered
                    ? `${maturityLabel(maturity)} · Confidence ${confidenceLabel(
                        state.confidence[question.id],
                      )}`
                    : "Unanswered"}
                </p>
              </div>
              <div>
                {!answered ? (
                  <p className={styles.badge}>Required</p>
                ) : null}
                <button
                  type="button"
                  className={`${styles.button} ${styles.secondary}`}
                  onClick={() => onEdit(index)}
                >
                  Edit
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.button} ${styles.secondary}`}
          onClick={onBackToQuestions}
          data-testid="review-back"
        >
          Back to questions
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={onComplete}
          data-testid="review-complete"
        >
          Finish and view dashboard
        </button>
      </div>
    </section>
  );
}
