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
} as const;

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

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Custom Manufacturing", href: "/custom-manufacturing" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];
