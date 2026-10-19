import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ProductImage } from "./ProductImage";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { productHref, type Product } from "@/lib/products";
import { whatsappUrl } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";

export function ProductCard({
  product,
  headingLevel = "h3",
  delay = 0,
}: {
  product: Product;
  headingLevel?: "h2" | "h3";
  delay?: number;
}) {
  const Heading = headingLevel;
  const href = productHref(product.slug);

  return (
    <div className="reveal h-full" style={revealDelay(delay)}>
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-500"
    >
      <ProductImage
        image={product.image}
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
        aspect="aspect-[4/3]"
        className="border-b border-line"
      />
      <div className="flex flex-1 flex-col p-6">
        <Heading className="text-xl font-semibold text-ink-900">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {product.name}
          </Link>
        </Heading>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">{product.summary}</p>

        {product.sizes && (
          <div className="mt-4">
            <p className="text-xs font-semibold tracking-wide text-ink-500 uppercase">Size options</p>
            <ul className="mt-2 flex flex-wrap gap-2" aria-label={`${product.name} size options`}>
              {product.sizes.map((size) => (
                <li
                  key={size}
                  className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700"
                >
                  {size}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!product.sizes && (
          <ul className="mt-4 space-y-1.5">
            {product.details.slice(0, 2).map((d) => (
              <li key={d} className="flex gap-2 text-sm text-ink-700">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-col items-start pt-6">
          <span className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
            {product.cta}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </span>
          {/* Sits above the card-wide link overlay so it stays independently clickable. */}
          <a
            href={whatsappUrl(product.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors hover:text-whatsapp-dark focus-visible:outline-2 focus-visible:outline-brand-500"
            aria-label={`Ask about ${product.name} on WhatsApp (opens in a new tab)`}
          >
            <WhatsAppIcon className="size-4" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </article>
    </div>
  );
}
