"use client";

import dynamic from "next/dynamic";

const EvidenceAssuranceApp = dynamic(
  () =>
    import("./EvidenceAssuranceApp").then((mod) => mod.EvidenceAssuranceApp),
  { ssr: false },
);

export function EvidenceAssuranceClient() {
  return <EvidenceAssuranceApp />;
}
