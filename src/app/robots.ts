import type { MetadataRoute } from "next";

import { getSiteUrl, isSiteUrlConfigured } from "@/lib/utils/url";

export default function robots(): MetadataRoute.Robots {
  // Without a real public origin (local or staging builds) nothing is
  // indexed, so localhost URLs can never leak into search results.
  if (!isSiteUrlConfigured()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", getSiteUrl()).toString(),
  };
}
