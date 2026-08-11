import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const exportedSite = resolve(root, "apps/web/out");
const dist = resolve(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, "client"), { recursive: true });
await mkdir(resolve(dist, "server"), { recursive: true });
await cp(exportedSite, resolve(dist, "client"), { recursive: true });

const worker = `const HTML_ROUTES = new Set([
  "/assessment",
  "/contact",
  "/dashboard",
  "/organisation-profile",
]);

function assetRequest(request, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  return new Request(url, request);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    if (pathname === "/") pathname = "/index.html";
    else if (HTML_ROUTES.has(pathname)) pathname = pathname + ".html";

    const response = await env.ASSETS.fetch(assetRequest(request, pathname));
    if (response.status !== 404) return response;

    return env.ASSETS.fetch(assetRequest(request, "/404.html"));
  },
};
`;

await writeFile(resolve(dist, "server/index.js"), worker);

const hosting = await readFile(resolve(root, ".openai/hosting.json"), "utf8");
JSON.parse(hosting);
