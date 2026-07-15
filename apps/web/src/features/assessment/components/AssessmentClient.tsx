"use client";

import dynamic from "next/dynamic";

const AssessmentApp = dynamic(
  () => import("./AssessmentApp").then((mod) => mod.AssessmentApp),
  {
    ssr: false,
    loading: () => (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f7f3ec",
          color: "#173f35",
          fontFamily: "var(--mr-font-ui), Arial, Helvetica, sans-serif",
        }}
      >
        Loading MYReSolve assessment…
      </main>
    ),
  },
);

export function AssessmentClient() {
  return <AssessmentApp />;
}
