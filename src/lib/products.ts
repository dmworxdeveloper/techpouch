/**
 * Product catalog.
 *
 * To replace a product photo, drop the new file into /public/images/products
 * and update the `src` (and `alt`) below — no component changes are needed.
 * Only list details that have been confirmed by Tech Pouch.
 */

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Product = {
  slug: string;
  name: string;
  /** Primary categories appear on the homepage; secondary ones get a separate link. */
  tier: "primary" | "secondary";
  summary: string;
  intro: string;
  /** Confirmed product details only. */
  details: string[];
  sizes?: string[];
  cta: string;
  whatsappMessage: string;
  image: ProductImage;
  gallery: ProductImage[];
  seo: { title: string; description: string };
};

const img = (name: string, alt: string, width = 1024, height = 1024): ProductImage => ({
  src: `/images/products/${name}.webp`,
  alt,
  width,
  height,
});

export const products: Product[] = [
  {
    slug: "zipper-tablet-covers",
    name: "Zipper Tablet Covers",
    tier: "primary",
    summary:
      "Protective zipper-style tablet covers designed for convenient everyday storage and portability.",
    intro:
      "Tech Pouch zipper tablet covers are sleeve-style covers with a zip closure, made to keep a tablet stored and easy to carry every day. They are available for single-piece retail orders and for wholesale supply.",
    details: [
      "Zipper-style closure",
      "Designed for everyday storage and portability",
      "Available for retail and wholesale orders",
    ],
    cta: "Explore Zipper Tablet Covers",
    whatsappMessage: "Hello Tech Pouch, I would like to inquire about your zipper tablet covers.",
    image: img("zipper-tablet-cover-black", "Black zipper tablet cover sleeve with a metal zip pull"),
    gallery: [
      img("zipper-tablet-cover-pink", "Pink zipper tablet cover sleeve shown upright"),
      img("zipper-tablet-cover-white", "White zipper tablet cover sleeve on a white background"),
    ],
    seo: {
      title: "Zipper Tablet Covers — Retail & Wholesale",
      description:
        "Zipper tablet covers from Tech Pouch for everyday storage and portability. Order single pieces or ask about wholesale tablet covers and bulk supply.",
    },
  },
  {
    slug: "universal-tablet-covers",
    name: "Universal Tablet Covers",
    tier: "primary",
    summary:
      "Versatile tablet covers available in multiple size options to suit different tablet requirements.",
    intro:
      "Tech Pouch universal tablet covers come in 7-inch, 8-inch and 10-inch options so you can choose the size that fits your tablet. Contact us for individual purchases or wholesale supply.",
    details: [
      "Available in 7-inch, 8-inch and 10-inch sizes",
      "Suitable for different tablet requirements",
      "Available for retail and wholesale orders",
    ],
    sizes: ["7-inch", "8-inch", "10-inch"],
    cta: "Explore Tablet Covers",
    whatsappMessage: "Hello Tech Pouch, I would like to inquire about your universal tablet covers.",
    image: img(
      "universal-tablet-cover-red",
      "Red universal tablet cover with a rotating clasp, standing upright",
      1200,
      1200,
    ),
    gallery: [
      img(
        "universal-tablet-cover-stand-views",
        "Red universal tablet cover shown closed, open and as a tablet stand",
      ),
      img(
        "universal-tablet-cover-blue",
        "Blue universal tablet cover shown from several angles with a tablet inside",
        1200,
        1200,
      ),
    ],
    seo: {
      title: "Universal Tablet Covers — 7, 8 & 10-Inch",
      description:
        "Universal tablet covers in 7-inch, 8-inch and 10-inch sizes from Tech Pouch. Buy single pieces or contact us as a tablet cover supplier for wholesale orders.",
    },
  },
  {
    slug: "mouse-pads",
    name: "Mouse Pads",
    tier: "primary",
    summary:
      "Practical mouse pads for everyday desktop use, retail customers, and wholesale supply.",
    intro:
      "Tech Pouch mouse pads are made for everyday desktop use. Individual customers can order single pieces, and retailers and businesses can discuss bulk mouse pad supply directly with our team.",
    details: [
      "Made for everyday desktop use",
      "For retail customers and wholesale supply",
      "Ask us about available styles",
    ],
    cta: "Explore Mouse Pads",
    whatsappMessage: "Hello Tech Pouch, I would like to inquire about your mouse pads.",
    image: img(
      "mouse-pads-wrist-rest-assorted",
      "Four mouse pads with wrist rests in black, pink, blue and orange",
      1000,
      1000,
    ),
    gallery: [
      img("mouse-pad-wrist-rest-teal", "Teal mouse pad with a built-in wrist rest", 1200, 1200),
      img("mouse-pad-black", "Plain black rectangular mouse pad", 1000, 1000),
      img("mouse-pad-printed", "Mouse pad with a red zebra-stripe print and a white mouse", 736, 736),
    ],
    seo: {
      title: "Mouse Pads — Retail & Wholesale Supply",
      description:
        "Mouse pads from Tech Pouch for everyday desktop use. Order single pieces or contact our team as a mouse pad supplier for wholesale and bulk orders.",
    },
  },
  {
    slug: "headphone-leather-repair-accessories",
    name: "Headphone Leather Repair Accessories",
    tier: "secondary",
    summary:
      "Selected leather repair accessories for headphones. Tell us what you need and we will confirm availability.",
    intro:
      "Alongside our main product range, Tech Pouch supplies selected headphone leather repair accessories. Share your headphone model and the part you need, and our team will confirm what is available.",
    details: [
      "Selected leather repair accessories for headphones",
      "Share your headphone model so we can check suitability",
      "Single pieces and bulk inquiries welcome",
    ],
    cta: "View Repair Accessories",
    whatsappMessage:
      "Hello Tech Pouch, I would like to inquire about headphone leather repair accessories. My headphone model is:",
    image: img(
      "headphone-ear-pads-leather",
      "Pair of round black leather headphone ear pads",
      960,
      960,
    ),
    gallery: [
      img("headphone-ear-pads-oval", "Pair of oval black leather headphone ear pads", 1040, 736),
    ],
    seo: {
      title: "Headphone Leather Repair Accessories",
      description:
        "Selected headphone leather repair accessories from Tech Pouch. Share your headphone model and we will confirm availability for single-piece or bulk orders.",
    },
  },
];

export const primaryProducts = products.filter((p) => p.tier === "primary");
export const secondaryProducts = products.filter((p) => p.tier === "secondary");

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const productHref = (slug: string) => `/products/${slug}`;
