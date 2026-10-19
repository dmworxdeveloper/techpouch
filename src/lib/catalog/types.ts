/**
 * Catalog data model. The same shapes can later be filled from a CMS or database
 * by replacing the arrays in categories.ts / products.ts with fetched data.
 */

export type CatalogImage = {
  src: string;
  /** Describe what the photo actually shows. */
  alt: string;
  width: number;
  height: number;
  /** Design/colour name shown to the customer and included in WhatsApp orders. Only for confirmed designs. */
  design?: string;
};

/**
 * Delivery rule for a single-piece retail price.
 * - "included-in-city": delivery is included for one city and extra (confirmed with the customer) elsewhere.
 * - "extra": delivery charges are always extra, including in that city.
 */
export type DeliveryRule = { kind: "included-in-city"; city: string } | { kind: "extra" };

/** Confirmed single-piece retail price. Products without one are inquiry-only. */
export type RetailPrice = { amount: number; currency: "PKR"; delivery: DeliveryRule };

/**
 * Wholesale terms shown to bulk buyers. Leave a field out until Tech Pouch confirms it;
 * the site then shows "Confirmed with your quote" instead of inventing a value.
 */
export type WholesaleTerms = {
  /** e.g. "50 pieces" */
  moq?: string;
  /** e.g. "PKR 1,050 per piece for 50–199 pieces; PKR 950 for 200+" */
  bulkPricing?: string;
  /** e.g. "Custom colours and logo printing from 100 pieces" */
  customization?: string;
  /** e.g. "7–10 working days after order confirmation" */
  leadTime?: string;
};

export type PublicationStatus = "published" | "draft";

export type Specification = { label: string; value: string };

/** A selectable option group, e.g. { label: "Colour", options: ["Black", "Blue"] }. Only add verified options. */
export type VariantGroup = { label: string; options: string[] };

export type Category = {
  id: string;
  slug: string;
  name: string;
  /**
   * "catalog" categories live under /products/[slug]. "dedicated" categories have their own
   * top-level page (e.g. /headphone-leather-repair) and are kept out of the main product grid.
   */
  placement: "catalog" | "dedicated";
  /** Route of the category page. */
  href: string;
  /** Short text for cards and menus. */
  summary: string;
  /** Intro paragraph for the category page. */
  description: string;
  /** Label of the card button. */
  cardCta: string;
  image: CatalogImage;
  status: PublicationStatus;
  /** Shown as an information note on the category page while details are being confirmed. */
  notice?: string;
  /**
   * "grid" lists product cards linking to individual product pages.
   * "sections" shows every product in full (gallery, price, ordering) on the category page itself,
   * without separate product URLs.
   */
  display?: "grid" | "sections";
  /** IDs from src/lib/faqs.ts shown on the category page. */
  faqIds?: string[];
  inquiryMessage: string;
  seo: { title: string; description: string };
};

export type Product = {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  status: PublicationStatus;
  shortDescription: string;
  /** Paragraphs for the product page. */
  description: string[];
  /** First image is the main/card image. */
  images: CatalogImage[];
  sizes?: string[];
  variants?: VariantGroup[];
  /** Confirmed single-piece retail price. Omit for inquiry-only products. */
  pricing?: RetailPrice;
  /**
   * WhatsApp order message. Placeholders: {price}, {size}, {city}. Product, design, quantity and
   * page link are appended automatically.
   */
  orderMessage?: string;
  /** Small caption under the gallery, e.g. to flag temporary images. */
  imageNote?: string;
  features: string[];
  specifications: Specification[];
  /** IDs from src/lib/faqs.ts shown on the product page. */
  faqIds?: string[];
  /** Optional custom opening for WhatsApp product inquiries. */
  inquiryMessage?: string;
  /** Bulk-buyer terms (MOQ, bulk pricing, customization, lead time). */
  wholesale?: WholesaleTerms;
  seo: { title: string; description: string };
};
