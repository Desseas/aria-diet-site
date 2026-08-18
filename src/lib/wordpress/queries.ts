import { fetchGraphQL } from "@/lib/wordpress/graphql";
import type {
  GetPagesResult,
  GetServiceBySlugResult,
  GetServicesResult,
  GetSiteSettingsResult,
} from "@/lib/wordpress/types";

/**
 * A GraphQL query asks the API for a specific shape of data.
 * Variables let you pass values like `{ slug: "about" }` without rewriting the query.
 *
 * In WPGraphQL, lists often come back as `nodes` — each item in the connection.
 * Custom post types appear after `show_in_graphql` + graphql single/plural names.
 * ACF fields appear under the field group name (here: `serviceDetails`) when Show in GraphQL is on.
 */
export const GET_SITE_SETTINGS = /* GraphQL */ `
  query GetSiteSettings {
    generalSettings {
      title
      description
      url
    }
  }
`;

export const GET_PAGES = /* GraphQL */ `
  query GetPages {
    pages {
      nodes {
        id
        title
        slug
      }
    }
  }
`;

const MEDIA_FIELDS = /* GraphQL */ `
  node {
    sourceUrl
    altText
    mediaDetails {
      width
      height
    }
  }
`;

export const GET_SERVICES = /* GraphQL */ `
  query GetServices {
    services(first: 50, where: { orderby: { field: DATE, order: ASC } }) {
      nodes {
        id
        databaseId
        title
        slug
        serviceDetails {
          shortDescription
          heroTitle
          heroImage {
            ${MEDIA_FIELDS}
          }
        }
      }
    }
  }
`;

export const GET_SERVICE_BY_SLUG = /* GraphQL */ `
  query GetServiceBySlug($slug: ID!) {
    service(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      slug
      serviceDetails {
        shortDescription
        heroTitle
        heroDescription
        heroImage {
          ${MEDIA_FIELDS}
        }
        introduction
        bodyContent
        secondaryImage {
          ${MEDIA_FIELDS}
        }
        benefits
        process
        faq
        ctaTitle
        ctaDescription
        ctaButtonLabel
        ctaButtonUrl
        seoTitle
        seoDescription
      }
    }
  }
`;

export function getSiteSettings() {
  return fetchGraphQL<GetSiteSettingsResult>(GET_SITE_SETTINGS, undefined, {
    tags: ["wordpress", "site-settings"],
  });
}

export function getPages() {
  return fetchGraphQL<GetPagesResult>(GET_PAGES, undefined, {
    tags: ["wordpress", "pages"],
  });
}

export function getServices() {
  return fetchGraphQL<GetServicesResult>(GET_SERVICES, undefined, {
    tags: ["wordpress", "services"],
  });
}

export function getServiceBySlug(slug: string) {
  return fetchGraphQL<GetServiceBySlugResult>(
    GET_SERVICE_BY_SLUG,
    { slug },
    {
      tags: ["wordpress", "services", `service:${slug}`],
    },
  );
}
