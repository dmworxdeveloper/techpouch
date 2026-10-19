import type { ReactNode } from "react";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`reveal max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-semibold tracking-wide uppercase ${
            tone === "light" ? "text-brand-200" : "text-brand-600"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`text-2xl font-semibold tracking-tight text-balance sm:text-3xl lg:text-[2.125rem] lg:leading-tight ${
          tone === "light" ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed text-pretty sm:text-lg ${
            tone === "light" ? "text-white/75" : "text-ink-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
