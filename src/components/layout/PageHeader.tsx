import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";

/** Intro band for inner pages: breadcrumbs, the page's H1, a lead paragraph and optional actions. */
export function PageHeader({
  crumbs,
  title,
  eyebrow,
  lead,
  children,
  aside,
  compact = false,
}: {
  crumbs: Crumb[];
  title: string;
  eyebrow?: string;
  lead?: string;
  children?: ReactNode;
  /** Optional visual shown beside the text on large screens. */
  aside?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-[linear-gradient(115deg,#f4f7fc_0%,#eef2f8_45%,#e6ecf5_100%)]">
      <Container className={`${compact ? "py-8 sm:py-10" : "py-10 sm:py-14"} ${aside ? "grid items-center gap-10 lg:grid-cols-12" : ""}`}>
        <div className={aside ? "lg:col-span-7" : ""}>
          <Breadcrumbs items={crumbs} />
          {eyebrow && (
            <p className="mt-6 text-sm font-semibold tracking-wide text-brand-600 uppercase">{eyebrow}</p>
          )}
          <h1
            className={`${eyebrow ? "mt-2" : "mt-6"} max-w-3xl animate-fade-up font-semibold tracking-tight text-balance text-ink-900 ${
              compact ? "text-3xl sm:text-4xl" : "text-3xl sm:text-5xl"
            }`}
          >
            {title}
          </h1>
          {lead && (
            <p className="mt-4 max-w-2xl animate-fade-up text-lg leading-relaxed text-pretty text-ink-600 [animation-delay:80ms]">
              {lead}
            </p>
          )}
          {children && <div className="mt-8 animate-fade-up [animation-delay:160ms]">{children}</div>}
        </div>
        {aside && <div className="animate-fade-up [animation-delay:200ms] lg:col-span-5">{aside}</div>}
      </Container>
    </section>
  );
}
