import Image from "next/image";
import { ArrowRight, ClipboardList, ImageUp, MessagesSquare } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { customBandImages } from "@/lib/images";
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

/** Homepage band for custom manufacturing. Links to the dedicated /custom-manufacturing page. */
export function CustomManufacturing() {
  const { zipper, universal, mousePads } = customBandImages;
  return (
    <section
      id="custom-manufacturing"
      aria-labelledby="custom-heading"
      className="relative overflow-hidden bg-[linear-gradient(110deg,var(--color-navy-900)_0%,var(--color-navy-800)_60%,var(--color-navy-700)_100%)] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:40px_40px]"
      />
      <Container className="relative grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-8">
        <div className="reveal lg:col-span-4">
          <p className="text-sm font-semibold tracking-wide text-brand-300 uppercase">Custom manufacturing</p>
          <h2 id="custom-heading" className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Have a Product Idea? Let&apos;s Manufacture It.
          </h2>
          <p className="mt-4 leading-relaxed text-white/75">
            Share your product details, dimensions, material preferences, reference pictures and requirements with
            Tech Pouch to discuss your custom manufacturing needs.
          </p>
          <ButtonLink href="/custom-manufacturing" className="mt-7">
            Start a Custom Manufacturing Inquiry
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </ButtonLink>
        </div>

        <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-8">
          <h3 className="reveal text-sm font-semibold text-white/90">How It Works</h3>
          <ol className="mt-5 grid gap-6 sm:grid-cols-3">
            {customSteps.map(({ title, text }, i) => (
              <li key={title} className="reveal relative" style={revealDelay(i * 90)}>
                <div className="flex items-center gap-3 sm:block">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-sm font-bold text-navy-800 ring-4 ring-white/15">
                    {i + 1}
                  </span>
                  <h4 className="font-semibold sm:mt-3">{title}</h4>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div aria-hidden="true" className="relative mx-auto aspect-[5/4] w-full max-w-sm lg:col-span-3 lg:max-w-none">
          <div className="absolute top-[2%] left-[34%] w-[34%] rotate-[6deg]">
            <Image src={universal.src} alt="" width={universal.width} height={universal.height} sizes="120px" className="h-auto w-full drop-shadow-[0_16px_20px_rgba(0,0,0,0.45)]" />
          </div>
          <div className="absolute top-[8%] left-[2%] w-[50%] -rotate-[5deg]">
            <Image src={zipper.src} alt="" width={zipper.width} height={zipper.height} sizes="170px" className="h-auto w-full drop-shadow-[0_18px_22px_rgba(0,0,0,0.5)]" />
          </div>
          <div className="absolute right-0 bottom-[2%] w-[78%]">
            <Image src={mousePads.src} alt="" width={mousePads.width} height={mousePads.height} sizes="260px" className="h-auto w-full drop-shadow-[0_14px_16px_rgba(0,0,0,0.45)]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
