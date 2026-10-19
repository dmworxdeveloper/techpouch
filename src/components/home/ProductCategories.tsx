import Link from "next/link";
import { ArrowRight, Headphones } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { primaryProducts, productHref, secondaryProducts } from "@/lib/products";

export function ProductCategories() {
  return (
    <section id="products" aria-labelledby="products-heading" className="bg-surface py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="products-heading"
          eyebrow="Product range"
          title="Our Products"
          description="Explore our range of practical tech accessories for individual use, retail sales, and wholesale supply."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {primaryProducts.map((product, i) => (
            <ProductCard key={product.slug} product={product} delay={i * 90} />
          ))}
        </div>

        <p className="reveal mt-8 text-center text-sm text-ink-600">
          Single pieces and bulk quantities are both welcome — prices are shared on request.
        </p>

        {secondaryProducts.map((p) => (
          <Link
            key={p.slug}
            href={productHref(p.slug)}
            className="reveal group mx-auto mt-6 flex max-w-xl items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4 transition hover:border-brand-200 hover:shadow-soft focus-visible:outline-2 focus-visible:outline-brand-500"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Headphones className="size-5" aria-hidden="true" />
            </span>
            <span className="flex-1 text-sm">
              <span className="block font-semibold text-ink-900">Also available: {p.name}</span>
              <span className="text-ink-600">Selected repair accessories — see availability</span>
            </span>
            <ArrowRight className="size-4 text-brand-600 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        ))}
      </Container>
    </section>
  );
}
