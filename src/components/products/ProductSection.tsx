import { Check } from "lucide-react";
import { InquiryPriceNote, PriceTag } from "./PriceTag";
import { ProductShowcase } from "./ProductShowcase";
import { JsonLd } from "@/components/seo/JsonLd";
import { InfoNotice } from "@/components/ui/StatusMessage";
import type { Category, Product } from "@/lib/catalog";
import { absoluteUrl, siteConfig } from "@/lib/site";

/**
 * schema.org Product with the confirmed single-piece Offer. Only output for priced products;
 * availability and delivery costs are omitted because they are confirmed per order.
 */
export function productJsonLd(product: Product, url: string) {
  if (!product.pricing) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((image) => absoluteUrl(image.src)),
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      url,
      price: product.pricing.amount,
      priceCurrency: product.pricing.currency,
      seller: { "@type": "Organization", name: siteConfig.name },
    },
  };
}

/**
 * Full product block: independent gallery, description, price and delivery terms,
 * WhatsApp ordering, features and specifications. Used on product pages and for
 * products shown as sections on their category page.
 */
export function ProductSection({
  product,
  category,
  url,
  heading,
  priority = false,
}: {
  product: Product;
  category: Category;
  /** Absolute page URL used in WhatsApp messages and structured data. */
  url: string;
  /** Optional heading rendered above the description (e.g. on multi-product pages). */
  heading?: React.ReactNode;
  priority?: boolean;
}) {
  const schema = productJsonLd(product, url);

  return (
    <>
      {schema && <JsonLd data={schema} />}
      <ProductShowcase
        product={product}
        productUrl={url}
        priority={priority}
        before={
          <>
            {heading}
            <div className="space-y-3 text-ink-700">
              {product.description.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            {product.pricing ? <PriceTag pricing={product.pricing} /> : <InquiryPriceNote />}
            {category.notice && <InfoNotice>{category.notice}</InfoNotice>}
          </>
        }
        after={
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-ink-900">Features</h3>
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
                <h3 className="text-lg font-semibold text-ink-900">Specifications</h3>
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
        }
      />
    </>
  );
}
