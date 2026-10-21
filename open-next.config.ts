import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// The site is fully prerendered and never revalidates, so prerendered pages
// are served straight from the Workers static assets (no R2/KV needed).
// Without a cache, routes with `dynamicParams = false` returned 404 on Workers.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
