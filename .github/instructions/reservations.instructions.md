---
applyTo: 'apps/api/**/reservation/**/*.ts,apps/api/**/*reservation*.ts,apps/worker/**/reservation/**/*.ts,apps/worker/**/*reservation*.ts,packages/db/**/*reservation*.ts,packages/db/**/*seat*.ts'
---

# Reservation Code Review Instructions

Reservation correctness is a high-risk Eventra invariant. Review these changes aggressively for race conditions and overselling.

## Authoritative state

- PostgreSQL is authoritative for seat ownership and reservation state.
- Redis locks, caches, pub/sub, browser state, and realtime state must not be the sole correctness mechanism.

## Acquisition

- Reservation acquisition must be atomic from the perspective of competing buyers.
- Look for unsafe read-check-write flows such as:
  1. query seat availability;
  2. observe available;
  3. later update without a concurrency guard.
- Concurrent requests must not create duplicate ownership of the same seat for the same event session.
- Successful reservations must never exceed available inventory.
- Ensure all seats in a multi-seat reservation are handled according to the intended all-or-nothing business rule.
- Check that transaction boundaries include every database operation needed for correctness.
- Do not assume application-instance serialization prevents concurrent requests.

## State

- Treat availability conceptually as AVAILABLE, HELD, or SOLD rather than a permanent boolean on the physical seat.
- Physical venue seats and event-session inventory must not be conflated.
- Reservation expiry must be represented authoritatively on the server.
- Client countdowns are UX only.
- A stale HELD reservation must not block inventory indefinitely.
- SOLD inventory must not be released by expiry logic.

## Expiry

- Expiration processing must be safe to retry.
- Two workers processing the same expired reservation must not double-release inventory.
- Expiry must not release a reservation that has already transitioned into a completed order.
- Review races between payment completion and reservation expiry carefully.

## Testing

Changes affecting acquisition correctness require concurrency-oriented integration tests against real PostgreSQL.

Important assertions include:

- successful ownership never exceeds available inventory;
- one seat cannot have two simultaneous owners;
- expired holds become available exactly when server-side rules allow;
- concurrent expiry/payment behavior preserves ownership invariants.

Do not accept mocked database tests as evidence of concurrency safety.
