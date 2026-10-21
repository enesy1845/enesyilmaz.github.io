import { makeRouteHandler } from "@keystatic/next/route-handler";

import keystaticConfig from "../../../../../keystatic.config";

type Handler = ReturnType<typeof makeRouteHandler>;
let handler: Handler | undefined;

// Created on the first request, not at import: in GitHub mode Keystatic reads
// the KEYSTATIC_* secrets (see README) immediately, and those exist only at
// runtime on Cloudflare, not during `next build`.
function getHandler(): Handler {
  handler ??= makeRouteHandler({ config: keystaticConfig });
  return handler;
}

export function GET(request: Request) {
  return getHandler().GET(request);
}

export function POST(request: Request) {
  return getHandler().POST(request);
}
