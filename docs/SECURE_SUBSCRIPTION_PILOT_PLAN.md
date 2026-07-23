# MYReSolve Secure Subscription Pilot Plan

**Status:** Draft for Product Owner review; planning only

**Date:** 2026-07-23

**Planning baseline:** `main` at `fa97aaeb2076f69771d1bcbdc654617b4d46ca76`

**Implementation status:** Not started

## 1. The plan in simple terms

MYReSolve will keep the first Company Health Assessment free.

The paid subscription will give leaders a secure place to save results, compare progress, add real KPI evidence and work with approved colleagues over time.

Expert support remains optional. Leaders can use the subscription independently, ask MYReSolve for help, or do both.

> Free diagnosis. Paid tracking. Expert support when wanted.

The subscription must save customers time. Its operating principle is:

> Connect once. Refresh automatically. Focus on decisions, not data entry.

This plan does not activate customer accounts, cloud storage or payments.

## 2. What remains free

The free journey continues to provide:

- Organisation Profile
- one 24-question Company Health Assessment
- Executive Health Score
- Department Risk Overview
- Top Three Risk Areas
- assessment confidence
- illustrative Estimated Annual Value at Risk with its qualification
- a choice to register interest or contact MYReSolve

For now, the free preview stays on the user's device. It does not create a secure cloud account.

## 3. What the first subscription should provide

The first paid pilot should be deliberately small:

- secure sign-in with multi-factor authentication
- one private company workspace
- Owner, Admin and Member access levels
- saved Organisation Profile and assessment history
- repeat assessments and progress comparison
- KPI evidence using **Current, Acceptable and Target**
- simple, reusable connections to approved source systems
- automatic KPI refreshes on an agreed schedule
- visible source, last-updated time and data-quality status
- leadership judgement shown separately from actual KPI evidence
- invitations for approved leadership colleagues
- downloadable results and progress reports
- subscription, invoice and cancellation management
- company data export and verified deletion

The existing assessment score must remain unchanged. KPI evidence can add context, but it must not silently alter the locked scoring model.

## 4. The low-effort data principle

The subscription must not require leaders to repeatedly type the same figures into MYReSolve.

MYReSolve is not intended to replace Power BI, Tableau or a customer's existing reporting and data systems. Those tools remain the source of established company reporting. MYReSolve should use the agreed KPI outcomes from them and add a clear leadership view of health, risk, priority and improvement.

The intended experience is:

1. The customer chooses the small number of KPIs that matter most.
2. The customer connects an approved reporting or source system once, such as Power BI, Tableau or the underlying data service.
3. Each source measure is mapped to a MYReSolve KPI once.
4. The customer sets the Acceptable and Target levels.
5. MYReSolve refreshes the Current value automatically.
6. The dashboard clearly shows when the figure was last refreshed and where it came from.
7. The customer reviews exceptions, risks and decisions rather than rebuilding reports.

The preferred connection uses secure, read-only access and collects only the minimum aggregated KPI data MYReSolve needs. It should not copy whole customer systems or collect customer-level and employee-level records when a summary measure is sufficient.

Where practical, MYReSolve should connect to the controlled underlying data source rather than scrape a visual dashboard. The correct method will depend on each customer's existing reporting architecture and permissions.

Where a direct connection is not available, the fallback should still reduce work:

- reusable CSV or spreadsheet mapping
- one-click repeat import using the saved mapping
- clear validation before figures are accepted
- manual entry only as a final fallback

The pilot should begin with a small number of high-value connections chosen from actual customer feedback. MYReSolve should not attempt to connect every possible system in its first release.

The first connectivity review should explicitly assess:

- Power BI
- Tableau
- Microsoft Excel and reusable CSV exports
- the common finance, CRM, service and operational systems sitting behind those reports

## 5. The customer journey

1. A leader completes the free assessment.
2. MYReSolve shows the current health, risks and priorities.
3. The leader chooses **Track your progress**.
4. The leader creates a secure account and verifies their identity.
5. The leader creates or joins their company workspace.
6. The leader reviews what will be moved from the device and gives clear consent.
7. The leader chooses a subscription through hosted payment.
8. The company selects its priority KPIs and connects the relevant source systems.
9. MYReSolve refreshes the Current measures automatically.
10. The company can save assessments, review evidence and invite approved colleagues.
11. The company repeats the assessment and tracks improvement.
12. Expert MYReSolve support remains available as an optional service.

## 6. Recommended technical direction

The recommended pilot direction is subject to final supplier, contract, privacy, security and price checks.

| Service | Simple role | Boundary |
|---|---|---|
| Vercel Pro | Runs the Next.js application and secure server code | No persistent company assessment database |
| Clerk Pro | Sign-in, MFA, invitations and company membership | No assessment, KPI or financial content |
| Supabase Pro, London | Stores company-isolated assessment and KPI data | No card details or public website wording |
| Stripe-hosted Checkout | Takes payment and manages subscription state | No assessment or dashboard content |
| Postmark | Sends minimum necessary service emails | No assessment, KPI, financial or export content |
| Sentry EU | Reports scrubbed technical failures | No company answers, values, tokens or exports |
| Separate encrypted backup | Provides recovery if the main database fails | Restoration is controlled and tested |
| Sanity | Controls approved public wording and SEO | Never stores accounts or company data |

The primary company database should be in London. This does not mean every supplier is UK-only, so international processing and contractual safeguards must be assessed before launch.

## 7. How company data will be protected

These controls are non-negotiable:

1. **One company cannot see another company's data.**
2. **Every paid user uses verified sign-in and MFA.**
3. **The server checks company membership and permission on every protected action.**
4. **The database independently enforces the company boundary.**
5. **Data is encrypted while moving and while stored.**
6. **Payment card details remain with the payment provider.**
7. **Secrets and powerful system credentials never reach the browser.**
8. **Important access, role, export and deletion events are recorded safely.**
9. **Customers can export their approved data and request verified deletion.**
10. **Backups are encrypted and a real restoration is tested before launch.**
11. **Production data is never copied into development, screenshots or AI tools.**
12. **An independent security review is completed before real customer data or payment.**
13. **Data connections are read-only wherever possible, use minimum permissions and can be revoked by the customer.**
14. **Connection credentials and access tokens are encrypted and never exposed to the browser or MYReSolve support staff.**

MYReSolve must not promise that an internet service is completely secure. Customer wording must explain the controls honestly and must never claim a protection that has not been implemented and verified.

## 8. Secure subscription foundation design

### 8.1 The company account

Each paid customer receives one private company workspace.

The workspace is the secure boundary around that company's:

- Organisation Profile
- assessments and answers
- KPI definitions and values
- source-system connections
- progress history
- invited users
- exports and improvement actions

Every workspace has its own permanent internal company identifier. The server applies that identifier to protected company records. The browser must never be trusted to choose or change it.

Every person uses their own verified account. Shared logins are not permitted.

The first verified person who creates the workspace becomes its Owner. Additional people join only through a revocable invitation from an authorised Owner or Admin.

Creating a workspace with a company name is not proof that the person represents that company. During the controlled pilot, MYReSolve must verify the first Owner and company relationship before activating cloud storage. A future self-service journey will need an approved company-verification and duplicate-workspace recovery process.

The pilot subscription covers one company workspace. Support for one person belonging to several companies can be designed later if real customer demand justifies the extra complexity.

### 8.2 Access levels

The first release uses three customer roles:

- **Owner:** controls the company workspace, senior access, billing, export and deletion.
- **Admin:** manages the working service, invited Members, assessments, KPIs and approved data connections.
- **Member:** views the company workspace and contributes to assessments, KPIs and improvement work.

| Action | Owner | Admin | Member | MYReSolve support |
|---|---:|---:|---:|---:|
| View the company dashboard | Yes | Yes | Yes | No |
| Add or update assessments and KPI evidence | Yes | Yes | Yes | No |
| Manage approved data connections | Yes | Yes | No | No |
| Invite or remove Members | Yes | Yes | No | No |
| Appoint or remove Admins | Yes | No | No | No |
| Manage the subscription and invoices | Yes | No | No | No |
| Export all company data | Yes | No | No | No |
| Transfer company ownership | Yes, with identity recheck | No | No | Recovery process only |
| Request complete company deletion | Yes, with identity recheck | No | No | No |

MYReSolve support has no standing access to customer workspace content.

Support may see only the minimum billing status needed to answer a billing query. Card details remain with the payment provider, and support cannot act as the customer to change the subscription.

If support access is ever necessary, it must be:

- requested or approved by the customer
- limited to the minimum information and time required
- visible to the customer
- revocable
- recorded in the security history

The system must require the user to confirm their identity again before ownership transfer, complete export, company deletion, MFA reset or another high-risk account action.

### 8.3 Where protected information lives

| Information | Approved location | Important protection |
|---|---|---|
| Sign-in identity, passwordless factors and MFA | Identity provider | No assessment, KPI or financial content |
| Company membership and roles | Protected company membership record | This is the final authority for access; current membership and role are checked on every protected action |
| Organisation Profile, assessments and answers | Private company database | Every record carries the permanent company identifier and is protected by database company-isolation rules |
| KPI definitions, values, source and refresh status | Private company database | Minimum aggregated values only; source and last-updated time retained |
| Data-connection credentials and tokens | Encrypted server-side secret store | Never returned to the browser, logs or support tools |
| Subscription status and invoice references | MYReSolve database plus payment provider | Card data remains with the payment provider |
| Generated customer exports | Private short-lived storage | Authorised download only; automatic expiry; no public links |
| Security history | Restricted append-only security record | Records who, what, when and company; does not copy assessment answers or KPI values |
| Recovery copies | Separate encrypted backup | Restricted restoration; retention and deletion rules applied |
| Public landing-page wording | Sanity | No account or company information |

Production company data must not be placed in:

- browser analytics
- error messages or monitoring payloads
- development or test environments
- screenshots
- support tickets
- AI tools
- Sanity
- source control

### 8.4 The checks behind every protected action

For every protected page, read, update, export or deletion, the service performs the checks in this order:

1. Confirm that the sign-in session is valid and has not been revoked.
2. Confirm MFA where the account or action requires it.
3. Confirm that the user is an active member of the company workspace.
4. Confirm that the user's role permits the requested action.
5. Apply the company identifier on the trusted server.
6. Let the database independently enforce the same company boundary.
7. Validate the information before saving or returning it.
8. Record the important security event without copying sensitive business content.
9. Return a safe error that does not reveal whether another company's record exists.

The application must deny the action if any check fails.

The identity provider proves who the person is. It does not, by itself, prove which company information they may access. Invitations and identity-provider organisation details must be reconciled with the current protected membership record before access is granted. Old browser state or an old role in a session must never preserve access after a person is removed or downgraded.

### 8.5 Account and data lifecycle

1. **Create:** a verified user creates the private company workspace and becomes Owner.
2. **Invite:** the Owner or Admin sends a short-lived, revocable invitation to a named work email.
3. **Join:** the invited person verifies their identity, sets up MFA and receives the approved role.
4. **Use:** company information is stored only inside that workspace and all access is checked.
5. **Connect:** the Owner or Admin approves a minimum-permission, read-only KPI connection.
6. **Change access:** role and membership changes take effect immediately and are recorded.
7. **Leave:** removing a person revokes their sessions and workspace access without deleting the company's records.
8. **Cancel:** cancelling stops renewal but follows a clearly published access and retention period that must be approved before launch.
9. **Export:** the Owner can create a protected, expiring export after confirming their identity.
10. **Delete:** the Owner can request verified deletion. MYReSolve confirms the scope, deletes live records and applies the published backup-expiry process.

The final cancellation period, backup retention period and deletion timetable remain Product Owner decisions. They must be agreed before real customer data is accepted and described consistently in the service terms and privacy notice.

### 8.6 The first safe build

The first implementation must be a small security proof, not a public subscription launch.

It should contain only:

- verified sign-in and MFA
- one private workspace per invented company
- Owner, Admin and Member roles
- invitations and immediate access removal
- synthetic Organisation Profiles and assessment answers
- company-isolated reads and updates
- a simple security history
- one protected export
- one verified deletion journey
- encrypted backup and tested restoration

The proof must use at least two invented companies and actively attempt to make one company's users access the other company's records.

It passes only when:

- all cross-company access attempts are denied
- all permission tests pass
- removed users lose access immediately
- a user cannot accept another person's invitation
- a user cannot promote themselves or alter their company identifier
- account recovery does not bypass MFA or company checks
- high-risk actions require identity confirmation
- protected content is absent from browser logs, server logs and monitoring
- export contains only the requesting company and its link expires
- deletion and backup restoration behave exactly as documented
- an independent reviewer confirms the evidence

Only after this proof passes should MYReSolve add test-mode billing, automatic KPI connections or any real pilot customer data.

## 9. Safe build order

### Stage 0 — Validate the offer

Do this while external assessment feedback arrives:

- interview prospective customers
- identify three to five possible design partners
- test which subscription benefits matter most
- identify which systems currently hold customers' most important KPIs
- confirm whether Power BI or Tableau is the reporting layer and which controlled source sits behind it
- identify the two or three connections that would remove the most repeated reporting work
- test willingness to pay without publishing a final price
- confirm the free, subscription and consultancy boundaries
- record objections, trust questions and required proof

**Real company cloud data:** No

**Payments:** No

### Stage 1 — Approve the foundation

- recheck supplier capabilities and current prices
- review supplier contracts, locations and sub-processors
- confirm privacy, security and incident owners
- approve the company roles and permissions
- approve retention, export and deletion rules
- complete the threat model and privacy review
- approve a controlled pilot budget

**Real company cloud data:** No

**Payments:** No

### Stage 2 — Prove security with synthetic data

- create separate development, test and production environments
- implement sign-in, MFA and company workspaces
- prove company separation using automated attack-style tests
- test roles, invitations, session expiry and account recovery
- test audit events, backups and restoration
- test data export and deletion
- prove one automatic KPI refresh using synthetic data and a read-only connection
- prove reusable spreadsheet mapping as a safe fallback
- use invented companies and values only

**Real company cloud data:** No

**Payments:** Test mode only

### Stage 3 — Build the subscription journey

- add hosted checkout and subscription status
- add clear plan, renewal, invoice, failure and cancellation journeys
- add customer support routes
- complete privacy notice, service terms and supplier records
- complete independent security testing
- obtain a recorded launch decision

**Real company cloud data:** Only after the security gate

**Payments:** Only after the payment and security gates

### Stage 4 — Run a controlled paid pilot

- invite a small number of approved founding customers
- monitor access, errors, billing and support closely
- monitor failed or stale data refreshes and make them visible to customers
- review security and customer feedback every week
- fix issues before widening access
- confirm that customers use repeat assessment and KPI tracking

### Stage 5 — Expand only when evidence supports it

- refine packages and pricing
- add new data connections only when customer demand supports them
- add stronger reporting and progress views
- add approved benchmark integrations
- consider larger-company permissions and procurement needs
- reassess architecture before enterprise commitments

## 10. Launch gates

No real customer data or subscription payment is accepted until evidence confirms:

- cross-company access tests pass
- MFA and recovery journeys pass
- roles and invitations behave correctly
- export and deletion work as described
- backup restoration succeeds
- no company content appears in logs or monitoring
- source connections use minimum read-only permissions and can be revoked
- failed or stale refreshes are visible and never presented as current data
- imported values retain their source and last-updated time
- hosted payment events are verified and replay-safe
- privacy wording matches the live system
- supplier agreements and data locations are recorded
- incident response has named owners and tested contacts
- independent security findings are resolved or formally accepted
- the Product Owner records a clear launch approval

## 11. Commercial decisions still required

Customer feedback should inform:

1. the first paid package and its clearest outcome
2. monthly, annual or founding-customer payment choices
3. whether a time-limited trial is useful
4. how many leadership users are included
5. which reports and KPI features are essential at launch
6. the cancellation and post-cancellation data period
7. the level and pricing of optional expert support
8. the first two or three source-system connections customers value most
9. the acceptable automatic refresh frequency for each KPI type

No price, saving or financial outcome should be advertised until it is approved and supported by evidence.

## 12. Immediate actions

1. Send the live free assessment to external reviewers.
2. Record feedback against free, subscription, consultancy and trust.
3. Ask reviewers which systems contain the figures they repeatedly rebuild for leadership reporting.
4. Identify three to five possible founding design partners.
5. Rank the first two or three high-value data connections.
6. Review and approve the architecture recommendation.
7. Recheck supplier costs and contractual data locations.
8. Name the security, privacy and incident owners.
9. Approve the budget for a synthetic-data security and connectivity proof.

## 13. Explicitly not started

This plan does not:

- create supplier production accounts
- install authentication or billing
- move browser-local data into the cloud
- collect real company data
- take a subscription payment
- connect to a real customer system
- publish prices or security guarantees
- change assessment scoring

## 14. Detailed references

- [`docs/SUBSCRIPTION_MVP_BRIEF.md`](./SUBSCRIPTION_MVP_BRIEF.md)
- [`docs/SECURITY_DATA_BLUEPRINT.md`](./SECURITY_DATA_BLUEPRINT.md)
- [`docs/SUBSCRIPTION_ARCHITECTURE_OPTIONS.md`](./SUBSCRIPTION_ARCHITECTURE_OPTIONS.md)
- [`docs/ADR_SANITY_LANDING_CONTENT.md`](./ADR_SANITY_LANDING_CONTENT.md)
