import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/ProductDetail";
import { getCategoryById, getProduct, productHref, productsWithPages } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return productsWithPages().flatMap((p) => {
    const category = getCategoryById(p.categoryId);
    return category?.placement === "catalog" ? [{ category: category.slug, product: p.slug }] : [];
  });
}

async function load(params: PageProps<"/products/[category]/[product]">["params"]) {
  const { category, product } = await params;
  const match = getProduct(category, product);
  return match?.category.placement === "catalog" ? match : undefined;
}

export async function generateMetadata({ params }: PageProps<"/products/[category]/[product]">): Promise<Metadata> {
  const match = await load(params);
  if (!match) return {};
  const image = match.product.images[0];
  return pageMetadata({
    title: match.product.seo.title,
    description: match.product.seo.description,
    path: productHref(match.product),
    image: image && { url: image.src, width: image.width, height: image.height, alt: image.alt },
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[category]/[product]">) {
  const match = await load(params);
  if (!match) notFound();
  const { product, category } = match;

  return (
    <ProductDetail
      product={product}
      category={category}
      crumbs={[
        { label: "Products", href: "/products" },
        { label: category.name, href: category.href },
      ]}
    />
  );
}
