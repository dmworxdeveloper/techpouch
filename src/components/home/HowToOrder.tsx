import { Building2, ShoppingBag, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappMessages, whatsappUrl } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";

type OrderPath = {
  icon: LucideIcon;
  title: string;
  audience: string;
  steps: string[];
  cta: string;
  message: string;
  featured?: boolean;
};

const paths: OrderPath[] = [
  {
    icon: ShoppingBag,
    title: "Retail Customers",
    audience: "Buying for yourself — single pieces welcome.",
    steps: [
      "Explore available products.",
      "Ask about product availability and specifications.",
      "Confirm the order through the available ordering process.",
    ],
    cta: "Ask About a Retail Order",
    message: whatsappMessages.retail,
  },
  {
    icon: Building2,
    title: "Wholesale Customers",
    audience: "Retailers, distributors, resellers and businesses.",
    steps: [
      "Select the product category.",
      "Share required quantities and specifications.",
      "Discuss wholesale pricing and order details directly with Tech Pouch.",
    ],
    cta: "Start a Wholesale Inquiry",
    message: whatsappMessages.wholesale,
    featured: true,
  },
];

export function HowToOrder() {
  return (
    <section id="how-to-order" aria-labelledby="order-heading" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="order-heading"
          eyebrow="How to order"
          title="Simple Ordering for Retail and Wholesale"
          description="Orders are currently arranged directly with our team. We will confirm availability, payment and delivery options with you before anything is finalised."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {paths.map(({ icon: Icon, title, audience, steps, cta, message, featured }, i) => (
            <article
              key={title}
              className={`reveal flex flex-col rounded-3xl border p-6 sm:p-8 ${
                featured ? "border-brand-200 bg-brand-50/60" : "border-line bg-white"
              }`}
              style={revealDelay(i * 100)}
            >
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-white text-brand-600 shadow-soft">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-ink-900">{title}</h3>
                  <p className="text-sm text-ink-600">{audience}</p>
                </div>
              </div>
              <ol className="mt-6 space-y-4">
                {steps.map((step, n) => (
                  <li key={step} className="flex gap-4">
                    <span
                      className="grid size-8 shrink-0 place-items-center rounded-full border border-brand-200 bg-white text-sm font-semibold text-brand-700"
                      aria-hidden="true"
                    >
                      {n + 1}
                    </span>
                    <span className="pt-1 text-ink-700">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-auto pt-8">
                <ButtonLink
                  href={whatsappUrl(message)}
                  external
                  variant={featured ? "primary" : "secondary"}
                  className="w-full sm:w-auto"
                >
                  <WhatsAppIcon className={`size-4 ${featured ? "" : "text-whatsapp-dark"}`} />
                  {cta}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
