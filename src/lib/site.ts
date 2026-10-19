/**
 * Central business details and site-wide settings.
 * Update contact details, navigation and WhatsApp messages here.
 */

function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Tech Pouch",
  /** Set NEXT_PUBLIC_SITE_URL to the live domain (e.g. https://www.example.com) before launch. */
  url: resolveSiteUrl(),
  title: "Tech Pouch | Tablet Covers, Mouse Pads & Custom Manufacturing",
  description:
    "Explore Tech Pouch tablet covers, mouse pads, and tech accessory manufacturing services. Contact us for retail inquiries, wholesale supply, and custom product requirements.",
  tagline:
    "Tech Pouch provides tech accessory products and manufacturing inquiry services for individual customers, retailers, and businesses.",
  contact: {
    phoneDisplay: "+92 310 4628296",
    phoneHref: "tel:+923104628296",
    phoneE164: "+923104628296",
    whatsappNumber: "923104628296",
    email: "techpouch123@gmail.com",
  },
} as const;

/** Prefilled WhatsApp messages used across the site. */
export const whatsappMessages = {
  general: "Hello Tech Pouch, I would like to know more about your products.",
  tabletCovers: "Hello Tech Pouch, I would like to inquire about your tablet covers.",
  wholesale: "Hello Tech Pouch, I am interested in wholesale pricing and bulk orders.",
  manufacturingQuote:
    "Hello Tech Pouch, I would like to request a manufacturing quote. Here are my requirements:",
  custom: "Hello Tech Pouch, I would like to discuss a custom manufacturing project.",
  retail: "Hello Tech Pouch, I would like to ask about product availability for a retail order.",
  headphoneRepair:
    "Hello Tech Pouch, I would like to inquire about headphone leather repair accessories. My headphone model is:",
} as const;

/** "Ask About This Product" message, including the product page link when available. */
export function productInquiryMessage(productName: string, url?: string): string {
  return [`Hello Tech Pouch, I would like to ask about ${productName}.`, url && `Product link: ${url}`]
    .filter(Boolean)
    .join("\n");
}

/** Wholesale quote request for a specific product. */
export function productQuoteMessage(productName: string, url?: string): string {
  return [
    `Hello Tech Pouch, I would like a wholesale quote for ${productName}.`,
    url && `Product link: ${url}`,
    "Estimated quantity: ",
  ]
    .filter(Boolean)
    .join("\n");
}

/** Retail order message used by "Order via WhatsApp". */
export function orderMessage({
  productName,
  url,
  quantity,
  option,
}: {
  productName: string;
  url?: string;
  quantity: number;
  option?: string;
}): string {
  return [
    `Hello Tech Pouch, I would like to order ${productName}.`,
    `Quantity: ${quantity}.`,
    option && `Selected option: ${option}.`,
    url && `Product link: ${url}`,
    "Please confirm availability, total price, delivery charges, and Cash on Delivery availability.",
  ]
    .filter(Boolean)
    .join("\n");
}

/** Builds a wa.me link with an optional URL-encoded prefilled message. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${siteConfig.contact.email}${query ? `?${query}` : ""}`;
}

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

/**
 * Social profiles shown in the footer. Leave a value empty to hide its icon —
 * only add real profile URLs so the footer never links to a missing page.
 */
export const socialLinks = {
  facebook: "",
  instagram: "",
  youtube: "",
} as const;

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Custom Manufacturing", href: "/custom-manufacturing" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];
