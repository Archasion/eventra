---
applyTo: 'apps/web/**/*.{ts,tsx}'
---

# Frontend Code Review Instructions

Review frontend changes for correctness, stale-state handling, accessibility, and client/server trust boundaries.

- Never treat client-side checks as authorization.
- Never treat client-side seat state, countdowns, payment redirects, or ticket state as authoritative.
- Every `VITE_*` environment variable is public and must not contain secrets.
- Secret keys, webhook secrets, database URLs, private OAuth credentials, AWS credentials, and server auth secrets must never enter the client bundle.
- Prefer TanStack Query for server state rather than duplicated ad hoc request/cache state.
- Do not duplicate authoritative backend business rules solely in the client.
- Client validation may improve UX but must not replace server validation.
- Handle loading, empty, error, disabled, and retry states where relevant.
- Prevent accidental duplicate submissions for payment, reservation, refund, or other important mutations.
- Check stale seat-map behavior: the backend reservation response determines whether a seat was actually acquired.
- Realtime updates are advisory and may be delayed, duplicated, reordered, or missed.
- Do not assume a successful Stripe redirect proves payment completion.
- Interactive controls must remain keyboard accessible and expose appropriate semantics.
- Review forms for visible validation feedback and correct handling of server-side validation errors.
- Avoid unnecessary local copies of query data that can become stale.
