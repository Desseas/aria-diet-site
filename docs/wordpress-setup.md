# Local WordPress setup (Phase 2)

Local CMS for **Άρια Τσιάκα** headless site.

## Stack decision

**Docker Compose** (WordPress + MariaDB) — practical for Windows, isolated from Next.js, easy to reset.

## URLs

| Service | URL |
| --- | --- |
| WordPress site | http://localhost:8080 |
| WP Admin | http://localhost:8080/wp-admin |
| GraphQL endpoint | http://localhost:8080/graphql |
| GraphiQL IDE | WP Admin → GraphQL → GraphiQL IDE |

## Start / stop

From the repo root:

```bash
docker compose up -d
```

Stop:

```bash
docker compose down
```

Wipe DB + WP files (destructive):

```bash
docker compose down -v
```

## Required plugins (current official stack)

Verified against current WPGraphQL / ACF docs:

1. **WPGraphQL** — GraphQL API for WordPress  
   https://wordpress.org/plugins/wp-graphql/
2. **Advanced Custom Fields (ACF)** — Free is enough for Phase 2; Pro later if we need Repeaters / Options Pages  
   https://wordpress.org/plugins/advanced-custom-fields/
3. **WPGraphQL for ACF** — official free bridge (`wpgraphql-acf`)  
   https://wordpress.org/plugins/wpgraphql-acf/  
   Docs: https://acf.wpgraphql.com/

Install order: ACF → WPGraphQL → WPGraphQL for ACF.

## Manual WordPress Admin checklist

### 1. Install WordPress

1. Open http://localhost:8080
2. Choose language → Ελληνικά (or English — your choice for Admin UI)
3. Fill site title: `Άρια Τσιάκα`
4. Create admin username / password (save it somewhere safe)
5. Finish installation → log in to wp-admin

### 2. Permalinks (required for `/graphql`)

1. Open: **Ρυθμίσεις → Μόνιμοι σύνδεσμοι**  
   (Settings → Permalinks)
2. Select: **Όνομα άρθρου** (Post name)
3. Save

Without pretty permalinks, GraphQL routing can fail.

### 3. Install plugins

1. Open: **Πρόσθετα → Προσθήκη νέου** (Plugins → Add New)
2. Search / Install / Activate each:

| Search term | Plugin to install |
| --- | --- |
| `WPGraphQL` | **WPGraphQL** (by WPGraphQL) |
| `Advanced Custom Fields` | **Advanced Custom Fields** (by WP Engine) |
| `WPGraphQL for ACF` | **WPGraphQL for ACF** (by WPGraphQL) |

Confirm all three show as **Ενεργό** (Active).

### 4. Verify GraphQL endpoint

1. Open http://localhost:8080/graphql in the browser  
   You should get a GraphQL-related response (not a WordPress 404 page).
2. Open: **GraphQL → GraphiQL IDE**
3. Run:

```graphql
{
  generalSettings {
    title
    description
  }
}
```

Expected: JSON with `title` ≈ `Άρια Τσιάκα`.

4. Also try:

```graphql
{
  pages {
    nodes {
      id
      title
      slug
    }
  }
}
```

Empty `nodes` is fine if you have not created pages yet.

### 5. Confirm ACF bridge is loaded

In GraphiQL, open the **Docs** explorer and look for ACF-related types once field groups exist.  
For Phase 2, confirming WPGraphQL works is enough — we configure ACF field groups in Phase 4+.

## ACF Free vs Pro (decision for later)

| Need | Free ACF | ACF Pro |
| --- | --- | --- |
| Basic fields (text, image, WYSIWYG, URL) | Yes | Yes |
| Repeater (FAQ, benefits) | No | Yes |
| Options page (global site settings) | No | Yes |

**Recommendation:** start with **ACF Free**. When we hit FAQ/benefits repeaters or global settings, we either:
- buy ACF Pro (reasonable one-time/subscription for maintainability), or
- model FAQ as a separate CPT / JSON field alternative

Do **not** buy Divi/Elementor. ACF Pro is the only paid CMS add-on we might justify.

## Security note (local)

Docker credentials in `docker-compose.yml` are for **local only**. Never reuse them in production.

## Next phase

After you confirm GraphiQL returns `generalSettings.title`, tell me — Phase 3 connects Next.js with `WORDPRESS_GRAPHQL_ENDPOINT=http://localhost:8080/graphql`.
