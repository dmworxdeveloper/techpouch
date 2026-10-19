"use client";

import Image from "next/image";
import { useState } from "react";
import type { CatalogImage } from "@/lib/catalog";

/** Main product photo with selectable thumbnails. */
export function ProductGallery({ images, productName }: { images: CatalogImage[]; productName: string }) {
  const [active, setActive] = useState(0);
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
          priority={active === 0}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="animate-fade-up object-contain p-6"
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-4 grid grid-cols-4 gap-3" aria-label={`${productName} photos`}>
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}: ${image.alt}`}
                aria-pressed={i === active}
                className={`relative block aspect-square w-full overflow-hidden rounded-xl border-2 bg-white transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                  i === active ? "border-brand-600" : "border-line hover:border-brand-200"
                }`}
              >
                <Image src={image.src} alt="" fill sizes="(min-width: 1024px) 130px, 22vw" className="object-contain p-1.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
