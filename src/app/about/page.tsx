import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Factory, ShoppingBag } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { Container } from "@/components/ui/Container";
import { primaryProducts, productHref, secondaryProducts } from "@/lib/products";
import { whatsappMessages } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Tech Pouch is a tech accessories manufacturer making tablet covers and mouse pads for individual customers, retailers and businesses, with custom manufacturing inquiries welcome.",
  alternates: { canonical: "/about" },
};

const audiences = [
  {
    icon: ShoppingBag,
    title: "Individual customers",
    text: "Buy the accessories you need, including single pieces, by contacting our team directly.",
  },
  {
    icon: Building2,
    title: "Retailers and businesses",
    text: "Source tablet covers and mouse pads in bulk for resale, distribution or business use.",
  },
  {
    icon: Factory,
    title: "Product creators",
    text: "Bring a product idea and discuss having it manufactured to your specifications.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "About Us", href: "/about" }]}
        title="About Tech Pouch"
        lead="Tech Pouch is a product manufacturing company focused on practical tech accessories. We make and supply tablet covers and mouse pads, and we work with customers who want products made to their own requirements."
      />

      <section aria-labelledby="what-we-do" className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <h2 id="what-we-do" className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              What we do
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-ink-700">
              <p>
                We are a manufacturer, not just a reseller. Our core range covers{" "}
                {primaryProducts.map((p, i) => (
                  <span key={p.slug}>
                    <Link href={productHref(p.slug)} className="font-medium text-brand-600 hover:underline">
                      {p.name.toLowerCase()}
                    </Link>
                    {i < primaryProducts.length - 2 ? ", " : i === primaryProducts.length - 2 ? " and " : ""}
                  </span>
                ))}
                , and we also supply selected{" "}
                <Link
                  href={productHref(secondaryProducts[0].slug)}
                  className="font-medium text-brand-600 hover:underline"
                >
                  headphone leather repair accessories
                </Link>
                .
              </p>
              <p>
                Alongside our own products, we discuss{" "}
                <Link href="/custom-manufacturing" className="font-medium text-brand-600 hover:underline">
                  custom manufacturing
                </Link>{" "}
                projects with customers who have a product idea and need it made to their specifications.
              </p>
              <p>
                Every inquiry — from a single piece to a wholesale order — is handled through direct
                communication with our team, so you can discuss quantities, specifications and pricing
                with the people making your products.
              </p>
            </div>
          </div>
          <ul className="grid gap-4">
            {audiences.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="reveal flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft"
                style={revealDelay(i * 90)}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink-900">{title}</h3>
                  <p className="mt-1 text-sm text-ink-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>
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
