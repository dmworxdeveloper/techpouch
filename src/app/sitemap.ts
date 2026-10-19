import type { MetadataRoute } from "next";
import { productHref, publishedCategories, publishedProducts } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

/** Generated from the catalog, so new categories and products are added automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/products", priority: 0.9 },
    ...publishedCategories.map((c) => ({ path: c.href, priority: c.placement === "catalog" ? 0.8 : 0.7 })),
    ...publishedProducts.map((p) => ({ path: productHref(p), priority: 0.7 })),
    { path: "/wholesale", priority: 0.8 },
    { path: "/custom-manufacturing", priority: 0.8 },
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.6 },
    { path: "/faq", priority: 0.5 },
    { path: "/privacy-policy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];

  return pages.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  }));
}
