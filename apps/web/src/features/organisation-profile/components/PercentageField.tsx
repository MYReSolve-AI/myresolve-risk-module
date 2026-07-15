import styles from "./PercentageField.module.css";

export function PercentageField({
  id,
  value,
  onChange,
  min = 0,
  max = 100,
  placeholder = "",
}: {
  id: string;
  value: number | null;
  onChange: (value: number | null) => void;
  min?: number;
  max?: number;
  placeholder?: string;
}) {
  return (
    <div className={styles.wrap}>
      <input
        id={id}
        className={styles.input}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === "") {
            onChange(null);
            return;
          }
          const n = Number(raw);
          onChange(Number.isFinite(n) ? n : null);
        }}
        data-testid={id}
      />
      <span className={styles.suffix}>%</span>
    </div>
  );
}
