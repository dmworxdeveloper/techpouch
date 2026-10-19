import { Boxes, Building2, Lightbulb, PackageSearch, Store } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappMessages, whatsappUrl } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";

const inquiryTypes = [
  { icon: Boxes, title: "Wholesale and bulk orders", text: "Discuss quantities for resale or distribution." },
  { icon: Store, title: "Retail product inquiries", text: "Ask about products for your store or shelf." },
  { icon: PackageSearch, title: "Product sourcing", text: "Tell us which tech accessories you are looking for." },
  { icon: Lightbulb, title: "Custom product development", text: "Share an idea and discuss whether we can make it." },
  { icon: Building2, title: "Business and reseller inquiries", text: "Explore working with Tech Pouch as a supplier." },
];

export function Wholesale() {
  return (
    <section
      id="wholesale"
      aria-labelledby="wholesale-heading"
      className="relative overflow-hidden bg-ink-950 py-20 text-white sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 size-[32rem] rounded-full bg-brand-600/20 blur-3xl"
      />
      <Container className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="wholesale-heading"
            eyebrow="Wholesale & B2B"
            title="Your Manufacturing Partner for Tech Accessories"
            description="Whether you are sourcing products for retail, planning bulk purchases, or exploring a custom product idea, Tech Pouch provides a direct way to discuss your requirements with our team."
            align="left"
            tone="light"
          />
          <p className="reveal mt-4 text-sm text-white/60">
            Pricing is not listed publicly — quantities, specifications and prices are discussed directly with you.
          </p>
          <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
            <ButtonLink href={whatsappUrl(whatsappMessages.wholesale)} external variant="whatsapp" size="lg">
              <WhatsAppIcon className="size-5" />
              Discuss Wholesale Orders
            </ButtonLink>
            <ButtonLink href={whatsappUrl(whatsappMessages.manufacturingQuote)} external variant="light" size="lg">
              Request a Manufacturing Quote
            </ButtonLink>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {inquiryTypes.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className={`reveal rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-brand-500/50 hover:bg-white/[0.07] ${
                i === inquiryTypes.length - 1 ? "sm:col-span-2" : ""
              }`}
              style={revealDelay(i * 70)}
            >
              <Icon className="size-6 text-brand-200" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-white/65">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
