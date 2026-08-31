---
applyTo: 'apps/api/**/auth/**/*.ts,apps/api/**/*auth*.ts,apps/api/**/organisation/**/*.ts,apps/api/**/organization/**/*.ts,packages/db/**/*member*.ts,packages/db/**/*organisation*.ts,packages/db/**/*organization*.ts'
---

# Authentication and Authorization Review Instructions

Review authentication and authorization changes for privilege escalation, IDOR/BOLA, OAuth correctness, and tenant isolation.

- Authentication establishes identity; authorization must separately establish permission.
- Never infer permission merely because a resource ID is known.
- Every tenant-owned resource operation must enforce organisation membership or another explicit authorization policy.
- Check client-controlled IDs for cross-tenant access.
- Never rely on frontend route protection, hidden controls, or UI role checks for authorization.
- Prefer centralized policy or authorization functions over scattered string comparisons.
- Role changes must not allow users to assign privileges they themselves are not permitted to grant.
- Review membership-management operations for owner/admin escalation paths.
- Platform-admin authorization must remain distinct from organisation-level authorization.
- OAuth callback state and other anti-forgery protections must be validated where required by the chosen authentication implementation.
- OAuth client secrets must remain server-only.
- Session/authentication cookies should use secure attributes appropriate to the deployment environment.
- Authentication errors must not expose credentials, tokens, provider secrets, or unnecessary account details.
- Protected tRPC procedures must fail closed when authentication context is absent or malformed.
- Tests should cover unauthenticated access, insufficient roles, and cross-tenant identifier manipulation for security-sensitive procedures.
