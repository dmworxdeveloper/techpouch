import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryCard, ProductCard } from "@/components/products/ProductCard";
import { CustomManufacturingArt } from "@/components/products/CustomManufacturingArt";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/lib/products";

export function ProductCategories() {
  return (
    <section id="products" aria-labelledby="products-heading" className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="products-heading"
            eyebrow="Our products"
            title="Explore Our Product Range"
            description="From tablet covers to mouse pads, we offer a range of tech accessories for personal use, retail sales and wholesale supply."
            align="left"
          />
          <Link
            href="/products"
            className="reveal group inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            View All Products
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((product, i) => (
            <ProductCard key={product.slug} product={product} delay={i * 70} />
          ))}
          <CategoryCard
            title="Custom Manufacturing"
            href="/custom-manufacturing"
            description="Bring your own product ideas to life with our custom manufacturing services."
            cta="Learn More"
            media={<CustomManufacturingArt />}
            delay={products.length * 70}
          />
        </div>

        <p className="reveal mt-8 text-center text-sm text-ink-500">
          Single pieces and bulk quantities are both welcome — prices are shared on request.
        </p>
      </Container>
    </section>
  );
}
