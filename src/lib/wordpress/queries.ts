import { fetchGraphQL } from "@/lib/wordpress/graphql";
import { withContactPlaceholders } from "@/lib/contact-defaults";
import type {
  GetAboutPageResult,
  GetCampaignBySlugResult,
  GetCampaignsResult,
  GetContactPageResult,
  GetHomePageResult,
  GetLegalPageResult,
  GetPagesResult,
  GetServiceBySlugResult,
  GetServicesResult,
  GetSiteSettingsResult,
  GetSiteThemeResult,
  SiteContact,
} from "@/lib/wordpress/types";

/**
 * A GraphQL query asks the API for a specific shape of data.
 * Variables let you pass values like `{ slug: "about" }` without rewriting the query.
 *
 * In WPGraphQL, lists often come back as `nodes` — each item in the connection.
 * Custom post types appear after `show_in_graphql` + graphql single/plural names.
 * ACF fields appear under the field group name when Show in GraphQL is on.
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

export const GET_HOME_PAGE = /* GraphQL */ `
  query GetHomePage {
    page(id: "home", idType: URI) {
      title
      homeFields {
        heroEyebrow
        heroTitle
        heroDescription
        heroPrimaryLabel
        heroPrimaryUrl
        heroSecondaryLabel
        heroSecondaryUrl
        heroImage {
          ${MEDIA_FIELDS}
        }
        aboutEyebrow
        aboutTitle
        aboutText
        aboutImage {
          ${MEDIA_FIELDS}
        }
        aboutButtonLabel
        aboutButtonUrl
        servicesEyebrow
        servicesTitle
        servicesIntro
        approachTitle
        approachContent
        approachImage {
          ${MEDIA_FIELDS}
        }
        philosophyTitle
        philosophyContent
        philosophyImage {
          ${MEDIA_FIELDS}
        }
        philosophyCtaLabel
        philosophyCtaUrl
        quoteText
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

export const GET_ABOUT_PAGE = /* GraphQL */ `
  query GetAboutPage {
    page(id: "about", idType: URI) {
      title
      aboutFields {
        heroEyebrow
        heroTitle
        heroDescription
        heroImage {
          ${MEDIA_FIELDS}
        }
        biographyTitle
        biographyContent
        philosophyTitle
        philosophyContent
        qualifications
        approachTitle
        approachContent
        lifestyleImage {
          ${MEDIA_FIELDS}
        }
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

export const GET_CONTACT_PAGE = /* GraphQL */ `
  query GetContactPage {
    page(id: "contact", idType: URI) {
      title
      contactFields {
        introTitle
        introText
        heroImage {
          ${MEDIA_FIELDS}
        }
        phone
        email
        officeAddress
        openingHours
        instagramUrl
        facebookUrl
        tiktokUrl
        whatsappUrl
        seoTitle
        seoDescription
      }
    }
  }
`;

export const GET_SITE_THEME = /* GraphQL */ `
  query GetSiteTheme {
    page(id: "site-theme", idType: URI) {
      title
      themeFields {
        accent
        nav
        pattern
        surfaceMuted
        darkBand
        text
      }
    }
  }
`;

export const GET_LEGAL_PAGE = /* GraphQL */ `
  query GetLegalPage($uri: ID!) {
    page(id: $uri, idType: URI) {
      title
      slug
      content
      featuredImage {
        ${MEDIA_FIELDS}
      }
    }
  }
`;

export const GET_CAMPAIGNS = /* GraphQL */ `
  query GetCampaigns {
    campaigns(first: 100) {
      nodes {
        id
        title
        slug
      }
    }
  }
`;

export const GET_CAMPAIGN_BY_SLUG = /* GraphQL */ `
  query GetCampaignBySlug($slug: ID!) {
    campaign(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      slug
      campaignDetails {
        eyebrow
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
        ctaTitle
        ctaText
        ctaButtonLabel
        ctaButtonUrl
        seoTitle
        seoDescription
      }
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

export function getHomePage() {
  return fetchGraphQL<GetHomePageResult>(GET_HOME_PAGE, undefined, {
    tags: ["wordpress", "home"],
  });
}

export function getAboutPage() {
  return fetchGraphQL<GetAboutPageResult>(GET_ABOUT_PAGE, undefined, {
    tags: ["wordpress", "about"],
  });
}

export function getContactPage() {
  return fetchGraphQL<GetContactPageResult>(GET_CONTACT_PAGE, undefined, {
    tags: ["wordpress", "contact"],
  });
}

export function getSiteTheme() {
  return fetchGraphQL<GetSiteThemeResult>(GET_SITE_THEME, undefined, {
    tags: ["wordpress", "theme"],
  });
}

export function getLegalPage(slug: "privacy" | "cookies") {
  return fetchGraphQL<GetLegalPageResult>(
    GET_LEGAL_PAGE,
    { uri: slug },
    {
      tags: ["wordpress", "pages", `page:${slug}`, "legal"],
    },
  );
}

export async function getSiteContact(): Promise<SiteContact> {
  try {
    const data = await getContactPage();
    const fields = data.page?.contactFields;
    const filled = withContactPlaceholders({
      phone: fields?.phone,
      email: fields?.email,
      address: fields?.officeAddress,
    });
    return {
      phone: filled.phone,
      email: filled.email,
      address: filled.address,
      instagramUrl: fields?.instagramUrl?.trim() || "",
      facebookUrl: fields?.facebookUrl?.trim() || "",
      tiktokUrl: fields?.tiktokUrl?.trim() || "",
      whatsappUrl: fields?.whatsappUrl?.trim() || "",
    };
  } catch {
    const filled = withContactPlaceholders({});
    return {
      phone: filled.phone,
      email: filled.email,
      address: filled.address,
      instagramUrl: "",
      facebookUrl: "",
      tiktokUrl: "",
      whatsappUrl: "",
    };
  }
}

export function getCampaigns() {
  return fetchGraphQL<GetCampaignsResult>(GET_CAMPAIGNS, undefined, {
    tags: ["wordpress", "campaigns"],
  });
}

export function getCampaignBySlug(slug: string) {
  return fetchGraphQL<GetCampaignBySlugResult>(
    GET_CAMPAIGN_BY_SLUG,
    { slug },
    {
      tags: ["wordpress", "campaigns", `campaign:${slug}`],
    },
  );
}

export function getServices() {
  return fetchGraphQL<GetServicesResult>(GET_SERVICES, undefined, {
    // Always fresh — new Services must appear on /services without a redeploy.
    revalidate: false,
    tags: ["wordpress", "services"],
  });
}

/** Decode / trim WP slugs (handles %CE%xx Greek leftovers in the URL). */
export function normalizeServiceSlug(raw: string): string {
  let value = raw.trim();
  try {
    value = decodeURIComponent(value);
  } catch {
    // keep raw if malformed
  }
  return value.normalize("NFC");
}

/**
 * Resolve a service by slug.
 * Tries direct WPGraphQL SLUG lookup, then falls back to the services list
 * so newly published posts are not stuck behind a cached 404.
 */
export async function getServiceBySlug(
  rawSlug: string,
): Promise<GetServiceBySlugResult> {
  const slug = normalizeServiceSlug(rawSlug);

  const direct = await fetchGraphQL<GetServiceBySlugResult>(
    GET_SERVICE_BY_SLUG,
    { slug },
    {
      revalidate: false,
      tags: ["wordpress", "services", `service:${slug}`],
    },
  );

  if (direct.service) {
    return direct;
  }

  const list = await getServices();
  const match = list.services.nodes.find(
    (service) =>
      normalizeServiceSlug(service.slug) === slug ||
      service.slug === rawSlug.trim(),
  );

  if (!match) {
    return { service: null };
  }

  // List cards omit full fields — fetch again with the canonical WP slug.
  return fetchGraphQL<GetServiceBySlugResult>(
    GET_SERVICE_BY_SLUG,
    { slug: match.slug },
    {
      revalidate: false,
      tags: ["wordpress", "services", `service:${match.slug}`],
    },
  );
}
