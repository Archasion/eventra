# Eventra Code Review Instructions

Review for concrete defects and realistic risks. Prioritize correctness over style.

Review findings in this order:

1. Data integrity and invariant violations
2. Authentication, authorization, and tenant isolation
3. Concurrency and transaction correctness
4. Payment and ticket correctness
5. Security vulnerabilities
6. Runtime failures and error handling
7. Missing tests for meaningful business-risk changes

## General rules

- Eventra is a modular monolith. Do not recommend microservices merely for architectural preference.
- PostgreSQL is authoritative for transactional business state.
- Redis, Typesense, caches, pub/sub, browser state, and realtime messages must not become authoritative for inventory, payments, or ticket validity.
- Treat client input and external-service input as untrusted.
- Never rely on frontend behavior for authorization or transactional correctness.
- Do not expose secrets, credentials, tokens, or sensitive configuration.
- Report concrete failure scenarios rather than hypothetical style concerns.
- Do not comment on formatting or style already enforced by Prettier, ESLint, or TypeScript.
- Do not recommend broad rewrites unless necessary to fix a concrete correctness, security, or maintainability problem.
- Do not claim concurrency, reliability, or performance guarantees unless supported by appropriate tests or measurements.
- When a change affects a documented business invariant, check that tests enforce the invariant.
