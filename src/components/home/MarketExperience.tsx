import { ArrowRight, CalendarCheck, Handshake, MapPin, MessageSquare, Package, Store, Truck, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { revealDelay } from "@/lib/reveal";

/*
 * Market experience and supply network, as confirmed by Tech Pouch. Keep this to the confirmed facts only:
 * no customer counts, named clients, capacity figures or delivery guarantees.
 * The warm gold accent is scoped to this section (arbitrary values below), not added to the global theme.
 */
const locations: { city: string; title: string; text: string; icon: LucideIcon }[] = [
  { city: "Lahore", title: "Shah Alam Market & Hall Road", text: "Our established markets for product supply.", icon: Store },
  { city: "Rawalpindi & Islamabad", title: "Bulk Supply Network", text: "Supplying products to business customers in the region.", icon: Truck },
  { city: "Faisalabad", title: "Wholesale Supply", text: "Serving retailers and other bulk buyers.", icon: Package },
  { city: "Karachi", title: "Existing Customer Network", text: "Supporting established customer relationships.", icon: Handshake },
];

const indicators: { label: string; icon: LucideIcon }[] = [
  { label: "Wholesale & Bulk Supply", icon: Package },
  { label: "Established Market Relationships", icon: Handshake },
];

export function MarketExperience() {
  return (
    <section
      id="market-experience"
      aria-labelledby="experience-heading"
      className="relative overflow-hidden bg-navy-900 py-16 text-white sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,rgb(214_177_106/0.10),transparent_70%)]"
      />
      <Container className="relative grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="reveal text-sm font-semibold tracking-wide text-[#e0c084] uppercase">
            20 years of market experience
          </p>
          <h2
            id="experience-heading"
            className="reveal mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl lg:text-[2.125rem] lg:leading-tight"
          >
            Trusted by Retailers. Built on 20 Years of Market Experience.
          </h2>
          <p className="reveal mt-4 leading-relaxed text-white/75">
            For over 20 years, we have been supplying products to businesses in Lahore&apos;s Shah Alam Market and Hall
            Road. Our bulk supply network also reaches Rawalpindi, Islamabad, and Faisalabad, with established customer
            relationships in Karachi.
          </p>

          <div className="reveal mt-8 flex items-center gap-5 rounded-2xl border border-[#d6b16a]/30 bg-white/[0.04] p-5">
            <p className="font-display text-5xl leading-none font-semibold tracking-tight text-[#e0c084] sm:text-6xl">
              20+
            </p>
            <div className="border-l border-white/15 pl-5">
              <p className="flex items-center gap-2 font-semibold">
                <CalendarCheck className="size-4 shrink-0 text-[#e0c084]" aria-hidden="true" />
                Years of Market Experience
              </p>
              <p className="mt-1 text-sm text-white/65">
                Serving wholesale buyers, retailers, resellers and other business customers.
              </p>
            </div>
          </div>

          <ul className="reveal mt-5 grid gap-3 sm:grid-cols-2">
            {indicators.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm font-medium text-white/90">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-[#e0c084]">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/wholesale" size="lg">
              Explore Wholesale
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="light" size="lg">
              <MessageSquare className="size-4" aria-hidden="true" />
              Contact Our Team
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-7 lg:self-center">
          <h3 className="reveal text-sm font-semibold tracking-wide text-white/70 uppercase">Our supply network</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {locations.map(({ city, title, text, icon: Icon }, i) => (
              <li
                key={city}
                className="reveal flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.6)] transition-colors hover:border-[#d6b16a]/40 sm:p-6"
                style={revealDelay(i * 90)}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#e0c084]">
                    <MapPin className="size-4 shrink-0" aria-hidden="true" />
                    {city}
                  </p>
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-white/80">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                </div>
                <h4 className="mt-4 text-lg font-semibold">{title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
