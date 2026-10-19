import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Factory, MessagesSquare, ShoppingBag } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { CategoryTile } from "@/components/products/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { heroImages } from "@/lib/images";
import { publishedCategories } from "@/lib/catalog";
import { revealDelay } from "@/lib/reveal";
import { pageMetadata } from "@/lib/seo";
import { whatsappMessages } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Tech Pouch is a technology accessories manufacturer making tablet covers and mouse pads for individual customers, retailers and businesses, with custom manufacturing inquiries welcome.",
  path: "/about",
});

const services = [
  {
    icon: ShoppingBag,
    title: "Retail customers",
    text: "Individual customers can order single products and confirm the details directly with our team on WhatsApp.",
    href: "/products",
    link: "Browse products",
  },
  {
    icon: Building2,
    title: "Wholesale & business supply",
    text: "Retailers, resellers, distributors and businesses can request quotes for bulk quantities.",
    href: "/wholesale",
    link: "Wholesale inquiries",
  },
  {
    icon: Factory,
    title: "Custom manufacturing",
    text: "Customers with a product idea can share their requirements and discuss having it manufactured.",
    href: "/custom-manufacturing",
    link: "Start a project",
  },
  {
    icon: MessagesSquare,
    title: "Direct communication",
    text: "Every inquiry is handled directly by our team by WhatsApp, phone or email.",
    href: "/contact",
    link: "Contact us",
  },
];

export default function AboutPage() {
  const { zipper, universal, mousePad } = heroImages;
  return (
    <>
      <PageHeader
        crumbs={[{ label: "About Us", href: "/about" }]}
        eyebrow="Who we are"
        title="About Tech Pouch"
        lead="Tech Pouch is a technology accessories company focused on manufacturing practical products, supplying them to individual and business customers, and helping customers bring their own product ideas to life."
        aside={
          <div aria-hidden="true" className="relative mx-auto aspect-[5/4] w-full max-w-md">
            <div className="absolute top-[4%] left-[40%] w-[30%] rotate-[6deg]">
              <Image src={universal.src} alt="" width={universal.width} height={universal.height} sizes="140px" className="h-auto w-full drop-shadow-[0_16px_20px_rgba(15,29,53,0.25)]" />
            </div>
            <div className="absolute top-[6%] left-[4%] w-[46%] -rotate-[4deg]">
              <Image src={zipper.src} alt="" width={zipper.width} height={zipper.height} sizes="210px" className="h-auto w-full drop-shadow-[0_18px_22px_rgba(15,29,53,0.3)]" />
            </div>
            <div className="absolute right-0 bottom-0 w-[62%]">
              <Image src={mousePad.src} alt="" width={mousePad.width} height={mousePad.height} sizes="280px" className="h-auto w-full drop-shadow-[0_14px_14px_rgba(15,29,53,0.25)]" />
            </div>
          </div>
        }
      />

      <section aria-labelledby="intro-heading" className="py-14 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="intro-heading" eyebrow="Our focus" title="A manufacturer-focused tech accessories brand" align="left" />
          </div>
          <div className="reveal space-y-4 leading-relaxed text-ink-700 lg:col-span-7">
            <p>
              We are a manufacturer, not just a reseller. Our work centres on practical technology accessories — tablet covers,
              mouse pads and selected headphone leather repair accessories — made for everyday use.
            </p>
            <p>
              We serve individual customers who need a single product, as well as retailers, resellers, distributors and
              businesses looking for a supplier. Alongside our own range, we discuss custom manufacturing projects with
              customers who need a product made to their specifications.
            </p>
            <p>
              Single-piece prices are listed on our product pages, while wholesale quantities, custom projects and order details are
              discussed directly with our team.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="range-heading" className="bg-tint py-14 sm:py-16">
        <Container>
          <SectionHeading id="range-heading" eyebrow="Product range" title="What we make and supply" align="left" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {publishedCategories.map((category, i) => (
              <CategoryTile key={category.id} category={category} delay={i * 70} imageSizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw" />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="services-heading" className="py-14 sm:py-16">
        <Container>
          <SectionHeading id="services-heading" eyebrow="How we help" title="Support for every type of customer" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, text, href, link }, i) => (
              <li key={title} className="reveal flex flex-col rounded-2xl border border-line bg-white p-6 shadow-soft" style={revealDelay(i * 70)}>
                <span className="grid size-11 place-items-center rounded-xl bg-brand-600 text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-ink-900">{title}</h3>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-600">{text}</p>
                <Link href={href} className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
                  {link}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/products" size="lg">
              Explore Our Products
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Contact Our Team
            </ButtonLink>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Let's talk about your requirements"
        text="Contact Tech Pouch for product information, wholesale inquiries, and custom manufacturing discussions."
        message={whatsappMessages.general}
      />
    </>
  );
}
