import "server-only";

import { createClient } from "@sanity/client";
import { unstable_cache } from "next/cache";
import {
  LANDING_PAGE_FALLBACK,
  validateLandingPageContent,
  type LandingPageContent,
} from "./landingContent";

const API_VERSION = "2026-07-16";
const CACHE_SECONDS = 300;
const FETCH_TIMEOUT_MS = 2_000;

let lastSuccessfullyValidatedContent: LandingPageContent | null = null;

const LANDING_PAGE_QUERY = `*[
  _type == "landingPage" && _id == "landingPage"
][0]{
  seo,
  hero,
  secondaryCta,
  campaign,
  familiar,
  fromTo,
  howItWorks,
  clarity,
  founder,
  finalCta,
  footer
}`;

function sanityConfiguration() {
  const projectId = process.env.SANITY_PROJECT_ID?.trim();
  const dataset = process.env.SANITY_DATASET?.trim();
  const token = process.env.SANITY_API_READ_TOKEN?.trim();

  // The production dataset is public, so a token is optional: without one the
  // client reads published content unauthenticated. Supplying a token still
  // works and is required if the dataset is ever made private.
  if (!projectId || !dataset) return null;
  return token ? { projectId, dataset, token } : { projectId, dataset };
}

async function fetchValidatedPublishedContent(): Promise<LandingPageContent> {
  const configuration = sanityConfiguration();
  if (!configuration) throw new Error("Sanity server configuration is incomplete");

  const client = createClient({
    ...configuration,
    apiVersion: API_VERSION,
    perspective: "published",
    useCdn: false,
  });

  const payload = await client.fetch<unknown>(
    LANDING_PAGE_QUERY,
    {},
    { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) },
  );
  const validation = validateLandingPageContent(payload);

  if (!validation.success) {
    throw new Error(`Sanity landing content rejected: ${validation.errors.join(", ")}`);
  }

  return validation.content;
}

const getCachedPublishedContent = unstable_cache(
  fetchValidatedPublishedContent,
  ["sanity", "landing-page", "published"],
  {
    revalidate: CACHE_SECONDS,
    tags: ["landing-page"],
  },
);

export async function getLandingPageContent(): Promise<LandingPageContent> {
  if (!sanityConfiguration()) return LANDING_PAGE_FALLBACK;

  try {
    const content = await getCachedPublishedContent();
    lastSuccessfullyValidatedContent = content;
    return content;
  } catch {
    return lastSuccessfullyValidatedContent ?? LANDING_PAGE_FALLBACK;
  }
}
