import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Headphones } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { CategoryTile, ProductGrid } from "@/components/products/ProductCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/StatusMessage";
import { ButtonLink } from "@/components/ui/Button";
import { catalogCategories, dedicatedCategories, getProductsInCategory } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";
import { whatsappMessages } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Products — Tablet Covers & Mouse Pads",
  description:
    "Browse Tech Pouch zipper tablet covers, universal tablet covers in 7, 8 and 10-inch sizes, and mouse pads. Order single pieces or request wholesale quotes.",
  path: "/products",
});

export default function ProductsPage() {
  const sections = catalogCategories.map((category) => ({ category, items: getProductsInCategory(category.id) }));

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Products", href: "/products" }]}
        eyebrow="Our products"
        title="Tech Accessories Made for Retail and Wholesale"
        lead="Explore our tablet covers, mouse pads and more. Order a single piece via WhatsApp or request a wholesale quote — prices are shared on request."
      />

      <section aria-labelledby="categories-heading" className="py-14 sm:py-16">
        <Container>
          <h2 id="categories-heading" className="text-2xl font-semibold tracking-tight text-ink-900">
            Shop by category
          </h2>
          <nav aria-label="Product categories" className="mt-4 flex flex-wrap gap-2">
            {sections.map(({ category }) => (
              <a
                key={category.id}
                href={`#${category.slug}`}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
              >
                {category.name}
              </a>
            ))}
            {dedicatedCategories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
              >
                {category.name}
              </Link>
            ))}
          </nav>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {catalogCategories.map((category, i) => (
              <CategoryTile key={category.id} category={category} delay={i * 80} />
            ))}
          </div>
        </Container>
      </section>

      {sections.map(({ category, items }, i) => (
        <section
          key={category.id}
          id={category.slug}
          aria-labelledby={`${category.slug}-heading`}
          className={`scroll-mt-24 py-14 sm:py-16 ${i % 2 === 0 ? "bg-tint" : ""}`}
        >
          <Container>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <h2 id={`${category.slug}-heading`} className="text-2xl font-semibold tracking-tight text-ink-900">
                  {category.name}
                </h2>
                <p className="mt-2 text-ink-600">{category.summary}</p>
              </div>
              <Link
                href={category.href}
                className="group inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                View category
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8">
              {items.length > 0 ? (
                <ProductGrid products={items} headingLevel="h3" />
              ) : (
                <EmptyState title="New products coming soon">
                  Ask our team about current availability in this category.
                </EmptyState>
              )}
            </div>
          </Container>
        </section>
      ))}

      {dedicatedCategories.map((category) => (
        <section key={category.id} aria-label={category.name} className="py-14 sm:py-16">
          <Container>
            <Link
              href={category.href}
              className="group flex flex-col items-start gap-4 rounded-2xl border border-line bg-white p-6 shadow-soft transition hover:border-brand-200 hover:shadow-lift sm:flex-row sm:items-center"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Headphones className="size-6" aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="block font-semibold text-ink-900">Looking for {category.name.toLowerCase()}?</span>
                <span className="text-sm text-ink-600">{category.summary} These have their own dedicated page.</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                {category.cardCta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </Container>
        </section>
      ))}

      <section className="pb-4">
        <Container className="text-center">
          <ButtonLink href="/wholesale" variant="outline">
            Buying in bulk? Visit the wholesale page
          </ButtonLink>
        </Container>
      </section>

      <CtaBand
        title="Need something that isn't listed?"
        text="Tell us what you are looking for — we can discuss sourcing it or manufacturing it to your requirements."
        message={whatsappMessages.custom}
        secondary={{ label: "Custom Manufacturing", href: "/custom-manufacturing" }}
      />
    </>
  );
}
