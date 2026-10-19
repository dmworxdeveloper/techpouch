import type { CSSProperties } from "react";

/** Staggers a `.reveal` element's entrance animation. */
export const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;
