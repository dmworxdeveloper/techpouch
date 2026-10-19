import type { MetadataRoute } from "next";
import { products, productHref } from "@/lib/products";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/products", priority: 0.9 },
    ...products.map((p) => ({ path: productHref(p.slug), priority: p.tier === "primary" ? 0.8 : 0.6 })),
    { path: "/custom-manufacturing", priority: 0.8 },
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.6 },
  ];

  return pages.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  }));
}
