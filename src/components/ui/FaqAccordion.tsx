import { Plus } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Faq } from "@/lib/faqs";

/**
 * Accessible accordion built on native <details>/<summary> (keyboard and screen-reader
 * support with no JavaScript). `withSchema` adds FAQPage structured data matching the
 * visible questions — enable it on one page per set of questions only.
 */
export function FaqAccordion({ items, withSchema = false }: { items: Faq[]; withSchema?: boolean }) {
  if (items.length === 0) return null;
  return (
    <>
      <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
        {items.map((faq) => (
          <details key={faq.id} id={`faq-${faq.id}`} className="group scroll-mt-28">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink-900 transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500 sm:px-6 [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-300 group-open:rotate-45">
                <Plus className="size-4" aria-hidden="true" />
              </span>
            </summary>
            <div className="px-5 pb-5 text-sm leading-relaxed text-ink-600 group-open:animate-fade-up sm:px-6 sm:text-base">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }}
        />
      )}
    </>
  );
}
