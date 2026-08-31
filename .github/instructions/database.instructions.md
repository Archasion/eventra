---
applyTo: 'packages/db/**/*.ts,packages/db/**/*.sql,**/drizzle/**/*.ts,**/migrations/**/*'
---

# Database Code Review Instructions

Review database changes for invariant enforcement, transactional safety, migrations, and tenant isolation.

- PostgreSQL is the authoritative source for transactional business state.
- Prefer database constraints for invariants that can be enforced structurally.
- Do not rely solely on application checks for uniqueness or ownership constraints that must hold under concurrency.
- Check read-then-write patterns for race conditions.
- Ensure related writes that must succeed or fail together share the same database transaction.
- Avoid accidentally performing transaction-sensitive queries outside the transaction handle.
- Review indexes for queries introduced on frequently filtered, joined, or uniqueness-sensitive fields.
- Check foreign-key behavior and deletion semantics intentionally.
- Tenant-owned rows must not be queryable across organisations due to missing ownership predicates.
- Never use Typesense or Redis state to determine authoritative inventory, order, payment, or ticket outcomes.
- Monetary values must not use floating-point database types when exact arithmetic is required.
- Immutable transaction snapshots such as purchased prices must not later depend on mutable event pricing records.
- Migration changes must be reproducible and versioned.
- Review destructive migrations for data-loss risk.
- Avoid silently changing existing column semantics without a migration strategy.
- Concurrency-sensitive database behavior requires integration tests against real PostgreSQL rather than mocked repositories.
