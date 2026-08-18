import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ServiceFaq } from "@/components/service/ServiceFaq";
import { resolveContentImage, resolveHeroImage } from "@/lib/hero-fallbacks";
import { buildPageMetadata } from "@/lib/seo";
import {
  faqFromTextarea,
  linesFromTextarea,
  resolveWpImage,
} from "@/lib/wordpress/content";
import { getServiceBySlug, getServices } from "@/lib/wordpress/queries";

type ServicePageProps = PageProps<"/services/[slug]">;

export async function generateStaticParams() {
  const data = await getServices();
  return data.services.nodes.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getServiceBySlug(slug);
  const service = data.service;

  if (!service) {
    return { title: "Υπηρεσία" };
  }

  const details = service.serviceDetails;
  const title = details?.seoTitle?.trim() || service.title;
  const description =
    details?.seoDescription?.trim() ||
    details?.shortDescription?.trim() ||
    details?.heroDescription?.trim() ||
    undefined;
  const image = resolveHeroImage(
    resolveWpImage(details?.heroImage, service.title),
    "service",
  );

  return buildPageMetadata({
    title,
    description,
    path: `/services/${slug}`,
    image: image.src,
    absoluteTitle: true,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const data = await getServiceBySlug(slug);
  const service = data.service;

  if (!service) {
    notFound();
  }

  const details = service.serviceDetails;
  const secondaryImage = resolveContentImage(
    resolveWpImage(details?.secondaryImage, service.title),
    "serviceSecondary",
  );
  const benefits = linesFromTextarea(details?.benefits);
  const process = linesFromTextarea(details?.process);
  const faq = faqFromTextarea(details?.faq);
  const heroTitle = details?.heroTitle?.trim() || service.title;
  const ctaHref = details?.ctaButtonUrl?.trim() || "/contact";
  const ctaLabel = details?.ctaButtonLabel?.trim() || "Κλείστε Ραντεβού";
  const hasBody = Boolean(details?.bodyContent?.trim());

  return (
    <>
      <PageHero
        eyebrow="Υπηρεσία"
        title={heroTitle}
        description={details?.heroDescription}
        image={resolveHeroImage(
          resolveWpImage(details?.heroImage, service.title),
          "service",
        )}
      />

      {details?.introduction ? (
        <section className="py-14 sm:py-16">
          <Container width="narrow">
            <div
              className="space-y-4 text-base leading-relaxed text-muted [&_p]:mb-4 [&_strong]:text-foreground"
              dangerouslySetInnerHTML={{ __html: details.introduction }}
            />
          </Container>
        </section>
      ) : null}

      {benefits.length > 0 ? (
        <section className="border-y border-border bg-geo-pattern py-14 sm:py-16">
          <Container>
            <h2 className="text-2xl font-medium text-foreground sm:text-3xl">Οφέλη</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((item) => (
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

      <section className="py-14 sm:py-16">
        <Container
          className={`grid gap-10 lg:items-center ${hasBody ? "lg:grid-cols-2" : ""}`}
        >
          {hasBody ? (
            <div
              className="space-y-4 text-base leading-relaxed text-muted [&_p]:mb-4 [&_strong]:text-foreground"
              dangerouslySetInnerHTML={{ __html: details?.bodyContent ?? "" }}
            />
          ) : null}
          <div
            className={`relative min-h-[280px] overflow-hidden bg-surface-muted sm:min-h-[360px] ${
              hasBody ? "" : "lg:col-span-1 mx-auto w-full max-w-3xl"
            }`}
          >
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Container>
      </section>

      {process.length > 0 ? (
        <section className="border-y border-border py-14 sm:py-16">
          <Container>
            <h2 className="text-2xl font-medium text-foreground sm:text-3xl">Πώς δουλεύουμε</h2>
            <ol className="mt-8 space-y-5">
              {process.map((step, index) => (
                <li key={step} className="flex gap-4 text-base leading-relaxed text-muted">
                  <span className="font-display text-2xl text-accent">{index + 1}</span>
                  <span className="pt-1 text-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      ) : null}

      {faq.length > 0 ? (
        <section className="py-14 sm:py-16">
          <Container width="narrow">
            <h2 className="mb-6 text-2xl font-medium text-foreground sm:text-3xl">FAQ</h2>
            <ServiceFaq items={faq} />
          </Container>
        </section>
      ) : null}

      <section className="bg-dark-band py-14 text-white sm:py-16">
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-medium sm:text-3xl">
              {details?.ctaTitle?.trim() || "Κλείστε Ραντεβού"}
            </h2>
            {details?.ctaDescription ? (
              <p className="mt-3 text-white/75">{details.ctaDescription}</p>
            ) : null}
          </div>
          <Button href={ctaHref} variant="onDark" size="lg">
            {ctaLabel}
          </Button>
        </Container>
      </section>
    </>
  );
}
