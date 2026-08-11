import {
  CONFIDENCE_LEVELS,
  type ConfidenceValue,
} from "@/src/domain/assessment";
import styles from "./OverallConfidence.module.css";

export type OverallConfidenceProps = {
  value?: ConfidenceValue;
  onChange: (value: ConfidenceValue) => void;
  onBack: () => void;
  onComplete: () => void;
};

const descriptions: Record<ConfidenceValue, string> = {
  low: "Important parts may be based on assumptions or incomplete visibility.",
  medium: "The assessment is broadly representative, with some areas to validate.",
  high: "The answers are believed to reflect company practice consistently.",
};

export function OverallConfidence({
  value,
  onChange,
  onBack,
  onComplete,
}: OverallConfidenceProps) {
  return (
    <section className={styles.panel} data-testid="overall-confidence-step">
      <p className={styles.eyebrow}>Leadership judgement</p>
      <h2 className={styles.title}>How confident are you in this assessment?</h2>
      <p className={styles.lede}>
        How well do these answers reflect how your company operates in practice?
        This is your overall view, not independent verification.
      </p>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Select one response</legend>
        <div className={styles.options}>
          {CONFIDENCE_LEVELS.map((option) => (
            <label
              key={option.value}
              className={`${styles.option} ${
                value === option.value ? styles.selected : ""
              }`}
            >
              <input
                type="radio"
                name="overall-confidence"
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
              />
              <span>
                <strong>{option.label}</strong>
                <small>{descriptions[option.value]}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <p className={styles.nextStep}>
        Next, MYReSolve will help validate the highest-risk departments through
        Evidence and Assurance.
      </p>

      <div className={styles.actions}>
        <button type="button" className={styles.secondary} onClick={onBack}>
          Back to answer review
        </button>
        <button
          type="button"
          className={styles.primary}
          onClick={onComplete}
          disabled={!value}
          data-testid="confidence-complete"
        >
          View executive dashboard
        </button>
      </div>
    </section>
  );
}
