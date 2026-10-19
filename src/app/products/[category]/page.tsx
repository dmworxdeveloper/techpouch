import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { CategoryTile, ProductGrid } from "@/components/products/ProductCard";
import { ProductSection } from "@/components/products/ProductSection";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { EmptyState, InfoNotice } from "@/components/ui/StatusMessage";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { catalogCategories, getCategoryBySlug, getProductsInCategory, productHref } from "@/lib/catalog";
import { getFaqs } from "@/lib/faqs";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, whatsappMessages, whatsappUrl } from "@/lib/site";

export function generateStaticParams() {
  return catalogCategories.map((c) => ({ category: c.slug }));
}

function getCatalogCategory(slug: string) {
  const category = getCategoryBySlug(slug);
  return category?.placement === "catalog" ? category : undefined;
}

export async function generateMetadata({ params }: PageProps<"/products/[category]">): Promise<Metadata> {
  const category = getCatalogCategory((await params).category);
  if (!category) return {};
  return pageMetadata({
    title: category.seo.title,
    description: category.seo.description,
    path: category.href,
    image: { url: category.image.src, width: category.image.width, height: category.image.height, alt: category.image.alt },
  });
}

export default async function CategoryPage({ params }: PageProps<"/products/[category]">) {
  const category = getCatalogCategory((await params).category);
  if (!category) notFound();

  const items = getProductsInCategory(category.id);
  const faqs = getFaqs(category.faqIds);
  const otherCategories = catalogCategories.filter((c) => c.id !== category.id);

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Products", href: "/products" },
          { label: category.name, href: category.href },
        ]}
        title={category.name}
        lead={category.description}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={whatsappUrl(category.inquiryMessage)} external variant="whatsapp" size="lg">
            <WhatsAppIcon className="size-5" />
            Ask on WhatsApp
          </ButtonLink>
          <ButtonLink href="/wholesale" variant="outline" size="lg">
            Request a Wholesale Quote
          </ButtonLink>
        </div>
      </PageHeader>

      {category.display === "sections" && items.length > 0 ? (
        <>
          {items.length > 1 && (
            <nav aria-label={`${category.name} types`} className="border-b border-line bg-white">
              <Container className="flex flex-wrap gap-2 py-4">
                {items.map((product) => (
                  <a
                    key={product.id}
                    href={`#${product.slug}`}
                    className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                  >
                    {product.name}
                  </a>
                ))}
              </Container>
            </nav>
          )}
          {items.map((product, i) => (
            <section
              key={product.id}
              id={product.slug}
              aria-labelledby={`${product.slug}-heading`}
              className={`scroll-mt-24 py-14 sm:py-16 ${i % 2 === 1 ? "bg-tint" : ""}`}
            >
              <Container>
                {/* Heading sits above the gallery so each section is clearly labelled on mobile too. */}
                <h2 id={`${product.slug}-heading`} className="mb-8 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                  {product.name}
                </h2>
                <ProductSection
                  product={product}
                  category={category}
                  url={absoluteUrl(productHref(product))}
                  priority={i === 0}
                />
              </Container>
            </section>
          ))}
        </>
      ) : (
        <section aria-labelledby="products-heading" className="py-14 sm:py-16">
          <Container>
            <h2 id="products-heading" className="text-2xl font-semibold tracking-tight text-ink-900">
              {category.name} range
            </h2>
            {category.notice && (
              <div className="mt-4 max-w-3xl">
                <InfoNotice>{category.notice}</InfoNotice>
              </div>
            )}
            <div className="mt-8">
              {items.length > 0 ? (
                <ProductGrid products={items} />
              ) : (
                <EmptyState
                  title="New products coming soon"
                  action={
                    <ButtonLink href={whatsappUrl(category.inquiryMessage)} external variant="whatsapp">
                      <WhatsAppIcon className="size-4" />
                      Ask about availability
                    </ButtonLink>
                  }
                >
                  We are preparing this range. Message us to ask what is currently available.
                </EmptyState>
              )}
            </div>
          </Container>
        </section>
      )}

      {faqs.length > 0 && (
        <section aria-labelledby="category-faq" className="bg-tint py-14 sm:py-16">
          <Container>
            <div className="mx-auto max-w-4xl">
              <h2 id="category-faq" className="text-2xl font-semibold tracking-tight text-ink-900">
                Frequently asked questions
              </h2>
              <div className="mt-6">
                <FaqAccordion items={faqs} />
              </div>
            </div>
          </Container>
        </section>
      )}

      {otherCategories.length > 0 && (
        <section aria-labelledby="other-categories" className="py-14 sm:py-16">
          <Container>
            <h2 id="other-categories" className="text-2xl font-semibold tracking-tight text-ink-900">
              Explore other categories
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherCategories.map((c, i) => (
                <CategoryTile key={c.id} category={c} delay={i * 80} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand
        title="Buying for your store or business?"
        text="Share the products and quantities you need and our team will discuss wholesale pricing and order details with you."
        message={whatsappMessages.wholesale}
        secondary={{ label: "Wholesale Inquiries", href: "/wholesale" }}
      />
    </>
  );
}
