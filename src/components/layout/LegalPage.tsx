import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { Container } from "@/components/ui/Container";

/** Shared layout for policy pages with readable long-form typography. */
export function LegalPage({
  title,
  path,
  updated,
  intro,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader crumbs={[{ label: title, href: path }]} title={title} lead={intro} compact>
        <p className="text-sm text-ink-500">Last updated: {updated}</p>
      </PageHeader>
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-ink-700 [&_a]:font-medium [&_a]:text-brand-600 [&_a:hover]:underline [&_h2]:pt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink-900 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
            {children}
          </div>
        </Container>
      </section>
    </>
  );
}
