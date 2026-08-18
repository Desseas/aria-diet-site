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

export type HomeFields = {
  heroEyebrow: string | null;
  heroTitle: string | null;
  heroDescription: string | null;
  heroPrimaryLabel: string | null;
  heroPrimaryUrl: string | null;
  heroSecondaryLabel: string | null;
  heroSecondaryUrl: string | null;
  heroImage: WpMediaEdge;
  aboutEyebrow: string | null;
  aboutTitle: string | null;
  aboutText: string | null;
  aboutImage: WpMediaEdge;
  aboutButtonLabel: string | null;
  aboutButtonUrl: string | null;
  servicesEyebrow: string | null;
  servicesTitle: string | null;
  servicesIntro: string | null;
  approachTitle: string | null;
  approachContent: string | null;
  approachImage: WpMediaEdge;
  philosophyTitle: string | null;
  philosophyContent: string | null;
  philosophyImage: WpMediaEdge;
  philosophyCtaLabel: string | null;
  philosophyCtaUrl: string | null;
  quoteText: string | null;
  faq: string | null;
  ctaTitle: string | null;
  ctaDescription: string | null;
  ctaButtonLabel: string | null;
  ctaButtonUrl: string | null;
  instagramTitle: string | null;
  instagramText: string | null;
  instagramButtonLabel: string | null;
  instagramUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type GetHomePageResult = {
  page: {
    title: string;
    homeFields: HomeFields | null;
  } | null;
};

export type AboutFields = {
  heroEyebrow: string | null;
  heroTitle: string | null;
  heroDescription: string | null;
  heroImage: WpMediaEdge;
  biographyTitle: string | null;
  biographyContent: string | null;
  philosophyTitle: string | null;
  philosophyContent: string | null;
  qualifications: string | null;
  approachTitle: string | null;
  approachContent: string | null;
  lifestyleImage: WpMediaEdge;
  ctaTitle: string | null;
  ctaDescription: string | null;
  ctaButtonLabel: string | null;
  ctaButtonUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type GetAboutPageResult = {
  page: {
    title: string;
    aboutFields: AboutFields | null;
  } | null;
};

export type ContactFields = {
  introTitle: string | null;
  introText: string | null;
  phone: string | null;
  email: string | null;
  officeAddress: string | null;
  openingHours: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  whatsappUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type GetContactPageResult = {
  page: {
    title: string;
    contactFields: ContactFields | null;
  } | null;
};

/** Shared contact details for header/footer */
export type SiteContact = {
  phone: string;
  email: string;
  address: string;
  instagramUrl: string;
  facebookUrl: string;
  whatsappUrl: string;
};
