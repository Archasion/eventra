# Security Policy

## Reporting a vulnerability

Please do not publish exploitable vulnerabilities in a public issue. Report security concerns privately to the repository owner through an appropriate private contact channel listed on the GitHub profile.

Include, where possible, the affected component, reproduction steps, expected impact and suggested mitigation. Do not include real credentials, personal information or secrets.

## Project status

Eventra is a portfolio and educational system. It is not intended to process real production payments or real customer data unless explicitly hardened and operated for that purpose.

## Security principles

- Validate untrusted input at system boundaries with Zod.
- Enforce authorization server-side and at object/tenant level.
- Never trust client-side payment state.
- Verify Stripe webhook signatures and process provider events idempotently.
- Keep secrets outside source control.
- Use least-privilege AWS/IAM access.
- Treat PostgreSQL as authoritative for inventory and ownership.
- Rate-limit sensitive and abuse-prone operations.
- Avoid logging passwords, tokens, payment details or OAuth secrets.

Supported-version information will be added once versioned releases exist.
