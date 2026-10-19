import type { Product, RetailPrice } from "./types";

/*
 * Price and delivery wording, derived from the product data so every card, product
 * section, FAQ answer and WhatsApp message stays consistent.
 */

/** e.g. "PKR 1,400" (fixed locale so server and browser render identically). */
export function formatPrice(pricing: RetailPrice): string {
  return `${pricing.currency} ${pricing.amount.toLocaleString("en-US")}`;
}

/** Short delivery label shown next to the price, e.g. "Delivery Included in Lahore". */
export function deliveryLabel(pricing: RetailPrice): string {
  return pricing.delivery.kind === "included-in-city"
    ? `Delivery Included in ${pricing.delivery.city}`
    : "Delivery Charges Extra";
}

/** Explanatory note shown under the price. */
export function deliveryNote(pricing: RetailPrice): string {
  return pricing.delivery.kind === "included-in-city"
    ? `Delivery charges apply outside ${pricing.delivery.city}; please contact us for confirmation.`
    : "Delivery charges are extra for all locations, including Lahore, and are confirmed with you before you pay.";
}

/** "PKR 1,400 — Delivery Included in Lahore" */
export function priceHeadline(pricing: RetailPrice): string {
  return `${formatPrice(pricing)} — ${deliveryLabel(pricing)}`;
}

/** Whether delivery is included for the city the customer typed (null when unknown). */
export function isDeliveryIncluded(pricing: RetailPrice, city: string): boolean | null {
  const typed = city.trim().toLowerCase();
  if (pricing.delivery.kind === "extra") return false;
  if (!typed) return null;
  return typed.includes(pricing.delivery.city.toLowerCase());
}

/** Builds the WhatsApp order message for a product from its template and the customer's selections. */
export function buildOrderMessage(
  product: Pick<Product, "name" | "pricing" | "orderMessage">,
  { size, design, city, quantity, url }: { size?: string; design?: string; city?: string; quantity: number; url?: string },
): string {
  const price = product.pricing ? formatPrice(product.pricing) : "";
  const opening = (product.orderMessage ?? `Hello Tech Pouch, I would like to order the ${product.name}.`)
    .replaceAll("{price}", price)
    .replaceAll("{size}", size || "[Size]")
    .replaceAll("{city}", city?.trim() || "[City]");

  return [
    opening,
    "",
    `Product: ${product.name}`,
    size && !product.orderMessage?.includes("{size}") ? `Size: ${size}` : "",
    design ? `Design: ${design}` : "",
    `Quantity: ${quantity}${price ? ` (${price} per piece)` : ""}`,
    url ? `Product link: ${url}` : "",
  ]
    .filter((line, i) => line !== "" || i === 1)
    .join("\n");
}
