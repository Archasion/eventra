# Domain Glossary

| Term               | Definition                                                                       |
| ------------------ | -------------------------------------------------------------------------------- |
| Organisation       | Tenant that owns and operates events.                                            |
| Member             | User with a role inside an organisation.                                         |
| Event              | Customer-facing concept such as a concert or performance.                        |
| Session            | A specific scheduled occurrence of an event.                                     |
| Venue              | Physical location in which a session takes place.                                |
| Section            | Logical grouping of seats in a venue.                                            |
| Seat               | Stable physical seat definition within a venue layout.                           |
| Ticket Type        | Commercial category defining price/conditions for inventory.                     |
| Inventory          | Purchasable capacity for a specific event session.                               |
| Reservation / Hold | Temporary claim on inventory that expires unless completed.                      |
| Order              | Commercial record representing what the customer agreed to purchase.             |
| Order Item         | Immutable purchase-line snapshot including quantity/seat and price.              |
| Payment            | Record of payment-provider processing associated with an order.                  |
| Ticket             | Entitlement issued from a successfully paid eligible order.                      |
| Refund             | Reversal of all or part of captured payment.                                     |
| Admission          | Successful validation/use of a ticket at a session.                              |
| Source of truth    | Authoritative state used to determine correctness when systems disagree.         |
| Idempotency        | Property that safely repeating an operation does not repeat its business effect. |
