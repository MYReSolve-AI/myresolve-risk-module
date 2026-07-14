# MYReSolve migration plan — Phase 0 and Phase 1

## Goal

Migrate MYReSolve from a locked static HTML assessment prototype to a production-ready Next.js application **without losing** the approved v0.3 assessment behaviour.

Branding and user experience must not change unless explicitly instructed.

## Current status

| Phase | Status |
|-------|--------|
| Phase 0 — Freeze & inventory | **Complete** (this change set) |
| Phase 1 — Scaffold Next.js beside the prototype | **Complete** (placeholder only) |
| Phase 2 — Extract domain logic + golden tests | **In progress / complete pending review** |
| Phase 3 — Pixel/behaviour-faithful UI port | Not started |
| Phase 4 — App structure (still client-side parity) | Not started |
| Phase 5 — Production hosting hardening | Not started |
| Phase 6 — Product evolution (v0.4+) | Not started |

## Phase 0 — Freeze & inventory (done)

Objectives completed:

- Preserve `legacy/v0.3.1/index.html` as the immutable golden baseline.
- Store the v0.3.1 ZIP under `legacy/v0.3.1/archive/`.
- Remove incomplete `index(2).html` so it cannot be treated as a product version.
- Document the baseline in `docs/GOLDEN_BASELINE.md`.

## Phase 1 — Next.js scaffold (done)

Objectives completed:

- Create `apps/web` with Next.js App Router, TypeScript, ESLint and standard CSS / CSS Modules.
- No Tailwind.
- No assessment UI port yet.
- Placeholder homepage confirms: **MYReSolve Platform v1.0 migration environment**.

## Later phases (summary)

### Phase 2 — Extract pure domain logic
Move question bank and scoring into testable TypeScript modules. Add golden fixtures derived from `legacy/v0.3.1/index.html` so scores, ratings, costs and CSV output must match exactly.

### Phase 3 — Faithful UI port
Port layout, CSS, copy, navigation, live results, print and CSV with **no redesign**. Preserve localStorage key/schema during demos.

### Phase 4 — App structure without SaaS features
Optional route splitting only if UX remains identical. Keep computation client-side until parity is approved.

### Phase 5 — Production hardening
Env config, CI, asset handling (without visual change), accessibility that does not alter branding, preview deploy alongside the legacy reference.

### Phase 6 — Product evolution
Align with `ROADMAP.md` (v0.4 scoring engine, v0.5 reporting, v0.6 SaaS foundation, v1.0 commercial). Version scoring so v0.3 results never change silently.

## How to run

See the root `README.md` for commands to run:

1. the locked legacy prototype
2. the new Next.js application in `apps/web`

## Governance

- Golden baseline details: `docs/GOLDEN_BASELINE.md`
- Product roadmap: `ROADMAP.md`
- Working scoring notes (future): `SCORING_MODEL.md` — subordinate to locked code until v0.4 is approved
