# AI Task Brief and Handover

## Task brief

- **Task ID:** MR-ENG-008
- **Status:** Ready for owner
- **Owner:** Product Owner
- **Builder:** Codex
- **Reviewer:** Product Owner
- **Desired customer or business outcome:** Make the MYReSolve marketing site and on-device assessment publicly accessible without sign-in so prospective leaders can try the assessment and self-select into early-access conversations.
- **Why this matters now:** The site, domains and SSL are live but gated behind ChatGPT sign-in. Public access lets the assessment support design-partner discovery while the subscription build remains paused.

### Acceptance criteria

- [x] Marketing pages and the assessment load without a sign-in gate on `myresolve.uk` and `www.myresolve.uk`.
- [x] Organisation Profile and assessment answers remain browser-local and are not sent to MYReSolve.
- [x] MR-ENG-007 is excluded: no Evidence and Assurance navigation entry or public route, and `/evidence-assurance` redirects to the public 404 page.
- [x] No subscription checkout is exposed; primary and subscription-related calls to action lead to the assessment, `/contact` or an approved scheduling destination.
- [x] No authentication, billing, cloud storage, scoring or financial-model code is added or changed.
- [x] Estimated Annual Value at Risk remains clearly labelled illustrative wherever it appears.
- [x] The approved hero, results and Contact-page copy changes are present.
- [x] Automated tests, lint and the production Sites build pass.

### Scope

- **Included:** Make the current site public; retain the founder-image fix; update hero, results and Contact-page copy; remove subscription calls to action; verify CTA destinations; keep MR-ENG-007 absent; update tests and documentation.
- **Excluded:** MR-ENG-007 implementation, uploads, accounts, billing or checkout, cloud persistence, server-side customer-data collection, KPI changes, scoring changes and financial-model changes.
- **Owned paths:** Site access configuration, marketing and assessment-result components, CTA copy and routing, related tests, and this task record.
- **Shared or sensitive paths:** Access control changes are limited to the final Sites policy switch. Assessment persistence and scoring are read-only for this task.

### Risk and stop conditions

- **Customer data involved:** No new collection. Organisation Profile and assessment answers remain on-device.
- **Authentication involved:** Yes — remove the site-wide visitor gate only after the private deployment has passed verification; add no application authentication.
- **Payments or billing involved:** No. All conversion routes lead to assessment or conversation, never checkout.
- **Security or production infrastructure involved:** Yes — the final reversible Sites access change makes the validated marketing and assessment build public.
- **Destructive or difficult-to-reverse action involved:** No. Public access can be reversed by restoring custom access.
- **Other stop conditions:** Stop if launch requires server-side data collection, new authentication, billing, cloud persistence, scoring or financial-model changes, or inclusion of MR-ENG-007.

### Git isolation

- **Base branch:** `main`
- **Base commit:** `0d13968c53b378908c260cddc68e8fc1d4618d6a`
- **Builder branch:** `codex/public-launch`
- **Builder worktree:** `/private/tmp/myresolve-public-launch.53sICc`
- **Integration plan for shared files:** Preserve the standalone founder-image fix; do not merge or cherry-pick the MR-ENG-007 prototype branch.

### Verification agreement

- **Focused checks:** Copy and CTA tests; browser-local assessment persistence tests; explicit absence of the prototype route and navigation.
- **Full review checks:** Full web test suite, lint and production Sites build.
- **Manual or visual evidence required:** Product Owner verifies both domains signed out or in an incognito window, completes the assessment, confirms CTA destinations and confirms `/evidence-assurance` is unavailable.

### Approval

- **Approved by:** Product Owner
- **Approval date:** 11 August 2026
- **Approved scope notes:** Include the Contact-page nudge, preserve the founder-image fix, publish and verify the approved build before the final public access switch, and keep MR-ENG-007 completely excluded.

## Builder handover

- **Status:** Ready for review
- **Builder branch:** `codex/public-launch`
- **Head commit:** `6762a331632fcb7ba8412e033c983648fded6a36` plus this handover record commit.
- **Outcome delivered:** The marketing site and browser-local assessment are public on both custom domains, with early-access positioning and a results-to-conversation CTA. MR-ENG-007 is absent.
- **Files changed and why:** Hero content and tests; assessment completion CTA, privacy wording, styling and tests; Contact-page nudge and tests; founder-image preservation; task documentation.
- **Checks run and results:** Focused checks passed 37/37; full web suite passed 105/105; ESLint passed without warnings; TypeScript and production build passed; packaged-route checks confirmed the prototype and checkout links are absent; identity-less requests returned 200 for both domains and routed `/evidence-assurance` to `/404`.
- **Checks not run and why:** The Product Owner's full assessment walkthrough in a signed-out or incognito browser remains the final manual acceptance step.
- **Manual or visual evidence:** Identity-less access verified for `https://myresolve.uk/` and `https://www.myresolve.uk/`; `https://myresolve.uk/evidence-assurance` resolves to the public 404 page.
- **Dependencies, migrations, configuration, or environment changes:** No dependency, migration or application environment changes. Sites access changed from custom to public after the validated deployment succeeded.
- **Known limitations or residual risks:** Assessment state remains specific to one browser and device.
- **Unresolved decisions:** Scheduling integration remains `/contact` until a scheduling link is approved.
- **No merge or deployment occurred:** No — no GitHub merge occurred; Sites version 4 was deployed and public access was enabled with explicit Product Owner approval.

## Reviewer report

- **Reviewer:** Product Owner
- **Reviewed commit or branch:** Pending
- **Compared with base commit:** `0d13968c53b378908c260cddc68e8fc1d4618d6a`
- **Blocking findings:** Pending
- **Non-blocking findings:** Pending
- **Acceptance criteria result:** Pending
- **Residual risk:** Pending
- **Recommendation:** Pending

## Owner decision

- **Decision:** Pending
- **Decision notes:** Pending
- **Merge explicitly approved:** No
- **Deployment explicitly approved:** Yes — private validation deployment followed by the reversible public access switch.
