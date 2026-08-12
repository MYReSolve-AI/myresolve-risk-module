# MR-ENG-012 — Contact confirmation window and email

## Task brief

- **Task ID:** MR-ENG-012
- **Status:** Approved
- **Owner:** User
- **Builder:** Codex
- **Reviewer:** Claude
- **Desired customer or business outcome:** After a visitor submits the contact
  form successfully, make the result unmistakable on screen and send a concise
  confirmation email so the visitor knows MYReSolve received the request.
- **Why this matters now:** Owner testing showed that the current inline success
  message is too easy to miss and no confirmation email is sent.

### Acceptance criteria

- [x] A successful submission opens an accessible confirmation window.
- [x] The window clearly states whether the confirmation email was sent.
- [x] The visitor can close the window and keyboard focus is handled safely.
- [x] The Worker sends a generic transactional confirmation through Resend only
      after Notion confirms the enquiry was stored.
- [x] Resend receives only the submitter's name and email, the internal booking
      reference, and generic confirmation copy; no operational question,
      assessment data, company details, or optional message is included.
- [x] Email failure does not falsely claim delivery or invite a retry that could
      duplicate a stored enquiry.
- [x] Resend credentials and sender configuration remain encrypted Worker
      secrets and are never committed.
- [x] Focused and full repository checks pass.

### Scope

- **Included:** Contact-form success UI, accessible modal behaviour, Resend API
  integration in the existing booking Worker, tests, environment/runbook
  documentation, and honest privacy wording.
- **Excluded:** Creating a Resend account, purchasing services, changing DNS,
  configuring production secrets, sending test or real emails, deployment,
  Notion changes, contact-form field changes, and outreach.
- **Owned paths:** `apps/web/src/features/contact/BookingForm.tsx`,
  `apps/web/src/features/contact/BookingForm.test.tsx`,
  `apps/web/src/features/contact/ContactPage.module.css`,
  `workers/booking/src/index.mjs`, `workers/booking/src/index.test.mjs`,
  `docs/BOOKING_TO_NOTION.md`, `workers/booking/wrangler.jsonc`, and this task
  record.
- **Shared or sensitive paths:** Cloudflare Worker production configuration,
  Resend account/domain/API key, Notion, DNS, and Vercel are configuration-only
  references and must not be changed in this implementation batch.

### Risk and stop conditions

- **Customer data involved:** Yes — existing name and email are sent to Resend
  solely for the transactional confirmation.
- **Authentication involved:** No
- **Payments or billing involved:** No — stop if Resend requires a purchase or
  billing change.
- **Security or production infrastructure involved:** Yes — code documents new
  encrypted Worker secrets, but does not configure or deploy them.
- **Destructive or difficult-to-reverse action involved:** No
- **Other stop conditions:** Stop before account creation, DNS changes, secret
  configuration, sending email, push, merge, or deployment without explicit
  Owner approval.

### Git isolation

- **Base branch:** `origin/main`
- **Base commit:** `ebb261f`
- **Builder branch:** `ai/codex/MR-ENG-012-contact-confirmation-email`
- **Builder worktree:**
  `/Users/robpierce/Documents/Codex/2026-07-27/ok/work/myresolve-contact-confirmation`
- **Integration plan for shared files:** Builder edits only the owned paths;
  Claude reviews the committed handover read-only from a separate worktree.

### Verification agreement

- **Focused checks:** BookingForm component tests and booking Worker tests.
- **Full review checks:** Repository test, lint and build scripts; diff and
  secrets scan; privacy/data-flow review.
- **Manual or visual evidence required:** Confirmation window rendered after a
  mocked successful submission; no real email or production submission.

### Approval

- **Approved by:** User
- **Approval date:** 2026-08-12
- **Approved scope notes:** “Use Resend for now.” No account, DNS, secret,
  publishing, merge, or deployment approval was granted.

## Builder handover

- **Status:** Ready for review
- **Builder branch:** `ai/codex/MR-ENG-012-contact-confirmation-email`
- **Head commit:** To be recorded after commit
- **Outcome delivered:** Successful contact submissions now open a prominent,
  keyboard-safe confirmation window and the booking Worker sends a generic
  transactional receipt through Resend after Notion confirms storage.
- **Files changed and why:** Contact component, styles and tests add the modal
  and honest email status; Worker code and tests add the minimal Resend flow;
  the runbook documents the new processor, secrets and release sequence; this
  record captures approval and handover.
- **Checks run and results:** 110 web tests pass; 12 Worker tests pass; focused
  BookingForm tests pass; ESLint passes; Worker syntax checks pass;
  `next build --webpack` passes; `git diff --check` clean; no secret values
  found.
- **Checks not run and why:** No live Resend send, Turnstile submission, Notion
  write, preview deployment or production deployment—each requires separate
  Owner approval and production configuration.
- **Manual or visual evidence:** Component tests verify the accessible dialog,
  email-delivery statement, provider-failure warning, close action and focus.
  Live visual verification is deferred to an approved preview because a real
  Turnstile-backed submission was not authorised.
- **Dependencies, migrations, configuration, or environment changes:** No new
  package dependency or database migration. Production requires a verified
  Resend sender domain plus encrypted `RESEND_API_KEY` and
  `RESEND_FROM_EMAIL`; optional `RESEND_REPLY_TO` defaults to Rob's existing
  contact email.
- **Known limitations or residual risks:** If Notion saves but Resend fails, the
  request remains recorded and the modal says the email was not sent. There is
  no automatic retry queue. Delivery still depends on sender-domain reputation
  and recipient email systems.
- **Unresolved decisions:** Approved production sender address and Resend domain
  verification remain Owner configuration decisions.
- **No merge or deployment occurred:** Yes — no push, account creation, DNS,
  secret, Notion, Resend or production change occurred.

## Reviewer report

- **Reviewer:** Claude
- **Reviewed commit or branch:** `f701842` on
  `ai/codex/MR-ENG-012-contact-confirmation-email`
- **Compared with base commit:** `ebb261f`
- **Review method:** Read-only review of the complete `ebb261f..f701842` diff;
  all seven owned files read; Worker tests independently rerun (12/12 pass).
- **Blocking findings:** None.
- **Non-blocking findings:**
  1. The submitted email controls the Resend recipient. Turnstile and the
     per-IP rate limit mitigate abuse; retain a domain-restricted sending-only
     key and monitor bounces.
  2. `NOTION_DATABASE_ID` is labelled as a secret while the identifier appears
     in tests and documentation. Reclassify it as non-secret configuration or
     scrub it in a later bounded maintenance task.
  3. The modal background is not inert or `aria-hidden`; adding inert behaviour
     would further strengthen modal accessibility.
  4. `cleanText` does not strip CR/LF. This is minor hygiene with no current
     email-header injection path.
  5. The per-submission Resend idempotency key prevents retry duplication for
     that booking reference but not deliberate new form submissions; consider
     a client-side duplicate guard if real use shows a problem.
- **Acceptance criteria result:** AC1–AC8 pass.
- **Residual risk:** Low.
- **Recommendation:** Ready for Owner merge decision. Deployment remains a
  separate Owner decision requiring the runbook production steps: verify the
  Resend sender domain, create a domain-restricted sending-only key, configure
  encrypted Worker secrets, then stage and verify the release.

## Owner decision

- **Decision:** Pending review
- **Decision notes:**
- **Merge explicitly approved:** No
- **Deployment explicitly approved:** No
