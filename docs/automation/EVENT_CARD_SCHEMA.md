# Pour Social Event Card Schema

The Event Card is the core object for Pour Social event automation.

It turns a website inquiry, text, email, or phone note into a structured booking record that Nova can review and the human operator can approve.

## Event Card

```yaml
event_id: PS-YYYY-0001
lead_source: website_form | email | phone | referral | manual
lead_status: new_lead | needs_info | quote_ready | quoted | contract_sent | deposit_pending | booked | planning | staffing_pending | staff_confirmed | event_ready | completed | lost

client:
  name:
  phone:
  email:
  preferred_contact:

business_context:
  operator_notes:
  referral_source:
  priority: low | normal | high

event:
  type: wedding | corporate | private_party | graduation | birthday | holiday | other
  date:
  start_time:
  bar_service_start:
  bar_service_end:
  service_hours:
  location:
  venue_name:
  venue_contact:
  indoor_outdoor: indoor | outdoor | combination | unknown
  guest_count:
  drinking_guests:
  age_demographic:

service:
  package_requested: basic | signature | premium | unsure
  package_recommended:
  mobile_bar_needed: yes | no | unsure
  bartenders_recommended:
  travel_fee_needed: yes | no | unsure
  estimated_service_range:
  final_quote:

alcohol:
  plan: client_provides | client_preorders_pickup_requested | unknown
  drink_style: beer_wine | balanced | cocktail_focused | unknown
  preferred_menu:
  signature_cocktails:
  shopping_list_status: not_started | drafted | sent | confirmed
  alcohol_policy_confirmed: yes | no | unknown

venue_and_compliance:
  outside_bartending_allowed: yes | no | unknown
  alcohol_service_allowed: yes | no | unknown
  insurance_certificate_required: yes | no | unknown
  setup_access_time:
  parking_access:
  ice_available: yes | no | unknown
  water_access: yes | no | unknown
  glassware_available: yes | no | disposable | unknown
  venue_rules:

staffing:
  assigned_bartenders: []
  backup_bartenders: []
  staff_confirmation_status: not_started | requested | confirmed | backup_needed
  staff_packet_status: not_started | drafted | sent

risk_flags:
  - venue_alcohol_rules_unknown
  - guest_count_high
  - outdoor_weather_risk
  - alcohol_pickup_requested
  - insurance_certificate_required
  - setup_access_unclear
  - under_21_presence_possible

next_actions:
  - ask missing venue rules
  - draft quote
  - draft alcohol plan
  - send service agreement
  - collect deposit

nova_review:
  confidence: low | medium | high
  missing_information: []
  recommended_response:
  internal_notes:
```

## Required fields for initial quote draft

A quote draft should not be created unless these fields are known or explicitly marked as assumptions:

- client name
- email or phone
- event date
- event location or city
- event type
- guest count
- service hours or event time window
- package requested or package recommendation
- alcohol plan

## Required fields before booking confirmation

An event should not be considered booked until these are confirmed:

- service agreement sent
- deposit/payment terms confirmed
- venue allows outside alcohol service and/or bartending
- alcohol policy acknowledged by client
- staffing plan confirmed
- setup access confirmed
- event packet created

## Nova intake prompt

Use this prompt with any raw inquiry:

```text
Review this Pour Social event inquiry.
Create an Event Card using the schema.
Identify missing information.
Recommend package and staffing direction.
Flag compliance/risk questions.
Draft a professional client follow-up.
Do not send anything or make client commitments.
```
