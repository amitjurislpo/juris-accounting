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
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-silver">
          <span>{answeredCount}/{total} answered</span>
          <div className="flex gap-1">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-0.5 w-8 transition-colors duration-500",
                  i < answeredCount ? "bg-silver" : "bg-line",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <Reveal className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-6">
          {qualifierQuestions.map((q, i) => (
            <div key={q.id} className="rounded-control border border-line bg-surface p-6 transition-colors duration-500 hover:border-silver/40">
              <p className="font-mono text-xs uppercase tracking-wide text-silver">
                Question {i + 1} of {total}
              </p>
              <p className="mt-2 text-lg text-fg">{q.prompt}</p>
              {q.helper && <p className="mt-1 text-sm text-fg-muted">{q.helper}</p>}
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
                        "rounded-control border px-4 py-1.5 text-sm transition-[background-color,border-color,color,box-shadow] duration-300",
                        active
                          ? "border-fg bg-fg text-canvas shadow-[0_10px_30px_-14px_rgba(255,255,255,0.3)]"
                          : "border-line bg-canvas text-fg hover:border-silver",
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

        <div className="relative self-start overflow-hidden rounded-card border border-platinum/30 bg-void p-7 text-fg shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)] lg:sticky lg:top-28">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-[0.08] blur-3xl"
            style={{ background: "radial-gradient(closest-side, var(--platinum), transparent)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, var(--platinum), transparent)" }}
            aria-hidden
          />
          <div key={recommendation.headline} className="relative recommendation-fade">
            <p className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-platinum">
              <Sparkles size={13} aria-hidden />
              {answeredCount === 0 ? "Answer to see a recommendation" : "Your starting recommendation"}
            </p>
            <h3 className="mt-3 text-2xl">{recommendation.headline}</h3>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {recommendation.explanation}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {recommendation.services.map((id) => (
                <li
                  key={id}
                  className="rounded-xs border border-platinum/50 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-platinum"
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
                className="border-fg-muted text-fg hover:bg-canvas hover:text-void"
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
