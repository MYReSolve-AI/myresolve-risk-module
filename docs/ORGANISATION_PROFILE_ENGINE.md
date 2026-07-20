# Organisation Profile Engine

**Sprint:** MR-ENG-004 / Sprint 005
**Governing amendment:** MR-ENG-004-A1 (approved)
**Route:** `/organisation-profile`
**Storage key:** `myresolve_organisation_profile_v1`
**Schema version:** `2`

## Purpose

Capture the **minimum organisation context** needed to personalise future MYReSolve insights, cost modelling assumptions and Executive Briefings.

This sprint **captures context only**. It does **not** alter assessment scoring, risk ratings, cost-of-failure calculations, Health Score, confidence, prioritisation or Estimated Annual Value at Risk.

## Design principles

- Completion target under five minutes
- Less is more — only ask for information that improves the Executive Briefing
- One screen, one story, one action (one profile section at a time)
- Calm, premium and human
- Autosave and easy resume
- Separate from assessment answer storage

## Product journey

`/` → `/organisation-profile` → `/assessment` → `/dashboard`

| Surface | Behaviour |
|---------|-----------|
| Homepage | Primary Organisation Profile entry, then assessment and dashboard links |
| `/organisation-profile` | Sectioned profile capture with review and complete |
| `/assessment` | Accessible setup gate if the profile is incomplete; existing assessment answers are preserved |
| `/dashboard` | When a profile is **explicitly completed** (`completedAt` + fields), shows `organisation.name` as read-only **Company**; otherwise Company stays hidden. **Date** remains hidden |

## Field list and classification

### Organisation (required)

| Field | Governance |
|------|------------|
| Organisation name | required |
| Industry | required |
| Country | required |
| Number of employees (band) | required |
| Annual revenue band | required |
| Number of operating locations | required |
| Growth stage | required |

### Customers

| Field | Governance |
|------|------------|
| Customer type (B2B / B2C / Mixed) | recommended |
| Number of active customers | recommended |
| NPS | optional |
| Customer retention % | recommended |
| OTIF or service level % | optional |
| Complaint rate % | optional |

### Operations

| Field | Governance |
|------|------------|
| Operating models (multi-select) | required — at least one |
| Operating model “Other” description | required **only when** “Other” is selected |
| Number of sites or warehouses | recommended |
| Deliveries / orders / transactions per week | recommended |
| Outsourced operations | recommended |
| Capacity utilisation % | optional |
| Primary operational constraint | recommended |

#### Operating models (MR-ENG-004-A1)

| Aspect | Requirement |
|--------|-------------|
| **Label** | Which operating models apply? |
| **Helper text** | Select all that apply. |
| **Control** | Multi-select with keyboard-operable add and remove |
| **Selected display** | Removable chips; accessible names such as “Remove Manufacturing”; predictable focus after removal; no duplicates |
| **Validation** | At least one selection required; Other description required while Other is selected; removing Other clears its description |
| **Scoring impact** | **None** — business context only |

**Allowed values (stable `snake_case` IDs + display labels):**

| ID | Display label |
|----|---------------|
| `manufacturing` | Manufacturing |
| `retail` | Retail |
| `ecommerce` | E-commerce |
| `wholesale` | Wholesale |
| `distribution` | Distribution |
| `warehousing_fulfilment` | Warehousing and fulfilment |
| `transport_logistics` | Transport and logistics |
| `installation_field_services` | Installation/field services |
| `repairs_aftercare` | Repairs/aftercare |
| `customer_service_contact_centre` | Customer service / contact centre |
| `professional_services` | Professional services |
| `other` | Other |

### People

| Field | Governance |
|------|------------|
| Total headcount | required |
| Leadership team size | recommended |
| Employee turnover % | recommended |
| Absence rate % | optional |
| Engagement score (0–100) | optional |

### Finance

| Field | Governance |
|------|------------|
| Annual revenue band | optional (refinement; organisation revenue is canonical) |
| EBITDA margin band | recommended |
| Major cost pressures (multi-select) | recommended |

### Strategic priorities

| Field | Governance |
|------|------------|
| Strategic priority 1–3 | required |
| Biggest concern today | required |
| What success looks like in 12 months | required |
| Area that would create the greatest value if improved | required |

**Completion rule:** required and conditional fields (including Other description when Other is selected) must be filled **and** the user must explicitly select Complete, which records a valid `completedAt` timestamp. Recommended and optional fields never block. Autosaved field values alone do **not** unlock assessment entry or dashboard Company.

**Editing rule:** any field change on a completed profile clears `completedAt`, requiring explicit re-completion. A profile that still has `completedAt` but fails required/conditional validation is treated as incomplete until corrected and completed again.

## Storage schema

```ts
{
  schemaVersion: 2,
  organisation: { ... },
  customers: { ... },
  operations: {
    operatingModels: OperatingModel[], // multi-select A1 ids
    operatingModelOther: string,       // required when "other" selected
    // ...
  },
  people: { ... },
  finance: { costPressures: [], ... },
  strategicPriorities: { ... },
  updatedAt: string | null,
  completedAt: string | null
}
```

### Load-time normaliser (non-destructive)

- Key remains `myresolve_organisation_profile_v1`
- Saves always write `schemaVersion: 2` and the array shape only
- Accepts legacy singular `operatingModel` (schemaVersion 1 / deferred pre-A1):
  - **Known equivalent** → approved A1 machine ID (e.g. `service` → `professional_services`)
  - **Unmappable non-empty** (e.g. deprecated `hybrid`) → select `other` and preserve a **sanitised** copy of the original text in `operatingModelOther` (plain text only; tags/control characters stripped; truncated to 200 characters; never executed or rendered as markup)
  - **Empty or non-string** → no operating-model selection invented
- Preserves other valid profile fields
- Invalid `completedAt` strings are cleared to `null`
- Missing or malformed payloads → empty profile
- Unknown future `schemaVersion` → empty profile (does not crash)
- **Never** reads or writes `myresolve_answers_v03`

### Explicit completion (`completedAt`)

Downstream “completed profile” behaviour (assessment entry gate, dashboard Company, profile status) requires **all** of:

1. Current schema is valid (`schemaVersion: 2`)
2. All required and conditional fields are complete
3. `completedAt` holds a valid parseable completion timestamp

Autosave does not set `completedAt`. Completing from review does. Editing any field clears `completedAt` and requires explicit re-completion.

## Architecture

- Domain: `apps/web/src/domain/organisationProfile/`
- Persistence: `apps/web/src/lib/organisationProfilePersistence.ts`
- UI: `apps/web/src/features/organisation-profile/`
- No scoring or assessment domain mutations

## Privacy and data governance

Show near the first profile step / save area:

> Your Organisation Profile is saved only in this browser on this device. It is not synced to a cloud account. Anyone using this browser may be able to access it, and clearing browser data may remove it. Avoid entering unnecessary confidential or personal information.

Do **not** claim encryption, cloud backup, multi-device access or regulated data retention.

## Explicit note

> MR-ENG-004 / A1 captures organisation context only.
> It does not change assessment scoring, risk, cost modelling outputs, prioritisation or Executive Dashboard calculations.
> Dashboard **Company** is read-only display from a completed profile name. **Date** is not recorded in Sprint 005.

---

## Spec amendments

### Amendment A1 — Operating models multi-select (approved; implemented in Sprint 005)

| | |
|--|--|
| **ID** | MR-ENG-004-A1 |
| **Status** | **Approved — governing for Sprint 005** |
| **Recorded** | 2026-07-15 |
| **Implementation** | Sprint 005 Organisation Profile Engine |

**Summary:** Multi-select operating models (“Which operating models apply?” / “Select all that apply.”), removable chips, at-least-one validation, fixed option list including Other + conditional short description, array-backed `schemaVersion: 2` with safe singular→array load-time migration. Business context only — no direct assessment scoring impact.
