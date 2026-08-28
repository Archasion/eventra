# Domain Model

The domain model describes business concepts independently of Drizzle/PostgreSQL implementation details.

```mermaid
erDiagram
  USER ||--o{ ORGANISATION_MEMBER : has
  ORGANISATION ||--o{ ORGANISATION_MEMBER : contains
  ORGANISATION ||--o{ EVENT : owns
  EVENT ||--o{ EVENT_SESSION : schedules
  VENUE ||--o{ SECTION : contains
  SECTION ||--o{ SEAT : contains
  EVENT_SESSION }o--|| VENUE : occurs_at
  EVENT_SESSION ||--o{ TICKET_TYPE : offers
  USER ||--o{ RESERVATION : creates
  EVENT_SESSION ||--o{ RESERVATION : receives
  RESERVATION ||--o{ RESERVATION_SEAT : contains
  SEAT ||--o{ RESERVATION_SEAT : claimed_as
  USER ||--o{ ORDER : places
  RESERVATION ||--o| ORDER : converts_to
  ORDER ||--o{ ORDER_ITEM : contains
  ORDER ||--o{ PAYMENT : has
  ORDER ||--o{ TICKET : issues
  TICKET }o--o| SEAT : assigns
  ORDER ||--o{ REFUND : may_have
```

## Ownership

An organisation owns events and controls staff access. An event contains scheduled sessions. A session occurs at a venue and exposes purchasable ticket types/inventory. A customer creates a reservation for one session. A successful checkout converts the reservation into an order; successful payment permits ticket issuance.

## Important distinctions

**Event vs session:** an event is the conceptual listing; a session is a particular occurrence at a time and venue. Inventory belongs to a session.

**Reservation vs order:** a reservation is temporary inventory ownership; an order is a commercial record. They have separate lifecycles.

**Seat vs inventory:** a seat describes physical layout. Availability is session-specific and must not be represented as a permanent `seat.available` flag.

**Payment vs order:** provider payment state and application order state are related but separate, allowing reconciliation and failure recovery.
