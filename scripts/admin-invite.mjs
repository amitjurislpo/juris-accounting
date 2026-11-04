#!/usr/bin/env node
/**
 * Creates an admin account (if missing) and prints a one-time setup link, valid
 * 7 days, where the person chooses their own password. Re-running resets access:
 * the old password and all sessions stop working.
 *
 *   DATABASE_URL=... node scripts/admin-invite.mjs someone@jurislpo.com [https://www.juriscfo.com]
 *
 * This only makes an admin. To let them approve, also add them to "BlogChecker".
 */
import { createHash, randomBytes } from "node:crypto";
import "dotenv/config";
import pg from "pg";

const email = process.argv[2]?.trim().toLowerCase();
const site = (process.argv[3] ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.juriscfo.com").replace(/\/$/, "");
if (!email?.includes("@") || !process.env.DATABASE_URL) {
  console.error("Usage: DATABASE_URL=... node scripts/admin-invite.mjs <email> [site-url]");
  process.exit(1);
}

const token = randomBytes(32).toString("base64url");
const hash = createHash("sha256").update(token).digest("hex");
const local = /@(localhost|127\.0\.0\.1)[:/]/.test(process.env.DATABASE_URL);
const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: local ? false : { rejectUnauthorized: false } });
await client.connect();
try {
  await client.query("BEGIN");
  await client.query(
    `INSERT INTO "AdminUser" ("email", "passwordHash", "setupTokenHash", "setupExpiresAt")
     VALUES ($1, NULL, $2, now() + interval '7 days')
     ON CONFLICT ("email") DO UPDATE
       SET "passwordHash" = NULL, "setupTokenHash" = $2, "setupExpiresAt" = now() + interval '7 days'`,
    [email, hash],
  );
  await client.query(`DELETE FROM "AdminSession" WHERE "email" = $1`, [email]);
  await client.query("COMMIT");
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  await client.end();
}
console.log(`${site}/admin/setup?token=${token}`);
