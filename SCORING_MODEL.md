# Scoring model — working specification

## Maturity conversion

| Response | Maturity | Base risk |
|---|---:|---:|
| Critical | 1 | 100% |
| Developing | 2 | 75% |
| Established | 3 | 50% |
| Strong | 4 | 25% |
| Leading | 5 | 0% |

## Confidence and assurance

**Decision status:** Product Owner approved and locked — 11 August 2026.
Changes require a new recorded Product Owner decision and corresponding
migration and test updates.

The future product uses two related but separate measures:

1. **Overall self-rated confidence** — one Low, Medium or High rating recorded
   after the assessment to express how well the respondent believes the answers
   reflect company practice.
2. **Department-level Evidence and Assurance** — a subsequent review of each
   department using the statuses Not reviewed, Partly evidenced and Evidence
   reviewed, supported by reviewer, review date, evidence and missing
   information.

The overall confidence rating is the bridge from leadership judgement to
evidence review. It is not a statistical reliability percentage. Evidence and
Assurance validates the assessment but does not silently replace or blend with
leadership judgement.

Neither measure changes the Health Score, Risk Score or Estimated Annual Value
at Risk. The executive report should use risk, overall confidence and assurance
status to prioritise which departments require validation first.

The locked v0.3.1 baseline still contains per-question confidence factors for
behavioural parity. Removing those factors requires an explicit migration plan
and updated scoring tests.

## Cost-of-failure engine

Future calculation inputs may include:

- Revenue
- EBITDA
- Employee count
- Payroll
- Customer volume
- Average order value
- Customer churn
- Rework and failure-demand volume
- Operational downtime

Every cost assumption must be visible, editable and auditable.
