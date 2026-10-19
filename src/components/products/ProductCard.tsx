import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ProductImage } from "./ProductImage";
import { productHref, type Product } from "@/lib/products";
import { revealDelay } from "@/lib/reveal";

type CategoryCardProps = {
  title: string;
  href: string;
  description: string;
  cta: string;
  media: ReactNode;
  sizes?: string[];
  headingLevel?: "h2" | "h3";
  delay?: number;
};

/** Card shell shared by product categories and the custom manufacturing card. */
export function CategoryCard({
  title,
  href,
  description,
  cta,
  media,
  sizes,
  headingLevel = "h3",
  delay = 0,
}: CategoryCardProps) {
  const Heading = headingLevel;
  return (
    <div className="reveal h-full" style={revealDelay(delay)}>
      <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-2 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-500">
        <div className="overflow-hidden rounded-xl border border-line/70 bg-white">{media}</div>
        <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
          <Heading className="text-base font-semibold text-ink-900">{title}</Heading>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">{description}</p>
          {sizes && (
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${title} size options`}>
              {sizes.map((size) => (
                <li
                  key={size}
                  className="rounded-md border border-brand-200 bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700"
                >
                  {size}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto pt-5">
            {/* The link's overlay makes the whole card clickable. */}
            <Link
              href={href}
              className="inline-flex min-h-10 items-center gap-1.5 whitespace-nowrap rounded-lg bg-brand-600 px-3 text-xs font-semibold text-white transition-colors after:absolute after:inset-0 after:rounded-2xl group-hover:bg-brand-700 focus-visible:outline-none"
            >
              {cta}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export function ProductCard({
  product,
  headingLevel,
  delay,
}: {
  product: Product;
  headingLevel?: "h2" | "h3";
  delay?: number;
}) {
  return (
    <CategoryCard
      title={product.name}
      href={productHref(product.slug)}
      description={product.summary}
      cta={product.cta}
      sizes={product.sizes}
      headingLevel={headingLevel}
      delay={delay}
      media={
        <ProductImage
          image={product.image}
          sizes="(min-width: 1280px) 240px, (min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
          aspect="aspect-[4/3]"
        />
      }
    />
  );
}
