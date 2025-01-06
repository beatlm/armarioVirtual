import { createClient } from '@libsql/client';

const url = import.meta.env.VITE_TURSO_DB_URL;
const authToken = import.meta.env.VITE_TURSO_DB_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error('Database credentials not found');
}

export const db = createClient({
  url,
  authToken,
});