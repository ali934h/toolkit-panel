# ToolKit Panel

A password-protected admin panel built with React + Vite + Tailwind CSS, deployed on Cloudflare Pages.

## Features

- Secret login path (configured via Cloudflare Pages environment variables)
- Password authentication (configured via Cloudflare Pages environment variables)
- Multi-tab dashboard with independent routes
- **Case Randomizer** tab: randomly capitalizes letters in a domain or word

## Cloudflare Pages Environment Variables

Set these in your Cloudflare Pages project under **Settings > Environment variables**:

| Variable | Description | Example |
|---|---|---|
| `ADMIN_PASSWORD` | The password to access the panel | `my-secret-password` |
| `LOGIN_PATH` | The secret URL path for the login page | `my-secret-path` |

## Routes

| Path | Description |
|---|---|
| `/<LOGIN_PATH>` | Secret login page |
| `/dashboard` | Main dashboard (redirects to first tab) |
| `/dashboard/case-randomizer` | Case Randomizer tool |
| `*` | 404 Not Found |

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- React Router DOM 6
- Cloudflare Pages Functions (for auth)

## Local Development

```bash
npm install
npm run dev
```

> Note: Auth endpoints require Cloudflare Pages Functions runtime. For local testing, use [Wrangler](https://developers.cloudflare.com/workers/wrangler/).
