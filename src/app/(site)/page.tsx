import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CtaSection } from "@/components/sections/CtaSection";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeServices } from "@/components/sections/HomeServices";
import { InstagramCta } from "@/components/sections/InstagramCta";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { ServiceFaq } from "@/components/service/ServiceFaq";
import { resolveContentImage, resolveHeroImage } from "@/lib/hero-fallbacks";
import { buildPageMetadata } from "@/lib/seo";
import {
  faqFromTextarea,
  resolveWpImage,
} from "@/lib/wordpress/content";
import { getHomePage, getServices } from "@/lib/wordpress/queries";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePage();
  const fields = data.page?.homeFields;
  const title =
    fields?.seoTitle?.trim() || "Άρια Τσιάκα | Διαιτολόγος";
  const description =
    fields?.seoDescription?.trim() ||
    "Διατροφική καθοδήγηση με επίκεντρο την υγεία, την ισορροπία και την αυτοπεποίθηση.";
  const image = resolveHeroImage(
    resolveWpImage(fields?.heroImage, title),
    "home",
  );

  return buildPageMetadata({
    title,
    description,
    path: "/",
    image: image.src,
    absoluteTitle: true,
  });
}

export default async function HomePage() {
  const [home, servicesData] = await Promise.all([
    getHomePage(),
    getServices(),
  ]);

  const fields = home.page?.homeFields;
  const services = servicesData.services.nodes;
  const faq = faqFromTextarea(fields?.faq);

  const heroTitle =
    fields?.heroTitle?.trim() || "Η Υγιεινή Διατροφή όπως δεν την έχεις ξαναδεί!";

  return (
    <>
      <HomeHero
        eyebrow={fields?.heroEyebrow}
        title={heroTitle}
        description={fields?.heroDescription}
        primaryLabel={fields?.heroPrimaryLabel}
        primaryHref={fields?.heroPrimaryUrl}
        secondaryLabel={fields?.heroSecondaryLabel}
        secondaryHref={fields?.heroSecondaryUrl}
        image={resolveHeroImage(
          resolveWpImage(fields?.heroImage, heroTitle),
          "home",
        )}
      />

      {(fields?.aboutTitle || fields?.aboutText) && (
        <SplitFeature
          eyebrow={fields?.aboutEyebrow}
          title={fields?.aboutTitle?.trim() || "About me"}
          description={fields?.aboutText}
          ctaLabel={fields?.aboutButtonLabel}
          ctaHref={fields?.aboutButtonUrl}
          image={resolveContentImage(
            resolveWpImage(fields?.aboutImage, fields?.aboutTitle ?? "About"),
            "homeAbout",
          )}
          reverse
          dark
        />
      )}

      <HomeServices
        eyebrow={fields?.servicesEyebrow}
        title={fields?.servicesTitle}
        intro={fields?.servicesIntro}
        services={services}
      />

      {(fields?.approachTitle || fields?.approachContent) && (
        <SplitFeature
          title={fields?.approachTitle?.trim() || "Η προσέγγισή μου"}
          htmlContent={fields?.approachContent}
          image={resolveContentImage(
            resolveWpImage(
              fields?.approachImage,
              fields?.approachTitle ?? "Approach",
            ),
            "homeApproach",
          )}
        />
      )}

      {(fields?.philosophyTitle || fields?.philosophyContent) && (
        <SplitFeature
          title={fields?.philosophyTitle?.trim() || "Φιλοσοφία"}
          description={fields?.philosophyContent}
          ctaLabel={fields?.philosophyCtaLabel}
          ctaHref={fields?.philosophyCtaUrl}
          image={resolveContentImage(
            resolveWpImage(
              fields?.philosophyImage,
              fields?.philosophyTitle ?? "Philosophy",
            ),
            "homePhilosophy",
          )}
          reverse
        />
      )}

      <QuoteBand text={fields?.quoteText} />

      {faq.length > 0 ? (
        <section className="py-14 sm:py-16">
          <Container width="narrow">
            <h2 className="mb-6 text-2xl font-medium text-foreground sm:text-3xl">
              Συχνές ερωτήσεις
            </h2>
            <ServiceFaq items={faq} />
          </Container>
        </section>
      ) : null}

      <CtaSection
        title={fields?.ctaTitle}
        description={fields?.ctaDescription}
        buttonLabel={fields?.ctaButtonLabel}
        buttonHref={fields?.ctaButtonUrl}
      />

      <InstagramCta
        title={fields?.instagramTitle}
        text={fields?.instagramText}
        buttonLabel={fields?.instagramButtonLabel}
        href={fields?.instagramUrl}
      />
    </>
  );
}
