import styles from "./SectionHeading.module.css";

export type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className={styles.block}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </div>
  );
}
