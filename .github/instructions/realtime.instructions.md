---
applyTo: 'apps/api/**/realtime/**/*.ts,apps/api/**/*websocket*.ts,apps/api/**/*socket*.ts,apps/api/**/*pubsub*.ts,apps/web/**/realtime/**/*.ts,apps/web/**/*websocket*.ts,apps/web/**/*socket*.ts'
---

# Realtime Code Review Instructions

Realtime is a UX synchronization mechanism, not an authoritative transactional store.

- PostgreSQL remains authoritative for seat ownership and transactional state.
- Clients must tolerate missed, duplicated, delayed, and reordered realtime messages.
- A websocket event must not itself prove reservation ownership.
- Realtime availability should be reconciled with authoritative API results when correctness matters.
- Do not make successful checkout or reservation depend on every realtime subscriber receiving an event.
- Publish state changes only after the authoritative database transaction has committed.
- Avoid broadcasting state that may later roll back.
- Channels must be scoped appropriately, such as by event session where relevant.
- Review channel subscription authorization if messages contain non-public information.
- Prevent users from subscribing to tenant-private channels solely by guessing identifiers.
- Reconnect behavior should tolerate state becoming stale while disconnected.
- UI should handle seats changing from apparently available to unavailable when the authoritative reservation request executes.
- Redis Pub/Sub may distribute events but must not become the source of truth.
