# ADR-002: PostgreSQL Is the Inventory Source of Truth

**Status:** Accepted  
**Date:** 2026-08-28

## Context

Eventra will use PostgreSQL and Redis. Seat reservation correctness must survive process crashes, Redis eviction/restart and concurrent demand. Using Redis as the only ownership record would require additional durability/reconciliation mechanisms and could split authoritative state between systems.

## Decision

PostgreSQL is authoritative for session inventory ownership, reservations, orders and tickets. Redis may support caching, rate limiting, pub/sub and ephemeral coordination, but a Redis value never proves ownership or sale of inventory.

## Alternatives considered

**Redis-authoritative holds:** fast and convenient for TTLs, but complicates durable correctness and recovery.  
**Dual authority:** rejected because disagreement requires choosing an authority anyway and creates difficult failure modes.

## Consequences

Reservation paths incur transactional database work and must be carefully indexed/load-tested. Redis loss may degrade performance/realtime behavior but must not create duplicate ownership. Expiration can use Redis as an accelerator, while PostgreSQL timestamps/state remain authoritative.
