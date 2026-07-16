import { describe, expect, it } from "vitest";
import {
  LANDING_PAGE_FALLBACK,
  validateLandingPageContent,
} from "./landingContent";

function editableFallback() {
  return structuredClone(LANDING_PAGE_FALLBACK);
}

describe("landing page content validation", () => {
  it("accepts the approved Landing Page V2 fallback", () => {
    const result = validateLandingPageContent(editableFallback());
    expect(result.success).toBe(true);
  });

  it("accepts an enabled campaign when all fixed fields are present", () => {
    const content = editableFallback();
    content.campaign = {
      enabled: true,
      label: "New",
      headline: "A clearer way to start",
      body: "A short, approved announcement.",
    };

    expect(validateLandingPageContent(content).success).toBe(true);
  });

  it("rejects missing required wording", () => {
    const content = editableFallback();
    content.hero.headline = "";

    const result = validateLandingPageContent(content);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors).toContain("hero.headline is required");
  });

  it("rejects HTML, scripts and oversized fields", () => {
    const content = editableFallback();
    content.hero.problemText = "<script>alert('no')</script>";
    content.seo.title = "x".repeat(61);

    const result = validateLandingPageContent(content);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors).toContain("hero.problemText contains disallowed markup");
      expect(result.errors).toContain("seo.title exceeds 60 characters");
    }
  });

  it("requires campaign copy only when the campaign is enabled", () => {
    const disabled = editableFallback();
    disabled.campaign = { enabled: false };
    expect(validateLandingPageContent(disabled).success).toBe(true);

    const enabled = editableFallback();
    enabled.campaign = { enabled: true };
    const result = validateLandingPageContent(enabled);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors).toContain("campaign.label is required");
      expect(result.errors).toContain("campaign.headline is required");
      expect(result.errors).toContain("campaign.body is required");
    }
  });

  it("returns only validated known fields", () => {
    const content = editableFallback() as typeof LANDING_PAGE_FALLBACK & {
      injected?: string;
    };
    content.injected = "not rendered";

    const result = validateLandingPageContent(content);
    expect(result.success).toBe(true);
    if (result.success) expect(result.content).not.toHaveProperty("injected");
  });
});
