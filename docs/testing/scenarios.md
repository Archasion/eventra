# Critical Test Scenarios

## Reservations

- **TS-RES-001:** available seat → reservation HELD.
- **TS-RES-002:** two customers request one seat concurrently → exactly one succeeds.
- **TS-RES-003:** 100 customers request one seat → exactly one effective hold.
- **TS-RES-004:** multi-seat request containing one unavailable seat → entire request fails with no partial hold.
- **TS-RES-005:** hold reaches expiry → becomes EXPIRED and inventory becomes reservable.
- **TS-RES-006:** completion races expiry → exactly one legal outcome; no duplicate ownership.
- **TS-RES-007:** stale browser requests already-held seat → `SEAT_UNAVAILABLE`.

## Authorization

- **TS-AUTH-001:** unauthenticated customer cannot access protected order.
- **TS-AUTH-002:** customer A cannot access customer B's order by ID.
- **TS-AUTH-003:** organisation A manager cannot update organisation B event by ID.
- **TS-AUTH-004:** event manager cannot grant platform-admin privilege.
- **TS-AUTH-005:** venue staff cannot perform unrelated organisation administration.

## Payments

- **TS-PAY-001:** valid Stripe success event finalizes eligible order once.
- **TS-PAY-002:** same webhook delivered twice → one business effect.
- **TS-PAY-003:** invalid signature → rejected with no state mutation.
- **TS-PAY-004:** browser success redirect without webhook/provider confirmation → order is not assumed paid.
- **TS-PAY-005:** amount/currency mismatch → no fulfillment and reconciliation path is triggered.
- **TS-PAY-006:** ticket/email worker failure after payment → payment remains recorded; job can retry.

## Tickets

- **TS-TKT-001:** valid ticket scan → VALID becomes USED.
- **TS-TKT-002:** two concurrent scans → exactly one succeeds.
- **TS-TKT-003:** second scan → `TICKET_ALREADY_USED`.
- **TS-TKT-004:** refunded/cancelled ticket → rejected.
- **TS-TKT-005:** ticket for different session → rejected where session-specific validation applies.

## Search and dependencies

- **TS-SRCH-001:** published event is indexed and discoverable after indexing completes.
- **TS-SRCH-002:** stale Typesense state never overrides PostgreSQL checkout/inventory truth.
- **TS-DEP-001:** Redis unavailable → correctness remains intact, degraded features fail safely.
- **TS-DEP-002:** Resend unavailable → paid order succeeds and email job retries.
- **TS-DEP-003:** Stripe unavailable during checkout creation → no order is falsely marked paid.
