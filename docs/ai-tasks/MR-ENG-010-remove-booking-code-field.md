# AI Task Brief and Handover

## Task brief

- **Task ID:** MR-ENG-010
- **Status:** Approved
- **Owner:** Product Owner
- **Builder:** Codex
- **Reviewer:** Product Owner
- **Desired customer or business outcome:** Remove an internal administration field from the public booking journey so visitors only provide information that is meaningful to them.
- **Why this matters now:** The live form asks visitors for a “Name or short code” even though MYReSolve can generate the tracker reference automatically.

### Acceptance criteria

- [x] The public form no longer displays or submits a code field.
- [x] The Worker generates a non-identifying unique booking reference and continues to populate the Notion `Code` title.
- [x] No assessment, Organisation Profile, authentication, billing or storage behavior changes.
- [x] Focused tests, full web tests, Worker tests, lint and the production build pass.

### Scope

- **Included:** Booking form and payload, Worker reference generation, related tests and documentation.
- **Excluded:** Notion schema changes, assessment behavior, new data collection, authentication, billing and unrelated visual changes.
- **Owned paths:** Contact booking form, booking Worker, their tests and booking documentation.
- **Shared or sensitive paths:** Public booking endpoint; existing secrets and production configuration remain unchanged.

### Risk and stop conditions

- **Customer data involved:** Yes — the existing visitor-entered booking fields are unchanged; one unnecessary field is removed.
- **Authentication involved:** No.
- **Payments or billing involved:** No.
- **Security or production infrastructure involved:** No configuration change; the existing Worker code will require a separately approved deployment after merge.
- **Destructive or difficult-to-reverse action involved:** No.
- **Other stop conditions:** Stop if the change would require altering the Notion schema or weakening existing validation and security controls.

### Git isolation

- **Base branch:** `main`
- **Base commit:** `708f40469c9cf9fdb2655c342fcd896c6b7be778`
- **Builder branch:** `codex/remove-booking-code`
- **Builder worktree:** `/private/tmp/myresolve-booking-to-notion`
- **Integration plan for shared files:** Keep the change limited to the approved booking surface and preserve unrelated work.

### Verification agreement

- **Focused checks:** Client payload contains no code; Worker accepts the reduced payload and generates the Notion reference.
- **Full review checks:** Full web and Worker tests, lint, syntax checks and production build.
- **Manual or visual evidence required:** Confirm the deployed form has no code field and one labelled test submission receives an automatically generated Notion code.

### Approval

- **Approved by:** Product Owner
- **Approval date:** 12 August 2026
- **Approved scope notes:** Remove the public field, generate the reference internally, retain the Notion `Code` column, and prepare a draft pull request before merge or deployment.

## Builder handover

- **Status:** Ready for review
- **Builder branch:** `codex/remove-booking-code`
- **Head commit:** See the current `codex/remove-booking-code` branch head; this handover is included in that commit.
- **Outcome delivered:** The public booking form no longer requests a visitor-supplied code. The Worker generates a dated random reference immediately before the Notion write and continues to populate the existing `Code` title.
- **Files changed and why:** Booking form and payload test; Worker reference generation and tests; operating documentation; this task brief and handover.
- **Checks run and results:** Focused form tests 4/4; full web tests 109/109; Worker tests 10/10; ESLint, Worker syntax checks, Next production build and Sites static packaging all passed.
- **Checks not run and why:** No live Worker or website deployment was performed because deployment requires separate approval after merge.
- **Manual or visual evidence:** The static production output contains no “Name or short code” label or code input.
- **Dependencies, migrations, configuration, or environment changes:** None.
- **Known limitations or residual risks:** A very small collision risk remains in the eight-character UUID suffix; the date and random suffix provide more than four billion combinations per day for this early-access volume.
- **Unresolved decisions:** None.
- **No merge or deployment occurred:** Yes

## Reviewer report

- **Reviewer:** Product Owner
- **Reviewed commit or branch:** Pending
- **Compared with base commit:** `708f40469c9cf9fdb2655c342fcd896c6b7be778`
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
