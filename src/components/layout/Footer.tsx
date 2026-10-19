import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { CopyrightYear } from "./CopyrightYear";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { products, productHref } from "@/lib/products";
import { mainNav, siteConfig, whatsappMessages, whatsappUrl } from "@/lib/site";

const quickLinks = [...mainNav.slice(0, 1), { label: "All Products", href: "/products" }, ...mainNav.slice(1)];

const linkClass =
  "inline-flex min-h-9 items-center text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-brand-200";

export function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="bg-ink-950 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{siteConfig.tagline}</p>
            <ButtonLink
              href={whatsappUrl(whatsappMessages.general)}
              external
              variant="whatsapp"
              className="mt-6"
            >
              <WhatsAppIcon className="size-4" />
              Chat on WhatsApp
            </ButtonLink>
          </div>

          <nav aria-label="Quick links" className="lg:col-span-2">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="mt-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Product categories" className="lg:col-span-3">
            <h3 className="text-sm font-semibold">Products</h3>
            <ul className="mt-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={productHref(p.slug)} className={linkClass}>
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/custom-manufacturing" className={linkClass}>
                  Custom Manufacturing
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="mt-3 space-y-1">
              <li>
                <a href={contact.phoneHref} className={`${linkClass} gap-2`}>
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl(whatsappMessages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} gap-2`}
                >
                  <WhatsAppIcon className="size-4 shrink-0" />
                  WhatsApp: {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={`${linkClass} gap-2 break-all`}>
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Extra bottom padding keeps the floating WhatsApp button clear of footer text on small screens. */}
        <div className="mt-12 border-t border-white/10 pt-6 pb-16 text-sm text-white/60 sm:pb-0">
          <p>
            © <CopyrightYear /> {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
