import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";

/** Intro band for inner pages: breadcrumbs, the page's H1 and a lead paragraph. */
export function PageHeader({
  crumbs,
  title,
  lead,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-gradient-to-b from-brand-50/70 to-white">
      <Container className="py-10 sm:py-14">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 max-w-3xl animate-fade-up text-3xl font-semibold tracking-tight text-balance text-ink-900 sm:text-5xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-4 max-w-2xl animate-fade-up text-lg leading-relaxed text-pretty text-ink-600 [animation-delay:80ms]">
            {lead}
          </p>
        )}
        {children && <div className="mt-8 animate-fade-up [animation-delay:160ms]">{children}</div>}
      </Container>
    </section>
  );
}
