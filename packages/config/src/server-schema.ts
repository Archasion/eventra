import { z } from 'zod';
import { emptyStringToUndefined } from './utils';
import {
  nonEmptyStringSchema,
  optionalHttpUrlSchema,
  optionalStringSchema,
  portSchema,
} from './shared';

// Helper function to enforce that two config values must be provided together.
function requirePairedWith<T extends Record<string, unknown>>(
  config: T,
  ctx: z.RefinementCtx,
  a: keyof T,
  b: keyof T,
  message: string,
) {
  const aProvided = config[a] !== undefined;
  const bProvided = config[b] !== undefined;
  if (aProvided !== bProvided) {
    ctx.addIssue({
      code: 'custom',
      path: [aProvided ? b : a],
      message,
    });
  }
}

export const serverConfigSchema = z
  .object({
    nodeEnv: z.enum(['production', 'development', 'test']).default('development'),
    port: portSchema.default(3000),
    webUrl: z.url({
      protocol: z.regexes.httpProtocol,
      error: 'must be a HTTP(S) URL',
    }),

    databaseUrl: z.url({
      protocol: /^postgres(?:ql)?$/, // accepts postgres:// and postgresql://
      error: 'must be a PostgreSQL connection URL',
    }),

    redisUrl: z.url({
      protocol: /^rediss?$/, // accepts redis:// and rediss://
      error: 'must be a Redis connection URL',
    }),

    typesenseHost: nonEmptyStringSchema,
    typesensePort: z.coerce
      .number('must be a number')
      .int('must be an integer')
      .min(1, 'must be between 1 and 65535')
      .max(65535, 'must be between 1 and 65535')
      .default(8108),
    typesenseProtocol: z.enum(['http', 'https']).default('http'),
    typesenseApiKey: nonEmptyStringSchema,

    authSecret: nonEmptyStringSchema.min(64, 'must be at least 64 characters'),

    githubClientId: optionalStringSchema,
    githubClientSecret: optionalStringSchema,

    googleClientId: optionalStringSchema,
    googleClientSecret: optionalStringSchema,

    stripeSecretKey: z.preprocess(
      emptyStringToUndefined,
      z
        .string()
        .regex(/^sk_(?:test|live)_/, 'must be a Stripe secret key (sk_test_... or sk_live_...)')
        .optional(),
    ),

    stripeWebhookSecret: z.preprocess(
      emptyStringToUndefined,
      z.string().startsWith('whsec_', 'must be a Stripe webhook secret (whsec_...)').optional(),
    ),

    resendApiKey: z.preprocess(
      emptyStringToUndefined,
      z.string().startsWith('re_', 'must be a Resend API key (re_...)').optional(),
    ),

    emailFrom: z.preprocess(emptyStringToUndefined, z.email('must be an email').optional()),

    awsRegion: optionalStringSchema,

    awsAccessKeyId: optionalStringSchema,
    awsSecretAccessKey: optionalStringSchema,

    s3BucketName: optionalStringSchema,

    otelServiceName: nonEmptyStringSchema.default('eventra-api'),
    otelExporterOtlpEndpoint: optionalHttpUrlSchema,
  })
  // Paired config: if one half of a credential/setting is provided,
  // the other must be too (partial config should fail fast, not at runtime).
  .superRefine((config, ctx) => {
    requirePairedWith(
      config,
      ctx,
      'githubClientId',
      'githubClientSecret',
      'must be provided together with other GitHub OAuth credential',
    );
    requirePairedWith(
      config,
      ctx,
      'googleClientId',
      'googleClientSecret',
      'must be provided together with the other Google OAuth credential',
    );
    requirePairedWith(
      config,
      ctx,
      'awsAccessKeyId',
      'awsSecretAccessKey',
      'must be provided together with the other AWS credential',
    );
    requirePairedWith(
      config,
      ctx,
      'stripeSecretKey',
      'stripeWebhookSecret',
      'must be provided together with the other Stripe credential',
    );
    requirePairedWith(
      config,
      ctx,
      'resendApiKey',
      'emailFrom',
      'must be provided together with the other email configuration value',
    );
  });

type ServerConfigInput = z.input<typeof serverConfigSchema>;

export const serverEnvNames = {
  nodeEnv: 'NODE_ENV',

  port: 'PORT',
  webUrl: 'WEB_URL',
  databaseUrl: 'DATABASE_URL',
  redisUrl: 'REDIS_URL',

  typesenseHost: 'TYPESENSE_HOST',
  typesensePort: 'TYPESENSE_PORT',
  typesenseProtocol: 'TYPESENSE_PROTOCOL',
  typesenseApiKey: 'TYPESENSE_API_KEY',

  authSecret: 'AUTH_SECRET',
  githubClientId: 'GITHUB_CLIENT_ID',
  githubClientSecret: 'GITHUB_CLIENT_SECRET',
  googleClientId: 'GOOGLE_CLIENT_ID',
  googleClientSecret: 'GOOGLE_CLIENT_SECRET',

  stripeSecretKey: 'STRIPE_SECRET_KEY',
  stripeWebhookSecret: 'STRIPE_WEBHOOK_SECRET',

  resendApiKey: 'RESEND_API_KEY',
  emailFrom: 'EMAIL_FROM',

  awsRegion: 'AWS_REGION',
  awsAccessKeyId: 'AWS_ACCESS_KEY_ID',
  awsSecretAccessKey: 'AWS_SECRET_ACCESS_KEY',
  s3BucketName: 'S3_BUCKET_NAME',

  otelServiceName: 'OTEL_SERVICE_NAME',
  otelExporterOtlpEndpoint: 'OTEL_EXPORTER_OTLP_ENDPOINT',
} as const satisfies Record<keyof ServerConfigInput, string>;

export type ServerConfig = z.infer<typeof serverConfigSchema>;
