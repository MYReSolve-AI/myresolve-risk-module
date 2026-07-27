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

- [x] Create a concise, neutral interview guide suitable for a roughly
  30-minute founding design-partner conversation.
- [x] Cover the current free assessment, proposed subscription outcome,
  optional consultancy, trust and data concerns, buying context, reporting
  needs, and source-system priorities.
- [x] Separate evidence from assumptions and avoid leading questions,
  unsupported savings claims, invented prices, or security guarantees.
- [x] Include safe facilitator guidance explaining what must not be collected,
  entered into MYReSolve, or committed to the repository.
- [x] Define selection criteria for three to five potential founding design
  partners without recording their names or contact details in the repository.
- [x] Create a repeatable decision matrix that can rank the first paid package,
  essential launch capabilities, and the first two or three data connections.
- [x] Define clear evidence thresholds for continue, revise, or stop decisions.
- [x] Preserve the locked assessment scoring model and current application
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

- **Status:** Ready for review
- **Task ID / roles:** MYR-001 — Builder: Claude, Reviewer: Codex.
- **Base branch / base commit:** `origin/main` / `d492745` (verified ancestor of
  the builder head).
- **Builder branch:** `ai/claude/MYR-001-founding-design-partner-discovery`
- **Head commit:** latest commit on the builder branch carrying this batch
  (single commit; hash provided in the handover return to Codex).
- **Outcome delivered:** A neutral, repeatable discovery kit that lets the Owner
  learn which outcomes founding design partners value, which trust concerns block
  adoption, and which two or three data connections matter most — with no
  contact, no product code change, and no pricing.
- **Files changed and why:**
  - `docs/FOUNDING_DESIGN_PARTNER_DISCOVERY.md` (new) — facilitator safety and
    claims boundaries, 3–5 partner selection criteria (no names/contacts), a
    ~30-minute non-leading interview guide covering all seven required topics,
    a question-hygiene checklist, and anonymised evidence-capture fields that
    separate evidence from assumption.
  - `docs/FOUNDING_DESIGN_PARTNER_DECISION_MATRIX.md` (new) — a repeatable
    0–3 weighted scoring method and three ranking matrices (first paid package;
    essential launch capabilities; first two or three data connections), plus
    continue / revise / stop evidence thresholds and a per-round decision record.
  - `docs/ai-tasks/MYR-001-founding-design-partner-discovery.md` — acceptance
    criteria marked delivered and this handover completed.
- **Checks run and results:** Scope check — only the three owned paths changed,
  no product code or scoring touched (pass). `git diff --check` — clean.
  Internal links — all referenced docs resolve. Privacy/claims scan — no prices,
  currency amounts, percentage/ROI/savings claims, absolute security guarantees,
  real participant names, or email addresses in the deliverables; the only
  matches for "ROI"/"guarantee"/"never shared" are guardrail text instructing
  facilitators NOT to make such claims (intended).
- **Checks not run and why:** Application lint, tests, and production build were
  not run — no application code, configuration, or scoring changed (documentation
  only), consistent with the verification agreement.
- **Manual or visual evidence:** Not applicable; deliverables are text templates
  with no user-visible product change.
- **Dependencies, migrations, configuration, or environment changes:** None.
- **Known limitations or residual risks:** These are advisory templates, not
  mechanically enforced; facilitator discipline is required to keep participant
  identities and confidential data out of the repository. The matrices are
  populated from evidence during real discovery, so they ship empty by design.
- **Unresolved decisions:** None introduced. All commercial and security
  decisions remain gated by `docs/SUBSCRIPTION_MVP_BRIEF.md` and
  `docs/SECURE_SUBSCRIPTION_PILOT_PLAN.md`; no price, package, capability, or
  connection is approved by this task.
- **No merge or deployment occurred:** Yes — work stops at a single commit on the
  builder branch; nothing pushed, merged, deployed, or deleted.

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
