import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.defaultTitle,
    short_name: siteConfig.name,
    description: siteConfig.defaultDescription,
    start_url: "/en",
    display: "standalone",
    background_color: "#171412",
    theme_color: "#171412",
    lang: "en",
  };
}
