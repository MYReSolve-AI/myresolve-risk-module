# AI Task Brief and Handover

## Task brief

- **Task ID:** MR-ENG-007
- **Status:** Approved
- **Owner:** Product Owner
- **Builder:** Codex
- **Reviewer:** Product Owner
- **Desired customer or business outcome:** Let leaders move from an overall self-rated confidence judgement into a clear department-by-department evidence review that identifies what is supported, what is missing and what to validate first.
- **Why this matters now:** MR-ENG-006 established overall confidence as the bridge from leadership judgement. The next approved layer must make that bridge useful without blending assurance into scores or collecting production customer evidence before secure SaaS foundations exist.

### Acceptance criteria

- [x] The executive dashboard shows Evidence and Assurance progress and links to the department review.
- [x] All six departments appear in risk-priority order with Not reviewed, Partly evidenced or Evidence reviewed status.
- [x] A reviewer can record status, reviewer name or role, review date, redacted evidence references/notes and missing information for each department.
- [x] Reviews autosave in a separate browser-local schema and reload correctly.
- [x] The prototype prominently states that only synthetic or redacted references may be used and supports no uploads.
- [x] Assurance never changes Health Score, Risk Score, prioritisation or Estimated Annual Value at Risk.
- [x] Automated tests, lint and production build pass.

### Scope

- **Included:** Browser-local assurance domain and persistence, department queue and editor, dashboard summary and entry point, prioritisation using existing assessment risk, tests and documentation.
- **Excluded:** File uploads, cloud storage, authentication, multi-user permissions, approval workflows, real confidential evidence, KPI calculations, scoring or financial-model changes, production deployment.
- **Owned paths:** New `apps/web/src/domain/evidenceAssurance`, new `apps/web/src/lib/evidenceAssurancePersistence*`, new `apps/web/src/features/evidence-assurance`, dashboard integration, `/evidence-assurance`, related tests and governing documents.
- **Shared or sensitive paths:** Executive dashboard components and browser-local assessment results used only to order departments by existing risk.

### Risk and stop conditions

- **Customer data involved:** Prototype fields could hold company information, so the UI must direct users to synthetic or redacted references only; no production customer data is approved.
- **Authentication involved:** No.
- **Payments or billing involved:** No.
- **Security or production infrastructure involved:** No; browser-local prototype only.
- **Destructive or difficult-to-reverse action involved:** No; separate storage key and clear local reset.
- **Other stop conditions:** Stop if implementation requires uploads, external integrations, cloud persistence, personal-data collection beyond an optional reviewer name or role, or any scoring/financial change.

### Git isolation

- **Base branch:** `main`
- **Base commit:** `0d13968c53b378908c260cddc68e8fc1d4618d6a`
- **Builder branch:** `codex/evidence-assurance-prototype`
- **Builder worktree:** `/Users/robpierce/Documents/Codex/2026-07-14/in/myresolve-static-export-test`
- **Integration plan for shared files:** Keep the assurance model and storage separate; dashboard receives only a progress summary and link.

### Verification agreement

- **Focused checks:** Assurance domain, persistence, department editor and dashboard integration tests.
- **Full review checks:** Full web test suite, lint and production build.
- **Manual or visual evidence required:** Product Owner review on the private site after the draft is approved for publishing.

### Approval

- **Approved by:** Product Owner
- **Approval date:** 11 August 2026
- **Approved scope notes:** Build a browser-local prototype using notes and evidence references only. No uploads or real confidential customer data.

## Builder handover

- **Status:** Ready for review
- **Builder branch:** `codex/evidence-assurance-prototype`
- **Head commit:** See current branch head
- **Outcome delivered:** The dashboard now leads into a six-department Evidence and Assurance prototype with risk ordering, three governed statuses, autosaved reviewer/date/redacted references/gaps and a clear no-confidential-data/no-upload boundary.
- **Files changed and why:** New assurance domain and persistence; new `/evidence-assurance` route and interface; dashboard progress entry point; focused tests; operating, journey, security and prototype documentation.
- **Checks run and results:** Focused tests 8/8 passed; full suite 109/109 passed; ESLint passed without warnings; TypeScript and production build passed with the new route.
- **Checks not run and why:** Browser visual QA and deployment are deferred until Product Owner approves private review publication.
- **Manual or visual evidence:** Pending private-site review.
- **Dependencies, migrations, configuration, or environment changes:** New separate browser-local storage key only; no dependency changes planned.
- **Known limitations or residual risks:** Browser-local prototype is single-device and not approved for real confidential evidence.
- **Unresolved decisions:** Free/subscription/consultancy entitlement boundary and secure cloud architecture remain separate decisions.
- **No merge or deployment occurred:** Yes

## Reviewer report

- **Reviewer:** Product Owner
- **Reviewed commit or branch:** Pending
- **Compared with base commit:** `0d13968c53b378908c260cddc68e8fc1d4618d6a`
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
