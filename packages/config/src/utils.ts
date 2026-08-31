import { type z } from 'zod';

// .env files often define a key with an empty value (e.g. STRIPE_SECRET_KEY=)
// rather than omitting it. Treat that as "not set" instead of an invalid string/URL.
export function emptyStringToUndefined(value: unknown): unknown {
  return value === '' ? undefined : value;
}

export function readEnv<TEnvNames extends Record<string, string>>(
  envNames: TEnvNames,
  source: Record<string, string | undefined>,
): Record<keyof TEnvNames, string | undefined> {
  return Object.fromEntries(
    Object.entries(envNames).map(([key, envName]) => [key, source[envName]]),
  ) as Record<keyof TEnvNames, string | undefined>;
}

export function formatConfigErrors<TEnvNames extends Record<string, string>>(
  scope: string,
  issues: z.core.$ZodIssue[],
  envNames: TEnvNames,
): string {
  const messages = issues.map((issue) => {
    const key = issue.path.at(0);

    const envName =
      typeof key === 'string' && key in envNames ? envNames[key as keyof TEnvNames] : 'CONFIG';

    return `- ${envName}: ${issue.message}`;
  });

  return [`Invalid ${scope} configuration:`, ...messages].join('\n');
}
