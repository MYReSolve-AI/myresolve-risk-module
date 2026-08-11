# AI Task Brief and Handover

## Task brief

- **Task ID:** MR-ENG-006
- **Status:** Approved
- **Owner:** Product Owner
- **Builder:** Codex
- **Reviewer:** Product Owner
- **Desired customer or business outcome:** Replace repeated per-question confidence with one clear overall self-rated confidence step that leads customers toward later department evidence review.
- **Why this matters now:** The two-level confidence and assurance model was approved and locked on 11 August 2026. The private review product still implements the superseded per-question confidence multiplier.

### Acceptance criteria

- [x] A completed 24-question assessment proceeds from answer review to one required Low, Medium or High overall confidence question before the dashboard.
- [x] Existing maturity answers load unchanged; legacy per-question confidence is not converted into an invented overall response.
- [x] The saved assessment contains one overall confidence value and no new per-question confidence values.
- [x] Confidence does not change Health Score, Risk Score, priorities or Estimated Annual Value at Risk.
- [x] The dashboard labels the result as self-rated leadership confidence and explains that department Evidence and Assurance is the next step.
- [x] Focused tests, full tests, lint and production build pass.

### Scope

- **Included:** Assessment flow, browser-local persistence migration, scoring cost calculation, dashboard confidence presentation, tests and governing documentation.
- **Excluded:** Department evidence capture, secure accounts, cloud persistence, billing, changing maturity questions or cost ranges, production deployment.
- **Owned paths:** `apps/web/src/domain/assessment`, `apps/web/src/lib/assessmentPersistence*`, `apps/web/src/features/assessment`, `apps/web/src/features/executive-dashboard`, related product documents.
- **Shared or sensitive paths:** Existing `myresolve_answers_v03` browser storage and locked v0.3.1 legacy reference.

### Risk and stop conditions

- **Customer data involved:** No production customer data; browser-local migration behaviour only.
- **Authentication involved:** No.
- **Payments or billing involved:** No.
- **Security or production infrastructure involved:** No.
- **Destructive or difficult-to-reverse action involved:** No; existing maturity answers are preserved.
- **Other stop conditions:** Stop if the change requires inventing an overall response from legacy per-question confidence or altering approved maturity scoring/cost ranges.

### Git isolation

- **Base branch:** `codex/lock-confidence-assurance-decision`
- **Base commit:** `1b85630`
- **Builder branch:** `codex/overall-confidence-journey`
- **Builder worktree:** `/Users/robpierce/Documents/Codex/2026-07-14/in/myresolve-static-export-test`
- **Integration plan for shared files:** Keep the approved documentation commit as the base; submit implementation as a separate reviewable change.

### Verification agreement

- **Focused checks:** Assessment persistence, assessment journey, scoring and executive dashboard tests.
- **Full review checks:** Full test suite, lint and production build once the batch is complete.
- **Manual or visual evidence required:** None requested; automated interaction and rendering assertions are sufficient for this phase.

### Approval

- **Approved by:** Product Owner
- **Approval date:** 11 August 2026
- **Approved scope notes:** Implement the overall-confidence journey first; department Evidence and Assurance remains the next controlled product layer.

## Builder handover

- **Status:** Ready for review
- **Builder branch:** `codex/overall-confidence-journey`
- **Head commit:** See current branch head
- **Outcome delivered:** One required overall confidence step now follows answer review; the dashboard presents that judgement separately and Value at Risk no longer uses a confidence multiplier.
- **Files changed and why:** Assessment domain and persistence for the new data contract; assessment UI for the confidence step; dashboard model and card for the new presentation; tests for migration, journey and scoring; governing documents for the implemented status.
- **Checks run and results:** Focused tests 35/35 passed; full suite 105/105 passed; ESLint passed without warnings; Next.js production build passed.
- **Checks not run and why:** Browser visual QA was not requested and is not required by the approved verification agreement.
- **Manual or visual evidence:** Not requested
- **Dependencies, migrations, configuration, or environment changes:** Browser-local assessment payload migration only; no dependencies planned.
- **Known limitations or residual risks:** Department Evidence and Assurance is excluded from this phase. Legacy browser payloads retain their old field until the next assessment save, but it is ignored and never converted into an overall judgement.
- **Unresolved decisions:** None within approved scope.
- **No merge or deployment occurred:** Yes

## Reviewer report

- **Reviewer:** Product Owner
- **Reviewed commit or branch:** Pending
- **Compared with base commit:** `1b85630`
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
