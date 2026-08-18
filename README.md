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

WordPress is **not** required for Phase 1.

## Environment variables

Copy `.env.example` → `.env.local` when connecting WordPress (Phase 3).

## Current status

**Phase 1 — Frontend foundation**

- Design tokens (inspired by Klifes visual language)
- Header / mobile menu / Footer branded for Άρια Τσιάκα
- UI primitives + homepage skeleton

Next: **Phase 2 — WordPress environment** (Docker + plugins + GraphQL verify).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
