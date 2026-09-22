import type { ServiceId } from "./services";

// Pricing is modeled as Service x Module x Entity.
// No real prices are approved yet, so every number-shaped value is a
// clearly bracketed placeholder. The selector below is a front-end
// prototype only — it demonstrates how scope drives the pricing
// conversation, it does not compute a real quote.

export type EntityType = "individual" | "business";

export type ComplexityTier = "simple" | "standard" | "complex";

export const complexityTiers: {
  id: ComplexityTier;
  label: string;
  helper: string;
}[] = [
  {
    id: "simple",
    label: "Simple",
    helper: "Low transaction volume, one bank account, straightforward records",
  },
  {
    id: "standard",
    label: "Standard",
    helper: "Moderate volume, a few accounts, typical small-business activity",
  },
  {
    id: "complex",
    label: "Complex",
    helper: "High volume, multiple accounts or revenue streams, added reporting needs",
  },
];

export const servicePriceMeta: Record<
  ServiceId,
  { startingLabel: string; unit: string }
> = {
  bookkeeping: { startingLabel: "[Add approved starting price]", unit: "/month" },
  accounting: { startingLabel: "[Add approved starting price]", unit: "/month" },
  taxation: { startingLabel: "[Add approved starting price]", unit: "/return" },
  controller: { startingLabel: "[Add approved starting price]", unit: "/month" },
};

export type PricingSelection = {
  services: ServiceId[];
  entityType: EntityType;
  entityCount: number;
  complexity: ComplexityTier;
};

export const defaultPricingSelection: PricingSelection = {
  services: ["bookkeeping"],
  entityType: "business",
  entityCount: 1,
  complexity: "simple",
};

export type PricingOutcome = {
  mode: "starting-price" | "consultation";
  headline: string;
  detail: string;
  factors: string[];
};

export function evaluatePricing(selection: PricingSelection): PricingOutcome {
  const { services, entityType, entityCount, complexity } = selection;
  const factors: string[] = [];

  if (services.length === 0) {
    return {
      mode: "consultation",
      headline: "Select at least one service to see indicative pricing",
      detail: "Choose bookkeeping, accounting, or taxation above to continue.",
      factors: [],
    };
  }

  const multiService = services.length > 1;
  const multiEntity = entityType === "business" && entityCount > 1;
  const isComplex = complexity === "complex";

  if (multiService) factors.push("Multiple services combined into one engagement");
  if (multiEntity) factors.push(`${entityCount} business entities in scope`);
  if (isComplex) factors.push("Complex transaction volume or reporting needs");

  if (!multiService && !multiEntity && !isComplex) {
    const service = services[0];
    const meta = servicePriceMeta[service];
    return {
      mode: "starting-price",
      headline: `Starting from ${meta.startingLabel}${meta.unit}`,
      detail:
        "This is indicative pricing for a typical single-service, single-entity scope. Final pricing is confirmed after reviewing your specific situation.",
      factors: [],
    };
  }

  return {
    mode: "consultation",
    headline: "This scope needs a short consultation to price accurately",
    detail:
      "Additional services, entities, or complexity change the scope of work, so we confirm final pricing directly with you rather than showing a single number here.",
    factors,
  };
}

export const pricingAssumptions: string[] = [
  "Pricing is built from Service, Module, and Entity — what you need, how it's delivered, and how many entities it covers.",
  "A single service for a single, simple entity can show an indicative starting price.",
  "Combining services, adding entities, or increasing complexity moves pricing into a consultation, because scope changes the work.",
  "Transaction volume, number of accounts, and reporting requirements all factor into final pricing.",
  "Nothing shown here is a binding quote. Final pricing is confirmed after we understand your business.",
];
