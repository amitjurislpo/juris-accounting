"use client";

import { useState } from "react";
import { faqItems, type FaqItem } from "@/content/faq";
import { FaqAccordion } from "./FaqAccordion";
import { Tabs } from "@/components/ui/Tabs";

const categories: readonly (FaqItem["category"] | "All")[] = [
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
      <div className="mb-10">
        <Tabs items={categories} value={category} onChange={setCategory} label="FAQ categories" idBase="faq" />
      </div>
      <div id="faq-panel" role="tabpanel" aria-labelledby={`faq-tab-${categories.indexOf(category)}`}>
      {filtered.length > 0 ? (
        <div key={category} className="recommendation-fade">
          <FaqAccordion items={filtered} />
        </div>
      ) : (
        <div className="recommendation-fade rounded-card border border-dashed border-line-strong bg-surface/50 px-6 py-14 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-fg-subtle">Nothing here yet</p>
          <p className="mt-3 text-sm text-fg-muted">
            No questions in this category yet — ask us directly and we&apos;ll answer.
          </p>
        </div>
      )}
      </div>
    </div>
  );
}
