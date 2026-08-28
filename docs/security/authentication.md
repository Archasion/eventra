# Authentication

## Supported methods

Eventra supports GitHub OAuth and Google OAuth. The external provider authenticates the user; Eventra maintains its own application identity/session and authorization model.

## Principles

- OAuth provider tokens/secrets are never exposed to unrelated frontend code or logged.
- Redirect/callback URLs are allowlisted/configured per environment.
- OAuth `state`/PKCE and library-recommended protections are used where applicable.
- Application sessions use secure, HTTP-only cookies when the chosen session implementation supports the browser architecture.
- Production cookies use `Secure` and appropriate `SameSite` behavior.
- Session identifiers are revocable and expire.
- Account linking is based on verified provider identity rules, not arbitrary client-submitted email claims.

## Account model

A Eventra `user` is distinct from an OAuth account. A user may have one or more linked provider accounts if linking is implemented safely. Provider identifiers are stored so identity remains stable even if profile display information changes.

## Authorization boundary

Authentication answers **who is this?** It does not answer **may this user modify this event?** Every protected procedure performs authorization against Eventra roles/resource ownership.

## Secrets

OAuth client secrets are environment-managed secrets, never committed to Git. AWS deployment should use an appropriate managed secret/configuration mechanism with least-privilege access.
