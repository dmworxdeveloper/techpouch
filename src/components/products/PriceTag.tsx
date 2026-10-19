import { Truck } from "lucide-react";
import { deliveryLabel, deliveryNote, formatPrice, type RetailPrice } from "@/lib/catalog";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

/** Single-piece price with delivery terms shown separately. */
export function PriceTag({ pricing, size = "lg" }: { pricing: RetailPrice; size?: "sm" | "lg" }) {
  const included = pricing.delivery.kind === "included-in-city";

  if (size === "sm") {
    return (
      <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="text-base font-bold text-ink-900">{formatPrice(pricing)}</span>
        <span className={`text-xs font-medium ${included ? "text-emerald-700" : "text-ink-500"}`}>
          {deliveryLabel(pricing)}
        </span>
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-tint p-5">
      <p className="text-xs font-semibold tracking-wide text-ink-500 uppercase">Single-piece price</p>
      <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-display text-3xl font-semibold text-ink-900">{formatPrice(pricing)}</span>
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            included ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-white text-ink-700 ring-1 ring-line"
          }`}
        >
          {deliveryLabel(pricing)}
        </span>
      </p>
      <p className="mt-3 flex gap-2 text-sm text-ink-600">
        <Truck className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
        {deliveryNote(pricing)}
      </p>
    </div>
  );
}

/** Shown instead of a price for inquiry-only products. */
export function InquiryPriceNote({ size = "lg" }: { size?: "sm" | "lg" }) {
  if (size === "sm") {
    return <p className="mt-3 text-sm font-medium text-ink-700">Pricing via WhatsApp inquiry</p>;
  }
  return (
    <div className="flex gap-3 rounded-2xl border border-line bg-tint p-5 text-ink-700">
      <WhatsAppIcon className="mt-0.5 size-5 shrink-0 text-whatsapp-dark" />
      <p className="font-medium">For pricing and availability, contact us on WhatsApp.</p>
    </div>
  );
}
