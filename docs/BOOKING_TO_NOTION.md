# Booking form to Notion

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
9. creates one Notion page; and
10. returns success only after Notion confirms creation.

No submitted values are written to Worker logs. A Notion failure returns a retry message and the email contact route; it does not claim that the enquiry was saved.

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

The Worker configuration defines the `api.myresolve.uk` custom domain, observability and a five-requests-per-minute rate-limit binding. `ALLOWED_ORIGINS` and `TURNSTILE_HOSTNAMES` are optional comma-separated additions for local or preview testing; production origins and hostnames are built in.

### Public site

Create a Turnstile widget restricted to `myresolve.uk` and `www.myresolve.uk`. Supply its public site key as `NEXT_PUBLIC_TURNSTILE_SITE_KEY` when building the static site. `NEXT_PUBLIC_BOOKING_API_URL` defaults to `https://api.myresolve.uk/booking` and is documented in `apps/web/.env.example`.

The public site key is not a secret. The Turnstile secret and Notion token must exist only in the Worker environment.

## Release sequence

Deployment remains a separate Product Owner decision.

1. Product Owner completes the Notion connection and Turnstile widget.
2. Configure Worker secrets and deploy the Worker from `workers/booking`.
3. Verify an invalid Turnstile request is rejected and Worker logs contain no submitted values.
4. Build the site with the public Turnstile key and deploy a review version.
5. Submit one synthetic test enquiry.
6. Confirm exactly one Notion row and every field mapping.
7. In browser network tools, confirm the request contains only the documented booking keys.
8. Approve production deployment separately.

If the Worker is unavailable or its schema check fails, the form provides the existing direct-email route. There is no automatic email fallback or secondary data store.
