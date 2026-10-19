import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { getFaqs } from "@/lib/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Tech Pouch by WhatsApp, phone or email for product information, wholesale tablet cover and mouse pad inquiries, and custom manufacturing discussions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contact Us", href: "/contact" }]}
        eyebrow="Contact"
        title="Let's Talk About Your Requirements"
        lead="Contact Tech Pouch for product information, wholesale inquiries, and custom manufacturing discussions."
      />
      <section aria-labelledby="contact-options" className="py-14 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 id="contact-options" className="text-2xl font-semibold tracking-tight text-ink-900">
              Reach our team
            </h2>
            <p className="mt-2 mb-6 text-ink-600">
              WhatsApp is the quickest way to share product photos, reference images and order details.
            </p>
            <ContactDetails />
            <div className="mt-8 rounded-2xl border border-line bg-tint p-5 text-sm text-ink-700">
              <p className="font-semibold text-ink-900">Looking for something specific?</p>
              <ul className="mt-2 space-y-1">
                <li>
                  Bulk orders:{" "}
                  <Link href="/wholesale" className="font-medium text-brand-600 hover:underline">
                    wholesale inquiry form
                  </Link>
                </li>
                <li>
                  Your own product:{" "}
                  <Link href="/custom-manufacturing" className="font-medium text-brand-600 hover:underline">
                    custom manufacturing inquiry
                  </Link>
                </li>
                <li>
                  Quick answers:{" "}
                  <Link href="/faq" className="font-medium text-brand-600 hover:underline">
                    frequently asked questions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-8 lg:col-span-7">
            <h2 className="mb-4 text-xl font-semibold text-ink-900">Send us a message</h2>
            <InquiryForm formId="contact" />
          </div>
        </Container>
      </section>
      <section aria-labelledby="contact-faq" className="bg-tint py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 id="contact-faq" className="text-2xl font-semibold tracking-tight text-ink-900">
              Before you contact us
            </h2>
            <div className="mt-6">
              <FaqAccordion items={getFaqs(["pricing", "single-piece", "cod", "delivery"])} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
