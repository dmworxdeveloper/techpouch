/**
 * FAQ content used by /faq, product pages and service pages.
 * Answers only state confirmed information; anything not yet confirmed directs the
 * customer to contact Tech Pouch. Update answers here once details are confirmed.
 */

import { formatPrice, getCategoryById, publishedProducts, type RetailPrice } from "@/lib/catalog";

/* Pricing and delivery answers are generated from the product data so they never drift from it. */
type PriceGroup = { label: string; pricing?: RetailPrice };

/** One entry per category, or per product when a category has several products. */
function priceGroups(): PriceGroup[] {
  const groups: PriceGroup[] = [];
  for (const product of publishedProducts) {
    const category = getCategoryById(product.categoryId);
    const siblings = publishedProducts.filter((p) => p.categoryId === product.categoryId);
    if (siblings.length === 1 && category) groups.push({ label: category.name.toLowerCase(), pricing: product.pricing });
    else groups.push({ label: product.name.toLowerCase(), pricing: product.pricing });
  }
  return groups;
}

const listNames = (names: string[]) =>
  names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}` : (names[0] ?? "");

const deliveryText = (pricing: RetailPrice) =>
  pricing.delivery.kind === "included-in-city" ? `delivery included in ${pricing.delivery.city}` : "delivery charges extra";

function pricingAnswer(): string {
  const groups = priceGroups();
  const priced = groups.flatMap((g) => (g.pricing ? [`${g.label} are ${formatPrice(g.pricing)} each (${deliveryText(g.pricing)})`] : []));
  const inquiry = groups.filter((g) => !g.pricing).map((g) => g.label);
  return [
    priced.length ? `Single-piece prices: ${listNames(priced)}.` : "",
    inquiry.length ? `For ${listNames(inquiry)}, contact us on WhatsApp for pricing and availability.` : "",
    "Wholesale prices for bulk quantities are quoted separately.",
  ]
    .filter(Boolean)
    .join(" ");
}

function deliveryAnswer(): string {
  const groups = priceGroups().filter((g) => g.pricing);
  const included = groups.filter((g) => g.pricing!.delivery.kind === "included-in-city");
  const extra = groups.filter((g) => g.pricing!.delivery.kind === "extra");
  const firstIncluded = included[0]?.pricing?.delivery;
  const city = firstIncluded?.kind === "included-in-city" ? firstIncluded.city : "Lahore";
  return [
    included.length
      ? `Delivery is included in the price of ${listNames(included.map((g) => g.label))} for customers in ${city}. Outside ${city}, delivery charges are extra and confirmed with you.`
      : "",
    extra.length ? `For ${listNames(extra.map((g) => g.label))}, delivery charges are extra for all locations, including ${city}.` : "",
    "We confirm delivery charges and the total payable amount on WhatsApp before your order is finalised.",
  ]
    .filter(Boolean)
    .join(" ");
}

export type FaqTopic = "Products" | "Ordering" | "Wholesale" | "Custom Manufacturing" | "Delivery & Payment" | "Contact";

export type Faq = {
  id: string;
  topic: FaqTopic;
  question: string;
  answer: string;
};

export const faqTopics: FaqTopic[] = [
  "Products",
  "Ordering",
  "Wholesale",
  "Custom Manufacturing",
  "Delivery & Payment",
  "Contact",
];

export const faqs: Faq[] = [
  {
    id: "categories",
    topic: "Products",
    question: "What products does Tech Pouch offer?",
    answer:
      "Our current range includes zipper tablet covers, universal tablet covers and mouse pads, along with selected headphone leather repair accessories. We also discuss custom manufacturing projects for customers who need a product made to their requirements.",
  },
  {
    id: "tablet-sizes",
    topic: "Products",
    question: "What sizes are the tablet covers available in?",
    answer:
      "Universal tablet covers are available in 7-inch, 8-inch and 10-inch options. For zipper tablet covers, please contact us with your tablet model or measurements and we will confirm the sizes currently available.",
  },
  {
    id: "compatibility",
    topic: "Products",
    question: "Will a cover fit my tablet?",
    answer:
      "Tablet dimensions vary between brands and models, so we do not claim that a cover fits every tablet. Share your tablet model or its measurements when you inquire and our team will confirm the right option before you order.",
  },
  {
    id: "headphone-compatibility",
    topic: "Products",
    question: "Are the headphone leather repair accessories compatible with my headphones?",
    answer:
      "Compatibility depends on your headphone brand and model. Send us your model (and a photo of the part you need, if possible) and we will confirm whether a suitable replacement is available.",
  },
  {
    id: "specifications",
    topic: "Products",
    question: "Where can I find detailed product specifications?",
    answer:
      "Each product page lists the details we have confirmed. If you need a specification that is not shown — such as exact dimensions or materials — please ask our team and we will provide the information available.",
  },
  {
    id: "single-piece",
    topic: "Ordering",
    question: "Can I order a single product?",
    answer:
      "Yes. Open the product page, choose an option if one is available, and press “Order via WhatsApp”. Your message will include the product, option and quantity so our team can confirm availability and the order details with you.",
  },
  {
    id: "pricing",
    topic: "Ordering",
    question: "How much do your products cost?",
    answer: pricingAnswer(),
  },
  {
    id: "online-checkout",
    topic: "Ordering",
    question: "Can I pay online?",
    answer:
      "The website does not have an online checkout. Orders are arranged directly with our team, who will confirm the price, delivery charges and the payment options available for your order.",
  },
  {
    id: "wholesale",
    topic: "Wholesale",
    question: "Do you supply wholesale and bulk orders?",
    answer:
      "Yes. Retailers, resellers, distributors and businesses can request a quote through the wholesale page or WhatsApp. Tell us the products and the quantity you need, and our team will discuss pricing and order details with you.",
  },
  {
    id: "moq",
    topic: "Wholesale",
    question: "Is there a minimum order quantity for wholesale?",
    answer:
      "We do not publish a fixed minimum. Share the quantity you are planning and our team will let you know what is possible for that product.",
  },
  {
    id: "custom",
    topic: "Custom Manufacturing",
    question: "Can you manufacture a product to my specifications?",
    answer:
      "We welcome custom manufacturing inquiries. Share your product idea, dimensions, material preferences, quantity and reference images, and our team will review the feasibility and discuss the next steps with you. Not every request may be possible, and we confirm this before any commitment.",
  },
  {
    id: "custom-images",
    topic: "Custom Manufacturing",
    question: "How do I send reference images or sketches?",
    answer:
      "You can attach images to the custom manufacturing inquiry form or send them to us on WhatsApp. Photos, sketches, drawings with dimensions and examples of similar products all help our team understand your idea.",
  },
  {
    id: "custom-quote",
    topic: "Custom Manufacturing",
    question: "How is a custom project priced?",
    answer:
      "Pricing for custom projects depends on the design, materials and quantity. After reviewing your requirements, our team will discuss feasibility, quantities and pricing with you directly.",
  },
  {
    id: "cod",
    topic: "Delivery & Payment",
    question: "Is Cash on Delivery available?",
    answer:
      "Cash on Delivery availability depends on your location and order. Please ask our team when you place your order and we will confirm whether it is available for you.",
  },
  {
    id: "delivery",
    topic: "Delivery & Payment",
    question: "Are delivery charges included?",
    answer: deliveryAnswer(),
  },
  {
    id: "contact",
    topic: "Contact",
    question: "How can I contact Tech Pouch?",
    answer:
      "You can message us on WhatsApp at +92 310 4628296, call the same number, email techpouch123@gmail.com, or use the inquiry forms on our contact, wholesale and custom manufacturing pages.",
  },
];

export function getFaqs(ids: string[] = []): Faq[] {
  return ids.map((id) => faqs.find((f) => f.id === id)).filter((f): f is Faq => Boolean(f));
}

export function getFaqsByTopic(topic: FaqTopic): Faq[] {
  return faqs.filter((f) => f.topic === topic);
}
