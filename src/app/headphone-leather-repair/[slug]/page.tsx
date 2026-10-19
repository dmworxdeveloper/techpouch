import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/ProductDetail";
import { getCategoryById, getProductsInCategory, productHref } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

const CATEGORY_ID = "headphone-leather-repair";

export function generateStaticParams() {
  return getProductsInCategory(CATEGORY_ID).map((p) => ({ slug: p.slug }));
}

async function load(params: PageProps<"/headphone-leather-repair/[slug]">["params"]) {
  const { slug } = await params;
  const category = getCategoryById(CATEGORY_ID);
  const product = getProductsInCategory(CATEGORY_ID).find((p) => p.slug === slug);
  return category && product ? { category, product } : undefined;
}

export async function generateMetadata({ params }: PageProps<"/headphone-leather-repair/[slug]">): Promise<Metadata> {
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

export default async function HeadphoneProductPage({ params }: PageProps<"/headphone-leather-repair/[slug]">) {
  const match = await load(params);
  if (!match) notFound();

  return (
    <ProductDetail
      product={match.product}
      category={match.category}
      crumbs={[{ label: match.category.name, href: match.category.href }]}
    />
  );
}
