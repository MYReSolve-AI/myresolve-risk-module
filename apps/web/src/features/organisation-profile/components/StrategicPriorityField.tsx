import { ProfileField } from "./ProfileField";
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
        label="Strategic priority 1"
        governance="required"
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
        label="Strategic priority 2"
        governance="required"
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
        label="Strategic priority 3"
        governance="required"
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
        label="Biggest concern today"
        governance="required"
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
        label="What success looks like in 12 months"
        governance="required"
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
        label="Area that would create the greatest value if improved"
        governance="required"
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
