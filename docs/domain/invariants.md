# Domain Invariants

Invariants are properties the system must preserve regardless of concurrency, retries or partial failures.

| ID      | Invariant                                                                                            | Primary protection                                |
| ------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| INV-001 | A seat cannot be sold to two orders for the same session.                                            | PostgreSQL transaction + constraints/locking      |
| INV-002 | A seat cannot belong to two simultaneously effective holds for the same session.                     | PostgreSQL transactional inventory model          |
| INV-003 | A reservation contains inventory from exactly one session.                                           | Schema/FK validation + service validation         |
| INV-004 | A payment-provider event produces its business effect at most once.                                  | Unique provider event ID + transaction            |
| INV-005 | An order cannot be paid twice.                                                                       | State transition checks + idempotency/constraints |
| INV-006 | Order monetary snapshots do not change after purchase.                                               | Application policy + immutable update path        |
| INV-007 | A ticket is issued only from an eligible paid order.                                                 | Transactional fulfillment logic                   |
| INV-008 | A ticket can be successfully admitted at most once.                                                  | Atomic conditional database update                |
| INV-009 | A refund cannot exceed captured refundable value.                                                    | Transactional refund validation                   |
| INV-010 | Organisation A cannot read/write Organisation B's private resources through identifier manipulation. | Server-side object/tenant authorization           |

Redis, Typesense, browser state and WebSocket messages are never sufficient to establish these invariants.
