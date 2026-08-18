import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CampaignChrome } from "@/components/campaign/CampaignChrome";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
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
  const image = resolveWpImage(details?.heroImage, campaign.title);

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image.src }] : undefined,
    },
  };
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
  const heroImage = resolveWpImage(details?.heroImage, heroTitle);
  const secondaryImage = resolveWpImage(
    details?.secondaryImage,
    heroTitle,
  );
  const ctaHref = details?.ctaButtonUrl?.trim() || "/contact";
  const ctaLabel = details?.ctaButtonLabel?.trim() || "Επικοινωνία";

  return (
    <CampaignChrome ctaHref={ctaHref} ctaLabel={ctaLabel}>
      <section className="relative isolate overflow-hidden">
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
            className="object-cover opacity-40"
            sizes="100vw"
          />
        ) : null}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55"
        />
        <Container className="relative max-w-3xl py-16 text-white sm:py-20">
          {details?.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
              {details.eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {heroTitle}
          </h1>
          {details?.heroDescription ? (
            <p className="mt-5 text-base leading-relaxed text-white/92 sm:text-lg">
              {details.heroDescription}
            </p>
          ) : null}
          <div className="mt-8">
            <Button href={ctaHref} variant="onDark" size="lg">
              {ctaLabel}
            </Button>
          </div>
        </Container>
      </section>

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

      {(details?.bodyContent || secondaryImage) && (
        <section className="border-y border-border bg-geo-pattern py-12 sm:py-14">
          <Container
            width="narrow"
            className={`grid gap-8 ${secondaryImage ? "sm:gap-10" : ""}`}
          >
            {details?.bodyContent ? (
              <div
                className="space-y-4 text-base leading-relaxed text-muted [&_p]:mb-4 [&_strong]:text-foreground"
                dangerouslySetInnerHTML={{ __html: details.bodyContent }}
              />
            ) : null}
            {secondaryImage ? (
              <div className="relative min-h-[240px] overflow-hidden bg-surface-muted sm:min-h-[320px]">
                <Image
                  src={secondaryImage.src}
                  alt={secondaryImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 720px"
                />
              </div>
            ) : null}
          </Container>
        </section>
      )}

      <section className="bg-[#5c4a42] py-14 text-white sm:py-16">
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
