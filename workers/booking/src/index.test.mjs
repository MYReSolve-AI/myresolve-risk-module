import assert from "node:assert/strict";
import test from "node:test";
import { createBookingHandler, notionPayload, validatePayload } from "./index.mjs";

const ORIGIN = "https://myresolve.uk";

function validPayload(overrides = {}) {
  return {
    name: "Alex Leader",
    code: "AL-01",
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
    throw new Error(`Unexpected URL: ${url}`);
  };
  const handle = createBookingHandler({
    fetchImpl,
    now: () => new Date("2026-08-11T15:00:00.000Z"),
  });

  const response = await handle(request(validPayload()), env());
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true });

  const pageCalls = calls.filter(({ url }) => url.endsWith("/v1/pages"));
  assert.equal(pageCalls.length, 1);
  const body = JSON.parse(pageCalls[0].options.body);
  assert.deepEqual(body, notionPayload(validPayload(), "data-source-id", "2026-08-11"));
  assert.equal(body.properties.Source.select.name, "Assessment");
  assert.equal(body.properties.Status.select.name, "New");
  assert.equal(body.properties["Booked on"].date.start, "2026-08-11");
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
