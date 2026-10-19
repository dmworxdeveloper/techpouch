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

/** Temporary mouse pad design image (illustration, not a product photo). */
const design = (file: string, name: string, description: string): CatalogImage => ({
  ...img("mouse-pads", file, `Sample illustration: ${description}`, 1200, 1200),
  design: name,
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
      "Single pieces are PKR 1,400 with delivery included in Lahore. Ask our team about the sizes and colours currently available, or request a wholesale quote for larger quantities.",
    ],
    pricing: { amount: 1400, currency: "PKR", delivery: { kind: "included-in-city", city: "Lahore" } },
    orderMessage:
      "Hello Tech Pouch, I want to order a zipper tablet cover for {price}. I am located in {city}. Please confirm my order and delivery details.",
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
    faqIds: ["tablet-sizes", "pricing", "delivery", "single-piece", "wholesale", "cod"],
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
    pricing: { amount: 1200, currency: "PKR", delivery: { kind: "included-in-city", city: "Lahore" } },
    orderMessage:
      "Hello Tech Pouch, I want to order a universal tablet cover for {price}. Size: {size}. I am located in {city}. Please confirm my order and delivery details.",
    features: [
      "Available in 7-inch, 8-inch and 10-inch sizes",
      "Suitable for different tablet requirements",
      "Available for retail and wholesale orders",
    ],
    specifications: [
      { label: "Sizes", value: "7-inch, 8-inch, 10-inch" },
      { label: "Compatibility", value: "Confirmed per tablet model on inquiry" },
    ],
    faqIds: ["tablet-sizes", "compatibility", "pricing", "delivery", "single-piece", "wholesale"],
    seo: {
      title: "Universal Tablet Cover — 7, 8 & 10-Inch",
      description:
        "Universal tablet cover from Tech Pouch in 7-inch, 8-inch and 10-inch sizes. Order a single piece via WhatsApp or request a wholesale quote.",
    },
  },
  {
    id: "wrist-rest-mouse-pad",
    slug: "wrist-rest-mouse-pads",
    categoryId: "mouse-pads",
    name: "Wrist-Rest Mouse Pads",
    status: "published",
    shortDescription: "Mouse pads with a built-in wrist rest, in colourful splash designs.",
    description: [
      "Mouse pads with a built-in wrist rest for everyday desktop use.",
      "Choose a design from the gallery and order a single piece on WhatsApp. Delivery charges are extra for all locations, including Lahore.",
    ],
    pricing: { amount: 250, currency: "PKR", delivery: { kind: "extra" } },
    orderMessage:
      "Hello Tech Pouch, I want to order a wrist-rest mouse pad for {price}. Please confirm delivery charges and the total payable amount.",
    // Temporary design illustrations — replace with product photos (keep the `design` names in sync).
    images: [
      design("wrist-rest-mouse-pad-rainbow-splash", "Rainbow Splash", "wrist-rest mouse pad with a rainbow paint-splash design on white"),
      design("wrist-rest-mouse-pad-ocean-splash", "Ocean Splash", "wrist-rest mouse pad with a blue paint-splash design on navy"),
      design("wrist-rest-mouse-pad-neon-splash", "Neon Splash", "wrist-rest mouse pad with a neon paint-splash design on black"),
      design("wrist-rest-mouse-pad-sunset-splash", "Sunset Splash", "wrist-rest mouse pad with an orange and pink paint-splash design on cream"),
    ],
    imageNote: "Sample design images — actual product photos coming soon.",
    features: ["Built-in wrist rest", "Colourful splash designs", "Single pieces and wholesale quantities"],
    specifications: [
      { label: "Type", value: "Mouse pad with wrist rest" },
      { label: "Designs", value: "Shown in the gallery; availability confirmed on order" },
    ],
    faqIds: ["pricing", "delivery", "single-piece", "wholesale", "cod"],
    seo: {
      title: "Wrist-Rest Mouse Pads",
      description: "Wrist-rest mouse pads from Tech Pouch in splash designs, PKR 250 per piece (delivery extra).",
    },
  },
  {
    id: "plain-mouse-pad",
    slug: "plain-mouse-pads",
    categoryId: "mouse-pads",
    name: "Plain Mouse Pads",
    status: "published",
    shortDescription: "Flat mouse pads without wrist support, in colourful splash designs.",
    description: [
      "Flat mouse pads without wrist support for everyday desktop use.",
      "Choose a design from the gallery and order a single piece on WhatsApp. Delivery charges are extra for all locations, including Lahore.",
    ],
    pricing: { amount: 250, currency: "PKR", delivery: { kind: "extra" } },
    orderMessage:
      "Hello Tech Pouch, I want to order a plain mouse pad for {price}. Please confirm delivery charges and the total payable amount.",
    // Temporary design illustrations — replace with product photos (keep the `design` names in sync).
    images: [
      design("plain-mouse-pad-rainbow-splash", "Rainbow Splash", "flat mouse pad with a rainbow paint-splash design on white"),
      design("plain-mouse-pad-galaxy-splash", "Galaxy Splash", "flat mouse pad with a purple and pink paint-splash design on dark purple"),
      design("plain-mouse-pad-neon-splash", "Neon Splash", "flat mouse pad with a neon paint-splash design on black"),
      design("plain-mouse-pad-ocean-splash", "Ocean Splash", "flat mouse pad with a blue paint-splash design on navy"),
    ],
    imageNote: "Sample design images — actual product photos coming soon.",
    features: ["Flat design without wrist support", "Colourful splash designs", "Single pieces and wholesale quantities"],
    specifications: [
      { label: "Type", value: "Flat mouse pad" },
      { label: "Designs", value: "Shown in the gallery; availability confirmed on order" },
    ],
    faqIds: ["pricing", "delivery", "single-piece", "wholesale", "cod"],
    seo: {
      title: "Plain Mouse Pads",
      description: "Plain flat mouse pads from Tech Pouch in splash designs, PKR 250 per piece (delivery extra).",
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
      "Hello Tech Pouch, I am interested in your headphone leather repair accessories. Please share the available options, pricing, and delivery charges.",
    seo: {
      title: "Replacement Leather Ear Pads for Headphones",
      description:
        "Replacement leather ear pads for headphone repair from Tech Pouch. Share your headphone model and we will confirm a suitable replacement.",
    },
  },
];
