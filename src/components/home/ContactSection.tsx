import { ContactDetails } from "@/components/contact/ContactDetails";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-heading"
            title="Let's Talk About Your Requirements"
            description="Contact Tech Pouch for product information, wholesale inquiries, and custom manufacturing discussions."
            align="left"
          />
          <div className="reveal mt-8">
            <ContactDetails />
          </div>
        </div>
        <div className="reveal rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-7 lg:col-span-7">
          <h3 className="sr-only">Send an inquiry</h3>
          <InquiryForm formId="contact" />
        </div>
      </Container>
    </section>
  );
}
