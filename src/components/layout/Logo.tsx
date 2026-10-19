import Link from "next/link";

/**
 * Text-based Tech Pouch wordmark. To use an image logo later, replace the
 * contents of this component with a next/image <Image> of the logo file.
 */
export function Logo({ tone = "dark", onClick }: { tone?: "dark" | "light"; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group inline-flex min-h-11 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
      aria-label="Tech Pouch — home"
    >
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-xl bg-brand-600 text-sm font-extrabold tracking-tight text-white shadow-soft transition-transform duration-300 group-hover:-rotate-6"
      >
        TP
      </span>
      <span
        className={`text-lg font-bold tracking-tight ${tone === "light" ? "text-white" : "text-ink-900"}`}
      >
        Tech<span className="text-brand-600">Pouch</span>
      </span>
    </Link>
  );
}
