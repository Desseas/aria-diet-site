# CMS content guide

**PDF with real CMS screenshots:** [cms-guide/cms-content-guide.pdf](./cms-guide/cms-content-guide.pdf)

Edit everything in **WordPress Admin**. The public site (Next.js) updates after you click **Update / Publish**.

| Environment | Admin URL |
| --- | --- |
| Local | http://localhost:8080/wp-admin |
| Live | https://cms.ariatsiaka.gr/wp-admin |

---

## Quick map

| On the website | Edit in WordPress |
| --- | --- |
| `/` Homepage | **Pages → Home** (must be the Front Page) |
| `/about` | **Pages → About** (slug `about`) |
| `/contact` | **Pages → Contact** (slug `contact`) |
| `/services` list | **Services** menu (each card comes from a Service) |
| `/services/…` | **Services →** open that service |
| `/campaigns/…` | **Campaigns →** open that campaign |
| Brand colors | **Pages → Site Theme** |
| `/privacy` | **Pages → Πολιτική Απορρήτου** (slug `privacy`) |
| `/cookies` | **Pages → Πολιτική Cookies** (slug `cookies`) |
| Phone / email in header & footer | **Pages → Contact** → Phone / Email |

---

## 1. Homepage — `/`

**Path:** Pages → **Home**  
**Box on the edit screen:** *Homepage*

Also required once: **Settings → Reading → Your homepage displays → A static page → Homepage = Home**.

| Field group | What it controls |
| --- | --- |
| Hero * | Big banner: eyebrow, title, text, 2 buttons, image |
| About preview | Dark “Γνωρίστε με” section |
| Services section | Eyebrow / title / intro above the service cards |
| Approach | “Η προσέγγισή μου” text + image |
| Philosophy | Philosophy text + image + optional CTA |
| Quote | Quote band text |
| FAQ | Q&A accordion (see [FAQ format](#faq--lists-format)) |
| Final CTA | Bottom “ready for the next step?” block |
| Social | Shared title/text + button labels. URLs: fill on Home *or* leave empty / placeholder and they use **Contact** social URLs. Empty = button hidden. |
| SEO Title / Description | Browser tab & Google snippet |

\* If Hero Image is empty, the site shows a default food photo.

Service cards on the homepage come from **published Services**, not from the Home page.

---

## 2. About — `/about`

**Path:** Pages → **About** (permalink slug must stay `about`)  
**Box:** *About Page*

| Field | What it controls |
| --- | --- |
| Hero * | Banner eyebrow, title, description, image |
| Biography | “Η διαδρομή μου” title + rich text |
| Philosophy | Philosophy title + text |
| Qualifications | One line per item → bullet list |
| Approach | Approach title + rich text |
| Lifestyle Image | Photo in the about layout |
| CTA | Bottom call-to-action |
| SEO | Tab title & meta description |

---

## 3. Contact — `/contact`

**Path:** Pages → **Contact** (slug must stay `contact`)  
**Box:** *Contact Page*

| Field | What it controls |
| --- | --- |
| Intro Title / Text | Page heading + intro |
| Hero Image | Full-bleed banner (optional) |
| Phone | Contact page **and** header / footer |
| Email | Contact page **and** header / footer |
| Office Address | Address block (also footer city/line when set) |
| Opening Hours | One line per schedule entry |
| Instagram / Facebook / TikTok / WhatsApp URLs | Social / messaging links |
| SEO | Tab title & meta description |

Empty phone/email fall back to demo placeholders until you fill them.

WhatsApp example: `https://wa.me/30XXXXXXXXXX`

---

## 4. Services — `/services` and `/services/[slug]`

**Path:** left menu **Services** (heart icon)

| Action | Result on site |
| --- | --- |
| Add New Service | New card on `/` and `/services`, new URL `/services/your-slug` |
| Edit a service | Updates that service page + cards |
| Unpublish / trash | Disappears from the site |

**On every service, fill:**

| Field | Notes |
| --- | --- |
| Title | Service name (also used if Hero Title is empty) |
| Featured image | Card image (Media → Set featured image) |
| Short Description | Card / listing teaser |
| Hero Title / Description / Image | Top of the service page |
| Introduction | Short intro block |
| Main Content | Long body (can include images) |
| Secondary Image | Extra photo on the page |
| Benefits | One benefit per line |
| Process | One step per line |
| FAQ | See [FAQ format](#faq--lists-format) |
| CTA * | Title, text, button label, button URL (usually `/contact`) |
| SEO | Optional overrides |

\* Listing page title/hero copy on `/services` is fixed in the frontend for now. Cards and detail pages are fully CMS-driven.

**Slug tip:** keep the slug short and Greek-latin (e.g. `atomiki-diatrofiki-kathodigisi`). Changing the slug changes the public URL.

---

## 5. Campaigns — `/campaigns/[slug]`

**Path:** left menu **Campaigns** (megaphone icon)

Use for Instagram / ads landing pages (slim header, no main site nav clutter).

| Field | Notes |
| --- | --- |
| Title | Internal name in WP |
| Eyebrow | Small label above the headline |
| Hero Title / Description / Image | Landing hero |
| Introduction | Short intro |
| Main Content | Body copy |
| Secondary Image | Optional |
| CTA Title / Text / Button | Conversion block |
| CTA Button URL | Usually `/contact` — this is the link you share from Instagram |
| SEO | Optional |

Public URL: `/campaigns/` + slug (example: `/campaigns/summer-reset`).

---

## 6. Brand colors — Site Theme

**Path:** Pages → **Site Theme**  
**Box:** *Brand Colors*

| Picker | Affects |
| --- | --- |
| Accent | Buttons, links, brand wordmark |
| Nav bar | Main navigation background |
| Pattern / blush | Soft section backgrounds |
| Surface muted | Muted page bands |
| Dark band | Quote / dark sections / Instagram CTA |
| Body text | Default text color |

This page is **not** in the public menu. Hover / soft / border tones are derived automatically.

---

## 7. Privacy & Cookies — `/privacy` · `/cookies`

**Path:** Pages → **Πολιτική Απορρήτου** (slug `privacy`) or **Πολιτική Cookies** (slug `cookies`)

Edit the normal WordPress page **title** and **body**. That HTML is what the public site shows. Optional: set a Featured Image for the banner.

Keep permalinks as `privacy` and `cookies`. Starter template text is seeded once — replace with lawyer-approved copy when ready.

---

## FAQ & lists format

**Lists** (Benefits, Process, Qualifications, Opening Hours):

```text
First item
Second item
Third item
```

**FAQ** (Homepage or Service):

```text
First question?
First answer in one or more lines.

Second question?
Second answer.
```

Blank line between Q&A pairs.

---

## Images

1. Prefer **JPG / WebP**, wide photos for heroes (~1600px+ wide).
2. Upload via the field’s **Add Image**, or **Media → Library**.
3. Fill **Alt text** for accessibility / SEO.
4. Empty hero → site uses a curated fallback photo (still looks fine).

---

## Publish checklist

1. Edit the right item (table at the top).
2. Fill fields → **Update** or **Publish**.
3. Open the matching URL on the public site and hard-refresh if needed.
4. Keep page slugs stable: Home (front page), `about`, `contact`, `privacy`, `cookies`.
5. Do **not** delete **Site Theme**.

---

## Not editable in the CMS (yet)

These live in the Next.js code — ask a developer to change them:

- Main menu labels / order (`Αρχική`, `About me`, …)
- Brand name string in the header logo
- Hardcoded hero title on the `/services` listing page

---

## Need help?

| Symptom | Likely fix |
| --- | --- |
| Homepage fields missing | Set Home as **Front page** under Settings → Reading |
| About / Contact fields missing | Confirm pages exist with slugs `about` / `contact`; tell developer if ACF box still missing |
| Change not on the site | Confirm **Published**, wait a few seconds, hard-refresh; check revalidation is configured on live |
| Wrong phone in header | Edit **Pages → Contact → Phone** |
