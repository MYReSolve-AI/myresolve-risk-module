# MYReSolve Operating Manual

**Document ID:** MR-DOC-004
**Status:** Draft for review
**Applies to:** Approved platform baseline after Sprint 004 and Project Legacy Snapshot 001
**Base documentation SHA (this draft):** `7af2dd21d8edaed6754d186a2470fa34be4b81b2` (`origin/main` at authoring)
**Product baseline tag:** `legacy-snapshot-001` → peeled commit `8d9d9ec8b9720a01b2f672563e07dd3125f993a7`

---

## 1. Document control

### Purpose of this manual

This Operating Manual explains how MYReSolve works **today**: how assessments are run, how results are calculated, how the executive dashboard should be read, and how behavioural integrity is protected.

### How to use this document

Throughout this manual, statements are marked or organised as:

| Kind | Meaning |
|------|---------|
| **Current capability** | Available on the approved baseline (`main` / Snapshot 001 lineage) |
| **Operating policy** | Repository-level rules for product and engineering custodians |
| **Known limitation** | Documented behaviour or ambiguity operators must allow for |
| **Future / deferred** | Not shipped; must not be treated as present functionality |

### Binding sources of truth (hierarchy)

1. [`docs/PROJECT_LEGACY_SNAPSHOT_001.md`](./PROJECT_LEGACY_SNAPSHOT_001.md) and tag `legacy-snapshot-001`
2. [`docs/GOLDEN_BASELINE.md`](./GOLDEN_BASELINE.md) and `legacy/v0.3.1/index.html`
3. [`docs/SCORING_PARITY.md`](./SCORING_PARITY.md) with `apps/web/src/domain/assessment/` and its tests
4. Live product surfaces `/`, `/organisation-profile`, `/assessment` and `/dashboard`
5. [`docs/ORGANISATION_PROFILE_ENGINE.md`](./ORGANISATION_PROFILE_ENGINE.md) for Organisation Profile context (MR-ENG-004-A1)
6. [Issue #5](https://github.com/MYReSolve-AI/myresolve-risk-module/issues/5) for the open PostCSS dependency risk

**Do not** treat root aspirational documents (for example `PRODUCT_SPEC.md`, `SCORING_MODEL.md`, or the product version `ROADMAP.md`) as descriptions of shipped functionality.

**Historical note:** [`docs/SPRINT_004_CORRECTION_BRIEF.md`](./SPRINT_004_CORRECTION_BRIEF.md) is a **historical implementation record**. Its recommended visual corrections were completed by merged PR #4. Its header status line may still read as pre-approval; do not treat that header as current work instruction. A separate documentation-alignment task should refresh stale headers in migration and correction docs without rewriting history.

### Organisation Profile (Sprint 005)

The Organisation Profile is the **pre-assessment context step**. It stores business context in a separate browser-local key and must not change Health Score, maturity, confidence, Risk Score, risk rating, prioritisation or Estimated Annual Value at Risk.

See [`docs/ORGANISATION_PROFILE_ENGINE.md`](./ORGANISATION_PROFILE_ENGINE.md).

---

## 2. Purpose and product promise

### Current capability

MYReSolve helps leadership assess operational maturity across six departments, express confidence in each response, and view modelled health, risk and Estimated Annual Value at Risk on an executive dashboard.

It provides **operational decision support**: structured questioning, a locked calculation model, and an executive dashboard for results already captured.

### Product promise (what this baseline delivers)

- A fixed 24-question assessment (six departments × four questions)
- An Organisation Profile context step before assessment (browser-local; separate storage)
- Saved answers in the browser using a locked storage schema
- Calculable Health Scores, risk ratings, maturity bands and Estimated Annual Value at Risk
- An executive dashboard that consumes the assessment **domain engine only** (Company name may display from a completed profile; it is contextual display only)

### What this baseline does **not** promise

- Audited financial loss figures or guarantees of future outcomes
- Cloud sync, encryption claims, multi-device Organisation Profile access or regulated retention
- Assessment completion **Date** on the dashboard (not recorded in Sprint 005)
- AI-generated executive narrative or recommendations
- Multi-tenant SaaS hosting, authentication or cloud persistence
- A changed scoring model beyond locked v0.3.1 behaviour

---

## 3. Intended users and decision-makers

### Intended users

| Role | Needs |
|------|--------|
| **Assessment facilitators** | Operate `/assessment`, complete or restore sessions, reach a valid finish state |
| **Executive readers** | Interpret `/dashboard` without needing implementation detail |
| **Product and engineering custodians** | Preserve behavioural integrity, approve changes, restore known-good baselines |

### Change authority (repository-level operating policy)

| Topic | Authority |
|-------|-----------|
| Assessment wording, product policy, user-facing interpretation | **Product Owner** approval required |
| Scoring-model changes (formulas, thresholds, confidence factors, cost ranges) | **Product Owner** approval, documented rationale, updated parity expectations and tests |
| Implementation and UX | Engineering may change code when approved behaviour is preserved, **or** when Product Owner has approved a separate product change |
| Silent formula / threshold / confidence / cost-range changes | **Forbidden** |

This is repository-level policy. It does **not** invent named individuals or claim a formal corporate RACI beyond these rules.

---

## 4. End-to-end user journey

### Current capability

1. Open `/` (platform entry). Primary CTA: **Organisation Profile**, then assessment and dashboard.
2. Complete **`/organisation-profile`** (required context). Data saves only in this browser on this device — not synced to a cloud account.
3. Start **`/assessment`**. If the profile is incomplete, an accessible setup gate directs the user back to the Organisation Profile; existing assessment answers are preserved.
4. For each question: select a **maturity response** (1–5) and a **confidence** (Low / Medium / High).
5. Answers autosave to assessment browser storage. Optional **Save and exit** returns to `/`.
6. Navigate Previous / Next. **Review answers** is available before finish.
7. When all 24 questions are answered, **Finish and view dashboard** saves and opens **`/dashboard`**.
8. Dashboard loads assessment storage for scoring. When a valid completed Organisation Profile exists, **Company** shows `organisation.name` as read-only context. **Date** stays hidden.

### Operating policy

- Facilitators should rate the organisation **as it operates today** (guidance shown in the assessment UI).
- Organisation Profile data is contextual only — it must not affect Health Score, maturity, confidence, Risk Score, risk rating, prioritisation or Estimated Annual Value at Risk.
- Do not invent an assessment completion **Date**; recording one requires a separately approved assessment-persistence change.
- Completing or changing the Organisation Profile must not clear or rewrite assessment answers.

### Known limitation

- Progress shows both **viewing position** (current question) and **answered count**; after restore, you may view question 1 while 24 of 24 are already answered. That is navigation state, not data loss.

---

## 5. Assessment model and question structure

### Current capability

Six departments, four questions each (**24** total), fixed wording from the locked baseline:

| # | Department | Role of the section (intro intent) |
|---|------------|-------------------------------------|
| 1 | People | Leadership depth, role clarity, capability, accountability |
| 2 | Process | Simplicity, consistency, hand-offs, continuous improvement |
| 3 | Customer | Understanding, resolution, effort, loyalty |
| 4 | Operations | Visibility, capacity, asset use, operating discipline |
| 5 | Technology | Systems, data and automation supporting performance |
| 6 | Finance | Cost-to-serve, reporting trust, investment discipline |

Answer keys use `` `${sectionIndex}-${questionIndex}` `` (for example `0-0` … `5-3`).

Exact question text and department cost envelopes are recorded in `docs/GOLDEN_BASELINE.md` and implemented in `apps/web/src/domain/assessment/questions.ts`.

### Operating policy

Question wording is frozen with the golden baseline until Product Owner approves a new assessment version and regenerates parity fixtures.

---

## 6. Maturity scale

### Current capability — maturity response (per question)

| Value | Label |
|------:|-------|
| 1 | Critical |
| 2 | Developing |
| 3 | Established |
| 4 | Strong |
| 5 | Leading |

### Current capability — maturity band (from department or overall Health Score)

| Health Score | Maturity band |
|-------------:|---------------|
| ≥ 88 | Leading |
| ≥ 63 | Strong |
| ≥ 38 | Established |
| ≥ 13 | Developing |
| else | Critical |

**Canonical vocabulary:** a **maturity response** is the 1–5 answer; a **maturity band** is the named band derived from the 0–100 Health Score.

---

## 7. Confidence model

### Current capability

| Selection | Factor applied to department Estimated Annual Value at Risk |
|-----------|--------------------------------------------------------------|
| Low | 1.15 |
| Medium | 1.07 |
| High | 1.00 |

- If maturity is chosen without confidence, **Medium** is applied by default.
- The department confidence factor is the **mean** of per-answer factors for answered questions in that department.
- Confidence **does not** change the Health Score.

### Operating policy / disclaimer (D3)

Confidence adjusts the Estimated Annual Value at Risk estimate. It is **not** a statistical probability or reliability percentage.

Future documents that describe confidence as “reliability” refer to **deferred** product versions and must not be applied to this baseline.

---

## 8. Health and risk calculations

Domain modules may still use internal names such as `sectionScore`, `overallScore` or “maturity score” for **behavioural parity** with `legacy/v0.3.1`. In this manual and on the executive dashboard, the calculated 0–100 result is the **Health Score**.

### Department Health Score

Locked prototype rule (`sectionScore`): average maturity values where the stored number is **≥ 1**; unanswered or zero values are ignored.

```
avg = sum(maturityValuesWithVGreaterOrEqual1) / count
HealthScore = count === 0 ? 0 : Math.round(((avg - 1) / 4) * 100)
```

**Known limitation:** completion checks and confidence averaging use the stricter `answered()` rule (**1 ≤ value ≤ 5**). Out-of-range values above 5 are not produced by the current UI; if ever present in storage they can diverge between score averaging and completion.

### Overall Health Score (Executive Health Score)

Mean of department Health Scores for departments with **at least one** question answered under the `answered()` rule (1–5). Departments with no such answers are excluded from the overall average.

### Risk Score

```
RiskScore = 100 − HealthScore
```

### Risk rating (from Health Score)

| Health Score | Rating |
|-------------:|--------|
| ≥ 80 | LOW |
| ≥ 60 | MODERATE |
| ≥ 40 | HIGH |
| else | CRITICAL |

### Known limitation — empty-score ambiguity

An **empty** assessment and an assessment scored entirely at Critical can both produce an overall Health Score of **0**.

On the Sprint 004 dashboard, the Executive Health Score card still shows the numeric **0** in both cases. An empty assessment is distinguished by the empty-state banner and Assessment completed **Not started** (plus empty department cards). Do not treat a lone overall **0** as proof that every department is Critical—use completion status and department detail.

---

## 9. Annual Value at Risk

### Disclaimer (approved)

Estimated Annual Value at Risk is an illustrative modelled estimate derived from assessment responses, configured departmental cost ranges and confidence selections. It is not an audited loss calculation, financial forecast, valuation, accounting opinion or guarantee of future outcomes.

MYReSolve provides operational decision support and does not replace professional financial, legal, regulatory or risk advice. Results should be interpreted alongside organisational evidence and executive judgement.

### Current capability — department estimate (GBP)

Using locked departmental low/high cost ranges:

```
riskRatio = RiskScore / 100
EstimatedAnnualVaR = Math.round((lo + (hi − lo) × riskRatio) × confidenceFactor)
```

### Dashboard presentation

| Presentation | Meaning |
|--------------|---------|
| Headline Estimated Annual Value at Risk | Sum of department estimates for departments with answers (`totalActiveCost`) |
| Low / High support range | Sum of departmental cost-range lows / highs for those same answered departments |

Currency formatting uses GBP (`en-GB`) in the UI. Domain CSV exports raw numeric cost where that path is used.

### Locked departmental cost ranges (illustrative scenario inputs)

| Department | Low (GBP) | High (GBP) |
|------------|----------:|-----------:|
| People | 750,000 | 1,500,000 |
| Process | 1,000,000 | 2,200,000 |
| Customer | 1,200,000 | 2,800,000 |
| Operations | 800,000 | 1,800,000 |
| Technology | 400,000 | 1,000,000 |
| Finance | 600,000 | 1,400,000 |

---

## 10. Department prioritisation

### Current capability

1. Consider departments with at least one answered question.
2. Sort by **Risk Score** descending (stable sort; equal risk keeps relative order).
3. **Top Three Risk Areas** = first three of that list.
4. **Departments needing attention** count = ranked departments with **Health Score &lt; 60**.

### Operating policy

The Top Three Risk Areas list presents **domain-backed facts** (band, rating, Estimated Annual Value at Risk). It does **not** invent department-specific improvement actions or AI recommendations in this baseline.

---

## 11. Dashboard interpretation

### Current capability — routes and chrome

| Element | How to read it |
|---------|----------------|
| Assessment completed | Yes / In progress / Not started from answer completeness (24 of 24) |
| Version | Assessment baseline label (for example `v0.3.1`) |
| Company | Read-only display of Organisation Profile `organisation.name` when the profile is **explicitly completed** (valid schema, required/conditional fields filled, and a valid `completedAt` timestamp); otherwise hidden. Does not affect scoring. Autosaved fields alone are not enough. Editing any field clears `completedAt` until Complete is selected again. |
| Date | Hidden — assessment completion timestamp is not recorded in Sprint 005 |
| Executive Health Score | Overall Health Score and related band / rating |
| Estimated Annual Value at Risk | Illustrative modelled estimate (see disclaimer) |
| Assessment Confidence | Predominant Low / Medium / High language and response counts — not raw cost factors |
| Highest Risk Department | Top of the risk-ranked list |
| Department Risk Overview | All six departments: Health Score, maturity band, risk rating, Est. VaR |
| Top Three Risk Areas | Highest Risk Score departments among those with answers |
| AI Executive Narrative | Deferred notice only — no generated narrative |

### Known limitation

Labels such as “Operational Health” may appear as supporting copy next to Executive Health Score. Treat them as Health Score language, not a second calculation.

---

## 12. Persistence and data boundaries

### Current capability

**Assessment**

| Item | Value |
|------|--------|
| Storage | Browser `localStorage` only |
| Key | `myresolve_answers_v03` |
| Payload | `{ answers, confidence }` |
| Answer values | Maturity responses `1`–`5` |
| Confidence values | `low` \| `medium` \| `high` |

**Organisation Profile** (separate key)

| Item | Value |
|------|--------|
| Storage | Browser `localStorage` only (same device/browser; not cloud-synced) |
| Key | `myresolve_organisation_profile_v1` |
| Schema | `schemaVersion: 2` (A1 multi-select operating models) |
| Load-time migration | Accepts legacy singular `operatingModel` → `operatingModels: [id]`; never writes to the assessment key |

There is **no** server-side store in this baseline. Clearing site data removes profile and assessment results from that browser. Anyone using the same browser may access locally stored profile data. Avoid unnecessary confidential or personal information. Do not claim encryption, cloud backup, multi-device access or regulated retention.

### Operating policy

- Do not mix Organisation Profile or other commercial context into `myresolve_answers_v03`.
- Do not change either key or schema without Product Owner approval and a versioned migration plan.
- Profile completion changes must not clear assessment answers.

---

## 13. Evidence and audit principles

### Current capability

- Calculations are deterministic for a given answer set and locked parameters.
- Automated parity tests compare domain behaviour to the locked v0.3.1 prototype.
- Passing parity proves **behavioural match to the prototype**, not commercial validation of cost figures.

### Known limitation — CSV versus live dashboard

Domain CSV behaviour (used for behavioural parity with the legacy export) differs from live dashboard totals:

| Topic | Live dashboard / priorities | Domain CSV export behaviour |
|-------|-----------------------------|-----------------------------|
| Departments included in totals / ranking | Departments with **at least one** answer | **All six** departments always appear |
| Unanswered department cost in CSV | Not included in live total | Exports high-band cost (risk 100%, confidence factor 1) with Health Score 0 |

Operators comparing a CSV artifact to the dashboard must allow for that difference. Presence of CSV domain logic does not, by itself, assert that a polished export control is the primary executive workflow in this Next.js UI.

---

## 14. AI guardrails and deferred capabilities

### Current capability

The dashboard shows an intentional notice that **AI Executive Narrative** is planned for a future release. This baseline surfaces assessment results only and does **not** generate recommendations.

### Future / deferred (examples — not shipped)

- AI Executive Advisor / generated narrative (see product delivery roadmap beyond Snapshot 001)
- Using Organisation Profile bands to calibrate cost-of-failure envelopes (product decision; not enabled — profile remains contextual display/context only)
- Board PDF packages, SaaS authentication, cloud persistence, subscription billing

Do not describe deferred items as current capability.

---

## 15. Versioning and change control

### Current capability / freeze

- Product assessment baseline: locked **v0.3** behaviour packaged as **v0.3.1** (packaging/hotfix only).
- Platform documentation baseline: Project Legacy Snapshot 001 / tag `legacy-snapshot-001`.
- Domain engine under `apps/web/src/domain/assessment/` is the sole source of scoring business logic for `/assessment` and `/dashboard`.

### Operating policy

1. No silent formula, threshold, confidence-factor or cost-range changes.
2. Scoring-model changes require Product Owner approval, rationale, updated parity expectations and tests.
3. UX or implementation changes must preserve approved behaviour unless a product change is separately approved.
4. Aspirational root roadmaps do not authorise formula drift.

---

## 16. Security and known risks

### Current capability / known risks

| Risk | Status |
|------|--------|
| Assessment data held in browser localStorage | Inherent to this baseline — treat devices as the trust boundary |
| Transitive PostCSS advisory via `next@16.2.10` ([GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93)) | **Open** — tracked as [Issue #5](https://github.com/MYReSolve-AI/myresolve-risk-module/issues/5) |
| `npm audit fix --force` | **Must not be used** — proposes a breaking Next.js downgrade |

Issue #5 remains accepted temporary dependency risk until a compatible stable Next.js release includes patched PostCSS. Recheck before any production launch.

Read-only acceptance previously confirmed: no direct application PostCSS use, no user CSS upload, and no untrusted CSS embedding into `<style>` in application source.

---

## 17. Recovery baseline and snapshot procedure

### Important boundary

Tag `legacy-snapshot-001` restores the **approved source-code and documentation baseline**. It does **not** recover browser localStorage, facilitator notes, or any customer/organisational data.

### Snapshot identity

| Item | Value |
|------|--------|
| Tag | `legacy-snapshot-001` |
| Peeled commit | `8d9d9ec8b9720a01b2f672563e07dd3125f993a7` |
| Record | [`docs/PROJECT_LEGACY_SNAPSHOT_001.md`](./PROJECT_LEGACY_SNAPSHOT_001.md) |

> Note: later `main` commits (including this Operating Manual once merged) may sit **ahead** of the tag. The tag remains the frozen post–Sprint 004 executable product baseline for assessment and dashboard behaviour.

### Reproducible recovery runbook

Commands assume a clean clone of the repository.

```bash
# 0. From a clone of this repository (any recent main is fine)
# 1. Fetch and check out the snapshot tag (detached HEAD is expected)
git fetch origin tag legacy-snapshot-001
git checkout legacy-snapshot-001

# 2. Confirm peeled SHA
git rev-parse HEAD
# Expect: 8d9d9ec8b9720a01b2f672563e07dd3125f993a7

# 3. Install dependencies (web app)
cd apps/web
npm ci

# 4. Tests
npm test
# Expect: 34 tests passed (6 files) on the snapshot tip

# 5. Lint
npm run lint

# 6. Production build
npm run build
# Expect routes: /, /organisation-profile, /assessment, /dashboard (plus framework /_not-found)

# 7. Golden-baseline integrity
cd ../..
md5sum legacy/v0.3.1/index.html
# Expect: 64e282b822c4bcd612bfa0e4ad8803aa
# Note: on macOS without md5sum, use: md5 -q legacy/v0.3.1/index.html

# 8. Confirm Organisation Profile surfaces are present (Sprint 005)
test -d apps/web/app/organisation-profile \
  && test -d apps/web/src/domain/organisationProfile \
  && test -d apps/web/src/features/organisation-profile \
  && test -f docs/ORGANISATION_PROFILE_ENGINE.md \
  && echo "Organisation Profile present (expected)"
```

Optional root wrappers (from repository root, after the web-app install above):

```bash
npm test      # runs apps/web vitest via root package.json
npm run lint
npm run build
```

Legacy HTML reference (optional, from repository root):

```bash
npm run legacy   # serves legacy/v0.3.1 via npx serve
```

---

## 18. Current exclusions

Explicitly **out of** the current product surfaces (or deferred beyond Sprint 005):

- Assessment completion **Date** on the dashboard
- AI-generated narrative or recommendations
- Scoring evolution beyond locked v0.3.1 / Phase 2 parity (including future “reliability” confidence models)
- SaaS foundation features (authentication, cloud persistence, billing, multi-user tenancy)
- Board PDF / commercial report packages as finished products
- Using Organisation Profile data to change Health Score, risk, prioritisation or VaR

Organisation Profile (route, domain, feature, persistence, and `docs/ORGANISATION_PROFILE_ENGINE.md`) is implemented in Sprint 005 as contextual pre-assessment data only.

---

## 19. Glossary

| Term | Meaning in this baseline |
|------|--------------------------|
| **Maturity response** | Individual assessment answer on the 1–5 scale |
| **Health Score** | Calculated 0–100 department or overall result (`((avg − 1) / 4) × 100` rounded) |
| **Maturity band** | Critical, Developing, Established, Strong or Leading derived from Health Score |
| **Risk Score** | `100 − Health Score` |
| **Risk rating** | LOW / MODERATE / HIGH / CRITICAL from Health Score thresholds |
| **Confidence** | Low / Medium / High selection that scales Estimated Annual Value at Risk only |
| **Estimated Annual Value at Risk (VaR)** | Illustrative modelled GBP estimate from cost ranges, Risk Score and confidence |
| **Top Three Risk Areas** | Highest Risk Score departments among those with answers (max three) |
| **Domain engine** | `apps/web/src/domain/assessment/` — sole scoring business-logic source for product surfaces |
| **Golden baseline** | Locked `legacy/v0.3.1` assessment prototype and its documented behaviour |
| **Project Legacy Snapshot 001** | Frozen post–Sprint 004 platform pointer (`legacy-snapshot-001`) |
| **Parity** | Automated proof of behavioural match to the locked prototype |

---

## Appendix A — Related links

- Snapshot: [`docs/PROJECT_LEGACY_SNAPSHOT_001.md`](./PROJECT_LEGACY_SNAPSHOT_001.md)
- Golden baseline: [`docs/GOLDEN_BASELINE.md`](./GOLDEN_BASELINE.md)
- Scoring parity: [`docs/SCORING_PARITY.md`](./SCORING_PARITY.md)
- Migration plan (may contain stale phase status): [`docs/MIGRATION_PLAN.md`](./MIGRATION_PLAN.md)
- Historical Sprint 004 corrections: [`docs/SPRINT_004_CORRECTION_BRIEF.md`](./SPRINT_004_CORRECTION_BRIEF.md)
- Dependency tracking: [Issue #5](https://github.com/MYReSolve-AI/myresolve-risk-module/issues/5)

## Appendix B — Recommended follow-on documentation task

Align stale status wording in `docs/MIGRATION_PLAN.md` and `docs/SPRINT_004_CORRECTION_BRIEF.md` with Snapshot 001 / merged PRs #1, #2 and #4, **without** rewriting the historical correction narrative. This alignment is a separate follow-on documentation task.
