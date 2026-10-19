import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { ProductImage } from "./ProductImage";
import { InquiryPriceNote, PriceTag } from "./PriceTag";
import {
  bulkPricingHref,
  getCategoryById,
  getCategoryPrice,
  getCategorySizes,
  getProductsInCategory,
  productHref,
  type Category,
  type Product,
} from "@/lib/catalog";
import { revealDelay } from "@/lib/reveal";

type CategoryCardProps = {
  title: string;
  href: string;
  description: string;
  cta: string;
  media: ReactNode;
  sizes?: string[];
  /** Price line (or inquiry note) shown under the description. */
  price?: ReactNode;
  /** Adds a "Request Bulk Pricing" link for wholesale buyers. */
  bulkHref?: string;
  headingLevel?: "h2" | "h3";
  delay?: number;
};

/** Card shell shared by categories, products and the custom manufacturing card. */
export function CategoryCard({
  title,
  href,
  description,
  cta,
  media,
  sizes,
  price,
  bulkHref,
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
          {price}
          {sizes && sizes.length > 0 && (
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
            {bulkHref && (
              // Sits above the card-wide link overlay so it stays separately clickable.
              <Link
                href={bulkHref}
                className="relative z-10 mt-2 flex min-h-9 w-fit items-center gap-1.5 text-xs font-semibold text-ink-700 underline-offset-2 hover:text-brand-600 hover:underline focus-visible:outline-2 focus-visible:outline-brand-500"
              >
                <FileText className="size-3.5" aria-hidden="true" />
                Request Bulk Pricing
              </Link>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

/** Category cards show the shared single-piece price, or an inquiry note when none of its products are priced. */
function categoryPrice(category: Category): ReactNode {
  const price = getCategoryPrice(category.id);
  if (price) return <PriceTag pricing={price} size="sm" />;
  const items = getProductsInCategory(category.id);
  return items.length > 0 && items.every((p) => !p.pricing) ? <InquiryPriceNote size="sm" /> : null;
}

const cardImageSizes = "(min-width: 1280px) 300px, (min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw";

export function CategoryTile({
  category,
  headingLevel,
  delay,
  imageSizes = cardImageSizes,
}: {
  category: Category;
  headingLevel?: "h2" | "h3";
  delay?: number;
  imageSizes?: string;
}) {
  return (
    <CategoryCard
      title={category.name}
      href={category.href}
      description={category.summary}
      cta={category.cardCta}
      sizes={getCategorySizes(category.id)}
      price={categoryPrice(category)}
      bulkHref={bulkPricingHref(category.name, category.name)}
      headingLevel={headingLevel}
      delay={delay}
      media={<ProductImage image={category.image} sizes={imageSizes} aspect="aspect-[4/3]" />}
    />
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
      href={productHref(product)}
      description={product.shortDescription}
      cta="View Product"
      sizes={product.sizes}
      bulkHref={bulkPricingHref(product.name, getCategoryById(product.categoryId)?.name)}
      price={product.pricing ? <PriceTag pricing={product.pricing} size="sm" /> : <InquiryPriceNote size="sm" />}
      headingLevel={headingLevel}
      delay={delay}
      media={<ProductImage image={product.images[0]} sizes={cardImageSizes} aspect="aspect-[4/3]" />}
    />
  );
}

/** Responsive grid that adapts to any number of products. */
export function ProductGrid({ products, headingLevel }: { products: Product[]; headingLevel?: "h2" | "h3" }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} headingLevel={headingLevel} delay={(i % 4) * 70} />
      ))}
    </div>
  );
}
