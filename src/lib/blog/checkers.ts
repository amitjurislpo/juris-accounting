import "server-only";

import { getDb } from "@/lib/db";

/**
 * Checkers live in the BlogChecker table: add or delete a row, no redeploy.
 *   INSERT INTO "BlogChecker" ("email") VALUES ('someone@jurislpo.com');
 *   DELETE FROM "BlogChecker" WHERE "email" = 'someone@jurislpo.com';
 * Fails closed: a lookup error means "not a checker".
 */
export async function isBlogChecker(actor: { email: string } | null): Promise<boolean> {
  if (!actor?.email) return false;
  try {
    const row = await getDb().blogChecker.findUnique({ where: { email: actor.email.trim().toLowerCase() } });
    return row !== null;
  } catch (error) {
    console.error("[blog] checker lookup failed; treating as not a checker:", error);
    return false;
  }
}
