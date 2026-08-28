# ADR-003: Protect Seat Reservations with PostgreSQL Transactions

**Status:** Proposed  
**Date:** 2026-08-28

## Context

Multiple customers can attempt to reserve the same session seat concurrently. A check-then-write sequence without transactional protection can allow both requests to observe availability. Redis locks alone conflict with ADR-002's authority model.

## Decision

Reservation acquisition will execute inside a PostgreSQL transaction and use database-level concurrency controls so all requested seats are acquired atomically. The implementation will combine appropriate row locking and/or conditional writes with uniqueness constraints. The exact SQL shape and isolation level will be selected after integration/concurrency tests against PostgreSQL.

## Alternatives considered

**Application mutex:** only protects one Node process.  
**Redis distributed lock as authority:** introduces correctness dependency on Redis and lock-expiry edge cases.  
**Serializable transactions everywhere:** strongest generic isolation but may impose unnecessary contention/retry cost; will be considered against narrower locking.

## Consequences

Conflicts are expected application outcomes and need a stable `SEAT_UNAVAILABLE` response. Transactions should remain short and avoid external calls. Deadlock/serialization failures, if possible under the selected implementation, require bounded retry behavior. ADR status becomes Accepted once the concrete strategy is proven by integration/concurrency tests.
