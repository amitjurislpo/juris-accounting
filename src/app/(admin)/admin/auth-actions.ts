"use server";

import { redirect } from "next/navigation";
import { getAdminActor, endSession, startSession } from "@/lib/admin/session";
import { hashPassword, hashToken, verifyPassword } from "@/lib/admin/password";
import { getDb } from "@/lib/db";

export type FormState = { error: string } | null;

const MAX_FAILURES = 8;
const WINDOW_MS = 15 * 60 * 1000;
const MIN_PASSWORD = 12;
const UNAVAILABLE = "Sign-in is unavailable right now. Please try again shortly.";

export async function logIn(_: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase().slice(0, 320);
  const password = String(form.get("password") ?? "").slice(0, 1024);
  try {
    const db = getDb();
    const since = new Date(Date.now() - WINDOW_MS);
    if ((await db.adminLoginFailure.count({ where: { email, at: { gte: since } } })) >= MAX_FAILURES) {
      return { error: "Too many failed attempts. Try again in 15 minutes." };
    }
    const user = await db.adminUser.findUnique({ where: { email } });
    if (!(await verifyPassword(password, user?.passwordHash))) {
      await db.adminLoginFailure.deleteMany({ where: { at: { lt: since } } });
      await db.adminLoginFailure.create({ data: { email } });
      return { error: "That email and password don't match." };
    }
    await db.adminLoginFailure.deleteMany({ where: { email } });
    await startSession(email);
  } catch (error) {
    console.error("[admin] login failed:", error);
    return { error: UNAVAILABLE };
  }
  redirect("/admin/blog-reviews");
}

export async function completeSetup(_: FormState, form: FormData): Promise<FormState> {
  const token = String(form.get("token") ?? "");
  const password = String(form.get("password") ?? "").slice(0, 1024);
  if (password.length < MIN_PASSWORD) return { error: `Use at least ${MIN_PASSWORD} characters.` };
  if (password !== String(form.get("confirm") ?? "")) return { error: "The two passwords don't match." };
  try {
    const db = getDb();
    const user = await db.adminUser.findUnique({ where: { setupTokenHash: hashToken(token) } });
    if (!user?.setupExpiresAt || user.setupExpiresAt < new Date()) {
      return { error: "This setup link is invalid or has expired. Ask for a new one." };
    }
    await db.adminUser.update({
      where: { email: user.email },
      data: { passwordHash: await hashPassword(password), setupTokenHash: null, setupExpiresAt: null },
    });
    await startSession(user.email);
  } catch (error) {
    console.error("[admin] setup failed:", error);
    return { error: UNAVAILABLE };
  }
  redirect("/admin/blog-reviews");
}

export async function logOut(): Promise<void> {
  if (await getAdminActor()) await endSession();
  redirect("/admin/login");
}
