const NOTION_VERSION = "2026-03-11";
const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const OWNER_NOTIFICATION_EMAIL = "hello@myresolve.uk";
const MAX_BODY_BYTES = 12_000;
const BOOKING_UNAVAILABLE_MESSAGE =
  "Booking is temporarily unavailable. Please try again later.";

// MYR-KPIS-PAGE: the free companion PDF given away at /kpis. The file ships
// with the static site, so the Worker fetches it from the site origin at send
// time rather than carrying a copy of its own. Copy approved in the task brief.
const KPI_PDF_FILENAME = "MYReSolve-The-Twenty-Numbers.pdf";
const KPI_PDF_PATH = `/downloads/${KPI_PDF_FILENAME}`;
const DEFAULT_SITE_ORIGIN = "https://myresolve.uk";
const KPI_SOURCE = "KPI download";
const KPI_SEGMENT = "Twenty numbers download";
const KPI_QUESTION = "Requested The twenty numbers PDF";
const KPI_SUCCESS_MESSAGE =
  "Sent. Check your inbox for The twenty numbers. If it is not there in a few minutes, look in spam or email hello@myresolve.uk.";
const KPI_FAILURE_MESSAGE =
  "Something went wrong. Email hello@myresolve.uk and we will send it by hand.";
const KPI_FIELD_LIMITS = {
  name: 100,
  email: 254,
  website: 200,
};
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

function bookingReference(date, uuid = crypto.randomUUID(), prefix = "MYR") {
  const day = date.toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = uuid.replaceAll("-", "").slice(0, 8).toUpperCase();
  return `${prefix}-${day}-${suffix}`;
}

function kpiReference(date, uuid) {
  return bookingReference(date, uuid, "MYR-KPI");
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

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function confirmationEmail({ name, email }, reference, env) {
  const safeName = escapeHtml(name);
  const safeReference = escapeHtml(reference);
  return {
    from: env.RESEND_FROM_EMAIL,
    to: [email],
    reply_to: env.RESEND_REPLY_TO || "hello@myresolve.uk",
    subject: "We’ve received your MYReSolve conversation request",
    text: `Hi ${name},\n\nThank you for contacting MYReSolve. Your request has been received and Rob will review it before getting in touch.\n\nReference: ${reference}\n\nPlease do not reply with confidential assessment, financial or company information.\n\nBest,\nMYReSolve`,
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MYReSolve conversation request received</title>
  </head>
  <body style="margin:0;padding:0;background:#f7f3ec;color:#1e2825;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">Your MYReSolve conversation request has been received.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f7f3ec;border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#fffcf7;border:1px solid #ddc9a7;border-collapse:separate;border-spacing:0;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px;background:#173f35;border-bottom:4px solid #c68b35;">
                <p style="margin:0;color:#fffcf7;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;font-weight:700;letter-spacing:0.2px;">MYReSolve</p>
                <p style="margin:8px 0 0;color:#f7f3ec;font-size:14px;line-height:1.5;">Conversation request received</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 20px;font-size:16px;line-height:1.6;">Hi ${safeName},</p>
                <h1 style="margin:0 0 16px;color:#0f2e27;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.25;font-weight:700;">Your request has been received</h1>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.6;">Thank you for contacting MYReSolve. Your request has been received and Rob will review it before getting in touch.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f7f3ec;border-left:4px solid #c68b35;border-collapse:separate;">
                  <tr>
                    <td style="padding:16px 18px;">
                      <p style="margin:0 0 4px;color:#66716d;font-size:12px;line-height:1.4;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;">Booking reference</p>
                      <p style="margin:0;color:#173f35;font-family:'Courier New',Courier,monospace;font-size:16px;line-height:1.5;font-weight:700;">${safeReference}</p>
                    </td>
                  </tr>
                </table>
                <p style="margin:24px 0 0;padding-top:20px;border-top:1px solid #ddc9a7;color:#66716d;font-size:14px;line-height:1.6;">Please do not reply with confidential assessment, financial or company information.</p>
                <p style="margin:24px 0 0;color:#1e2825;font-size:16px;line-height:1.6;">Best,<br><strong style="color:#173f35;">MYReSolve</strong></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };
}

// cleanText() strips most control characters but deliberately leaves newlines
// and tabs intact for the free-text fields. A name carrying one of those must
// not reach an email header, so collapse it to a single line here.
function singleLine(value) {
  return String(value).replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim();
}

function ownerNotificationEmail(values, reference, notionPageUrl, env) {
  const optional = (value) => (value ? value : "(not answered)");
  const text = [
    "A new enquiry has been submitted through the MYReSolve contact form.",
    "",
    `Reference:     ${reference}`,
    `Name:          ${values.name}`,
    `Email:         ${values.email}`,
    `Organisation:  ${values.organisationRole}`,
    `Company size:  ${values.companySize}`,
    "",
    "Biggest operational question:",
    values.question,
    "",
    "One thing a tool could fix:",
    optional(values.toolFix),
    "",
    "Anything else:",
    optional(values.message),
    "",
    `Notion page:   ${notionPageUrl || "(link unavailable - open the enquiry tracker)"}`,
    "",
    `Reply to this email to respond directly to ${values.email}.`,
  ].join("\n");

  return {
    from: env.RESEND_FROM_EMAIL,
    to: [OWNER_NOTIFICATION_EMAIL],
    reply_to: values.email,
    subject: `New enquiry: ${singleLine(values.name)} - ${singleLine(values.companySize)}`,
    text,
  };
}

// Shared Notion lookup: resolves the tracker's single data source and checks
// its schema before any page is written. Each handler keeps its own cache and
// its own list of Source options, so the enquiry endpoint keeps working even
// while a newer option is still being added to the tracker.
function createNotionResolver(fetchImpl, requiredSourceOptions) {
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
      Source: requiredSourceOptions,
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

  return async function resolveDataSourceId(env) {
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
  };
}

// Everything both endpoints do before they look at the form: CORS, method and
// content-type checks, the server-configuration guard, the shared per-IP rate
// limiter and the body-size cap. Returns either a finished Response or the
// parsed JSON body with the CORS origin and client IP the handler needs.
async function readSubmission(request, env, { requiredEnv, unavailableMessage }) {
  const origin = request.headers.get("Origin") ?? "";
  const origins = allowedOrigins(env);
  const corsOrigin = origins.has(origin) ? origin : "";

  if (request.method === "OPTIONS") {
    if (!corsOrigin) return { response: json({ ok: false }, 403, "") };
    const response = new Response(null, { status: 204 });
    response.headers.set("Access-Control-Allow-Origin", corsOrigin);
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    response.headers.set("Access-Control-Max-Age", "86400");
    response.headers.set("Vary", "Origin");
    return { response };
  }

  if (request.method !== "POST") return { response: json({ ok: false }, 405, corsOrigin) };
  if (!corsOrigin) {
    return { response: json({ ok: false, message: "Request origin not allowed." }, 403, "") };
  }
  if (request.headers.get("Content-Type")?.split(";", 1)[0] !== "application/json") {
    return { response: json({ ok: false, message: "Expected JSON form data." }, 415, corsOrigin) };
  }
  if (requiredEnv.some((key) => !env[key])) {
    console.error("Booking Worker is missing required server configuration");
    return { response: json({ ok: false, message: unavailableMessage }, 503, corsOrigin) };
  }

  const remoteIp = request.headers.get("CF-Connecting-IP") ?? "unknown";
  let rateLimit;
  try {
    rateLimit = await env.BOOKING_RATE_LIMITER.limit({ key: remoteIp });
  } catch {
    console.error("Booking rate limiter was unavailable");
    return { response: json({ ok: false, message: unavailableMessage }, 503, corsOrigin) };
  }
  if (!rateLimit.success) {
    return {
      response: json(
        { ok: false, message: "Too many attempts. Please wait a minute and try again." },
        429,
        corsOrigin,
      ),
    };
  }

  const contentLength = Number(request.headers.get("Content-Length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return { response: json({ ok: false, message: "The form submission is too large." }, 413, corsOrigin) };
  }
  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return { response: json({ ok: false, message: "The form submission is too large." }, 413, corsOrigin) };
  }

  let raw;
  try {
    raw = JSON.parse(rawBody);
  } catch {
    return { response: json({ ok: false, message: "The form data was not valid." }, 400, corsOrigin) };
  }

  return { corsOrigin, remoteIp, raw };
}

// --- MYR-KPIS-PAGE: the /kpis endpoint --------------------------------------

function validateKpiPayload(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, message: "The form data was not valid." };
  }

  const values = {};
  for (const [field, limit] of Object.entries(KPI_FIELD_LIMITS)) {
    const cleaned = cleanText(raw[field] ?? "");
    if (cleaned === null || cleaned.length > limit) {
      return { ok: false, message: "One or more fields are too long or invalid." };
    }
    values[field] = cleaned;
  }
  // The name is optional but it reaches an email subject line and a Notion
  // title-style field, so it is always a single line.
  values.name = singleLine(values.name);

  const interest = raw.subscriptionInterest ?? false;
  if (typeof interest !== "boolean") {
    return { ok: false, message: "The form data was not valid." };
  }
  values.subscriptionInterest = interest;

  if (!values.email) {
    return { ok: false, message: "Please enter your work email." };
  }
  if (!EMAIL_PATTERN.test(values.email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  return { ok: true, values };
}

function kpiNotionPayload(values, dataSourceId, date) {
  const interest = values.subscriptionInterest;
  return {
    parent: { type: "data_source_id", data_source_id: dataSourceId },
    properties: {
      Code: { title: [{ type: "text", text: { content: values.code } }] },
      "Contact name": notionText(values.name || values.email),
      Email: { email: values.email },
      Segment: notionText(
        interest ? `${KPI_SEGMENT} · subscription interest` : KPI_SEGMENT,
      ),
      "Their question": notionText(
        interest
          ? `${KPI_QUESTION} and asked to hear about the subscription`
          : KPI_QUESTION,
      ),
      Source: { select: { name: KPI_SOURCE } },
      Status: { select: { name: "New" } },
      "Booked on": { date: { start: date } },
    },
  };
}

// Workers have no Buffer without nodejs_compat; btoa on a binary string is
// the portable route. Chunked so a large file never hits the argument limit.
function base64FromBytes(bytes) {
  let binary = "";
  const chunk = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunk) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunk));
  }
  return btoa(binary);
}

// Two lines in Rob's voice, approved verbatim in the task brief, plus the PDF.
// The visitor's name is deliberately not used: the note reads the same for
// everyone and nothing they typed is echoed back into an email.
function kpiDeliveryEmail({ email }, pdfBase64, env) {
  return {
    from: env.RESEND_FROM_EMAIL,
    to: [email],
    reply_to: OWNER_NOTIFICATION_EMAIL,
    subject: "The twenty numbers, from MYReSolve",
    text: `Here is The twenty numbers. Pick three, put them on the wall and in front of the board on the same day, and add the next one next month.\n\nIf you would rather see what your operation shows today, the Structured Executive Assessment is free at myresolve.uk/organisation-profile.\n\nRob`,
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>The twenty numbers, from MYReSolve</title>
  </head>
  <body style="margin:0;padding:0;background:#f7f3ec;color:#1e2825;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">The twenty numbers is attached.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f7f3ec;border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#fffcf7;border:1px solid #ddc9a7;border-collapse:separate;border-spacing:0;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px;background:#173f35;border-bottom:4px solid #c68b35;">
                <p style="margin:0;color:#fffcf7;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;font-weight:700;letter-spacing:0.2px;">MYReSolve</p>
                <p style="margin:8px 0 0;color:#f7f3ec;font-size:14px;line-height:1.5;">Operating Playbook &middot; Companion</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 16px;color:#0f2e27;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.25;font-weight:700;">The twenty numbers</h1>
                <p style="margin:0 0 20px;font-size:16px;line-height:1.6;">Here is The twenty numbers. Pick three, put them on the wall and in front of the board on the same day, and add the next one next month.</p>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.6;">If you would rather see what your operation shows today, the Structured Executive Assessment is free at <a href="https://myresolve.uk/organisation-profile" style="color:#173f35;font-weight:700;">myresolve.uk/organisation-profile</a>.</p>
                <p style="margin:0;color:#1e2825;font-size:16px;line-height:1.6;">Rob</p>
                <p style="margin:24px 0 0;padding-top:20px;border-top:1px solid #ddc9a7;color:#66716d;font-size:14px;line-height:1.6;">The PDF is attached to this email. Reply to reach MYReSolve at hello@myresolve.uk.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    attachments: [{ filename: KPI_PDF_FILENAME, content: pdfBase64 }],
  };
}

function kpiOwnerNotificationEmail(values, reference, notionPageUrl, trackerStored, env) {
  const interest = values.subscriptionInterest;
  const text = [
    "Someone has requested The twenty numbers PDF through myresolve.uk/kpis.",
    "",
    `Reference:     ${reference}`,
    `Name:          ${values.name || "(not given)"}`,
    `Email:         ${values.email}`,
    `Subscription:  ${interest ? "asked to hear about the subscription" : "not ticked"}`,
    "",
    trackerStored
      ? `Notion page:   ${notionPageUrl || "(link unavailable - open the consultation tracker)"}`
      : "Notion page:   NOT CREATED - the tracker row failed, please add it by hand.",
    "",
    `Reply to this email to respond directly to ${values.email}.`,
  ].join("\n");

  return {
    from: env.RESEND_FROM_EMAIL,
    to: [OWNER_NOTIFICATION_EMAIL],
    reply_to: values.email,
    subject: `KPI download: ${singleLine(values.email)}${interest ? " (subscription interest)" : ""}`,
    text,
  };
}

export function createBookingHandler({
  fetchImpl = fetch,
  now = () => new Date(),
  createReference = bookingReference,
} = {}) {
  const resolveDataSourceId = createNotionResolver(fetchImpl, [
    "Assessment",
    "Referral",
    "Outreach",
    "Other",
  ]);

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
    const submission = await readSubmission(request, env, {
      requiredEnv: [
        "NOTION_TOKEN",
        "NOTION_DATABASE_ID",
        "TURNSTILE_SECRET_KEY",
        "RESEND_API_KEY",
        "RESEND_FROM_EMAIL",
        "BOOKING_RATE_LIMITER",
      ],
      unavailableMessage: BOOKING_UNAVAILABLE_MESSAGE,
    });
    if (submission.response) return submission.response;
    const { corsOrigin, remoteIp, raw } = submission;

    const validation = validatePayload(raw);
    if (!validation.ok) return json({ ok: false, message: validation.message }, 400, corsOrigin);
    const values = validation.values;

    // Silently accept honeypot submissions without contacting third parties.
    if (values.website) {
      return json({ ok: true, emailSent: true }, 201, corsOrigin);
    }

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

    let bookingValues;
    let notionPageUrl = "";
    try {
      const dataSourceId = await resolveDataSourceId(env);
      const bookedAt = now();
      const date = bookedAt.toISOString().slice(0, 10);
      bookingValues = {
        ...values,
        code: createReference(bookedAt),
      };
      const response = await fetchImpl("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: notionHeaders(env.NOTION_TOKEN),
        body: JSON.stringify(notionPayload(bookingValues, dataSourceId, date)),
      });
      if (!response.ok) throw new Error(`Notion page creation failed (${response.status})`);
      // Only the page URL is read, so the owner notification can link to it.
      // A malformed body must not fail an enquiry that is already stored.
      const page = await response.json().catch(() => null);
      if (typeof page?.url === "string") notionPageUrl = page.url;
    } catch (error) {
      // Never log form values or Notion response bodies.
      console.error("Booking submission could not be stored", error instanceof Error ? error.message : "unknown error");
      return json(
        {
          ok: false,
          message: "We couldn’t save your request. Please try again, or email hello@myresolve.uk.",
        },
        502,
        corsOrigin,
      );
    }

    // Owner notification. The enquiry is already stored, so this must never
    // change the visitor's outcome: any failure is logged and swallowed, and
    // it does not affect the emailSent flag, which describes the visitor's
    // confirmation only.
    try {
      const ownerResponse = await fetchImpl(RESEND_EMAILS_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `booking-owner-notification/${bookingValues.code}`,
          "User-Agent": "MYReSolve-Booking/1.0",
        },
        body: JSON.stringify(
          ownerNotificationEmail(values, bookingValues.code, notionPageUrl, env),
        ),
      });
      if (!ownerResponse.ok) {
        throw new Error(`Resend API returned ${ownerResponse.status}`);
      }
    } catch (error) {
      // Never log form values or recipient details.
      console.error(
        "Booking owner notification could not be sent",
        error instanceof Error ? error.message : "unknown error",
      );
    }

    try {
      const emailResponse = await fetchImpl(RESEND_EMAILS_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `booking-confirmation/${bookingValues.code}`,
          "User-Agent": "MYReSolve-Booking/1.0",
        },
        body: JSON.stringify(
          confirmationEmail(
            { name: values.name, email: values.email },
            bookingValues.code,
            env,
          ),
        ),
      });
      if (!emailResponse.ok) {
        throw new Error(`Resend API returned ${emailResponse.status}`);
      }
      return json(
        {
          ok: true,
          emailSent: true,
          message: "Thank you. Your request has been received and Rob will be in touch.",
        },
        201,
        corsOrigin,
      );
    } catch (error) {
      // The enquiry is already safely stored. Do not tell the visitor to retry
      // and risk creating a duplicate. Never log recipient or form values.
      console.error(
        "Booking confirmation email could not be sent",
        error instanceof Error ? error.message : "unknown error",
      );
      return json(
        {
          ok: true,
          emailSent: false,
          message: "Thank you. Your request has been received and Rob will be in touch.",
        },
        201,
        corsOrigin,
      );
    }
  };
}

export function createKpiHandler({
  fetchImpl = fetch,
  now = () => new Date(),
  createReference = kpiReference,
} = {}) {
  const resolveDataSourceId = createNotionResolver(fetchImpl, [KPI_SOURCE]);

  async function loadPdf(env) {
    const url = `${env.SITE_ORIGIN || DEFAULT_SITE_ORIGIN}${KPI_PDF_PATH}`;
    const response = await fetchImpl(url);
    if (!response.ok) throw new Error(`PDF fetch failed (${response.status})`);
    // The site Worker answers unknown paths with the 404 page and a 200, so
    // the content type is the only reliable sign the file itself came back.
    const type = response.headers.get("Content-Type") ?? "";
    if (!type.startsWith("application/pdf")) {
      throw new Error("PDF fetch returned something that is not a PDF");
    }
    return base64FromBytes(new Uint8Array(await response.arrayBuffer()));
  }

  function resendHeaders(env, idempotencyKey) {
    return {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
      "User-Agent": "MYReSolve-Booking/1.0",
    };
  }

  return async function handle(request, env) {
    const submission = await readSubmission(request, env, {
      requiredEnv: [
        "NOTION_TOKEN",
        "NOTION_DATABASE_ID",
        "RESEND_API_KEY",
        "RESEND_FROM_EMAIL",
        "BOOKING_RATE_LIMITER",
      ],
      unavailableMessage: KPI_FAILURE_MESSAGE,
    });
    if (submission.response) return submission.response;
    const { corsOrigin, raw } = submission;

    const validation = validateKpiPayload(raw);
    if (!validation.ok) return json({ ok: false, message: validation.message }, 400, corsOrigin);
    const values = validation.values;

    // Silently accept honeypot submissions without contacting third parties.
    if (values.website) {
      return json({ ok: true, emailSent: true, message: KPI_SUCCESS_MESSAGE }, 201, corsOrigin);
    }

    // Fail closed before anything is sent: the tracker must be reachable and
    // carry the "KPI download" Source option, and the PDF must be fetchable.
    // Otherwise the visitor gets the by-hand message and nothing goes out.
    let dataSourceId;
    let pdfBase64;
    try {
      dataSourceId = await resolveDataSourceId(env);
      pdfBase64 = await loadPdf(env);
    } catch (error) {
      // Never log form values or response bodies.
      console.error("KPI download could not be prepared", error instanceof Error ? error.message : "unknown error");
      return json({ ok: false, message: KPI_FAILURE_MESSAGE }, 502, corsOrigin);
    }

    const bookedAt = now();
    const date = bookedAt.toISOString().slice(0, 10);
    const code = createReference(bookedAt);

    // 1. The PDF to the visitor. This is the outcome the page promises, so a
    //    failure here is the visitor's failure state and stops everything else.
    try {
      const deliveryResponse = await fetchImpl(RESEND_EMAILS_URL, {
        method: "POST",
        headers: resendHeaders(env, `kpi-delivery/${code}`),
        body: JSON.stringify(kpiDeliveryEmail({ email: values.email }, pdfBase64, env)),
      });
      if (!deliveryResponse.ok) {
        throw new Error(`Resend API returned ${deliveryResponse.status}`);
      }
    } catch (error) {
      // Never log recipient details.
      console.error("KPI download email could not be sent", error instanceof Error ? error.message : "unknown error");
      return json({ ok: false, message: KPI_FAILURE_MESSAGE }, 502, corsOrigin);
    }

    // 2. The tracker row. The PDF has gone, so this must never change the
    //    visitor's outcome; the owner alert says when it fails.
    let notionPageUrl = "";
    let trackerStored = false;
    try {
      const response = await fetchImpl("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: notionHeaders(env.NOTION_TOKEN),
        body: JSON.stringify(kpiNotionPayload({ ...values, code }, dataSourceId, date)),
      });
      if (!response.ok) throw new Error(`Notion page creation failed (${response.status})`);
      trackerStored = true;
      const page = await response.json().catch(() => null);
      if (typeof page?.url === "string") notionPageUrl = page.url;
    } catch (error) {
      console.error("KPI download could not be stored", error instanceof Error ? error.message : "unknown error");
    }

    // 3. The owner alert. Logged and swallowed on failure, as for enquiries.
    try {
      const ownerResponse = await fetchImpl(RESEND_EMAILS_URL, {
        method: "POST",
        headers: resendHeaders(env, `kpi-owner-notification/${code}`),
        body: JSON.stringify(
          kpiOwnerNotificationEmail(values, code, notionPageUrl, trackerStored, env),
        ),
      });
      if (!ownerResponse.ok) {
        throw new Error(`Resend API returned ${ownerResponse.status}`);
      }
    } catch (error) {
      console.error("KPI download owner notification could not be sent", error instanceof Error ? error.message : "unknown error");
    }

    return json({ ok: true, emailSent: true, message: KPI_SUCCESS_MESSAGE }, 201, corsOrigin);
  };
}

// The Worker answers on one custom domain. /kpis is the companion PDF
// give-away; every other path is the enquiry endpoint, as it always was.
export function routeRequest(request, handlers) {
  const { pathname } = new URL(request.url);
  return pathname === "/kpis" ? handlers.kpi : handlers.booking;
}

const handlers = {
  booking: createBookingHandler(),
  kpi: createKpiHandler(),
};

export default {
  fetch(request, env) {
    return routeRequest(request, handlers)(request, env);
  },
};

export {
  bookingReference,
  confirmationEmail,
  kpiDeliveryEmail,
  kpiNotionPayload,
  kpiOwnerNotificationEmail,
  kpiReference,
  notionPayload,
  ownerNotificationEmail,
  validateKpiPayload,
  validatePayload,
};
