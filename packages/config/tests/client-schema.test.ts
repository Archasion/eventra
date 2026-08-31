import { describe, it } from 'vitest';
import { clientConfigSchema, clientEnvNames } from '../src/client-schema';
import { readEnv } from '../src/utils';
import { expectPath, expectValid } from './helpers';

// Minimal valid baseline - every test overrides only what it's testing.
const validEnv: Record<string, string> = {
  VITE_API_URL: 'http://localhost:3000',
  VITE_STRIPE_PUBLISHABLE_KEY: 'pk_test_123',
};

function parse(overrides: Record<string, string | undefined> = {}) {
  const raw = { ...validEnv, ...overrides };
  return clientConfigSchema.safeParse(readEnv(clientEnvNames, raw));
}

describe('clientConfigSchema', () => {
  it('parses a fully valid config', () => {
    expectValid(parse());
  });

  it('rejects an invalid API URL', () => {
    expectPath(parse({ VITE_API_URL: 'ftp://example.com' }), ['apiUrl']);
  });

  it('rejects an invalid Stripe publishable key', () => {
    expectPath(parse({ VITE_STRIPE_PUBLISHABLE_KEY: 'sk_test_123' }), ['stripePublishableKey']);
  });

  it('accepts a valid Stripe publishable key (pk_test_... or pk_live_...)', () => {
    expectValid(parse({ VITE_STRIPE_PUBLISHABLE_KEY: 'pk_test_123' }));
    expectValid(parse({ VITE_STRIPE_PUBLISHABLE_KEY: 'pk_live_123' }));
  });
});
