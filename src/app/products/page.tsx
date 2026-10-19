import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductImage } from "@/components/products/ProductImage";
import { Container } from "@/components/ui/Container";
import { primaryProducts, productHref, secondaryProducts } from "@/lib/products";
import { whatsappMessages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products — Tablet Covers & Mouse Pads",
  description:
    "Browse Tech Pouch zipper tablet covers, universal tablet covers in 7, 8 and 10-inch sizes, and mouse pads. Available for single-piece orders and wholesale supply.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Products", href: "/products" }]}
        title="Tablet Covers, Mouse Pads & Tech Accessories"
        lead="Explore our range of practical tech accessories for individual use, retail sales, and wholesale supply. Prices are shared on request so we can match your quantity and requirements."
      />

      <section aria-labelledby="main-range" className="py-16 sm:py-20">
        <Container>
          <h2 id="main-range" className="text-2xl font-semibold tracking-tight text-ink-900">
            Main product range
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {primaryProducts.map((product, i) => (
              <ProductCard key={product.slug} product={product} delay={i * 90} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="repair-range" className="bg-surface py-16 sm:py-20">
        <Container>
          <h2 id="repair-range" className="text-2xl font-semibold tracking-tight text-ink-900">
            Repair accessories
          </h2>
          {secondaryProducts.map((p) => (
            <Link
              key={p.slug}
              href={productHref(p.slug)}
              className="reveal group mt-8 grid items-center gap-6 overflow-hidden rounded-2xl border border-line bg-white transition hover:border-brand-200 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-brand-500 sm:grid-cols-[220px_1fr]"
            >
              <ProductImage image={p.image} sizes="220px" className="sm:h-full" />
              <div className="p-6 sm:pl-0">
                <h3 className="text-xl font-semibold text-ink-900">{p.name}</h3>
                <p className="mt-2 text-ink-600">{p.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  {p.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </Container>
      </section>

      <CtaBand
        title="Need something that isn't listed?"
        text="Tell us what you are looking for — we can discuss sourcing or manufacturing it to your requirements."
        message={whatsappMessages.custom}
        secondary={{ label: "Custom Manufacturing", href: "/custom-manufacturing" }}
      />
    </>
  );
}
