# MYReSolve

**Product ID:** MR-PRD-001  
**Locked assessment:** v0.3.1 (immutable golden baseline)  
**Platform workspace:** Next.js migration environment (`apps/web`)

A commercial SaaS platform in progress. The approved executive risk and cost assessment remains the locked v0.3 / v0.3.1 browser prototype until behavioural parity is formally approved.

> Leadership is a behaviour, not a job title.

## Repository layout

| Path | Purpose |
|------|---------|
| `legacy/v0.3.1/index.html` | Locked golden baseline assessment (do not edit) |
| `legacy/v0.3.1/archive/` | Official v0.3.1 ZIP snapshot |
| `apps/web` | Next.js App Router application (migration host) |
| `docs/GOLDEN_BASELINE.md` | Baseline behaviour contract |
| `docs/MIGRATION_PLAN.md` | Phased migration plan |
| `PRODUCT_SPEC.md` / `ROADMAP.md` / `SCORING_MODEL.md` | Product docs |

## Run the locked legacy prototype

No install required.

```bash
# Option A — open the file directly in a modern browser
open legacy/v0.3.1/index.html
# or on Linux: xdg-open legacy/v0.3.1/index.html

# Option B — serve the legacy folder over HTTP (recommended)
npx --yes serve legacy/v0.3.1
```

Then open the URL shown by `serve` (typically `http://localhost:3000`).

From the repo root you can also use:

```bash
npm run legacy
```

## Run the Next.js application

```bash
cd apps/web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The homepage is a placeholder:

**MYReSolve Platform v1.0 migration environment**

The assessment UI has **not** been ported yet.

Useful scripts (from `apps/web` or via root wrappers):

```bash
npm run lint    # ESLint
npm run build   # Production build
npm run start   # Serve production build
```

Root convenience scripts:

```bash
npm run web:dev
npm run web:lint
npm run web:build
```

## Governance

- The approved assessment design is **v0.3**. Release **v0.3.1** is packaging only.
- Do not change wording, styling, scoring, localStorage behaviour, CSV export, print behaviour or UX without instruction.
- Future migration work must preserve baseline behaviour until parity is formally approved — see `docs/GOLDEN_BASELINE.md`.
