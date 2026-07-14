# MYReSolve golden baseline — v0.3.1

## Locked reference

**Release:** v0.3.1  
**Product ID:** MR-PRD-001  
**Canonical file:** `legacy/v0.3.1/index.html`  
**Archive snapshot:** `legacy/v0.3.1/archive/MYReSolve_Risk_Module_v0.3.1_GitHub_Hotfix.zip`  
**Content checksum (MD5):** `64e282b822c4bcd612bfa0e4ad8803aa`  
**Status:** Immutable golden baseline

v0.3.1 is a packaging and deployment hotfix only. The approved assessment design, wording, styling, scoring experience and maturity model remain the locked **v0.3** product baseline.

Do not edit `legacy/v0.3.1/index.html` except under an explicit governance decision that supersedes this document.

## localStorage behaviour

| Item | Value |
|------|--------|
| Key | `myresolve_answers_v03` |
| Payload shape | `{ answers: Record<string, number>, confidence: Record<string, string> }` |
| Answer keys | `` `${sectionIndex}-${questionIndex}` `` (e.g. `0-0` … `5-3`) |
| Answer values | Maturity integers `1`–`5` |
| Confidence values | `low` \| `medium` \| `high` (default when unset: `medium`) |

Persistence is browser-local only. There is no server-side storage in v0.3.1.

## Six departments (24 questions)

Each department has **4** questions (6 × 4 = **24**).

### 1. People
Intro: Assess leadership depth, role clarity, capability and accountability.  
Estimated annual cost range (GBP): 750,000 – 1,500,000

1. Do we have the right people in the right roles?
2. Are teams clear on what good performance looks like?
3. Do we invest in people consistently?
4. Is accountability clear and reinforced?

### 2. Process
Intro: Assess simplicity, consistency, hand-offs and continuous improvement.  
Estimated annual cost range (GBP): 1,000,000 – 2,200,000

1. Are our core processes simple, standard and followed?
2. Do we eliminate or fix broken hand-offs?
3. Is duplication or unnecessary work actively removed?
4. Do we measure and improve key processes?

### 3. Customer
Intro: Assess customer understanding, resolution, effort and lifetime value.  
Estimated annual cost range (GBP): 1,200,000 – 2,800,000

1. Do we understand our customers deeply?
2. Are we easy to deal with at every touchpoint?
3. Do we resolve issues first time?
4. Are we creating loyalty rather than handling demand?

### 4. Operations
Intro: Assess visibility, capacity, asset use and operating discipline.  
Estimated annual cost range (GBP): 800,000 – 1,800,000

1. Do we have clear end-to-end operational visibility?
2. Are we planning effectively and flexing fast enough?
3. Are assets, space and people used well?
4. Do we have a culture of continuous improvement?

### 5. Technology
Intro: Assess whether systems, data and automation help people perform.  
Estimated annual cost range (GBP): 400,000 – 1,000,000

1. Does technology help rather than hinder teams?
2. Do systems talk to each other?
3. Do leaders have the right data to make decisions?
4. Are we automating the right things?

### 6. Finance
Intro: Assess cost-to-serve, reporting confidence and investment discipline.  
Estimated annual cost range (GBP): 600,000 – 1,400,000

1. Do we understand the true cost of serving customers?
2. Are forecasts and reports trusted?
3. Is commercial discipline consistently strong?
4. Are we investing in the right areas?

## Five maturity levels

| Value | Name |
|------:|------|
| 1 | Critical |
| 2 | Developing |
| 3 | Established |
| 4 | Strong |
| 5 | Leading |

## Confidence factors currently used (v0.3.1 code)

These factors are taken from the locked `index.html` implementation. They affect estimated annual cost calculation (not a separate reliability score):

| Confidence | Label | Factor |
|------------|-------|-------:|
| `low` | Low | 1.15 |
| `medium` | Medium | 1.07 |
| `high` | High | 1.00 |

Note: `docs` / `SCORING_MODEL.md` describes a future v0.4 reliability approach. Migration work must implement the **code behaviour above** until a later version is formally approved.

## Behaviour preservation rule

Until behavioural parity with this golden baseline is **formally reviewed and approved**:

1. Do not change assessment wording, styling, scoring logic, localStorage key/schema, CSV export, print behaviour or user experience.
2. Treat `legacy/v0.3.1/index.html` as the source of truth over any conflicting prose in working specs.
3. Future Next.js port work must match this baseline before product evolution (v0.4+) begins.
4. Incomplete alternate shells (e.g. former `index(2).html`) are not valid product versions and must not be used as references.
