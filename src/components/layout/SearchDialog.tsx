"use client";

import Link from "next/link";
import { useId, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { products, productHref } from "@/lib/products";

type Entry = { title: string; description: string; href: string };

/** Everything the site search can find: product pages plus the main pages. */
const entries: Entry[] = [
  ...products.map((p) => ({ title: p.name, description: p.summary, href: productHref(p.slug) })),
  { title: "All Products", description: "Tablet covers, mouse pads and repair accessories.", href: "/products" },
  {
    title: "Custom Manufacturing",
    description: "Share your product idea, specifications and reference images.",
    href: "/custom-manufacturing",
  },
  { title: "Wholesale Orders", description: "Bulk orders and reseller inquiries.", href: "/#wholesale" },
  { title: "How to Order", description: "Ordering steps for retail and wholesale customers.", href: "/#how-to-order" },
  { title: "About Us", description: "Who Tech Pouch is and who we work with.", href: "/about" },
  { title: "Contact Us", description: "WhatsApp, phone, email and inquiry form.", href: "/contact" },
];

function matches(entry: Entry, query: string) {
  const haystack = `${entry.title} ${entry.description}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

/** Header search button that opens a modal for finding products and pages. */
export function SearchDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const titleId = useId();
  const results = useMemo(() => (query.trim() ? entries.filter((e) => matches(e, query)) : entries), [query]);

  const open = () => {
    dialogRef.current?.showModal();
    inputRef.current?.focus();
  };
  const close = () => {
    dialogRef.current?.close();
    setQuery("");
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Search products and pages"
        className="inline-flex size-11 items-center justify-center rounded-xl text-ink-700 transition-colors hover:bg-surface hover:text-ink-900 focus-visible:outline-2 focus-visible:outline-brand-500"
      >
        <Search className="size-5" aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setQuery("")}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto mt-[10vh] w-[calc(100%-2rem)] max-w-xl rounded-2xl border border-line bg-white p-0 text-ink-900 shadow-lift backdrop:bg-ink-950/50 backdrop:backdrop-blur-sm"
      >
        <h2 id={titleId} className="sr-only">
          Search Tech Pouch
        </h2>
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-5 shrink-0 text-ink-500" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products and pages…"
            aria-label="Search"
            className="h-14 w-full bg-transparent text-base outline-none placeholder:text-ink-500"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close search"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-surface hover:text-ink-900"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <ul className="max-h-[60vh] overflow-y-auto p-2" aria-live="polite">
          {results.map((entry) => (
            <li key={entry.href}>
              <Link
                href={entry.href}
                onClick={close}
                className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{entry.title}</span>
                  <span className="block truncate text-sm text-ink-500">{entry.description}</span>
                </span>
                <ArrowRight className="size-4 text-brand-600 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />
              </Link>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-ink-500">
              No results for “{query}”. Try “tablet”, “mouse pad” or{" "}
              <Link href="/contact" onClick={close} className="font-medium text-brand-600 hover:underline">
                ask our team
              </Link>
              .
            </li>
          )}
        </ul>
      </dialog>
    </>
  );
}
