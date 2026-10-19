import { Cog, Factory, Headset, ShieldCheck, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { revealDelay } from "@/lib/reveal";

const features = [
  { icon: ShieldCheck, label: "Quality-Focused Manufacturing" },
  { icon: Factory, label: "Direct from Manufacturer" },
  { icon: Truck, label: "Wholesale & Retail Supply" },
  { icon: Cog, label: "Custom Product Development" },
  { icon: Headset, label: "Direct Team Support" },
];

export function FeatureStrip() {
  return (
    <section aria-label="Tech Pouch at a glance" className="border-y border-brand-100 bg-tint">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-6 py-8 sm:grid-cols-3 lg:grid-cols-5">
          {features.map(({ icon: Icon, label }, i) => (
            <li key={label} className="reveal flex items-center gap-3" style={revealDelay(i * 60)}>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-brand-600 shadow-soft">
                <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-ink-800">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
