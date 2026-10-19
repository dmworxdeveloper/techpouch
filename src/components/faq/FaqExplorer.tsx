"use client";

import { useId, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { EmptyState } from "@/components/ui/StatusMessage";
import { buttonClasses } from "@/components/ui/Button";
import type { Faq, FaqTopic } from "@/lib/faqs";

/** Searchable, topic-filtered FAQ list. All questions are server-rendered; filtering happens in the browser. */
export function FaqExplorer({ faqs, topics }: { faqs: Faq[]; topics: FaqTopic[] }) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<FaqTopic | "All">("All");

  const filtered = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return faqs.filter(
      (f) =>
        (topic === "All" || f.topic === topic) &&
        words.every((w) => `${f.question} ${f.answer}`.toLowerCase().includes(w)),
    );
  }, [faqs, query, topic]);

  const visibleTopics = topics.filter((t) => filtered.some((f) => f.topic === t));

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <label htmlFor={searchId} className="sr-only">
            Search questions
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-ink-500" aria-hidden="true" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            className="h-12 w-full rounded-xl border border-line bg-white pr-4 pl-11 text-base shadow-sm transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:outline-none"
          />
        </div>
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          {(["All", ...topics] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-brand-500 ${
                topic === t
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-line bg-white text-ink-700 hover:border-brand-200 hover:bg-brand-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "question" : "questions"} shown
      </p>

      <div className="mt-10 space-y-10">
        {visibleTopics.map((t) => (
          <section key={t} aria-labelledby={`topic-${t.replace(/\W+/g, "-")}`}>
            <h2 id={`topic-${t.replace(/\W+/g, "-")}`} className="mb-4 text-xl font-semibold text-ink-900">
              {t}
            </h2>
            <FaqAccordion items={filtered.filter((f) => f.topic === t)} />
          </section>
        ))}
        {filtered.length === 0 && (
          <EmptyState
            title="No matching questions"
            action={
              <button type="button" onClick={() => { setQuery(""); setTopic("All"); }} className={buttonClasses("secondary")}>
                Clear search
              </button>
            }
          >
            Try a different word, or contact our team and we will answer your question directly.
          </EmptyState>
        )}
      </div>
    </div>
  );
}
