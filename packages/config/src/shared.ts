import { z } from 'zod';

import { emptyStringToUndefined } from './utils.js';

export const nonEmptyStringSchema = z
  .string('required')
  .trim()
  .nonempty('must be a non-empty string');

export const optionalStringSchema = z.preprocess(
  emptyStringToUndefined,
  nonEmptyStringSchema.optional(),
);

export const optionalHttpUrlSchema = z.preprocess(
  emptyStringToUndefined,
  z.httpUrl('must be a HTTP(S) URL').optional(),
);

export const portSchema = z.coerce
  .number('required')
  .int('must be an integer')
  .min(1, 'must be between 1 and 65535')
  .max(65535, 'must be between 1 and 65535');

export const nodeEnvSchema = z.enum(['development', 'test', 'production']);
