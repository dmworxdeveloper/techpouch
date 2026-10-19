"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds a scroll-entrance animation to every `.reveal` element.
 * Content stays visible without JavaScript and when reduced motion is preferred
 * (the hiding styles only apply once `reveal-ready` is set; see globals.css).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    // Elements already on screen are revealed immediately so nothing above the fold waits.
    const viewportHeight = window.innerHeight;
    elements.forEach((el) => {
      if (el.getBoundingClientRect().top < viewportHeight) el.classList.add("is-visible");
      else observer.observe(el);
    });
    root.classList.add("reveal-ready");

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
