# MYReSolve handover review

**Date:** 17 August 2026  
**Purpose:** Shared Codex/Claude project-status review  
**Mode:** Read-only handover; this document does not authorise implementation, outreach, publication, deployment, billing or customer-data collection.

## Current position

- The public MYReSolve launch is complete at `myresolve.uk` and `www.myresolve.uk`.
- The free assessment and overall self-rated confidence journey are live.
- Organisation Profile and assessment answers remain browser-local.
- The Evidence and Assurance prototype remains excluded from the public product.
- The contact form, Cloudflare Turnstile, booking Worker, Notion tracker and automatic booking references are live.
- The on-screen confirmation and branded confirmation email are live.
- Google Workspace is live as a domain-first Business Standard tenant on
  `myresolve.uk`, with the `rob@myresolve.uk` mailbox active.
- Google MX and SPF are live in Cloudflare; DKIM signing is on through
  `google._domainkey`; root DMARC is active at `p=none` with reports routed to
  `rob@myresolve.uk`.
- The aliases `hello@`, `contact@`, `partners@`, `billing@`, `security@` and
  `privacy@` are live. Replies to `hello@myresolve.uk` reach a real mailbox.
- The branded signature is installed and defaulted; 2FA is enabled, with
  backup codes secured outside the repository. Calendar and profile settings
  use the UK locale and Monday-Friday, 09:00-17:00 working hours.
- The earlier consumer-level Workspace subscription was cancelled and its
  £138.92 closeout fee was waived.
- Gmail, Drive and Calendar connectors now use `rob@myresolve.uk`; Google Drive
  for desktop is installed and syncing.
- The MYReSolve Drive is organised: about 31 repository documents were
  migrated to Google Docs, a duplicate folder was consolidated, and 22 private
  binary assets were transferred into the appropriate private folders.
- Sites version 8 is the current public release and matches the latest `main` commit reviewed on 17 August 2026.
- GitHub has no open pull requests. Thirty-one pull requests have been merged,
  but that does not mean every remote branch is merged or in production.
- Thirty-five remote branches remain. Five contain commits not in `main`:
  `codex/overall-confidence-journey` (+4),
  `codex/founder-image-static-fix` (+3), `platform-v1` (+2),
  `cursor/setup-dev-environment-4bbf` (+1) and
  `agent/codex-cost-governance` (+1). Their intended status must be reconciled
  before claiming that all work is live.
- The private post-assessment consultancy pack has been created and remains outside source control.

## Recorded Codex and Claude collaboration

- The two-agent governance and review workflow was established in PR #27.
- Claude built the MYR-001 founding design-partner discovery kit.
- Codex reviewed the kit through the recorded correction rounds before PR #28 was merged.
- Claude performed independent reviews of later sensitive work, including the branded confirmation-email data boundary.
- A MYReSolve LinkedIn brand handover was prepared for Claude.
- Claude completed the Google Workspace, email-infrastructure and Drive
  workstream described above.
- The latest outreach pack has not received a completed Claude review. Share
  the pack by path or pasted text under the existing read-only and
  approval-gated constraints before treating that review as complete.

## Outstanding actions — priority order

### 1. Run the founding-partner discovery round

- Privately shortlist three to five suitable leaders.
- Personalise each invitation.
- Obtain Rob's explicit approval for every named recipient and exact message.
- Send nothing until that approval is recorded.
- Conduct 30–35 minute discovery conversations.
- Retain only anonymised, aggregated findings in the repository.
- Complete the approved founding design-partner decision matrix.

### 2. Reconcile records, dependency and branches

Complete one approved documentation and repository-hygiene batch that:

- records final merge and deployment status for MR-ENG-006, MR-ENG-008,
  MR-ENG-009, MR-ENG-010, MR-ENG-012 and MR-UX-001;
- updates `ROADMAP.md` to distinguish completed, planned and intentionally
  paused work;
- records Sites version 8 as the current public release;
- corrects the old MR-ENG-007 note that says the main site still requires
  sign-in;
- reviews the five branches containing commits not in `main` and records
  whether each is active, superseded or orphaned; and
- preserves the private consultancy pack and all unrelated local work.

GitHub issue #5 remains open for the tracked PostCSS advisory. Recheck and
resolve it before the next production release when a compatible stable Next.js
release provides PostCSS `8.5.10` or another confirmed fix. Do not use a forced
audit fix or accept a breaking Next.js downgrade. Current exposure remains
limited because MYReSolve does not accept user-supplied CSS.

The existing Codex checkout is on an older branch and contains an outdated
uncommitted MR-ENG-007 documentation change, generated `.next` and
`.pnpm-store` folders, and the private untracked consultancy pack. Preserve the
pack. Do not delete, overwrite or commit it without Rob's explicit approval.
Start future implementation from a fresh branch based on current `main`.

### 3. Prepare the first consultancy engagement

Before accepting paid work, agree:

- the initial consultancy package and scope;
- price or pilot fee;
- client deliverables;
- engagement, confidentiality and data-handling boundaries;
- invoicing and payment arrangements;
- pre-call information requirements; and
- the format for recommendations and a 90-day plan.

### 4. Make the evidence-based commercial decision

After completing the discovery round, decide:

- consultancy first, subscription first or a combined starter offer;
- which capabilities are essential for an initial paid offer;
- which two or three data connections would remove the most repeated work; and
- whether the evidence supports Continue, Revise or Stop.

Subscription implementation remains paused until this evidence exists and Rob records a new approval.

### 5. Monitor email reputation

SPF, DKIM and DMARC are working, and delivery has succeeded. Outlook may still classify early messages as spam because the sending subdomain is new. Continue with low-volume genuine sending and monitor delivery; do not begin bulk outreach.

## Owner decisions and unresolved risks

- The commercial model remains undecided: consultancy-first,
  subscription-first or a combined starter offer. Discovery evidence should
  drive that decision.
- Keep Drive folders containing the consultancy pack, signed NDA, consultancy
  agreement and design-partner tracker owner-only. Confirm the intended
  classification, naming and handling of `anti_terror_target_list.xlsx` before
  it is used or shared.
- Active products and organisations using “myresolve” or “MyResolve,” including
  `myresolve.ai`, create a possible trademark and brand-confusion risk as
  MYReSolve scales. Obtain appropriate advice before making stronger naming or
  exclusivity claims.
- Decide the canonical home for this handover. It currently lives only on
  `codex/founder-image-static-fix`, one of the branches not merged into `main`.

## Intentionally paused — not defects

The following require separate evidence, scope and approval:

- public department-level Evidence and Assurance;
- secure accounts and MFA;
- company workspaces and multi-user access;
- cloud assessment storage;
- subscription checkout and billing;
- KPI evidence integrations;
- saved history and progress comparison;
- board-ready reporting and 90-day action planning; and
- the full privacy, legal, security, backup, deletion and independent-testing gates required before storing paid customer data.

## Claude review completed

Claude completed the requested read-only review on 17 August 2026. Its factual
corrections, completed Workspace and Drive work, outreach-review status,
priority recommendations and unresolved risks are incorporated above.

The review changed no files or external systems and did not publish content,
contact prospective partners, deploy systems or begin implementation.
