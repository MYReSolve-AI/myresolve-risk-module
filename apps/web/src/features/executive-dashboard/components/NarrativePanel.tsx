import styles from "./NarrativePanel.module.css";

export type NarrativePanelProps = {
  /** Optional override for the deferred-capability notice */
  text?: string;
};

const DEFAULT_NOTICE =
  "AI Executive Narrative is planned for a future release. This version surfaces assessment results only and does not generate recommendations.";

export function NarrativePanel({ text = DEFAULT_NOTICE }: NarrativePanelProps) {
  return (
    <aside className={styles.panel} data-testid="executive-narrative">
      <p className={styles.eyebrow}>Coming later</p>
      <h2 className={styles.title}>AI Executive Narrative</h2>
      <p className={styles.lede}>{text}</p>
    </aside>
  );
}
