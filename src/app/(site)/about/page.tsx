import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resolveContentImage, resolveHeroImage } from "@/lib/hero-fallbacks";
import { buildPageMetadata } from "@/lib/seo";
import {
  linesFromTextarea,
  resolveWpImage,
} from "@/lib/wordpress/content";
import { getAboutPage } from "@/lib/wordpress/queries";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPage();
  const fields = data.page?.aboutFields;
  const title = fields?.seoTitle?.trim() || data.page?.title || "About Me";
  const description =
    fields?.seoDescription?.trim() ||
    fields?.heroDescription?.trim() ||
    undefined;
  const image = resolveHeroImage(
    resolveWpImage(fields?.heroImage, title),
    "about",
  );

  return buildPageMetadata({
    title,
    description,
    path: "/about",
    image: image.src,
    absoluteTitle: true,
  });
}

export default async function AboutPage() {
  const data = await getAboutPage();
  const page = data.page;
  const fields = page?.aboutFields;

  if (!page) {
    notFound();
  }

  const heroTitle = fields?.heroTitle?.trim() || page.title;
  const lifestyleImage = resolveContentImage(
    resolveWpImage(fields?.lifestyleImage, fields?.approachTitle ?? heroTitle),
    "aboutLifestyle",
  );
  const qualifications = linesFromTextarea(fields?.qualifications);

  return (
    <>
      <PageHero
        eyebrow={fields?.heroEyebrow}
        title={heroTitle}
        description={fields?.heroDescription}
        image={resolveHeroImage(
          resolveWpImage(fields?.heroImage, heroTitle),
          "about",
        )}
        displayTitle
      />

      {(fields?.biographyTitle || fields?.biographyContent) && (
        <section className="py-14 sm:py-20">
          <Container width="narrow">
            {fields?.biographyTitle ? (
              <SectionHeading as="h2" title={fields.biographyTitle} />
            ) : null}
            {fields?.biographyContent ? (
              <div
                className="mt-6 space-y-4 text-base leading-relaxed text-muted [&_p]:mb-4 [&_strong]:text-foreground"
                dangerouslySetInnerHTML={{ __html: fields.biographyContent }}
              />
            ) : null}
          </Container>
        </section>
      )}

      {(fields?.philosophyTitle || fields?.philosophyContent) && (
        <section className="border-y border-border bg-dark-band py-14 text-white sm:py-20">
          <Container width="narrow" className="text-center">
            {fields?.philosophyTitle ? (
              <h2 className="text-2xl font-medium sm:text-3xl">
                {fields.philosophyTitle}
              </h2>
            ) : null}
            {fields?.philosophyContent ? (
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                {fields.philosophyContent}
              </p>
            ) : null}
          </Container>
        </section>
      )}

      {qualifications.length > 0 ? (
        <section className="bg-geo-pattern py-14 sm:py-20">
          <Container>
            <h2 className="text-2xl font-medium text-foreground sm:text-3xl">
              Προσόντα
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {qualifications.map((item) => (
                <li
                  key={item}
                  className="border-t border-border pt-4 text-base leading-relaxed text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {(fields?.approachTitle || fields?.approachContent) && (
        <section className="py-14 sm:py-20">
          <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              {fields?.approachTitle ? (
                <SectionHeading as="h2" title={fields.approachTitle} />
              ) : null}
              {fields?.approachContent ? (
                <div
                  className="mt-6 space-y-4 text-base leading-relaxed text-muted [&_p]:mb-4 [&_strong]:text-foreground"
                  dangerouslySetInnerHTML={{ __html: fields.approachContent }}
                />
              ) : null}
            </div>
            <div className="relative min-h-[320px] overflow-hidden bg-surface-muted sm:min-h-[420px]">
              <Image
                src={lifestyleImage.src}
                alt={lifestyleImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Container>
        </section>
      )}

      <CtaSection
        title={fields?.ctaTitle}
        description={fields?.ctaDescription}
        buttonLabel={fields?.ctaButtonLabel}
        buttonHref={fields?.ctaButtonUrl}
      />
    </>
  );
}
