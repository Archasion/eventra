import { describe, it, expect } from 'vitest';
import { serverConfigSchema, serverEnvNames } from '../src/server-schema';
import { readEnv, formatConfigErrors } from '../src/utils';
import { expectPath, expectValid } from './helpers';

// Minimal valid baseline - every test overrides only what it's testing.
const validEnv: Record<string, string> = {
  NODE_ENV: 'development',
  PORT: '3000',
  WEB_URL: 'http://localhost:3000',
  DATABASE_URL: 'postgresql://user:pass@localhost:5432/db',
  REDIS_URL: 'redis://localhost:6379',
  TYPESENSE_HOST: 'localhost',
  TYPESENSE_PORT: '8108',
  TYPESENSE_PROTOCOL: 'http',
  TYPESENSE_API_KEY: 'xyz',
  AUTH_SECRET: 'a'.repeat(64),
};

const pairedFields = [
  {
    a: { key: 'GITHUB_CLIENT_ID', path: 'githubClientId', value: 'value' },
    b: { key: 'GITHUB_CLIENT_SECRET', path: 'githubClientSecret', value: 'value' },
  },
  {
    a: { key: 'GOOGLE_CLIENT_ID', path: 'googleClientId', value: 'value' },
    b: { key: 'GOOGLE_CLIENT_SECRET', path: 'googleClientSecret', value: 'value' },
  },
  {
    a: { key: 'AWS_ACCESS_KEY_ID', path: 'awsAccessKeyId', value: 'value' },
    b: { key: 'AWS_SECRET_ACCESS_KEY', path: 'awsSecretAccessKey', value: 'value' },
  },
  {
    a: { key: 'STRIPE_SECRET_KEY', path: 'stripeSecretKey', value: 'sk_test_123' },
    b: { key: 'STRIPE_WEBHOOK_SECRET', path: 'stripeWebhookSecret', value: 'whsec_123' },
  },
  {
    a: { key: 'RESEND_API_KEY', path: 'resendApiKey', value: 're_123' },
    b: { key: 'EMAIL_FROM', path: 'emailFrom', value: 'from@example.com' },
  },
] as const;

function parse(overrides: Record<string, string | undefined> = {}) {
  const raw = { ...validEnv, ...overrides };
  return serverConfigSchema.safeParse(readEnv(serverEnvNames, raw));
}

describe('serverConfigSchema', () => {
  it('parses a fully valid config', () => {
    expectValid(parse());
  });

  it('rejects a databaseUrl with the wrong protocol', () => {
    expectPath(parse({ DATABASE_URL: 'mysql://user:pass@localhost/db' }), ['databaseUrl']);
  });

  it('accepts postgresql:// as well as postgres://', () => {
    expectValid(parse({ DATABASE_URL: 'postgres://user:pass@localhost:5432/db' }));
    expectValid(parse({ DATABASE_URL: 'postgresql://user:pass@localhost:5432/db' }));
  });

  it('rejects authSecret shorter than 64 characters', () => {
    expectPath(parse({ AUTH_SECRET: 'too-short' }), ['authSecret']);
  });

  describe.each(pairedFields)('paired: $a / $b', ({ a, b }) => {
    it(`fails when only ${a.key} is set`, () => {
      expectPath(parse({ [a.key]: a.value }), [b.path]);
    });

    it(`fails when only ${b.key} is set`, () => {
      expectPath(parse({ [b.key]: b.value }), [a.path]);
    });

    it('passes when both are set', () => {
      expectValid(parse({ [a.key]: a.value, [b.key]: b.value }));
    });
  });

  it('applies defaults when optional fields are omitted', () => {
    const data = expectValid(
      parse({
        NODE_ENV: undefined,
        PORT: undefined,
        TYPESENSE_PORT: undefined,
        TYPESENSE_PROTOCOL: undefined,
      }),
    );
    expect(data.nodeEnv).toBe('development');
    expect(data.port).toBe(3000);
    expect(data.typesensePort).toBe(8108);
    expect(data.typesenseProtocol).toBe('http');
  });
});

describe('formatConfigErrors', () => {
  it('maps a schema key to its env var name in the message', () => {
    const result = parse({ DATABASE_URL: 'mysql://bad' });
    if (result.success) throw new Error('expected failure');

    const message = formatConfigErrors('server', result.error.issues, serverEnvNames);
    expect(message).toContain('DATABASE_URL');
    expect(message).not.toContain('databaseUrl');
  });
});
