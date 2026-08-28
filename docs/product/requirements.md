# Product Requirements

## Purpose

Eventra provides event discovery, reserved-seat ticket purchasing and organiser management while demonstrating production-oriented full-stack design.

## Actors

- **Customer:** discovers events, reserves inventory, purchases and uses tickets.
- **Event Manager:** creates and operates events for an organisation.
- **Organisation Admin:** manages organisation members, events and commercial operations.
- **Venue Staff:** validates tickets for permitted sessions.
- **Platform Admin:** performs platform-level support and administration.

## Functional requirements

### Accounts

- **ACC-001:** Users can authenticate with supported account methods.
- **ACC-002:** GitHub OAuth and Google OAuth are supported.
- **ACC-003:** Users can sign out and revoke the active application session.
- **ACC-004:** Protected resources require authenticated server-side identity.

### Organisations

- **ORG-001:** A user can belong to one or more organisations.
- **ORG-002:** Organisation membership has an explicit role.
- **ORG-003:** Organisation resources are isolated from other organisations.
- **ORG-004:** Authorized members can manage organisation membership.

### Events and venues

- **EVT-001:** Authorized organisers can create, edit, publish and cancel events.
- **EVT-002:** Events can contain one or more scheduled sessions.
- **EVT-003:** A session can reference a venue and seating layout.
- **EVT-004:** Customers can only purchase inventory for purchasable sessions.
- **VEN-001:** Organisers can define venues, sections, rows and seats.
- **VEN-002:** Reserved seats have stable identifiers independent of a customer's reservation.

### Discovery and search

- **SRCH-001:** Customers can browse published events.
- **SRCH-002:** Customers can search by event name and supported metadata.
- **SRCH-003:** Search supports filters such as date, category, venue/location and price where data permits.
- **SRCH-004:** Failure or staleness of Typesense must not change authoritative inventory state.

### Reservations

- **RES-001:** A customer can request a temporary hold on available seats.
- **RES-002:** A seat cannot belong to more than one active successful claim for the same session.
- **RES-003:** Holds expire after the configured reservation period.
- **RES-004:** Expired/cancelled holds return inventory to availability unless it has been sold through a valid completion flow.
- **RES-005:** Conflicting reservation attempts fail predictably without partial ownership.
- **RES-006:** Reservation expiry is enforced server-side; the browser countdown is informational only.

### Checkout and payments

- **PAY-001:** Checkout prices are calculated and validated server-side.
- **PAY-002:** The system integrates with Stripe for payment processing.
- **PAY-003:** A browser redirect is not proof of successful payment.
- **PAY-004:** Stripe webhook events are signature-verified and processed idempotently.
- **PAY-005:** Retrying checkout must not accidentally create duplicate commercial outcomes.
- **PAY-006:** Historical order prices are stored as snapshots.

### Tickets

- **TKT-001:** Successful eligible orders produce tickets.
- **TKT-002:** Each ticket has a unique non-guessable validation identity.
- **TKT-003:** A valid ticket can be successfully admitted at most once.
- **TKT-004:** Refunded/cancelled tickets cannot be admitted.
- **TKT-005:** Customers can access tickets belonging to their own orders.

### Notifications

- **NOT-001:** Transactional email can be sent through Resend asynchronously.
- **NOT-002:** Email failure must not roll back a successful payment/order.
- **NOT-003:** Retryable notification failures are retried without duplicating business state.

## Non-functional requirements

- **NFR-001 Correctness:** Inventory remains correct under concurrent requests.
- **NFR-002 Security:** Tenant and object authorization are enforced on the server.
- **NFR-003 Reliability:** Retryable external events/jobs are idempotent.
- **NFR-004 Observability:** Important request/job flows emit structured telemetry through OpenTelemetry.
- **NFR-005 Performance:** Reservation and browsing endpoints have measurable latency/throughput targets defined before load testing.
- **NFR-006 Accessibility:** Core customer flows are keyboard-operable and designed for assistive technology.
- **NFR-007 Maintainability:** Backend code is organized as a modular monolith with explicit domain boundaries.
