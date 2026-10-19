import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "whatsapp" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white shadow-soft hover:bg-brand-700 hover:shadow-lift",
  secondary: "border border-line bg-white text-ink-900 hover:border-ink-900/25 hover:bg-surface",
  outline: "border border-brand-600 bg-white text-brand-600 hover:bg-brand-50",
  whatsapp: "bg-whatsapp text-ink-950 shadow-soft hover:bg-whatsapp-dark hover:text-white",
  ghost: "text-brand-600 hover:text-brand-700",
  light: "bg-white text-ink-900 hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-6 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className = "") {
  return `${base} ${variants[variant]} ${variant === "ghost" ? "min-h-11 px-0 text-sm" : sizes[size]} ${className}`;
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Opens in a new tab with safe rel attributes (used for WhatsApp links). */
  external?: boolean;
  "aria-label"?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  const isNonRoute = external || /^(https?:|mailto:|tel:)/.test(href);

  if (isNonRoute) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
