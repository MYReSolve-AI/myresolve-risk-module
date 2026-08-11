import { EvidenceAssuranceClient } from "@/src/features/evidence-assurance/components/EvidenceAssuranceClient";

export const metadata = {
  title: "MYReSolve Evidence and Assurance",
  description:
    "Prototype department evidence review for the MYReSolve assessment.",
};

export default function EvidenceAssurancePage() {
  return <EvidenceAssuranceClient />;
}
