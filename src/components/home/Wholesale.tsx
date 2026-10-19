import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Boxes, Building2, FileText, Lightbulb, PackageSearch, Store } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { b2bCollageImages } from "@/lib/images";
import { whatsappMessages, whatsappUrl } from "@/lib/site";

const inquiryTypes = [
  { icon: Boxes, title: "Wholesale & bulk orders" },
  { icon: Store, title: "Retail product inquiries" },
  { icon: PackageSearch, title: "Product sourcing" },
  { icon: Lightbulb, title: "Custom product development" },
  { icon: Building2, title: "Business and reseller inquiries" },
];

/**
 * Photo collage for the B2B section. Swap these for a workshop or production photo
 * once one is available (keep it a real Tech Pouch photo, not stock imagery).
 */
const collage = b2bCollageImages;

export function Wholesale() {
  return (
    <section id="wholesale" aria-labelledby="wholesale-heading" className="py-16 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="reveal grid grid-cols-2 gap-2 overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-soft lg:col-span-4">
          {collage.map((image) => (
            <div key={image.src} className="relative aspect-square overflow-hidden rounded-xl bg-white">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 190px, 45vw" className="object-contain p-2" />
            </div>
          ))}
        </div>

        <div className="lg:col-span-5">
          <SectionHeading
            id="wholesale-heading"
            eyebrow="B2B & Manufacturing"
            title="Your Manufacturing Partner for Tech Accessories"
            description="Whether you are sourcing products for retail, planning bulk purchases, or exploring a custom product idea, Tech Pouch provides a direct way to discuss your requirements with our team."
            align="left"
          />
          <div className="reveal mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={whatsappUrl(whatsappMessages.wholesale)} external>
              <WhatsAppIcon className="size-4" />
              Discuss Wholesale Orders
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={whatsappUrl(whatsappMessages.manufacturingQuote)} external variant="outline">
              <FileText className="size-4" aria-hidden="true" />
              Request a Manufacturing Quote
            </ButtonLink>
          </div>
          <p className="reveal mt-4 text-xs text-ink-500">
            Wholesale prices are not listed publicly — quantities, specifications and pricing are discussed directly with you.{" "}
            <Link href="/wholesale" className="font-semibold text-brand-600 hover:underline">
              Learn how wholesale works →
            </Link>
          </p>
        </div>

        <ul className="reveal space-y-1 rounded-2xl border border-line bg-tint/60 p-4 lg:col-span-3">
          {inquiryTypes.map(({ icon: Icon, title }) => (
            <li key={title} className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm font-medium text-ink-800">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-brand-600 shadow-soft">
                <Icon className="size-[18px]" aria-hidden="true" />
              </span>
              {title}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
