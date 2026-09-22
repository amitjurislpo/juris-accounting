"use client";

import { useState } from "react";
import { faqItems, type FaqItem } from "@/content/faq";
import { FaqAccordion } from "./FaqAccordion";
import { cn } from "@/lib/cn";

const categories: (FaqItem["category"] | "All")[] = [
  "All",
  "General",
  "Bookkeeping",
  "Accounting",
  "Taxation",
  "Controller Services",
  "Pricing",
];

export function FaqPageContent() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const filtered =
    category === "All" ? faqItems : faqItems.filter((f) => f.category === category);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={category === cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              category === cat
                ? "border-forest bg-forest text-ivory"
                : "border-hairline bg-cream text-charcoal hover:border-forest",
            )}
          >
            {cat}
          </button>
        ))}
      </div>
      <FaqAccordion items={filtered} key={category} />
    </div>
  );
}
