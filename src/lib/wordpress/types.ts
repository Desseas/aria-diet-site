export type GraphQLError = {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: Array<string | number>;
};

export type GraphQLResponse<T> = {
  data?: T;
  errors?: GraphQLError[];
};

export type FetchGraphQLOptions = {
  /** Next.js cache revalidation in seconds. Default: 60 */
  revalidate?: number | false;
  /** Cache tags for on-demand revalidation later */
  tags?: string[];
};

export type GeneralSettings = {
  title: string;
  description: string;
  url: string;
};

export type GetSiteSettingsResult = {
  generalSettings: GeneralSettings;
};

export type PageNode = {
  id: string;
  title: string;
  slug: string;
};

export type GetPagesResult = {
  pages: {
    nodes: PageNode[];
  };
};

export type WpMediaDetails = {
  width: number | null;
  height: number | null;
};

export type WpMediaNode = {
  sourceUrl: string;
  altText: string | null;
  mediaDetails: WpMediaDetails | null;
};

export type WpMediaEdge = {
  node: WpMediaNode | null;
} | null;

/** ACF field group `serviceDetails` — names verified against local GraphiQL schema */
export type ServiceDetails = {
  shortDescription: string | null;
  heroTitle: string | null;
  heroDescription: string | null;
  heroImage: WpMediaEdge;
  introduction: string | null;
  bodyContent: string | null;
  secondaryImage: WpMediaEdge;
  benefits: string | null;
  process: string | null;
  faq: string | null;
  ctaTitle: string | null;
  ctaDescription: string | null;
  ctaButtonLabel: string | null;
  ctaButtonUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type ServiceCard = {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  serviceDetails: Pick<
    ServiceDetails,
    "shortDescription" | "heroImage" | "heroTitle"
  > | null;
};

export type ServiceDetail = {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  serviceDetails: ServiceDetails | null;
};

export type GetServicesResult = {
  services: {
    nodes: ServiceCard[];
  };
};

export type GetServiceBySlugResult = {
  service: ServiceDetail | null;
};
