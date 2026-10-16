"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { pricingPlans as P } from "@/content/pricingPlans";

const money = (n: number) => P.currency + Math.round(n).toLocaleString("en-US");

export function PricingSpotlight() {
  const [serviceId, setServiceId] = useState<string>(P.services[0].id);
  const [selected, setSelected] = useState<string | null>(null);

  const service = P.services.find((s) => s.id === serviceId) ?? P.services[0];
  const planId = selected ?? service.hero;
  const plan = service.plans.find((p) => p.id === planId) ?? service.plans[0];
  const isHero = plan.id === service.hero;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <Eyebrow>Choose your plan</Eyebrow>
          <h2 className="mt-5 text-[1.7rem] leading-[1.08] tracking-[-0.04em] text-balance md:text-[2.2rem] lg:text-[2.6rem]">
            Select a plan, <em className="font-serif font-normal italic text-silver">see everything inside</em>
          </h2>
        </div>
        <div
          role="group"
          aria-label="Service"
          className="inline-flex max-w-full gap-1 overflow-x-auto rounded-[5px] border border-line bg-void/50 p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {P.services.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={s.id === serviceId}
              onClick={() => {
                setServiceId(s.id);
                setSelected(null);
              }}
              className={cn(
                "min-h-10 flex-none cursor-pointer whitespace-nowrap rounded-control px-4 py-2.5 text-[0.82rem] transition-colors duration-300",
                s.id === serviceId
                  ? "bg-platinum font-semibold text-on-accent"
                  : "font-medium text-fg-muted hover:text-fg",
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-11 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.2fr_1fr]">
        <article
          key={`${service.id}-${plan.id}`}
          className={cn(
            "lux-card relative flex h-full flex-col gap-[26px] overflow-hidden border-gold/45 p-6 sm:p-[30px] min-[601px]:p-11",
            "shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8),0_0_0_1px_rgba(201,151,79,0.12)]",
            "transition-[opacity,translate] duration-[550ms] ease-lux starting:translate-y-[10px] starting:opacity-0 motion-reduce:transition-none",
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[120px] -top-[120px] -z-10 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(201,151,79,0.16),transparent_65%)]"
          />
          <div className="flex flex-wrap items-center justify-between gap-3.5">
            <span className="inline-flex items-center gap-[7px] whitespace-nowrap rounded-control border border-platinum bg-platinum px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-on-accent">
              {isHero && "Recommended · "}
              {plan.hours}
            </span>
            <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.2em] text-fg-subtle">
              {service.name}
            </span>
          </div>

          <div>
            <h3 className="text-[1.65rem] font-semibold leading-tight tracking-[-0.01em] text-fg">{plan.name}</h3>
            <p className="mt-2.5 max-w-[68ch] text-[0.94rem] leading-[1.7] text-fg-muted">{service.blurb}</p>
          </div>

          <span className="text-[clamp(3.2rem,7vw,4.8rem)] font-semibold leading-none tracking-[-0.045em] text-fg [font-variant-numeric:tabular-nums]">
            {money(plan.price)}
            <sup className="ml-0.5 align-super text-[0.42em] font-medium tracking-normal text-silver">*</sup>{" "}
            <span className="text-[0.82rem] font-normal tracking-normal text-fg-subtle">{plan.per}</span>
          </span>

          <ul className="flex flex-col gap-3.5">
            {plan.points.map((t) => (
              <li key={t} className="flex items-start gap-[11px] text-[0.98rem] leading-normal text-fg-muted">
                <Check size={15} strokeWidth={2} className="mt-[5px] flex-none text-silver" aria-hidden />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-4">
            <Button href={P.ctaHref} glow>
              Get started
            </Button>
            <p className="text-xs leading-[1.55] text-fg-subtle">* {P.footnote}</p>
          </div>
        </article>

        <div className="flex h-full flex-col gap-3.5">
          <p className="mx-0.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-subtle">
            {service.name} · {service.billing}
          </p>
          {service.plans.map((p) => {
            const active = p.id === plan.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(p.id)}
                className={cn(
                  "grid min-h-0 flex-1 cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-3.5 rounded-card border p-5 text-left sm:min-h-[132px] sm:gap-5 sm:px-[30px] sm:py-7",
                  "transition-[border-color,background-color,box-shadow,translate] duration-300 ease-lux hover:-translate-y-0.5",
                  active
                    ? "border-gold bg-[linear-gradient(180deg,rgba(201,151,79,0.15),rgba(201,151,79,0.04))] shadow-[0_0_0_1px_rgba(201,151,79,0.15),0_30px_60px_-30px_rgba(0,0,0,0.8)]"
                    : "border-line bg-[linear-gradient(180deg,#0f2d22,#0b241b)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-line-strong hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "grid h-[22px] w-[22px] place-items-center rounded-full border-[1.5px] transition-colors duration-300",
                    active ? "border-gold" : "border-line-strong",
                  )}
                >
                  {active && <span className="h-2.5 w-2.5 rounded-full bg-gold" />}
                </span>
                <span>
                  <span
                    className={cn(
                      "block font-mono text-[10.5px] uppercase tracking-[0.16em]",
                      active ? "text-silver" : "text-fg-subtle",
                    )}
                  >
                    {p.tag} · {p.hours}
                  </span>
                  <span className="mt-1.5 block text-[1.15rem] font-semibold tracking-[-0.015em] text-fg">
                    {p.name}
                    {p.id === service.hero && (
                      <span className="ml-2.5 inline-block rounded-control border border-line-strong bg-[rgba(201,151,79,0.08)] px-[7px] py-1 align-middle font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-silver">
                        Recommended
                      </span>
                    )}
                  </span>
                </span>
                <span className="whitespace-nowrap text-right text-[1.4rem] font-semibold leading-none tracking-[-0.04em] text-fg sm:text-[1.75rem]">
                  {money(p.price)}
                  <small className="mt-1.5 block text-[0.76rem] font-normal tracking-normal text-fg-subtle">
                    {p.per}
                  </small>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-card border border-line bg-void/45 px-6 py-[18px]">
        <p className="flex-[1_1_420px] text-[0.95rem] text-fg-muted">
          <b className="font-medium text-fg">Not sure which plan fits?</b> Tell us about your business and we&apos;ll
          recommend the right engagement.
        </p>
        <Button href={P.ctaHref} glow>
          Talk to our team
        </Button>
      </div>
    </div>
  );
}
