# greenbus-client — Agent Instructions

## Project

This is the GreenBus client website/app.

Tech stack:
- Next.js app with TypeScript
- React
- next-intl for locales
- Tailwind CSS
- Radix UI components
- TanStack Query
- Zustand
- Jest tests
- shadcn/ui-style component setup via `components.json`

Main project path:

`/Users/aleksandrcernuk/Desktop/gb-client`

## How To Work

- Use this folder as the working directory for GreenBus client tasks.
- Read `package.json`, `next.config.ts`, `components.json`, and relevant files under `src/` before editing.
- Keep changes focused. Do not refactor unrelated code.
- Do not touch `.env` unless the user explicitly asks.
- Never print, store, or commit secrets from `.env`.

## Package Manager

- This repo currently has `package-lock.json`, so use `npm` for existing commands.
- Do not switch to `pnpm`, yarn, or another package manager unless the user asks.
- Ask before adding new production dependencies.

## Skills And shadcn/ui

- For shadcn/ui work, use the existing `components.json` configuration.
- The shadcn/ui aliases are configured to place UI under `@/shared/ui`.
- If project skills need to be installed for shadcn/ui, use:

```bash
npx skills add shadcn/ui
```

- Do not run skill or component installation commands without checking the existing project structure first.
- Ask before installing anything that adds or changes production dependencies.

## Commands

Use these from the project root:

```bash
npm run dev
npm test
npm run build
```

After changing JavaScript or TypeScript files, run:

```bash
npm test
```

For bigger app changes, also run:

```bash
npm run build
```

## Structure

- `src/app` — Next.js routes and layouts
- `src/views` — page-level views/sections
- `src/features` — user-facing features and forms
- `src/entities` — business/domain UI pieces
- `src/shared` — shared API, UI, hooks, store, config, types, utils
- `src/assets` — icons, images, visual assets
- `messages` — translations/localized text

Prefer existing structure:
- reusable UI goes in `src/shared/ui`
- route/search/payment/profile logic stays near the existing feature folder
- page sections stay in `src/views`
- shared API helpers stay in `src/shared/api`

## UI Rules

- Match the existing GreenBus visual style.
- Use existing components before creating new ones.
- Keep responsive behavior clean on mobile and desktop.
- Do not add marketing-style decorative layouts unless requested.
- For icons, prefer existing project icons or `lucide-react` if appropriate.
- Avoid layout shifts and text overflow.

## i18n

- Keep locale-aware routes under `src/app/[lng]`.
- Use existing `next-intl` patterns.
- When adding visible text, update the relevant translation messages.
- Do not hardcode user-facing text in only one language unless the surrounding file already does that.

## SEO

- For GreenBus SEO tasks, use the global Codex skill `greenbus-seo`.
- SEO tasks include перелинковка/internal linking, technical SEO, Google Search Console, PageSpeed, sitemap, robots, schema, hreflang, metadata, canonical URLs, route pages, city/country pages, localized SEO, and indexation issues.
- Preserve trailing slash behavior from `next.config.ts`.
- Be careful with redirects, canonical URLs, metadata, and structured data.
- For SEO pages/routes, check localized URLs and metadata.
- Do not remove existing schema/metadata without a reason.

### SEO Decisions To Preserve

- Sitemap breadth: keep all public backend countries and cities in `src/app/sitemap.ts` across all locales. Do not filter city/country sitemap entries down to route endpoints only; GreenBus intentionally indexes the broader country/city directory alongside routes, FAQ, articles, authors, and static pages.
- City URLs must validate both `countrySlug` and `locationSlug`. If the city belongs to a different country, redirect to the canonical `/[lng]/all-countries/{real-country}/{city}/` URL instead of indexing duplicates.
- City pages: keep real backend city pages indexable when they have a canonical country/city URL. Do not add route-only `noindex` gates for cities without current route links; prevent duplicates via country/city canonical redirects instead.
- Blog E-E-A-T: legacy articles without CMS authors use the editorial GreenBus Person fallback in Article JSON-LD. Do not assign a human author unless CMS/backend data confirms authorship or review.
- PWA assets: keep the manifest in `src/app/manifest.ts` and use the existing root `public/icon-*.png` files. Do not reintroduce `public/manifest.ts` or references to missing `apple-touch-icon-*` files.
- Favorite routes pagination: `getAllFavoriteRoutes()` intentionally uses `perPage: 20` to keep each backend response under Next data cache limits while paging through all route pages. Do not “fix” it back to `100` unless backend payload size is reduced.
- Legacy redirects should point directly to localized trailing-slash destinations to avoid multi-hop chains.

## API And Data

- Reuse existing API clients and TanStack Query patterns.
- Handle loading, empty, and error states.
- Do not expose private backend URLs, tokens, payment keys, or auth details in client code.

## Git

- Do not commit unless the user asks.
- Do not revert user changes.
- Before editing, check the relevant file context.
