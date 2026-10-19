import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { CopyrightYear } from "./CopyrightYear";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/icons/SocialIcons";
import { publishedCategories } from "@/lib/catalog";
import { mainNav, siteConfig, socialLinks, whatsappMessages, whatsappUrl } from "@/lib/site";

const quickLinks = [
  ...mainNav.slice(0, 1),
  { label: "All Products", href: "/products" },
  ...mainNav.slice(1),
  { label: "FAQ", href: "/faq" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

/** Only profiles with a configured URL are shown (see socialLinks in src/lib/site.ts). */
const socials = [
  { label: "Facebook", href: socialLinks.facebook, icon: FacebookIcon },
  { label: "Instagram", href: socialLinks.instagram, icon: InstagramIcon },
  { label: "YouTube", href: socialLinks.youtube, icon: YouTubeIcon },
].filter((s) => s.href);

const linkClass =
  "inline-flex min-h-9 items-center text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-brand-200";

export function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="bg-navy-900 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container className="py-12 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{siteConfig.tagline}</p>
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
              {publishedCategories.map((c) => (
                <li key={c.id}>
                  <Link href={c.href} className={linkClass}>
                    {c.name}
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
                <a href={`mailto:${contact.email}`} className={`${linkClass} gap-2 break-all`}>
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
            </ul>
            <ButtonLink href={whatsappUrl(whatsappMessages.general)} external className="mt-4">
              <WhatsAppIcon className="size-4" />
              Chat on WhatsApp
            </ButtonLink>
            {socials.length > 0 && (
              <ul className="mt-5 flex gap-2" aria-label="Social media">
                {socials.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Tech Pouch on ${label}`}
                      className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-600"
                    >
                      <Icon className="size-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>

      {/* Extra bottom padding keeps the floating WhatsApp button clear of the text on small screens. */}
      <div className="border-t border-white/10 bg-black/15">
        <Container className="flex flex-col gap-3 pt-5 pb-20 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:pb-5">
          <p>
            © <CopyrightYear /> {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
