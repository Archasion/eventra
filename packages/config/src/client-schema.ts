import { z } from 'zod';
import { emptyStringToUndefined } from './utils';

export const clientConfigSchema = z.object({
  apiUrl: z.url({
    protocol: z.regexes.httpProtocol,
    error: 'must be a HTTP(S) URL',
  }),

  stripePublishableKey: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .regex(/^pk_(?:test|live)_/, 'must be a Stripe publishable key (pk_test_... or pk_live_...)')
      .optional(),
  ),
});

type ClientConfigInput = z.input<typeof clientConfigSchema>;

export const clientEnvNames = {
  apiUrl: 'VITE_API_URL',
  stripePublishableKey: 'VITE_STRIPE_PUBLISHABLE_KEY',
} as const satisfies Record<keyof ClientConfigInput, string>;

export type ClientConfig = z.infer<typeof clientConfigSchema>;
