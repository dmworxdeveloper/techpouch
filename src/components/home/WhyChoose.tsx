import { Factory, Handshake, Layers, MessageCircle, SlidersHorizontal, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealDelay } from "@/lib/reveal";

const benefits = [
  { icon: Factory, title: "Manufacturer-Focused Approach", text: "Direct from the manufacturer, not a middleman." },
  { icon: Layers, title: "Wide Product Range", text: "Multiple product categories to meet different needs." },
  { icon: Wrench, title: "Custom Manufacturing", text: "Turn your ideas into real products." },
  { icon: Handshake, title: "Flexible for All Buyers", text: "Retail customers and wholesale partners." },
  { icon: MessageCircle, title: "Direct Communication", text: "Clear support via WhatsApp, phone and email." },
  { icon: SlidersHorizontal, title: "Tailored to Your Needs", text: "Products and solutions designed around your requirements." },
];

export function WhyChoose() {
  return (
    <section aria-labelledby="why-heading" className="py-16 sm:py-20">
      <Container>
        <SectionHeading id="why-heading" eyebrow="Why choose Tech Pouch" title="Built for Better Solutions" align="left" />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-0 xl:divide-x xl:divide-line">
          {benefits.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="reveal group flex gap-3 xl:px-4 xl:first:pl-0 xl:last:pr-0" style={revealDelay(i * 60)}>
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-600 text-white transition-transform duration-300 group-hover:-translate-y-0.5">
                <Icon className="size-[18px]" strokeWidth={1.9} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
