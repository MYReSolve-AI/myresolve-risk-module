# MYR-001 — Founding Design-Partner Discovery

## Task brief

- **Task ID:** MYR-001
- **Status:** Approved
- **Owner:** User
- **Builder:** Claude
- **Reviewer:** Codex
- **Desired customer or business outcome:** Learn which MYReSolve outcomes
  prospective customers value enough to adopt or pay for, which trust concerns
  block adoption, and which two or three data connections matter most before
  product code, authentication, or billing expands.
- **Why this matters now:** Customer feedback batch 001 is complete, but the
  secure subscription plan still requires wider offer, trust, design-partner,
  and integration discovery before commercial or SaaS commitments.

### Acceptance criteria

- [ ] Create a concise, neutral interview guide suitable for a roughly
  30-minute founding design-partner conversation.
- [ ] Cover the current free assessment, proposed subscription outcome,
  optional consultancy, trust and data concerns, buying context, reporting
  needs, and source-system priorities.
- [ ] Separate evidence from assumptions and avoid leading questions,
  unsupported savings claims, invented prices, or security guarantees.
- [ ] Include safe facilitator guidance explaining what must not be collected,
  entered into MYReSolve, or committed to the repository.
- [ ] Define selection criteria for three to five potential founding design
  partners without recording their names or contact details in the repository.
- [ ] Create a repeatable decision matrix that can rank the first paid package,
  essential launch capabilities, and the first two or three data connections.
- [ ] Define clear evidence thresholds for continue, revise, or stop decisions.
- [ ] Preserve the locked assessment scoring model and current application
  behaviour.

### Scope

- **Included:** Interview structure, neutral questions, safe note-taking
  guidance, design-partner selection criteria, evidence capture fields,
  integration-ranking method, commercial decision matrix, and decision rules.
- **Excluded:** Contacting prospective customers, recording participant names
  or contact details, collecting confidential company information, changing
  product code or scoring, publishing prices, creating supplier accounts,
  authentication, billing, cloud persistence, real integrations, and
  production changes.
- **Owned paths:** `docs/FOUNDING_DESIGN_PARTNER_DISCOVERY.md`,
  `docs/FOUNDING_DESIGN_PARTNER_DECISION_MATRIX.md`, and this task record.
- **Shared or sensitive paths:** `ROADMAP.md`,
  `docs/EXTERNAL_FEEDBACK_001.md`,
  `docs/SECURE_SUBSCRIPTION_PILOT_PLAN.md`,
  `docs/SUBSCRIPTION_MVP_BRIEF.md`, and
  `docs/SECURITY_DATA_BLUEPRINT.md` are read-only references.

### Risk and stop conditions

- **Customer data involved:** No — templates and selection criteria only.
- **Authentication involved:** No
- **Payments or billing involved:** No — discovery may explore willingness and
  buying preferences, but must not set or publish prices.
- **Security or production infrastructure involved:** No
- **Destructive or difficult-to-reverse action involved:** No
- **Other stop conditions:** Stop if the work would identify real participants
  in the repository, request confidential operational data, make security or
  financial claims, expand into product implementation, or contact anyone.

### Git isolation

- **Base branch:** `origin/main`
- **Base commit:** `d492745`
- **Builder branch:**
  `ai/claude/MYR-001-founding-design-partner-discovery`
- **Builder worktree:**
  `/Users/robpierce/Documents/Codex/2026-07-27/ok/work/myresolve-myr-001-claude`
- **Integration plan for shared files:** Claude edits only the owned paths.
  Codex reviews the committed handover from a separate review branch and
  worktree.

### Verification agreement

- **Focused checks:** Validate Markdown structure, internal links, question
  neutrality, and consistency with the read-only reference documents.
- **Full review checks:** `git diff --check`, owned-path scope check, privacy and
  claims review, and independent Codex review against every acceptance
  criterion.
- **Manual or visual evidence required:** None; the deliverables are
  conversation and decision templates.

### Approval

- **Approved by:** User
- **Approval date:** 2026-07-27
- **Approved scope notes:** “Approve MYR-001.”

Do not contact prospective design partners or begin product implementation as
part of this task.

## Builder handover

- **Status:** Pending implementation
- **Builder branch:**
- **Head commit:**
- **Outcome delivered:**
- **Files changed and why:**
- **Checks run and results:**
- **Checks not run and why:**
- **Manual or visual evidence:**
- **Dependencies, migrations, configuration, or environment changes:**
- **Known limitations or residual risks:**
- **Unresolved decisions:**
- **No merge or deployment occurred:**

## Reviewer report

- **Reviewer:** Codex
- **Reviewed commit or branch:**
- **Compared with base commit:** `d492745`
- **Blocking findings:**
- **Non-blocking findings:**
- **Acceptance criteria result:**
- **Residual risk:**
- **Recommendation:** Pending

## Owner decision

- **Decision:** Pending implementation and review
- **Decision notes:**
- **Merge explicitly approved:** No
- **Deployment explicitly approved:** No
