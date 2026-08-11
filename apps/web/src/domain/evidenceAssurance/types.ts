export const EVIDENCE_ASSURANCE_STORAGE_KEY =
  "myresolve_evidence_assurance_v1" as const;

export const EVIDENCE_ASSURANCE_SCHEMA_VERSION = 1 as const;

export type AssuranceStatus =
  | "not_reviewed"
  | "partly_evidenced"
  | "evidence_reviewed";

export type DepartmentAssuranceReview = {
  departmentIndex: number;
  status: AssuranceStatus;
  reviewer: string;
  reviewDate: string;
  evidenceReferences: string;
  missingInformation: string;
  updatedAt: string | null;
};

export type EvidenceAssuranceState = {
  schemaVersion: typeof EVIDENCE_ASSURANCE_SCHEMA_VERSION;
  reviews: Record<string, DepartmentAssuranceReview>;
};

export type EvidenceAssuranceSummary = {
  totalDepartments: number;
  reviewedCount: number;
  partlyEvidencedCount: number;
  notReviewedCount: number;
};
