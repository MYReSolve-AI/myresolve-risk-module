# Project Legacy Snapshot 001

**Status:** Approved post–Sprint 004 platform baseline
**Date:** 2026-07-15
**Tag:** `legacy-snapshot-001`
**Exact SHA:** `8d9d9ec8b9720a01b2f672563e07dd3125f993a7`
**Git message on tag:** Project Legacy Snapshot 001 — post-Sprint 004 approved baseline

This snapshot freezes the MYReSolve platform state on `main` after Phase 0–2 and Sprint 004 were merged. It is the reference point for subsequent delivery. **Sprint 005 (Organisation Profile) remains closed** and is not part of this snapshot.

---

## Scope included

### Phase 0–1 — Golden baseline and Next.js scaffold

- Locked assessment prototype under `legacy/v0.3.1/`
- Next.js App Router platform under `apps/web`
- Migration and baseline documentation

**Merged as:** [PR #1](https://github.com/MYReSolve-AI/myresolve-risk-module/pull/1)
**Key commit:** `85335ea` — freeze v0.3.1 baseline and scaffold Next.js platform

### Phase 2 — Assessment domain engine

- Pure domain modules for questions, maturity, confidence, costs, scoring, priorities, CSV
- Golden fixtures and behavioural parity tests
- Scoring parity documentation

**Merged as:** [PR #2](https://github.com/MYReSolve-AI/myresolve-risk-module/pull/2)
**Key commit:** `cf8c682` — feat: extract assessment domain engine with parity tests

### Sprint 004 — Executive experience

- Assessment module (`/assessment`)
- Executive Dashboard (`/dashboard`)
- Shared brand tokens, assessment persistence, test harness updates
- Visual-correction brief

**Merged as:** [PR #4](https://github.com/MYReSolve-AI/myresolve-risk-module/pull/4)
**Key commit:** `dfff7ccc7d53495b0c2ff2ee53e64dce120ed552` — complete Sprint 004 executive experience

---

## Locked v0.3.1 baseline references

| Item | Location |
|------|----------|
| Canonical baseline doc | `docs/GOLDEN_BASELINE.md` |
| Locked HTML prototype | `legacy/v0.3.1/index.html` |
| Content checksum (MD5) | `64e282b822c4bcd612bfa0e4ad8803aa` |
| Archive (where present) | `legacy/v0.3.1/archive/` |

Assessment wording, scoring behaviour, maturity/confidence factors and cost logic remain governed by this locked baseline and the Phase 2 domain engine extracted from it.

---

## Assessment domain-engine references

| Item | Location |
|------|----------|
| Domain package | `apps/web/src/domain/assessment/` |
| Parity documentation | `docs/SCORING_PARITY.md` |
| Parity / golden tests | `apps/web/src/domain/assessment/__tests__/`, `__fixtures__/` |

The domain engine is the sole source of assessment business logic for the platform surfaces in this snapshot.

---

## Product surfaces (Sprint 004)

| Route | Purpose |
|-------|---------|
| `/` | Platform entry / navigation |
| `/assessment` | One-question assessment flow → locked storage → dashboard |
| `/dashboard` | Executive dashboard consuming domain results only |

Supporting feature code:

- `apps/web/src/features/assessment/`
- `apps/web/src/features/executive-dashboard/`
- `apps/web/src/lib/assessmentPersistence.ts` (key `myresolve_answers_v03`)
- `apps/web/src/styles/brand.css`
- `docs/SPRINT_004_CORRECTION_BRIEF.md`

Storage schema for answers remains `{ answers, confidence }` only. Company / organisation context is **not** captured in this snapshot.

---

## Merged pull requests

| PR | Title | Role |
|----|--------|------|
| [#1](https://github.com/MYReSolve-AI/myresolve-risk-module/pull/1) | Phase 0–1 scaffold / baseline freeze | Foundation |
| [#2](https://github.com/MYReSolve-AI/myresolve-risk-module/pull/2) | Phase 2 assessment domain | Domain engine |
| [#4](https://github.com/MYReSolve-AI/myresolve-risk-module/pull/4) | Sprint 004 executive assessment and dashboard | Product experience |

All three were merged with **Create a merge commit** (not squash/rebase). Snapshot tip is the merge commit of PR #4 onto `main`.

---

## Post-merge verification (isolated `origin/main`)

Recorded against SHA `8d9d9ec8b9720a01b2f672563e07dd3125f993a7`:

| Check | Result |
|-------|--------|
| Tests | **34 passed** (6 files) |
| Lint | **Pass** |
| Production build | **Pass** |
| App routes | `/`, `/assessment`, `/dashboard` (plus framework `/_not-found`) |
| Organisation Profile on main | **Absent** |
| `git diff --check` | **Clean** |

---

## Open accepted dependency risk

**[Issue #5](https://github.com/MYReSolve-AI/myresolve-risk-module/issues/5)** — Track PostCSS [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93) until a stable Next.js fix.

- Moderate, transitive via `next@16.2.10`
- No direct runtime PostCSS use, user CSS input, or unsafe style embedding found at acceptance
- Do **not** run `npm audit fix --force` (proposes a breaking Next downgrade)
- Recheck before any production launch; upgrade when a compatible stable Next.js includes patched PostCSS

---

## Explicit exclusions

This snapshot does **not** include:

- **Organisation Profile** (route, domain, feature, persistence, or `docs/ORGANISATION_PROFILE_ENGINE.md`)
- **AI Executive Narrative** generation or AI advisor behaviour
- **Later scoring / financial formula changes** beyond locked v0.3.1 / Phase 2 parity behaviour
- Deferred local-only working documents not on `main` at this SHA (for example uncommitted project-status or parking-lot drafts)

---

## Sprint 005 status

**Sprint 005 — Organisation Profile Engine — remains closed.**
Do not begin Organisation Profile implementation until that sprint is explicitly unlocked. Any Organisation Profile artifacts existing only in a local deferred working tree are **outside** this snapshot and must not be treated as part of `main` or `legacy-snapshot-001`.

---

## How to check out this snapshot

```bash
git fetch origin tag legacy-snapshot-001
git checkout legacy-snapshot-001
# or
git checkout 8d9d9ec8b9720a01b2f672563e07dd3125f993a7
```
