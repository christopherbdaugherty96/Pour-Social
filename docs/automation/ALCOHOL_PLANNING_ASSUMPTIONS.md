# Pour Social Alcohol Planning Assumptions

This file is the canonical planning source for Pour Social website calculators, client planning guides, Nova prompts, and internal quote review.

These are planning estimates, not guarantees. Client behavior, venue rules, weather, event pacing, menu choice, and guest demographics can change actual consumption.

## Canonical model

| Assumption | Value |
| --- | ---: |
| Planning drinks per drinking guest per service hour | 0.95 |
| 750ml liquor bottle planning yield | 14 cocktails |
| Wine bottle planning yield | 5 glasses |
| Beer case planning yield | 24 beers |
| Staffing planning ratio | 1 bartender per ~60 guests |
| Ice planning range | 1–1.5 lb per guest |

## Why 0.95 drinks per guest per hour?

This keeps the public calculator aligned with the existing event examples where 100 drinking guests over 4 hours produce roughly 350–400 expected drinks.

Formula:

```text
total_drinks = drinking_guests × service_hours × 0.95
```

Example:

```text
100 guests × 4 hours × 0.95 = 380 estimated drinks
```

## Why 14 cocktails per 750ml bottle?

A 750ml bottle contains about 25.36 fluid ounces. At a theoretical 1.5 oz pour, it can produce about 16 cocktails. Pour Social uses 14 cocktails per bottle as a safer planning yield to account for:

- overpours
- spillage
- recipe variance
- batching loss
- event-speed inconsistency

## Default drink-style splits

### Balanced event

| Category | Share |
| --- | ---: |
| Beer | 40% |
| Wine | 30% |
| Cocktails | 30% |

### Beer and wine only

| Category | Share |
| --- | ---: |
| Beer | 55% |
| Wine | 45% |
| Cocktails | 0% |

### Cocktail-focused event

| Category | Share |
| --- | ---: |
| Beer | 20% |
| Wine | 20% |
| Cocktails | 60% |

## Client-facing disclaimer

Use this language near calculators and shopping lists:

> This is a planning estimate only. Clients provide alcohol and remain responsible for final purchase quantities. Pour Social helps estimate quantities based on guest count, service time, and menu style, but actual consumption may vary.

## Nova usage

Nova may use these assumptions to draft:

- event cards
- quote explanations
- alcohol shopping lists
- missing-info questions
- event packets

Nova must not present these estimates as guarantees or make alcohol purchase decisions for clients.
