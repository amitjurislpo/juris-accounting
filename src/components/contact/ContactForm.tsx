"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import { serviceList } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Toast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";

// The site is a static preview with no form backend; the short "sending"
// state exists so the interaction reads as a real submission.
const SEND_DELAY_MS = 900;

export function ContactForm() {
  const [interested, setInterested] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const closeToast = useCallback(() => setToastOpen(false), []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function toggle(id: string) {
    setInterested((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  const toast = (
    <Toast open={toastOpen} onClose={closeToast} title="Inquiry received">
      Static preview — nothing was transmitted.
    </Toast>
  );

  if (submitted) {
    return (
      <>
        <div
          role="status"
          className="recommendation-fade relative overflow-hidden rounded-card border border-line-strong bg-surface p-10 text-center shadow-lift md:p-14"
        >
          <div className="hairline-rule absolute inset-x-0 top-0" aria-hidden />
          <span className="beacon relative mx-auto grid h-14 w-14 place-items-center rounded-full border border-line-strong text-fg">
            <CheckCircle2 size={24} aria-hidden />
          </span>
          <h3 className="mt-6 text-2xl tracking-[-0.03em] text-fg">Thanks — we&apos;ll follow up shortly</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-fg-muted">
            This site is a static preview, so this form isn&apos;t connected to
            an inbox yet. Once contact details are confirmed, this page will
            route inquiries directly to our team.
          </p>
        </div>
        {toast}
      </>
    );
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSending(true);
        timer.current = window.setTimeout(() => {
          setSending(false);
          setSubmitted(true);
          setToastOpen(true);
        }, SEND_DELAY_MS);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
      </div>

      <Field label="Business / entity name (optional)" name="company" autoComplete="organization" />

      <fieldset>
        <legend className="mb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-fg-subtle">
          Which service(s) are you interested in?
        </legend>
        <div className="flex flex-wrap gap-2">
          {serviceList.map((service) => {
            const active = interested.includes(service.id);
            return (
              <button
                key={service.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggle(service.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-control border px-4 py-2 text-sm transition-[background-color,border-color,color] duration-300",
                  active
                    ? "border-platinum bg-platinum text-canvas"
                    : "border-line bg-white/[0.02] text-fg-muted hover:border-line-strong hover:text-fg",
                )}
              >
                <span
                  className={cn(
                    "grid h-3.5 w-3.5 place-items-center transition-[scale,opacity] duration-300",
                    active ? "scale-100 opacity-100" : "scale-50 opacity-0",
                  )}
                  aria-hidden
                >
                  <Check size={12} strokeWidth={2.5} />
                </span>
                {service.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field label="Tell us about your requirement" name="message" rows={5} />

      <div className="flex flex-wrap items-center gap-6 border-t border-line pt-6">
        <Button type="submit" loading={sending}>
          {sending ? "Sending" : "Send inquiry"}
        </Button>
        <p className="max-w-sm text-xs leading-relaxed text-fg-subtle">
          This is a static preview — no message is transmitted yet. Use the
          direct contact details on this page until a form backend is connected.
        </p>
      </div>
    </form>
  );
}
