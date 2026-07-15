# Project Legacy Snapshot 002

**Status:** Approved post–Sprint 005 platform baseline
**Date:** 2026-07-15
**Tag:** `legacy-snapshot-002`
**Exact SHA:** `bcf4426dfbb4135b56de420be38e0dc18bb0ccb1`
**Git message on tag:** Project Legacy Snapshot 002 — post-Sprint 005 approved baseline

This snapshot freezes the MYReSolve platform state on `main` after Sprint 005 (Organisation Profile Engine) and the Operating Manual were merged. It supersedes Snapshot 001 as the current approved baseline while **preserving** Snapshot 001 as the preceding frozen post–Sprint 004 reference.

**Preceding frozen baseline:** Project Legacy Snapshot 001 — tag `legacy-snapshot-001` → peeled commit `8d9d9ec8b9720a01b2f672563e07dd3125f993a7`.

---

## Scope included beyond Snapshot 001

### Operating Manual (MR-DOC-004)

- Product operating guidance for current surfaces and vocabulary
- Updated for Sprint 005 Organisation Profile journey and persistence boundary

**Merged as:** [PR #7](https://github.com/MYReSolve-AI/myresolve-risk-module/pull/7)
**Key documentation commit:** `887fe42222f58cb78179d0ef63b2216fc92711f2`

### Sprint 005 — Organisation Profile Engine

- Organisation Profile route, domain, feature UI and browser-local persistence
- MR-ENG-004-A1 multi-select operating models (chips, Other description, stable IDs)
- Explicit profile completion (`completedAt`) and Assessment setup gate
- Dashboard **Company** display from a completed profile name (contextual only)
- Specification: `docs/ORGANISATION_PROFILE_ENGINE.md`
- Operating Manual alignment for the pre-assessment context step

**Merged as:** [PR #8](https://github.com/MYReSolve-AI/myresolve-risk-module/pull/8)
**Key feature commit:** `067e848641585d9ed6d1c5c6b00dc3eb01164876`
**Merge commit (this snapshot tip):** `bcf4426dfbb4135b56de420be38e0dc18bb0ccb1`

Snapshot 001 contents (Phase 0–2, Sprint 004 assessment and dashboard, locked v0.3.1 domain) remain in this tip as ancestors.

---

## Provenance

| Item | Reference |
|------|-----------|
| Preceding snapshot | `legacy-snapshot-001` → `8d9d9ec8b9720a01b2f672563e07dd3125f993a7` |
| Operating Manual PR | [#7](https://github.com/MYReSolve-AI/myresolve-risk-module/pull/7) — commit `887fe42222f58cb78179d0ef63b2216fc92711f2` |
| Organisation Profile PR | [#8](https://github.com/MYReSolve-AI/myresolve-risk-module/pull/8) — tip commit `067e848641585d9ed6d1c5c6b00dc3eb01164876` |
| Snapshot 002 / `main` tip | Merge commit `bcf4426dfbb4135b56de420be38e0dc18bb0ccb1` (Create a merge commit of PR #8 onto `main`) |

---

## Approved product routes

| Route | Purpose |
|-------|---------|
| `/` | Platform entry; Organisation Profile is the primary journey CTA |
| `/organisation-profile` | Organisation Profile Engine (context capture) |
| `/assessment` | Assessment module; gated until profile is **explicitly** completed |
| `/dashboard` | Executive dashboard; domain scoring + optional Company name |

---

## Organisation Profile (Sprint 005) — frozen behaviour

| Topic | Recorded behaviour |
|-------|--------------------|
| Spec | `docs/ORGANISATION_PROFILE_ENGINE.md` (MR-ENG-004 / A1) |
| Schema | `schemaVersion: 2` |
| Storage key | `myresolve_organisation_profile_v1` (browser-local only; not cloud-synced) |
| Assessment isolation | Assessment remains on `myresolve_answers_v03`; profile must never write that key |
| Completion | Requires current schema, required/conditional fields complete, **and** valid `completedAt` |
| Assessment gate | Incomplete / non-explicit profiles see an accessible setup gate; answers are preserved |
| Editing | Any profile field change clears `completedAt` until Complete is selected again |
| Dashboard Company | Shows `organisation.name` only for a valid explicitly completed profile; read-only context |
| Assessment Date | Remains **unavailable** / hidden — no completion-date persistence in this snapshot |
| Scoring impact | **None** — profile does not change Health Score, maturity, confidence, Risk Score, risk rating, prioritisation or Estimated Annual Value at Risk |

Operating-model A1 interaction (summary): multi-select “Which operating models apply?” / “Select all that apply.”, removable accessible chips, at-least-one required, Other with required short description, snake_case machine IDs with approved display labels.

---

## Locked assessment domain (unchanged from Snapshot 001 lineage)

| Item | Location |
|------|----------|
| Domain package | `apps/web/src/domain/assessment/` |
| Parity documentation | `docs/SCORING_PARITY.md` |
| Golden / parity tests | `apps/web/src/domain/assessment/__tests__/`, `__fixtures__/` |
| Assessment storage | `myresolve_answers_v03` → `{ answers, confidence }` |

Isolated verification of PR #8 recorded **zero bytes** of change under `apps/web/src/domain/assessment/` relative to the preceding `main` baseline. No assessment scoring, risk, confidence, priority or VaR formula changes are included in this snapshot.

---

## Post-merge / isolated verification (recorded at acceptance)

Against tip `bcf4426dfbb4135b56de420be38e0dc18bb0ccb1` / feature tip `067e848…` as exercised for Sprint 005 merge:

| Check | Result |
|-------|--------|
| Full tests | **80 passed** (11 files) |
| Lint | **Pass** |
| Production build | **Pass** |
| App routes | `/`, `/organisation-profile`, `/assessment`, `/dashboard` (plus framework `/_not-found`) |
| Assessment-domain diff vs preceding main | **0 bytes** |
| Golden scoring parity | **Pass** |
| `git diff --check` | **Clean** (on feature merge set) |

---

## Open accepted dependency risk

**[Issue #5](https://github.com/MYReSolve-AI/myresolve-risk-module/issues/5)** — Track PostCSS [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93) until a stable Next.js fix.

- Remains **OPEN** at Snapshot 002
- Moderate, transitive via `next@16.2.10`
- Do **not** run `npm audit fix --force`
- Recheck before any production launch

---

## Explicit exclusions

This snapshot does **not** include:

- Cloud accounts, authentication or cloud synchronisation of Organisation Profile
- Multiple organisations / multi-tenant account models
- AI recommendations or generated executive narrative content
- PDF or board-report generation as a finished product
- Assessment completion-date persistence (Dashboard **Date** remains hidden)
- Off-repo pre-A1 workspace backup material under `/opt/cursor/artifacts/workspace-deferred-pre-a1-20260715/` (or equivalent) — that archive is **not** part of the product snapshot

---

## How to check out this snapshot

```bash
git fetch origin tag legacy-snapshot-002
git checkout legacy-snapshot-002
# or
git checkout bcf4426dfbb4135b56de420be38e0dc18bb0ccb1
```

To inspect the preceding post–Sprint 004 freeze:

```bash
git fetch origin tag legacy-snapshot-001
git checkout legacy-snapshot-001
# peeled commit: 8d9d9ec8b9720a01b2f672563e07dd3125f993a7
```
