"use client";

import { useId, useState } from "react";
import { MapPin, MessageCircleQuestion, Minus, Plus, ShoppingBag } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { buildOrderMessage, isDeliveryIncluded, type Product } from "@/lib/catalog";
import { productInquiryMessage, whatsappUrl } from "@/lib/site";

const MAX_RETAIL_QUANTITY = 999;

/** Labels the retail pathway so it reads separately from the wholesale panel below it. */
function RetailLabel() {
  return (
    <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-900">
      <ShoppingBag className="size-4 text-brand-600" aria-hidden="true" />
      Retail order <span className="font-normal text-ink-500">· single piece or small quantity</span>
    </p>
  );
}

type OrderProduct = Pick<Product, "name" | "pricing" | "orderMessage" | "sizes" | "inquiryMessage">;

function OptionGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const name = useId();
  return (
    <fieldset className="mb-5">
      <legend className="text-sm font-semibold text-ink-900">
        {label}: <span className="font-normal text-ink-600">{value}</span>
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => {
          const checked = value === opt;
          return (
            <label
              key={opt}
              className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500 ${
                checked
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-line bg-white text-ink-800 hover:border-brand-200 hover:bg-brand-50"
              }`}
            >
              <input type="radio" name={name} value={opt} checked={checked} onChange={() => onChange(opt)} className="sr-only" />
              {opt}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * Retail ordering via WhatsApp. Priced products get size/design/quantity (and city where
 * delivery depends on it) plus "Order via WhatsApp"; inquiry-only products get "Inquire on WhatsApp".
 * No checkout or totals — the team confirms delivery and the payable amount on WhatsApp.
 */
export function OrderPanel({
  product,
  productUrl,
  designs = [],
  design,
  onDesignChange,
}: {
  product: OrderProduct;
  productUrl: string;
  designs?: string[];
  design?: string;
  onDesignChange?: (design: string) => void;
}) {
  const id = useId();
  const sizes = product.sizes ?? [];
  const [size, setSize] = useState(sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [city, setCity] = useState("");
  const pricing = product.pricing;
  const asksCity = Boolean(product.orderMessage?.includes("{city}"));

  if (!pricing) {
    const inquiry = product.inquiryMessage
      ? `${product.inquiryMessage}\nProduct link: ${productUrl}`
      : productInquiryMessage(product.name, productUrl);
    return (
      <div className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6">
        <RetailLabel />
        <a href={whatsappUrl(inquiry)} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "lg", "w-full")}>
          <WhatsAppIcon className="size-5" />
          Inquire on WhatsApp
        </a>
        <p className="mt-4 text-xs leading-relaxed text-ink-500">
          Our team will confirm product options, pricing and delivery charges with you on WhatsApp.
        </p>
      </div>
    );
  }

  const setQty = (value: number) => setQuantity(Math.min(MAX_RETAIL_QUANTITY, Math.max(1, Math.round(value) || 1)));
  const orderHref = whatsappUrl(
    buildOrderMessage(product, { size: size || undefined, design, city: asksCity ? city : undefined, quantity, url: productUrl }),
  );
  const included = asksCity ? isDeliveryIncluded(pricing, city) : null;
  const askHref = whatsappUrl(productInquiryMessage(product.name, productUrl));

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6">
      <RetailLabel />
      {sizes.length > 0 && <OptionGroup label="Size" options={sizes} value={size} onChange={setSize} />}
      {designs.length > 0 && design && onDesignChange && (
        <OptionGroup label="Design" options={designs} value={design} onChange={onDesignChange} />
      )}

      <div className="flex flex-wrap gap-x-6 gap-y-4">
        <div>
          <label htmlFor={`${id}-qty`} className="text-sm font-semibold text-ink-900">
            Quantity
          </label>
          <div className="mt-2 flex items-center rounded-lg border border-line">
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
        </div>

        {asksCity && (
          <div className="min-w-0 flex-1 basis-48">
            <label htmlFor={`${id}-city`} className="text-sm font-semibold text-ink-900">
              Your city <span className="font-normal text-ink-500">(optional)</span>
            </label>
            <div className="relative mt-2">
              <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-500" aria-hidden="true" />
              <input
                id={`${id}-city`}
                type="text"
                autoComplete="address-level2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Lahore"
                maxLength={60}
                aria-describedby={`${id}-city-note`}
                className="h-11 w-full rounded-lg border border-line pr-3 pl-9 text-base focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:outline-none sm:text-sm"
              />
            </div>
          </div>
        )}
      </div>

      <p id={`${id}-city-note`} aria-live="polite" className="mt-3 min-h-5 text-sm">
        {included === true && <span className="font-medium text-emerald-700">Delivery is included for Lahore.</span>}
        {included === false && asksCity && (
          <span className="font-medium text-ink-700">Delivery charges apply outside Lahore; we will confirm them with you.</span>
        )}
        {!asksCity && <span className="text-ink-600">Delivery charges are extra and confirmed on WhatsApp.</span>}
      </p>

      <div className="mt-4 grid gap-3">
        <a href={orderHref} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "lg", "w-full")}>
          <WhatsAppIcon className="size-5" />
          Order via WhatsApp
        </a>
        <a href={askHref} target="_blank" rel="noopener noreferrer" className={buttonClasses("secondary", "md", "w-full")}>
          <MessageCircleQuestion className="size-4" aria-hidden="true" />
          Ask About This Product
        </a>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-ink-500">
        WhatsApp opens with your order details filled in. Our team confirms availability, delivery charges and the total
        payable amount before your order is finalised.
      </p>
    </div>
  );
}
