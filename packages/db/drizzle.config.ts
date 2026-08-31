import { serverConfig } from '@eventra/config/server';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/schema',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: serverConfig.databaseUrl,
  },
  strict: true,
  verbose: true,
});
