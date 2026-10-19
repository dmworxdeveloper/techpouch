import Link from "next/link";
import { Check } from "lucide-react";
import { OrderPanel } from "./OrderPanel";
import { ProductGallery } from "./ProductGallery";
import { ProductGrid } from "./ProductCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { InfoNotice } from "@/components/ui/StatusMessage";
import type { Crumb } from "@/components/seo/Breadcrumbs";
import { getRelatedProducts, productHref, type Category, type Product } from "@/lib/catalog";
import { getFaqs } from "@/lib/faqs";
import { absoluteUrl } from "@/lib/site";

/*
 * Product structured data (schema.org/Product) is intentionally not output: Google
 * requires an Offer price, review or rating for Product markup, and none are published.
 * Add it here once real prices are made public.
 */

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

      <section aria-label="Product details" className="py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="space-y-8">
            <div className="space-y-3 text-ink-700">
              {product.description.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {category.notice && <InfoNotice>{category.notice}</InfoNotice>}

            <OrderPanel
              productName={product.name}
              productUrl={absoluteUrl(url)}
              sizes={product.sizes}
              variants={product.variants}
              inquiryMessage={product.inquiryMessage}
            />

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold text-ink-900">Features</h2>
                <ul className="mt-3 space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-ink-700">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {product.specifications.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-ink-900">Specifications</h2>
                  <dl className="mt-3 divide-y divide-line rounded-xl border border-line text-sm">
                    {product.specifications.map((spec) => (
                      <div key={spec.label} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3 px-3 py-2.5">
                        <dt className="font-medium text-ink-800">{spec.label}</dt>
                        <dd className="text-ink-600">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>

            <p className="text-sm text-ink-500">
              Buying for your business?{" "}
              <Link href="/wholesale" className="font-medium text-brand-600 hover:underline">
                Visit our wholesale page
              </Link>{" "}
              or{" "}
              <Link href="/custom-manufacturing" className="font-medium text-brand-600 hover:underline">
                discuss a custom version
              </Link>
              .
            </p>
          </div>
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
