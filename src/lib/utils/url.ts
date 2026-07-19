import { siteConfig } from "@/config/site";

export function getSiteUrl(): URL {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return new URL(configured || siteConfig.localUrl);
}

export function absoluteUrl(path: string): string {
  return new URL(path, getSiteUrl()).toString();
}
