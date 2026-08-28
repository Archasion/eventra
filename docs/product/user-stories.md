# User Stories

## Customer

### US-CUS-001 — Discover events

As a customer, I want to browse and search published events so that I can find something to attend.

**Acceptance criteria:** unpublished/cancelled events are not offered for purchase; search/filter inputs are validated; event pages expose upcoming purchasable sessions.

### US-CUS-002 — Select seats

As a customer, I want to see seat availability and select seats so that I know what I am attempting to buy.

**Acceptance criteria:** sold/unavailable seats cannot be selected as purchasable; displayed availability may update in real time; server state wins over stale browser state.

### US-CUS-003 — Reserve seats

As a customer, I want selected seats held temporarily while I check out.

**Acceptance criteria:** a successful reservation returns an expiry time; competing claims cannot both succeed; all requested seats are acquired atomically or the request fails; expiry is enforced by the backend.

### US-CUS-004 — Purchase tickets

As a customer, I want to pay for my active reservation securely.

**Acceptance criteria:** server calculates price; Stripe handles payment details; successful redirect alone does not mark the order paid; duplicate webhook delivery does not duplicate orders/tickets.

### US-CUS-005 — Access tickets

As a customer, I want to view tickets for paid orders.

**Acceptance criteria:** only authorized users can access the order/tickets; each ticket has a validation token; invalidated/refunded tickets show their state.

## Organiser

### US-ORG-001 — Create an event

As an event manager, I want to create an event and sessions so that customers can purchase tickets.

**Acceptance criteria:** drafts are not public; publishing requires required event/session/pricing information; cross-organisation modification is forbidden.

### US-ORG-002 — Configure venue inventory

As an event manager, I want to associate a venue and seating layout with a session.

**Acceptance criteria:** seats have stable identifiers; pricing/ticket type mapping is validated; destructive changes are restricted once sales make them unsafe.

### US-ORG-003 — Validate admission

As venue staff, I want to scan a ticket so that I can admit a customer exactly once.

**Acceptance criteria:** first valid scan succeeds atomically; concurrent/second scan fails as already used; cancelled/refunded tickets fail.

## Organisation administrator

### US-ADM-001 — Manage members

As an organisation admin, I want to manage member roles so that staff have appropriate permissions.

**Acceptance criteria:** permission changes are server-authorized; users cannot escalate beyond allowed authority; actions cannot affect another organisation.

## Platform administrator

### US-PLT-001 — Investigate operations

As a platform admin, I want to inspect events, orders and audit information so that I can support the platform.

**Acceptance criteria:** privileged operations are explicit and auditable; sensitive information is minimized; normal organisation roles do not inherit platform permissions.
