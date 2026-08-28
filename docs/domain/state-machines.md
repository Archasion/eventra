# State Machines

Only explicit transitions are legal. Application services should reject unsupported transitions rather than silently coercing state.

## Event

```mermaid
stateDiagram-v2
  [*] --> DRAFT
  DRAFT --> PUBLISHED
  PUBLISHED --> CANCELLED
  PUBLISHED --> COMPLETED
  DRAFT --> CANCELLED
```

## Reservation

```mermaid
stateDiagram-v2
  [*] --> HELD
  HELD --> COMPLETED: purchase finalized
  HELD --> EXPIRED: deadline reached
  HELD --> CANCELLED: released
```

`EXPIRED → COMPLETED` and `CANCELLED → COMPLETED` are illegal without creating/reacquiring a valid hold.

## Order

```mermaid
stateDiagram-v2
  [*] --> PENDING
  PENDING --> PAID
  PENDING --> FAILED
  PENDING --> CANCELLED
  PAID --> PARTIALLY_REFUNDED
  PAID --> REFUNDED
  PARTIALLY_REFUNDED --> REFUNDED
```

## Payment

```mermaid
stateDiagram-v2
  [*] --> PENDING
  PENDING --> PROCESSING
  PROCESSING --> SUCCEEDED
  PROCESSING --> FAILED
  PENDING --> FAILED
  SUCCEEDED --> PARTIALLY_REFUNDED
  SUCCEEDED --> REFUNDED
  PARTIALLY_REFUNDED --> REFUNDED
```

Provider-specific statuses are mapped into domain states rather than leaked throughout business logic.

## Ticket

```mermaid
stateDiagram-v2
  [*] --> VALID
  VALID --> USED
  VALID --> CANCELLED
  VALID --> REFUNDED
```

USED is terminal for admission purposes. Refund policy for an already-used ticket is a separate commercial decision and must not make it valid again.
