# AI Task Brief and Handover

## Task brief

- **Task ID:** MR-ENG-008
- **Status:** Approved
- **Owner:** Product Owner
- **Builder:** Codex
- **Reviewer:** Product Owner
- **Desired customer or business outcome:** Make the MYReSolve marketing site and on-device assessment publicly accessible without sign-in so prospective leaders can try the assessment and self-select into early-access conversations.
- **Why this matters now:** The site, domains and SSL are live but gated behind ChatGPT sign-in. Public access lets the assessment support design-partner discovery while the subscription build remains paused.

### Acceptance criteria

- [ ] Marketing pages and the assessment load without a sign-in gate on `myresolve.uk` and `www.myresolve.uk`.
- [ ] Organisation Profile and assessment answers remain browser-local and are not sent to MYReSolve.
- [ ] MR-ENG-007 is excluded: no Evidence and Assurance navigation entry or public route, and `/evidence-assurance` returns 404.
- [ ] No subscription checkout is exposed; primary and subscription-related calls to action lead to the assessment, `/contact` or an approved scheduling destination.
- [ ] No authentication, billing, cloud storage, scoring or financial-model code is added or changed.
- [ ] Estimated Annual Value at Risk remains clearly labelled illustrative wherever it appears.
- [ ] The approved hero, results and Contact-page copy changes are present.
- [ ] Automated tests, lint and the production Sites build pass.

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

- **Status:** In progress
- **Builder branch:** `codex/public-launch`
- **Head commit:** Pending
- **Outcome delivered:** Pending
- **Files changed and why:** Pending
- **Checks run and results:** Pending
- **Checks not run and why:** Pending
- **Manual or visual evidence:** Pending Product Owner verification after publication.
- **Dependencies, migrations, configuration, or environment changes:** No dependency, migration or application environment changes planned. Sites access will change from custom to public after validation.
- **Known limitations or residual risks:** Assessment state remains specific to one browser and device.
- **Unresolved decisions:** Scheduling integration remains `/contact` until a scheduling link is approved.
- **No merge or deployment occurred:** Yes

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
