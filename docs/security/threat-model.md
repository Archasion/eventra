# Threat Model

## Assets

Customer identity/session, organisation data, event configuration, inventory ownership, order/payment state, tickets/validation tokens, OAuth/Stripe/AWS secrets and operational telemetry.

## Trust boundaries

Browser ↔ Eventra API; Eventra ↔ PostgreSQL/Redis/Typesense; Eventra ↔ Stripe; Eventra ↔ OAuth providers; Eventra ↔ Resend/S3/AWS; public ticket scanner input ↔ validation endpoint.

## Threats and controls

| Threat                    | Example                                  | Planned controls                                                                 |
| ------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------- |
| IDOR/BOLA                 | User changes order/event ID              | Object + tenant authorization on server                                          |
| Privilege escalation      | Event manager acts as org/platform admin | Explicit permission model, server-side role checks                               |
| Seat hoarding/bots        | Automated holds exhaust inventory        | Rate limits, purchase/hold limits, optional CAPTCHA later                        |
| Double booking            | Concurrent claims succeed                | PostgreSQL transactions/constraints                                              |
| Webhook spoofing          | Fake payment success request             | Stripe signature verification                                                    |
| Replay/duplicate events   | Same webhook processed repeatedly        | Unique provider event IDs + idempotent transactions                              |
| XSS                       | Malicious event content                  | React escaping, safe rendering, CSP/security headers where deployed              |
| Injection                 | Crafted search/DB input                  | Zod validation + parameterized Drizzle queries                                   |
| CSRF                      | Cross-site mutation with cookie auth     | SameSite/origin/CSRF controls appropriate to session architecture                |
| Credential/secret leakage | Keys committed/logged                    | Secret management, `.gitignore`, log redaction, GitHub scanning where available  |
| Malicious uploads         | Unsafe event media                       | Presigned S3 upload policy, MIME/size validation, non-executable delivery policy |
| Ticket guessing           | Attacker fabricates QR value             | High-entropy opaque validation tokens, server lookup                             |
| Ticket replay             | Same QR scanned twice                    | Atomic VALID→USED transition                                                     |
| DoS                       | Expensive search/reservation spam        | Rate limiting, query bounds, caching, AWS controls                               |

## Privacy/logging

Do not log OAuth tokens, session cookies, Stripe secrets, full payment data or ticket validation secrets. Telemetry should use internal IDs where useful and minimize personal information.

## Non-goals

The initial project does not claim PCI certification, advanced fraud detection, bot-proof high-demand sales or production compliance. Stripe-hosted payment surfaces reduce direct handling of card details, but operational security remains required.
