import type { CatalogImage, Product } from "./types";

/**
 * Products. Add an object here (with a categoryId from categories.ts) to publish a new
 * product — its page, cards, related products and sitemap entry are generated automatically.
 * Set `status: "draft"` to hide a product without deleting it.
 *
 * Only list sizes, variants, features and specifications that Tech Pouch has confirmed.
 */

/**
 * Builds a gallery image entry. Put the photo in /public/images/products/<folder>/ and add
 * it to a product's `images` array, e.g.
 *   images: [productImage("zipper-tablet-covers", "zipper-cover-front", "Black zipper tablet cover, front view")],
 * The first image is the main gallery image; two or more images show the thumbnail row.
 * `design` (optional) makes the image a selectable design in the order panel.
 */
export const productImage = (
  folder: string,
  file: string,
  alt: string,
  { width = 1200, height = 1200, design, ext = "webp" }: { width?: number; height?: number; design?: string; ext?: string } = {},
): CatalogImage => ({
  src: `/images/products/${folder}/${file}.${ext}`,
  alt,
  width,
  height,
  ...(design ? { design } : {}),
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
      productImage("zipper-tablet-covers", "zipper-tablet-cover-black", "Black zipper tablet cover sleeve with a metal zip pull", { width: 1024, height: 1024 }),
      productImage("zipper-tablet-covers", "zipper-tablet-cover-black-printed-character", "Black zipper tablet cover printed with a brown furry cartoon character", { width: 1024, height: 1024 }),
      productImage("zipper-tablet-covers", "zipper-tablet-covers-colours", "Pink zipper tablet cover with smaller views of teal, black and pink covers", { width: 500, height: 500 }),
      productImage("zipper-tablet-covers", "zipper-tablet-cover-teal", "Teal zipper tablet cover standing upright", { width: 425, height: 707 }),
      productImage("zipper-tablet-covers", "zipper-tablet-cover-pink", "Light pink zipper tablet cover sleeve", { width: 1024, height: 1024 }),
      productImage("zipper-tablet-covers", "zipper-tablet-cover-hot-pink", "Hot pink zipper tablet cover sleeve", { width: 800, height: 800 }),
      productImage("zipper-tablet-covers", "zipper-tablet-cover-white", "White zipper tablet cover sleeve", { width: 1024, height: 1024 }),
      productImage("zipper-tablet-covers", "zipper-tablet-cover-printed", "White zipper tablet cover with a printed cartoon animal design", { width: 1024, height: 1024 }),
      productImage("zipper-tablet-covers", "zipper-tablet-covers-four-colours", "Four zipper tablet covers in pink, black, teal and hot pink", { width: 320, height: 320 }),
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
      productImage("universal-tablet-covers", "universal-tablet-cover-red", "Red universal tablet cover with a rotating clasp, standing upright", { width: 1200, height: 1200 }),
      productImage("universal-tablet-covers", "universal-tablet-cover-stand-views", "Red universal tablet cover shown closed, open and as a tablet stand", { width: 1024, height: 1024 }),
      productImage("universal-tablet-covers", "universal-tablet-cover-blue", "Blue universal tablet cover shown from several angles with a tablet inside", { width: 1200, height: 1200 }),
      productImage("universal-tablet-covers", "universal-tablet-covers-colours", "Universal tablet covers in white, black, purple, red and teal, shown with tablets", { width: 800, height: 800 }),
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
    shortDescription: "Mouse pads with a built-in wrist rest for comfortable everyday desktop use.",
    description: [
      "Mouse pads with a built-in wrist rest for everyday desktop use.",
      "Order a single piece on WhatsApp and ask our team about the designs currently available. Delivery charges are extra for all locations, including Lahore.",
    ],
    pricing: { amount: 250, currency: "PKR", delivery: { kind: "extra" } },
    orderMessage:
      "Hello Tech Pouch, I want to order a wrist-rest mouse pad for {price}. Please confirm delivery charges and the total payable amount.",
    images: [
      productImage("mouse-pads", "wrist-rest-mouse-pads-assorted", "Four wrist-rest mouse pads in black, pink, blue and orange", { width: 1000, height: 1000 }),
      productImage("mouse-pads", "wrist-rest-mouse-pad-black-ergonomic", "Black ergonomic mouse pad with a raised wrist rest", { width: 1035, height: 1200 }),
      productImage("mouse-pads", "wrist-rest-mouse-pad-teal", "Teal mouse pad with a built-in wrist rest", { width: 1200, height: 1200 }),
      productImage("mouse-pads", "wrist-rest-mouse-pad-black", "Black wrist-rest mouse pad with a white mouse", { width: 960, height: 700 }),
      productImage("mouse-pads", "wrist-rest-mouse-pads-stack", "Stack of wrist-rest mouse pads in blue, purple, teal, red and black", { width: 320, height: 320 }),
    ],
    features: ["Built-in wrist rest", "Ask about available designs", "Single pieces and wholesale quantities"],
    specifications: [
      { label: "Type", value: "Mouse pad with wrist rest" },
      { label: "Designs", value: "Confirmed on inquiry" },
    ],
    faqIds: ["pricing", "delivery", "single-piece", "wholesale", "cod"],
    seo: {
      title: "Wrist-Rest Mouse Pads",
      description: "Wrist-rest mouse pads from Tech Pouch, PKR 250 per piece (delivery charges extra). Order on WhatsApp.",
    },
  },
  {
    id: "plain-mouse-pad",
    slug: "plain-mouse-pads",
    categoryId: "mouse-pads",
    name: "Plain Mouse Pads",
    status: "published",
    shortDescription: "Flat mouse pads without wrist support for everyday desktop use.",
    description: [
      "Flat mouse pads without wrist support for everyday desktop use.",
      "Order a single piece on WhatsApp and ask our team about the designs currently available. Delivery charges are extra for all locations, including Lahore.",
    ],
    pricing: { amount: 250, currency: "PKR", delivery: { kind: "extra" } },
    orderMessage:
      "Hello Tech Pouch, I want to order a plain mouse pad for {price}. Please confirm delivery charges and the total payable amount.",
    images: [
      productImage("mouse-pads", "plain-mouse-pad-black", "Plain black rectangular mouse pad", { width: 1000, height: 1000 }),
      productImage("mouse-pads", "plain-mouse-pad-zebra-print", "Flat mouse pad with a red zebra-stripe print and a white mouse", { width: 736, height: 736 }),
      productImage("mouse-pads", "plain-mouse-pads-printed", "Flat mouse pads with printed designs in several colours", { width: 800, height: 800 }),
    ],
    features: ["Flat design without wrist support", "Ask about available designs", "Single pieces and wholesale quantities"],
    specifications: [
      { label: "Type", value: "Flat mouse pad" },
      { label: "Designs", value: "Confirmed on inquiry" },
    ],
    faqIds: ["pricing", "delivery", "single-piece", "wholesale", "cod"],
    seo: {
      title: "Plain Mouse Pads",
      description: "Plain flat mouse pads from Tech Pouch, PKR 250 per piece (delivery charges extra). Order on WhatsApp.",
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
      productImage("headphone-leather-repair", "headphone-ear-pads-mesh", "Pair of black padded headphone ear pads", { width: 1200, height: 1200 }),
      productImage("headphone-leather-repair", "headphone-ear-pads-leather", "Pair of round black leather headphone ear pads", { width: 960, height: 960 }),
      productImage("headphone-leather-repair", "headphone-ear-pads-oval", "Pair of oval black leather headphone ear pads", { width: 1040, height: 736 }),
      productImage("headphone-leather-repair", "headphone-ear-pads-round", "Pair of round black padded headphone ear pads", { width: 320, height: 320 }),
      productImage("headphone-leather-repair", "headphone-ear-pads-colours", "Headphone ear pads in black and olive green", { width: 900, height: 1200 }),
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
