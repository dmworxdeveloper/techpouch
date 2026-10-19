import { Factory, Handshake, Layers, MessageCircle, SlidersHorizontal, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealDelay } from "@/lib/reveal";

const benefits = [
  {
    icon: Factory,
    title: "Manufacturer-Focused Approach",
    text: "We make the products we offer, so you can discuss product details directly with the source.",
  },
  {
    icon: Handshake,
    title: "Wholesale and Retail Inquiries",
    text: "From a single piece to bulk quantities, every inquiry goes through the same direct process.",
  },
  {
    icon: Layers,
    title: "Multiple Product Categories",
    text: "Zipper tablet covers, universal tablet covers and mouse pads from one supplier.",
  },
  {
    icon: Wrench,
    title: "Custom Manufacturing Discussions",
    text: "Have a product idea? Share your specifications and we will discuss what is possible.",
  },
  {
    icon: MessageCircle,
    title: "Direct Communication with Our Team",
    text: "Talk to our team directly on WhatsApp, by phone or by email.",
  },
  {
    icon: SlidersHorizontal,
    title: "Product Requirements Tailored to Your Needs",
    text: "Tell us your quantities, sizes and preferences and we will work through them with you.",
  },
];

export function WhyChoose() {
  return (
    <section aria-labelledby="why-heading" className="bg-surface py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="why-heading"
          eyebrow="Why Tech Pouch"
          title="Why Choose Tech Pouch?"
          description="A straightforward way to source tech accessories, whether you need a single piece or bulk quantities."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="reveal group rounded-2xl border border-line bg-white p-6 transition hover:border-brand-200 hover:shadow-soft"
              style={revealDelay((i % 3) * 80)}
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
