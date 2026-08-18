# Άρια Τσιάκα — Headless WordPress Dietitian Site

Premium Greek nutritionist website for **Άρια Τσιάκα**.

## Architecture

```text
WordPress (CMS) → WPGraphQL → Next.js (frontend)
```

- **Visual reference:** [klifes.gr](https://klifes.gr/) (look & feel only — not the brand)
- **Scope:** services + campaigns + contact — **no e-commerce**
- Details: [`docs/architecture.md`](./docs/architecture.md)

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- WordPress + ACF + WPGraphQL (Phase 2+)

## Local development (frontend)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Local WordPress (CMS)

```bash
docker compose up -d
```

- WordPress: http://localhost:8080  
- GraphQL: http://localhost:8080/graphql  

Full checklist: [`docs/wordpress-setup.md`](./docs/wordpress-setup.md)

## Environment variables

Copy `.env.example` → `.env.local` when connecting WordPress (Phase 3).

## Current status

**Phase 4 — Services live**

- WP CPT `service` + ACF `serviceDetails` via mu-plugin
- Frontend: `/services`, `/services/[slug]`
- Next: Phase 5 homepage CMS sections (or edit sample services in WP Admin)

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `docker compose up -d` | Start local WordPress |
| `docker compose down` | Stop WordPress |
