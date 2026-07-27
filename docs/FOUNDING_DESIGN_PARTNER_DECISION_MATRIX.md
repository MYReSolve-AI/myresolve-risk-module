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

Score each factor **0–3**. Every factor has a declared **source**, and the two
sources must never be mixed or supported by the same evidence:

- **[C] Customer-evidence factor** — scored only from the aggregated discovery
  evidence (the §6b committed aggregate in the discovery guide). Record the
  **partner labels or count** that support the score. Design partners are the
  evidence here.
- **[I] Internal-assessment factor** — scored from MYReSolve's own technical and
  readiness judgement (build effort, architecture dependencies, security and
  access feasibility). Record a short **internal basis and the owner** of that
  judgement. Do **not** cite partner labels to support an [I] factor: design
  partners cannot evidence internal build effort, architecture dependencies, or
  verified security feasibility.

| Score | Meaning ([C] = across partners; [I] = internal confidence) |
|------:|-----------|
| 0 | No support, or a clear negative ([C] partners did not want it / [I] not feasible) |
| 1 | Weak / single-partner signal, or low internal confidence |
| 2 | Clear signal from some partners, or moderate internal confidence |
| 3 | Strong repeated signal across most partners, or high internal confidence |

- **Weighted score** = sum of (factor score × factor weight).
- Each matrix keeps **two support columns**: *Partner support [C]* (labels/count)
  and *Internal basis [I]* (rationale + owner). A [C] score with only one
  supporting partner is a hypothesis, not evidence — treat it as such in §5.
- The ranking shows both sources so the Owner can see where **customer demand**
  and **internal feasibility** agree or diverge; a high overall score built only
  on [I] factors is not customer validation.
- Re-run the matrix whenever new discovery evidence arrives; it is meant to be
  updated, not filled in once.

---

## 2. Matrix A — First paid package

Rank the candidate first offers (from `docs/SUBSCRIPTION_MVP_BRIEF.md` §3): a
**subscription**, **consultancy**, or a **combined** starting point.

**Customer-evidence factors [C]:** Demand strength (×3) · Willingness to adopt as
first paid step (×3) · Fit with a leader's felt problem (×2).
**Internal-assessment factors [I]:** Deliverability before the security/foundation
gates (×2) · Independence from unbuilt features (×1).

| Candidate first package | Demand [C] ×3 | Adopt-first [C] ×3 | Problem fit [C] ×2 | Deliverable [I] ×2 | Independence [I] ×1 | Weighted | Partner support [C] | Internal basis [I] |
|-------------------------|:---:|:---:|:---:|:---:|:---:|:--:|---|---|
| Subscription (tracking) | | | | | | | | |
| Consultancy (expert support) | | | | | | | | |
| Combined starter | | | | | | | | |

*Do not enter a price. This ranks which offer to pursue first, not what to charge.
Partner labels support only the [C] columns; the [I] columns cite an internal
basis and owner.*

---

## 3. Matrix B — Essential launch capabilities

Rank the proposed subscription capabilities (`docs/SUBSCRIPTION_MVP_BRIEF.md` §3.2
and §5) to separate "must have for a first paid pilot" from "later".

**Customer-evidence factors [C]:** Value to partners (×3) · Frequency of use (×2)
· Blocks adoption if absent (×3).
**Internal-assessment factors [I]:** Build effort before launch (×2, where **3 =
low effort**) · Security/foundation dependency (×2, where **3 = few
dependencies**).

| Capability | Value [C] ×3 | Frequency [C] ×2 | Adoption-blocker [C] ×3 | Low effort [I] ×2 | Few deps [I] ×2 | Weighted | Partner support [C] | Internal basis [I] |
|------------|:---:|:---:|:---:|:---:|:---:|:--:|---|---|
| Secure account + one company workspace | | | | | | | | |
| Saved assessment history | | | | | | | | |
| Repeat assessment + comparison over time | | | | | | | | |
| KPI evidence (Current → Acceptable → Target) | | | | | | | | |
| Judgement-vs-evidence comparison | | | | | | | | |
| Invited leadership users | | | | | | | | |
| Downloadable progress reports | | | | | | | | |

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

**Customer-evidence factors [C]:** Repeated-effort removed (×3) · Number of
partners who hold key KPIs there (×3) · Customer-reported access reality — how
hard *they* say read-only access is to grant (×2).
**Internal-assessment factors [I]:** Technical read-only + minimum-data
feasibility (×2) · Security/permission risk (×2, where **3 = simplest & lowest
risk**).

| Connection category | Effort removed [C] ×3 | Partner spread [C] ×3 | Access reality [C] ×2 | Tech feasibility [I] ×2 | Low risk [I] ×2 | Weighted | Partner support [C] | Internal basis [I] |
|---------------------|:---:|:---:|:---:|:---:|:---:|:--:|---|---|
| BI dashboard (e.g. Power BI / Tableau layer) | | | | | | | | |
| Underlying data service behind a dashboard | | | | | | | | |
| Finance / ERP summary | | | | | | | | |
| Operational system export | | | | | | | | |
| Reusable spreadsheet / CSV mapping (fallback) | | | | | | | | |
| Manual entry (final fallback only) | | | | | | | | |

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

Apply **only after all conversations planned for the round are complete** — the
approved sample is three to five, so do not judge thresholds mid-round.
"Partners" means distinct anonymised participants giving the same signal, and
"majority signal" scales to the completed sample size:

| Completed sample | Majority signal = at least |
|:----------------:|:--------------------------:|
| 3 partners | 2 of 3 |
| 4 partners | 3 of 4 |
| 5 partners | 3 of 5 |

Thresholds below use **majority signal** as defined in this table, so they hold
whether the round finished with three, four, or five partners.

### Continue (proceed to the next planning step for the chosen option)
- **A clear first package** ranks highest and has **majority-signal** [C] support
  to adopt it as the first paid step, **and**
- **at least 2 capabilities** register as "must have" (high [C] value + high [C]
  adoption-blocker) with **majority signal**, **and**
- **at least 2 connection categories** show strong repeated-effort-removed [C]
  signal with **majority signal** *and* an acceptable [I] technical/security
  assessment (feasible read-only, minimum-data), **and**
- **no unresolved trust blocker** is severe enough that partners would refuse to
  store data even once the stated foundations exist.

### Revise (adjust the offer, capability set, or connection targets, then re-test)
- Signal is **mixed or split** (e.g. no package reaches majority signal, or
  must-have capabilities disagree across partners), **or**
- the valued connections have strong [C] demand but **fail the [I] feasibility or
  security assessment** as read-only/minimum-data in most cases, **or**
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
Completed sample size (3–5) and majority bar used:   e.g. 4 partners → 3 of 4
Partners contributing (labels only):                 e.g. A, B, C
Chosen first package (weighted score / [C] partner support / [I] basis+owner):
Must-have capabilities ([C] partner support):
Selected 2–3 connections ([C] demand + reported access / [I] feasibility+risk):
Unresolved trust blockers:
Threshold result:                                    Continue | Revise | Stop
Rationale (which signal was [C] customer evidence vs [I] internal judgement):
Next planning step (no build authorised):
Owner sign-off required before any implementation:   Yes
```
