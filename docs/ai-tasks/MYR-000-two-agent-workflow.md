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
- **Reviewed commit or branch:**
- **Compared with base commit:** `7cf9588`
- **Blocking findings:**
- **Non-blocking findings:**
- **Acceptance criteria result:**
- **Residual risk:**
- **Recommendation:** Pending

## Owner decision

- **Decision:** Pending review
- **Decision notes:**
- **Merge explicitly approved:** No
- **Deployment explicitly approved:** No
