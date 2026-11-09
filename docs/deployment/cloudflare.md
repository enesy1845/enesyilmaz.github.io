# Cloudflare Workers And Admin Setup

Everything in the repository is ready. The steps below need your Cloudflare and GitHub accounts, so they are done by hand. Nothing here changes DNS until step 5.

## 0. Before you start: which branch is production?

The repository's `main` branch still holds the legacy static site. GitHub Pages serves `main` because of the repository name.

- Workers Builds deploys the **production branch** you choose in step 2.
- The admin panel commits to the repository's **default branch** (`main`) unless you pick another branch in its UI.

Until the Next.js site is merged into `main`, use a non-production preview, or switch branches in the admin panel before saving.

## 1. Check locally

```text
npm run preview          # OpenNext build + local Workers runtime on :8788
```

## 2. Connect the repository (Workers Builds)

Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository** → choose `enesy1845/enesyilmaz.github.io`.

| Setting                       | Value                                                |
| ----------------------------- | ---------------------------------------------------- |
| Project name                  | `enesyilmaz-portfolio` (must match `wrangler.jsonc`) |
| Production branch             | the branch that holds the Next.js site               |
| Build command                 | `npx opennextjs-cloudflare build`                    |
| Deploy command                | `npx opennextjs-cloudflare deploy`                   |
| Non-production deploy command | `npx wrangler versions upload`                       |

**Build variables** (Settings → Build → Variables and secrets):

| Name                                    | Example                                     |
| --------------------------------------- | ------------------------------------------- |
| `NODE_VERSION`                          | `22`                                        |
| `NEXT_PUBLIC_SITE_URL`                  | `https://noiverse.com`, **only at go-live** |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | the GitHub App slug (step 3)                |

`NEXT_PUBLIC_*` values are inlined at build time, so they belong under **Build**, not runtime. While `NEXT_PUBLIC_SITE_URL` is unset, `robots.txt` blocks all indexing and canonical URLs stay non-public. Leave it unset during the preview phase so the `workers.dev` copy is never indexed. Set it in step 5.

## 3. GitHub App for admin sign-in

GitHub → Settings → Developer settings → **GitHub Apps** → **New GitHub App**:

- Homepage URL: `https://noiverse.com`
- Callback URLs (add each one you use):
  - `https://noiverse.com/api/keystatic/github/oauth/callback` (works once the domain is connected)
  - `https://enesyilmaz-portfolio.<account>.workers.dev/api/keystatic/github/oauth/callback`
- Webhook: off
- Repository permissions: **Contents** read & write, **Metadata** read-only, **Pull requests** read & write
- Where it can be installed: only this account

After you create the app, generate a client secret and **install the app** on this repository only.

Only people with write access to the repository can save content. Signing in alone grants nothing.

## 4. Runtime secrets

Worker → Settings → **Variables and secrets** (type: Secret):

| Name                             | Value                                                     |
| -------------------------------- | --------------------------------------------------------- |
| `KEYSTATIC_GITHUB_CLIENT_ID`     | the app's Client ID                                       |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | the generated client secret                               |
| `KEYSTATIC_SECRET`               | a random 64-character hex string (`openssl rand -hex 32`) |

Then redeploy. `/keystatic` should offer "Log in with GitHub".

## 5. Custom domain: noiverse.com (go-live only)

The domain `noiverse.com` is registered. It is **not connected yet**, on purpose: connecting it changes DNS and makes the site public.

When the site should go live:

1. Add the domain to the Cloudflare account (Websites → Add a site), if it is not already there, and point the registrar's nameservers to Cloudflare.
2. Worker → Settings → Domains & Routes → **Add custom domain** → `noiverse.com`. Optionally add `www.noiverse.com` and redirect it to the apex.
3. Set the build variable `NEXT_PUBLIC_SITE_URL=https://noiverse.com` and redeploy. Canonical URLs, sitemap, hreflang and structured data then use the domain, and `robots.txt` allows indexing.
4. Check that the GitHub App callback `https://noiverse.com/api/keystatic/github/oauth/callback` works.

The domain is not configured in `wrangler.jsonc` (`routes` / `custom_domain`), because a deploy would then attach it automatically.

## Publishing flow

Admin → Save → commit on GitHub → Workers Builds rebuilds (a few minutes) → live. If content is invalid (see `scripts/build-content.ts`), the build fails and the previous version stays online. The reason appears in the Workers Builds log.

## Storage (R2)

R2 is not used. Pages and images are served as Workers static assets. The hero is procedural WebGL with no media files. Consider R2 only for large galleries or video.
