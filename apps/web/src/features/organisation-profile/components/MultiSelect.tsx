import styles from "./MultiSelect.module.css";

export type MultiSelectOption<T extends string> = {
  value: T;
  label: string;
};

export function MultiSelect<T extends string>({
  options,
  value,
  onChange,
  name,
}: {
  options: MultiSelectOption<T>[];
  value: T[];
  onChange: (value: T[]) => void;
  name: string;
}) {
  return (
    <div
      className={styles.grid}
      role="group"
      aria-label={name}
      data-testid={name}
    >
      {options.map((option) => {
        const selected = value.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            className={[styles.option, selected ? styles.selected : ""].join(
              " ",
            )}
            onClick={() => {
              if (selected) {
                onChange(value.filter((v) => v !== option.value));
              } else {
                onChange([...value, option.value]);
              }
            }}
            data-testid={`${name}-${option.value}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
