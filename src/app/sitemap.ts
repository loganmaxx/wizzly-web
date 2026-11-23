import type { MetadataRoute } from "next";
import { WIZZLY_META } from "@/data/wizzlyData";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: WIZZLY_META.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
