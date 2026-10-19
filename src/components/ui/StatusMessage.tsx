import type { ReactNode } from "react";
import { Info, PackageOpen } from "lucide-react";

/** Highlighted information note, e.g. for details that are still being confirmed. */
export function InfoNotice({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm leading-relaxed text-ink-700">
      <Info className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}

/** Empty state, e.g. a category without published products yet. */
export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-12 text-center">
      <PackageOpen className="mx-auto size-10 text-ink-500" aria-hidden="true" />
      <h3 className="mt-4 text-lg font-semibold text-ink-900">{title}</h3>
      {children && <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">{children}</p>}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
