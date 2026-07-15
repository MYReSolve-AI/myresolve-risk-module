import {
  CONFIDENCE_LEVELS,
  type ConfidenceValue,
} from "@/src/domain/assessment";
import styles from "./ConfidenceSelector.module.css";

export type ConfidenceSelectorProps = {
  value: ConfidenceValue | null;
  onChange: (value: ConfidenceValue) => void;
  name?: string;
};

export function ConfidenceSelector({
  value,
  onChange,
  name = "confidence",
}: ConfidenceSelectorProps) {
  return (
    <div data-testid="confidence-selector">
      <p className={styles.label} id={`${name}-label`}>
        Confidence in this answer
      </p>
      <div
        className={styles.row}
        role="radiogroup"
        aria-labelledby={`${name}-label`}
      >
        {CONFIDENCE_LEVELS.map((level) => {
          const selected = value === level.value;
          return (
            <button
              key={level.value}
              type="button"
              role="radio"
              aria-checked={selected}
              className={[styles.option, selected ? styles.selected : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onChange(level.value)}
              data-testid={`confidence-${level.value}`}
            >
              {level.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
