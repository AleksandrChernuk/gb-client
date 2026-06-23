# GreenBus Client Agent Notes

Use `AGENTS.md` as the source of truth for this project. Key SEO decisions to preserve:

- Sitemap city/country URLs must include the full public backend country/city directory across `uk`, `ru`, and `en`.
- Do not filter sitemap city/country URLs down to route endpoints only.
- Keep country/city URL validation to prevent duplicate city pages under the wrong country.
- Keep real backend city pages indexable on their canonical country/city URLs; avoid route-only `noindex` gates.
- Keep blog E-E-A-T editorial fallback for legacy articles without CMS authors.
- Keep `src/app/manifest.ts` and existing root `public/icon-*.png` assets; do not use `public/manifest.ts`.
- Keep `getAllFavoriteRoutes()` cache-safe pagination unless backend route payloads are made smaller.
