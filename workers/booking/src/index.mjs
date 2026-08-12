const NOTION_VERSION = "2026-03-11";
const MAX_BODY_BYTES = 12_000;
const ALLOWED_COMPANY_SIZES = new Set([
  "Just me / <10",
  "10-49",
  "50-249",
  "250-999",
  "1000+",
]);
const EXPECTED_NOTION_PROPERTIES = {
  Code: "title",
  "Contact name": "rich_text",
  Email: "email",
  Segment: "rich_text",
  "Company size": "select",
  "Their question": "rich_text",
  "Outcome they would pay for": "rich_text",
  Notes: "rich_text",
  Source: "select",
  Status: "select",
  "Booked on": "date",
};

const FIELD_LIMITS = {
  name: 100,
  email: 254,
  organisationRole: 200,
  companySize: 20,
  question: 1500,
  toolFix: 1000,
  message: 2000,
  website: 200,
  turnstileToken: 2048,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body, status, origin) {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  if (origin) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
  }
  return new Response(JSON.stringify(body), { status, headers });
}

function allowedOrigins(env) {
  const configured = String(env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  return new Set([
    "https://myresolve.uk",
    "https://www.myresolve.uk",
    ...configured,
  ]);
}

function allowedTurnstileHostnames(env) {
  const configured = String(env.TURNSTILE_HOSTNAMES ?? "")
    .split(",")
    .map((hostname) => hostname.trim())
    .filter(Boolean);
  return new Set(["myresolve.uk", "www.myresolve.uk", ...configured]);
}

function cleanText(value) {
  if (typeof value !== "string") return null;
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

function validatePayload(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, message: "The form data was not valid." };
  }

  const values = {};
  for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
    const cleaned = cleanText(raw[field] ?? "");
    if (cleaned === null || cleaned.length > limit) {
      return { ok: false, message: "One or more fields are too long or invalid." };
    }
    values[field] = cleaned;
  }

  const required = [
    "name",
    "email",
    "organisationRole",
    "companySize",
    "question",
    "turnstileToken",
  ];
  if (required.some((field) => !values[field])) {
    return { ok: false, message: "Please complete all required fields." };
  }
  if (!EMAIL_PATTERN.test(values.email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  if (!ALLOWED_COMPANY_SIZES.has(values.companySize)) {
    return { ok: false, message: "Please choose a valid company size." };
  }

  return { ok: true, values };
}

function notionText(content) {
  return { rich_text: content ? [{ type: "text", text: { content } }] : [] };
}

function bookingReference(date, uuid = crypto.randomUUID()) {
  const day = date.toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = uuid.replaceAll("-", "").slice(0, 8).toUpperCase();
  return `MYR-${day}-${suffix}`;
}

function notionPayload(values, dataSourceId, date) {
  return {
    parent: { type: "data_source_id", data_source_id: dataSourceId },
    properties: {
      Code: { title: [{ type: "text", text: { content: values.code } }] },
      "Contact name": notionText(values.name),
      Email: { email: values.email },
      Segment: notionText(values.organisationRole),
      "Company size": { select: { name: values.companySize } },
      "Their question": notionText(values.question),
      "Outcome they would pay for": notionText(values.toolFix),
      Notes: notionText(values.message),
      Source: { select: { name: "Assessment" } },
      Status: { select: { name: "New" } },
      "Booked on": { date: { start: date } },
    },
  };
}

function notionHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Notion-Version": NOTION_VERSION,
  };
}

export function createBookingHandler({
  fetchImpl = fetch,
  now = () => new Date(),
  createReference = bookingReference,
} = {}) {
  let cachedDataSource;

  function validateNotionSchema(dataSource) {
    const properties = dataSource?.properties;
    if (!properties || typeof properties !== "object") {
      throw new Error("Notion data source schema was not available");
    }
    for (const [name, type] of Object.entries(EXPECTED_NOTION_PROPERTIES)) {
      if (properties[name]?.type !== type) {
        throw new Error(`Notion property ${name} must use type ${type}`);
      }
    }
    const expectedOptions = {
      "Company size": [...ALLOWED_COMPANY_SIZES],
      Source: ["Assessment", "Referral", "Outreach", "Other"],
      Status: ["New", "Contacted", "Scheduled", "Interviewed", "Decided"],
    };
    for (const [name, options] of Object.entries(expectedOptions)) {
      const actual = new Set(
        (properties[name]?.select?.options ?? []).map((option) => option.name),
      );
      if (options.some((option) => !actual.has(option))) {
        throw new Error(`Notion property ${name} is missing an approved option`);
      }
    }
  }

  async function resolveDataSourceId(env) {
    if (cachedDataSource?.databaseId === env.NOTION_DATABASE_ID) {
      return cachedDataSource.id;
    }
    const response = await fetchImpl(
      `https://api.notion.com/v1/databases/${encodeURIComponent(env.NOTION_DATABASE_ID)}`,
      { headers: notionHeaders(env.NOTION_TOKEN) },
    );
    if (!response.ok) throw new Error(`Notion database lookup failed (${response.status})`);
    const database = await response.json();
    if (!Array.isArray(database.data_sources) || database.data_sources.length !== 1) {
      throw new Error("Notion database must expose exactly one data source");
    }
    const dataSourceId = database.data_sources[0].id;
    const schemaResponse = await fetchImpl(
      `https://api.notion.com/v1/data_sources/${encodeURIComponent(dataSourceId)}`,
      { headers: notionHeaders(env.NOTION_TOKEN) },
    );
    if (!schemaResponse.ok) {
      throw new Error(`Notion data source lookup failed (${schemaResponse.status})`);
    }
    validateNotionSchema(await schemaResponse.json());
    cachedDataSource = { databaseId: env.NOTION_DATABASE_ID, id: dataSourceId };
    return dataSourceId;
  }

  async function verifyTurnstile(token, secret, remoteIp, hostnames) {
    const body = new FormData();
    body.set("secret", secret);
    body.set("response", token);
    if (remoteIp) body.set("remoteip", remoteIp);
    const response = await fetchImpl(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );
    if (!response.ok) return false;
    const result = await response.json();
    return (
      result.success === true &&
      result.action === "booking" &&
      hostnames.has(result.hostname)
    );
  }

  return async function handle(request, env) {
    const origin = request.headers.get("Origin") ?? "";
    const origins = allowedOrigins(env);
    const corsOrigin = origins.has(origin) ? origin : "";

    if (request.method === "OPTIONS") {
      if (!corsOrigin) return json({ ok: false }, 403, "");
      const response = new Response(null, { status: 204 });
      response.headers.set("Access-Control-Allow-Origin", corsOrigin);
      response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type");
      response.headers.set("Access-Control-Max-Age", "86400");
      response.headers.set("Vary", "Origin");
      return response;
    }

    if (request.method !== "POST") return json({ ok: false }, 405, corsOrigin);
    if (!corsOrigin) return json({ ok: false, message: "Request origin not allowed." }, 403, "");
    if (request.headers.get("Content-Type")?.split(";", 1)[0] !== "application/json") {
      return json({ ok: false, message: "Expected JSON form data." }, 415, corsOrigin);
    }
    if (
      !env.NOTION_TOKEN ||
      !env.NOTION_DATABASE_ID ||
      !env.TURNSTILE_SECRET_KEY ||
      !env.BOOKING_RATE_LIMITER
    ) {
      console.error("Booking Worker is missing required server configuration");
      return json({ ok: false, message: "Booking is temporarily unavailable. Please try again later." }, 503, corsOrigin);
    }

    const remoteIp = request.headers.get("CF-Connecting-IP") ?? "unknown";
    let rateLimit;
    try {
      rateLimit = await env.BOOKING_RATE_LIMITER.limit({ key: remoteIp });
    } catch {
      console.error("Booking rate limiter was unavailable");
      return json({ ok: false, message: "Booking is temporarily unavailable. Please try again later." }, 503, corsOrigin);
    }
    if (!rateLimit.success) {
      return json({ ok: false, message: "Too many attempts. Please wait a minute and try again." }, 429, corsOrigin);
    }

    const contentLength = Number(request.headers.get("Content-Length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return json({ ok: false, message: "The form submission is too large." }, 413, corsOrigin);
    }
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return json({ ok: false, message: "The form submission is too large." }, 413, corsOrigin);
    }

    let raw;
    try {
      raw = JSON.parse(rawBody);
    } catch {
      return json({ ok: false, message: "The form data was not valid." }, 400, corsOrigin);
    }

    const validation = validatePayload(raw);
    if (!validation.ok) return json({ ok: false, message: validation.message }, 400, corsOrigin);
    const values = validation.values;

    // Silently accept honeypot submissions without contacting third parties.
    if (values.website) return json({ ok: true }, 201, corsOrigin);

    let human;
    try {
      human = await verifyTurnstile(
        values.turnstileToken,
        env.TURNSTILE_SECRET_KEY,
        remoteIp,
        allowedTurnstileHostnames(env),
      );
    } catch {
      console.error("Booking security check was unavailable");
      return json({ ok: false, message: "The security check is temporarily unavailable. Please try again." }, 503, corsOrigin);
    }
    if (!human) {
      return json({ ok: false, message: "The security check expired or was not completed. Please try again." }, 400, corsOrigin);
    }

    try {
      const dataSourceId = await resolveDataSourceId(env);
      const bookedAt = now();
      const date = bookedAt.toISOString().slice(0, 10);
      const bookingValues = {
        ...values,
        code: createReference(bookedAt),
      };
      const response = await fetchImpl("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: notionHeaders(env.NOTION_TOKEN),
        body: JSON.stringify(notionPayload(bookingValues, dataSourceId, date)),
      });
      if (!response.ok) throw new Error(`Notion page creation failed (${response.status})`);
      return json({ ok: true }, 201, corsOrigin);
    } catch (error) {
      // Never log form values or Notion response bodies.
      console.error("Booking submission could not be stored", error instanceof Error ? error.message : "unknown error");
      return json(
        {
          ok: false,
          message: "We couldn’t save your request. Please try again, or email rob.myresolve@gmail.com.",
        },
        502,
        corsOrigin,
      );
    }
  };
}

const handle = createBookingHandler();

export default {
  fetch(request, env) {
    return handle(request, env);
  },
};

export { bookingReference, notionPayload, validatePayload };
