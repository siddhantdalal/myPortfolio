import type { NextConfig } from "next";

/**
 * The site is hosted on GitHub Pages, which only serves static files, so it is exported as plain
 * HTML/CSS/JS at build time. Images are served as-is because there is no image-optimisation server.
 *
 * Pages serves this repository under /<repo>; the deploy workflow passes that prefix in as
 * PAGES_BASE_PATH. Local builds leave it empty and serve from the root.
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
