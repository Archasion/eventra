---
applyTo: 'apps/api/**/*.ts,packages/validation/**/*.ts'
---

# Backend Code Review Instructions

Review backend changes for boundary validation, authorization, error handling, and correct separation of domain responsibilities.

- Validate untrusted input at API boundaries using Zod or an equivalent existing project boundary.
- tRPC procedures must authenticate and authorize before accessing protected resources.
- Resource IDs supplied by clients must never imply authorization.
- Check tenant-owned resource access for IDOR/BOLA vulnerabilities.
- Prefer centralized authorization policies over repeated inline role-string checks.
- Do not expose internal errors, stack traces, secrets, tokens, or provider credentials to clients.
- Check async code for missing `await`, unhandled promises, swallowed errors, and incorrect exception handling.
- Ensure errors are mapped intentionally rather than converting all failures into generic success or not-found responses.
- Do not trust client-submitted prices, totals, ownership state, ticket state, or reservation state.
- Server-side calculations and database state must determine transactional outcomes.
- Avoid importing browser-only modules or `VITE_*` assumptions into backend code.
- Review retries and repeated requests for accidental duplicate mutations.
- Mutating operations that may legitimately be retried should have explicit idempotency behavior where required by the domain.
- Do not introduce process-local state when correctness must survive multiple application instances or restarts.
