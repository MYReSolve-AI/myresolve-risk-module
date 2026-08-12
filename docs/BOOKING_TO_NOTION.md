# Booking form to Notion and Resend confirmation

## Purpose and data boundary

The public Contact page sends only details a visitor types into the booking form. The request contains:

- name
- email
- organisation and role
- company-size band
- biggest operational question
- optional desired tool outcome and message
- an empty honeypot field and a short-lived Turnstile token

The form does not import, read or send Organisation Profile data, assessment answers, scores or dashboard values. Those remain in browser storage on the visitor's device.

After Notion confirms storage, the Worker sends Resend only the visitor's name
and email, a non-identifying booking reference and generic confirmation copy.
The operational question, organisation and role, company-size band, optional
tool outcome and optional message are not included in the email request.

## Architecture

The static MYReSolve site posts directly to the isolated Cloudflare Worker at `https://api.myresolve.uk/booking`. The Worker:

1. permits only the production site origins;
2. applies Cloudflare's per-IP rate limiter;
3. enforces JSON and request-size limits;
4. validates and cleans every approved field;
5. silently discards honeypot submissions;
6. validates the single-use Turnstile token server-side;
7. resolves the Notion data source and validates its property schema;
8. generates a non-identifying internal booking reference for the Notion `Code` field;
9. creates one Notion page;
10. asks Resend to send a generic transactional confirmation using an
    idempotency key based on the internal booking reference; and
11. returns success only after Notion confirms creation, explicitly reporting
    whether the email was sent.

No submitted values are written to Worker logs. A Notion failure returns a retry message and the email contact route; it does not claim that the enquiry was saved.
If Notion succeeds but Resend fails, the response confirms that the request is
stored but does not claim that an email was delivered and does not invite a
retry that could duplicate the enquiry.

## Required configuration

### Notion

1. Create an internal Notion integration with permission to read the tracker schema and insert content.
2. Connect the integration to tracker database `d43affc3cfca4f21aee7b4f71d964d19`.
3. Confirm the tracker has exactly one data source and these properties:

| Property | Notion type |
| --- | --- |
| `Code` | Title |
| `Contact name` | Text |
| `Email` | Email |
| `Segment` | Text |
| `Company size` | Select |
| `Their question` | Text |
| `Outcome they would pay for` | Text |
| `Notes` | Text |
| `Source` | Select |
| `Status` | Select |
| `Booked on` | Date |

Select options must match the approved task brief exactly. The Worker checks the schema before its first write and fails closed if it does not match.

### Cloudflare Worker

Create these encrypted Worker secrets; never place their values in source control:

- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`
- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY` — use a sending-only key restricted to the verified domain
- `RESEND_FROM_EMAIL` — approved sender, for example
  `MYReSolve <hello@myresolve.uk>`

Optional Worker secret:

- `RESEND_REPLY_TO` — defaults to `rob.myresolve@gmail.com`

The Worker configuration defines the `api.myresolve.uk` custom domain, observability and a five-requests-per-minute rate-limit binding. `ALLOWED_ORIGINS` and `TURNSTILE_HOSTNAMES` are optional comma-separated additions for local or preview testing; production origins and hostnames are built in.

The sender domain must be verified in Resend before production recipients can
receive confirmation emails. Creating a Resend account, verifying DNS, adding
secrets and any billing decision require separate Owner approval.

### Public site

Create a Turnstile widget restricted to `myresolve.uk` and `www.myresolve.uk`. Supply its public site key as `NEXT_PUBLIC_TURNSTILE_SITE_KEY` when building the static site. `NEXT_PUBLIC_BOOKING_API_URL` defaults to `https://api.myresolve.uk/booking` and is documented in `apps/web/.env.example`.

The public site key is not a secret. The Turnstile secret, Notion token, Resend
API key and email configuration must exist only in the Worker environment.

## Release sequence

Deployment remains a separate Product Owner decision.

1. Product Owner completes the Notion connection and Turnstile widget.
2. Verify the approved sender domain in Resend and create a sending-only API
   key.
3. Configure Worker secrets and deploy the Worker from `workers/booking`.
4. Verify an invalid Turnstile request is rejected and Worker logs contain no submitted values.
5. Build the site with the public Turnstile key and deploy a review version.
6. Submit one Owner-approved synthetic test enquiry to an approved recipient.
7. Confirm exactly one Notion row, every field mapping, the on-screen
   confirmation window and one delivered confirmation email.
8. Confirm the Resend payload contains only name, email, booking reference and
   generic confirmation copy.
9. In browser network tools, confirm the public request contains only the documented booking keys.
10. Approve production deployment separately.

If the Worker is unavailable or its schema check fails, the form provides the existing direct-email route. There is no automatic email fallback or secondary data store.
