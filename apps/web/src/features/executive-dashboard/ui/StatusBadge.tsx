import type { MaturityLevelName, RiskRating } from "@/src/domain/assessment";
import styles from "./StatusBadge.module.css";

export type StatusTone = "neutral" | "good" | "amber" | "danger" | "gold";

export type StatusBadgeProps = {
  label: string;
  tone?: StatusTone;
  className?: string;
};

export function StatusBadge({
  label,
  tone = "neutral",
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={[styles.badge, styles[tone], className]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </span>
  );
}

export function maturityTone(level: MaturityLevelName): StatusTone {
  switch (level) {
    case "Leading":
    case "Strong":
      return "good";
    case "Established":
      return "gold";
    case "Developing":
      return "amber";
    case "Critical":
      return "danger";
  }
}

export function riskTone(rating: RiskRating): StatusTone {
  switch (rating) {
    case "LOW":
      return "good";
    case "MODERATE":
      return "gold";
    case "HIGH":
      return "amber";
    case "CRITICAL":
      return "danger";
  }
}

export function RiskBadge({ rating }: { rating: RiskRating }) {
  return <StatusBadge label={rating} tone={riskTone(rating)} />;
}
