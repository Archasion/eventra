# Database Design

## Principle

PostgreSQL is the authoritative store for users, tenancy, events, session inventory, reservations, orders, payments, tickets and refunds. Correctness must survive Redis loss, Typesense staleness and client disconnection.

## Proposed tables

- `users`
- `oauth_accounts` / application session tables as required by the chosen auth implementation
- `organisations`
- `organisation_members`
- `venues`, `venue_sections`, `seats`
- `events`, `event_sessions`, `ticket_types`
- session-specific inventory representation
- `reservations`, `reservation_seats`
- `orders`, `order_items`
- `payments`, `processed_provider_events`
- `tickets`, `refunds`
- `audit_logs`

## Key modeling decisions

A physical `seat` does not contain a global availability flag. Availability is session-specific. The exact session-inventory table design will be finalized alongside the reservation implementation and recorded in ADR-003.

Orders store monetary snapshots (unit price, fees, discount, tax where applicable, currency) rather than recomputing historical totals from mutable event pricing.

Provider identifiers such as Stripe event/payment IDs require appropriate uniqueness constraints to support idempotency.

## Transactions

Transactions are required for operations that must change atomically, including seat acquisition, reservation completion, payment-event fulfillment, ticket admission and refund accounting.

## Constraints

Prefer database constraints for facts the database can enforce: primary keys, foreign keys, uniqueness, non-null requirements and valid relational ownership. Application checks alone are insufficient for concurrency-sensitive uniqueness.

## Indexing

Expected indexes include event publication/session dates, organisation ownership, reservation expiry/status, order user/status, provider event IDs, ticket validation identifiers and foreign-key lookup paths. Indexes will be justified by actual query plans rather than added indiscriminately.

## Deletion

Financial/audit records should generally not cascade-delete with a user/event. Personally identifying fields may require separate anonymization/deletion policy. Destructive cascades across orders/payments/tickets are avoided.

## Drizzle

Drizzle schemas and versioned migrations represent database structure. Production-like environments use committed migrations rather than ad-hoc schema synchronization.
