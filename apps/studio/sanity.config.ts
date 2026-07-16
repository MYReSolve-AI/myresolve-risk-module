import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { landingPageStructure } from "./structure";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "2pk2iagn";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "myresolve-website-content",
  title: "MYReSolve Website Content",
  projectId,
  dataset,
  plugins: [structureTool({ structure: landingPageStructure })],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((template) => template.schemaType !== "landingPage"),
  },
  document: {
    actions: (actions, context) =>
      context.schemaType === "landingPage"
        ? actions.filter(
            (action) => action.action !== "delete" && action.action !== "duplicate",
          )
        : actions,
  },
});
