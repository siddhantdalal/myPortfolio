import type { NextConfig } from "next";

/**
 * The site is hosted on GitHub Pages, which only serves static files, so it is exported as plain
 * HTML/CSS/JS at build time. Images are served as-is because there is no image-optimisation server.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
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
