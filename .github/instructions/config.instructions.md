---
applyTo: 'packages/config/**/*.ts,.env.example,apps/api/**/*config*.ts,apps/worker/**/*config*.ts,apps/web/**/*config*.ts'
---

# Configuration Code Review Instructions

Review configuration code for startup safety, server/client separation, and secret handling.

- Configuration should be validated at process startup before dependent services are initialized.
- The configuration package should throw validation errors rather than terminating the process itself.
- Application entrypoints own process exit behavior.
- Avoid direct `process.env` access outside the configuration boundary unless intentionally justified.
- Browser configuration must use Vite-compatible `VITE_*` variables.
- Anything prefixed with `VITE_` must be treated as publicly exposed.
- Never expose server secrets through client configuration.
- Empty optional environment values should be handled intentionally rather than accidentally failing `.optional()`.
- Required production-critical values must not receive fake convenience defaults.
- Safe operational defaults such as ports or local service names may live in schemas when appropriate.
- Malformed supplied values should fail validation even when the integration itself is optional.
- Credential pairs must not allow partial configuration.
- Validation errors may identify environment variable names but must not print secret values.
- Prefer reusable generic schemas in `shared.ts`; provider-specific validation belongs in server or client configuration.
- Importing schema definitions should not accidentally parse `process.env` as an import side effect.
- Parsing functions should accept an environment source so they can be unit tested with synthetic input.
- Development may relax presence requirements for optional integrations, but should not bypass validation entirely.
- Server-side Stripe keys must accept secret keys, not publishable `pk_*` keys.
- Client-side Stripe configuration may accept publishable `pk_*` keys but never `sk_*` keys.
