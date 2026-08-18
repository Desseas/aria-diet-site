import type { Metadata } from "next";

const DEFAULT_SITE_URL = "http://localhost:3000";
const SITE_NAME = "Άρια Τσιάκα";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized === "/" ? "" : normalized}` || getSiteUrl();
}

type PageMetadataInput = {
  title: string;
  description?: string | null;
  path: string;
  image?: string | null;
  /** Use full title without site template suffix */
  absoluteTitle?: boolean;
};

/**
 * Shared metadata builder: canonical + Open Graph + Twitter.
 * SEO fields from WordPress win; callers supply title/description fallbacks.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const desc = description?.trim() || undefined;
  const url = absoluteUrl(path);
  const ogImages = image ? [{ url: image }] : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: desc,
      url,
      type: "website",
      locale: "el_GR",
      siteName: SITE_NAME,
      images: ogImages,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description: desc,
      images: image ? [image] : undefined,
    },
  };
}
