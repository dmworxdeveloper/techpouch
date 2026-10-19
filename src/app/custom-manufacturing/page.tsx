import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { ContactForm } from "@/components/contact/ContactForm";
import { customSteps } from "@/components/home/CustomManufacturing";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappMessages, whatsappUrl } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";

export const metadata: Metadata = {
  title: "Custom Tech Accessories Manufacturing",
  description:
    "Have a product idea? Share your specifications, dimensions, materials and reference images with Tech Pouch to discuss custom tech accessories manufacturing.",
  alternates: { canonical: "/custom-manufacturing" },
};

const checklist = [
  "What the product is and how it will be used",
  "Dimensions or the device it needs to fit",
  "Material preferences, if any",
  "Reference pictures, sketches or examples",
  "Approximate quantity you are planning",
  "Any colour, finish or branding ideas",
];

/*
 * Dedicated custom manufacturing page. A detailed inquiry form with file uploads
 * and a product gallery can be added here later; for now inquiries go through
 * WhatsApp (which supports images) or the contact form below.
 */
export default function CustomManufacturingPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Custom Manufacturing", href: "/custom-manufacturing" }]}
        title="Have a Product Idea? Let's Manufacture It."
        lead="Looking for a product made to your specifications? Share your product details, dimensions, material preferences, reference pictures, and requirements with Tech Pouch to discuss your custom manufacturing needs."
      >
        <ButtonLink href={whatsappUrl(whatsappMessages.custom)} external variant="whatsapp" size="lg">
          <WhatsAppIcon className="size-5" />
          Start a Custom Manufacturing Inquiry
        </ButtonLink>
      </PageHeader>

      <section aria-labelledby="process-heading" className="py-16 sm:py-20">
        <Container>
          <SectionHeading id="process-heading" eyebrow="How it works" title="A simple three-step process" />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {customSteps.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="reveal rounded-2xl border border-line bg-white p-6 shadow-soft"
                style={revealDelay(i * 90)}
              >
                <span className="grid size-11 place-items-center rounded-xl bg-brand-600 text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-xs font-semibold tracking-wide text-brand-600 uppercase">Step {i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold text-ink-900">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="share-heading" className="bg-surface py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="share-heading"
              title="What to include in your inquiry"
              description="The more detail you share, the easier it is for our team to assess feasibility, quantities and pricing. Reference images can be sent directly on WhatsApp."
              align="left"
            />
            <ul className="reveal mt-8 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex gap-3 text-ink-700">
                  <Check className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="reveal mt-6 text-sm text-ink-500">
              Every project is reviewed individually — our team will confirm what can be produced, quantities and
              pricing after discussing your requirements.
            </p>
          </div>
          <div className="reveal rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8 lg:col-span-7">
            <h2 className="text-xl font-semibold text-ink-900">Describe your project</h2>
            <p className="mt-1 mb-6 text-sm text-ink-600">Fields marked * are required.</p>
            <ContactForm defaultInquiryType="Custom Manufacturing" />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Prefer to talk it through?"
        text="Message our team on WhatsApp and attach your reference images to get the conversation started."
        message={whatsappMessages.custom}
      />
    </>
  );
}
