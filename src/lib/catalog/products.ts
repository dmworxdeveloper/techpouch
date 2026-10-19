import type { CatalogImage, Product } from "./types";

/**
 * Products. Add an object here (with a categoryId from categories.ts) to publish a new
 * product — its page, cards, related products and sitemap entry are generated automatically.
 * Set `status: "draft"` to hide a product without deleting it.
 *
 * Only list sizes, variants, features and specifications that Tech Pouch has confirmed.
 */

const img = (folder: string, file: string, alt: string, width = 1024, height = 1024): CatalogImage => ({
  src: `/images/products/${folder}/${file}.webp`,
  alt,
  width,
  height,
});

export const products: Product[] = [
  {
    id: "zipper-tablet-cover",
    slug: "zipper-tablet-cover",
    categoryId: "zipper-tablet-covers",
    name: "Zipper Tablet Cover",
    status: "published",
    shortDescription:
      "Protective zipper-style tablet cover designed for convenient everyday storage and portability.",
    description: [
      "A sleeve-style tablet cover with a zip closure, designed to keep your tablet stored and easy to carry every day.",
      "Available for single-piece orders and wholesale supply. Ask our team about the sizes and colours currently available.",
    ],
    images: [
      img("zipper-tablet-covers", "zipper-tablet-cover-black", "Black zipper tablet cover sleeve with a metal zip pull"),
      img("zipper-tablet-covers", "zipper-tablet-cover-pink", "Pink zipper tablet cover sleeve shown upright"),
      img("zipper-tablet-covers", "zipper-tablet-cover-white", "White zipper tablet cover sleeve on a white background"),
    ],
    features: [
      "Zipper-style closure",
      "Designed for everyday storage and portability",
      "Available for retail and wholesale orders",
    ],
    specifications: [
      { label: "Type", value: "Zipper sleeve tablet cover" },
      { label: "Sizes & colours", value: "Confirmed on inquiry" },
    ],
    faqIds: ["tablet-sizes", "single-piece", "wholesale", "pricing", "cod"],
    seo: {
      title: "Zipper Tablet Cover",
      description:
        "Zipper tablet cover from Tech Pouch for everyday storage and portability. Order via WhatsApp or request a wholesale quote.",
    },
  },
  {
    id: "universal-tablet-cover",
    slug: "universal-tablet-cover",
    categoryId: "universal-tablet-covers",
    name: "Universal Tablet Cover",
    status: "published",
    shortDescription:
      "Versatile tablet cover available in 7-inch, 8-inch and 10-inch options.",
    description: [
      "A universal tablet cover available in 7-inch, 8-inch and 10-inch options, so you can choose the size that matches your tablet.",
      "Not sure which size fits? Share your tablet model or its measurements and our team will confirm the right option before you order.",
    ],
    images: [
      img("universal-tablet-covers", "universal-tablet-cover-red", "Red universal tablet cover with a rotating clasp, standing upright", 1200, 1200),
      img("universal-tablet-covers", "universal-tablet-cover-stand-views", "Red universal tablet cover shown closed, open and as a tablet stand"),
      img("universal-tablet-covers", "universal-tablet-cover-blue", "Blue universal tablet cover shown from several angles with a tablet inside", 1200, 1200),
    ],
    sizes: ["7-inch", "8-inch", "10-inch"],
    features: [
      "Available in 7-inch, 8-inch and 10-inch sizes",
      "Suitable for different tablet requirements",
      "Available for retail and wholesale orders",
    ],
    specifications: [
      { label: "Sizes", value: "7-inch, 8-inch, 10-inch" },
      { label: "Compatibility", value: "Confirmed per tablet model on inquiry" },
    ],
    faqIds: ["tablet-sizes", "compatibility", "single-piece", "wholesale", "cod"],
    seo: {
      title: "Universal Tablet Cover — 7, 8 & 10-Inch",
      description:
        "Universal tablet cover from Tech Pouch in 7-inch, 8-inch and 10-inch sizes. Order a single piece via WhatsApp or request a wholesale quote.",
    },
  },
  {
    id: "mouse-pad",
    slug: "mouse-pad",
    categoryId: "mouse-pads",
    name: "Mouse Pad",
    status: "published",
    shortDescription: "Practical mouse pad for everyday desktop use, retail customers and wholesale supply.",
    description: [
      "A practical mouse pad for everyday desktop use at home or in the office.",
      "Available as single pieces for individual customers and in bulk for retailers and businesses. Ask our team about the styles currently available.",
    ],
    images: [
      img("mouse-pads", "mouse-pads-wrist-rest-assorted", "Four mouse pads with wrist rests in black, pink, blue and orange", 1000, 1000),
      img("mouse-pads", "mouse-pad-wrist-rest-teal", "Teal mouse pad with a built-in wrist rest", 1200, 1200),
      img("mouse-pads", "mouse-pad-black", "Plain black rectangular mouse pad", 1000, 1000),
      img("mouse-pads", "mouse-pad-printed", "Mouse pad with a red zebra-stripe print and a white mouse", 736, 736),
    ],
    features: [
      "Made for everyday desktop use",
      "For retail customers and wholesale supply",
      "Ask us about available styles",
    ],
    specifications: [
      { label: "Type", value: "Desktop mouse pad" },
      { label: "Styles", value: "Confirmed on inquiry" },
    ],
    faqIds: ["single-piece", "wholesale", "pricing", "custom", "cod"],
    seo: {
      title: "Mouse Pad",
      description:
        "Mouse pad from Tech Pouch for everyday desktop use. Order a single piece via WhatsApp or request a wholesale mouse pad quote.",
    },
  },
  {
    id: "replacement-leather-ear-pads",
    slug: "replacement-leather-ear-pads",
    categoryId: "headphone-leather-repair",
    name: "Replacement Leather Ear Pads",
    status: "published",
    shortDescription:
      "Leather replacement ear pads for headphone repair. Share your headphone model to check suitability.",
    description: [
      "Leather replacement ear pads for restoring worn headphone cushions.",
      "Ear pads come in different shapes and sizes, so please share your headphone brand and model when you inquire. Our team will confirm whether a suitable replacement is available.",
    ],
    images: [
      img("headphone-leather-repair", "headphone-ear-pads-leather", "Pair of round black leather headphone ear pads", 960, 960),
      img("headphone-leather-repair", "headphone-ear-pads-oval", "Pair of oval black leather headphone ear pads", 1040, 736),
    ],
    features: [
      "Leather replacement ear pads",
      "Suitability confirmed for your headphone model",
      "Single pieces and bulk inquiries welcome",
    ],
    specifications: [
      { label: "Compatible models", value: "Confirmed per headphone model on inquiry" },
      { label: "Shapes & sizes", value: "Confirmed on inquiry" },
    ],
    faqIds: ["headphone-compatibility", "single-piece", "wholesale", "cod"],
    inquiryMessage:
      "Hello Tech Pouch, I would like to ask about Replacement Leather Ear Pads. My headphone model is:",
    seo: {
      title: "Replacement Leather Ear Pads for Headphones",
      description:
        "Replacement leather ear pads for headphone repair from Tech Pouch. Share your headphone model and we will confirm a suitable replacement.",
    },
  },
];
