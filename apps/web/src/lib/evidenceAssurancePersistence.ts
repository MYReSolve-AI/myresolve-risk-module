import {
  EVIDENCE_ASSURANCE_STORAGE_KEY,
  createEmptyEvidenceAssuranceState,
  normaliseEvidenceAssuranceState,
  type EvidenceAssuranceState,
} from "@/src/domain/evidenceAssurance";

export function loadEvidenceAssurance(): EvidenceAssuranceState {
  if (typeof window === "undefined") return createEmptyEvidenceAssuranceState();
  try {
    const raw = window.localStorage.getItem(EVIDENCE_ASSURANCE_STORAGE_KEY);
    return raw
      ? normaliseEvidenceAssuranceState(JSON.parse(raw))
      : createEmptyEvidenceAssuranceState();
  } catch {
    return createEmptyEvidenceAssuranceState();
  }
}

export function saveEvidenceAssurance(state: EvidenceAssuranceState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    EVIDENCE_ASSURANCE_STORAGE_KEY,
    JSON.stringify(normaliseEvidenceAssuranceState(state)),
  );
}

export function clearEvidenceAssurance(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(EVIDENCE_ASSURANCE_STORAGE_KEY);
}
