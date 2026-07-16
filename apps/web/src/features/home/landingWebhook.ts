import {
  isValidSignature,
  SIGNATURE_HEADER_NAME,
} from "@sanity/webhook";

type WebhookPayload = {
  _id?: unknown;
  _type?: unknown;
};

type LandingWebhookDependencies = {
  secret?: string;
  revalidate: () => void;
};

export async function handleLandingPageWebhook(
  request: Request,
  dependencies: LandingWebhookDependencies,
) {
  const secret = dependencies.secret?.trim();
  if (!secret) {
    return Response.json(
      { revalidated: false, message: "Revalidation is not configured" },
      { status: 503 },
    );
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? "";
  const rawBody = await request.text();
  const valid = await isValidSignature(rawBody, signature, secret);

  if (!valid) {
    return Response.json(
      { revalidated: false, message: "Invalid signature" },
      { status: 401 },
    );
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    return Response.json(
      { revalidated: false, message: "Invalid payload" },
      { status: 400 },
    );
  }

  if (payload._type !== "landingPage" || payload._id !== "landingPage") {
    return Response.json(
      { revalidated: false, message: "Document is not the landing page" },
      { status: 400 },
    );
  }

  dependencies.revalidate();
  return Response.json({ revalidated: true });
}
