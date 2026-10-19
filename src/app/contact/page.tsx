import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Tech Pouch by WhatsApp, phone or email for product information, wholesale tablet cover and mouse pad inquiries, and custom manufacturing discussions.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contact Us", href: "/contact" }]}
        title="Let's Talk About Your Requirements"
        lead="Contact Tech Pouch for product information, wholesale inquiries, and custom manufacturing discussions."
      />
      <section aria-labelledby="contact-options" className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="contact-options" className="text-2xl font-semibold tracking-tight text-ink-900">
              Reach our team
            </h2>
            <p className="mt-2 mb-6 text-ink-600">
              WhatsApp is the quickest way to share product photos, reference images and order details.
            </p>
            <ContactDetails />
          </div>
          <div className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8 lg:col-span-7">
            <h2 className="text-xl font-semibold text-ink-900">Send an inquiry</h2>
            <p className="mt-1 mb-6 text-sm text-ink-600">Fields marked * are required.</p>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
