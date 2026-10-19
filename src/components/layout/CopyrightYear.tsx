import { cacheLife } from "next/cache";

/** Current year, cached so the footer stays prerendered while still rolling over each year. */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
