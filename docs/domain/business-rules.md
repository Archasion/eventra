# Business Rules

## Reservations

- **BR-RES-001:** A reservation belongs to exactly one event session.
- **BR-RES-002:** A reservation request is atomic: either all requested seats are held or none are.
- **BR-RES-003:** The default hold duration is 10 minutes and is server-configurable.
- **BR-RES-004:** The server's expiry timestamp is authoritative; client countdowns do not extend a hold.
- **BR-RES-005:** Sold inventory cannot be newly reserved.
- **BR-RES-006:** A customer may hold at most 8 tickets in one reservation unless event policy says lower.
- **BR-RES-007:** An expired/cancelled reservation cannot be used to start a new successful purchase without reacquiring inventory.

## Pricing and orders

- **BR-ORD-001:** Prices are calculated server-side from authoritative configuration.
- **BR-ORD-002:** Order items store immutable price/currency snapshots.
- **BR-ORD-003:** An order belongs to one customer and one reservation/session purchase context.
- **BR-ORD-004:** An order cannot become paid more than once.

## Payments

- **BR-PAY-001:** Stripe webhook/provider verification determines final payment confirmation, not browser navigation.
- **BR-PAY-002:** Every processed provider event is idempotent.
- **BR-PAY-003:** Payment amounts/currency must match the expected order before fulfillment.
- **BR-PAY-004:** A retry must not duplicate the commercial outcome.

## Tickets

- **BR-TKT-001:** Tickets are issued only for eligible paid orders.
- **BR-TKT-002:** A reserved seat produces at most one valid ticket for a session.
- **BR-TKT-003:** Successful admission changes a VALID ticket to USED atomically.
- **BR-TKT-004:** USED, REFUNDED or CANCELLED tickets cannot be successfully admitted.

## Events

- **BR-EVT-001:** Only published, active sessions can accept new customer reservations.
- **BR-EVT-002:** Cancelling a session prevents new reservations and triggers required downstream cancellation/refund/notification workflows.
- **BR-EVT-003:** Changes that would invalidate sold inventory are restricted after sales begin.

## Tenancy

- **BR-AUTH-001:** Organisation membership does not grant access to another organisation.
- **BR-AUTH-002:** Resource IDs are never sufficient authorization by themselves.
- **BR-AUTH-003:** Platform-admin privileges are distinct from organisation roles.
