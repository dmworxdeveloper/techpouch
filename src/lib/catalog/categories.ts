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
    faqIds: ["tablet-sizes", "pricing", "delivery", "single-piece", "wholesale"],
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
      src: "/images/products/universal-tablet-covers/universal-tablet-cover-red-stand.webp",
      alt: "Red universal tablet cover with a rotating clasp, open as a stand",
      width: 209,
      height: 144,
    },
    status: "published",
    faqIds: ["tablet-sizes", "compatibility", "pricing", "delivery", "single-piece", "wholesale"],
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
      "Choose between wrist-rest and plain mouse pads. Single pieces are PKR 250 (delivery charges extra), and businesses can request wholesale quotes.",
    display: "sections",
    cardCta: "Explore Mouse Pads",
    image: {
      src: "/images/products/mouse-pads/wrist-rest-mouse-pads-assorted.webp",
      alt: "Four wrist-rest mouse pads in black, pink, blue and orange",
      width: 1000,
      height: 1000,
    },
    status: "published",
    faqIds: ["pricing", "delivery", "single-piece", "wholesale", "custom"],
    inquiryMessage: "Hello Tech Pouch, I would like to inquire about your mouse pads.",
    seo: {
      title: "Mouse Pads — Wrist-Rest & Plain, PKR 250",
      description:
        "Wrist-rest and plain mouse pads from Tech Pouch. PKR 250 per piece, delivery charges extra. Wholesale quotes available."
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
      src: "/images/products/headphone-leather-repair/headphone-ear-pads-oval.webp",
      alt: "Pair of oval black leather headphone ear pads",
      width: 1040,
      height: 736,
    },
    status: "published",
    notice:
      "Exact parts, sizes and compatible headphone models are being finalised. Share your headphone model and we will confirm what is available before you order.",
    faqIds: ["headphone-compatibility", "single-piece", "wholesale", "pricing"],
    inquiryMessage:
      "Hello Tech Pouch, I am interested in your headphone leather repair accessories. Please share the available options, pricing, and delivery charges.",
    seo: {
      title: "Headphone Leather Repair Accessories",
      description:
        "Headphone leather repair and replacement accessories from Tech Pouch. Share your headphone model and we will confirm suitable parts for single or bulk orders.",
    },
  },
];
