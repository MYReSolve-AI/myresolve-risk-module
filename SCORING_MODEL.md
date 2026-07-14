# Scoring model — working specification

## Maturity conversion

| Response | Maturity | Base risk |
|---|---:|---:|
| Critical | 1 | 100% |
| Developing | 2 | 75% |
| Established | 3 | 50% |
| Strong | 4 | 25% |
| Leading | 5 | 0% |

## Confidence adjustment

Confidence should influence the reliability of the result rather than simply inflate the risk score.

Suggested approach for v0.4:

- High confidence: reliability 100%
- Medium confidence: reliability 85%
- Low confidence: reliability 65%

Low-confidence answers should be flagged for validation in the executive report.

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
