import type { WpMediaEdge } from "@/lib/wordpress/types";

export type ResolvedImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export function resolveWpImage(
  edge: WpMediaEdge | undefined,
  fallbackAlt = "",
): ResolvedImage | null {
  const node = edge?.node;
  if (!node?.sourceUrl) return null;

  return {
    src: node.sourceUrl,
    alt: node.altText?.trim() || fallbackAlt,
    width: node.mediaDetails?.width ?? undefined,
    height: node.mediaDetails?.height ?? undefined,
  };
}

/** Split textarea lines into a clean list (ACF Free benefits/process). */
export function linesFromTextarea(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * Normalize a Contact social URL. Bare network roots (e.g. https://instagram.com/)
 * count as empty placeholders so the icon stays hidden.
 */
export function resolveSocialUrl(url?: string | null): string {
  const value = url?.trim() || "";
  if (!value || isBareSocialUrl(value)) {
    return "";
  }
  return value;
}

function isBareSocialUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
    const path = parsed.pathname.replace(/\/+$/, "");
    const socialHosts = ["instagram.com", "facebook.com", "fb.com", "tiktok.com"];
    if (!socialHosts.includes(host)) {
      return false;
    }
    return path === "" || path === "/";
  } catch {
    return false;
  }
}

/**
 * Parse FAQ textarea blocks:
 * Question?
 * Answer
 *
 * Next question?
 * Answer
 */
export function faqFromTextarea(
  value: string | null | undefined,
): Array<{ question: string; answer: string }> {
  if (!value?.trim()) return [];

  const blocks = value
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks
    .map((block) => {
      const [question, ...rest] = block.split(/\r?\n/);
      const answer = rest.join("\n").trim();
      if (!question?.trim() || !answer) return null;
      return { question: question.trim(), answer };
    })
    .filter((item): item is { question: string; answer: string } => item !== null);
}
