"use client";

import { useState, type ReactNode } from "react";
import { OrderPanel } from "./OrderPanel";
import { ProductGallery } from "./ProductGallery";
import type { Product } from "@/lib/catalog";

/**
 * Gallery + ordering panel for one product. Each instance keeps its own image selection,
 * so several products on one page have fully independent galleries. When images carry
 * design names, choosing a thumbnail selects that design for the order (and vice versa).
 */
export function ProductShowcase({
  product,
  productUrl,
  priority = false,
  before,
  after,
}: {
  product: Product;
  productUrl: string;
  priority?: boolean;
  /** Server-rendered content above the order panel (description, price). */
  before?: ReactNode;
  /** Server-rendered content below the order panel (features, specifications). */
  after?: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const designs = product.images.flatMap((image) => (image.design ? [image.design] : []));
  const currentDesign = product.images[active]?.design ?? designs[0];

  const selectDesign = (design: string) => {
    const index = product.images.findIndex((image) => image.design === design);
    if (index >= 0) setActive(index);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <ProductGallery
        images={product.images}
        productName={product.name}
        active={active}
        onSelect={setActive}
        priority={priority}
        note={product.imageNote}
      />
      <div className="space-y-6">
        {before}
        <OrderPanel
          product={product}
          productUrl={productUrl}
          designs={designs}
          design={currentDesign}
          onDesignChange={selectDesign}
        />
        {after}
      </div>
    </div>
  );
}
