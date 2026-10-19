"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Container } from "@/components/ui/Container";
import { primaryProducts, productHref, secondaryProducts } from "@/lib/products";
import { mainNav, whatsappMessages, whatsappUrl } from "@/lib/site";

/** Top-level links shown after the Products menu. */
const pageLinks = mainNav.filter((item) => item.href !== "/");

const linkBase =
  "inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand-500";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsMenuId = useId();
  const mobileMenuId = useId();
  const productsRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setProductsOpen(false);
        setMobileOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  const closeAll = () => {
    setMobileOpen(false);
    setProductsOpen(false);
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const productsActive = pathname.startsWith("/products");
  const navClass = (active: boolean) =>
    `${linkBase} ${active ? "text-brand-600" : "text-ink-700 hover:bg-surface hover:text-ink-900"}`;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || mobileOpen
          ? "border-line bg-white/95 shadow-soft backdrop-blur"
          : "border-transparent bg-white/80 backdrop-blur"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Logo onClick={closeAll} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li>
              <Link href="/" className={navClass(isActive("/"))} aria-current={pathname === "/" ? "page" : undefined}>
                Home
              </Link>
            </li>
            <li
              ref={productsRef}
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                type="button"
                className={`${navClass(productsActive)} gap-1`}
                aria-expanded={productsOpen}
                aria-controls={productsMenuId}
                onClick={() => setProductsOpen((v) => !v)}
              >
                Products
                <ChevronDown
                  className={`size-4 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              <div
                id={productsMenuId}
                className={`absolute left-1/2 top-full w-80 -translate-x-1/2 pt-2 transition duration-200 ${
                  productsOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                }`}
              >
                <div className="rounded-2xl border border-line bg-white p-2 shadow-lift">
                  <ul>
                    {primaryProducts.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={productHref(p.slug)}
                          onClick={closeAll}
                          className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-brand-500"
                        >
                          <span className="block text-sm font-semibold text-ink-900">{p.name}</span>
                          <span className="mt-0.5 line-clamp-1 block text-xs text-ink-500">{p.summary}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="my-2 border-t border-line" />
                  <p className="px-3 pt-1 text-[11px] font-semibold tracking-wide text-ink-500 uppercase">
                    Repair accessories
                  </p>
                  <ul>
                    {secondaryProducts.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={productHref(p.slug)}
                          onClick={closeAll}
                          className="block rounded-xl px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-surface hover:text-ink-900 focus-visible:outline-2 focus-visible:outline-brand-500"
                        >
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="my-2 border-t border-line" />
                  <Link
                    href="/products"
                    onClick={closeAll}
                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-500"
                  >
                    View all products →
                  </Link>
                </div>
              </div>
            </li>
            {pageLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={navClass(isActive(item.href))}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={whatsappUrl(whatsappMessages.general)}
            external
            className="px-3 sm:px-4"
            aria-label="Get a quote on WhatsApp (opens in a new tab)"
          >
            <WhatsAppIcon className="size-4" />
            Get a Quote
          </ButtonLink>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xl text-ink-900 transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-brand-500 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={mobileMenuId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <div
        id={mobileMenuId}
        hidden={!mobileOpen}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <Container className="py-4">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              <li>
                <Link href="/" onClick={closeAll} className={`${navClass(isActive("/"))} w-full text-base`}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  onClick={closeAll}
                  className={`${navClass(pathname === "/products")} w-full text-base`}
                >
                  Products
                </Link>
                <ul className="ml-3 border-l border-line pl-3">
                  {[...primaryProducts, ...secondaryProducts].map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={productHref(p.slug)}
                        onClick={closeAll}
                        className={`${navClass(pathname === productHref(p.slug))} w-full`}
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {pageLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={closeAll} className={`${navClass(isActive(item.href))} w-full text-base`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink
            href={whatsappUrl(whatsappMessages.general)}
            external
            variant="whatsapp"
            size="lg"
            className="mt-4 w-full"
          >
            <WhatsAppIcon className="size-5" />
            Get a Quote on WhatsApp
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
