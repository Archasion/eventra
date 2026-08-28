# Testing Strategy

Testing is organized around business risk rather than maximizing raw coverage percentage.

## Unit tests

Pure pricing calculations, state transition guards, authorization policies, Zod schemas, discount/refund rules and other deterministic domain logic.

## Integration tests

Run against real PostgreSQL (and Redis/Typesense where behavior depends on them) for reservation transactions, Drizzle queries, tenant authorization, webhook idempotency, ticket validation and search indexing. Avoid mocking away the database for concurrency-sensitive behavior.

## End-to-end tests

Critical browser journeys: OAuth test strategy where practical, browse event → select seats → reserve → Stripe test checkout → order/ticket view; organiser creates/publishes event; staff validates ticket.

## Concurrency tests

Dedicated tests issue simultaneous requests/transactions and assert invariants, not merely response counts. These are required before ADR-003 is accepted.

## Load tests

Measure throughput, p50/p95/p99 latency, error/conflict rate and resource behavior at increasing concurrency. Reservation conflicts caused by exhausted inventory are expected business outcomes and should be distinguished from system errors.

## Security tests

Cross-tenant ID manipulation, role escalation, unauthenticated procedures, webhook signature failures, replay, rate limits and invalid ticket scans.

## CI policy

Pull requests should run formatting/linting, TypeScript type checking, unit tests, relevant integration tests and build. Heavier E2E/load suites may run on selected branches/schedules once execution cost warrants separation.

## Test data

Tests use synthetic identities/events and Stripe test mode. Never use real customer/payment data.

## Principle

Published benchmark results must include test environment/methodology and must be measured rather than fabricated.
