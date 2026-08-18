import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { WordPressGraphQLError } from "@/lib/wordpress/graphql";
import { getPages, getSiteSettings } from "@/lib/wordpress/queries";
import type { GetPagesResult, GetSiteSettingsResult } from "@/lib/wordpress/types";

export const metadata: Metadata = {
  title: "WordPress connection test",
  robots: { index: false, follow: false },
};

export default async function WordPressDevPage() {
  let settings: GetSiteSettingsResult | null = null;
  let pages: GetPagesResult | null = null;
  let errorMessage: string | null = null;

  try {
    const result = await Promise.all([getSiteSettings(), getPages()]);
    settings = result[0];
    pages = result[1];
  } catch (error) {
    errorMessage =
      error instanceof WordPressGraphQLError
        ? error.message
        : error instanceof Error
          ? error.message
          : "Unknown error";
  }

  if (errorMessage || !settings || !pages) {
    return (
      <Container className="py-16">
        <h1 className="text-3xl font-medium text-foreground">Connection failed</h1>
        <p className="mt-4 max-w-2xl rounded-lg border border-accent/30 bg-accent-soft/40 p-4 text-sm text-foreground">
          {errorMessage ?? "No data returned from WordPress."}
        </p>
        <p className="mt-4 text-sm text-muted">
          Check Docker is running (`docker compose up -d`) and{" "}
          <code>.env.local</code> has{" "}
          <code>WORDPRESS_GRAPHQL_ENDPOINT=http://localhost:8080/graphql</code>.
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        Phase 3 · temporary
      </p>
      <h1 className="mt-3 text-3xl font-medium text-foreground">
        WordPress → GraphQL → Next.js
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        This page proves the frontend can read CMS data server-side. It is not part of the public
        site and can be removed after Phase 3.
      </p>

      <dl className="mt-10 space-y-4 border-t border-border pt-8">
        <div>
          <dt className="text-sm font-semibold text-foreground">Site title</dt>
          <dd className="mt-1 text-2xl text-accent">{settings.generalSettings.title}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-foreground">Description</dt>
          <dd className="mt-1 text-muted">
            {settings.generalSettings.description || "(empty)"}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-foreground">WordPress URL</dt>
          <dd className="mt-1 text-muted">{settings.generalSettings.url}</dd>
        </div>
      </dl>

      <div className="mt-10 border-t border-border pt-8">
        <h2 className="text-lg font-semibold text-foreground">Pages (nodes)</h2>
        <p className="mt-2 text-sm text-muted">
          In WPGraphQL, a connection list is usually exposed as <code>nodes</code>.
        </p>
        {pages.pages.nodes.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No pages yet.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {pages.pages.nodes.map((page) => (
              <li key={page.id} className="text-sm text-foreground">
                <span className="font-medium">{page.title}</span>
                <span className="text-muted"> · /{page.slug}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}
