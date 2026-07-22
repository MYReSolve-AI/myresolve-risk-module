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
      data-tone={tone}
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

export function riskDisplayLevel(
  rating: RiskRating,
): "LOW" | "MEDIUM" | "HIGH" {
  switch (rating) {
    case "LOW":
      return "LOW";
    case "MODERATE":
      return "MEDIUM";
    case "HIGH":
    case "CRITICAL":
      return "HIGH";
  }
}

function riskDisplayTone(rating: RiskRating): StatusTone {
  switch (riskDisplayLevel(rating)) {
    case "LOW":
      return "good";
    case "MEDIUM":
      return "gold";
    case "HIGH":
      return "danger";
  }
}

export function RiskBadge({ rating }: { rating: RiskRating }) {
  return (
    <StatusBadge
      label={`RISK: ${riskDisplayLevel(rating)}`}
      tone={riskDisplayTone(rating)}
    />
  );
}
