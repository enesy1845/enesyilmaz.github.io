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
    icons: [
      { src: "/icons/noi-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/noi-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
