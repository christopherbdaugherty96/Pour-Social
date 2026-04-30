# NovaLIS Integration Model — Pour Social

Pour Social should integrate with NovaLIS as a governed event-operations workflow.

The goal is to let Nova act as an internal booking manager, event coordinator, and drafting assistant while the human operator keeps authority over client commitments, contracts, staff assignments, payment, and alcohol-related decisions.

## Business direction

Pour Social is not a solo-bartender business.

Pour Social is an event bar staffing and beverage planning company that:

- books private events, weddings, and corporate functions
- coordinates bartending staff
- guides beverage and alcohol quantity planning
- prepares event packets
- manages client communication drafts
- maintains brand standards for event execution

## Core workflow

```text
Lead comes in
-> Nova reviews inquiry
-> Nova creates Event Card
-> Nova identifies missing information
-> Nova drafts quote and follow-up
-> Human reviews and approves
-> Booking moves to contract/deposit
-> Nova prepares event packet
-> Human assigns staff
-> Staff executes under Pour Social standards
-> Nova drafts post-event follow-up
```

## Nova may help with

- reviewing new event inquiries
- creating structured Event Cards
- identifying missing information
- estimating package fit and staffing needs
- drafting quote explanations
- drafting client follow-up emails
- drafting staff availability messages
- preparing alcohol shopping estimates
- preparing mixer/garnish/equipment lists
- creating event packets
- tracking booking stages
- preserving venue/client/staff notes in governed memory
- drafting post-event thank-you and review-request messages

## Nova must not do without explicit approval

Nova must not autonomously:

- send client messages
- confirm event availability
- promise a bartender is assigned
- issue a final quote
- send contracts
- collect or request payment
- cancel an event
- hire, fire, or commit staff
- purchase alcohol
- sell alcohol
- approve alcohol pickup
- give final legal, insurance, or compliance determinations

## Authority model

Nova intelligence may expand, but execution authority stays bounded.

```text
Planning and drafting: allowed
External communication: draft-only until approved
Client commitments: approval required
Contracts and deposits: approval required
Staff assignments: approval required
Alcohol decisions: human-owned
```

## Event run states

Each event should be treated as a run with explicit state:

```text
new_lead
needs_info
quote_ready
quoted
contract_sent
deposit_pending
booked
planning
staffing_pending
staff_confirmed
event_ready
completed
lost
```

## Event run object

```yaml
run_id: PS-2026-0001
status: new_lead
current_step: review inquiry
next_step: ask missing venue and alcohol-policy questions
approval_required_for:
  - client response
  - final quote
  - contract
  - deposit request
  - staff commitment
  - alcohol pickup approval
stop_condition: event card and draft response prepared for human review
```

## First implementation level

The first version should remain lightweight:

1. Website form creates a structured event lead.
2. Form fallback opens a prepared email when no form backend is configured.
3. Event lead payload includes a Nova intake prompt.
4. Nova creates the event card and draft follow-up.
5. Human reviews and sends.

## Future Nova capability package

Potential future capabilities:

| Capability | Authority | Notes |
| --- | --- | --- |
| pour_social_event_card | read/write local | Creates structured event card from intake data |
| pour_social_quote_builder | draft-only | Produces quote draft and missing-info list |
| pour_social_alcohol_plan | draft-only | Produces planning estimate from canonical assumptions |
| pour_social_event_packet | draft-only | Produces staff/client event packet |
| pour_social_email_draft | confirm | Opens approved email draft only; no autonomous send |
| pour_social_staffing_review | draft-only | Suggests staff match; does not commit staff |

## Safety principle

Pour Social involves alcohol, events, liability, clients, venues, and staff. Automation must be useful but reviewable.

The intended operating principle is:

> Nova can manage the paperwork, thinking, and drafts. The human operator approves commitments.
