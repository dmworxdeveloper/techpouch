"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { findCategoryByPath, findProductByPath } from "@/lib/catalog";
import { productInquiryMessage, whatsappMessages, whatsappUrl } from "@/lib/site";

/** Picks a prefilled message that matches the page the visitor is on. */
function messageFor(pathname: string, siteUrl: string): string {
  const product = findProductByPath(pathname);
  if (product) {
    const url = `${siteUrl}${pathname}`;
    return product.inquiryMessage ? `${product.inquiryMessage}\nProduct link: ${url}` : productInquiryMessage(product.name, url);
  }
  const category = findCategoryByPath(pathname);
  if (category) return category.inquiryMessage;
  if (pathname.startsWith("/custom-manufacturing")) return whatsappMessages.custom;
  if (pathname.startsWith("/wholesale")) return whatsappMessages.wholesale;
  return whatsappMessages.general;
}

/**
 * Sitewide floating WhatsApp button, rendered once from the root layout.
 * `siteUrl` comes from the server so product links in messages always use the canonical domain.
 */
export function FloatingWhatsApp({ siteUrl }: { siteUrl: string }) {
  const pathname = usePathname();

  return (
    <a
      href={whatsappUrl(messageFor(pathname, siteUrl))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Tech Pouch on WhatsApp (opens in a new tab)"
      className="group fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-30 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift transition duration-200 hover:scale-105 hover:bg-whatsapp-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-whatsapp-dark active:scale-95 sm:right-6 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]"
    >
      <WhatsAppIcon className="size-7" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full mr-3 hidden rounded-lg bg-ink-900 px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-soft transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block sm:translate-x-1"
      >
        Chat with Tech Pouch
      </span>
    </a>
  );
}
