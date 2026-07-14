# Scoring parity — v0.3.1 behavioural preservation

**Status:** Phase 2 domain extraction  
**Source of truth:** `legacy/v0.3.1/index.html`  
**Implementation:** `apps/web/src/domain/assessment/`

This document describes the formulas extracted for automated parity testing.  
**This is behavioural preservation of the locked prototype, not commercial or financial validation of the cost-of-failure model.**

---

## Extracted formulas

### Section maturity score

For department index `i`, over answered questions only:

```
avg = sum(maturityValues) / count
sectionScore = count === 0 ? 0 : Math.round(((avg - 1) / 4) * 100)
```

Legacy `sectionScore` counts a value when `Number(answers[key]) >= 1` (unanswered / zero ignored).  
Legacy `answered()` used for confidence averaging and completion requires `1 <= value <= 5`.

### Section risk score

```
sectionRisk = 100 - sectionScore
```

### Section confidence factor (cost multiplier)

For answered questions only (`answered(key)`):

```
factor = average(confidenceFactor[key] || medium)
confidenceFactor(section) = answeredCount === 0 ? 1 : factor
```

### Section estimated annual cost (GBP)

```
riskRatio = sectionRisk / 100
[lo, hi] = department.cost
sectionCost = Math.round((lo + (hi - lo) * riskRatio) * confidenceFactor)
```

### Overall maturity score

Mean of `sectionScore` for departments that have **at least one** answered question:

```
overallScore = activeSections.length
  ? Math.round(sum(activeSectionScores) / activeSections.length)
  : 0
```

Departments with no answers are excluded from the overall average (even though their `sectionScore` is 0).

### Risk rating (from maturity score)

| Maturity score | Rating |
|---------------:|--------|
| ≥ 80 | `LOW` |
| ≥ 60 | `MODERATE` |
| ≥ 40 | `HIGH` |
| else | `CRITICAL` |

### Maturity band name (from maturity score)

| Maturity score | Name |
|---------------:|------|
| ≥ 88 | Leading |
| ≥ 63 | Strong |
| ≥ 38 | Established |
| ≥ 13 | Developing |
| else | Critical |

### Priority ranking

1. Consider departments with at least one answered question.
2. Sort by `sectionRisk` descending.
3. Top priorities = first 3 of that list.
4. Priority count = number of ranked departments with `sectionScore < 60`.

Equal-risk ties keep relative department order (stable sort).

### CSV export structure

Header (exact):

```
Department, Maturity Score, Maturity Level, Risk Rating, Estimated Annual Cost
```

- One data row per department (all six), **including unanswered departments**.
- Cells quoted; `"` escaped as `""`.
- Download filename: `MYReSolve_Executive_Maturity_Risk_Assessment.csv`
- Unanswered departments export score `0`, level `Critical`, rating `CRITICAL`, and cost equal to the department **high** band (risk 100%, confidence factor 1).

---

## Exact thresholds and factors

### Maturity input values

| Value | Label |
|------:|-------|
| 1 | Critical |
| 2 | Developing |
| 3 | Established |
| 4 | Strong |
| 5 | Leading |

### Confidence cost multipliers (v0.3.1 code)

| Value | Label | Factor |
|-------|-------|-------:|
| `low` | Low | **1.15** |
| `medium` | Medium | **1.07** |
| `high` | High | **1.00** |

Default when maturity is selected without a confidence choice: **medium**.

### Department cost ranges (GBP assumptions)

| Department | Low | High |
|------------|----:|-----:|
| People | 750,000 | 1,500,000 |
| Process | 1,000,000 | 2,200,000 |
| Customer | 1,200,000 | 2,800,000 |
| Operations | 800,000 | 1,800,000 |
| Technology | 400,000 | 1,000,000 |
| Finance | 600,000 | 1,400,000 |

---

## Confidence behaviour

- Confidence **scales estimated annual cost**, it does not adjust maturity score.
- Lower confidence **increases** cost (Low = ×1.15).
- High confidence leaves the interpolated cost unchanged (×1.00).
- Section factor = mean of per-answer factors for answered questions only.
- This differs from the future reliability approach sketched in `SCORING_MODEL.md` for v0.4.

---

## Assumptions inherited from v0.3.1

- Fixed department order and question wording (24 questions).
- Answer keys: `` `${sectionIndex}-${questionIndex}` ``.
- localStorage key: `myresolve_answers_v03` (documented for parity; persistence not exercised in Phase 2 unit tests).
- Cost ranges are illustrative scenario inputs, not company-specific finance data.
- Currency display formatting (`en-GB` GBP) remains a UI concern; domain CSV exports raw numeric cost.

---

## Known limitations / legacy ambiguities

1. **Overall score `0` is falsy in the UI.** An empty assessment and an all-Critical assessment both yield `overallScore === 0`. The prototype UI treats falsy scores as “Not yet scored” / `—`, so those two states look alike in some labels even though ranked departments and costs differ.
2. **`sectionScore` vs `answered()` bounds.** `sectionScore` includes any `v >= 1`; `answered()` also requires `v <= 5`. Out-of-range values above 5 would diverge if ever present in storage.
3. **CSV always includes unanswered departments** with high-band cost, while live “total cost” and priorities only include departments with answers.
4. **Equal risk ranking** depends on stable sort / original order; tests lock People → … → Finance for uniform scenarios.
5. **`SCORING_MODEL.md` must not override this document** until a later version is formally approved.

---

## Explicit statement

> Phase 2 extracts and tests the locked v0.3.1 calculation behaviour for migration safety.  
> Passing these tests proves **behavioural parity with the prototype**, not that cost figures are commercially validated, auditable, or suitable as financial advice.

Do not change these formulas during UI porting unless a new product version is approved and golden fixtures are regenerated under that version.
