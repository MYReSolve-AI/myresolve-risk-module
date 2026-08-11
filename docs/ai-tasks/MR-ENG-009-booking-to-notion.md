# AI Task Brief and Handover

## Task brief

- **Task ID:** MR-ENG-009
- **Status:** Approved
- **Owner:** Product Owner
- **Builder:** Codex
- **Reviewer:** Product Owner
- **Desired customer or business outcome:** Capture each voluntary contact-form enquiry as exactly one row in the private MYReSolve Notion tracker, without transmitting assessment answers or introducing accounts, billing or broader cloud storage.
- **Why this matters now:** The public assessment now leads visitors to a conversation. Automatic capture removes manual logging and records the opportunity signal while early consultancy work develops.

### Acceptance criteria

- [ ] A valid contact submission creates exactly one correctly mapped Notion row.
- [x] The Notion token and database identifier are read only by a server-side Cloudflare Worker and never enter the browser bundle.
- [x] Only the approved contact fields leave the browser; Organisation Profile and assessment persistence remain untouched and on-device.
- [x] A honeypot, Cloudflare Turnstile server validation and endpoint rate limiting run before the Notion write.
- [x] Required fields, email, exact select options, content type and payload sizes are validated server-side.
- [x] Notion failure returns a clear retry route and never reports a false success; logs contain no submitted personal data.
- [x] `Source` defaults to `Assessment`, `Status` to `New`, and `Booked on` to the UTC submission date.
- [x] Contact-form tests, Worker tests, full web tests, lint and the production Sites build pass.

### Scope

- **Included:** Dedicated booking Worker at `api.myresolve.uk/booking`; `/contact` form; Notion mapping; Turnstile; rate limiting; environment examples; tests and operating documentation.
- **Excluded:** Assessment answers; storage outside the private Notion tracker; email fallback; user accounts; authentication; billing; checkout; assessment, scoring or financial-model changes; deployment or merge without separate approval.
- **Owned paths:** `workers/booking`, Contact-page component and tests, public client environment example, related scripts and documentation.
- **Shared or sensitive paths:** New public endpoint and server secrets. Assessment domain and persistence are read-only and must not be imported by the form or Worker.

### Risk and stop conditions

- **Customer data involved:** Yes — visitor-entered name, email, organisation/role and free text. HTTPS only; minimum fields; private Notion destination; no values in logs.
- **Authentication involved:** No user authentication. Notion and Turnstile credentials remain server-only secrets.
- **Payments or billing involved:** No.
- **Security or production infrastructure involved:** Yes — isolated Cloudflare Worker, custom API hostname, Turnstile, rate-limit binding and runtime secrets.
- **Destructive or difficult-to-reverse action involved:** No. The Worker creates rows only and never updates or deletes tracker content.
- **Other stop conditions:** Stop if implementation would transmit assessment state, expose a secret to the browser, store submissions outside Notion, or add authentication or billing.

### Git isolation

- **Base branch:** `main`
- **Base commit:** `0fc2102e2cc134d8dbe759ad424840d592f15b0f`
- **Builder branch:** `codex/booking-to-notion`
- **Builder worktree:** `/private/tmp/myresolve-booking-to-notion`
- **Integration plan for shared files:** Keep the Worker isolated from the assessment domain and preserve the MR-ENG-008 public-launch behavior.

### Verification agreement

- **Focused checks:** Form payload boundary; valid mapping; exactly one page creation; honeypot, Turnstile, malformed input, rate limit and Notion-failure behavior; absence of server secrets from client code.
- **Full review checks:** Full web tests, Worker tests, lint, source checks and production Sites build.
- **Manual or visual evidence required:** After deployment approval and secret setup, the Product Owner submits one real enquiry, confirms one correctly mapped Notion row, and confirms in browser network tools that no assessment data is sent.

### Approval

- **Approved by:** Product Owner
- **Approval date:** 11 August 2026
- **Approved scope notes:** Use an isolated Cloudflare Worker at `api.myresolve.uk/booking`; report success only after Notion confirms creation; include Turnstile public and secret configuration; include clear privacy wording; validate the Notion schema; do not add email fallback.

## Builder handover

- **Status:** Ready for review
- **Builder branch:** `codex/booking-to-notion`
- **Head commit:** See the current `codex/booking-to-notion` branch head; this handover is included in that commit.
- **Outcome delivered:** A guarded Contact-page booking form and isolated Cloudflare Worker are complete locally. The Worker validates the exact data boundary, applies origin, size, honeypot, rate-limit and Turnstile controls, validates the Notion schema and creates one mapped page only after all checks pass.
- **Files changed and why:** Contact form, styling and tests; isolated Worker, configuration and tests; public and server environment examples; operating documentation; task handover and root scripts.
- **Checks run and results:** Worker syntax and 9/9 tests passed; full web suite passed 109/109; ESLint passed; TypeScript and production Next build passed; Sites package passed; built-client scan found no server-secret names; assessment-persistence import scan passed.
- **Checks not run and why:** A real Notion submission, deployed Turnstile validation, custom API hostname and browser network inspection require Product Owner secrets and separate deployment approval.
- **Manual or visual evidence:** Production static output contains the approved API address and injected public Turnstile key path. No browser visual QA was requested for this implementation batch.
- **Dependencies, migrations, configuration, or environment changes:** No new application packages, D1, R2 or database migrations. Deployment requires `NOTION_TOKEN`, `NOTION_DATABASE_ID` and `TURNSTILE_SECRET_KEY` as Worker secrets, plus the public `NEXT_PUBLIC_TURNSTILE_SITE_KEY` during the web build.
- **Known limitations or residual risks:** The Notion tracker must expose exactly one data source with the documented property schema. Until the real public Turnstile key is supplied, the form intentionally fails closed and retains the direct-email route.
- **Unresolved decisions:** None within the approved implementation scope.
- **No merge or deployment occurred:** Yes

## Reviewer report

- **Reviewer:** Product Owner
- **Reviewed commit or branch:** Pending
- **Compared with base commit:** `0fc2102e2cc134d8dbe759ad424840d592f15b0f`
- **Blocking findings:** Pending
- **Non-blocking findings:** Pending
- **Acceptance criteria result:** Pending
- **Residual risk:** Pending
- **Recommendation:** Pending

## Owner decision

- **Decision:** Pending
- **Decision notes:** Pending
- **Merge explicitly approved:** No
- **Deployment explicitly approved:** No
