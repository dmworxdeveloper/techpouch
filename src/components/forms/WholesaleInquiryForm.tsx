"use client";

import { useSearchParams } from "next/navigation";
import { InquiryForm } from "./InquiryForm";
import { forms } from "@/lib/forms/definitions";

const categoryOptions = forms.wholesale.fields.find((f) => f.name === "productCategory")?.options ?? [];

/**
 * Wholesale form pre-filled from "Request Bulk Pricing" links
 * (/wholesale?product=…&category=…&quantity=…). Render inside <Suspense>.
 */
export function WholesaleInquiryForm() {
  const params = useSearchParams();
  const product = params.get("product")?.slice(0, 120) ?? "";
  const category = params.get("category") ?? "";
  const quantity = params.get("quantity")?.replace(/[^\d]/g, "").slice(0, 7) ?? "";

  const defaults: Record<string, string> = {};
  if (categoryOptions.includes(category)) defaults.productCategory = category;
  if (quantity) defaults.quantity = `${quantity} pieces`;
  if (product) {
    defaults.message = `I would like bulk pricing for ${product}. Please share your MOQ, bulk price, customization options and lead time.`;
  }

  // Remount when the pre-fill changes so the form picks up the new defaults.
  return <InquiryForm key={`${product}|${category}|${quantity}`} formId="wholesale" defaultValues={defaults} />;
}
