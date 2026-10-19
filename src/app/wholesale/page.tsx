import type { Metadata } from "next";
import { Boxes, Building2, ClipboardCheck, Lightbulb, ListChecks, MessagesSquare, PackageSearch, Send, Store, Truck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { Suspense } from "react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { WholesaleInquiryForm } from "@/components/forms/WholesaleInquiryForm";
import { CategoryTile } from "@/components/products/ProductCard";
import { WholesaleTermsTable } from "@/components/products/WholesaleTermsTable";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { publishedCategories } from "@/lib/catalog";
import { getFaqs } from "@/lib/faqs";
import { revealDelay } from "@/lib/reveal";
import { pageMetadata } from "@/lib/seo";
import { whatsappMessages, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Wholesale Tech Accessories & Bulk Orders",
  description:
    "Wholesale tablet covers, mouse pads and bulk tech accessories from Tech Pouch. Retailers, resellers and distributors can request a quote for their required quantities.",
  path: "/wholesale",
});

const audiences = [
  { icon: Store, title: "Retailers & resellers", text: "Stock tablet covers and mouse pads for your store or online shop." },
  { icon: Boxes, title: "Bulk orders", text: "Tell us the quantities you need for a one-off or repeat order." },
  { icon: Truck, title: "Distributors & businesses", text: "Discuss supply for distribution or business use." },
  { icon: PackageSearch, title: "Product sourcing", text: "Looking for a specific tech accessory? Ask whether we can supply it." },
  { icon: Lightbulb, title: "Custom manufacturing", text: "Need your own design? Share your requirements with our team." },
  { icon: Building2, title: "Corporate requirements", text: "Accessories for teams and offices." },
];

const steps = [
  { icon: ListChecks, title: "Choose your products", text: "Select the categories and products you are interested in." },
  { icon: Send, title: "Share your requirements", text: "Send quantities, options and your delivery location through the form or WhatsApp." },
  { icon: MessagesSquare, title: "Discuss pricing", text: "Our team reviews your request and discusses pricing and order details with you." },
  { icon: ClipboardCheck, title: "Confirm your order", text: "Once everything is agreed, we confirm the order, delivery and payment arrangements." },
];

export default function WholesalePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Wholesale", href: "/wholesale" }]}
        eyebrow="Wholesale & bulk orders"
        title="Wholesale Tech Accessories for Your Business"
        lead="Looking for a reliable source of technology accessories? Contact Tech Pouch to discuss bulk orders, product requirements, and wholesale supply opportunities."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={whatsappUrl(whatsappMessages.wholesale)} external variant="whatsapp" size="lg">
            <WhatsAppIcon className="size-5" />
            Discuss Wholesale on WhatsApp
          </ButtonLink>
          <ButtonLink href="#wholesale-inquiry" variant="outline" size="lg">
            Request a Quote
          </ButtonLink>
        </div>
      </PageHeader>

      <section aria-labelledby="audiences-heading" className="py-14 sm:py-16">
        <Container>
          <SectionHeading
            id="audiences-heading"
            eyebrow="Who we work with"
            title="Wholesale inquiries we can help with"
            align="left"
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="reveal flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft" style={revealDelay((i % 3) * 70)}>
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink-900">{title}</h3>
                  <p className="mt-1 text-sm text-ink-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="wholesale-categories" className="bg-tint py-14 sm:py-16">
        <Container>
          <SectionHeading
            id="wholesale-categories"
            eyebrow="Wholesale product categories"
            title="Products available for bulk supply"
            description="Wholesale prices are separate from single-piece retail prices and are not published — share the products and quantities you need and we will send you a quote."
            align="left"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {publishedCategories.map((category, i) => (
              <CategoryTile key={category.id} category={category} delay={i * 70} imageSizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw" />
            ))}
          </div>
        </Container>
      </section>

      <section id="wholesale-terms" aria-labelledby="terms-heading" className="scroll-mt-24 py-14 sm:py-16">
        <Container>
          <SectionHeading
            id="terms-heading"
            eyebrow="Wholesale terms"
            title="Bulk pricing, MOQ and lead times by product"
            description="Retail prices are for single pieces. Bulk prices, minimum order quantities, customization and lead times are confirmed for your quantity — request bulk pricing on any product below."
            align="left"
          />
          <div className="mt-10">
            <WholesaleTermsTable />
          </div>
        </Container>
      </section>

      <section aria-labelledby="process-heading" className="bg-tint py-14 sm:py-16">
        <Container>
          <SectionHeading id="process-heading" eyebrow="How it works" title="How wholesale inquiries work" />
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="reveal relative rounded-2xl border border-line bg-white p-6 shadow-soft" style={revealDelay(i * 80)}>
                <span className="absolute top-5 right-5 font-display text-3xl font-semibold text-brand-100" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="grid size-11 place-items-center rounded-xl bg-brand-600 text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-ink-900">
                  <span className="sr-only">Step {i + 1}: </span>
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center text-sm text-ink-500">
            We do not publish fixed minimum order quantities — tell us what you need and we will let you know what is possible.
          </p>
        </Container>
      </section>

      <section id="wholesale-inquiry" aria-labelledby="form-heading" className="scroll-mt-24 py-14 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="form-heading"
              title="Request a wholesale quote"
              description="Fill in the form and our team will reply by email. You can also attach reference images of the products you need."
              align="left"
            />
            <div className="reveal mt-8">
              <ContactDetails />
            </div>
          </div>
          <div className="reveal rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-8 lg:col-span-8">
            {/* Fallback is the same form without pre-fill, so the static page always has a working form. */}
            <Suspense fallback={<InquiryForm formId="wholesale" />}>
              <WholesaleInquiryForm />
            </Suspense>
          </div>
        </Container>
      </section>

      <section aria-labelledby="wholesale-faq" className="bg-tint py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 id="wholesale-faq" className="text-2xl font-semibold tracking-tight text-ink-900">
              Wholesale questions
            </h2>
            <div className="mt-6">
              <FaqAccordion items={getFaqs(["wholesale", "moq", "pricing", "delivery", "cod"])} />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Ready to discuss a bulk order?"
        text="Message our team on WhatsApp with the products and quantities you need."
        message={whatsappMessages.wholesale}
      />
    </>
  );
}
