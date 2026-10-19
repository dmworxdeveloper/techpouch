import Link from "next/link";
import { ProductGrid } from "./ProductCard";
import { ProductSection } from "./ProductSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import type { Crumb } from "@/components/seo/Breadcrumbs";
import { getRelatedProducts, productHref, type Category, type Product } from "@/lib/catalog";
import { getFaqs } from "@/lib/faqs";
import { absoluteUrl } from "@/lib/site";

/* Product structured data is emitted by ProductSection for products with a confirmed price. */

/** Reusable product page body for any product in any category. */
export function ProductDetail({
  product,
  category,
  crumbs,
}: {
  product: Product;
  category: Category;
  /** Breadcrumb trail up to (and including) the category. */
  crumbs: Crumb[];
}) {
  const url = productHref(product);
  const related = getRelatedProducts(product);
  const faqs = getFaqs(product.faqIds);

  return (
    <>
      <PageHeader crumbs={[...crumbs, { label: product.name, href: url }]} title={product.name} lead={product.shortDescription} compact />

      <section aria-labelledby="product-details-heading" className="py-12 sm:py-16">
        <Container>
          <h2 id="product-details-heading" className="sr-only">
            Product details and ordering
          </h2>
          <ProductSection product={product} category={category} url={absoluteUrl(url)} priority />
          <p className="mt-10 text-sm text-ink-500">
            Buying for your business?{" "}
            <Link href="/wholesale" className="font-medium text-brand-600 hover:underline">
              Request a wholesale quote
            </Link>{" "}
            or{" "}
            <Link href="/custom-manufacturing" className="font-medium text-brand-600 hover:underline">
              discuss a custom version
            </Link>
            .
          </p>
        </Container>
      </section>

      {faqs.length > 0 && (
        <section aria-labelledby="product-faq" className="bg-tint py-14 sm:py-16">
          <Container>
            <div className="mx-auto max-w-4xl">
              <h2 id="product-faq" className="text-2xl font-semibold tracking-tight text-ink-900">
                Questions about the {product.name.toLowerCase()}
              </h2>
              <div className="mt-6">
                <FaqAccordion items={faqs} />
              </div>
            </div>
          </Container>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="py-14 sm:py-16">
          <Container>
            <h2 id="related-heading" className="text-2xl font-semibold tracking-tight text-ink-900">
              Related products
            </h2>
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </Container>
        </section>
      )}

      <CtaBand
        title="Need it made to your requirements?"
        text="Discuss custom sizes, materials or branding ideas with our team — we will tell you what is possible."
        message={`Hello Tech Pouch, I would like to discuss a custom version of the ${product.name}.\nProduct link: ${absoluteUrl(url)}`}
        secondary={{ label: "Custom Manufacturing", href: "/custom-manufacturing" }}
      />
    </>
  );
}
