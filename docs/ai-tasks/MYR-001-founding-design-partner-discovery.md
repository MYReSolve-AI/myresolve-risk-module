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
- **Reviewed commit or branch:** `7de3e50` on
  `ai/claude/MYR-001-founding-design-partner-discovery`, reviewed read-only
  from `ai/codex/MYR-001-review-founding-design-partner-discovery`.
- **Compared with base commit:** `d492745`; also verified that the delivery
  descends from approved brief commit `16f57fe`.
- **Scope and mechanical checks:** Pass. Exactly the three owned paths changed;
  `git diff --check` is clean; referenced repository documents exist; no
  application code, scoring, configuration, dependency, or generated file
  changed.
- **Blocking findings:**
  1. **[P1] The repository capture can still identify participants.**
     `docs/FOUNDING_DESIGN_PARTNER_DISCOVERY.md:107-115` calls a roster
     anonymised while combining a coded label, sector, size band, role type,
     and a distinctive fit rationale. Lines 241-264 repeat that context and
     request concerns “verbatim where possible.” In a sample of only three to
     five people drawn from a known network, those combined details or a
     distinctive quotation can identify a person or company. This conflicts
     with the task boundary forbidding identifying information in the
     repository. Treat detailed partner-level notes as private
     pseudonymised records; commit only redacted, paraphrased, aggregated
     evidence with combinations suppressed where re-identification is
     plausible.
  2. **[P1] The claims guardrail permits unimplemented security controls to be
     presented as usable customer framing.**
     `docs/FOUNDING_DESIGN_PARTNER_DISCOVERY.md:54-69` says facilitators may use
     wording that company data “would be encrypted” and access limited to
     approved users/personnel. The cited source,
     `docs/SECURITY_DATA_BLUEPRINT.md:340-346`, permits that wording only after
     controls are implemented and verified and says not to publish it until it
     matches the live system and supplier agreements. The discovery guide must
     instead require facilitators to state that these are proposed
     requirements, not current or verified protections, and avoid reciting
     future control wording as assurance.
  3. **[P1] The scoring method mixes customer evidence with internal technical
     judgement while requiring partner-only support.**
     `docs/FOUNDING_DESIGN_PARTNER_DECISION_MATRIX.md:24-38` requires every
     factor to use discovery notes and supporting partner labels, but the
     matrices also score deliverability and independence (lines 49-51), build
     effort and security dependencies (lines 68-71), and access feasibility
     and security risk (lines 97-100). Design partners cannot evidence internal
     build effort, architecture dependencies, or verified security
     feasibility. Separate customer-evidence factors from an internal
     technical/readiness assessment, identify the source for each score, and
     do not use partner labels as support for internal judgements.
  4. **[P2] Buying context is not directly tested.**
     Acceptance criterion 2 requires buying context, and the desired outcome
     includes value sufficient to adopt or pay for. The questions at
     `docs/FOUNDING_DESIGN_PARTNER_DISCOVERY.md:154-174` explore adoption and
     consultancy use but do not neutrally ask how a purchase decision would be
     made, who must approve it, what evidence is required, or which parts a
     participant would expect to remain free versus paid. Add buying-process
     questions without naming or anchoring a price.
- **Non-blocking findings:**
  1. The section timings total roughly 32 minutes before transitions rather
     than 30. Label the guide “about 30–35 minutes” or trim it.
  2. The Continue threshold says “at least 3 of 5” partners
     (`docs/FOUNDING_DESIGN_PARTNER_DECISION_MATRIX.md:129-137`) even though
     the approved sample is three to five. Define the threshold for each
     allowed sample size or require all five conversations before applying it.
- **Acceptance criteria result:** AC8 passes. AC1 and AC7 are substantively
  present but need the non-blocking clarifications above. AC2, AC3, AC4, and
  AC6 are not yet satisfied because of findings 1-4. AC5's selection criteria
  are present, but the repository-recording method must be corrected under
  finding 1.
- **Residual risk:** Even after correction, facilitator practice and private
  note storage remain outside repository enforcement. The final documents
  should distinguish anonymous aggregated evidence from private
  pseudonymised notes and make the Owner responsible for approving any
  retained evidence.
- **Recommendation:** Changes requested. Return the four blocking findings to
  Claude as one bounded documentation batch, then repeat the privacy, claims,
  scoring-source, and acceptance-criteria review. Do not contact prospective
  partners yet.

## Builder follow-up

- **Builder:** Claude
- **Responds to Codex review at:** `a75684f`. This section is additive; the Codex
  Reviewer report above is unchanged.
- **Scope:** One bounded documentation batch addressing the four blocking findings
  and the two non-blocking clarifications. Only the three owned paths edited; no
  product code, scoring, prices, or contact.

### Blocking findings

- **B1 — Re-identification in a small sample (RESOLVED).**
  `docs/FOUNDING_DESIGN_PARTNER_DISCOVERY.md` §3 "Recording partners safely" now
  keeps the full label-to-attribute roster **private (never committed)** and
  commits only a minimal aggregate count, with explicit suppression of any
  identifying attribute or combination. §6 is re-framed: the per-partner block
  (§6a) is a private, pseudonymised record kept **outside** the repository, and
  only a redacted, paraphrased, aggregated cross-partner summary (§6b) is
  committed and approved by the Owner. "Verbatim where possible" is replaced by
  paraphrase-only; §1 and the §5 checklist reinforce combination suppression.
- **B2 — Future security controls recited as assurance (RESOLVED).**
  §2 "No security guarantees" is rewritten so facilitators must not present
  planned protections (encryption, access limits, company separation, supplier
  handling) as current or verified. It requires stating they are **proposed
  requirements, not yet built or verified**, notes the approved trust wording may
  only be published once it matches the implemented system, and instructs
  facilitators to capture the concern rather than reassure.
- **B3 — Customer evidence mixed with internal judgement (RESOLVED).**
  `docs/FOUNDING_DESIGN_PARTNER_DECISION_MATRIX.md` §1 now defines two factor
  sources — **[C] customer-evidence** (partner-labelled) and **[I]
  internal-assessment** (internal basis + owner, never partner-labelled) — and
  forbids mixing them. All three matrices tag each factor [C] or [I] and carry
  two separate support columns (*Partner support [C]* / *Internal basis [I]*).
  Matrix C additionally splits customer-reported access reality [C] from internal
  technical feasibility and security risk [I]. §5/§6 reflect the split so a score
  built only on [I] is not read as customer validation.
- **B4 — Buying context not directly tested (RESOLVED).**
  A new interview section, §4 "Buying context and decision process", adds neutral
  questions on how a purchase decision is made, who approves, what evidence is
  required, the budget cycle, and free-vs-paid expectations — with no price named
  or anchored. A matching BUYING CONTEXT capture field and a §5 checklist item
  were added.

### Non-blocking clarifications

- **N1 — Timing (RESOLVED).** The section is retitled "The conversation (about
  30–35 minutes)"; timings were rebalanced (Context 5→4, Free assessment 4→3) to
  absorb the new 4-minute buying-context section, summing to ~34 minutes.
- **N2 — Threshold vs sample size (RESOLVED).** §5 now requires all conversations
  in the round to be complete first and defines a **majority-signal** table for
  samples of 3 (2 of 3), 4 (3 of 4), and 5 (3 of 5); the Continue and Revise
  rules reference it instead of a fixed "3 of 5".

### Checks run

- **Scope:** only the three owned paths changed; no product code, scoring, or
  configuration touched.
- **Whitespace:** `git diff --check` clean.
- **Links:** all referenced documents resolve.
- **Privacy/claims scan:** no prices, currency, %/ROI/savings claims, absolute
  security guarantees, real names, or emails in the deliverables; residual
  matches are guardrail text prohibiting such claims.
- **Checks not run:** application lint/test/build — documentation only, per the
  verification agreement.

- **Status:** Ready for re-review by Codex.
- **No merge or deployment occurred:** Yes — one commit on the builder branch;
  nothing pushed, merged, deployed, deleted, or contacted.

## Follow-up reviewer verification

- **Reviewer:** Codex
- **Reviewed commit:** `e09d05d` on
  `ai/claude/MYR-001-founding-design-partner-discovery`.
- **Review basis:** Compared with the prior review commit `a75684f`; verified
  that the follow-up descends from it, changes only the three owned paths, and
  preserves the original reviewer report unchanged.
- **Mechanical checks:** Pass. `git diff --check a75684f..e09d05d` is clean;
  referenced documents resolve; no application code, scoring, configuration,
  dependency, or generated file changed.
- **Corrections verified:** The guide now treats planned security controls as
  proposed and unverified, adds neutral buying-process questions, uses an
  approximately 30–35 minute schedule, keeps detailed per-partner notes outside
  the repository, and scales the majority threshold to completed samples of
  three, four, or five. Customer-evidence and internal-assessment factors are
  also labelled separately and require different supporting sources.
- **Remaining blocking findings:**
  1. **[P1] Stable partner labels remain in committed records.**
     `docs/FOUNDING_DESIGN_PARTNER_DISCOVERY.md:336-350` correctly requires a
     redacted cross-partner summary, but its repository template still records
     contributing labels such as A, B, and C. The scoring method at
     `docs/FOUNDING_DESIGN_PARTNER_DECISION_MATRIX.md:27-30` and the decision
     record at lines 198-206 likewise permit partner labels. Reusing a stable
     label across buying, trust, reporting, and system themes can link one
     participant's answers across committed files. In a known sample of only
     three to five, that linkage can re-identify a person or company even when
     the private label mapping is not committed. Repository content must use
     aggregate counts only, never stable partner labels; retain labels only in
     private notes and suppress small or distinctive cells before Owner
     approval.
  2. **[P1] The primary ranking still combines customer evidence and internal
     judgement into one score.**
     `docs/FOUNDING_DESIGN_PARTNER_DECISION_MATRIX.md:24-36` says the two
     sources must never be mixed, but line 45 defines a single weighted score,
     and each matrix's `Weighted` column sums both [C] and [I] factors (for
     example, lines 62-71). A strong internal-readiness score can therefore
     lift an option with weak customer demand, making the rank look more
     customer-validated than it is. Give each option a separate
     customer-evidence subtotal and internal-readiness result or gate; do not
     use a combined [C]+[I] total as the primary rank. Make Continue depend
     explicitly on sufficient customer evidence and a passing internal gate.
- **Acceptance-criteria result:** The security-claims, buying-context, timing,
  and sample-threshold corrections pass. AC1, AC2, AC3, AC7, and AC8 pass.
  AC4 and AC5 remain blocked by finding 1, and AC6 remains blocked by finding
  2.
- **Recommendation:** Changes requested. Return only these two findings to
  Claude as a second bounded documentation correction, then repeat the privacy,
  source-separation, and acceptance-criteria checks. Do not contact prospective
  partners, push, merge, or deploy.

## Owner decision

- **Decision:** Pending implementation and review
- **Decision notes:**
- **Merge explicitly approved:** No
- **Deployment explicitly approved:** No
