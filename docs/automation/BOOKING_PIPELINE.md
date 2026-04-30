# Pour Social Booking Pipeline

This document defines the first automation workflow for Pour Social.

The business direction is to operate as a branded event bar staffing and beverage planning company. The human operator owns final commitments; Nova supports planning, drafting, review, and coordination.

## Pipeline overview

```text
Website inquiry
-> Event Lead payload
-> Nova Event Card
-> Missing-info review
-> Quote draft
-> Human approval
-> Client follow-up
-> Contract/deposit checklist
-> Staffing review
-> Event packet
-> Event execution
-> Post-event follow-up
```

## Stage 1 — New lead

Trigger:

- website booking form
- direct email
- text/call note
- referral
- manual entry

Output:

- structured Event Lead
- Nova intake prompt

Status:

```text
new_lead
```

## Stage 2 — Nova review

Nova creates:

- Event Card
- missing-information list
- package recommendation
- staffing recommendation
- risk flags
- client follow-up draft

Status:

```text
needs_info
quote_ready
```

## Stage 3 — Quote draft

Nova drafts:

- internal quote breakdown
- client-facing quote message
- assumption notes
- alcohol-planning note

Human approval is required before sending.

Status:

```text
quoted
```

## Stage 4 — Contract and deposit

Human-controlled actions:

- send agreement
- collect deposit
- confirm event date
- confirm payment terms

Nova may draft messages and checklists only.

Status:

```text
contract_sent
deposit_pending
booked
```

## Stage 5 — Staffing

Nova may suggest staff based on roster information, but it must not commit staff.

Nova can draft:

- bartender availability request
- staff confirmation message
- backup staff request

Human approval is required before any staff commitment.

Status:

```text
staffing_pending
staff_confirmed
```

## Stage 6 — Event packet

Nova prepares:

- client summary
- venue summary
- staff notes
- drink menu
- alcohol plan
- mixer/garnish list
- equipment list
- setup timeline
- responsible service reminders
- risk flags

Status:

```text
event_ready
```

## Stage 7 — Post-event

Nova drafts:

- thank-you message
- review request
- referral ask
- staff performance note
- event recap

Status:

```text
completed
```

## Automation boundaries

Allowed without extra approval:

- local calculations
- Event Card drafting
- checklist creation
- internal summary generation
- missing-info detection

Approval required:

- client messages
- final quotes
- contracts
- deposit requests
- staff assignments
- alcohol pickup approval
- cancellation or rescheduling

Blocked for now:

- autonomous client sending
- autonomous payment collection
- autonomous staff booking
- alcohol purchases
- legal/compliance final decisions
