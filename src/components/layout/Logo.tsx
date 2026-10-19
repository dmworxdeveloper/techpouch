import Link from "next/link";

/** "TP" monogram. Also used as the favicon (src/app/icon.svg). */
export function LogoMark({ className = "size-10", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect x="2" y="4" width="24" height="7" rx="1.5" fill={tone === "light" ? "#ffffff" : "#0f1d35"} />
      <rect x="9.5" y="4" width="7.5" height="32" rx="1.5" fill={tone === "light" ? "#ffffff" : "#0f1d35"} />
      <path
        fillRule="evenodd"
        fill="#1f55f0"
        d="M19 13h9a8 8 0 0 1 0 16h-3v7h-6V13Zm6 5.5v5h3a2.5 2.5 0 0 0 0-5h-3Z"
      />
    </svg>
  );
}

/**
 * Tech Pouch logo: monogram + wordmark + tagline. To use an image logo later,
 * replace the contents of this component with a next/image <Image>.
 */
export function Logo({ tone = "dark", onClick }: { tone?: "dark" | "light"; onClick?: () => void }) {
  const light = tone === "light";
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group inline-flex min-h-11 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
      aria-label="Tech Pouch — home"
    >
      <LogoMark tone={tone} className="size-10 shrink-0 transition-transform duration-300 group-hover:-rotate-3" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-bold tracking-tight ${light ? "text-white" : "text-ink-900"}`}>
          Tech <span className={light ? "text-brand-300" : "text-brand-600"}>Pouch</span>
        </span>
        <span className={`mt-1 text-[10px] font-medium tracking-wide ${light ? "text-white/60" : "text-ink-500"}`}>
          Manufacturing Tech Accessories
        </span>
      </span>
    </Link>
  );
}
