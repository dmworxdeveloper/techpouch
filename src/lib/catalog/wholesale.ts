import type { Product } from "./types";

/*
 * Wholesale terms shown on product pages, cards and the wholesale page.
 * Fill in each product's `wholesale` field in products.ts once Tech Pouch confirms its
 * MOQ, bulk prices and lead times; until then the fallback text below is shown.
 */

export const WHOLESALE_FALLBACK = "Confirmed with your quote";

export type WholesaleRow = { key: "moq" | "bulkPricing" | "customization" | "leadTime"; label: string; value: string; confirmed: boolean };

const LABELS: Record<WholesaleRow["key"], string> = {
  moq: "Minimum order (MOQ)",
  bulkPricing: "Bulk pricing",
  customization: "Customization",
  leadTime: "Lead time",
};

/** The four wholesale facts for a product, using confirmed values where available. */
export function wholesaleRows(product: Pick<Product, "wholesale">): WholesaleRow[] {
  return (Object.keys(LABELS) as WholesaleRow["key"][]).map((key) => {
    const value = product.wholesale?.[key]?.trim();
    return { key, label: LABELS[key], value: value || WHOLESALE_FALLBACK, confirmed: Boolean(value) };
  });
}

/** Link to the wholesale form, pre-filled with the product (and optional quantity). */
export function bulkPricingHref(productName: string, categoryName?: string, quantity?: number): string {
  const params = new URLSearchParams({ product: productName });
  if (categoryName) params.set("category", categoryName);
  if (quantity) params.set("quantity", String(quantity));
  return `/wholesale?${params.toString()}#wholesale-inquiry`;
}
