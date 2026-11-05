import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

// Required for the static (GitHub Pages) export; this file never changes at runtime.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: profile.url, changeFrequency: "monthly", priority: 1 }];
}
