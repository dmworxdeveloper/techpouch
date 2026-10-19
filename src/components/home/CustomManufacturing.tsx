import { ArrowRight, ClipboardList, ImageUp, MessagesSquare } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappMessages, whatsappUrl } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";

export const customSteps = [
  {
    icon: ClipboardList,
    title: "Share Your Requirements",
    text: "Explain your product idea and specifications.",
  },
  {
    icon: ImageUp,
    title: "Submit Reference Images",
    text: "Share pictures, sketches, or examples through WhatsApp.",
  },
  {
    icon: MessagesSquare,
    title: "Discuss Your Project",
    text: "Contact our team to discuss feasibility, quantities, and pricing.",
  },
];

/** Homepage teaser for custom manufacturing. Links to the dedicated /custom-manufacturing page. */
export function CustomManufacturing() {
  return (
    <section id="custom-manufacturing" aria-labelledby="custom-heading" className="py-20 sm:py-24">
      <Container>
        <div className="rounded-3xl border border-line bg-gradient-to-br from-brand-50 via-white to-white p-6 shadow-soft sm:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <SectionHeading
                id="custom-heading"
                eyebrow="Custom manufacturing"
                title="Have a Product Idea? Let's Manufacture It."
                description="Looking for a product made to your specifications? Share your product details, dimensions, material preferences, reference pictures, and requirements with Tech Pouch to discuss your custom manufacturing needs."
                align="left"
              />
              <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
                <ButtonLink href="/custom-manufacturing" size="lg">
                  Start a Custom Manufacturing Inquiry
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={whatsappUrl(whatsappMessages.custom)} external variant="secondary" size="lg">
                  <WhatsAppIcon className="size-4 text-whatsapp-dark" />
                  Send Details on WhatsApp
                </ButtonLink>
              </div>
            </div>

            <ol className="grid gap-4 lg:col-span-7">
              {customSteps.map(({ icon: Icon, title, text }, i) => (
                <li
                  key={title}
                  className="reveal flex gap-5 rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6"
                  style={revealDelay(i * 90)}
                >
                  <div className="flex flex-col items-center">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase">Step {i + 1}</p>
                    <h3 className="mt-1 text-lg font-semibold text-ink-900">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-600">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
