import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryCard, CategoryTile } from "@/components/products/ProductCard";
import { CustomManufacturingArt } from "@/components/products/CustomManufacturingArt";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { publishedCategories } from "@/lib/catalog";

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
          {publishedCategories.map((category, i) => (
            <CategoryTile
              key={category.id}
              category={category}
              delay={i * 70}
              imageSizes="(min-width: 1280px) 240px, (min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
            />
          ))}
          <CategoryCard
            title="Custom Manufacturing"
            href="/custom-manufacturing"
            description="Bring your own product ideas to life with our custom manufacturing services."
            cta="Learn More"
            media={<CustomManufacturingArt />}
            delay={publishedCategories.length * 70}
          />
        </div>

        <p className="reveal mt-8 text-center text-sm text-ink-500">
          Single pieces and bulk quantities are both welcome — prices are shared on request.
        </p>
      </Container>
    </section>
  );
}
