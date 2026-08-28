# Error Catalogue

Application errors expose a stable code, safe message and optional structured details. Internal SQL/provider errors are logged with correlation IDs but not returned verbatim.

| Code                              | Meaning                                                     | Retry?                           |
| --------------------------------- | ----------------------------------------------------------- | -------------------------------- |
| `UNAUTHENTICATED`                 | No valid application identity.                              | After authentication             |
| `FORBIDDEN`                       | Identity lacks permission for this action/resource.         | No                               |
| `NOT_FOUND`                       | Resource does not exist or is intentionally concealed.      | No                               |
| `VALIDATION_FAILED`               | Input violates the procedure schema/rules.                  | After correction                 |
| `SEAT_UNAVAILABLE`                | One or more requested seats cannot be held.                 | With different/current inventory |
| `RESERVATION_EXPIRED`             | Hold is no longer active.                                   | Create a new reservation         |
| `RESERVATION_INVALID_STATE`       | Operation is illegal for current reservation state.         | Usually no                       |
| `ORDER_ALREADY_PAID`              | Duplicate attempt to pay/finalize an already-paid order.    | No                               |
| `PAYMENT_FAILED`                  | Provider/payment attempt failed.                            | Depends on provider state        |
| `PAYMENT_REQUIRES_RECONCILIATION` | Provider and local state require controlled reconciliation. | Not blindly                      |
| `TICKET_ALREADY_USED`             | Ticket was previously admitted.                             | No                               |
| `TICKET_INVALID`                  | Ticket is cancelled/refunded/unknown/not valid for session. | No                               |
| `RATE_LIMITED`                    | Request exceeds an abuse/traffic limit.                     | After delay                      |
| `DEPENDENCY_UNAVAILABLE`          | Required external dependency is temporarily unavailable.    | Yes, with backoff                |
| `INTERNAL_ERROR`                  | Unexpected server failure.                                  | Possibly                         |

Authorization may deliberately return `NOT_FOUND` instead of revealing the existence of a cross-tenant resource where appropriate.
