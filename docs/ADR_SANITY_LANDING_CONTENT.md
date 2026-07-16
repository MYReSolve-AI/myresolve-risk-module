# ADR: Sanity Growth for Landing Page Content Management (MYReSolve)

- **Status:** Proposed (planning only)
- **Date:** 2026-07-16
- **Decision owners:** Product Owner, Engineering Lead
- **Scope:** MYReSolve landing page (`/`) only

---

## 1. Decision

MYReSolve will use **Sanity Growth** for managing **landing-page wording and SEO metadata only**.

This ADR is **planning-only** and does not implement Sanity integration, Studio UI, or any application changes.

---

## 2. Approved baseline for future implementation

The future implementation baseline is the approved `main` commit:

**`d5782acb9d75da8464fc232e3be7c05560e77b49`**

---

## 3. Context

The business needs an ability for authorised users to change approved landing-page wording and SEO metadata without changing code, while keeping the MYReSolve application and customer data protected.

Landing Page V2 is approved. Future copy updates must not alter:

- application logic
- assessment, scoring, dashboard calculations
- organisation profile data handling
- CTA destinations, route names, navigation behaviour
- protected privacy/financial/legal wording

---

## 4. Approved platform and governance

### 4.1 Platform

- Selected content-management platform: **Sanity Growth**

### 4.2 Role mapping (approved)

- **Owner → Sanity Administrator**
- **Editor → Sanity Contributor**
  - Editor can draft.
  - Editor cannot publish.
- **Publisher → Sanity Editor**
  - Publisher can review and publish.

### 4.3 Approval gate: procedure vs technical gate

Sanity Growth supports role separation for who can draft and who can publish. However, the **approval checklist** is an **operating procedure** (what Publisher reviews before publishing), not a **technically enforced** automated gate at the application delivery layer.

More strongly enforced automated workflows would require an **Enterprise** upgrade.

### 4.4 MFA (approved)

- Every CMS user must protect their identity account with **MFA**.

### 4.5 History and audit trail realism (approved)

Sanity Growth provides **90-day content history and activity records**, not a permanent long-term audit trail.

To support long-term publication governance, an external lightweight publishing register will record each publish event (see §10).

---

## 5. Content boundaries (hard constraints)

### 5.1 CMS-controlled content

Sanity controls landing-page copy and SEO metadata only.

### 5.2 CMS must never contain

Sanity must never contain:

- assessment answers
- Organisation Profile data
- customer financial information
- scoring formulas
- application authentication data

---

## 6. Delivery architecture (read-only, protected)

The application will deliver published landing content using **server-side only** reads:

1. **Server-side only:** content delivery occurs on the server.
2. **Private Sanity dataset:** a dataset dedicated to landing-page content.
3. **Cached published content:** the app caches validated published content to reduce dependency on Sanity availability.
4. **Signed revalidation after publish:** after publishing, a signed webhook triggers revalidation.
5. **Bounded timeout:** all Sanity reads use bounded timeouts and strict error handling.
6. **No Sanity token in browser code:** no Sanity credentials or tokens may be shipped to the browser.

---

## 7. Draft preview policy (approved)

- Preview access requires authentication.
- Only **Owner, Editor, and Publisher** may access authenticated previews.
- Preview sessions expire after **60 minutes**.
- The **Owner controls emergency revocation**.
- No public draft API access.
- Preview access is enforced server-side.

---

## 8. Required delivery fallback order (approved)

Failure behaviour must follow this order:

1. **Last successfully validated published content** (most recent known-good CMS payload).
2. **Approved Landing Page V2 code fallback**.

The homepage must remain available if Sanity is unavailable or returns invalid data.

---

## 9. Schema safeguards (approved)

Sanity content must be validated before rendering and must obey:

- plain text only
- maximum field lengths (see §12)
- required vs optional field rules (see §12)
- no HTML
- no scripts
- no embedded code
- no editor-supplied URLs for CTA destinations or routes
- reject invalid CMS responses before rendering

---

## 10. External publishing register (approved)

Because Growth history is time-bounded, every publication must also be logged externally using:

- **A private GitHub issue titled:** `Landing Page Publishing Register`
- **Recording method:** each publication is recorded as a **new comment**
- **Recorded fields:** date/time, publisher, summary, rollback reference
- **Ownership:** Product Owner owns the register initially

This provides an external governance trail beyond Growth's 90-day window.

---

## 11. SEO handling (approved)

SEO metadata will be produced server-side and will also use validated fallback values:

- validated SEO fields from published CMS content
- fallback SEO values from approved code if CMS is unreachable or invalid

---

## 12. Proposed editable landing-page content schema (exact)

### 12.1 Editable by CMS (plain text, validated)

All editable fields are **plain text** only and must be validated against length limits.

#### 12.1.1 Global style constraints

- headings: **max 120 characters**
- paragraphs/body copy: **max 400 characters**
- CTA labels and eyebrow text and small labels: **max 60 characters**
- SEO title: **max 60 characters**
- SEO description: **max 160 characters**

#### 12.1.2 Required fields (approved)

- core landing-page headings, body copy, CTA labels, and SEO fields are **required**
- supporting text may be **optional** where the page remains meaningful
- campaign block is optional and **disabled by default**
- if campaign is enabled: label, headline, and body are required

### 12.2 Content fields

The proposed Sanity document types:

#### Document: `landingPage`

1. **SEO**
   - `seo.title` (required)
   - `seo.description` (required)

2. **Hero**
   - `hero.eyebrow` (required)
   - `hero.headline` (required)
   - `hero.problemText` (required)
   - `hero.supportText` (required)
   - `hero.supportingLine` (optional)

3. **Primary CTA**
   - `primaryCta.label` (required)
   - CTA destination remains locked in code

4. **Secondary CTA**
   - `secondaryCta.label` (required)
   - navigation anchor target remains locked in code

5. **Campaign / announcement block (optional)**
   - `campaign.enabled` (optional, default false)
   - If `campaign.enabled` is true, then:
     - `campaign.label` (required)
     - `campaign.headline` (required)
     - `campaign.body` (required)
   - Position and styling remain code-controlled.
   - Must not accept arbitrary links, HTML, scripts, or additional sections.

6. **“Does this feel familiar?” section**
   - `familiar.introHeading` (required)
   - `familiar.intro` (required)
   - `familiar.observation1.title` (required)
   - `familiar.observation1.body` (required)
   - `familiar.observation2.title` (required)
   - `familiar.observation2.body` (required)
   - `familiar.observation3.title` (required)
   - `familiar.observation3.body` (required)
   - `familiar.transitionStatement` (required)

7. **“From reporting activity to operational clarity” section**
   - Titles and explanatory wording for the four rows are code-controlled.
   - CMS provides the row copy only where required by governance:
     - `fromTo.row1.from`
     - `fromTo.row1.to`
     - `fromTo.row2.from`
     - `fromTo.row2.to`
     - `fromTo.row3.from`
     - `fromTo.row3.to`
     - `fromTo.row4.from`
     - `fromTo.row4.to`

8. **“How it works” section**
   - `howItWorks.step1.title` (required)
   - `howItWorks.step1.body` (required)
   - `howItWorks.step2.title` (required)
   - `howItWorks.step2.body` (required)
   - `howItWorks.step3.title` (required)
   - `howItWorks.step3.body` (required)
   - Step 1 link destination remains locked in code.

9. **“A clearer leadership conversation” section**
   - `clarity.intro` (required)
   - `clarity.q1.title` (required)
   - `clarity.q1.body` (required)
   - `clarity.q2.title` (required)
   - `clarity.q2.body` (required)
   - `clarity.q3.title` (required)
   - `clarity.q3.body` (required)

10. **Final CTA**
   - `finalCta.title` (required)
   - `finalCta.body` (required)
   - final CTA button label (required)
   - CTA destination remains locked in code.

11. **Footer descriptive wording**
   - `footer.description` (required)

### 12.3 Locked fields (code-controlled, publisher-protected)

These must remain code-controlled or publisher-protected:

- privacy wording
- financial qualification wording
- legal/compliance wording
- CTA destinations, routes and navigation behaviour
- route names
- layout, branding, and section order

---

## 13. Draft preview → publish → rollback behaviour (definition)

1. **Draft**
   - Editor (Contributor) creates a draft and can revise repeatedly.
2. **Preview**
   - Preview is available only to authenticated Owner/Editor/Publisher sessions.
   - Preview sessions expire after 60 minutes.
3. **Approval**
   - Publisher reviews the landing copy checklist (operating procedure).
4. **Publish**
   - Publisher publishes a new version.
5. **Rollback**
   - Rollback restores a previous **published** version.
6. **Publishing register**
   - Each publish must be recorded as a new comment in the private GitHub issue.

---

## 14. Signed revalidation (approved)

- After publishing, Sanity triggers a **signed webhook** to the app server.
- The server validates the webhook secret and signature server-side.
- The secret and Sanity credentials are never exposed to the browser.

---

## 15. Failure behaviour details (approved)

- If Sanity cannot be reached, the homepage uses:
  1) last successfully validated published content,
  2) otherwise the approved Landing Page V2 code fallback.
- CMS content is never required for route availability.

---

## 16. Implementation phases, acceptance criteria, testing, rollback

### Phase A: Foundations (no visual changes)
- Validate schema, field limits, and payload validation rules.
- Implement server-side CMS read layer with caching and timeouts.
- Implement server-side preview access control and expiry.

Acceptance criteria:
- No write credentials in browser bundles.
- Protected fields remain code-controlled.
- Fallback order works under simulated CMS failures.

Testing requirements:
- schema validation unit tests
- failure-mode tests (timeouts, invalid payload)
- rendering tests for correctness with valid/invalid CMS responses
- security tests for token exposure and preview access control

Rollback plan:
- disable CMS reads in server and revert to code fallback
- revoke preview sessions at Owner request
- revert to previous published CMS version if the payload is incorrect

### Phase B: Preview governance
- Add preview environment routing and authenticated session expiry.
- Add publisher checklist and publish register workflow.

Acceptance criteria:
- previews do not leak publicly
- publisher approval affects only publish state, not delivery logic

### Phase C: Production publish and revalidation
- Implement signed webhook validation and server-side revalidation.

Acceptance criteria:
- webhook validation works and rejects invalid signatures
- caches refresh after publish without breaking availability

Rollback plan:
- revert cache to last successfully validated published content
- revert publishing to prior version if needed

---

## 17. Cost (approved)

Growth cost expectation:

- approximately **$15 per paid user per month**, subject to Sanity’s current pricing.

Also note:

- startup programme opportunities may reduce effective cost during early rollout.

---

## 18. Decisions required from the Product Owner

1. Approve any final field-level max lengths or optionality changes beyond the limits in §12.
2. Confirm protected footer and legal/privacy wording stays code-controlled.
3. Approve the publish register owner workflow and access to the private GitHub issue.
4. Confirm desired preview expiry duration and emergency revocation authority (captured in §7).

---

## 19. Non-goals

This ADR does not cover:

- any implementation of Sanity integration
- CMS Studio UI changes
- assessment/scoring/dashboard logic changes
