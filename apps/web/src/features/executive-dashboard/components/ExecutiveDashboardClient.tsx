"use client";

import dynamic from "next/dynamic";

const ExecutiveDashboardApp = dynamic(
  () =>
    import("./ExecutiveDashboardApp").then((mod) => mod.ExecutiveDashboardApp),
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
          fontFamily: "Inter, Arial, Helvetica, sans-serif",
        }}
      >
        Loading MYReSolve executive dashboard…
      </main>
    ),
  },
);

export function ExecutiveDashboardClient() {
  return <ExecutiveDashboardApp />;
}
