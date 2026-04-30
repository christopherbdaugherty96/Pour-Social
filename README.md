# Pour-Social

Starter marketing website and operations blueprint for Pour Social as an **event bar staffing & beverage experience company** with lightweight interactive planning tools:

- High-impact homepage and service highlights
- Event bar staffing and beverage planning positioning
- Drink menu sections
- Interactive event pricing dial
- Alcohol shopping calculator
- Booking intake form with email/Formspree-ready fallback behavior
- FAQ/planning assistant prototype
- NovaLIS event-operations automation docs

## Brand direction

Pour Social is positioned as the organizer, coordinator, and quality-control layer behind the event bar experience.

The business is not framed around one bartender personally working every event. Instead, the company:

- coordinates bartending staff for weddings, corporate events, and private parties
- guides menu planning and alcohol quantity planning
- manages mixers, garnishes, tools, setup expectations, and service flow
- delivers a polished branded experience through staffed event execution

## NovaLIS integration direction

Pour Social is intended to integrate with NovaLIS as a governed event-operations workflow.

Nova may help:

- review leads
- create structured Event Cards
- identify missing event information
- draft client follow-ups
- draft quote explanations
- prepare alcohol planning estimates
- generate staff/event packets
- track booking stages
- preserve client, venue, staff, and event notes

Nova may not autonomously:

- send client messages
- confirm bookings
- issue final quotes
- send contracts
- request deposits or payments
- assign or commit bartenders
- purchase or sell alcohol
- approve alcohol pickup
- make final legal, insurance, or compliance decisions

See `docs/automation/` for the working automation model.

## Run locally

Open `index.html` in a browser.

## Business document organization

All internal reference documents are consolidated under `docs/` and grouped by purpose:

- `docs/automation/` — NovaLIS event automation model, Event Card schema, booking pipeline, and canonical planning assumptions
- `docs/personal-startup/` — startup/legal setup and core business blueprint
- `docs/pricing/` — quote sheet and alcohol planning calculators
- `docs/menus/` — customer-facing menu collections
- `docs/client/` — intake and contract templates
- `docs/operations/` — event setup and operations manuals
- `docs/recipes/` — pre-batched cocktail recipe book
- `docs/legal/` — website legal notice
- `docs/brand/` — about-page narrative

## Current implementation status

This is a static website plus documentation-first operations system.

Current working surfaces:

- local static site
- package pricing estimator
- alcohol planning estimator
- booking form fallback to prepared event-lead email
- Nova intake prompt embedded in the event-lead payload
- automation documentation for governed booking workflows

Not implemented yet:

- real CRM/backend persistence
- autonomous email sending
- payment collection
- contract e-signature
- live staff scheduling
- legal/compliance verification automation
