import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getProduct, type ProductImage } from "@/lib/products";
import { whatsappMessages, whatsappUrl } from "@/lib/site";

const pick = (slug: string): ProductImage => getProduct(slug)!.image;

/** Product photos used in the hero collage — swap slugs or images here. */
const heroImages = {
  main: pick("universal-tablet-covers"),
  top: pick("zipper-tablet-covers"),
  bottom: pick("mouse-pads"),
};

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_80%_20%,var(--color-brand-50),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_75%)] bg-[size:56px_56px] opacity-40"
      />

      <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-6">
          <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-soft sm:text-sm">
            <span className="size-1.5 rounded-full bg-brand-500" aria-hidden="true" />
            Retail Orders • Wholesale Supply • Custom Manufacturing
          </p>
          <h1
            id="hero-heading"
            className="mt-6 animate-fade-up text-4xl font-bold tracking-tight text-balance text-ink-900 [animation-delay:80ms] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]"
          >
            Precision-Made Accessories.{" "}
            <span className="text-brand-600">Built for Your Brand.</span>
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-pretty text-ink-600 [animation-delay:160ms]">
            Tech Pouch manufactures practical tech accessories, from tablet covers and mouse pads to
            custom-made products tailored to your business requirements.
          </p>
          <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <ButtonLink href="/#products" size="lg">
              Explore Our Products
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={whatsappUrl(whatsappMessages.wholesale)} external variant="secondary" size="lg">
              <WhatsAppIcon className="size-4 text-whatsapp-dark" />
              Discuss Wholesale Orders
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:200ms] sm:max-w-lg lg:col-span-6 lg:max-w-none">
          <div className="relative aspect-[5/4]">
            <figure className="absolute inset-y-[4%] left-0 w-[60%] animate-float overflow-hidden rounded-3xl border border-line bg-white shadow-lift">
              <Image
                src={heroImages.main.src}
                alt={heroImages.main.alt}
                fill
                priority
                sizes="(min-width: 1024px) 380px, 60vw"
                className="object-cover"
              />
            </figure>
            <figure className="absolute top-0 right-0 w-[37%] animate-float overflow-hidden rounded-2xl border border-line bg-white shadow-lift [animation-delay:-2.5s]">
              <div className="relative aspect-square">
                <Image
                  src={heroImages.top.src}
                  alt={heroImages.top.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 230px, 37vw"
                  className="object-contain p-3"
                />
              </div>
            </figure>
            <figure className="absolute right-[6%] bottom-0 w-[37%] animate-float overflow-hidden rounded-2xl border border-line bg-white shadow-lift [animation-delay:-5s]">
              <div className="relative aspect-square">
                <Image
                  src={heroImages.bottom.src}
                  alt={heroImages.bottom.alt}
                  fill
                  sizes="(min-width: 1024px) 230px, 37vw"
                  className="object-contain p-3"
                />
              </div>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
