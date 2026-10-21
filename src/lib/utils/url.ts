import { siteConfig } from "@/config/site";

let warned = false;

/** True when a real public origin is configured for this build. */
export function isSiteUrlConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim());
}

export function getSiteUrl(): URL {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured && process.env.NODE_ENV === "production" && !warned) {
    warned = true;
    console.warn(
      "NEXT_PUBLIC_SITE_URL is not set: canonical URLs fall back to localhost and robots.txt blocks indexing.",
    );
  }
  return new URL(configured || siteConfig.localUrl);
}

export function absoluteUrl(path: string): string {
  return new URL(path, getSiteUrl()).toString();
}
