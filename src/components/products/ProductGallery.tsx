"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { CatalogImage } from "@/lib/catalog";

/**
 * Product Gallery: main image with clickable thumbnails. Controlled by its parent, so every
 * gallery on a page keeps its own selection independently.
 *
 * - No images: a clean, intentional empty frame (no fake photos, no thumbnail row).
 * - One image: main image only.
 * - Two or more: main image plus thumbnails.
 * Images come from each product's `images` array in src/lib/catalog/products.ts.
 */
export function ProductGallery({
  images,
  productName,
  active,
  onSelect,
  priority = false,
  note,
}: {
  images: CatalogImage[];
  productName: string;
  active: number;
  onSelect: (index: number) => void;
  priority?: boolean;
  note?: string;
}) {
  const current = images[active] ?? images[0];

  return (
    <section aria-label={`${productName} product gallery`} className="min-w-0">
      <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-brand-600 uppercase">Product Gallery</p>

      {current ? (
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            priority={priority && active === 0}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="animate-fade-up object-contain p-4 sm:p-6"
          />
          {current.design && (
            <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-800 shadow-soft">
              {current.design}
            </span>
          )}
        </div>
      ) : (
        <EmptyGallery productName={productName} />
      )}

      {images.length > 1 && (
        <ul className="mt-4 grid grid-cols-4 gap-2 sm:gap-3" aria-label={`${productName} photos`}>
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`Show ${image.design ? `${image.design} design` : `photo ${i + 1}`}`}
                aria-pressed={i === active}
                className={`relative block aspect-square w-full overflow-hidden rounded-xl border-2 bg-white transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                  i === active ? "border-brand-600" : "border-line hover:border-brand-200"
                }`}
              >
                <Image src={image.src} alt="" fill sizes="(min-width: 1024px) 130px, 22vw" className="object-contain p-1" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {note && current && <p className="mt-3 text-xs text-ink-500">{note}</p>}
    </section>
  );
}

/** Branded empty frame shown until product photos are added. Contains no images. */
function EmptyGallery({ productName }: { productName: string }) {
  return (
    <div
      role="img"
      aria-label={`Photos of the ${productName} will be added soon`}
      className="relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-3xl border border-line bg-tint px-6 text-center shadow-soft"
    >
      {/* Subtle brand grid and corner marks so the frame reads as deliberate, not broken. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(31_85_240/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(31_85_240/0.06)_1px,transparent_1px)] bg-[size:32px_32px]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-5 rounded-2xl border border-dashed border-brand-200" />
      <span className="relative grid size-16 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft ring-1 ring-line">
        <ImageIcon className="size-7" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <p className="relative mt-5 font-display text-lg font-semibold text-black">Product photos coming soon</p>
      <p className="relative mt-1 max-w-xs text-sm text-ink-600">
        Ask us on WhatsApp for current photos of the {productName.toLowerCase()}.
      </p>
    </div>
  );
}
