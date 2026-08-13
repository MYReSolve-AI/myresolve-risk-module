import assert from "node:assert/strict";
import test from "node:test";
import {
  bookingReference,
  confirmationEmail,
  createBookingHandler,
  notionPayload,
  validatePayload,
} from "./index.mjs";

const ORIGIN = "https://myresolve.uk";

function validPayload(overrides = {}) {
  return {
    name: "Alex Leader",
    email: "alex@example.com",
    organisationRole: "Example Ltd, Operations Director",
    companySize: "50-249",
    question: "Where should we focus first?",
    toolFix: "Make priorities visible",
    message: "Tuesday mornings work well.",
    website: "",
    turnstileToken: "turnstile-token",
    ...overrides,
  };
}

function request(payload, headers = {}) {
  return new Request("https://api.myresolve.uk/booking", {
    method: "POST",
    headers: {
      Origin: ORIGIN,
      "Content-Type": "application/json",
      "CF-Connecting-IP": "203.0.113.10",
      ...headers,
    },
    body: JSON.stringify(payload),
  });
}

function env(overrides = {}) {
  return {
    NOTION_TOKEN: "server-only-notion-token",
    NOTION_DATABASE_ID: "d43affc3cfca4f21aee7b4f71d964d19",
    TURNSTILE_SECRET_KEY: "server-only-turnstile-secret",
    RESEND_API_KEY: "server-only-resend-key",
    RESEND_FROM_EMAIL: "MYReSolve <hello@myresolve.uk>",
    RESEND_REPLY_TO: "rob.myresolve@gmail.com",
    BOOKING_RATE_LIMITER: { limit: async () => ({ success: true }) },
    ...overrides,
  };
}

function notionSchema() {
  const select = (options) => ({
    type: "select",
    select: { options: options.map((name) => ({ name })) },
  });
  return {
    properties: {
      Code: { type: "title" },
      "Contact name": { type: "rich_text" },
      Email: { type: "email" },
      Segment: { type: "rich_text" },
      "Company size": select([
        "Just me / <10",
        "10-49",
        "50-249",
        "250-999",
        "1000+",
      ]),
      "Their question": { type: "rich_text" },
      "Outcome they would pay for": { type: "rich_text" },
      Notes: { type: "rich_text" },
      Source: select(["Assessment", "Referral", "Outreach", "Other"]),
      Status: select(["New", "Contacted", "Scheduled", "Interviewed", "Decided"]),
      "Booked on": { type: "date" },
    },
  };
}

test("a valid submission creates exactly one correctly mapped Notion page", async () => {
  const calls = [];
  const fetchImpl = async (url, options = {}) => {
    calls.push({ url: String(url), options });
    if (String(url).includes("siteverify")) {
      return Response.json({ success: true, action: "booking", hostname: "myresolve.uk" });
    }
    if (String(url).includes("/v1/databases/")) {
      return Response.json({ data_sources: [{ id: "data-source-id" }] });
    }
    if (String(url).includes("/v1/data_sources/")) return Response.json(notionSchema());
    if (String(url).endsWith("/v1/pages")) {
      return Response.json({ object: "page", id: "new-page-id" });
    }
    if (String(url) === "https://api.resend.com/emails") {
      return Response.json({ id: "email-id" });
    }
    throw new Error(`Unexpected URL: ${url}`);
  };
  const handle = createBookingHandler({
    fetchImpl,
    now: () => new Date("2026-08-11T15:00:00.000Z"),
    createReference: () => "MYR-20260811-A1B2C3D4",
  });

  const response = await handle(request(validPayload()), env());
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), {
    ok: true,
    emailSent: true,
    message: "Thank you. Your request has been received and Rob will be in touch.",
  });

  const pageCalls = calls.filter(({ url }) => url.endsWith("/v1/pages"));
  assert.equal(pageCalls.length, 1);
  const body = JSON.parse(pageCalls[0].options.body);
  assert.deepEqual(
    body,
    notionPayload(
      { ...validPayload(), code: "MYR-20260811-A1B2C3D4" },
      "data-source-id",
      "2026-08-11",
    ),
  );
  assert.equal(body.properties.Code.title[0].text.content, "MYR-20260811-A1B2C3D4");
  assert.equal(body.properties.Source.select.name, "Assessment");
  assert.equal(body.properties.Status.select.name, "New");
  assert.equal(body.properties["Booked on"].date.start, "2026-08-11");

  const emailCalls = calls.filter(({ url }) => url === "https://api.resend.com/emails");
  assert.equal(emailCalls.length, 1);
  const email = JSON.parse(emailCalls[0].options.body);
  assert.equal(email.to[0], "alex@example.com");
  assert.equal(email.from, "MYReSolve <hello@myresolve.uk>");
  assert.equal(email.reply_to, "rob.myresolve@gmail.com");
  assert.match(email.subject, /received your MYReSolve conversation request/i);
  assert.doesNotMatch(
    JSON.stringify(email),
    /Where should we focus|Example Ltd|50-249|Tuesday mornings/,
  );
  assert.equal(
    emailCalls[0].options.headers["Idempotency-Key"],
    "booking-confirmation/MYR-20260811-A1B2C3D4",
  );
});

test("the honeypot blocks storage without calling Turnstile or Notion", async () => {
  let externalCalls = 0;
  const handle = createBookingHandler({
    fetchImpl: async () => {
      externalCalls += 1;
      throw new Error("No external call expected");
    },
  });
  const response = await handle(request(validPayload({ website: "spam.example" })), env());
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true, emailSent: true });
  assert.equal(externalCalls, 0);
});

test("malformed fields and invalid select values are rejected before external calls", async () => {
  let externalCalls = 0;
  const handle = createBookingHandler({
    fetchImpl: async () => {
      externalCalls += 1;
      throw new Error("No external call expected");
    },
  });
  const response = await handle(
    request(validPayload({ email: "not-an-email", companySize: "Huge" })),
    env(),
  );
  assert.equal(response.status, 400);
  assert.equal(externalCalls, 0);
});

test("oversized JSON is rejected before external calls", async () => {
  let externalCalls = 0;
  const handle = createBookingHandler({
    fetchImpl: async () => {
      externalCalls += 1;
      throw new Error("No external call expected");
    },
  });
  const response = await handle(
    request({ ...validPayload(), ignored: "x".repeat(13_000) }),
    env(),
  );
  assert.equal(response.status, 413);
  assert.equal(externalCalls, 0);
});

test("Turnstile failure blocks the Notion lookup and write", async () => {
  const urls = [];
  const handle = createBookingHandler({
    fetchImpl: async (url) => {
      urls.push(String(url));
      return Response.json({ success: false });
    },
  });
  const response = await handle(request(validPayload()), env());
  assert.equal(response.status, 400);
  assert.equal(urls.length, 1);
  assert.match(urls[0], /siteverify/);
});

test("rate limiting runs before Turnstile and Notion", async () => {
  let externalCalls = 0;
  const handle = createBookingHandler({
    fetchImpl: async () => {
      externalCalls += 1;
      throw new Error("No external call expected");
    },
  });
  const response = await handle(
    request(validPayload()),
    env({ BOOKING_RATE_LIMITER: { limit: async () => ({ success: false }) } }),
  );
  assert.equal(response.status, 429);
  assert.equal(externalCalls, 0);
});

test("a Notion failure returns a retry response rather than false success", async () => {
  const handle = createBookingHandler({
    fetchImpl: async (url) => {
      if (String(url).includes("siteverify")) {
        return Response.json({ success: true, action: "booking", hostname: "myresolve.uk" });
      }
      if (String(url).includes("/v1/databases/")) {
        return Response.json({ data_sources: [{ id: "data-source-id" }] });
      }
      if (String(url).includes("/v1/data_sources/")) return Response.json(notionSchema());
      return new Response("Notion unavailable", { status: 503 });
    },
  });
  const originalError = console.error;
  console.error = () => {};
  try {
    const response = await handle(request(validPayload()), env());
    assert.equal(response.status, 502);
    const body = await response.json();
    assert.equal(body.ok, false);
    assert.match(body.message, /couldn’t save/i);
  } finally {
    console.error = originalError;
  }
});

test("a Resend failure keeps the stored request successful without claiming email delivery", async () => {
  const calls = [];
  const handle = createBookingHandler({
    fetchImpl: async (url) => {
      calls.push(String(url));
      if (String(url).includes("siteverify")) {
        return Response.json({ success: true, action: "booking", hostname: "myresolve.uk" });
      }
      if (String(url).includes("/v1/databases/")) {
        return Response.json({ data_sources: [{ id: "data-source-id" }] });
      }
      if (String(url).includes("/v1/data_sources/")) return Response.json(notionSchema());
      if (String(url).endsWith("/v1/pages")) return Response.json({ object: "page" });
      if (String(url) === "https://api.resend.com/emails") {
        return new Response("Email unavailable", { status: 503 });
      }
      throw new Error(`Unexpected URL: ${url}`);
    },
  });
  const originalError = console.error;
  console.error = () => {};
  try {
    const response = await handle(request(validPayload()), env());
    assert.equal(response.status, 201);
    const body = await response.json();
    assert.equal(body.ok, true);
    assert.equal(body.emailSent, false);
    assert.equal(calls.filter((url) => url.endsWith("/v1/pages")).length, 1);
    assert.equal(calls.filter((url) => url === "https://api.resend.com/emails").length, 1);
  } finally {
    console.error = originalError;
  }
});

test("a mismatched Notion schema fails closed without creating a page", async () => {
  const urls = [];
  const handle = createBookingHandler({
    fetchImpl: async (url) => {
      urls.push(String(url));
      if (String(url).includes("siteverify")) {
        return Response.json({ success: true, action: "booking", hostname: "myresolve.uk" });
      }
      if (String(url).includes("/v1/databases/")) {
        return Response.json({ data_sources: [{ id: "data-source-id" }] });
      }
      if (String(url).includes("/v1/data_sources/")) {
        return Response.json({ properties: { Code: { type: "rich_text" } } });
      }
      return Response.json({ object: "page" });
    },
  });
  const originalError = console.error;
  console.error = () => {};
  try {
    const response = await handle(request(validPayload()), env());
    assert.equal(response.status, 502);
    assert.equal(urls.filter((url) => url.endsWith("/v1/pages")).length, 0);
  } finally {
    console.error = originalError;
  }
});

test("validation enforces field caps and exact company-size options", () => {
  assert.equal(validatePayload(validPayload()).ok, true);
  assert.equal(validatePayload(validPayload({ question: "x".repeat(1501) })).ok, false);
  assert.equal(validatePayload(validPayload({ companySize: "10 to 49" })).ok, false);
});

test("booking references are generated internally without personal data", () => {
  const reference = bookingReference(
    new Date("2026-08-12T10:30:00.000Z"),
    "12345678-90ab-cdef-1234-567890abcdef",
  );
  assert.equal(reference, "MYR-20260812-12345678");
});

test("confirmation email escapes the name and excludes submitted enquiry details", () => {
  const email = confirmationEmail(
    validPayload({ name: '<Alex & "Sam">' }),
    "MYR-20260812-12345678",
    env(),
  );
  assert.match(email.html, /&lt;Alex &amp; &quot;Sam&quot;&gt;/);
  assert.doesNotMatch(
    JSON.stringify(email),
    /Where should we focus|Make priorities visible|Tuesday mornings/,
  );
  assert.match(email.text, /Thank you for contacting MYReSolve/);
  assert.match(email.text, /Reference: MYR-20260812-12345678/);
  assert.match(email.text, /confidential assessment, financial or company information/);
});

test("confirmation email applies the approved MYReSolve brand without external content", () => {
  const email = confirmationEmail(
    validPayload(),
    "MYR-20260812-12345678",
    env(),
  );

  assert.match(email.html, /<html lang="en">/);
  assert.match(email.html, /role="presentation"/);
  assert.match(email.html, /width="600"/);
  assert.match(email.html, /background:#f7f3ec/);
  assert.match(email.html, /background:#173f35/);
  assert.match(email.html, /border-bottom:4px solid #c68b35/);
  assert.match(email.html, />MYReSolve</);
  assert.match(email.html, />Your request has been received</);
  assert.match(email.html, />MYR-20260812-12345678</);
  assert.doesNotMatch(email.html, /<(?:img|script|link)\b/i);
  assert.doesNotMatch(email.html, /(?:src|href)\s*=/i);
  assert.doesNotMatch(email.html, /https?:\/\//i);
});
