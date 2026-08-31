import { serverEnvNames, type ServerConfig, serverConfigSchema } from './server-schema';
import { formatConfigErrors, readEnv } from './utils';

import 'dotenv/config';

function parseServerConfig(): ServerConfig {
  const input = readEnv(serverEnvNames, process.env);
  const result = serverConfigSchema.safeParse(input);

  if (!result.success) {
    throw new Error(formatConfigErrors('server', result.error.issues, serverEnvNames));
  }

  return result.data;
}

export const serverConfig = parseServerConfig();
export type { ServerConfig };
