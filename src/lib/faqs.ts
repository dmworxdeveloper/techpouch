/**
 * FAQ content used by /faq, product pages and service pages.
 * Answers only state confirmed information; anything not yet confirmed directs the
 * customer to contact Tech Pouch. Update answers here once details are confirmed.
 */

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
    question: "Why are prices not shown on the website?",
    answer:
      "Prices depend on the product, option, quantity and delivery location, so we share them directly when you inquire. Send us a message on WhatsApp, by email or through one of our inquiry forms to request a price.",
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
    question: "How does delivery work?",
    answer:
      "Delivery options, charges and timing depend on your location and order. Our team confirms these details with you before your order is finalised.",
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
