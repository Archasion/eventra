/// <reference types="vite/client" />

import { clientEnvNames, type ClientConfig, clientConfigSchema } from './client-schema';
import { formatConfigErrors, readEnv } from './utils';

function parseClientConfig(): ClientConfig {
  const input = readEnv(clientEnvNames, import.meta.env);
  const result = clientConfigSchema.safeParse(input);

  if (!result.success) {
    throw new Error(formatConfigErrors('client', result.error.issues, clientEnvNames));
  }

  return result.data;
}

export const clientConfig = parseClientConfig();
export type { ClientConfig };
