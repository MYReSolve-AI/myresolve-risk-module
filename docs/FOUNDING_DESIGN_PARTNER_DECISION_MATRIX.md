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
sources are scored, recorded, and reported **separately** — never combined into a
single number:

- **[C] Customer-evidence factor** — scored only from the §6b committed aggregate
  in the discovery guide. Record the **aggregate count** of partners whose
  evidence supports the score (for example "3 of 4"). **Never record stable
  partner labels (A, B, C…) in this or any other committed file:** a label reused
  across buying, trust, reporting, and system themes can link one participant's
  answers and re-identify a person or company in a three-to-five sample. Labels
  belong only in private notes outside the repository, and small or distinctive
  cells are suppressed before the Owner approves what is retained.
- **[I] Internal-assessment factor** — scored from MYReSolve's own technical and
  readiness judgement (build effort, architecture dependencies, security and
  access feasibility). Record a short **internal basis and owner** in the
  decision record (§6). Do **not** use customer evidence to support an [I]
  factor: design partners cannot evidence internal build effort, architecture
  dependencies, or verified security feasibility.

| Score | Meaning ([C] = across partners; [I] = internal confidence) |
|------:|-----------|
| 0 | No support, or a clear negative ([C] partners did not want it / [I] not feasible) |
| 1 | Weak / single-partner signal, or low internal confidence |
| 2 | Clear signal from some partners, or moderate internal confidence |
| 3 | Strong repeated signal across most partners, or high internal confidence |

Each option produces **two separate results — never add them together:**

- **Customer-evidence subtotal [C]** = sum of ([C] factor score × weight). This is
  the **primary ranking**; it reflects customer demand only.
- **Internal-readiness gate [I]** = a **Pass / Concern / Fail** verdict read from
  the [I] factor scores, reported alongside the rank but never folded into it:
  - **Pass** — every [I] factor scores ≥ 2.
  - **Concern** — an [I] factor scores 1; may proceed only with the risk noted for
    the Owner.
  - **Fail** — any [I] factor scores 0; blocks Continue for that option until
    resolved.

There is **no combined [C]+[I] total**. A strong internal gate never lifts an
option's customer rank; it only says whether a customer-valued option is ready to
build. A [C] subtotal resting on a single partner is a hypothesis, not evidence
(see §5). Re-run the matrix whenever new discovery evidence arrives.

---

## 2. Matrix A — First paid package

Rank the candidate first offers (from `docs/SUBSCRIPTION_MVP_BRIEF.md` §3): a
**subscription**, **consultancy**, or a **combined** starting point.

**Customer-evidence factors [C]:** Demand strength (×3) · Willingness to adopt as
first paid step (×3) · Fit with a leader's felt problem (×2).
**Internal-assessment factors [I]** (unweighted 0–3 inputs to the gate):
Deliverability before the security/foundation gates · Independence from unbuilt
features.

| Candidate first package | Demand [C] ×3 | Adopt-first [C] ×3 | Problem fit [C] ×2 | **Customer subtotal [C]** | Deliverable [I] | Independence [I] | **Internal gate [I]** | Partner count [C] |
|-------------------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Subscription (tracking) | | | | | | | | |
| Consultancy (expert support) | | | | | | | | |
| Combined starter | | | | | | | | |

*Do not enter a price. Primary rank = customer subtotal [C]; the internal gate is
Pass/Concern/Fail and is never added to the rank. Record aggregate partner counts
only — never labels — and record each [I] gate's basis and owner in §6.*

---

## 3. Matrix B — Essential launch capabilities

Rank the proposed subscription capabilities (`docs/SUBSCRIPTION_MVP_BRIEF.md` §3.2
and §5) to separate "must have for a first paid pilot" from "later".

**Customer-evidence factors [C]:** Value to partners (×3) · Frequency of use (×2)
· Blocks adoption if absent (×3).
**Internal-assessment factors [I]** (unweighted 0–3 inputs to the gate): Build
effort before launch (**3 = low effort**) · Security/foundation dependency
(**3 = few dependencies**).

| Capability | Value [C] ×3 | Frequency [C] ×2 | Adoption-blocker [C] ×3 | **Customer subtotal [C]** | Low effort [I] | Few deps [I] | **Internal gate [I]** | Partner count [C] |
|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Secure account + one company workspace | | | | | | | | |
| Saved assessment history | | | | | | | | |
| Repeat assessment + comparison over time | | | | | | | | |
| KPI evidence (Current → Acceptable → Target) | | | | | | | | |
| Judgement-vs-evidence comparison | | | | | | | | |
| Invited leadership users | | | | | | | | |
| Downloadable progress reports | | | | | | | | |

**Reading the result:** rank by **customer subtotal [C]** (high value + high
adoption-blocker = candidate "must have"); the **internal gate [I]** then shows
whether a customer-valued capability is buildable now (Pass) or a "fast follow"
(Concern/Fail on effort or dependencies) — the gate never raises the customer
rank. Record aggregate partner counts only, never labels. The KPI layer keeps
leadership judgement and actual evidence visibly separate and must never blend
into the locked assessment score (`docs/SUBSCRIPTION_MVP_BRIEF.md` §8).

---

## 4. Matrix C — First two or three data connections

Rank candidate source-system connections against the low-effort data principle
("Connect once. Refresh automatically."). Use **system categories**, never a
named customer system with live data.

**Customer-evidence factors [C]:** Repeated-effort removed (×3) · Number of
partners who hold key KPIs there (×3) · Customer-reported access reality — how
hard *they* say read-only access is to grant (×2).
**Internal-assessment factors [I]** (unweighted 0–3 inputs to the gate): Technical
read-only + minimum-data feasibility · Security/permission risk (**3 = simplest &
lowest risk**).

| Connection category | Effort removed [C] ×3 | Partner spread [C] ×3 | Access reality [C] ×2 | **Customer subtotal [C]** | Tech feasibility [I] | Low risk [I] | **Internal gate [I]** | Partner count [C] |
|---------------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
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

Continue requires **both** sufficient customer evidence **and** an **acceptable
internal gate** for the chosen options — judged separately, both must hold. An
internal gate is **acceptable** when it is **Pass**, or a **Concern with the risk
explicitly noted for the Owner**; a **Fail** is never acceptable.

### Continue (proceed to the next planning step for the chosen option)
- **A clear first package** has the highest **customer-evidence subtotal [C]**
  with **majority-signal** support to adopt it as the first paid step, **and** its
  **internal gate [I] is acceptable** (as defined above), **and**
- **at least 2 capabilities** register as "must have" (high [C] value + high [C]
  adoption-blocker) with **majority signal**, each with an **acceptable internal
  gate [I]**, **and**
- **at least 2 connection categories** show strong repeated-effort-removed [C]
  signal with **majority signal** **and** an **acceptable internal gate [I]** —
  where read-only, minimum-data feasibility and security risk are Pass, or a
  Concern explicitly accepted by the Owner, **and**
- **no unresolved trust blocker** is severe enough that partners would refuse to
  store data even once the stated foundations exist.

### Revise (adjust the offer, capability set, or connection targets, then re-test)
- Signal is **mixed or split** (e.g. no package reaches majority signal, or
  must-have capabilities disagree across partners), **or**
- the valued connections have strong [C] demand but the **internal gate [I] is
  Fail or unresolved Concern** on read-only/minimum-data feasibility or security,
  **or**
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

Use aggregate counts only in this committed record — never stable partner labels.

```
Round / date band:
Completed sample size (3–5) and majority bar used:   e.g. 4 partners → 3 of 4
Number of partners contributing (count only):        e.g. 4
Chosen first package — customer subtotal [C] + partner count / internal gate [I] + basis & owner:
Must-have capabilities — customer subtotal [C] + partner count / internal gate [I]:
Selected 2–3 connections — [C] demand + reported access count / internal gate [I] (feasibility, risk):
Unresolved trust blockers:
Threshold result:                                    Continue | Revise | Stop
Rationale (customer evidence [C] and internal gate [I] stated separately):
Small or distinctive cells suppressed:               Yes | No
Owner approved this aggregate for retention:         Yes | No
Next planning step (no build authorised):
Owner sign-off required before any implementation:   Yes
```
