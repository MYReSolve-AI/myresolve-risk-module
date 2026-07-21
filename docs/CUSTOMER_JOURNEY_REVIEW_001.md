# Customer Journey Review 001

**Status:** Product Owner approved findings

**Review date:** 20 July 2026

**Implementation baseline:** `origin/main` at `ec3085d`

## Purpose

This record captures the end-to-end Product Owner walkthrough of the current MYReSolve experience, from the landing page and Organisation Profile through the assessment, answer review and executive dashboard.

The review established a clear product principle: MYReSolve must help leaders understand what matters without creating another reporting exercise. Scores and financial estimates must be easy to interpret, honest about their evidence and difficult to manipulate.

## Delivery boundaries

The findings are separated into three controlled groups.

### Group A: approved experience improvements

These changes can be made without redesigning the financial model, customer account architecture or paid subscription service:

- Add tailored plain-English guidance to all 24 assessment questions.
- Update the three question titles approved during the walkthrough.
- Apply the five-level colour scale to assessment answers and answer review.
- Remove the product version from the executive dashboard header.
- Explain the Executive Health Score and show its position on the MYReSolve maturity scale.
- Explain the Total Estimated Annual Value at Risk and its limitations.
- Present the Top Three Risk Areas as three spacious, colour-coded cards.
- Remove the deferred AI Executive Narrative panel.

### Group B: model and governance design required

These changes are approved in principle but must not be treated as cosmetic work:

- Remove confidence selection from all 24 questions.
- Remove the confidence multiplier from the value-at-risk calculation.
- Replace self-rated confidence with a separate Evidence and Assurance review by department.
- Record reviewer, review date, evidence status and missing information.
- Show `Self-assessed, not yet independently verified` until evidence is reviewed.
- Review possible overlapping exposure before presenting a combined annual value-at-risk total.
- Define how verified company financial data can produce company-specific estimates.

The model change must include a migration plan for existing browser-stored confidence answers and updated scoring tests. It must not silently replace the removed answers with a hidden default multiplier.

### Group C: paid product and integration design required

These capabilities form the proposed commercial journey and remain outside Group A:

`Free assessment -> Paid Value Mapping -> Consultancy or subscription tracking`

The paid design includes:

- Department-level company financial inputs and transparent value assumptions.
- Current KPI, acceptable tolerance, company target and target date.
- Historical score and KPI tracking.
- Customer NPS with sourced industry comparison where available.
- Trustpilot aggregate score, review count, company target and target date.
- Secure, server-side third-party integrations.
- Aggregated company measures rather than unnecessary employee or customer personal data.

## Approved journey findings

### Landing page

- Explain simply what MYReSolve does and why it was created.
- Establish credibility through 30 years of hands-on experience from frontline delivery to senior leadership.
- Use the proposition `You know your business. MYReSolve helps you see it clearly.`
- Add one authentic founder photograph near the experience story when a suitable image is available. Do not use stock or AI-generated photography.

### Organisation Profile

- Use a more engaging introduction that helps leaders bring their existing knowledge together.
- Move browser-local storage information to the bottom of every profile and review page.
- Rename `Organisation name` to `Company name`.
- Rename `Annual revenue band` to `Company size by annual revenue`.
- Rename `Number of operating locations` to `Number of sites`.
- Explain technical fields with two short lines covering what the measure means and what figure or period to enter.
- Support customer retention, repeat purchase rate, both, or not currently measured.
- Add `Customer service / contact centre` as an operating model, with relevant volume and future KPI wording.
- Relabel the primary operational constraint as `What is currently holding your operation back most?`
- Align the strategy section to the wording used in a company strategy, annual plan or leadership priorities.

### Assessment questions

- Retain the five answer levels from Critical to Leading.
- Use red, orange, amber, light green and dark green to make direction clear.
- Keep the number and label visible so colour is never the only meaning.
- Add a clear selected state with a strong outline.
- Replace the repeated generic instruction with tailored guidance for each question.
- Keep guidance neutral and focused on how the company operates today.
- Change `Do we eliminate or fix broken hand-offs?` to `Does work move smoothly between teams?`
- Change `Do we understand our customers deeply?` to `Do we understand what our customers need and experience?`
- Change `Are we easy to deal with at every touchpoint?` to `Can customers contact us easily, when and how they need to?`

### Answer review

- Use the same five-level colours as the assessment.
- Show number, rating label and colour for every answer.
- Keep unanswered questions and edit actions obvious.
- Remove per-question confidence when the Group B model change is implemented.

### Executive dashboard

- Remove the product version from the header.
- Show the Executive Health Score out of 100 and against the full five-level MYReSolve maturity scale.
- State that the result is based on 24 self-assessed responses across six company areas.
- State that the current score is not an industry benchmark.
- Label the financial headline `Total Estimated Annual Value at Risk`.
- Explain that it is an illustrative modelled estimate, not an audited loss calculation or financial forecast.
- Make clear that the total is currently formed from six department estimates using fixed scenario ranges.
- Present Top Three Risk Areas as three separate cards with rank, department, risk rating, Health Score, risk score, estimated value at risk, explanation and next action.
- Remove the deferred AI narrative until the knowledge base, evidence controls, security and review experience are designed.

### Evidence and assurance

- Replace one overall confidence label with `Evidence and assurance by department`.
- Use the statuses `Not reviewed`, `Partly evidenced` and `Evidence reviewed`.
- Keep assurance separate from Health Scores, risk ratings and financial calculations.

### Customer and brand measures

- Do not reduce the Customer department to financial value alone.
- Support NPS, retention or repeat purchase, complaints, first-contact resolution, satisfaction and an appropriate brand measure.
- Keep Trustpilot separate from NPS because they measure different things.
- Use Trustpilot's official API and aggregate public measures only.
- Show current TrustScore, review count, minimum acceptable score, company target, target date and a sourced industry reference where one is genuinely available.
- Never invent an industry comparison.

## Group A acceptance criteria

- All 24 questions retain stable identifiers and scoring order.
- Approved title changes and tailored guidance render correctly.
- Assessment and answer review use matching accessible colour semantics.
- Existing stored answers continue to load.
- Scoring formulas and confidence calculations remain unchanged in Group A.
- Dashboard version and deferred AI panel are absent.
- Health and financial explanations are visible without technical jargon.
- Top Three Risk Areas are separate responsive cards.
- Tests, lint, production build and route checks pass.

## Explicit exclusions from Group A

- Confidence data migration or formula changes.
- Evidence and assurance persistence.
- Company-specific value modelling.
- NPS benchmark data.
- Trustpilot API integration.
- Authentication, subscriptions, payments or cloud customer storage.
- Knowledge base or AI narrative implementation.
