import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CampaignChrome } from "@/components/campaign/CampaignChrome";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { resolveContentImage, resolveHeroImage } from "@/lib/hero-fallbacks";
import { buildPageMetadata } from "@/lib/seo";
import { resolveWpImage } from "@/lib/wordpress/content";
import { getCampaignBySlug, getCampaigns } from "@/lib/wordpress/queries";

type CampaignPageProps = PageProps<"/campaigns/[slug]">;

export async function generateStaticParams() {
  const data = await getCampaigns();
  return data.campaigns.nodes.map((campaign) => ({ slug: campaign.slug }));
}

export async function generateMetadata({
  params,
}: CampaignPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCampaignBySlug(slug);
  const campaign = data.campaign;

  if (!campaign) {
    return { title: "Campaign" };
  }

  const details = campaign.campaignDetails;
  const title = details?.seoTitle?.trim() || campaign.title;
  const description =
    details?.seoDescription?.trim() ||
    details?.heroDescription?.trim() ||
    undefined;
  const image = resolveHeroImage(
    resolveWpImage(details?.heroImage, campaign.title),
    "campaign",
  );

  return buildPageMetadata({
    title,
    description,
    path: `/campaigns/${slug}`,
    image: image.src,
    absoluteTitle: true,
  });
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { slug } = await params;
  const data = await getCampaignBySlug(slug);
  const campaign = data.campaign;

  if (!campaign) {
    notFound();
  }

  const details = campaign.campaignDetails;
  const heroTitle = details?.heroTitle?.trim() || campaign.title;
  const secondaryImage = resolveContentImage(
    resolveWpImage(details?.secondaryImage, heroTitle),
    "campaignSecondary",
  );
  const ctaHref = details?.ctaButtonUrl?.trim() || "/contact";
  const ctaLabel = details?.ctaButtonLabel?.trim() || "Επικοινωνία";
  const hasBody = Boolean(details?.bodyContent?.trim());

  return (
    <CampaignChrome ctaHref={ctaHref} ctaLabel={ctaLabel}>
      <PageHero
        eyebrow={details?.eyebrow}
        title={heroTitle}
        description={details?.heroDescription}
        image={resolveHeroImage(
          resolveWpImage(details?.heroImage, heroTitle),
          "campaign",
        )}
        primaryLabel={ctaLabel}
        primaryHref={ctaHref}
      />

      {details?.introduction ? (
        <section className="py-12 sm:py-14">
          <Container width="narrow">
            <div
              className="space-y-4 text-base leading-relaxed text-muted [&_p]:mb-4 [&_strong]:text-foreground"
              dangerouslySetInnerHTML={{ __html: details.introduction }}
            />
          </Container>
        </section>
      ) : null}

      <section className="border-y border-border bg-geo-pattern py-12 sm:py-14">
        <Container
          width="narrow"
          className={`grid gap-8 ${hasBody ? "sm:gap-10" : ""}`}
        >
          {hasBody ? (
            <div
              className="space-y-4 text-base leading-relaxed text-muted [&_p]:mb-4 [&_strong]:text-foreground"
              dangerouslySetInnerHTML={{ __html: details?.bodyContent ?? "" }}
            />
          ) : null}
          <div className="relative min-h-[240px] overflow-hidden bg-surface-muted sm:min-h-[320px]">
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
        </Container>
      </section>

      <section className="bg-dark-band py-14 text-white sm:py-16">
        <Container width="narrow" className="text-center">
          <h2 className="text-2xl font-medium sm:text-3xl">
            {details?.ctaTitle?.trim() || "Κλείστε Ραντεβού"}
          </h2>
          {details?.ctaText ? (
            <p className="mx-auto mt-4 max-w-xl text-white/80">{details.ctaText}</p>
          ) : null}
          <div className="mt-8">
            <Button href={ctaHref} variant="onDark" size="lg">
              {ctaLabel}
            </Button>
          </div>
        </Container>
      </section>
    </CampaignChrome>
  );
}
