# NOI favicon

The tab icon uses the wordmark's curved vertical stroke and lower dot, redrawn
on a 32-unit grid for small sizes. The SVG has a transparent background and
switches from charcoal to off-white with `prefers-color-scheme`.

Replaced assets: `src/app/icon.svg`, `src/app/favicon.ico`,
`src/app/apple-icon.png`, `public/icons/noi-192.png` and `noi-512.png`.
These previously used the boxed n mark; Git retains those versions. The hero
and navigation wordmarks are unchanged.

`src/app/icon.svg` is the source. Run `node scripts/generate-icons.mjs` to
regenerate the 16/32/48px ICO and 180/192/512px PNG assets using Next's existing
Sharp dependency. The transparent ICO has a fine light outline for dark tabs
without SVG support. Home-screen icons use an opaque charcoal background with
a padded off-white mark. Next's file metadata conventions expose the browser
icons; the manifest references the application PNGs.
