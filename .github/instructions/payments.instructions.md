---
applyTo: 'apps/api/**/payment/**/*.ts,apps/api/**/*payment*.ts,apps/api/**/stripe/**/*.ts,apps/api/**/*stripe*.ts,apps/worker/**/payment/**/*.ts,apps/worker/**/*payment*.ts,packages/db/**/*payment*.ts,packages/db/**/*order*.ts,packages/db/**/*refund*.ts'
---

# Payment Code Review Instructions

Payment code is a high-risk boundary. Review for idempotency, authoritative state, partial failures, and reconciliation.

## Stripe trust boundary

- Stripe webhook processing is authoritative for payment completion.
- A frontend redirect or checkout success page must never mark an order as paid.
- Webhook signatures must be verified before trusting the event.
- Secret Stripe keys and webhook secrets must remain server-only.

## Idempotency

- Duplicate webhook delivery must not duplicate payment, order, ticket, email, or refund effects.
- Provider event IDs should be persisted or otherwise handled with durable idempotency.
- Review replay behavior explicitly.
- Mutations that may be retried must not accidentally capture or refund money twice.

## Ordering and retries

- Do not assume webhook events arrive once or in order.
- Review behavior for late and out-of-order events.
- Reprocessing an already-handled final state should be safe.
- Temporary downstream failures should not corrupt the payment state machine.

## Orders

- Reservation state and order state are separate concepts.
- Purchased prices and currency must be immutable snapshots.
- Never trust totals submitted by the browser.
- Server-side order construction must derive totals from authoritative pricing rules.
- Order status transitions must reject impossible or unsafe regressions.

## Partial failures

Review explicitly for:

- payment succeeds but ticket generation fails;
- payment succeeds but notification fails;
- payment succeeds after the browser closes;
- webhook delivery is delayed;
- reservation expires near payment completion;
- provider sends a duplicate event;
- captured payment cannot be fulfilled.

A captured payment that cannot be fulfilled must enter a visible reconciliation/refund path rather than disappearing into an inconsistent state.

## Refunds

- Refund processing must be idempotent.
- Refunded amounts must never exceed refundable amounts.
- Partial refunds must preserve correct remaining order/payment state if supported.
- Ticket validity must reflect refunds according to documented business rules.

## Testing

Webhook idempotency and payment persistence should be integration-tested.

Tests should cover duplicate events, invalid signatures, repeated processing, and meaningful failure/retry paths.
