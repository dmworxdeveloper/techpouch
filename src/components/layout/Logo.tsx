import Image from "next/image";
import Link from "next/link";

/**
 * The supplied tan monogram wordmark is used on light surfaces. The light
 * version remains available for dark backgrounds such as the footer.
 */
const LOGO = {
  dark: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tech%20Pouch%20Tan%20Monogram%20Logo-rKv4QC9pN06wAYx4d9zb6Pp5XHwkFE.png",
  light: "/brand/tech-pouch-logo-light.png",
  width: 2048,
  height: 683,
};

export function Logo({
  tone = "dark",
  onClick,
  priority = false,
}: {
  tone?: "dark" | "light";
  onClick?: () => void;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group inline-flex min-h-11 shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
      aria-label="Tech Pouch — home"
    >
      <Image
        src={tone === "light" ? LOGO.light : LOGO.dark}
        alt="Tech Pouch"
        width={LOGO.width}
        height={LOGO.height}
        priority={priority}
        unoptimized={LOGO.dark.startsWith("http") && tone === "dark"}
        sizes="(min-width: 640px) 220px, 180px"
        className="h-9 w-auto transition-opacity duration-200 group-hover:opacity-85 sm:h-10"
      />
    </Link>
  );
}
