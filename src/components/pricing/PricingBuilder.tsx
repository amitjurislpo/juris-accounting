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
          <legend className="font-mono text-xs uppercase tracking-wide text-forest">
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
                    "rounded-sm border px-4 py-4 text-left transition-colors",
                    active
                      ? "border-forest bg-forest text-ivory"
                      : "border-hairline bg-cream text-charcoal hover:border-forest",
                  )}
                >
                  <span className="block text-sm font-medium">{service.name}</span>
                  <span
                    className={cn(
                      "mt-1 block text-xs leading-snug",
                      active ? "text-ivory" : "text-charcoal-soft",
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
          <legend className="font-mono text-xs uppercase tracking-wide text-forest">
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
                  "flex-1 rounded-sm border px-4 py-3 text-sm font-medium capitalize transition-colors",
                  entityType === type
                    ? "border-forest bg-forest text-ivory"
                    : "border-hairline bg-cream text-charcoal hover:border-forest",
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </fieldset>

        {entityType === "business" && (
          <fieldset>
            <legend className="font-mono text-xs uppercase tracking-wide text-forest">
              3. How many business entities?
            </legend>
            <div className="mt-3 flex items-center gap-4">
              <button
                type="button"
                aria-label="Decrease entity count"
                onClick={() => setEntityCount((c) => Math.max(1, c - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-charcoal hover:border-forest"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center text-2xl font-display text-charcoal">
                {entityCount}
              </span>
              <button
                type="button"
                aria-label="Increase entity count"
                onClick={() => setEntityCount((c) => Math.min(10, c + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-charcoal hover:border-forest"
              >
                <Plus size={16} />
              </button>
              <span className="text-sm text-charcoal-soft">
                {entityCount === 1 ? "entity" : "entities"}
              </span>
            </div>
          </fieldset>
        )}

        <fieldset>
          <legend className="font-mono text-xs uppercase tracking-wide text-forest">
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
                  "rounded-sm border px-4 py-3 text-left transition-colors",
                  complexity === tier.id
                    ? "border-forest bg-forest text-ivory"
                    : "border-hairline bg-cream text-charcoal hover:border-forest",
                )}
              >
                <span className="block text-sm font-medium">{tier.label}</span>
                <span
                  className={cn(
                    "mt-1 block text-xs",
                    complexity === tier.id ? "text-ivory" : "text-charcoal-soft",
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
        className="h-fit rounded-sm border border-hairline-dark bg-void p-6 text-ivory lg:sticky lg:top-28"
      >
        <p className="font-mono text-xs uppercase tracking-wide text-emerald">
          {outcome.mode === "starting-price" ? "Indicative pricing" : "Pricing outcome"}
        </p>
        <h3 className="mt-3 text-2xl leading-snug">{outcome.headline}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ivory">{outcome.detail}</p>
        {outcome.factors.length > 0 && (
          <ul className="mt-4 flex flex-col gap-1.5">
            {outcome.factors.map((f) => (
              <li key={f} className="text-xs text-emerald">
                • {f}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6">
          <Button href="/contact" variant="on-void" className="w-full">
            Confirm pricing with our team
          </Button>
        </div>
      </div>
    </div>
  );
}
