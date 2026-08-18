import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

type RevalidateBody = {
  secret?: string;
  /** Explicit Next.js cache tags */
  tags?: string[];
  /** Explicit paths e.g. /services/foo */
  paths?: string[];
  /** WordPress post type from the webhook */
  postType?: string;
  /** WordPress post slug */
  slug?: string;
};

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

function resolveFromPostType(postType: string, slug?: string) {
  const tags = new Set<string>(["wordpress"]);
  const paths = new Set<string>();

  switch (postType) {
    case "service":
      tags.add("services");
      tags.add("home");
      paths.add("/services");
      paths.add("/");
      if (slug) {
        tags.add(`service:${slug}`);
        paths.add(`/services/${slug}`);
      }
      break;
    case "campaign":
      tags.add("campaigns");
      if (slug) {
        tags.add(`campaign:${slug}`);
        paths.add(`/campaigns/${slug}`);
      }
      break;
    case "page":
      tags.add("pages");
      if (slug === "home" || slug === "front-page" || !slug) {
        tags.add("home");
        paths.add("/");
      }
      if (slug === "about") {
        tags.add("about");
        paths.add("/about");
      }
      if (slug === "contact") {
        tags.add("contact");
        paths.add("/contact");
        // Header/footer live in the shared (site) layout — refresh it everywhere.
        paths.add("/");
        paths.add("/about");
        paths.add("/services");
        paths.add("/privacy");
        paths.add("/cookies");
      }
      if (slug === "privacy") {
        tags.add("legal");
        tags.add("page:privacy");
        paths.add("/privacy");
      }
      if (slug === "cookies") {
        tags.add("legal");
        tags.add("page:cookies");
        paths.add("/cookies");
      }
      if (slug === "site-theme") {
        tags.add("theme");
        // Theme CSS is injected in the root layout — refresh all routes.
        paths.add("/");
        paths.add("/about");
        paths.add("/services");
        paths.add("/contact");
        paths.add("/privacy");
        paths.add("/cookies");
      }
      // Unknown pages: refresh home + common pages safely
      if (
        slug &&
        ![
          "about",
          "contact",
          "home",
          "front-page",
          "site-theme",
          "privacy",
          "cookies",
        ].includes(slug)
      ) {
        tags.add("home");
        paths.add("/");
      }
      break;
    default:
      tags.add("home");
      tags.add("services");
      tags.add("campaigns");
      tags.add("about");
      tags.add("contact");
      paths.add("/");
      break;
  }

  return {
    tags: [...tags],
    paths: [...paths],
  };
}

/**
 * POST /api/revalidate
 *
 * Body (JSON):
 * { "secret": "...", "postType": "service", "slug": "my-service" }
 * or explicit { "secret": "...", "tags": ["services"], "paths": ["/services"] }
 *
 * Protect with REVALIDATION_SECRET. WordPress mu-plugin calls this on publish/update.
 */
export async function POST(request: Request) {
  const expected = process.env.REVALIDATION_SECRET?.trim();

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "REVALIDATION_SECRET is not configured" },
      { status: 503 },
    );
  }

  let body: RevalidateBody;

  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.secret || body.secret !== expected) {
    return unauthorized();
  }

  const fromType =
    body.postType != null
      ? resolveFromPostType(body.postType, body.slug)
      : { tags: [] as string[], paths: [] as string[] };

  const tags = [...new Set([...(body.tags ?? []), ...fromType.tags])];
  const paths = [...new Set([...(body.paths ?? []), ...fromType.paths])];

  if (tags.length === 0 && paths.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Provide postType/slug or tags/paths" },
      { status: 400 },
    );
  }

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  for (const path of paths) {
    if (
      (tags.includes("theme") || tags.includes("contact")) &&
      path === "/"
    ) {
      revalidatePath(path, "layout");
    } else {
      revalidatePath(path);
    }
  }

  return NextResponse.json({
    ok: true,
    revalidated: { tags, paths },
    now: Date.now(),
  });
}
