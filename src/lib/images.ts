/**
 * Decorative and section images (product photos live in src/lib/products.ts).
 * Cut-outs are transparent WebP files in /public/images/cutouts — replace a file
 * and update its dimensions here to change the artwork.
 */

export type SiteImage = { src: string; width: number; height: number };

const cutout = (name: string, width: number, height: number): SiteImage => ({
  src: `/images/cutouts/${name}.webp`,
  width,
  height,
});

export const heroImages = {
  zipper: cutout("zipper-cover-black", 754, 879),
  universal: cutout("universal-cover-blue", 487, 885),
  mousePad: cutout("mouse-pad-black", 969, 491),
  earPads: cutout("ear-pads-black", 1000, 697),
};

export const customBandImages = {
  zipper: heroImages.zipper,
  universal: heroImages.universal,
  mousePads: cutout("mouse-pads-assorted", 981, 459),
};
