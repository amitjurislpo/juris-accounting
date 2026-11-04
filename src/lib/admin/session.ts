import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { hashToken, newToken } from "./password";

export const ADMIN_COOKIE = "juris_admin";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

export type AdminActor = { email: string };

/** The signed-in admin, re-checked against the database on every call. Fails
 *  closed: no cookie, an expired session or a database error all mean null. */
export async function getAdminActor(): Promise<AdminActor | null> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  try {
    const session = await getDb().adminSession.findUnique({ where: { tokenHash: hashToken(token) } });
    if (!session || session.expiresAt < new Date()) return null;
    return { email: session.email };
  } catch (error) {
    console.error("[admin] session lookup failed:", error);
    return null;
  }
}

export async function requireAdmin(): Promise<AdminActor> {
  const actor = await getAdminActor();
  if (!actor) redirect("/admin/login");
  return actor;
}

export async function startSession(email: string): Promise<void> {
  const token = newToken();
  const expiresAt = new Date(Date.now() + SESSION_MS);
  await getDb().adminSession.create({ data: { tokenHash: hashToken(token), email, expiresAt } });
  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (token) await getDb().adminSession.deleteMany({ where: { tokenHash: hashToken(token) } });
  store.delete(ADMIN_COOKIE);
}
