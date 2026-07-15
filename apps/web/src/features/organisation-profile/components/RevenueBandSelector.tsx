import {
  REVENUE_BAND_OPTIONS,
  type RevenueBand,
} from "@/src/domain/organisationProfile";
import styles from "./RevenueBandSelector.module.css";

export function RevenueBandSelector({
  value,
  onChange,
  name = "revenue-band",
}: {
  value: RevenueBand | "";
  onChange: (value: RevenueBand) => void;
  name?: string;
}) {
  return (
    <div
      className={styles.grid}
      role="radiogroup"
      aria-label="Annual revenue band"
      data-testid={name}
    >
      {REVENUE_BAND_OPTIONS.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            className={[styles.option, selected ? styles.selected : ""].join(
              " ",
            )}
            onClick={() => onChange(option.value)}
            data-testid={`${name}-${option.value}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
