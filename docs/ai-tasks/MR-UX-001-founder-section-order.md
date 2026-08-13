# MR-UX-001 Founder section order

## Task brief

- **Task ID:** MR-UX-001
- **Status:** Approved
- **Owner:** Rob Pierce
- **Builder:** Codex
- **Reviewer:** Owner visual review
- **Desired customer or business outcome:** Establish founder credibility before
  explaining the MYReSolve solution in detail.
- **Why this matters now:** Preview feedback identified that the founder story
  currently appears after three solution-focused sections.

### Acceptance criteria

- [x] The opening proposition remains first.
- [x] "Sound familiar?" continues to establish the visitor's problem.
- [x] "Why MYReSolve?" appears immediately after "Sound familiar?".
- [x] The solution sections follow the founder section in their existing order.
- [x] Founder copy, portrait, links, styling and anchor remain unchanged.
- [x] The hero "See how it works" button is removed while the navigation link
  and final assessment action remain available.

### Scope

- **Included:** Homepage section order, removal of the hero jump button and
  focused regression assertions.
- **Excluded:** Copy, design, contact flow, email, infrastructure and deployment.
- **Owned paths:** `apps/web/src/features/home/LandingPage.tsx`,
  `apps/web/src/features/home/HomePage.test.tsx`, this task record.
- **Shared or sensitive paths:** None.

### Risk and stop conditions

- **Customer data involved:** No
- **Authentication involved:** No
- **Payments or billing involved:** No
- **Security or production infrastructure involved:** No
- **Destructive or difficult-to-reverse action involved:** No
- **Other stop conditions:** Stop before push, merge or deployment.

### Git isolation

- **Base branch:** `origin/main`
- **Base commit:** `ebb261f`
- **Builder branch:** `ai/codex/MR-UX-001-founder-section-order`
- **Builder worktree:** `work/myresolve-founder-order`
- **Integration plan for shared files:** Independent PR; do not modify MR-ENG-012.

### Verification agreement

- **Focused checks:** Homepage tests and whitespace validation.
- **Full review checks:** Web test suite if focused checks pass.
- **Manual or visual evidence required:** Preview check after a future draft PR.

### Approval

- **Approved by:** Rob Pierce
- **Approval date:** 2026-08-13
- **Approved scope notes:** Move founder confidence before solution detail;
  follow-up approval removed the hero "See how it works" jump button.

## Builder handover

- **Status:** Ready for review
- **Builder branch:** `ai/codex/MR-UX-001-founder-section-order`
- **Implementation commit:** `1f43ed0`
- **Outcome delivered:** Founder credibility now follows problem recognition and
  precedes the detailed solution sections.
- **Files changed and why:** `LandingPage.tsx` reorders the existing founder
  section and removes the hero jump button; `LandingPage.module.css` removes
  now-unused button styles; `HomePage.test.tsx` locks the agreed sequence and
  retained navigation path; this record captures scope and verification.
- **Checks run and results:** Homepage tests 10/10 passed; full web suite 109/109
  passed; `git diff --check` passed.
- **Checks not run and why:** Lint and build were not repeated because the
  change only reorders existing JSX and the full component test suite passed.
- **Manual or visual evidence:** Existing preview inspected before the change;
  updated visual confirmation remains pending a future draft PR preview.
- **Dependencies, migrations, configuration, or environment changes:** None
- **Known limitations or residual risks:** Final visual confirmation requires a preview.
- **Unresolved decisions:** None
- **No merge or deployment occurred:** Yes

## Reviewer report

- **Reviewer:** Owner visual review
- **Reviewed commit or branch:** Pending
- **Compared with base commit:** `ebb261f`
- **Blocking findings:** Pending
- **Non-blocking findings:** Pending
- **Acceptance criteria result:** Pending
- **Residual risk:** Low
- **Recommendation:** Pending

## Owner decision

- **Decision:** Pending
- **Decision notes:**
- **Merge explicitly approved:** No
- **Deployment explicitly approved:** No
