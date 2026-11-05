/**
 * Prefixes a root-relative path to a file in /public with the site's base path. On GitHub Pages the
 * site lives under /myPortfolio, and Next.js only adds that prefix to its own links and assets.
 */
export function withBasePath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
