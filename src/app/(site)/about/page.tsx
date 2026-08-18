import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
  const image = resolveWpImage(fields?.heroImage, title);

  return buildPageMetadata({
    title,
    description,
    path: "/about",
    image: image?.src,
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
  const heroImage = resolveWpImage(fields?.heroImage, heroTitle);
  const lifestyleImage = resolveWpImage(
    fields?.lifestyleImage,
    fields?.approachTitle ?? heroTitle,
  );
  const qualifications = linesFromTextarea(fields?.qualifications);

  return (
    <>
      <section className="relative isolate min-h-[56vh] overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#a8897a] via-[#7d5f55] to-[#4a3630]"
        />
        {heroImage ? (
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            className="object-cover opacity-45"
            sizes="100vw"
          />
        ) : null}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/20"
        />
        <Container className="relative flex min-h-[56vh] items-end py-14 sm:items-center sm:py-20">
          <div className="max-w-2xl text-white">
            {fields?.heroEyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
                {fields.heroEyebrow}
              </p>
            ) : null}
            <h1 className="mt-3 font-display text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl">
              {heroTitle}
            </h1>
            {fields?.heroDescription ? (
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
                {fields.heroDescription}
              </p>
            ) : null}
          </div>
        </Container>
      </section>

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
        <section className="border-y border-border bg-[#5c4a42] py-14 text-white sm:py-20">
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

      {(fields?.approachTitle || fields?.approachContent || lifestyleImage) && (
        <section className="py-14 sm:py-20">
          <Container
            className={`grid gap-10 ${lifestyleImage ? "lg:grid-cols-2 lg:items-center" : ""}`}
          >
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
            {lifestyleImage ? (
              <div className="relative min-h-[320px] overflow-hidden bg-surface-muted sm:min-h-[420px]">
                <Image
                  src={lifestyleImage.src}
                  alt={lifestyleImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="flex min-h-[280px] items-center justify-center bg-gradient-to-br from-[#e8d8cf] via-[#d7c0b4] to-[#b99a8b] p-8 text-center">
                <p className="text-sm uppercase tracking-[0.2em] text-accent">
                  Lifestyle photo placeholder
                </p>
              </div>
            )}
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
