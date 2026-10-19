import Image from "next/image";
import Link from "next/link";

/**
 * Official Tech Pouch logo (public/brand). The light version has white "Tech"
 * lettering for dark backgrounds such as the footer.
 */
const LOGO = {
  dark: "/brand/tech-pouch-logo.png",
  light: "/brand/tech-pouch-logo-light.png",
  width: 1398,
  height: 252,
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
        sizes="(min-width: 640px) 220px, 180px"
        className="h-8 w-auto transition-opacity duration-200 group-hover:opacity-85 sm:h-9"
      />
    </Link>
  );
}
