import { encodeSignatureHeader, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { describe, expect, it, vi } from "vitest";
import { handleLandingPageWebhook } from "./landingWebhook";

const SECRET = "test-only-revalidation-secret";

async function signedRequest(body: string, secret = SECRET) {
  const signature = await encodeSignatureHeader(body, Date.now(), secret);
  return new Request("https://example.test/api/revalidate/landing-page", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      [SIGNATURE_HEADER_NAME]: signature,
    },
    body,
  });
}

describe("landing page revalidation webhook", () => {
  it("revalidates only a correctly signed landing page publish", async () => {
    const revalidate = vi.fn();
    const request = await signedRequest(
      JSON.stringify({ _id: "landingPage", _type: "landingPage" }),
    );

    const response = await handleLandingPageWebhook(request, {
      secret: SECRET,
      revalidate,
    });

    expect(response.status).toBe(200);
    expect(revalidate).toHaveBeenCalledOnce();
  });

  it("rejects an invalid signature", async () => {
    const revalidate = vi.fn();
    const request = await signedRequest(
      JSON.stringify({ _id: "landingPage", _type: "landingPage" }),
      "wrong-secret",
    );

    const response = await handleLandingPageWebhook(request, {
      secret: SECRET,
      revalidate,
    });

    expect(response.status).toBe(401);
    expect(revalidate).not.toHaveBeenCalled();
  });

  it("rejects signed requests for any other document", async () => {
    const revalidate = vi.fn();
    const request = await signedRequest(
      JSON.stringify({ _id: "another-document", _type: "landingPage" }),
    );

    const response = await handleLandingPageWebhook(request, {
      secret: SECRET,
      revalidate,
    });

    expect(response.status).toBe(400);
    expect(revalidate).not.toHaveBeenCalled();
  });

  it("fails closed when the server secret is missing", async () => {
    const revalidate = vi.fn();
    const request = await signedRequest(
      JSON.stringify({ _id: "landingPage", _type: "landingPage" }),
    );

    const response = await handleLandingPageWebhook(request, { revalidate });

    expect(response.status).toBe(503);
    expect(revalidate).not.toHaveBeenCalled();
  });
});
