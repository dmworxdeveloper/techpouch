import type { Category } from "./types";

/**
 * Product categories. Add a new object here to create a category — its page, menu
 * entries, homepage card and sitemap entry are generated automatically.
 * Order here is the display order.
 */
export const categories: Category[] = [
  {
    id: "zipper-tablet-covers",
    slug: "zipper-tablet-covers",
    name: "Zipper Tablet Covers",
    placement: "catalog",
    href: "/products/zipper-tablet-covers",
    summary:
      "Protective zipper-style tablet covers designed for convenient everyday storage and portability.",
    description:
      "Zipper tablet covers from Tech Pouch are sleeve-style covers with a zip closure, made to keep a tablet stored and easy to carry. Order a single piece or discuss wholesale quantities with our team.",
    cardCta: "Explore Zipper Covers",
    image: {
      src: "/images/products/zipper-tablet-covers/zipper-tablet-cover-black.webp",
      alt: "Black zipper tablet cover sleeve with a metal zip pull",
      width: 1024,
      height: 1024,
    },
    status: "published",
    faqIds: ["tablet-sizes", "single-piece", "wholesale", "pricing"],
    inquiryMessage: "Hello Tech Pouch, I would like to inquire about your zipper tablet covers.",
    seo: {
      title: "Zipper Tablet Covers — Retail & Wholesale",
      description:
        "Zipper tablet covers from Tech Pouch for everyday storage and portability. Order single pieces or ask about wholesale tablet covers and bulk supply.",
    },
  },
  {
    id: "universal-tablet-covers",
    slug: "universal-tablet-covers",
    name: "Universal Tablet Covers",
    placement: "catalog",
    href: "/products/universal-tablet-covers",
    summary:
      "Versatile tablet covers available in multiple size options to suit different tablet requirements.",
    description:
      "Tech Pouch universal tablet covers are available in 7-inch, 8-inch and 10-inch options. Share your tablet model or measurements and our team will help you choose the right size.",
    cardCta: "Explore Tablet Covers",
    image: {
      src: "/images/products/universal-tablet-covers/universal-tablet-cover-red.webp",
      alt: "Red universal tablet cover with a rotating clasp, standing upright",
      width: 1200,
      height: 1200,
    },
    status: "published",
    faqIds: ["tablet-sizes", "compatibility", "single-piece", "wholesale"],
    inquiryMessage: "Hello Tech Pouch, I would like to inquire about your universal tablet covers.",
    seo: {
      title: "Universal Tablet Covers — 7, 8 & 10-Inch",
      description:
        "Universal tablet covers in 7-inch, 8-inch and 10-inch sizes from Tech Pouch, a tablet cover manufacturer serving retail and wholesale customers.",
    },
  },
  {
    id: "mouse-pads",
    slug: "mouse-pads",
    name: "Mouse Pads",
    placement: "catalog",
    href: "/products/mouse-pads",
    summary: "Practical mouse pads for everyday desktop use, retail customers, and wholesale supply.",
    description:
      "Tech Pouch mouse pads are made for everyday desktop use. Individual customers can order single pieces, and retailers and businesses can discuss bulk supply directly with our team.",
    cardCta: "Explore Mouse Pads",
    image: {
      src: "/images/products/mouse-pads/mouse-pads-wrist-rest-assorted.webp",
      alt: "Four mouse pads with wrist rests in black, pink, blue and orange",
      width: 1000,
      height: 1000,
    },
    status: "published",
    faqIds: ["single-piece", "wholesale", "pricing", "custom"],
    inquiryMessage: "Hello Tech Pouch, I would like to inquire about your mouse pads.",
    seo: {
      title: "Mouse Pads — Mouse Pad Manufacturer & Supplier",
      description:
        "Mouse pads from Tech Pouch for everyday desktop use. Order single pieces or contact us as a mouse pad manufacturer and supplier for wholesale orders.",
    },
  },
  {
    id: "headphone-leather-repair",
    slug: "headphone-leather-repair",
    name: "Headphone Leather Repair Accessories",
    placement: "dedicated",
    href: "/headphone-leather-repair",
    summary: "Repair and restore your headphones with leather replacement parts.",
    description:
      "Tech Pouch supplies selected leather repair and replacement accessories for headphones. Share your headphone model and the part you need, and our team will confirm what is available.",
    cardCta: "View Accessories",
    image: {
      src: "/images/products/headphone-leather-repair/headphone-ear-pads-leather.webp",
      alt: "Pair of round black leather headphone ear pads",
      width: 960,
      height: 960,
    },
    status: "published",
    notice:
      "Exact parts, sizes and compatible headphone models are being finalised. Share your headphone model and we will confirm what is available before you order.",
    faqIds: ["headphone-compatibility", "single-piece", "wholesale", "pricing"],
    inquiryMessage:
      "Hello Tech Pouch, I would like to inquire about headphone leather repair accessories. My headphone model is:",
    seo: {
      title: "Headphone Leather Repair Accessories",
      description:
        "Headphone leather repair and replacement accessories from Tech Pouch. Share your headphone model and we will confirm suitable parts for single or bulk orders.",
    },
  },
];
