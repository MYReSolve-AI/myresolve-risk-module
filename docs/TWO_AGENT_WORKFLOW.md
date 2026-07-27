# MYReSolve Two-Agent Workflow

This workflow coordinates Codex and Claude while keeping the user in control.
It supplements `AGENTS.md`; the stricter rule applies if the documents differ.

## Operating model

Each task has three roles:

- **Owner:** the user defines the outcome, approves scope, and decides whether
  work may merge or deploy.
- **Builder:** one agent implements the approved task.
- **Reviewer:** the other agent independently reviews the completed change.

Codex and Claude may swap builder and reviewer roles between tasks. They must
not both implement the same task or edit the same active branch.

## Required task states

1. **Draft:** the desired outcome and boundaries are being shaped.
2. **Approved:** the owner has approved the completed task brief.
3. **In progress:** the builder is working in its isolated branch and worktree.
4. **Ready for review:** the builder has supplied a complete handover.
5. **Changes requested:** the reviewer has reported specific findings.
6. **Ready for owner:** checks and review are complete.
7. **Closed:** the owner has accepted the result or decided not to proceed.

Only the owner can move a task from Draft to Approved or authorize merge,
deployment, publication, destructive actions, or material scope expansion.

## Isolation rules

- Record the exact base branch and base commit before implementation.
- Preserve existing uncommitted work before creating an agent worktree.
- Use one branch and one worktree per builder task.
- Name branches `ai/<agent>/<task-id>-<short-description>`, for example
  `ai/claude/MYR-042-assessment-export`.
- Never open the same branch in two worktrees.
- Do not silently change the recorded base after approval.
- Assign owned paths in the task brief. Shared or overlapping files require an
  explicit integration plan before editing.
- Secrets and local environment files must remain uncommitted.

## Builder procedure

1. Read `AGENTS.md`, this workflow, and the approved task brief.
2. Confirm the base commit, assigned branch, clean worktree, and owned paths.
3. Restate the acceptance criteria and stop conditions before editing.
4. Implement only the approved batch.
5. Run focused checks while working.
6. Run the agreed verification pass once the batch is ready.
7. Review the final diff for unrelated changes, secrets, generated files, and
   accidental scope expansion.
8. Commit intentionally and complete the handover section of the task brief.
9. Stop. Do not merge or deploy.

## Reviewer procedure

1. Review the builder's commit or branch against the recorded base.
2. Begin read-only. Do not edit the builder's branch.
3. Check acceptance criteria, regressions, security, privacy, data handling,
   accessibility where relevant, and test coverage.
4. Report findings by priority with file and line evidence.
5. Distinguish blocking findings from optional improvements.
6. If no blocking issue exists, say so explicitly and record any residual risk.
7. If fixes are needed, return the task to the builder unless the owner
   explicitly reassigns implementation.

The reviewer must not approve work solely because tests pass. The implementation
must also satisfy the approved customer or business outcome.

## Handover contract

Every builder handover must include:

- task ID and role assignment;
- base branch and base commit;
- builder branch and head commit;
- concise summary of the outcome;
- files changed and why;
- checks run and their results;
- checks not run and why;
- screenshots or manual evidence when user-visible behaviour changed;
- migrations, configuration, dependencies, or environment changes;
- known limitations, residual risks, and unresolved decisions;
- confirmation that no merge or deployment occurred.

The reviewer adds its findings and recommendation to the same task record. The
owner then decides whether to request changes, accept the draft pull request, or
close the task.

## Pull request and release gate

- Use a draft pull request for owner review.
- The pull request must reference the task ID and reproduce the handover.
- Do not combine unrelated tasks in one pull request.
- Do not merge, deploy, publish, or delete the branch without explicit owner
  approval.
- Authentication, payments, customer data, security controls, production
  infrastructure, destructive changes, and billing prompts always require a
  fresh stop-and-confirm decision.

## Conflict and recovery

If branches conflict, pause both agents. The owner chooses an integration
branch and assigns one agent to resolve the conflict; the other reviews the
resolution. Never have both agents independently resolve the same conflict.

If either agent finds unexpected working-tree changes, a changed base commit,
missing context, usage limits, or scope expansion, it must stop and report the
condition before continuing.
