import type { StructureResolver } from "sanity/structure";

export const landingPageStructure: StructureResolver = (S) =>
  S.list()
    .title("Website content")
    .items([
      S.listItem()
        .id("landingPage")
        .title("Landing page")
        .child(
          S.document()
            .id("landingPage")
            .schemaType("landingPage")
            .documentId("landingPage"),
        ),
    ]);
