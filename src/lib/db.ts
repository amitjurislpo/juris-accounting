import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForDb = globalThis as unknown as { db?: PrismaClient };

/** Lazy, so a build or page with no DATABASE_URL never connects. Throws when unset;
 *  every caller fails closed. */
export function getDb(): PrismaClient {
  if (globalForDb.db) return globalForDb.db;
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) throw new Error("DATABASE_URL is not set");
  const pool = new Pool({ connectionString, max: 3, idleTimeoutMillis: 10_000, connectionTimeoutMillis: 10_000 });
  globalForDb.db = new PrismaClient({ adapter: new PrismaPg(pool) });
  return globalForDb.db;
}
