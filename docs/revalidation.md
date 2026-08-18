# Cache revalidation (WordPress → Next.js)

When an editor publishes or updates a **Service**, **Campaign**, or key **Page** in WordPress, the CMS notifies Next.js so cached pages refresh without waiting for the 60s ISR window.

## Flow

```text
WP Admin Save/Publish
        ↓
mu-plugin aria-revalidate.php
        ↓  POST JSON { secret, postType, slug }
Next.js  /api/revalidate
        ↓  revalidateTag + revalidatePath
Fresh GraphQL fetch on next visit
```

## Local setup

1. In `.env.local` (Next.js):

```env
REVALIDATION_SECRET=local-dev-revalidate-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

2. In `docker-compose.yml` the WordPress service already maps:

- `ARIA_REVALIDATE_URL=http://host.docker.internal:3000/api/revalidate`
- `ARIA_REVALIDATE_SECRET=${REVALIDATION_SECRET:-local-dev-revalidate-secret}`

3. Restart WordPress after changing secrets:

```bash
docker compose up -d
```

4. Keep `npm run dev` (or production Next) running so the webhook has a target.

## Manual test

With Next running:

```bash
curl -X POST http://localhost:3000/api/revalidate ^
  -H "Content-Type: application/json" ^
  -d "{\"secret\":\"local-dev-revalidate-secret\",\"postType\":\"service\",\"slug\":\"atomiki-diatrofiki-kathodigisi\"}"
```

Expected: `{ "ok": true, "revalidated": { ... } }`

Wrong secret → `401`. Missing `REVALIDATION_SECRET` in Next → `503`.

## Production

- Set the same strong secret on both sides (Vercel / host env + WordPress env or `wp-config.php`).
- Point `ARIA_REVALIDATE_URL` at `https://your-frontend.example/api/revalidate`.
- Never commit real secrets.
