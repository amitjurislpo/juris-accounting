"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { serviceList } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function ContactForm() {
  const [interested, setInterested] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggle(id: string) {
    setInterested((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-forest bg-cream p-8 text-center">
        <CheckCircle2 className="mx-auto text-forest" size={32} aria-hidden />
        <h3 className="mt-4 text-xl text-charcoal">Thanks — we&apos;ll follow up shortly</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-charcoal-soft">
          This site is a static preview, so this form isn&apos;t connected to
          an inbox yet. Once contact details are confirmed, this page will
          route inquiries directly to our team.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm text-charcoal">
          Name
          <input
            required
            type="text"
            name="name"
            className="rounded-sm border border-hairline bg-ivory px-3.5 py-2.5 text-charcoal outline-none focus:border-forest"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-charcoal">
          Email
          <input
            required
            type="email"
            name="email"
            className="rounded-sm border border-hairline bg-ivory px-3.5 py-2.5 text-charcoal outline-none focus:border-forest"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm text-charcoal">
        Business / entity name (optional)
        <input
          type="text"
          name="company"
          className="rounded-sm border border-hairline bg-ivory px-3.5 py-2.5 text-charcoal outline-none focus:border-forest"
        />
      </label>

      <fieldset>
        <legend className="mb-2 text-sm text-charcoal">Which service(s) are you interested in?</legend>
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
                  "rounded-full border px-4 py-1.5 text-sm transition-colors",
                  active
                    ? "border-forest bg-forest text-ivory"
                    : "border-hairline bg-ivory text-charcoal hover:border-forest",
                )}
              >
                {service.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="flex flex-col gap-1.5 text-sm text-charcoal">
        Tell us about your requirement
        <textarea
          name="message"
          rows={4}
          className="rounded-sm border border-hairline bg-ivory px-3.5 py-2.5 text-charcoal outline-none focus:border-forest"
        />
      </label>

      <Button type="submit" className="self-start">
        Send inquiry
      </Button>
      <p className="text-xs text-charcoal-soft">
        This is a static preview — no message is transmitted yet. Use the
        direct contact details on this page until a form backend is connected.
      </p>
    </form>
  );
}
