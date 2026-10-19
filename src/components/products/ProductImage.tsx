import Image from "next/image";
import type { ProductImage as ProductImageData } from "@/lib/products";

type ProductImageProps = {
  image: ProductImageData;
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
