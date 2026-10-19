import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Check, FileText, ShoppingBag, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { howToOrderImage } from "@/lib/images";
import { revealDelay } from "@/lib/reveal";

type Pathway = {
  icon: LucideIcon;
  title: string;
  audience: string;
  highlights: string[];
  steps: string[];
  cta: { label: string; href: string; icon: LucideIcon };
  link?: { label: string; href: string };
  featured?: boolean;
};

const pathways: Pathway[] = [
  {
    icon: ShoppingBag,
    title: "For Individual Buyers",
    audience: "One piece or a small quantity for yourself.",
    highlights: ["Single-piece price shown on every product", "Delivery terms shown with each price"],
    steps: [
      "Choose a product, size or design.",
      "Press “Order via WhatsApp” with your quantity and city.",
      "We confirm delivery charges and the total before you pay.",
    ],
    cta: { label: "Explore Products", href: "/products", icon: ArrowRight },
  },
  {
    icon: Building2,
    title: "For Bulk Buyers",
    audience: "Retailers, resellers, distributors and businesses.",
    highlights: ["Bulk pricing by quantity", "MOQ, customization and lead time in your quote"],
    steps: [
      "Choose your products and estimated quantities.",
      "Request bulk pricing through the wholesale form or WhatsApp.",
      "Receive a quote with MOQ, pricing, customization options and lead time.",
    ],
    cta: { label: "Get a Wholesale Quote", href: "/wholesale#wholesale-inquiry", icon: FileText },
    link: { label: "View wholesale terms by product", href: "/wholesale#wholesale-terms" },
    featured: true,
  },
];

const sideImage = howToOrderImage;

export function HowToOrder() {
  return (
    <section id="how-to-order" aria-labelledby="order-heading" className="bg-tint py-16 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="reveal text-sm font-semibold tracking-wide text-brand-600 uppercase">Retail vs wholesale</p>
          <h2
            id="order-heading"
            className="reveal mt-3 text-2xl font-semibold tracking-tight text-balance text-ink-900 sm:text-3xl lg:text-[2.125rem] lg:leading-tight"
          >
            Separate Pathways for Individual and Bulk Buyers
          </h2>
          <p className="reveal mt-3 text-ink-600">
            Buying one piece? Order at the listed price on WhatsApp. Buying for your business? Request bulk pricing and
            we will quote for your quantity.
          </p>
          <div className="reveal relative mt-6 hidden aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-lift sm:block">
            {/* object-contain keeps the whole product visible whatever the photo's shape. */}
            <Image src={sideImage.src} alt={sideImage.alt} fill sizes="(min-width: 1024px) 380px, 90vw" className="object-contain p-3" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:col-span-8">
          {pathways.map(({ icon: Icon, title, audience, highlights, steps, cta, link, featured }, i) => (
            <article
              key={title}
              className={`reveal flex flex-col rounded-2xl border p-6 shadow-soft sm:p-7 ${
                featured ? "border-navy-800/20 bg-navy-900 text-white" : "border-line bg-white"
              }`}
              style={revealDelay(i * 100)}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid size-10 place-items-center rounded-xl ${featured ? "bg-white/10 text-brand-300" : "bg-brand-50 text-brand-600"}`}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className={`text-lg font-semibold ${featured ? "text-white" : "text-ink-900"}`}>{title}</h3>
                  <p className={`text-sm ${featured ? "text-white/65" : "text-ink-600"}`}>{audience}</p>
                </div>
              </div>

              <ul className="mt-5 space-y-1.5">
                {highlights.map((h) => (
                  <li key={h} className={`flex gap-2 text-sm font-medium ${featured ? "text-white" : "text-ink-800"}`}>
                    <Check className={`mt-0.5 size-4 shrink-0 ${featured ? "text-brand-300" : "text-brand-600"}`} aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>

              <ol className={`mt-5 space-y-3 border-t pt-5 ${featured ? "border-white/10" : "border-line"}`}>
                {steps.map((step, n) => (
                  <li key={step} className={`flex gap-3 text-sm ${featured ? "text-white/80" : "text-ink-700"}`}>
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                        featured ? "bg-white text-navy-900" : "bg-brand-600 text-white"
                      }`}
                      aria-hidden="true"
                    >
                      {n + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-auto pt-7">
                <ButtonLink href={cta.href} variant={featured ? "light" : "primary"}>
                  <cta.icon className="size-4" aria-hidden="true" />
                  {cta.label}
                </ButtonLink>
                {link && (
                  <Link
                    href={link.href}
                    className={`mt-3 block text-sm font-medium underline-offset-2 hover:underline ${featured ? "text-brand-200" : "text-brand-600"}`}
                  >
                    {link.label} →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
