import assert from "node:assert/strict";
import test from "node:test";
import worker, {
  bookingReference,
  confirmationEmail,
  createBookingHandler,
  createKpiHandler,
  kpiDeliveryEmail,
  kpiNotionPayload,
  kpiOwnerNotificationEmail,
  kpiReference,
  notionPayload,
  ownerNotificationEmail,
  routeRequest,
  validateKpiPayload,
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
  // One confirmation to the enquirer, one notification to the owner.
  assert.equal(emailCalls.length, 2);
  const confirmationCall = emailCalls.find(({ options }) =>
    options.headers["Idempotency-Key"].startsWith("booking-confirmation/"),
  );
  assert.ok(confirmationCall);
  const email = JSON.parse(confirmationCall.options.body);
  assert.equal(email.to[0], "alex@example.com");
  assert.equal(email.from, "MYReSolve <hello@myresolve.uk>");
  assert.equal(email.reply_to, "rob.myresolve@gmail.com");
  assert.deepEqual(Object.keys(email).sort(), [
    "from",
    "html",
    "reply_to",
    "subject",
    "text",
    "to",
  ]);
  assert.match(email.subject, /received your MYReSolve conversation request/i);
  assert.doesNotMatch(
    JSON.stringify(email),
    /Example Ltd|50-249|Where should we focus|Make priorities visible|Tuesday mornings/,
  );
  assert.equal(
    confirmationCall.options.headers["Idempotency-Key"],
    "booking-confirmation/MYR-20260811-A1B2C3D4",
  );

  const ownerCall = emailCalls.find(({ options }) =>
    options.headers["Idempotency-Key"].startsWith("booking-owner-notification/"),
  );
  assert.ok(ownerCall);
  assert.equal(
    ownerCall.options.headers["Idempotency-Key"],
    "booking-owner-notification/MYR-20260811-A1B2C3D4",
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
    // Owner notification and visitor confirmation are both attempted, and both
    // fail here; neither retries and neither changes the stored enquiry.
    assert.equal(calls.filter((url) => url === "https://api.resend.com/emails").length, 2);
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
    /Example Ltd|50-249|Where should we focus|Make priorities visible|Tuesday mornings/,
  );
  assert.match(email.text, /Thank you for contacting MYReSolve/);
  assert.match(email.text, /Reference: MYR-20260812-12345678/);
  assert.match(email.text, /confidential assessment, financial or company information/);
});

test("confirmation email replies to the business address when RESEND_REPLY_TO is unset", () => {
  const { RESEND_REPLY_TO, ...withoutReplyTo } = env();
  const email = confirmationEmail(
    validPayload(),
    "MYR-20260812-12345678",
    withoutReplyTo,
  );

  assert.equal(email.reply_to, "hello@myresolve.uk");
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

test("the owner notification carries every submitted field, the reference and the Notion link", () => {
  const email = ownerNotificationEmail(
    validPayload(),
    "MYR-20260812-12345678",
    "https://www.notion.so/new-page-id",
    env(),
  );

  assert.deepEqual(email.to, ["hello@myresolve.uk"]);
  assert.equal(email.from, "MYReSolve <hello@myresolve.uk>");
  // Replying to the notification must reach the enquirer, not the owner.
  assert.equal(email.reply_to, "alex@example.com");
  assert.equal(email.subject, "New enquiry: Alex Leader - 50-249");
  assert.deepEqual(Object.keys(email).sort(), [
    "from",
    "reply_to",
    "subject",
    "text",
    "to",
  ]);

  for (const value of [
    "Alex Leader",
    "alex@example.com",
    "Example Ltd, Operations Director",
    "50-249",
    "Where should we focus first?",
    "Make priorities visible",
    "Tuesday mornings work well.",
    "MYR-20260812-12345678",
    "https://www.notion.so/new-page-id",
  ]) {
    assert.ok(email.text.includes(value), `owner email is missing: ${value}`);
  }
});

test("the owner notification never carries the Turnstile token", () => {
  const email = ownerNotificationEmail(
    validPayload({ turnstileToken: "super-secret-turnstile-token" }),
    "MYR-20260812-12345678",
    "https://www.notion.so/new-page-id",
    env(),
  );
  assert.doesNotMatch(JSON.stringify(email), /super-secret-turnstile-token/);
});

test("the owner notification keeps the subject on one line and labels blank optional fields", () => {
  const email = ownerNotificationEmail(
    validPayload({ name: "Alex\r\nBcc: attacker@example.com", toolFix: "", message: "" }),
    "MYR-20260812-12345678",
    "",
    env(),
  );
  assert.doesNotMatch(email.subject, /[\r\n]/);
  assert.equal(email.subject, "New enquiry: Alex Bcc: attacker@example.com - 50-249");
  assert.match(email.text, /One thing a tool could fix:\n\(not answered\)/);
  assert.match(email.text, /Anything else:\n\(not answered\)/);
  assert.match(email.text, /link unavailable/);
});

test("a failed owner notification still returns success and still sends the confirmation", async () => {
  const calls = [];
  const handle = createBookingHandler({
    fetchImpl: async (url, options = {}) => {
      calls.push({ url: String(url), options });
      if (String(url).includes("siteverify")) {
        return Response.json({ success: true, action: "booking", hostname: "myresolve.uk" });
      }
      if (String(url).includes("/v1/databases/")) {
        return Response.json({ data_sources: [{ id: "data-source-id" }] });
      }
      if (String(url).includes("/v1/data_sources/")) return Response.json(notionSchema());
      if (String(url).endsWith("/v1/pages")) {
        return Response.json({ object: "page", url: "https://www.notion.so/new-page-id" });
      }
      if (String(url) === "https://api.resend.com/emails") {
        const key = options.headers["Idempotency-Key"];
        if (key.startsWith("booking-owner-notification/")) {
          return new Response("Owner email unavailable", { status: 500 });
        }
        return Response.json({ id: "email-id" });
      }
      throw new Error(`Unexpected URL: ${url}`);
    },
    now: () => new Date("2026-08-11T15:00:00.000Z"),
    createReference: () => "MYR-20260811-A1B2C3D4",
  });

  const originalError = console.error;
  console.error = () => {};
  try {
    const response = await handle(request(validPayload()), env());
    assert.equal(response.status, 201);
    // The visitor's outcome is unchanged by the owner notification failing.
    assert.deepEqual(await response.json(), {
      ok: true,
      emailSent: true,
      message: "Thank you. Your request has been received and Rob will be in touch.",
    });
    const emailCalls = calls.filter(({ url }) => url === "https://api.resend.com/emails");
    assert.equal(emailCalls.length, 2);
  } finally {
    console.error = originalError;
  }
});

test("the owner notification links to the Notion page returned by the create call", async () => {
  const calls = [];
  const handle = createBookingHandler({
    fetchImpl: async (url, options = {}) => {
      calls.push({ url: String(url), options });
      if (String(url).includes("siteverify")) {
        return Response.json({ success: true, action: "booking", hostname: "myresolve.uk" });
      }
      if (String(url).includes("/v1/databases/")) {
        return Response.json({ data_sources: [{ id: "data-source-id" }] });
      }
      if (String(url).includes("/v1/data_sources/")) return Response.json(notionSchema());
      if (String(url).endsWith("/v1/pages")) {
        return Response.json({ object: "page", url: "https://www.notion.so/real-page" });
      }
      return Response.json({ id: "email-id" });
    },
    now: () => new Date("2026-08-11T15:00:00.000Z"),
    createReference: () => "MYR-20260811-A1B2C3D4",
  });

  await handle(request(validPayload()), env());
  const ownerCall = calls.find(
    ({ url, options }) =>
      url === "https://api.resend.com/emails" &&
      options.headers["Idempotency-Key"].startsWith("booking-owner-notification/"),
  );
  assert.ok(ownerCall);
  const email = JSON.parse(ownerCall.options.body);
  assert.match(email.text, /https:\/\/www\.notion\.so\/real-page/);
  assert.match(email.text, /MYR-20260811-A1B2C3D4/);
});

// --- MYR-KPIS-PAGE: POST /kpis ----------------------------------------------

const KPI_PDF_URL = "https://myresolve.uk/downloads/MYReSolve-The-Twenty-Numbers.pdf";
const KPI_PDF_BYTES = new TextEncoder().encode("%PDF-1.4 twenty numbers");
const KPI_PDF_BASE64 = Buffer.from(KPI_PDF_BYTES).toString("base64");
const KPI_SUCCESS =
  "Sent. Check your inbox for The twenty numbers. If it is not there in a few minutes, look in spam or email hello@myresolve.uk.";
const KPI_FAILURE =
  "Something went wrong. Email hello@myresolve.uk and we will send it by hand.";

function kpiPayload(overrides = {}) {
  return {
    email: "sam@example.com",
    name: "Sam Leader",
    subscriptionInterest: false,
    website: "",
    ...overrides,
  };
}

function kpiRequest(payload, headers = {}) {
  return new Request("https://api.myresolve.uk/kpis", {
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

function kpiNotionSchema() {
  const schema = notionSchema();
  schema.properties.Source.select.options.push({ name: "KPI download" });
  return schema;
}

// A fetch stand-in for the whole happy path. Each behaviour can be switched
// off to exercise one failure at a time.
function kpiFetch(calls, { pdf = true, notionPage = true, resend = true, schema = kpiNotionSchema } = {}) {
  return async (url, options = {}) => {
    calls.push({ url: String(url), options });
    if (String(url) === KPI_PDF_URL) {
      if (!pdf) return new Response("<!doctype html>not found", { status: 200, headers: { "Content-Type": "text/html" } });
      return new Response(KPI_PDF_BYTES, { status: 200, headers: { "Content-Type": "application/pdf" } });
    }
    if (String(url).includes("/v1/databases/")) {
      return Response.json({ data_sources: [{ id: "data-source-id" }] });
    }
    if (String(url).includes("/v1/data_sources/")) return Response.json(schema());
    if (String(url).endsWith("/v1/pages")) {
      if (!notionPage) return new Response("{}", { status: 500 });
      return Response.json({ object: "page", id: "kpi-page-id", url: "https://www.notion.so/kpi-page-id" });
    }
    if (String(url) === "https://api.resend.com/emails") {
      if (!resend) return new Response("{}", { status: 500 });
      return Response.json({ id: "email-id" });
    }
    throw new Error(`Unexpected URL: ${url}`);
  };
}

function kpiHandler(calls, options) {
  return createKpiHandler({
    fetchImpl: kpiFetch(calls, options),
    now: () => new Date("2026-09-16T09:00:00.000Z"),
    createReference: () => "MYR-KPI-20260916-A1B2C3D4",
  });
}

test("KPI: a valid submission sends the PDF, creates the tracker row and alerts the owner", async () => {
  const calls = [];
  const response = await kpiHandler(calls)(kpiRequest(kpiPayload()), env());
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true, emailSent: true, message: KPI_SUCCESS });

  // The PDF comes from the site origin, not from a copy inside the Worker.
  assert.equal(calls.filter(({ url }) => url === KPI_PDF_URL).length, 1);

  const emailCalls = calls.filter(({ url }) => url === "https://api.resend.com/emails");
  assert.equal(emailCalls.length, 2);

  const delivery = emailCalls.find(({ options }) =>
    options.headers["Idempotency-Key"] === "kpi-delivery/MYR-KPI-20260916-A1B2C3D4",
  );
  assert.ok(delivery);
  const deliveryEmail = JSON.parse(delivery.options.body);
  assert.deepEqual(deliveryEmail.to, ["sam@example.com"]);
  assert.equal(deliveryEmail.from, "MYReSolve <hello@myresolve.uk>");
  assert.equal(deliveryEmail.reply_to, "hello@myresolve.uk");
  assert.equal(deliveryEmail.subject, "The twenty numbers, from MYReSolve");
  assert.deepEqual(deliveryEmail.attachments, [
    { filename: "MYReSolve-The-Twenty-Numbers.pdf", content: KPI_PDF_BASE64 },
  ]);
  assert.match(deliveryEmail.text, /^Here is The twenty numbers\. Pick three, put them on the wall and in front of the board on the same day, and add the next one next month\./);
  assert.match(deliveryEmail.text, /the Structured Executive Assessment is free at myresolve\.uk\/organisation-profile\./);
  assert.match(deliveryEmail.text, /\nRob$/);
  assert.doesNotMatch(deliveryEmail.text + deliveryEmail.html, /Sam Leader/);

  const pageCalls = calls.filter(({ url }) => url.endsWith("/v1/pages"));
  assert.equal(pageCalls.length, 1);
  const page = JSON.parse(pageCalls[0].options.body);
  assert.deepEqual(
    page,
    kpiNotionPayload({ ...kpiPayload(), code: "MYR-KPI-20260916-A1B2C3D4" }, "data-source-id", "2026-09-16"),
  );
  assert.equal(page.properties.Code.title[0].text.content, "MYR-KPI-20260916-A1B2C3D4");
  assert.equal(page.properties["Contact name"].rich_text[0].text.content, "Sam Leader");
  assert.equal(page.properties.Email.email, "sam@example.com");
  assert.equal(page.properties.Source.select.name, "KPI download");
  assert.equal(page.properties.Status.select.name, "New");
  assert.equal(page.properties.Segment.rich_text[0].text.content, "Twenty numbers download");
  assert.equal(page.properties["Their question"].rich_text[0].text.content, "Requested The twenty numbers PDF");
  assert.equal(page.properties["Booked on"].date.start, "2026-09-16");
  assert.equal("Company size" in page.properties, false);

  const owner = emailCalls.find(({ options }) =>
    options.headers["Idempotency-Key"] === "kpi-owner-notification/MYR-KPI-20260916-A1B2C3D4",
  );
  assert.ok(owner);
  const ownerEmail = JSON.parse(owner.options.body);
  assert.deepEqual(ownerEmail.to, ["hello@myresolve.uk"]);
  assert.equal(ownerEmail.reply_to, "sam@example.com");
  assert.equal(ownerEmail.subject, "KPI download: sam@example.com");
  assert.match(ownerEmail.text, /https:\/\/www\.notion\.so\/kpi-page-id/);
  assert.match(ownerEmail.text, /Subscription:\s+not ticked/);

  // Delivery goes first, then the tracker row, then the owner alert.
  const order = calls.map(({ url, options }) =>
    url === "https://api.resend.com/emails" ? options.headers["Idempotency-Key"].split("/")[0] : url,
  );
  assert.ok(order.indexOf("kpi-delivery") < order.findIndex((u) => u.endsWith("/v1/pages")));
  assert.ok(order.findIndex((u) => u.endsWith("/v1/pages")) < order.indexOf("kpi-owner-notification"));
});

test("KPI: ticking the subscription box is recorded in the segment, the question and the alert subject", async () => {
  const calls = [];
  const response = await kpiHandler(calls)(
    kpiRequest(kpiPayload({ subscriptionInterest: true })),
    env(),
  );
  assert.equal(response.status, 201);

  const page = JSON.parse(calls.find(({ url }) => url.endsWith("/v1/pages")).options.body);
  assert.equal(
    page.properties.Segment.rich_text[0].text.content,
    "Twenty numbers download · subscription interest",
  );
  assert.equal(
    page.properties["Their question"].rich_text[0].text.content,
    "Requested The twenty numbers PDF and asked to hear about the subscription",
  );

  const owner = JSON.parse(
    calls.find(({ options }) => options.headers?.["Idempotency-Key"]?.startsWith("kpi-owner-notification/")).options.body,
  );
  assert.equal(owner.subject, "KPI download: sam@example.com (subscription interest)");
  assert.match(owner.text, /asked to hear about the subscription/);
});

test("KPI: a blank name falls back to the email as the contact name", () => {
  const page = kpiNotionPayload(
    { ...kpiPayload({ name: "" }), code: "MYR-KPI-20260916-A1B2C3D4" },
    "data-source-id",
    "2026-09-16",
  );
  assert.equal(page.properties["Contact name"].rich_text[0].text.content, "sam@example.com");
});

test("KPI: the honeypot returns a fake success without any external call", async () => {
  let externalCalls = 0;
  const handle = createKpiHandler({
    fetchImpl: async () => {
      externalCalls += 1;
      throw new Error("No external call expected");
    },
  });
  const response = await handle(kpiRequest(kpiPayload({ website: "spam.example" })), env());
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true, emailSent: true, message: KPI_SUCCESS });
  assert.equal(externalCalls, 0);
});

test("KPI: the rate limiter runs before any external call", async () => {
  let externalCalls = 0;
  const handle = createKpiHandler({
    fetchImpl: async () => {
      externalCalls += 1;
      throw new Error("No external call expected");
    },
  });
  const response = await handle(
    kpiRequest(kpiPayload()),
    env({ BOOKING_RATE_LIMITER: { limit: async () => ({ success: false }) } }),
  );
  assert.equal(response.status, 429);
  assert.equal(externalCalls, 0);
});

test("KPI: a malformed or missing email is rejected with 400 before any external call", async () => {
  let externalCalls = 0;
  const handle = createKpiHandler({
    fetchImpl: async () => {
      externalCalls += 1;
      throw new Error("No external call expected");
    },
  });
  for (const email of ["not-an-email", "", "   "]) {
    const response = await handle(kpiRequest(kpiPayload({ email })), env());
    assert.equal(response.status, 400);
    assert.equal((await response.json()).ok, false);
  }
  const notBoolean = await handle(kpiRequest(kpiPayload({ subscriptionInterest: "yes" })), env());
  assert.equal(notBoolean.status, 400);
  assert.equal(externalCalls, 0);
});

test("KPI: validation caps field lengths and normalises the name to one line", () => {
  assert.equal(validateKpiPayload(kpiPayload({ name: "a".repeat(101) })).ok, false);
  assert.equal(validateKpiPayload(kpiPayload({ email: "a".repeat(250) + "@x.uk" })).ok, false);
  const result = validateKpiPayload(kpiPayload({ name: "Sam\nLeader" }));
  assert.equal(result.ok, true);
  assert.equal(result.values.name, "Sam Leader");
  assert.equal(result.values.subscriptionInterest, false);
  const bare = validateKpiPayload({ email: "sam@example.com" });
  assert.equal(bare.ok, true);
  assert.equal(bare.values.name, "");
  assert.equal(bare.values.website, "");
});

test("KPI: does not require the Turnstile secret, but does require the rest of the configuration", async () => {
  const calls = [];
  const handle = kpiHandler(calls);
  const withoutTurnstile = await handle(
    kpiRequest(kpiPayload()),
    env({ TURNSTILE_SECRET_KEY: undefined }),
  );
  assert.equal(withoutTurnstile.status, 201);

  const withoutResend = await handle(kpiRequest(kpiPayload()), env({ RESEND_API_KEY: "" }));
  assert.equal(withoutResend.status, 503);
  assert.equal((await withoutResend.json()).message, KPI_FAILURE);
});

test("KPI: a missing 'KPI download' Source option fails closed before anything is sent", async () => {
  const calls = [];
  const handle = kpiHandler(calls, { schema: notionSchema });
  const response = await handle(kpiRequest(kpiPayload()), env());
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { ok: false, message: KPI_FAILURE });
  assert.equal(calls.filter(({ url }) => url === "https://api.resend.com/emails").length, 0);
  assert.equal(calls.filter(({ url }) => url.endsWith("/v1/pages")).length, 0);
});

test("KPI: an unreadable PDF fails closed before anything is sent", async () => {
  const calls = [];
  const handle = kpiHandler(calls, { pdf: false });
  const response = await handle(kpiRequest(kpiPayload()), env());
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { ok: false, message: KPI_FAILURE });
  assert.equal(calls.filter(({ url }) => url === "https://api.resend.com/emails").length, 0);
  assert.equal(calls.filter(({ url }) => url.endsWith("/v1/pages")).length, 0);
});

test("KPI: a failed delivery email is the visitor's failure state and creates no tracker row", async () => {
  const calls = [];
  const handle = kpiHandler(calls, { resend: false });
  const response = await handle(kpiRequest(kpiPayload()), env());
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { ok: false, message: KPI_FAILURE });
  assert.equal(calls.filter(({ url }) => url === "https://api.resend.com/emails").length, 1);
  assert.equal(calls.filter(({ url }) => url.endsWith("/v1/pages")).length, 0);
});

test("KPI: a tracker failure after the PDF has gone still succeeds and is flagged in the owner alert", async () => {
  const calls = [];
  const handle = kpiHandler(calls, { notionPage: false });
  const response = await handle(kpiRequest(kpiPayload()), env());
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true, emailSent: true, message: KPI_SUCCESS });
  const owner = JSON.parse(
    calls.find(({ options }) => options.headers?.["Idempotency-Key"]?.startsWith("kpi-owner-notification/")).options.body,
  );
  assert.match(owner.text, /NOT CREATED/);
});

test("KPI: references are generated internally with the MYR-KPI prefix", () => {
  const reference = kpiReference(new Date("2026-09-16T09:00:00.000Z"), "12345678-90ab-cdef-1234-567890abcdef");
  assert.equal(reference, "MYR-KPI-20260916-12345678");
  assert.match(kpiReference(new Date()), /^MYR-KPI-\d{8}-[0-9A-F]{8}$/);
  assert.match(bookingReference(new Date()), /^MYR-\d{8}-[0-9A-F]{8}$/);
});

test("KPI: the delivery email carries the approved subject, reply-to and attachment and no personal data", () => {
  const email = kpiDeliveryEmail({ email: "sam@example.com" }, KPI_PDF_BASE64, env());
  assert.deepEqual(Object.keys(email).sort(), ["attachments", "from", "html", "reply_to", "subject", "text", "to"]);
  assert.equal(email.reply_to, "hello@myresolve.uk");
  assert.equal(email.attachments[0].filename, "MYReSolve-The-Twenty-Numbers.pdf");
  assert.doesNotMatch(email.html, /MYRESOLVE|Myresolve/);
  assert.match(email.html, /MYReSolve/);
});

test("KPI: the owner alert keeps the subject on one line and labels a blank name", () => {
  const email = kpiOwnerNotificationEmail(
    { ...kpiPayload({ name: "" }), email: "sam@example.com" },
    "MYR-KPI-20260916-A1B2C3D4",
    "",
    true,
    env(),
  );
  assert.equal(email.subject, "KPI download: sam@example.com");
  assert.match(email.text, /Name:\s+\(not given\)/);
  assert.match(email.text, /link unavailable/);
});

test("routing sends /kpis to the KPI handler and everything else to the enquiry handler", () => {
  const handlers = { booking: () => "booking", kpi: () => "kpi" };
  assert.equal(routeRequest(new Request("https://api.myresolve.uk/kpis"), handlers)(), "kpi");
  assert.equal(routeRequest(new Request("https://api.myresolve.uk/booking"), handlers)(), "booking");
  assert.equal(routeRequest(new Request("https://api.myresolve.uk/"), handlers)(), "booking");
  assert.equal(routeRequest(new Request("https://api.myresolve.uk/kpis/extra"), handlers)(), "booking");
});

test("the default export answers a /kpis preflight with CORS headers like the enquiry endpoint", async () => {
  const preflight = new Request("https://api.myresolve.uk/kpis", {
    method: "OPTIONS",
    headers: { Origin: ORIGIN },
  });
  const response = await worker.fetch(preflight, env());
  assert.equal(response.status, 204);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  assert.equal(response.headers.get("Access-Control-Allow-Methods"), "POST, OPTIONS");
});
