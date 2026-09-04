# Auto-deploy for myresolve.uk (Cloudflare)

On push to main, GitHub Actions runs `npm run sites:build` and deploys the worker
(dist/server/index.js) + assets (dist/client) to Cloudflare via Wrangler, using
wrangler.toml. Worker name: myresolve-site.

Secrets required (already added): CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID.

Safe: until a custom domain is attached to the myresolve-site worker, it deploys to
myresolve-site.<subdomain>.workers.dev and does not affect the live site.

Cutover: Cloudflare -> Workers & Pages -> myresolve-site -> Settings -> add custom
domain myresolve.uk. After cutover, stop deploying this site via Codex Sites.
Rollback: re-point the domain, or roll back the worker deployment.
api.myresolve.uk (booking worker) is separate and unaffected.
