import { categories } from "./categories";
import { products } from "./products";
import type { Category, Product, RetailPrice } from "./types";

export type { CatalogImage, Category, DeliveryRule, Product, RetailPrice, Specification, VariantGroup, WholesaleTerms } from "./types";
export * from "./wholesale";
export * from "./pricing";

/*
 * Catalog queries. Pages only use these helpers, so moving the data to a CMS or
 * database later means changing this file, not the pages.
 */

export const publishedCategories = categories.filter((c) => c.status === "published");
/** Categories shown in the main product catalog (excludes dedicated pages such as headphone repair). */
export const catalogCategories = publishedCategories.filter((c) => c.placement === "catalog");
export const dedicatedCategories = publishedCategories.filter((c) => c.placement === "dedicated");

export const publishedProducts = products.filter(
  (p) => p.status === "published" && publishedCategories.some((c) => c.id === p.categoryId),
);

export function getCategoryBySlug(slug: string): Category | undefined {
  return publishedCategories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return publishedCategories.find((c) => c.id === id);
}

export function getProductsInCategory(categoryId: string): Product[] {
  return publishedProducts.filter((p) => p.categoryId === categoryId);
}

export function getProduct(categorySlug: string, productSlug: string): { product: Product; category: Category } | undefined {
  const category = getCategoryBySlug(categorySlug);
  const product =
    category && productsWithPages().find((p) => p.categoryId === category.id && p.slug === productSlug);
  return category && product ? { product, category } : undefined;
}

/** True when the product is shown in full on its category page instead of having its own page. */
export function isSectionProduct(product: Product): boolean {
  return getCategoryById(product.categoryId)?.display === "sections";
}

/** Products with their own detail page. */
export const productsWithPages = () => publishedProducts.filter((p) => !isSectionProduct(p));

export function productHref(product: Product): string {
  const category = getCategoryById(product.categoryId);
  const base = category?.href ?? "/products";
  return isSectionProduct(product) ? `${base}#${product.slug}` : `${base}/${product.slug}`;
}

/** Shared price for a category's card when all its products have the same price, else undefined. */
export function getCategoryPrice(categoryId: string): RetailPrice | undefined {
  const prices = getProductsInCategory(categoryId).map((p) => p.pricing);
  const [first] = prices;
  if (!first || prices.some((p) => !p || p.amount !== first.amount || p.delivery.kind !== first.delivery.kind)) return undefined;
  return first;
}

/** Products from the same category first, then other catalog products. */
export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const others = publishedProducts.filter((p) => p.id !== product.id);
  const sameCategory = others.filter((p) => p.categoryId === product.categoryId);
  const catalog = others.filter(
    (p) => p.categoryId !== product.categoryId && getCategoryById(p.categoryId)?.placement === "catalog",
  );
  return [...sameCategory, ...catalog].slice(0, limit);
}

/** All size options across a category's products (used for card chips). */
export function getCategorySizes(categoryId: string): string[] {
  return [...new Set(getProductsInCategory(categoryId).flatMap((p) => p.sizes ?? []))];
}

/** Lookup used by client components to build page-aware WhatsApp messages. */
export function findProductByPath(pathname: string): Product | undefined {
  return publishedProducts.find((p) => productHref(p) === pathname);
}

export function findCategoryByPath(pathname: string): Category | undefined {
  return publishedCategories.find((c) => c.href === pathname);
}
