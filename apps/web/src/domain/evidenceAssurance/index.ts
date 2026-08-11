import { SECTIONS } from "@/src/domain/assessment";
import {
  EVIDENCE_ASSURANCE_SCHEMA_VERSION,
  type AssuranceStatus,
  type DepartmentAssuranceReview,
  type EvidenceAssuranceState,
  type EvidenceAssuranceSummary,
} from "./types";

export {
  EVIDENCE_ASSURANCE_SCHEMA_VERSION,
  EVIDENCE_ASSURANCE_STORAGE_KEY,
  type AssuranceStatus,
  type DepartmentAssuranceReview,
  type EvidenceAssuranceState,
  type EvidenceAssuranceSummary,
} from "./types";

export const ASSURANCE_STATUS_OPTIONS: ReadonlyArray<{
  value: AssuranceStatus;
  label: string;
  description: string;
}> = [
  {
    value: "not_reviewed",
    label: "Not reviewed",
    description: "No supporting evidence has been considered yet.",
  },
  {
    value: "partly_evidenced",
    label: "Partly evidenced",
    description: "Some evidence supports the assessment, with gaps remaining.",
  },
  {
    value: "evidence_reviewed",
    label: "Evidence reviewed",
    description: "Relevant evidence has been reviewed and recorded.",
  },
] as const;

export function createEmptyEvidenceAssuranceState(): EvidenceAssuranceState {
  return {
    schemaVersion: EVIDENCE_ASSURANCE_SCHEMA_VERSION,
    reviews: {},
  };
}

export function createEmptyDepartmentReview(
  departmentIndex: number,
): DepartmentAssuranceReview {
  return {
    departmentIndex,
    status: "not_reviewed",
    reviewer: "",
    reviewDate: "",
    evidenceReferences: "",
    missingInformation: "",
    updatedAt: null,
  };
}

function isStatus(value: unknown): value is AssuranceStatus {
  return ASSURANCE_STATUS_OPTIONS.some((option) => option.value === value);
}

function text(value: unknown): string {
  return typeof value === "string" ? value.slice(0, 4000) : "";
}

export function normaliseEvidenceAssuranceState(
  value: unknown,
): EvidenceAssuranceState {
  if (!value || typeof value !== "object") {
    return createEmptyEvidenceAssuranceState();
  }

  const candidate = value as Partial<EvidenceAssuranceState>;
  if (
    candidate.schemaVersion !== EVIDENCE_ASSURANCE_SCHEMA_VERSION ||
    !candidate.reviews ||
    typeof candidate.reviews !== "object"
  ) {
    return createEmptyEvidenceAssuranceState();
  }

  const reviews: Record<string, DepartmentAssuranceReview> = {};
  Object.entries(candidate.reviews).forEach(([key, raw]) => {
    const departmentIndex = Number(key);
    if (
      !Number.isInteger(departmentIndex) ||
      departmentIndex < 0 ||
      departmentIndex >= SECTIONS.length ||
      !raw ||
      typeof raw !== "object"
    ) {
      return;
    }
    const review = raw as Partial<DepartmentAssuranceReview>;
    reviews[key] = {
      departmentIndex,
      status: isStatus(review.status) ? review.status : "not_reviewed",
      reviewer: text(review.reviewer),
      reviewDate: /^\d{4}-\d{2}-\d{2}$/.test(text(review.reviewDate))
        ? text(review.reviewDate)
        : "",
      evidenceReferences: text(review.evidenceReferences),
      missingInformation: text(review.missingInformation),
      updatedAt:
        typeof review.updatedAt === "string" &&
        Number.isFinite(Date.parse(review.updatedAt))
          ? review.updatedAt
          : null,
    };
  });

  return {
    schemaVersion: EVIDENCE_ASSURANCE_SCHEMA_VERSION,
    reviews,
  };
}

export function assuranceReviewFor(
  state: EvidenceAssuranceState,
  departmentIndex: number,
): DepartmentAssuranceReview {
  return (
    state.reviews[String(departmentIndex)] ??
    createEmptyDepartmentReview(departmentIndex)
  );
}

export function evidenceAssuranceSummary(
  state: EvidenceAssuranceState,
): EvidenceAssuranceSummary {
  const reviews = SECTIONS.map((_, index) => assuranceReviewFor(state, index));
  return {
    totalDepartments: SECTIONS.length,
    reviewedCount: reviews.filter((r) => r.status === "evidence_reviewed")
      .length,
    partlyEvidencedCount: reviews.filter(
      (r) => r.status === "partly_evidenced",
    ).length,
    notReviewedCount: reviews.filter((r) => r.status === "not_reviewed")
      .length,
  };
}

export function assuranceStatusLabel(status: AssuranceStatus): string {
  return (
    ASSURANCE_STATUS_OPTIONS.find((option) => option.value === status)?.label ??
    "Not reviewed"
  );
}
