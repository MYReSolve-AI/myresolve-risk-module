"use client";

import dynamic from "next/dynamic";

const OrganisationProfileApp = dynamic(
  () =>
    import("./OrganisationProfileApp").then(
      (mod) => mod.OrganisationProfileApp,
    ),
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
        }}
      >
        Loading organisation profile…
      </main>
    ),
  },
);

export function OrganisationProfileClient() {
  return <OrganisationProfileApp />;
}
