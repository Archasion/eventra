---
applyTo: 'apps/api/**/ticket/**/*.ts,apps/api/**/*ticket*.ts,apps/worker/**/ticket/**/*.ts,apps/worker/**/*ticket*.ts,packages/db/**/*ticket*.ts'
---

# Ticket Code Review Instructions

Review ticket changes for admission correctness, atomic state transitions, and lifecycle consistency.

- Ticket state is authoritative in PostgreSQL.
- Valid admission must atomically transition a ticket from VALID to USED.
- Two concurrent scans of one VALID ticket must produce exactly one successful admission.
- Avoid separate "check valid" and later "mark used" operations without an atomic concurrency guard.
- USED tickets must not be admitted again.
- CANCELLED tickets must not be admitted.
- REFUNDED tickets must not be admitted.
- Ticket validity must remain consistent with order/refund/cancellation state.
- Cache or realtime state must never override authoritative validation.
- QR/barcode contents must not expose unnecessary sensitive internal information.
- Do not treat possession of a ticket identifier alone as authorization for unrelated account data.
- Ticket-generation retries must not create duplicate independently valid tickets for one purchased entitlement unless explicitly intended.
- Validation failures should distinguish normal business rejection from internal system errors where appropriate.
- Changes to ticket admission require a concurrent double-scan test against authoritative storage.
