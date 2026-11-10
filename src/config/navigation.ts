import { isRouteEnabled } from "@/config/features";
import { routes } from "@/i18n/routing";

/** Published routes only: sections switched off in `features.ts` are left out. */
export const navigationRoutes = routes.filter((route) =>
  isRouteEnabled(route.key),
);
