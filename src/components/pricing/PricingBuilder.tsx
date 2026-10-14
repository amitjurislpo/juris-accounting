"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { serviceList, type ServiceId } from "@/content/services";
import {
  complexityTiers,
  evaluatePricing,
  defaultPricingSelection,
  type EntityType,
  type ComplexityTier,
} from "@/content/pricing";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

export function PricingBuilder() {
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>(
    defaultPricingSelection.services,
  );
  const [entityType, setEntityType] = useState<EntityType>(
    defaultPricingSelection.entityType,
  );
  const [entityCount, setEntityCount] = useState(
    defaultPricingSelection.entityCount,
  );
  const [complexity, setComplexity] = useState<ComplexityTier>(
    defaultPricingSelection.complexity,
  );

  const outcome = evaluatePricing({
    services: selectedServices,
    entityType,
    entityCount,
    complexity,
  });

  function toggleService(id: ServiceId) {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <div className="flex flex-col gap-8">
        <fieldset>
          <legend className="font-mono text-xs uppercase tracking-wide text-silver">
            1. Which service(s) do you need?
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {serviceList.map((service) => {
              const active = selectedServices.includes(service.id);
              return (
                <button
                  key={service.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleService(service.id)}
                  className={cn(
                    "rounded-control border px-4 py-4 text-left transition-[background-color,border-color,color,box-shadow,translate] duration-300 hover:-translate-y-px",
                    active
                      ? "border-fg bg-fg text-canvas shadow-[0_10px_30px_-14px_rgba(255,255,255,0.3)]"
                      : "border-line bg-raised text-fg hover:border-silver",
                  )}
                >
                  <span className="block text-sm font-medium">{service.name}</span>
                  <span
                    className={cn(
                      "mt-1 block text-xs leading-snug",
                      active ? "text-canvas/70" : "text-fg-muted",
                    )}
                  >
                    {service.oneLiner}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-mono text-xs uppercase tracking-wide text-silver">
            2. Individual or business entity?
          </legend>
          <div className="mt-3 flex gap-3">
            {(["individual", "business"] as EntityType[]).map((type) => (
              <button
                key={type}
                type="button"
                aria-pressed={entityType === type}
                onClick={() => setEntityType(type)}
                className={cn(
                  "flex-1 rounded-control border px-4 py-3 text-sm font-medium capitalize transition-[background-color,border-color,color,box-shadow,translate] duration-300 hover:-translate-y-px",
                  entityType === type
                    ? "border-fg bg-fg text-canvas shadow-[0_10px_30px_-14px_rgba(255,255,255,0.3)]"
                    : "border-line bg-raised text-fg hover:border-silver",
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </fieldset>

        {entityType === "business" && (
          <fieldset>
            <legend className="font-mono text-xs uppercase tracking-wide text-silver">
              3. How many business entities?
            </legend>
            <div className="mt-3 flex items-center gap-4">
              <button
                type="button"
                aria-label="Decrease entity count"
                onClick={() => setEntityCount((c) => Math.max(1, c - 1))}
                className="flex h-10 w-10 items-center justify-center border border-line text-fg transition-[border-color,color,scale] duration-300 hover:border-silver hover:text-silver active:scale-95"
              >
                <Minus size={16} />
              </button>
              <span key={entityCount} className="recommendation-fade w-10 text-center font-display text-3xl text-fg">
                {entityCount}
              </span>
              <button
                type="button"
                aria-label="Increase entity count"
                onClick={() => setEntityCount((c) => Math.min(10, c + 1))}
                className="flex h-10 w-10 items-center justify-center border border-line text-fg transition-[border-color,color,scale] duration-300 hover:border-silver hover:text-silver active:scale-95"
              >
                <Plus size={16} />
              </button>
              <span className="text-sm text-fg-muted">
                {entityCount === 1 ? "entity" : "entities"}
              </span>
            </div>
          </fieldset>
        )}

        <fieldset>
          <legend className="font-mono text-xs uppercase tracking-wide text-silver">
            {entityType === "business" ? "4." : "3."} Transaction volume / complexity
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {complexityTiers.map((tier) => (
              <button
                key={tier.id}
                type="button"
                aria-pressed={complexity === tier.id}
                onClick={() => setComplexity(tier.id)}
                className={cn(
                  "rounded-control border px-4 py-3 text-left transition-[background-color,border-color,color,box-shadow,translate] duration-300 hover:-translate-y-px",
                  complexity === tier.id
                    ? "border-fg bg-fg text-canvas shadow-[0_10px_30px_-14px_rgba(255,255,255,0.3)]"
                    : "border-line bg-raised text-fg hover:border-silver",
                )}
              >
                <span className="block text-sm font-medium">{tier.label}</span>
                <span
                  className={cn(
                    "mt-1 block text-xs",
                    complexity === tier.id ? "text-canvas/70" : "text-fg-muted",
                  )}
                >
                  {tier.helper}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div
        data-testid="pricing-outcome"
        aria-live="polite"
        className="relative h-fit overflow-hidden rounded-card border border-platinum/25 bg-void p-7 text-fg shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] lg:sticky lg:top-28"
      >
        <div className="hairline-rule absolute inset-x-0 top-0" aria-hidden />
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-[0.08] blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--platinum), transparent)" }}
          aria-hidden
        />
        <div key={outcome.headline} className="recommendation-fade relative">
        <p className="font-mono text-xs uppercase tracking-wide text-platinum">
          {outcome.mode === "starting-price" ? "Indicative pricing" : "Pricing outcome"}
        </p>
        <h3 className="mt-3 text-2xl leading-snug">{outcome.headline}</h3>
        <p className="mt-3 text-sm leading-relaxed text-fg">{outcome.detail}</p>
        {outcome.factors.length > 0 && (
          <ul className="mt-4 flex flex-col gap-1.5">
            {outcome.factors.map((f) => (
              <li key={f} className="text-xs text-platinum">
                • {f}
              </li>
            ))}
          </ul>
        )}
        </div>
        <div className="relative mt-7">
          <Button href="/contact" variant="on-void" className="w-full">
            Confirm pricing with our team
          </Button>
        </div>
      </div>
    </div>
  );
}
