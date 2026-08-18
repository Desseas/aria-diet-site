# Phase 4 — Service content model

## Why a mu-plugin?

Service CPT + ACF field definitions live in git under `wordpress/mu-plugins/`.

That avoids fragile “click the same Admin screens on every machine” drift.

## ACF Free tradeoff

Repeaters (FAQ / benefits / process) need **ACF Pro**.

For now we use **textarea fields** (one item per line / Q&A blocks). We can migrate to Repeaters later without changing the CPT.

## After `docker compose up -d`

1. Open WP Admin → you should see **Services** in the left menu.
2. Optional check: **ACF → Field Groups** — “Service Details” appears (PHP-registered; may show as sync/local).
3. Create **two** services:
   - **Services → Add New**
   - Fill Title + Short Description (+ optional hero fields)
   - Publish

Suggested starter titles:

- `Ατομική Διατροφική Καθοδήγηση`
- `Ομαδικά Προγράμματα / Workshops`

4. In GraphiQL run:

```graphql
{
  services {
    nodes {
      databaseId
      title
      slug
      serviceDetails {
        shortDescription
        heroTitle
      }
    }
  }
}
```

If `serviceDetails` is missing, tell me — field naming can differ by WPGraphQL for ACF version and we adjust after schema inspect.
