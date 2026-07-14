# AGENTS.md

## Cursor Cloud specific instructions

### Product

`MYReSolve Executive Risk & Cost Assessment` (`MR-PRD-001`) is a single, self-contained
static web app. The entire product is `index.html` at the repo root — it embeds all CSS,
JavaScript, and the logo (base64) inline, so it has **no build step, no package manager,
no backend, and no runtime dependencies**. Persistence is browser `localStorage`. See
`README.md` and `PRODUCT_SPEC.md`.

Note: `index(2).html` is an older variant that references external `styles.css`, `app.js`,
and `assets/logo.jpeg` which are **not** present in the repo, so it is not runnable as-is.
Use `index.html`.

### Running (dev)

There is nothing to install or build. Serve the root over HTTP for GitHub Pages parity:

```bash
python3 -m http.server 8000   # then open http://localhost:8000/index.html
```

Opening `index.html` directly via `file://` also works. `python3` is already available.

### Lint / test / build

- **Lint:** none configured (no ESLint/Prettier, no `package.json`).
- **Test:** no automated test framework. Testing is manual — open the app, complete the
  assessment (5-level maturity + confidence per question), confirm the live "Executive
  Snapshot" scores update, then view the final results (maturity/risk scores, department
  breakdown, annual value at risk, 90-day priorities), and optionally CSV export / print.
- **Build:** none — `index.html` is shipped as-is. Deploy is GitHub Pages from `main` root.
