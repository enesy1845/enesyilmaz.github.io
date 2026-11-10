import type { RouteKey } from "@/i18n/routing";

/**
 * Sections that exist in the codebase but are not published yet. A disabled
 * section is left out of navigation, the footer, the sitemap and in-page
 * links, and its route answers with 404. The content stays in place:
 * set the flag back to `true` to publish it again.
 */
export const sectionFlags = {
  atelier: false,
} as const satisfies Partial<Record<RouteKey, boolean>>;

export function isRouteEnabled(key: RouteKey): boolean {
  return (sectionFlags as Partial<Record<RouteKey, boolean>>)[key] ?? true;
}
