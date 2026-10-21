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

| Name                                    | Example                      |
| --------------------------------------- | ---------------------------- |
| `NODE_VERSION`                          | `22`                         |
| `NEXT_PUBLIC_SITE_URL`                  | `https://<your-domain>`      |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | the GitHub App slug (step 3) |

`NEXT_PUBLIC_*` values are inlined at build time, so they belong under **Build**, not runtime. While `NEXT_PUBLIC_SITE_URL` is unset, `robots.txt` blocks all indexing.

## 3. GitHub App for admin sign-in

GitHub → Settings → Developer settings → **GitHub Apps** → **New GitHub App**:

- Homepage URL: `https://<your-domain>`
- Callback URLs (add each one you use):
  - `https://<your-domain>/api/keystatic/github/oauth/callback`
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

## 5. Custom domain (later)

Worker → Settings → Domains & Routes → **Add custom domain**. This changes DNS, so do it only when the site should go live. Then update `NEXT_PUBLIC_SITE_URL` and the GitHub App callback URL.

## Publishing flow

Admin → Save → commit on GitHub → Workers Builds rebuilds (a few minutes) → live. If content is invalid (see `scripts/build-content.ts`), the build fails and the previous version stays online. The reason appears in the Workers Builds log.

## Storage (R2)

R2 is not used. Pages and images are served as Workers static assets. The hero is procedural WebGL with no media files. Consider R2 only for large galleries or video.
