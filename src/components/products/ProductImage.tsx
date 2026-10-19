import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { CatalogImage as ProductImageData } from "@/lib/catalog";

type ProductImageProps = {
  /** Omit (e.g. a product without photos yet) to show a clean empty frame. */
  image?: ProductImageData;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Tailwind aspect-ratio class for the frame. */
  aspect?: string;
};

/**
 * Framed product photo. The frame keeps a fixed aspect ratio so replacement photos
 * of any size slot in without changing the layout; `object-contain` avoids cropping products.
 */
export function ProductImage({
  image,
  sizes,
  priority,
  className = "",
  aspect = "aspect-square",
}: ProductImageProps) {
  if (!image) {
    return (
      <div
        role="img"
        aria-label="Product photos coming soon"
        className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden bg-tint bg-[linear-gradient(to_right,rgb(31_85_240/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(31_85_240/0.06)_1px,transparent_1px)] bg-[size:24px_24px] ${aspect} ${className}`}
      >
        <span className="grid size-11 place-items-center rounded-xl bg-white text-brand-600 shadow-soft ring-1 ring-line">
          <ImageIcon className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className="text-xs font-medium text-ink-600">Photos coming soon</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-white ${aspect} ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
    </div>
  );
}
