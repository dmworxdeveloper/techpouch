import Image from "next/image";
import { ArrowRight, Building2, ShoppingBag, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { howToOrderImage } from "@/lib/images";
import { whatsappMessages, whatsappUrl } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";

type OrderPath = {
  icon: LucideIcon;
  title: string;
  steps: string[];
  cta: string;
  message: string;
  variant: "primary" | "outline";
};

const paths: OrderPath[] = [
  {
    icon: ShoppingBag,
    title: "For Retail Customers",
    steps: [
      "Explore available products.",
      "Ask about product availability and specifications.",
      "Confirm the order through the available ordering process.",
    ],
    cta: "Chat on WhatsApp",
    message: whatsappMessages.retail,
    variant: "primary",
  },
  {
    icon: Building2,
    title: "For Wholesale Customers",
    steps: [
      "Select the product category.",
      "Share required quantities and specifications.",
      "Discuss wholesale pricing and order details directly with Tech Pouch.",
    ],
    cta: "Inquire on WhatsApp",
    message: whatsappMessages.wholesale,
    variant: "outline",
  },
];

const sideImage = howToOrderImage;

export function HowToOrder() {
  return (
    <section id="how-to-order" aria-labelledby="order-heading" className="bg-tint py-16 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="order-heading" className="reveal text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl lg:text-[2.125rem]">
            How to Order
          </h2>
          <p className="reveal mt-3 text-ink-600">
            Orders are arranged directly with our team. We confirm availability, payment and delivery options with
            you before anything is finalised.
          </p>
          <div className="reveal relative mt-6 hidden aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-lift sm:block">
            {/* object-contain keeps the whole product visible whatever the photo's shape. */}
            <Image src={sideImage.src} alt={sideImage.alt} fill sizes="(min-width: 1024px) 380px, 90vw" className="object-contain p-3" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:col-span-8">
          {paths.map(({ icon: Icon, title, steps, cta, message, variant }, i) => (
            <article
              key={title}
              className="reveal flex flex-col rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-7"
              style={revealDelay(i * 100)}
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
              </div>
              <ol className="mt-5 space-y-3">
                {steps.map((step, n) => (
                  <li key={step} className="flex gap-3 text-sm text-ink-700">
                    <span
                      className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-600 text-xs font-semibold text-white"
                      aria-hidden="true"
                    >
                      {n + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-auto pt-7">
                <ButtonLink href={whatsappUrl(message)} external variant={variant}>
                  <WhatsAppIcon className="size-4" />
                  {cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
