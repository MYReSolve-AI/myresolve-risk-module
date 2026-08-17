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
- Email authentication is configured, and replies route to `hello@myresolve.uk`.
- Sites version 8 is the current public release and matches the latest `main` commit reviewed on 17 August 2026.
- GitHub has no open pull requests. Thirty-one pull requests have been merged.
- The private post-assessment consultancy pack has been created and remains outside source control.

## Recorded Codex and Claude collaboration

- The two-agent governance and review workflow was established in PR #27.
- Claude built the MYR-001 founding design-partner discovery kit.
- Codex reviewed the kit through the recorded correction rounds before PR #28 was merged.
- Claude performed independent reviews of later sensitive work, including the branded confirmation-email data boundary.
- A MYReSolve LinkedIn brand handover was prepared for Claude.
- The latest outreach material was placed in the Claude coordination task, but a documented final Claude review of that specific outreach pack has not yet been confirmed.

## Outstanding actions — priority order

### 1. Run the founding-partner discovery round

- Privately shortlist three to five suitable leaders.
- Personalise each invitation.
- Obtain Rob's explicit approval for every named recipient and exact message.
- Send nothing until that approval is recorded.
- Conduct 30–35 minute discovery conversations.
- Retain only anonymised, aggregated findings in the repository.
- Complete the approved founding design-partner decision matrix.

### 2. Prepare the first consultancy engagement

Before accepting paid work, agree:

- the initial consultancy package and scope;
- price or pilot fee;
- client deliverables;
- engagement, confidentiality and data-handling boundaries;
- invoicing and payment arrangements;
- pre-call information requirements; and
- the format for recommendations and a 90-day plan.

### 3. Make the evidence-based commercial decision

After completing the discovery round, decide:

- consultancy first, subscription first or a combined starter offer;
- which capabilities are essential for an initial paid offer;
- which two or three data connections would remove the most repeated work; and
- whether the evidence supports Continue, Revise or Stop.

Subscription implementation remains paused until this evidence exists and Rob records a new approval.

### 4. Resolve the remaining dependency advisory

GitHub issue #5 remains open for the tracked PostCSS advisory.

- The current production dependency tree reviewed on 17 August 2026 locks PostCSS `8.4.31` through Next.js `16.2.10`.
- The issue identifies PostCSS `8.5.10` or an otherwise compatible upstream fix as the target.
- Existing exposure was assessed as limited because MYReSolve does not accept user-supplied CSS.
- Recheck and resolve the dependency before the next production release.
- Do not use a forced audit fix or accept a breaking Next.js downgrade.

### 5. Reconcile the project records

Several task files still contain historical pending, unmerged or undeployed wording even though the related changes are now live.

One approved documentation batch should:

- record final merge and deployment status for MR-ENG-006, MR-ENG-008, MR-ENG-009, MR-ENG-010, MR-ENG-012 and MR-UX-001;
- update `ROADMAP.md` to distinguish completed, planned and intentionally paused work;
- record Sites version 8 as the current public release; and
- correct the old MR-ENG-007 note that says the main site still requires sign-in.

### 6. Tidy the local working copy

The existing Codex checkout is on an older branch and contains:

- an outdated uncommitted MR-ENG-007 documentation change;
- generated `.next` and `.pnpm-store` folders; and
- the private, untracked consultancy pack.

Preserve the consultancy pack. Do not delete, overwrite or commit it without Rob's explicit approval. Start future implementation from a fresh branch based on current `main`.

### 7. Monitor email reputation

SPF, DKIM and DMARC are working, and delivery has succeeded. Outlook may still classify early messages as spam because the sending subdomain is new. Continue with low-volume genuine sending and monitor delivery; do not begin bulk outreach.

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

## Claude review requested

Claude should return a read-only review covering:

1. progress from Claude's work that is missing above;
2. factual corrections or status changes;
3. whether the latest outreach pack received a completed Claude review;
4. the recommended next three actions in priority order; and
5. any unresolved risks or decisions Rob should address.

Claude must not edit files, publish content, contact prospective partners, deploy systems or begin implementation without Rob's explicit approval.
