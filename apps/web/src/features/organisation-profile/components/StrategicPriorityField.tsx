import { ProfileField, profileField } from "./ProfileField";
import styles from "./StrategicPriorityField.module.css";

export function StrategicPriorityField({
  values,
  onChange,
}: {
  values: {
    priority1: string;
    priority2: string;
    priority3: string;
    biggestConcern: string;
    successIn12Months: string;
    greatestValueArea: string;
  };
  onChange: (path: string, value: string) => void;
}) {
  return (
    <div className={styles.stack} data-testid="strategic-priorities">
      <ProfileField
        {...profileField("strategicPriorities.priority1")}
        htmlFor="priority1"
      >
        <input
          id="priority1"
          value={values.priority1}
          onChange={(e) =>
            onChange("strategicPriorities.priority1", e.target.value)
          }
        />
      </ProfileField>
      <ProfileField
        {...profileField("strategicPriorities.priority2")}
        htmlFor="priority2"
      >
        <input
          id="priority2"
          value={values.priority2}
          onChange={(e) =>
            onChange("strategicPriorities.priority2", e.target.value)
          }
        />
      </ProfileField>
      <ProfileField
        {...profileField("strategicPriorities.priority3")}
        htmlFor="priority3"
      >
        <input
          id="priority3"
          value={values.priority3}
          onChange={(e) =>
            onChange("strategicPriorities.priority3", e.target.value)
          }
        />
      </ProfileField>
      <ProfileField
        {...profileField("strategicPriorities.biggestConcern")}
        htmlFor="biggestConcern"
      >
        <textarea
          id="biggestConcern"
          value={values.biggestConcern}
          onChange={(e) =>
            onChange("strategicPriorities.biggestConcern", e.target.value)
          }
        />
      </ProfileField>
      <ProfileField
        {...profileField("strategicPriorities.successIn12Months")}
        htmlFor="successIn12Months"
      >
        <textarea
          id="successIn12Months"
          value={values.successIn12Months}
          onChange={(e) =>
            onChange("strategicPriorities.successIn12Months", e.target.value)
          }
        />
      </ProfileField>
      <ProfileField
        {...profileField("strategicPriorities.greatestValueArea")}
        htmlFor="greatestValueArea"
      >
        <textarea
          id="greatestValueArea"
          value={values.greatestValueArea}
          onChange={(e) =>
            onChange("strategicPriorities.greatestValueArea", e.target.value)
          }
        />
      </ProfileField>
    </div>
  );
}
