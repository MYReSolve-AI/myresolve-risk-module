"use client";

import { useRef } from "react";
import type { OperatingModel } from "@/src/domain/organisationProfile";
import {
  OPERATING_MODEL_OPTIONS,
  operatingModelLabel,
} from "@/src/domain/organisationProfile/options";
import styles from "./OperatingModelsField.module.css";

export type OperatingModelsFieldProps = {
  selected: OperatingModel[];
  otherDescription: string;
  onChangeSelected: (next: OperatingModel[]) => void;
  onChangeOtherDescription: (next: string) => void;
  showErrors?: boolean;
  modelsError?: string | null;
  otherError?: string | null;
};

export function OperatingModelsField({
  selected,
  otherDescription,
  onChangeSelected,
  onChangeOtherDescription,
  showErrors = false,
  modelsError = null,
  otherError = null,
}: OperatingModelsFieldProps) {
  const chipRefs = useRef<Map<OperatingModel, HTMLButtonElement | null>>(
    new Map(),
  );
  const optionRefs = useRef<Map<OperatingModel, HTMLButtonElement | null>>(
    new Map(),
  );

  const showOther = selected.includes("other");

  const add = (id: OperatingModel) => {
    if (selected.includes(id)) return;
    onChangeSelected([...selected, id]);
  };

  const remove = (id: OperatingModel) => {
    const index = selected.indexOf(id);
    const next = selected.filter((v) => v !== id);
    onChangeSelected(next);
    if (id === "other") {
      onChangeOtherDescription("");
    }
    queueMicrotask(() => {
      const focusId = next[index] ?? next[index - 1] ?? null;
      if (focusId) {
        chipRefs.current.get(focusId)?.focus();
      } else {
        optionRefs.current.get(id)?.focus();
      }
    });
  };

  return (
    <div className={styles.wrap} data-testid="operations.operatingModels">
      {selected.length > 0 ? (
        <ul
          className={styles.chips}
          aria-label="Selected operating models"
          data-testid="operating-models-chips"
        >
          {selected.map((id) => {
            const label = operatingModelLabel(id);
            return (
              <li key={id} className={styles.chip}>
                <span className={styles.chipLabel}>{label}</span>
                <button
                  type="button"
                  className={styles.chipRemove}
                  aria-label={`Remove ${label}`}
                  data-testid={`operating-models-remove-${id}`}
                  ref={(el) => {
                    chipRefs.current.set(id, el);
                  }}
                  onClick={() => remove(id)}
                >
                  ×
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={styles.empty} data-testid="operating-models-empty">
          No operating models selected yet.
        </p>
      )}

      <div
        className={styles.options}
        role="group"
        aria-label="Which operating models apply?"
      >
        {OPERATING_MODEL_OPTIONS.map((option) => {
          const isSelected = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              className={[
                styles.option,
                isSelected ? styles.optionSelected : "",
              ].join(" ")}
              aria-pressed={isSelected}
              disabled={isSelected}
              data-testid={`operating-models-add-${option.value}`}
              ref={(el) => {
                optionRefs.current.set(option.value, el);
              }}
              onClick={() => add(option.value)}
            >
              {isSelected ? `Selected: ${option.label}` : option.label}
            </button>
          );
        })}
      </div>

      {showErrors && modelsError ? (
        <p
          className={styles.error}
          role="alert"
          data-testid="operating-models-error"
        >
          {modelsError}
        </p>
      ) : null}

      {showOther ? (
        <div className={styles.otherBlock}>
          <label className={styles.otherLabel} htmlFor="ops-model-other">
            Please describe the other operating model
          </label>
          <input
            id="ops-model-other"
            type="text"
            maxLength={200}
            className={styles.otherInput}
            value={otherDescription}
            onChange={(e) => onChangeOtherDescription(e.target.value)}
            data-testid="operations.operatingModelOther"
            aria-required="true"
          />
          {showErrors && otherError ? (
            <p
              className={styles.error}
              role="alert"
              data-testid="operating-model-other-error"
            >
              {otherError}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
