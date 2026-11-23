import type { MetadataRoute } from "next";
import { WIZZLY_META } from "@/data/wizzlyData";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${WIZZLY_META.siteUrl}/sitemap.xml`,
  };
}
