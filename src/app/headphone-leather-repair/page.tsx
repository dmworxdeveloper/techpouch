import type { Metadata } from "next";
import Image from "next/image";
import { Camera, ClipboardList, MessagesSquare } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { ProductGrid } from "@/components/products/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState, InfoNotice } from "@/components/ui/StatusMessage";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getCategoryById, getProductsInCategory } from "@/lib/catalog";
import { getFaqs } from "@/lib/faqs";
import { revealDelay } from "@/lib/reveal";
import { pageMetadata } from "@/lib/seo";
import { whatsappMessages, whatsappUrl } from "@/lib/site";

const CATEGORY_ID = "headphone-leather-repair";
const category = getCategoryById(CATEGORY_ID)!;

export const metadata: Metadata = pageMetadata({
  title: category.seo.title,
  description: category.seo.description,
  path: category.href,
  image: { url: category.image.src, width: category.image.width, height: category.image.height, alt: category.image.alt },
});

const steps = [
  { icon: ClipboardList, title: "Share your headphone model", text: "Tell us the brand and model of your headphones." },
  { icon: Camera, title: "Send a photo of the part", text: "A photo of the worn part helps us identify the right replacement." },
  { icon: MessagesSquare, title: "Confirm availability", text: "Our team confirms suitability, price and delivery before you order." },
];

export default function HeadphoneLeatherRepairPage() {
  const items = getProductsInCategory(CATEGORY_ID);
  const faqs = getFaqs(category.faqIds);

  return (
    <>
      <PageHeader
        crumbs={[{ label: category.name, href: category.href }]}
        eyebrow="Repair & replacement accessories"
        title={category.name}
        lead={category.description}
        aside={
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-line bg-white shadow-lift">
            <Image
              src={category.image.src}
              alt={category.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 380px, 80vw"
              className="object-contain p-6"
            />
          </div>
        }
      >
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-800 shadow-soft">
          <WhatsAppIcon className="size-4 text-whatsapp-dark" />
          For pricing and availability, contact us on WhatsApp.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={whatsappUrl(whatsappMessages.headphoneRepair)} external variant="whatsapp" size="lg">
            <WhatsAppIcon className="size-5" />
            Inquire on WhatsApp
          </ButtonLink>
          <ButtonLink href="/wholesale" variant="outline" size="lg">
            Wholesale Inquiry
          </ButtonLink>
        </div>
      </PageHeader>

      <section aria-labelledby="overview-heading" className="py-14 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="overview-heading"
              eyebrow="Overview"
              title="Restore worn headphone leather"
              description="Leather ear pads and other leather parts wear out over time. Replacement accessories let you restore the comfort and look of headphones you already own, instead of replacing them."
              align="left"
            />
          </div>
          <div className="space-y-4 lg:col-span-7">
            {category.notice && <InfoNotice>{category.notice}</InfoNotice>}
            <ol className="grid gap-4 sm:grid-cols-3">
              {steps.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="reveal rounded-2xl border border-line bg-white p-5 shadow-soft" style={revealDelay(i * 80)}>
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-600 text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 font-semibold text-ink-900">{title}</h3>
                  <p className="mt-1 text-sm text-ink-600">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section aria-labelledby="accessories-heading" className="bg-tint py-14 sm:py-16">
        <Container>
          <h2 id="accessories-heading" className="text-2xl font-semibold tracking-tight text-ink-900">
            Available accessories
          </h2>
          <p className="mt-2 max-w-2xl text-ink-600">
            Compatibility varies by headphone model, so every order is confirmed with you first.
          </p>
          <div className="mt-8">
            {items.length > 0 ? (
              <ProductGrid products={items} />
            ) : (
              <EmptyState title="Accessories are being added">Message us with your headphone model to ask what is available.</EmptyState>
            )}
          </div>
        </Container>
      </section>

      {faqs.length > 0 && (
        <section aria-labelledby="headphone-faq" className="py-14 sm:py-16">
          <Container>
            <div className="mx-auto max-w-4xl">
              <h2 id="headphone-faq" className="text-2xl font-semibold tracking-tight text-ink-900">
                Frequently asked questions
              </h2>
              <div className="mt-6">
                <FaqAccordion items={faqs} />
              </div>
            </div>
          </Container>
        </section>
      )}

      <CtaBand
        title="Not sure which part you need?"
        text="Send us your headphone model and a photo of the worn part on WhatsApp — our team will help you find a suitable replacement."
        message={whatsappMessages.headphoneRepair}
        secondary={{ label: "Wholesale Inquiries", href: "/wholesale" }}
      />
    </>
  );
}
