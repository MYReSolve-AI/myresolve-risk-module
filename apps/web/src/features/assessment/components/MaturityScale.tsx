import {
  MATURITY_LEVELS,
  type MaturityValue,
} from "@/src/domain/assessment";
import styles from "./MaturityScale.module.css";

export type MaturityScaleProps = {
  value: MaturityValue | null;
  onChange: (value: MaturityValue) => void;
  name?: string;
};

export function MaturityScale({
  value,
  onChange,
  name = "maturity",
}: MaturityScaleProps) {
  return (
    <div>
      <div
        className={styles.scale}
        role="radiogroup"
        aria-label="Maturity scale from one to five"
        data-testid="maturity-scale"
      >
        {MATURITY_LEVELS.map((level) => {
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
              data-testid={`maturity-${level.value}`}
            >
              <span className={styles.number}>{level.value}</span>
              <span className={styles.name}>{level.name}</span>
              <input
                type="radio"
                name={name}
                value={level.value}
                checked={selected}
                onChange={() => onChange(level.value)}
                className="sr-only-radio"
                tabIndex={-1}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />
            </button>
          );
        })}
      </div>
      <div className={styles.ends}>
        <span>Higher risk / less mature</span>
        <span>Lower risk / more mature</span>
      </div>
    </div>
  );
}
