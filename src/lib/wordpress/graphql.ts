import type {
  FetchGraphQLOptions,
  GraphQLError,
  GraphQLResponse,
} from "@/lib/wordpress/types";

export class WordPressGraphQLError extends Error {
  constructor(
    message: string,
    readonly errors?: GraphQLError[],
  ) {
    super(message);
    this.name = "WordPressGraphQLError";
  }
}

function getEndpoint(): string {
  const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

  if (!endpoint) {
    throw new WordPressGraphQLError(
      "Missing WORDPRESS_GRAPHQL_ENDPOINT. Copy .env.example to .env.local and set the GraphQL URL.",
    );
  }

  return endpoint;
}

/**
 * Server-side GraphQL fetch against WordPress (WPGraphQL).
 * Do not call this from client components — keeps the CMS endpoint off the browser.
 *
 * Flow: WordPress content → WPGraphQL `/graphql` → this helper → Next.js Server Component
 */
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  options: FetchGraphQLOptions = {},
): Promise<T> {
  const endpoint = getEndpoint();
  const { revalidate = 60, tags = ["wordpress"] } = options;

  let response: Response;

  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      next: {
        revalidate: revalidate === false ? undefined : revalidate,
        tags,
      },
      ...(revalidate === false ? { cache: "no-store" as const } : {}),
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown network error";
    throw new WordPressGraphQLError(
      `Could not reach WordPress GraphQL at ${endpoint}. Is Docker running? (${detail})`,
    );
  }

  if (!response.ok) {
    throw new WordPressGraphQLError(
      `WordPress GraphQL HTTP ${response.status} ${response.statusText} from ${endpoint}`,
    );
  }

  const payload = (await response.json()) as GraphQLResponse<T>;

  if (payload.errors?.length) {
    throw new WordPressGraphQLError(
      payload.errors.map((error) => error.message).join("; "),
      payload.errors,
    );
  }

  if (!payload.data) {
    throw new WordPressGraphQLError("WordPress GraphQL returned no data.");
  }

  return payload.data;
}
