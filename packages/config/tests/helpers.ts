import { expect } from 'vitest';
import type { z } from 'zod';

// Helper to assert that a parse result failed and that the first error is at the expected path.
export function expectPath(result: z.ZodSafeParseResult<unknown>, path: (string | number)[]) {
  expect(result.success).toBe(false);
  if (result.success) throw new Error('expected failure');
  expect(result.error.issues[0]?.path).toEqual(path);
}

// Helper to assert that a parse result succeeded and return the parsed data.
export function expectValid<T>(result: z.ZodSafeParseResult<T>) {
  expect(result.success).toBe(true);
  if (!result.success) throw new Error(`expected success, got: ${result.error.message}`);
  return result.data;
}
