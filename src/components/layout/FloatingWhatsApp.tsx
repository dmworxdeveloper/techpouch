"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getProduct } from "@/lib/products";
import { whatsappMessages, whatsappUrl } from "@/lib/site";

/** Picks a prefilled message that matches the page the visitor is on. */
function messageFor(pathname: string): string {
  const productSlug = pathname.match(/^\/products\/([^/]+)/)?.[1];
  const product = productSlug ? getProduct(productSlug) : undefined;
  if (product) return product.whatsappMessage;
  if (pathname.startsWith("/custom-manufacturing")) return whatsappMessages.custom;
  return whatsappMessages.general;
}

/** Sitewide floating WhatsApp contact button, rendered once from the root layout. */
export function FloatingWhatsApp() {
  const pathname = usePathname();

  return (
    <a
      href={whatsappUrl(messageFor(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Tech Pouch on WhatsApp (opens in a new tab)"
      className="group fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift transition duration-200 hover:scale-105 hover:bg-whatsapp-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-whatsapp-dark active:scale-95 sm:right-6 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]"
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
