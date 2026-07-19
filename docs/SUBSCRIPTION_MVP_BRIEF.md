# MYReSolve Subscription MVP Brief

**Status:** Approved direction; planning only

**Date:** 2026-07-19

**Baseline:** `main` at `ec3085de6863beb1c901b1836900497d80a2c4f9`

**Implementation status:** Not started

## 1. Purpose

MYReSolve should create an accessible first diagnosis, then give leaders two paid ways to continue:

1. **Use MYReSolve as a subscription** to track performance and lead improvement themselves.
2. **Work with MYReSolve consultants** to interpret the evidence, align the leadership team and build an improvement plan.

The initial assessment creates trust and demonstrates value. The paid value comes from secure continuity, evidence, comparison, collaboration and support.

## 2. Commercial principle

> Free diagnosis. Paid tracking and expert support.

MYReSolve must not hide the first useful result behind a payment screen. The free journey should be valuable enough for a leader to understand the product, but it must not provide the ongoing capabilities required to manage improvement over time.

## 3. Proposed customer offers

### 3.1 Free assessment

The free journey should include:

- Organisation Profile
- one 24-question company health assessment
- Executive Health Score
- Department Risk Overview
- Top Three Risk Areas
- Assessment Confidence
- illustrative Estimated Annual Value at Risk, with the approved qualification
- a clear invitation to subscribe or request expert support

Free results remain a point-in-time diagnosis. They do not include a secure cloud account, multi-device history, multiple users or ongoing KPI tracking.

### 3.2 MYReSolve subscription

The first paid subscription should include:

- a secure customer account
- one company workspace
- secure cloud persistence of Organisation Profile and assessment data
- saved assessment history
- repeat assessments and comparison over time
- KPI evidence tracking using **Current → Acceptable → Target**
- a comparison between leadership judgement and actual KPI evidence
- invited leadership users with controlled access
- dashboard access from approved devices
- downloadable results and progress reports
- subscription, billing and cancellation management

The subscription should help the customer answer:

- Where are we now?
- What level is acceptable?
- What target are we working towards?
- Where do leadership judgement and actual performance disagree?
- What needs attention first?
- Are our actions improving performance?

### 3.3 Consultancy support

Consultancy is a separate paid service and may be purchased with or without a subscription. It should include defined packages such as:

- facilitated leadership assessment
- review and validation of KPI evidence
- leadership alignment workshop
- priority and risk interpretation
- 90-day improvement plan
- ongoing advisory reviews

The product must present consultancy as a helpful next step, not as a condition for understanding the basic assessment result.

## 4. Customer journey

### Self-service route

1. Discover MYReSolve.
2. Complete the free Organisation Profile and assessment.
3. View the basic dashboard and risk areas.
4. Choose **Track your progress**.
5. Create a secure account.
6. Select a subscription and complete payment.
7. Save the current assessment to the company workspace.
8. Add KPI evidence and invite approved colleagues.
9. Reassess and track improvement over time.

### Supported route

1. Complete the free assessment or speak to MYReSolve directly.
2. Choose **Get expert support**.
3. Submit a short, consented enquiry.
4. Agree the appropriate consultancy package.
5. MYReSolve facilitates the assessment, evidence review and improvement plan.
6. The customer may add a subscription for ongoing tracking.

## 5. Subscription value boundary

| Capability | Free | Subscription | Consultancy |
|---|---:|---:|---:|
| One Organisation Profile | Yes | Yes | Yes |
| One assessment and basic dashboard | Yes | Yes | Yes |
| Secure cloud account | No | Yes | Where included |
| Saved history and comparisons | No | Yes | Where included |
| Current, Acceptable and Target KPIs | No | Yes | Facilitated setup |
| Multiple leadership users | No | Yes | Workshop participants |
| Downloadable progress reports | No | Yes | Consultant deliverables |
| Interpretation and 90-day plan | No | Self-service prompts only | Yes |
| Ongoing expert advice | No | Optional add-on | Yes |

This boundary must be validated with prospective customers before final pricing or development scope is fixed.

## 6. Minimum foundations before taking subscription payments

MYReSolve must not sell a software subscription until these foundations are complete:

1. **Authentication:** secure sign-up, sign-in, sign-out, password recovery and account verification.
2. **Organisation tenancy:** customer data separated by company workspace.
3. **Cloud persistence:** server-side storage, backup and recovery for approved customer data.
4. **Access control:** defined Owner, Admin and Member permissions.
5. **Billing:** checkout, recurring payments, invoices, failed-payment handling, plan changes and cancellation.
6. **Entitlements:** paid features available only while the customer has the correct subscription status.
7. **Privacy and legal:** privacy notice, terms, processor records, retention rules, deletion and export processes.
8. **Security operations:** secret management, audit events, monitoring, incident response and dependency maintenance.
9. **Customer support:** a clear route for billing, access and data queries.
10. **Product analytics:** consent-aware measurement of the free-to-paid journey without exposing assessment content.

## 7. Data and security boundaries

The current browser-local data model is suitable for demonstrations, not a paid multi-device subscription.

Company assessments, KPI evidence, financial context and improvement priorities must be classified as **Confidential Company Data**. Names, work email addresses, account identifiers and any information relating to an identifiable person must also be treated as personal data and handled under the applicable data-protection requirements.

### 7.1 Non-negotiable security readiness gate

MYReSolve must not accept production customer data or subscription payments until the Product Owner has received evidence that all of the following controls are implemented and tested:

1. **Data inventory and classification:** every collected field has a purpose, owner, classification, retention period and deletion rule.
2. **Privacy assessment:** data flows, processors, lawful basis and risks are documented; a DPIA is completed where required.
3. **Threat modelling:** account takeover, cross-company access, privilege misuse, data export, payment abuse, API attacks, backup exposure and supplier failure are explicitly assessed.
4. **Strong identity:** verified accounts, secure sessions and MFA for every MYReSolve administrator and every paid customer account with access to company data.
5. **Deny-by-default authorisation:** every server request checks the authenticated user, organisation membership, role and permitted action.
6. **Tenant isolation:** automated tests prove one company cannot read, change, export or delete another company's data, including through APIs, reports, search, logs and backups.
7. **Encryption and key management:** approved managed services encrypt customer data in transit and at rest; secrets and encryption keys are stored and rotated outside application code.
8. **Safe logging:** authentication, authorisation, administration, export, deletion and billing events are recorded without writing assessment answers, KPI values, financial context, tokens or secrets into logs.
9. **Secure development verification:** the application is reviewed against OWASP ASVS Level 2 or an approved equivalent, including authentication, sessions, access control, validation, APIs, data protection and logging.
10. **Vulnerability management:** dependency scanning, secret scanning, code review, security updates and a defined remediation process are operating before launch.
11. **Independent testing:** an appropriately scoped external penetration test is completed after the production architecture is stable and critical or high-risk findings are resolved before customer launch.
12. **Backup and recovery:** encrypted backups, retention, deletion propagation and restoration are tested; recovery objectives and responsible owners are recorded.
13. **Incident response:** detection, containment, investigation, customer communication and legal-notification decisions have named owners, contact routes and a rehearsed runbook.
14. **Supplier assurance:** hosting, identity, database, email, monitoring and payment suppliers are assessed against the data and security requirements before approval.
15. **Environment separation:** production data and secrets are not copied into development, test, support screenshots or AI tools; synthetic data is used outside production.
16. **Controlled administration:** production access is limited, time-bound where practical, reviewed regularly and protected by strong authentication and audit records.
17. **Data lifecycle:** customer export, cancellation, retention expiry and verified deletion are tested end to end, including derived records and backups where technically applicable.

Security approval must be a recorded release decision. A successful product test, production build or payment test does not replace this security gate.

### 7.2 Required design boundaries

The subscription design must:

- keep every organisation's data isolated
- apply least-privilege access
- encrypt data in transit and at rest using the selected managed services
- never place server credentials in browser code
- record important account, access, billing and publishing events
- support customer data export and deletion
- define retention and backup restoration procedures
- avoid collecting unnecessary personal or sensitive information
- keep Sanity limited to approved landing-page content and SEO metadata

Sanity must never become the customer account, assessment, KPI, billing or financial-data store.

### 7.3 Security assurance evidence

The launch record must identify where the following evidence is held:

- current architecture and data-flow diagrams
- data inventory, processor list and privacy assessment
- threat model and security decisions
- role and permission matrix
- tenant-isolation test results
- backup restoration result
- vulnerability and dependency review
- independent penetration-test report and remediation record
- incident-response and breach-assessment runbook
- administrator access review
- launch approval and named security owner

### 7.4 Landing-page trust communication

Security and privacy must be explained in plain language before a customer enters company information.

The current free, browser-local product may use wording such as:

> Your Organisation Profile and assessment answers stay in this browser. MYReSolve does not receive, sell or share this assessment data.

This statement must be revalidated against the implemented product immediately before publication.

The future subscription must not use an absolute promise such as **“all company data is completely secure and never shared.”** No internet service can responsibly guarantee complete security, and approved hosting, identity, email, monitoring and payment suppliers may process limited data to operate the service.

Subscription trust wording must instead explain, accurately and visibly:

- what company and personal data MYReSolve collects
- why each category is needed
- where it is stored and for how long
- that encryption, access controls and company separation protect it
- which approved supplier categories process it to operate the service
- that MYReSolve does not sell customer assessment or KPI data
- when disclosure may be legally required
- how a customer can export or delete its data
- how to contact MYReSolve about privacy or security

The final wording must be reviewed against the live architecture, supplier agreements, privacy notice and legal obligations before it is published. Marketing copy must never claim a control that has not been implemented and verified.

## 8. KPI Evidence Layer relationship

The KPI Evidence Layer is a major reason to subscribe. It must keep two inputs visibly separate:

- **Leadership judgement:** the structured assessment response.
- **Actual evidence:** the KPI's measured current value.

Each selected KPI should support:

- KPI name and definition
- owner
- reporting period
- direction of improvement
- Current value
- Acceptable value or tolerance
- Target value
- source and last-updated date
- evidence confidence or data-quality note

The dashboard may compare judgement and evidence, but must not silently blend them into the existing locked assessment score. Any future combined score requires separate Product Owner approval, documentation and parity testing.

## 9. Billing and pricing principles

Pricing is not approved in this brief. It requires customer interviews and current market research.

The billing design should nevertheless support:

- monthly and annual payment options
- a clearly defined trial or introductory route, if later approved
- transparent renewal dates
- self-service invoice access
- straightforward cancellation
- clear handling of failed payments and expired access
- consultancy invoiced separately from the software subscription unless a defined package says otherwise

The product must not advertise a price, saving, return or business outcome that has not been approved and evidenced.

## 10. Suggested delivery sequence

### Phase A — Validate the offer

- interview prospective customers
- test the free, subscription and consultancy boundaries
- validate which paid capabilities customers value most
- research pricing and payment-provider options
- approve the first subscription package

### Phase B — Secure SaaS foundation

- authentication
- company workspace and tenancy
- cloud database and migration from consented browser-local data
- roles and permissions
- privacy, retention, export and deletion
- operational monitoring

### Phase C — Billing MVP

- pricing page
- checkout
- recurring subscription state
- customer billing portal
- paid-feature entitlements
- cancellation and failed-payment journeys

### Phase D — Paid product value

- saved assessment history
- comparison over time
- KPI Evidence Layer
- multi-user collaboration
- progress reports
- consultancy enquiry and hand-off

### Phase E — Controlled launch

- internal and pilot-customer testing
- security and recovery checks
- support runbook
- conversion and cancellation measurement
- limited paid launch before broader promotion

## 11. MVP acceptance criteria

The subscription MVP is ready to charge customers only when:

- a customer can create and verify an account
- company data is isolated from every other company
- the customer can subscribe, receive confirmation and manage billing
- paid access follows the verified subscription state
- the customer can save and recover assessments across sessions and devices
- the customer can cancel without contacting engineering
- data export and deletion requests have tested processes
- payment failures and expired subscriptions have safe, understandable journeys
- backups and restoration have been tested
- privacy, terms and customer support information are published
- no assessment, KPI or payment data is stored in Sanity
- automated tests, accessibility checks and production build pass

## 12. Explicit exclusions from this brief

This document does not approve:

- implementation of authentication, cloud storage or billing
- a payment provider
- subscription prices or discounts
- changes to assessment questions or scoring formulas
- blending KPI evidence into the locked Health Score or Risk Score
- AI-generated recommendations
- enterprise procurement, regulated-industry or formal audit claims
- migration of existing browser-local data without explicit customer consent

## 13. Decisions required before implementation

The Product Owner must approve:

1. The exact free result and paid-feature boundary.
2. The first target customer and company profile.
3. The first subscription package and whether a trial is offered.
4. Pricing research and willingness-to-pay test approach.
5. Authentication, database, hosting and payment-provider architecture.
6. Initial user roles and maximum users per workspace.
7. Initial KPI library and customer-defined KPI rules.
8. Consultancy packages and enquiry ownership.
9. Data retention, deletion, support and service expectations.
10. The controlled-launch cohort and success measures.

## 14. Security reference baseline

Security design and verification should use the current versions of these sources at implementation time:

- UK Information Commissioner's Office guidance on the UK GDPR security principle and data protection by design and by default
- UK National Cyber Security Centre Cloud Security Principles and SaaS security guidance
- OWASP Application Security Verification Standard, with Level 2 as the proposed minimum verification target for an application holding confidential company and personal data

No subscription implementation should begin until these decisions are reviewed and the first delivery phase is explicitly approved.
