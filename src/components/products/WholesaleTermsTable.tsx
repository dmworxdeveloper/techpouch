import Link from "next/link";
import { FileText } from "lucide-react";
import { ProductImage } from "./ProductImage";
import { buttonClasses } from "@/components/ui/Button";
import {
  bulkPricingHref,
  formatPrice,
  getCategoryById,
  productHref,
  publishedProducts,
  wholesaleRows,
} from "@/lib/catalog";

/** Every product's retail price beside its wholesale terms, each with a "Request Bulk Pricing" action. */
export function WholesaleTermsTable() {
  return (
    <ul className="grid gap-5 lg:grid-cols-2">
      {publishedProducts.map((product) => {
        const category = getCategoryById(product.categoryId);
        return (
          <li key={product.id} className="reveal flex flex-col rounded-2xl border border-line bg-white p-5 shadow-soft">
            <div className="flex items-center gap-4">
              <ProductImage
                image={product.images[0]}
                sizes="80px"
                className="size-20 shrink-0 rounded-xl border border-line"
                aspect="aspect-square"
              />
              <div className="min-w-0">
                <h3 className="font-semibold text-ink-900">
                  <Link href={productHref(product)} className="hover:text-brand-600">
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-ink-600">
                  Retail:{" "}
                  <span className="font-semibold text-ink-900">
                    {product.pricing ? `${formatPrice(product.pricing)} per piece` : "price on inquiry"}
                  </span>
                </p>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4 text-sm">
              {wholesaleRows(product).map(({ key, label, value, confirmed }) => (
                <div key={key}>
                  <dt className="text-xs font-semibold tracking-wide text-ink-500 uppercase">{label}</dt>
                  <dd className={confirmed ? "mt-0.5 font-semibold text-ink-900" : "mt-0.5 text-ink-600"}>{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto pt-5">
              <Link href={bulkPricingHref(product.name, category?.name)} className={buttonClasses("primary", "md", "w-full sm:w-auto")}>
                <FileText className="size-4" aria-hidden="true" />
                Request Bulk Pricing
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
