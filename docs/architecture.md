# Architecture — Άρια Τσιάκα Headless WordPress Site

## Brand & visual reference

- **Brand:** Άρια Τσιάκα
- **Visual look reference:** [klifes.gr](https://klifes.gr/) (colors, typography feel, soft feminine wellness aesthetic, split hero with photography) — look only, not brand/content
- **Layout inspiration (editorial sections):** Elegant Themes Nutritionist demo — composition only, do not copy assets/text/code
- **Functional scope:** Master prompt — headless WordPress + Next.js, **no e-commerce**

## System diagram

```text
WORDPRESS ADMIN          WPGRAPHQL           NEXT.JS (App Router)
(content only)    →      /graphql      →     fetch / cache / render / SEO
                                               ↓
                                         PUBLIC SITE
```

WordPress owns: text, images, services, campaigns, SEO fields, publish state.  
Next.js owns: layout, typography, spacing, components, routing, performance.

## Stack

| Layer | Choice |
| --- | --- |
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS 4 |
| CMS | WordPress (Docker for local) |
| Content fields | ACF (Pro may be needed for repeaters/options — decide in Phase 2/4) |
| API | WPGraphQL (+ ACF GraphQL integration after verifying current docs) |
| Forms | Next.js Route Handler (Phase 7) |
| Cache | Next.js fetch cache + later `/api/revalidate` webhook (Phase 10) |

## Routes (target)

| Path | Source |
| --- | --- |
| `/` | Homepage ACF/page fields + Services CPT |
| `/about` | About page fields |
| `/services` | Services listing |
| `/services/[slug]` | Service CPT |
| `/campaigns/[slug]` | Campaign CPT (Instagram landing pages) |
| `/contact` | Contact page + form API |

Primary nav (no products/cart): Αρχική · About Me · Διαιτολογικές Υπηρεσίες · Επικοινωνία

## Content types

### Service CPT

Informational dietitian services. Two initially; schema supports more.

### Campaign CPT

CMS-driven Instagram campaign landings with structured fields (hero, body, CTA, SEO). Not a page builder.

### Global settings

Prefer free approach first (dedicated Settings page or CPT). Use ACF Options only if Pro is already justified.

## Implementation phases

0. Inspect repo — done  
1. Frontend foundation — in progress  
2. WordPress environment (Docker, plugins, GraphiQL verify)  
3. Connect Next.js → simple GraphQL fetch  
4. Service CPT + `/services` routes  
5. Homepage sections  
6. About  
7. Contact + form  
8. Campaign CPT + `/campaigns/[slug]`  
9. SEO metadata  
10. Revalidation webhook  
11. Polish (a11y, CWV, 404/error)

## Critical rules

1. Never invent GraphQL field names — configure WP → inspect GraphiQL → then code queries.
2. No page builder in WordPress or Next.js.
3. No WooCommerce / cart / payments.
4. GraphQL calls server-side; secrets stay in env vars.
5. Greek UI content; English code identifiers.

## Local URLs (planned)

| Service | URL |
| --- | --- |
| Next.js | http://localhost:3000 |
| WordPress | http://localhost:8080 |
| WP Admin | http://localhost:8080/wp-admin |
| GraphQL | http://localhost:8080/graphql |

## Env vars (planned)

See `.env.example`.

## Design tokens (Phase 1)

Matched to [klifes.gr](https://klifes.gr/) live styles:

- Background white `#ffffff` + geometric blush pattern `#f4ece8`
- Nav taupe `#cbb9a8`
- Accent burgundy `#891405` (also Instagram pink `#e1306c` sparingly)
- Brand/logo color uses accent burgundy
- Body/headings: Manrope; brand wordmark: Cormorant Garamond

Homepage composition mirrors the visual reference (without shop):

1. Full-bleed hero with overlay copy
2. Split feature (services)
3. Split feature dark (about)
4. Quote band
5. Instagram CTA
6. Footer (brand / nav / contact)
