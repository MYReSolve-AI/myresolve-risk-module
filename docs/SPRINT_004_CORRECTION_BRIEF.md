# Sprint 004 correction brief

**Status:** Awaiting approval — **do not implement** until explicitly authorised.
**Scope:** MR-ENG-002 Executive Dashboard + MR-ENG-003 Assessment Module only.
**Out of scope:** Organisation Profile (Sprint 005 / MR-ENG-004), scoring engine changes, AI narrative generation, new product modules.

**Date:** 2026-07-15
**Source:** Post-visual CEO/executive review findings

---

## Finding 1 — Company and completion date blank while “Assessment completed: Yes”

### Root cause
Completion is derived only from answer completeness (`completedCount === 24`). Company and date are **props hardcoded as `"—"`** in `ExecutiveDashboardApp` because Sprint 004 has **no persisted company/date fields** in the assessment storage schema (`myresolve_answers_v03` stores only `answers` + `confidence`). There is no Organisation Profile wired into the dashboard (and that work remains deferred).

### Severity
**High** — erodes trust in the executive header; “Yes” with blank company/date looks broken.

### Recommended smallest correction
**Presentation-only within Sprint 004:**
- Keep completion logic as-is (domain-complete).
- Change empty company/date display to explicit unavailable copy, e.g. `Not captured` / `Not recorded`, **or** hide those meta items until data exists.
- Optionally add a subtle header note: company context arrives with Organisation Profile (Sprint 005) — without implementing profile.

Do **not** invent company names or fake dates. Do **not** unlock Organisation Profile to fix this.

### Acceptance criteria
- When assessment is complete, header never shows a bare/`—` company or date that looks like a data bug without explanation.
- Completion still correctly shows Yes / In progress / Not started from domain answers only.
- No change to `myresolve_answers_v03` schema required for this minimal fix (unless product later approves storing a display date — that would be a separate, explicit decision).

### Files likely affected
- `apps/web/src/features/executive-dashboard/components/ExecutiveDashboard.tsx`
- `apps/web/src/features/executive-dashboard/components/ExecutiveDashboardApp.tsx`
- Possibly `ExecutiveDashboard.module.css` (meta layout if hiding fields)

### Sprint 004 confirmation
**Yes** — UI honesty for missing context; no Organisation Profile implementation.

---

## Finding 2 — “Question 1 of 24” alongside “24 answered · 100% complete”

### Root cause
Two different concepts are shown without clear labels:
- **Question position** = current navigational index (`currentIndex + 1`), always “where you are in the flow.”
- **Answered count** = how many questions have valid responses (can be 24 while still viewing Q1 after restore/completion).

This is logical but **reads as contradictory** to executives because the UI does not distinguish “Current question” vs “Assessment progress.”

### Severity
**Medium** — correctness is fine; messaging is confusing.

### Recommended smallest correction
Relabel for clarity, e.g.:
- `Current question 1 of 24`
- `Assessment progress: 24 of 24 answered (100%)`

Optional: when 100% complete, show a calm “Assessment complete — reviewing answers” state on the progress header without changing navigation behaviour.

### Acceptance criteria
- A completed assessment restored on Q1 no longer appears self-contradictory.
- Progress bar still reflects answered %, not current index.
- Domain / storage behaviour unchanged.

### Files likely affected
- `apps/web/src/features/assessment/components/ProgressHeader.tsx`
- `ProgressHeader.module.css` (minor, if needed)
- Assessment tests that assert exact progress header text (`AssessmentApp.test.tsx`)

### Sprint 004 confirmation
**Yes** — assessment UX copy/clarity only.

---

## Finding 3 — Top-three priorities repeat the same generic wording

### Root cause
`PrioritiesList` appends a **fixed sentence** to every item:
“Prioritise evidence gathering, clear ownership and a 90-day improvement plan.”
Only department name / maturity / risk / cost vary. This was placeholder executive guidance from the legacy prototype pattern, not department-specific advice.

### Severity
**High** — board users perceive repetitive, non-specific recommendations as low quality.

### Recommended smallest correction
Remove the generic trailing sentence. Present priorities as **fact-based focus items** from domain data only, e.g.:
- Department name
- Maturity level + risk rating
- Estimated annual value at risk
Optional one-line framing: “Focus area” / “Highest risk exposure” without inventing interventions.

AI/custom recommendations remain **deferred** (not Sprint 004).

### Acceptance criteria
- Top three items no longer share identical recommendation prose.
- Content remains 100% domain-backed (ranking still from `topPriorities` / risk sort).
- No AI, no new scoring.

### Files likely affected
- `apps/web/src/features/executive-dashboard/components/PrioritiesList.tsx`
- Related dashboard component tests if they assert the old sentence

### Sprint 004 confirmation
**Yes** — dashboard copy cleanup; domain ranking unchanged.

---

## Finding 4 — Risk Heat Map and Department Score Cards duplicate information

### Root cause
Both sections render the same six departments with overlapping signals (health/maturity, risk rating, related metrics). MR-ENG-002 included both for density/coverage without a clear **single job** split for each section.

### Severity
**Medium** — visual redundancy, not incorrect data.

### Recommended smallest correction (choose one product line; recommend A)
**A (preferred, smallest):** Keep **Department Score Cards** as the detailed departmental section; demote/rename/simplify the “heat map” into a compact **Risk overview strip** (name + risk rating indicator only), **or** remove the heat-map section from the default view for Sprint 004 polish.
**B:** Keep the overview grid; collapse Department Score Cards into a secondary “Details” accordion (slightly more UX work).

Do not invent a chart library heat map in the minimal correction.

### Acceptance criteria
- Executive first screen no longer shows two near-identical department lists.
- Remaining department data still comes from the domain model.
- Highest-risk / priorities still work.

### Files likely affected
- `apps/web/src/features/executive-dashboard/components/ExecutiveDashboard.tsx`
- `RiskHeatMap.tsx` / `.module.css` and/or `DepartmentScoreCard.tsx`
- Dashboard tests asserting both sections

### Sprint 004 confirmation
**Yes** — information architecture / layout only within dashboard.

---

## Finding 5 — “Average factor 1.07” unexplained for executives

### Root cause
Assessment Confidence card surfaces the internal **cost multiplier** (`confidenceFactor` average from the locked engine: Low 1.15 / Medium 1.07 / High 1.00). That is engineer/domain language, not executive language. The card already shows predominant Low/Medium/High, but still exposes the raw factor.

### Severity
**High** — metrics without meaning reduce executive trust.

### Recommended smallest correction
Stop displaying the raw average factor in the executive UI. Lead with:
- Predominant confidence (Low / Medium / High)
- Optional: counts of Low / Medium / High (already present)
- Optional plain-language support line: “Confidence reflects how sure respondents were; lower confidence increases estimated value at risk.”

Keep factor math inside the domain / model layer (unchanged).

### Acceptance criteria
- No unexplained `1.07` (or similar) on the default dashboard.
- Confidence card remains interpretable in business language.
- Scoring / cost engine untouched.

### Files likely affected
- `apps/web/src/features/executive-dashboard/components/AssessmentConfidenceCard.tsx`
- Dashboard tests asserting “Average factor” / `1.07` text

### Sprint 004 confirmation
**Yes** — presentation only; domain confidence factors remain authoritative behind the scenes.

---

## Finding 6 — Executive Narrative appears unfinished (AI still deferred)

### Root cause
Narrative was built as a **large reserved centrepiece** with placeholder section shells (Executive Summary, Key Strengths, etc.). Without AI, it reads as an incomplete product area rather than an intentional “coming later” panel.

### Severity
**Medium** — expected given deferred AI, but current UI over-promises.

### Recommended smallest correction
Rewrite the panel as an intentional **reserved capability** for Sprint 007:
- Keep one premium card.
- Replace multi-section emptiness with a single clear statement that board narrative is deferred.
- Optionally list what inputs will feed it later (assessment results; future organisation profile) without implementing them.
- Reduce vertical dominance so it does not dominate above live metrics’ value (or keep lower as today, but stop looking half-built).

Do **not** generate fake recommendations or call an AI service.

### Acceptance criteria
- Narrative no longer looks like unfinished AI output.
- Explicitly deferred status is clear to executives.
- No AI implementation; no scoring change.

### Files likely affected
- `apps/web/src/features/executive-dashboard/components/NarrativePanel.tsx`
- `NarrativePanel.module.css`
- Dashboard tests looking for section titles if those are removed

### Sprint 004 confirmation
**Yes** — dashboard honesty for deferred AI; still within Sprint 004 polish.

---

## Finding 7 — “Risk Heat Map” is a card grid, not a conventional heat map

### Root cause
Naming mismatch. The component is a **department risk rating card grid** with colour indicators, not a matrix/heatmap visualisation. Labelled “Risk Heat Map” during MR-ENG-002 for executive “exposure at a glance,” which sets wrong expectations.

### Severity
**Low–Medium** — expectation gap; data can still be useful if rename/repurpose accompanies Finding 4.

### Recommended smallest correction
Rename to match the actual pattern, e.g. **Department Risk Overview** or **Risk Snapshot**. Align colour legend and copy accordingly. Combine with Finding 4 so the section has one clear job.

A conventional 2D heat map (e.g. department × factor matrix) is **not** required for Sprint 004 and risks noise against design principles.

### Acceptance criteria
- Section title matches the UI pattern (no “heat map” unless a true heat map ships).
- Still board-readable; no chart library required.
- Domain risk ratings unchanged.

### Files likely affected
- `RiskHeatMap.tsx` (rename component/file optional but recommended for consistency)
- `ExecutiveDashboard.tsx`
- Tests referencing `risk-heat-map` / “Risk Heat Map”

### Sprint 004 confirmation
**Yes** — naming / IA; optional simplify with Finding 4.

---

## Controlled implementation sequence (do not start until approved)

Execute as **one Sprint 004 polish PR**, ordered to reduce rework:

| Step | Findings | Intent |
|------|----------|--------|
| **1** | 5 | Confidence card: remove raw factor; executive language only |
| **2** | 3 | Priorities: remove generic repeated prescription |
| **3** | 7 + 4 | Rename risk overview; remove or sharply differentiate from department cards |
| **4** | 6 | Narrative: intentional deferred-capability panel |
| **5** | 1 | Header: honest empty company/date (or hide until available) |
| **6** | 2 | Assessment progress header: clarify current question vs completion |
| **7** | — | Run existing Sprint 004 tests; update assertions for copy/IA only; lint + build |

### Guardrails for the sequence
- **No** assessment domain scoring/formula changes.
- **No** Organisation Profile implementation or wiring.
- **No** AI narrative generation.
- **No** localStorage schema change unless Finding 1 later expands beyond this brief’s minimal UI fix (would need separate approval).
- Prefer copy/structure changes over new features.
- Keep MYReSolve brand tokens and calm executive aesthetic.

### Suggested out-of-brief (explicit non-goals)
- Building a real statistical heat map
- Department-specific AI recommendations
- Capturing company/date via Organisation Profile (Sprint 005)
- Changing confidence multipliers or cost engine

---

## Approval gate

**No implementation until this brief is approved** (or approved with amendments to the sequence/severityities).

When approving, please confirm especially:
1. Finding 4 option **A** (simplify/remove heat-map redundancy) vs **B** (keep overview, hide department details).
2. Finding 1: **relabel/hide** vs later storing a display date in assessment storage (not recommended in this brief).
