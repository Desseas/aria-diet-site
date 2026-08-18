import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { resolveHeroImage } from "@/lib/hero-fallbacks";
import { buildPageMetadata } from "@/lib/seo";
import { resolveWpImage } from "@/lib/wordpress/content";
import { getLegalPage } from "@/lib/wordpress/queries";

type LegalSlug = "privacy" | "cookies";

const LEGAL_META: Record<
  LegalSlug,
  { path: string; eyebrow: string; fallbackTitle: string; fallbackDescription: string }
> = {
  privacy: {
    path: "/privacy",
    eyebrow: "Νομικά",
    fallbackTitle: "Πολιτική Απορρήτου",
    fallbackDescription:
      "Πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα προσωπικά σας δεδομένα.",
  },
  cookies: {
    path: "/cookies",
    eyebrow: "Νομικά",
    fallbackTitle: "Πολιτική Cookies",
    fallbackDescription:
      "Πληροφορίες για τη χρήση cookies και παρόμοιων τεχνολογιών στον ιστότοπο.",
  },
};

export async function buildLegalMetadata(slug: LegalSlug): Promise<Metadata> {
  const meta = LEGAL_META[slug];
  const data = await getLegalPage(slug);
  const page = data.page;
  const title = page?.title?.trim() || meta.fallbackTitle;
  const description =
    page?.content
      ?.replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160) || meta.fallbackDescription;
  const image = resolveHeroImage(
    resolveWpImage(page?.featuredImage, title),
    "legal",
  );

  return buildPageMetadata({
    title,
    description,
    path: meta.path,
    image: image.src,
    absoluteTitle: true,
  });
}

export async function LegalDocumentPage({ slug }: { slug: LegalSlug }) {
  const meta = LEGAL_META[slug];
  const data = await getLegalPage(slug);
  const page = data.page;

  if (!page) {
    notFound();
  }

  const title = page.title?.trim() || meta.fallbackTitle;
  const content = page.content?.trim() || "";

  return (
    <>
      <PageHero
        eyebrow={meta.eyebrow}
        title={title}
        description={meta.fallbackDescription}
        image={resolveHeroImage(
          resolveWpImage(page.featuredImage, title),
          "legal",
        )}
        displayTitle
      />

      <section className="py-14 sm:py-20">
        <Container width="narrow">
          {content ? (
            <div
              className="space-y-4 text-base leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-foreground [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-foreground [&_li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-4 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <p className="text-muted">
              Το περιεχόμενο αυτής της σελίδας θα εμφανιστεί μόλις δημοσιευτεί στο
              WordPress (Σελίδες → {title}).
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
