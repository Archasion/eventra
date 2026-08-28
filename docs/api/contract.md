# API Contract

Eventra uses **tRPC** as the primary application API, hosted by Express. Zod schemas define procedure input/output boundaries. This document records the logical public contract; implementation types should remain the executable source of truth.

## Conventions

- Procedures are grouped by domain router.
- Authentication identity is derived server-side from the application session.
- Organisation/resource authorization occurs inside the server procedure/service, never from client role claims.
- Inputs are validated with Zod.
- Mutations with duplicate-risk business effects use idempotency semantics where appropriate.
- Errors expose stable application codes rather than database/provider details.

## Proposed routers

### `auth`

`me`, OAuth/session-related application operations as required.

### `events`

`list`, `bySlug`, `create`, `update`, `publish`, `cancel`.

### `venues`

`list`, `get`, `create`, `update`, seating-layout operations.

### `sessions`

`get`, `availability`, organiser session management.

### `reservations`

`create`, `get`, `cancel`.

Example logical input:

```ts
{
  sessionId: string;
  seatIds: string[];
}
```

Successful result includes reservation ID, state, held inventory, authoritative `expiresAt` and server-calculated pricing preview.

### `checkout`

`create` for an active reservation. Returns provider checkout information, never a client-controlled paid state.

### `orders`

`listMine`, `getMine`, organiser-authorized order views.

### `tickets`

`listMine`, `get`, `validate` (staff-authorized).

### `search`

Event search query/filter procedures backed by Typesense with controlled fallback behavior.

### `organisations`

Membership and organisation management procedures.

### `admin`

Platform-only operations, kept distinct from organisation administration.

## Non-tRPC HTTP routes

Some integrations require conventional HTTP endpoints. Stripe webhook delivery is handled by an Express route such as `POST /webhooks/stripe`, because it requires Stripe signature verification over the appropriate request body and is not a browser tRPC procedure. Health/readiness endpoints may also be ordinary HTTP routes.

## Pagination

List procedures use cursor pagination where datasets can grow significantly. Sorting keys must be deterministic.

## Versioning

During early development, breaking changes can evolve with the frontend in the monorepo. Once an external/public API is promised, explicit compatibility/versioning policy must be introduced.
