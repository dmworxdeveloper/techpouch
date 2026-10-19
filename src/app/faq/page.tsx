import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { FaqExplorer } from "@/components/faq/FaqExplorer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { faqs, faqTopics } from "@/lib/faqs";
import { pageMetadata } from "@/lib/seo";
import { whatsappMessages } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about Tech Pouch tablet covers, mouse pads, single-piece orders, wholesale inquiries, custom manufacturing, pricing, delivery and Cash on Delivery.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      {/* FAQPage data mirrors every question rendered on this page. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <PageHeader
        crumbs={[{ label: "FAQ", href: "/faq" }]}
        eyebrow="Help centre"
        title="Frequently Asked Questions"
        lead="Answers about our products, ordering, wholesale supply and custom manufacturing. Can't find what you need? Our team is happy to help."
      />
      <section className="py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <FaqExplorer faqs={faqs} topics={faqTopics} />
          </div>
        </Container>
      </section>
      <CtaBand
        title="Still have a question?"
        text="Message our team on WhatsApp or send us an inquiry and we will get back to you."
        message={whatsappMessages.general}
      />
    </>
  );
}
