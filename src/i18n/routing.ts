import { defaultLocale, locales, type Locale } from "@/i18n/config";

export type RouteKey =
  "home" | "work" | "notes" | "atelier" | "about" | "contact";

export type RouteDefinition = {
  key: RouteKey;
  segment: string;
};

export const routes = [
  { key: "home", segment: "" },
  { key: "work", segment: "work" },
  { key: "notes", segment: "notes" },
  { key: "atelier", segment: "atelier" },
  { key: "about", segment: "about" },
  { key: "contact", segment: "contact" },
] as const satisfies readonly RouteDefinition[];

export function createLocalePath(locale: Locale, segment = ""): string {
  const normalizedSegment = segment.replace(/^\/+|\/+$/g, "");
  return normalizedSegment ? `/${locale}/${normalizedSegment}` : `/${locale}`;
}

export function createPathForRoute(
  locale: Locale,
  route: RouteDefinition,
): string {
  return createLocalePath(locale, route.segment);
}

export function getRouteFromPath(pathname: string | null): RouteDefinition {
  if (!pathname) {
    return routes[0];
  }

  const [, maybeLocale, ...rest] = pathname.split("/");
  const segment = rest.join("/");
  const match = routes.find(
    (route) =>
      route.segment === segment || segment.startsWith(`${route.segment}/`),
  );

  if (match) {
    return match;
  }

  if (maybeLocale && locales.includes(maybeLocale as Locale)) {
    return routes[0];
  }

  return routes[0];
}

export function switchLocalePath(
  pathname: string | null,
  nextLocale: Locale,
): string {
  if (!pathname) {
    return createPathForRoute(nextLocale, routes[0]);
  }

  const [, maybeLocale, ...rest] = pathname.split("/");
  if (maybeLocale && locales.includes(maybeLocale as Locale)) {
    return createLocalePath(nextLocale, rest.join("/"));
  }

  const route = getRouteFromPath(pathname);
  return createPathForRoute(nextLocale, route);
}

export function defaultLocalePath(segment = ""): string {
  return createLocalePath(defaultLocale, segment);
}
