"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import {
  qualifierQuestions,
  recommendServices,
  type QualifierAnswer,
  type QualifierAnswers,
} from "@/content/comparison";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

const options: { value: QualifierAnswer; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
];

export function WhichServiceFlow() {
  const [answers, setAnswers] = useState<QualifierAnswers>({});
  const answeredCount = Object.keys(answers).length;
  const recommendation = useMemo(() => recommendServices(answers), [answers]);
  const total = qualifierQuestions.length;

  return (
    <Section id="which-service">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Not sure where to start?"
          title="Which service do I need?"
          description="Answer three quick questions. This is a starting point for the conversation, not a binding scope."
        />
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-forest">
          <span>{answeredCount}/{total} answered</span>
          <div className="flex gap-1">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 w-6 rounded-full transition-colors duration-300",
                  i < answeredCount ? "bg-forest" : "bg-hairline",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <Reveal className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-6">
          {qualifierQuestions.map((q, i) => (
            <div key={q.id} className="rounded-sm border border-hairline bg-cream p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-forest">
                Question {i + 1} of {total}
              </p>
              <p className="mt-2 text-lg text-charcoal">{q.prompt}</p>
              {q.helper && <p className="mt-1 text-sm text-charcoal-soft">{q.helper}</p>}
              <div className="mt-4 flex gap-2">
                {options.map((opt) => {
                  const active = answers[q.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [q.id]: opt.value }))
                      }
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-sm transition-colors",
                        active
                          ? "border-forest bg-forest text-ivory"
                          : "border-hairline bg-ivory text-charcoal hover:border-forest",
                      )}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="relative self-start overflow-hidden rounded-lg border border-emerald/30 bg-void p-6 text-ivory shadow-[0_30px_60px_-25px_rgba(16,28,46,0.5)] lg:sticky lg:top-28">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(closest-side, var(--emerald), transparent)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, var(--emerald), transparent)" }}
            aria-hidden
          />
          <div key={recommendation.headline} className="relative recommendation-fade">
            <p className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-emerald">
              <Sparkles size={13} aria-hidden />
              {answeredCount === 0 ? "Answer to see a recommendation" : "Your starting recommendation"}
            </p>
            <h3 className="mt-3 text-2xl">{recommendation.headline}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ivory-soft">
              {recommendation.explanation}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {recommendation.services.map((id) => (
                <li
                  key={id}
                  className="rounded-full border border-emerald/50 px-3 py-1 font-mono text-xs uppercase tracking-wide text-emerald"
                >
                  {services[id].name}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/pricing" variant="on-void">
                See indicative pricing
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                className="border-ivory-soft text-ivory hover:bg-ivory hover:text-void"
              >
                Talk to us
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
