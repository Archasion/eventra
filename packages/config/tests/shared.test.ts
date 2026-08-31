import { describe, it, expect } from 'vitest';
import {
  nonEmptyStringSchema,
  optionalStringSchema,
  optionalHttpUrlSchema,
  portSchema,
} from '../src/shared';

describe('nonEmptyStringSchema', () => {
  it('rejects an empty string', () => {
    const result = nonEmptyStringSchema.safeParse('');
    expect(result.success).toBe(false);
  });

  it('rejects a whitespace-only string', () => {
    const result = nonEmptyStringSchema.safeParse('   ');
    expect(result.success).toBe(false);
  });

  it('trims and accepts a valid string', () => {
    const result = nonEmptyStringSchema.safeParse('  hello  ');
    expect(result.success).toBe(true);
    expect(result.data).toBe('hello');
  });
});

describe('optionalStringSchema', () => {
  it('accepts undefined', () => {
    const result = optionalStringSchema.safeParse(undefined);
    expect(result.success).toBe(true);
    expect(result.data).toBeUndefined();
  });
});

describe('optionalHttpUrlSchema', () => {
  it('treats an empty string as undefined', () => {
    const result = optionalHttpUrlSchema.safeParse('');
    expect(result.success).toBe(true);
    expect(result.data).toBeUndefined();
  });

  it('rejects a non-http(s) URL', () => {
    const result = optionalHttpUrlSchema.safeParse('ftp://example.com');
    expect(result.success).toBe(false);
  });

  it.each(['https', 'http'])('accepts a valid %i URL', (protocol) => {
    const url = `${protocol}://example.com`;
    const result = optionalHttpUrlSchema.safeParse(url);
    expect(result.success).toBe(true);
    expect(result.data).toBe(url);
  });
});

describe('portSchema', () => {
  it('coerces a numeric string to a number', () => {
    const result = portSchema.safeParse('3000');
    expect(result.success).toBe(true);
    expect(result.data).toBe(3000);
  });

  it.each([0, -1, 65536])('rejects out-of-range port %i', (port) => {
    const result = portSchema.safeParse(port);
    expect(result.success).toBe(false);
  });

  it('rejects a non-integer port', () => {
    const result = portSchema.safeParse('3000.5');
    expect(result.success).toBe(false);
  });
});
