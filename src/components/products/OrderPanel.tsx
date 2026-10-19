"use client";

import { useId, useState } from "react";
import { FileText, MessageCircleQuestion, Minus, Plus } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import type { VariantGroup } from "@/lib/catalog";
import { orderMessage, productInquiryMessage, productQuoteMessage, whatsappUrl } from "@/lib/site";

const MAX_RETAIL_QUANTITY = 999;

/**
 * Retail ordering via WhatsApp: pick an option (when the product has verified options)
 * and a quantity, then open WhatsApp with a prefilled order message. No prices or checkout.
 */
export function OrderPanel({
  productName,
  productUrl,
  sizes = [],
  variants = [],
  inquiryMessage,
}: {
  productName: string;
  productUrl: string;
  sizes?: string[];
  variants?: VariantGroup[];
  inquiryMessage?: string;
}) {
  const id = useId();
  const groups: VariantGroup[] = [...(sizes.length ? [{ label: "Size", options: sizes }] : []), ...variants];
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(groups.map((g) => [g.label, g.options[0] ?? ""])),
  );
  const [quantity, setQuantity] = useState(1);

  const option = groups.map((g) => `${g.label} ${selected[g.label]}`).join(", ") || undefined;
  const orderHref = whatsappUrl(orderMessage({ productName, url: productUrl, quantity, option }));
  const askHref = whatsappUrl(
    inquiryMessage ? `${inquiryMessage}\nProduct link: ${productUrl}` : productInquiryMessage(productName, productUrl),
  );
  const quoteHref = whatsappUrl(productQuoteMessage(productName, productUrl));

  const setQty = (value: number) => setQuantity(Math.min(MAX_RETAIL_QUANTITY, Math.max(1, Math.round(value) || 1)));

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6">
      {groups.map((group) => (
        <fieldset key={group.label} className="mb-5">
          <legend className="text-sm font-semibold text-ink-900">{group.label}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {group.options.map((opt) => {
              const checked = selected[group.label] === opt;
              return (
                <label
                  key={opt}
                  className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500 ${
                    checked
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-line bg-white text-ink-800 hover:border-brand-200 hover:bg-brand-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${id}-${group.label}`}
                    value={opt}
                    checked={checked}
                    onChange={() => setSelected((prev) => ({ ...prev, [group.label]: opt }))}
                    className="sr-only"
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div>
        <label htmlFor={`${id}-qty`} className="text-sm font-semibold text-ink-900">
          Quantity
        </label>
        <div className="mt-2 inline-flex items-center rounded-lg border border-line">
          <button
            type="button"
            onClick={() => setQty(quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="grid size-11 place-items-center rounded-l-lg text-ink-700 transition hover:bg-surface disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-brand-500"
          >
            <Minus className="size-4" aria-hidden="true" />
          </button>
          <input
            id={`${id}-qty`}
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX_RETAIL_QUANTITY}
            value={quantity}
            onChange={(e) => setQty(Number(e.target.value))}
            className="h-11 w-16 border-x border-line text-center text-base font-semibold text-ink-900 [appearance:textfield] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => setQty(quantity + 1)}
            aria-label="Increase quantity"
            className="grid size-11 place-items-center rounded-r-lg text-ink-700 transition hover:bg-surface focus-visible:outline-2 focus-visible:outline-brand-500"
          >
            <Plus className="size-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-2 text-xs text-ink-500">Ordering in bulk? Use “Request a Quote” for wholesale pricing.</p>
      </div>

      <div className="mt-6 grid gap-3">
        <a href={orderHref} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "lg", "w-full")}>
          <WhatsAppIcon className="size-5" />
          Order via WhatsApp
        </a>
        <div className="grid gap-3 sm:grid-cols-2">
          <a href={askHref} target="_blank" rel="noopener noreferrer" className={buttonClasses("secondary", "md", "w-full")}>
            <MessageCircleQuestion className="size-4" aria-hidden="true" />
            Ask About This Product
          </a>
          <a href={quoteHref} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline", "md", "w-full")}>
            <FileText className="size-4" aria-hidden="true" />
            Request a Quote
          </a>
        </div>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-ink-500">
        WhatsApp opens with your order details filled in. Our team will confirm availability, total price, delivery
        charges and Cash on Delivery availability before your order is finalised.
      </p>
    </div>
  );
}
