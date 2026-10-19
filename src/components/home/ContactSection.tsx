import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-surface py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-heading"
            eyebrow="Contact"
            title="Let's Talk About Your Requirements"
            description="Contact Tech Pouch for product information, wholesale inquiries, and custom manufacturing discussions."
            align="left"
          />
          <div className="reveal mt-8">
            <ContactDetails />
          </div>
        </div>
        <div className="reveal rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8 lg:col-span-7">
          <h3 className="text-xl font-semibold text-ink-900">Send an inquiry</h3>
          <p className="mt-1 mb-6 text-sm text-ink-600">Fields marked * are required.</p>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
