# GreenBus Client Agent Notes

Use `AGENTS.md` as the source of truth for this project. Key SEO decisions to preserve:

- Sitemap city/country URLs must come from endpoint cities of indexed favorite routes only.
- Do not add all backend locations or `getFavoriteLocations()` back into `src/app/sitemap.ts`.
- Keep country/city URL validation to prevent duplicate city pages under the wrong country.
- Keep thin city `noindex, follow` gating for pages without route links and with fewer than 500 localized description words.
- Keep blog E-E-A-T editorial fallback for legacy articles without CMS authors.
- Keep `src/app/manifest.ts` and existing root `public/icon-*.png` assets; do not use `public/manifest.ts`.
- Keep `getAllFavoriteRoutes()` cache-safe pagination unless backend route payloads are made smaller.
