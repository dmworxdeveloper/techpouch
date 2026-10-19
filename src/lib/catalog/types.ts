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
  features: string[];
  specifications: Specification[];
  /** IDs from src/lib/faqs.ts shown on the product page. */
  faqIds?: string[];
  /** Optional custom opening for WhatsApp product inquiries. */
  inquiryMessage?: string;
  seo: { title: string; description: string };
};
