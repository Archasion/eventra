# Authorization

Eventra combines platform roles with organisation-scoped membership roles. Authorization is enforced server-side in tRPC/application services.

## Roles

- **Customer/User:** normal authenticated account.
- **Event Manager:** manages permitted event operations inside an organisation.
- **Organisation Admin:** manages organisation resources and members.
- **Venue Staff:** validates tickets for permitted sessions/events.
- **Platform Admin:** platform-level privileged operations.

## Permission matrix

| Action                          | Customer | Event Manager | Org Admin | Venue Staff | Platform Admin |
|---------------------------------|:--------:|:-------------:|:---------:|:-----------:|:--------------:|
| Buy tickets                     |    ✓    |      ✓       |    ✓     |     ✓      |       ✓       |
| View own orders                 |    ✓    |      ✓       |    ✓     |     ✓      |       ✓       |
| Create/edit organisation events |    —     |      ✓       |    ✓     |      —      |      ✓\*      |
| Publish/cancel event            |    —     |      ✓       |    ✓     |      —      |      ✓\*      |
| Manage organisation members     |    —     |       —       |    ✓     |      —      |      ✓\*      |
| View organiser orders/attendees |    —     |      ✓       |    ✓     |   limited   |      ✓\*      |
| Validate ticket                 |    —     |   permitted   |    ✓     |     ✓      |      ✓\*      |
| Platform administration         |    —     |       —       |     —     |      —      |       ✓       |

`*` Platform administration should use explicit support/admin paths rather than silently bypassing all domain checks.

## Object-level authorization

Every organisation-owned resource is resolved with tenant context or checked against organisation ownership. Knowing/changing an event/order ID must never grant access. Customer order/ticket queries constrain ownership to the authenticated user unless an explicit organiser/admin permission applies.

## Implementation principle

Prefer centralized permission functions/policies such as `can(user, action, resource)` or domain-specific authorization services rather than scattered role string comparisons.
