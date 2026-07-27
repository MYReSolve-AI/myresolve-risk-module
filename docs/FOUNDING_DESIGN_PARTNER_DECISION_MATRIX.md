# Founding Design-Partner Decision Matrix

**Status:** Decision template — planning only. It ranks options from discovery
evidence; it does not approve any package, capability, connection, or price.

**Purpose:** Turn the anonymised findings from
`docs/FOUNDING_DESIGN_PARTNER_DISCOVERY.md` into three repeatable rankings —

1. the first paid package,
2. the essential launch capabilities, and
3. the first two or three data connections —

and apply clear evidence thresholds for a **continue / revise / stop** decision.

**Reference basis (read-only):** `docs/SUBSCRIPTION_MVP_BRIEF.md`,
`docs/SECURE_SUBSCRIPTION_PILOT_PLAN.md`, `docs/SECURITY_DATA_BLUEPRINT.md`. The
matrix must not contradict those documents, must not set prices, and must not
assume any security control that is not yet implemented and verified.

---

## 1. How to score (repeatable method)

For every option, score each factor **0–3** using only evidence captured in the
discovery notes. Record the partner labels that support each score so the ranking
is traceable and not opinion.

| Score | Meaning |
|------:|---------|
| 0 | No supporting evidence, or partners actively did not want it |
| 1 | Weak / single-partner signal |
| 2 | Clear signal from some partners |
| 3 | Strong, repeated signal across most partners |

- **Weighted score** = sum of (factor score × factor weight).
- Always write the **supporting partner labels** next to a score (e.g. "A, C").
- A high score with only one supporting partner is a hypothesis, not evidence —
  treat it as such in §5.
- Re-run the matrix whenever new discovery evidence arrives; it is meant to be
  updated, not filled in once.

---

## 2. Matrix A — First paid package

Rank the candidate first offers (from `docs/SUBSCRIPTION_MVP_BRIEF.md` §3): a
**subscription**, **consultancy**, or a **combined** starting point.

**Factors (weight):** Demand strength (×3) · Willingness to adopt as first paid
step (×3) · Fit with a leader's felt problem (×2) · Deliverability before the
security/foundation gates (×2) · Independence from unbuilt features (×1).

| Candidate first package | Demand ×3 | Adopt-first ×3 | Problem fit ×2 | Deliverable ×2 | Independence ×1 | Weighted | Partners |
|-------------------------|:---------:|:--------------:|:--------------:|:--------------:|:---------------:|:--------:|----------|
| Subscription (tracking) | | | | | | | |
| Consultancy (expert support) | | | | | | | |
| Combined starter | | | | | | | |

*Do not enter a price. This ranks which offer to pursue first, not what to charge.*

---

## 3. Matrix B — Essential launch capabilities

Rank the proposed subscription capabilities (`docs/SUBSCRIPTION_MVP_BRIEF.md` §3.2
and §5) to separate "must have for a first paid pilot" from "later".

**Factors (weight):** Value to partners (×3) · Frequency of use (×2) · Blocks
adoption if absent (×3) · Build effort before launch (×2, where **3 = low
effort**) · Security/foundation dependency (×2, where **3 = few
dependencies**).

| Capability | Value ×3 | Frequency ×2 | Adoption-blocker ×3 | Low effort ×2 | Few deps ×2 | Weighted | Partners |
|------------|:--------:|:------------:|:-------------------:|:-------------:|:-----------:|:--------:|----------|
| Secure account + one company workspace | | | | | | | |
| Saved assessment history | | | | | | | |
| Repeat assessment + comparison over time | | | | | | | |
| KPI evidence (Current → Acceptable → Target) | | | | | | | |
| Judgement-vs-evidence comparison | | | | | | | |
| Invited leadership users | | | | | | | |
| Downloadable progress reports | | | | | | | |

**Reading the result:** high value **and** high adoption-blocker = candidate
"must have"; high value but heavy dependency/effort = strong "fast follow". The
KPI layer keeps leadership judgement and actual evidence visibly separate and must
never blend into the locked assessment score (`docs/SUBSCRIPTION_MVP_BRIEF.md`
§8).

---

## 4. Matrix C — First two or three data connections

Rank candidate source-system connections against the low-effort data principle
("Connect once. Refresh automatically."). Use **system categories**, never a
named customer system with live data.

**Factors (weight):** Repeated-effort removed (×3) · Number of partners who hold
key KPIs there (×3) · Read-only access feasibility (×2) · Minimum-data
sufficiency — a summary measure is enough (×2) · Security/permission simplicity
(×2, where **3 = simplest & lowest risk**).

| Connection category | Effort removed ×3 | Partner spread ×3 | Read-only feasible ×2 | Min-data ×2 | Low risk ×2 | Weighted | Partners |
|---------------------|:-----------------:|:-----------------:|:---------------------:|:-----------:|:-----------:|:--------:|----------|
| BI dashboard (e.g. Power BI / Tableau layer) | | | | | | | |
| Underlying data service behind a dashboard | | | | | | | |
| Finance / ERP summary | | | | | | | |
| Operational system export | | | | | | | |
| Reusable spreadsheet / CSV mapping (fallback) | | | | | | | |
| Manual entry (final fallback only) | | | | | | | |

**Rules that override raw score:**
- Prefer connecting to a controlled underlying data source over scraping a visual
  dashboard where practical (`docs/SECURE_SUBSCRIPTION_PILOT_PLAN.md` §4).
- Any connection must be read-only, minimum-permission, minimum-data, and
  customer-revocable; credentials/tokens are never exposed to the browser or
  support staff.
- Keep the first release to a **small number** of high-value connections. Rank
  and select **two or three** — do not attempt to connect every system.
- A reusable spreadsheet mapping is a legitimate safe fallback; manual entry is
  the last resort.

---

## 5. Evidence thresholds — continue / revise / stop

Apply after each round of conversations. "Partners" means distinct anonymised
participants giving the same signal.

### Continue (proceed to the next planning step for the chosen option)
- **A clear first package** scores highest with supporting signal from **at least
  3 of 5** partners, **and**
- **at least 2 capabilities** register as "must have" (high value + high
  adoption-blocker) across a majority of partners, **and**
- **at least 2 connection categories** show strong repeated-effort-removed signal
  from **3 or more** partners with feasible read-only, minimum-data access, **and**
- **no unresolved trust blocker** is severe enough that partners would refuse to
  store data even once the stated foundations exist.

### Revise (adjust the offer, capability set, or connection targets, then re-test)
- Signal is **mixed or split** (e.g. no package clears the 3-partner bar, or
  must-have capabilities disagree across partners), **or**
- the valued connections are **not feasible** as read-only/minimum-data in most
  cases, **or**
- trust concerns are **specific and addressable** but currently block adoption.

  → Change only what the evidence points to, keep the boundaries, and run another
  small round.

### Stop (do not proceed to build; return to the Owner)
- **Little or no demand:** no package attracts adopt-first signal from more than
  one partner, **or**
- **No valued, feasible connection** emerges (the low-effort data principle can't
  be met safely), **or**
- **Fundamental trust refusal:** partners would not store this data regardless of
  controls, **or**
- proceeding would require crossing a boundary this task forbids (setting prices,
  contacting at scale, building product code, or weakening the security gates in
  `docs/SUBSCRIPTION_MVP_BRIEF.md` §7 and
  `docs/SECURE_SUBSCRIPTION_PILOT_PLAN.md` §10).

Any **Continue** decision only advances *planning*. It does not authorise
authentication, storage, billing, real integrations, or pricing — those remain
Owner decisions under the referenced briefs.

---

## 6. Decision record (complete per round)

```
Round / date band:
Partners contributing (labels only):        e.g. A, B, C
Chosen first package (with weighted score + supporting partners):
Must-have capabilities (with supporting partners):
Selected 2–3 connections (with supporting partners + access reality):
Unresolved trust blockers:
Threshold result:                           Continue | Revise | Stop
Rationale (evidence-based):
Next planning step (no build authorised):
Owner sign-off required before any implementation:  Yes
```
