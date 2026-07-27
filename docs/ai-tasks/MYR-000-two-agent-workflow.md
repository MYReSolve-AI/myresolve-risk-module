# MYR-000 — Two-Agent Workflow

## Task brief

- **Task ID:** MYR-000
- **Status:** Ready for review
- **Owner:** User
- **Builder:** Codex
- **Reviewer:** Claude
- **Desired customer or business outcome:** Give Codex and Claude one safe,
  repeatable way to build MyResolve together while the user retains approval
  over scope, merging, deployment, destructive actions, and spending.
- **Why this matters now:** Claude is newly available to help with MyResolve.

### Acceptance criteria

- [x] Codex and Claude load aligned repository governance.
- [x] Each task has one builder and one independent reviewer.
- [x] Parallel work uses separate branches and worktrees.
- [x] Every task records scope, acceptance criteria, risk, checks, handover, and
  owner decisions.
- [x] Neither agent may merge, deploy, delete, or change billing without
  explicit owner approval.
- [x] Existing local security-document work is preserved and reconciled with
  the latest remote state.

### Scope

- **Included:** Repository governance, Claude project instructions,
  collaboration workflow, task template, safe Git synchronization, and a
  separate Claude review worktree.
- **Excluded:** Product code, security architecture changes, merging,
  deployment, publication, billing, and deletion of the safety stash.
- **Owned paths:** `AGENTS.md`, `CLAUDE.md`, `docs/AI_TASK_TEMPLATE.md`,
  `docs/TWO_AGENT_WORKFLOW.md`, and this task record.
- **Shared or sensitive paths:** Git branches and worktrees.

### Risk and stop conditions

- **Customer data involved:** No
- **Authentication involved:** No
- **Payments or billing involved:** No
- **Security or production infrastructure involved:** No
- **Destructive or difficult-to-reverse action involved:** No
- **Other stop conditions:** Stop if synchronization would discard unique
  local work or if the remote changes overlap unexpectedly.

### Git isolation

- **Base branch:** `origin/main`
- **Base commit:** `7cf9588`
- **Builder branch:** `ai/codex/MYR-000-two-agent-workflow`
- **Builder worktree:**
  `/Users/robpierce/Documents/Codex/2026-07-14/in/myresolve-risk-module`
- **Integration plan for shared files:** Claude reviews the same committed state
  from a separate review branch and worktree. It does not edit the builder
  branch.

### Verification agreement

- **Focused checks:** Validate Markdown references and inspect the staged diff.
- **Full review checks:** `git diff --check` and independent Claude review.
- **Manual or visual evidence required:** None; this task changes repository
  instructions only.

### Approval

- **Approved by:** User
- **Approval date:** 2026-07-27
- **Approved scope notes:** “Set up the two-agent workflow” and “get all caught
  up and on the same page.”

## Builder handover

- **Status:** Ready for review
- **Builder branch:** `ai/codex/MYR-000-two-agent-workflow`
- **Implementation commit:** `ded001e`
- **Outcome delivered:** Shared governance, Claude imports, isolated
  builder/reviewer workflow, and reusable task/handover template.
- **Files changed and why:** Four repository instruction files were added so
  both agents follow the same rules.
- **Checks run and results:** Staged diff passed whitespace validation; all
  referenced workflow files exist; current branch is based on freshly fetched
  `origin/main`.
- **Checks not run and why:** Application lint, tests, and build were not run
  because no application code or configuration changed.
- **Manual or visual evidence:** Not applicable.
- **Dependencies, migrations, configuration, or environment changes:** None.
- **Known limitations or residual risks:** Repository instructions guide agent
  behaviour but do not mechanically enforce every rule.
- **Unresolved decisions:** Whether to accept and merge the future draft pull
  request after Claude's review.
- **No merge or deployment occurred:** Yes

## Reviewer report

- **Reviewer:** Claude
- **Reviewed commit or branch:** `39fc2e5` (range `7cf9588..39fc2e5`, commits
  `ded001e` + `39fc2e5`); reviewed read-only from branch
  `ai/claude/MYR-000-review-two-agent-workflow`.
- **Compared with base commit:** `7cf9588` (verified: equals current
  `origin/main` and is a true ancestor of `39fc2e5`).
- **Blocking findings:** None. The change is 5 additive Markdown files
  (397 insertions, 0 deletions); `git diff --check` is clean and no
  application code, configuration, secrets, or generated files were touched.
  User approval, branch/worktree isolation, and the prohibitions on
  unauthorized merge / deploy / publish / delete / billing / destructive
  actions are all covered across `AGENTS.md` (lines 16, 27, 55-63),
  `CLAUDE.md` (lines 20-21), and `docs/TWO_AGENT_WORKFLOW.md`
  (lines 28-29, 92-101, 104-111).
- **Non-blocking findings:**
  1. `AGENTS.md:9` and `AGENTS.md:13` keep Codex-specific wording ("Use Codex
     repository tools only when…", "Start a fresh Codex task…") although
     `AGENTS.md:3-4` broadens scope to "all AI-assisted work… including Codex
     and Claude." Reads as if the cost/handover rules bind only Codex.
     Recommend generalizing to "agent" / "AI-assisted task."
  2. Reviewer-write path is under-specified. `docs/TWO_AGENT_WORKFLOW.md:88`
     says "The reviewer adds its findings… to the same task record," but
     lines 50-51 and 57-67 require the reviewer to stay off the builder's
     branch. In practice (as here) the reviewer writes to its own branch copy,
     producing two divergent copies of the record until the owner integrates.
     Recommend one clarifying sentence: the reviewer records on its review
     branch and the owner (or builder) integrates the report.
  3. Worktree lifecycle is ungoverned. `docs/TWO_AGENT_WORKFLOW.md:31-42`
     covers worktree creation but not removal; `git worktree list` already
     shows an accumulating set including a `prunable` entry
     (`/private/tmp/pr16-final-verify-855e`). Branch deletion needs approval,
     but `git worktree remove --force` can discard uncommitted work and is not
     addressed. Recommend a cleanup rule flagging forced worktree removal as a
     destructive action.
- **Acceptance criteria result:** Criteria 1-5 substantively satisfied by the
  documents. Note these are advisory instructions, not mechanically enforced —
  the builder disclosed this honestly (`MYR-000` handover, "do not mechanically
  enforce every rule"). Criterion 6 (security-document work "preserved and
  reconciled") is **not evidenced in the reviewed range** — the diff contains
  only the 5 governance files. I independently confirmed the security work is
  preserved on `origin/cursor/secure-subscription-pilot-blueprint-855e`
  (`a70716c`), so "preserved" holds, but the reconciliation is separate git
  state, not part of this commit. Recommend treating criterion 6 as satisfied
  by that separate state (or splitting it into its own task), not by this PR.
- **Residual risk:** Governance is advisory and relies on both agents and their
  harnesses reading and honoring the docs; there is no mechanical gate (e.g. a
  pre-commit or CI check blocking unauthorized merges). Acceptable for a
  documentation task; a candidate for later hardening.
- **Recommendation:** Ready for owner. No blocking findings. Non-blocking items
  1-3 can be folded into a follow-up documentation pass; the criterion-6 note
  is a scoping/evidence caveat, not a defect in the workflow.

## Approved builder follow-up

- **Approved by:** User
- **Approval date:** 2026-07-27
- **Status:** Ready for independent verification
- **Scope:** Address only the three non-blocking documentation findings from
  Claude's review.
- **Finding 1 addressed:** The two remaining Codex-specific cost and task rules
  now apply consistently to all AI-assisted work.
- **Finding 2 addressed:** The workflow now says that the reviewer records
  findings on its review branch and the owner or assigned builder integrates
  the reviewer-only commit before the owner decision.
- **Finding 3 addressed:** The workflow now requires a clean worktree before
  removal and treats forced removal as a destructive action requiring explicit
  owner approval.
- **Checks:** Documentation diff and whitespace validation passed.
- **Next gate:** Claude verifies this follow-up before the Owner decision.

## Follow-up verification (Claude)

- **Reviewer:** Claude
- **Verified commit:** `7c0b4c4` (range `68dd0ee..7c0b4c4`, single commit
  "docs: address two-agent workflow review").
- **Compared against reviewed commit:** `68dd0ee`. Verified `68dd0ee` is a true
  ancestor of `7c0b4c4`; the builder based the fix directly on the reviewed
  state. Diff is 3 Markdown files (`AGENTS.md`,
  `docs/TWO_AGENT_WORKFLOW.md`, this record), 32 insertions / 5 deletions,
  `git diff --check` clean, no code/config/secrets/generated files touched.
- **Finding 1 — RESOLVED.** `AGENTS.md:9` now "Use repository tools only when…"
  and `AGENTS.md:13` now "Start a fresh AI-assisted task…"; the Codex-only
  framing is gone. Remaining "Codex" references (`AGENTS.md:3-4`, the two-agent
  section) are the intended "Codex and Claude" naming and correctly untouched.
- **Finding 2 — RESOLVED.** `docs/TWO_AGENT_WORKFLOW.md` handover contract now
  states the reviewer records findings in its review-branch copy and the owner
  or assigned builder integrates that reviewer-only commit before the owner
  decision, and that the reviewer does not edit the builder branch directly.
  This removes the earlier contradiction with the read-only reviewer rule
  (lines 50-51, 57-67) and matches what actually happened (`68dd0ee` integrated
  into the builder branch).
- **Finding 3 — RESOLVED.** `docs/TWO_AGENT_WORKFLOW.md` isolation rules now
  require a clean worktree before removal, treat forced worktree removal as a
  destructive action needing explicit owner approval, and forbid removing a
  worktree containing uncommitted work — consistent with the file's stop
  conditions.
- **Regressions or contradictions:** None found. Changes are additive/clarifying
  and internally consistent with the surrounding rules.
- **Residual risk:** Unchanged from the original review — governance remains
  advisory with no mechanical enforcement gate.
- **Recommendation:** All three non-blocking findings resolved; no new issues.
  Ready for owner.

## Owner decision

- **Decision:** Pending review
- **Decision notes:**
- **Merge explicitly approved:** No
- **Deployment explicitly approved:** No
