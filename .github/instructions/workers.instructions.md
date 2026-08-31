---
applyTo: 'apps/worker/**/*.ts'
---

# Worker Code Review Instructions

Review asynchronous worker changes for retry safety, idempotency, observability, and durable correctness.

- Assume a job may execute more than once.
- Jobs with side effects must be idempotent or protected by durable idempotency mechanisms.
- Never rely on process memory to record completed work.
- A worker crash between steps must not leave the system silently inconsistent.
- Review ordering assumptions between jobs and external events.
- Retry transient failures with bounded retry/backoff behavior where appropriate.
- Permanent failures should become observable rather than retrying forever.
- Avoid swallowing exceptions that should trigger retry or operational visibility.
- Logging must include useful correlation identifiers without exposing secrets.
- Worker logic must re-check authoritative database state before executing sensitive side effects.
- Reservation expiry must remain safe if two workers process the same reservation.
- Ticket/email generation retries must not duplicate durable business effects.
- Notification failures must not incorrectly roll back an already successful payment.
- External API retries must consider whether the provider operation itself is idempotent.
- Worker shutdown should not intentionally abandon in-flight work without the queue's retry/recovery mechanism.
- Browser state and websocket connections must not be required for worker correctness.
