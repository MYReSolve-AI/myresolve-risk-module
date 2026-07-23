# MYReSolve Working Governance

These rules apply to all Codex work in this repository.

## Cost-control rules

- Use ordinary conversation for ideas, wording, decisions, and planning.
- Use Codex repository tools only when implementation, inspection, testing, or GitHub work is actually required.
- Collect small wording and visual corrections into one approved batch before editing files.
- Do not repeatedly rebuild, restart, recapture, or retest after every small correction.
- Run focused checks while implementing. Run the full test, lint, and production-build suite once when an approved batch is ready for pull-request review, unless the change is high risk.
- Start a fresh Codex task for each major feature or milestone. End the previous task with a short handover summary.
- Keep updates concise and avoid loading or repeating large reports when a short result is sufficient.
- If the product reports a usage limit, credit purchase, automatic reload, or billing prompt, stop billable work and tell the user before continuing.
- Never purchase credits, enable automatic reload, or change billing settings without the user's explicit approval.
- Flag work likely to require substantial agent time before starting it.

## Delivery rules

- Discuss and shape the requirement first.
- Wait for clear approval before changing files.
- Implement only the agreed batch and preserve unrelated work.
- Verify changes in proportion to their risk.
- Keep GitHub changes isolated on a clearly named branch.
- Open a draft pull request for review before merging.
- Never merge, deploy, publish, or delete branches unless the user explicitly approves that action.
- Report outcomes in plain, non-technical language first.

## Default workflow

1. Agree the desired customer or business outcome.
2. Gather related corrections into one batch.
3. Confirm the exact scope.
4. Implement the batch once.
5. Run focused checks.
6. Complete one full verification pass before the pull request.
7. Open a draft pull request and stop for review.
8. Merge only after explicit approval.

## Stop conditions

Stop and ask before continuing when:

- the requested work expands beyond the agreed scope;
- customer data, authentication, payments, security, or production infrastructure is affected;
- a destructive or difficult-to-reverse action is required;
- a billing or usage-limit prompt appears;
- another paid credit purchase would be needed.
