"use client";

import Image from "next/image";
import type { CatalogImage } from "@/lib/catalog";

/**
 * Main product image with clickable thumbnails. Controlled by its parent, so every
 * gallery on a page keeps its own selection independently.
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
  if (!current) return null;

  return (
    <div>
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
      {note && <p className="mt-3 text-xs text-ink-500">{note}</p>}
    </div>
  );
}
