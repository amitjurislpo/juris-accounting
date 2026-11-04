"use client";

import { useActionState } from "react";
import { completeSetup, logIn } from "./auth-actions";

const field = "mt-1 w-full rounded-xl border border-line-strong bg-surface px-3 py-2 text-fg outline-none focus:border-gold";
const button = "mt-2 rounded-xl bg-platinum px-4 py-2 font-medium text-[#0a1a12] disabled:opacity-50";

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-sm text-fg-muted">
      {label}
      <input required className={field} {...props} />
    </label>
  );
}

export function LoginForm() {
  const [state, action, pending] = useActionState(logIn, null);
  return (
    <form action={action} className="space-y-4">
      <Input label="Email" name="email" type="email" autoComplete="username" />
      <Input label="Password" name="password" type="password" autoComplete="current-password" />
      {state?.error && <p role="alert" className="text-sm text-red-400">{state.error}</p>}
      <button className={button} disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}

export function SetupForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(completeSetup, null);
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      <Input label="New password (at least 12 characters)" name="password" type="password" autoComplete="new-password" minLength={12} />
      <Input label="Repeat it" name="confirm" type="password" autoComplete="new-password" minLength={12} />
      {state?.error && <p role="alert" className="text-sm text-red-400">{state.error}</p>}
      <button className={button} disabled={pending}>{pending ? "Saving…" : "Set password and sign in"}</button>
    </form>
  );
}
