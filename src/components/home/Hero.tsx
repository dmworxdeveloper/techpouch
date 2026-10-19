import Image from "next/image";
import { ArrowRight, CircleCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { heroImages } from "@/lib/images";
import { whatsappMessages, whatsappUrl } from "@/lib/site";

const highlights = ["Retail Orders", "Wholesale Supply", "Custom Manufacturing"];

/**
 * Product arrangement built from transparent cut-outs so each piece can be swapped
 * independently (see src/lib/images.ts). Positions are percentages of the frame.
 */
function HeroVisual() {
  const { zipper, universal, mousePad, earPads } = heroImages;
  return (
    <div className="relative mx-auto aspect-[6/5] w-full max-w-xl lg:max-w-none" aria-label="Tech Pouch products" role="img">
      {/* Floor shadow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[6%] bottom-[4%] h-[18%] rounded-[50%] bg-ink-900/10 blur-2xl"
      />
      <div className="absolute top-[6%] left-[44%] w-[24%] rotate-[5deg] animate-float [animation-delay:-3s]">
        <Image src={universal.src} alt="" width={universal.width} height={universal.height} sizes="(min-width: 1024px) 160px, 24vw" priority className="h-auto w-full drop-shadow-[0_18px_22px_rgba(15,29,53,0.28)]" />
      </div>
      <div className="absolute top-[10%] left-[4%] w-[46%] -rotate-[4deg] animate-float">
        <Image src={zipper.src} alt="" width={zipper.width} height={zipper.height} sizes="(min-width: 1024px) 300px, 46vw" priority className="h-auto w-full drop-shadow-[0_22px_26px_rgba(15,29,53,0.32)]" />
      </div>
      <div className="absolute bottom-[3%] left-[18%] w-[56%] [perspective:900px]">
        <Image src={mousePad.src} alt="" width={mousePad.width} height={mousePad.height} sizes="(min-width: 1024px) 360px, 56vw" className="h-auto w-full [transform:rotateX(58deg)] drop-shadow-[0_14px_14px_rgba(15,29,53,0.3)]" />
      </div>
      <div className="absolute right-[0%] bottom-[16%] w-[38%] animate-float [animation-delay:-5s]">
        <Image src={earPads.src} alt="" width={earPads.width} height={earPads.height} sizes="(min-width: 1024px) 240px, 38vw" className="h-auto w-full drop-shadow-[0_16px_18px_rgba(15,29,53,0.3)]" />
      </div>

      <p
        aria-hidden="true"
        className="absolute top-0 right-0 hidden rotate-[-4deg] text-right font-hand text-2xl leading-tight text-ink-800 sm:block"
      >
        Practical
        <br />
        Functional
        <br />
        Made for You
        <svg viewBox="0 0 60 50" className="mt-1 ml-auto mr-10 h-10 w-12 text-ink-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M50 4c4 18-8 34-34 38" />
          <path d="M22 34l-7 8 10 3" />
        </svg>
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[linear-gradient(115deg,#f4f7fc_0%,#eef2f8_45%,#e6ecf5_100%)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 size-[36rem] rounded-full bg-white/70 blur-3xl"
      />
      <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-6 lg:py-20">
        <div className="lg:col-span-6">
          <p className="inline-block animate-fade-up rounded-md bg-white px-2.5 py-1 text-xs font-semibold tracking-[0.14em] text-ink-800 uppercase shadow-soft">
            Tech Pouch
          </p>
          <h1
            id="hero-heading"
            className="mt-5 animate-fade-up text-4xl font-semibold tracking-tight text-balance text-ink-900 [animation-delay:80ms] sm:text-5xl lg:text-[3.1rem] lg:leading-[1.15]"
          >
            Quality Tech Accessories for <span className="text-brand-600">Every Need</span>
          </h1>
          <p className="mt-5 max-w-xl animate-fade-up text-lg leading-relaxed text-pretty text-ink-600 [animation-delay:160ms]">
            We manufacture tech accessories including tablet covers, mouse pads and more — for individual
            customers, retailers and businesses looking for a reliable manufacturing partner.
          </p>
          <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <ButtonLink href="/#products" size="lg">
              Explore Our Products
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={whatsappUrl(whatsappMessages.wholesale)} external variant="outline" size="lg">
              <WhatsAppIcon className="size-4" />
              Discuss Wholesale Orders
            </ButtonLink>
          </div>
          <ul className="mt-8 flex animate-fade-up flex-wrap gap-x-6 gap-y-3 [animation-delay:320ms]">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium text-ink-800">
                <CircleCheck className="size-5 fill-brand-600 text-white" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up [animation-delay:200ms] lg:col-span-6">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
