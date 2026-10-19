"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Boxes, Building2, Clock, FileText, Palette, Tags } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { bulkPricingHref, wholesaleRows, type Product } from "@/lib/catalog";
import { whatsappUrl } from "@/lib/site";

const ICONS = { moq: Boxes, bulkPricing: Tags, customization: Palette, leadTime: Clock } as const;

/**
 * Bulk-buyer pathway shown on every product, separate from retail ordering: MOQ, bulk
 * pricing, customization and lead time, an estimated quantity, and "Request Bulk Pricing".
 */
export function WholesalePanel({
  product,
  categoryName,
  productUrl,
}: {
  product: Pick<Product, "name" | "wholesale">;
  categoryName: string;
  productUrl: string;
}) {
  const id = useId();
  const [quantity, setQuantity] = useState("");
  const qty = Number.parseInt(quantity, 10);
  const validQty = Number.isFinite(qty) && qty > 0 ? qty : undefined;

  const whatsappMessage = [
    `Hello Tech Pouch, I would like bulk pricing for ${product.name}.`,
    `Estimated quantity: ${validQty ?? "[quantity]"}`,
    "Please share your MOQ, bulk price, customization options and lead time.",
    `Product link: ${productUrl}`,
  ].join("\n");

  return (
    <section aria-labelledby={`${id}-title`} className="rounded-2xl border border-navy-800/15 bg-navy-900 p-5 text-white shadow-soft sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-brand-300">
          <Building2 className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h3 id={`${id}-title`} className="text-lg font-semibold">
            Wholesale &amp; Bulk Orders
          </h3>
          <p className="text-sm text-white/65">For retailers, resellers, distributors and businesses.</p>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        {wholesaleRows(product).map(({ key, label, value, confirmed }) => {
          const Icon = ICONS[key];
          return (
            <div key={key} className="rounded-xl bg-white/[0.06] p-3 ring-1 ring-white/10">
              <dt className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white/60 uppercase">
                <Icon className="size-4 text-brand-300" aria-hidden="true" />
                {label}
              </dt>
              <dd className={`mt-1 text-sm ${confirmed ? "font-semibold text-white" : "text-white/80"}`}>{value}</dd>
            </div>
          );
        })}
      </dl>

      <div className="mt-5">
        <label htmlFor={`${id}-qty`} className="text-sm font-semibold">
          Estimated quantity <span className="font-normal text-white/60">(optional)</span>
        </label>
        <input
          id={`${id}-qty`}
          type="number"
          inputMode="numeric"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value.replace(/[^\d]/g, "").slice(0, 7))}
          placeholder="e.g. 100"
          className="mt-2 h-11 w-full rounded-lg border border-white/15 bg-white px-3 text-base text-ink-900 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/30 focus:outline-none sm:text-sm"
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Link href={bulkPricingHref(product.name, categoryName, validQty)} className={buttonClasses("primary", "md", "w-full")}>
          <FileText className="size-4" aria-hidden="true" />
          Request Bulk Pricing
        </Link>
        <a
          href={whatsappUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("light", "md", "w-full")}
        >
          <WhatsAppIcon className="size-4 text-whatsapp-dark" />
          Bulk Inquiry on WhatsApp
        </a>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-white/55">
        Bulk prices are separate from the single-piece price and are quoted for your quantity.
      </p>
    </section>
  );
}
