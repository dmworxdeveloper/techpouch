import type { Metadata } from "next";
import { Box, Camera, Check, Layers, Palette, PenTool, Ruler, Target } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { customSteps } from "@/components/home/CustomManufacturing";
import { CustomManufacturingArt } from "@/components/products/CustomManufacturingArt";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getFaqs } from "@/lib/faqs";
import { revealDelay } from "@/lib/reveal";
import { pageMetadata } from "@/lib/seo";
import { whatsappMessages, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Custom Product Manufacturing",
  description:
    "Have a product idea? Share your concept, dimensions, materials and reference images with Tech Pouch to discuss custom tech accessories manufacturing.",
  path: "/custom-manufacturing",
});

const specGuide = [
  { icon: Target, title: "Purpose", text: "What the product is for and who will use it." },
  { icon: Ruler, title: "Dimensions", text: "Measurements, or the device the product needs to fit." },
  { icon: Layers, title: "Materials", text: "Any material preferences — or ask us for suggestions." },
  { icon: Palette, title: "Colours & finish", text: "Colours, textures or style you have in mind." },
  { icon: Box, title: "Quantity", text: "How many pieces you are planning, even if approximate." },
  { icon: PenTool, title: "Features", text: "Closures, pockets, padding or other details." },
];

const referenceTips = [
  "Photos of a similar product, from several angles",
  "Hand-drawn sketches or digital drawings",
  "Measurements marked on the drawing or photo",
  "Examples of colours, materials or finishes you like",
];

export default function CustomManufacturingPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Custom Manufacturing", href: "/custom-manufacturing" }]}
        eyebrow="Custom manufacturing"
        title="Have a Product Idea? Let's Manufacture It."
        lead="Share your product concept, reference images, dimensions, materials, and requirements with Tech Pouch to discuss your custom manufacturing project."
        aside={
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl shadow-lift">
            <CustomManufacturingArt />
          </div>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#project-inquiry" size="lg">
            Start Your Project Inquiry
          </ButtonLink>
          <ButtonLink href={whatsappUrl(whatsappMessages.custom)} external variant="whatsapp" size="lg">
            <WhatsAppIcon className="size-5" />
            Discuss on WhatsApp
          </ButtonLink>
        </div>
      </PageHeader>

      <section
        aria-labelledby="process-heading"
        className="relative overflow-hidden bg-[linear-gradient(110deg,var(--color-navy-900)_0%,var(--color-navy-800)_60%,var(--color-navy-700)_100%)] py-14 text-white sm:py-16"
      >
        <Container>
          <SectionHeading id="process-heading" eyebrow="How it works" title="A simple three-step inquiry process" tone="light" />
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {customSteps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="reveal rounded-2xl border border-white/10 bg-white/[0.06] p-6" style={revealDelay(i * 90)}>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-white text-sm font-bold text-navy-800">{i + 1}</span>
                  <Icon className="size-5 text-brand-300" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="spec-heading" className="py-14 sm:py-16">
        <Container>
          <SectionHeading
            id="spec-heading"
            eyebrow="Requirements & specifications"
            title="What to include in your inquiry"
            description="You don't need a finished design. The more of these details you can share, the easier it is for our team to assess feasibility and discuss next steps."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {specGuide.map(({ icon: Icon, title, text }, i) => (
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

      <section aria-labelledby="reference-heading" className="bg-tint py-14 sm:py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="reference-heading"
              eyebrow="Reference images & sketches"
              title="Show us what you have in mind"
              description="Pictures help our team understand your idea quickly. Attach them to the form below or send them on WhatsApp."
              align="left"
            />
            <ul className="reveal mt-6 space-y-3">
              {referenceTips.map((tip) => (
                <li key={tip} className="flex gap-3 text-ink-700">
                  <Check className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal rounded-2xl border border-line bg-white p-6 shadow-soft">
            <Camera className="size-8 text-brand-600" aria-hidden="true" />
            <h3 className="mt-3 text-lg font-semibold text-ink-900">Sending images</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-600">
              <li>• The form accepts up to 4 JPG, PNG or WebP images (4 MB in total).</li>
              <li>• For larger files, videos or more images, send them on WhatsApp.</li>
              <li>• Only share images you have the right to use.</li>
            </ul>
            <ButtonLink href={whatsappUrl(whatsappMessages.custom)} external variant="whatsapp" className="mt-5">
              <WhatsAppIcon className="size-4" />
              Send Images on WhatsApp
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section id="project-inquiry" aria-labelledby="form-heading" className="scroll-mt-24 py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              id="form-heading"
              eyebrow="Manufacturing inquiry"
              title="Tell us about your project"
              description="Our team reviews every request individually and will reply to discuss feasibility, quantities and pricing. Submitting an inquiry does not commit you to anything."
            />
            <div className="reveal mt-10 rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-8">
              <InquiryForm formId="custom" />
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="custom-faq" className="bg-tint py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 id="custom-faq" className="text-2xl font-semibold tracking-tight text-ink-900">
              Custom manufacturing questions
            </h2>
            <div className="mt-6">
              <FaqAccordion items={getFaqs(["custom", "custom-images", "custom-quote", "moq"])} />
            </div>
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
