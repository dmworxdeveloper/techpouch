import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Building2, Check, ShoppingBag } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductImage } from "@/components/products/ProductImage";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getProduct, primaryProducts, productHref, products } from "@/lib/products";
import { whatsappUrl } from "@/lib/site";

/*
 * Product structured data is intentionally omitted: Google's Product rich results
 * need price/offer or review data, which is not published yet. Add a Product
 * JSON-LD block here once accurate prices and availability are confirmed.
 */

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const url = productHref(product.slug);
  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.seo.title} | Tech Pouch`,
      description: product.seo.description,
      url,
      images: [{ url: product.image.src, width: product.image.width, height: product.image.height, alt: product.image.alt }],
    },
  };
}

const whatToShare = [
  "Product and size you are interested in",
  "Quantity — a single piece or a bulk amount",
  "Any colour, style or specification preferences",
  "Your delivery city and country",
];

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = primaryProducts.filter((p) => p.slug !== product.slug).slice(0, 3);
  const wholesaleMessage = `Hello Tech Pouch, I am interested in wholesale pricing and bulk orders for ${product.name.toLowerCase()}.`;

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Products", href: "/products" },
          { label: product.name, href: productHref(product.slug) },
        ]}
        title={product.name}
        lead={product.intro}
      />

      <section aria-labelledby="details-heading" className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <ProductImage
              image={product.image}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="rounded-3xl border border-line shadow-soft"
            />
            {product.gallery.length > 0 && (
              <ul className="grid grid-cols-3 gap-3" aria-label={`More ${product.name} photos`}>
                {product.gallery.map((image) => (
                  <li key={image.src}>
                    <ProductImage image={image} sizes="(min-width: 1024px) 180px, 33vw" className="rounded-2xl border border-line" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 id="details-heading" className="text-2xl font-semibold tracking-tight text-ink-900">
              Product details
            </h2>
            <ul className="mt-5 space-y-3">
              {product.details.map((d) => (
                <li key={d} className="flex gap-3 text-ink-700">
                  <Check className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>

            {product.sizes && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold tracking-wide text-ink-500 uppercase">Size options</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <li
                      key={size}
                      className="rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 font-medium text-brand-700"
                    >
                      {size}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line p-5">
                <ShoppingBag className="size-5 text-brand-600" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-ink-900">Buying a single piece?</h3>
                <p className="mt-1 text-sm text-ink-600">Ask about availability, specifications and price.</p>
                <ButtonLink
                  href={whatsappUrl(product.whatsappMessage)}
                  external
                  variant="whatsapp"
                  className="mt-4 w-full"
                >
                  <WhatsAppIcon className="size-4" />
                  Ask on WhatsApp
                </ButtonLink>
              </div>
              <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-5">
                <Building2 className="size-5 text-brand-600" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-ink-900">Ordering in bulk?</h3>
                <p className="mt-1 text-sm text-ink-600">Share quantities to discuss wholesale pricing.</p>
                <ButtonLink href={whatsappUrl(wholesaleMessage)} external className="mt-4 w-full">
                  Request a Quote
                </ButtonLink>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-semibold text-ink-900">Helpful details to include in your inquiry</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-600">
                {whatToShare.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="bg-surface py-16 sm:py-20">
          <Container>
            <h2 id="related-heading" className="text-2xl font-semibold tracking-tight text-ink-900">
              Other Tech Pouch products
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} delay={i * 90} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand
        title="Want this product made to your requirements?"
        text="Discuss custom sizes, materials or branding ideas with our team — we will tell you what is possible."
        message={`Hello Tech Pouch, I would like to discuss a custom version of your ${product.name.toLowerCase()}.`}
        secondary={{ label: "Custom Manufacturing", href: "/custom-manufacturing" }}
      />
    </>
  );
}
