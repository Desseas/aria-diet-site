import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import {
  CONTACT_PLACEHOLDERS,
  withContactPlaceholders,
} from "@/lib/contact-defaults";
import { resolveHeroImage } from "@/lib/hero-fallbacks";
import { buildPageMetadata } from "@/lib/seo";
import { linesFromTextarea, resolveWpImage } from "@/lib/wordpress/content";
import { getContactPage } from "@/lib/wordpress/queries";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPage();
  const fields = data.page?.contactFields;
  const title = fields?.seoTitle?.trim() || data.page?.title || "Επικοινωνία";
  const description =
    fields?.seoDescription?.trim() ||
    fields?.introText?.trim() ||
    undefined;
  const image = resolveHeroImage(
    resolveWpImage(fields?.heroImage, title),
    "contact",
  );

  return buildPageMetadata({
    title,
    description,
    path: "/contact",
    image: image.src,
    absoluteTitle: true,
  });
}

type ContactMethod = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

export default async function ContactPage() {
  const data = await getContactPage();
  const page = data.page;
  const fields = page?.contactFields;

  if (!page) {
    notFound();
  }

  const title = fields?.introTitle?.trim() || page.title;
  const hours = linesFromTextarea(fields?.openingHours);
  const displayHours =
    hours.length > 0 ? hours : [...CONTACT_PLACEHOLDERS.openingHours];
  const { phone, email, address } = withContactPlaceholders({
    phone: fields?.phone,
    email: fields?.email,
    address: fields?.officeAddress,
  });

  const methods: ContactMethod[] = [
    {
      label: "Τηλέφωνο",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
    },
    {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
  ];

  if (fields?.whatsappUrl?.trim()) {
    methods.push({
      label: "WhatsApp",
      value: "Στείλτε μήνυμα",
      href: fields.whatsappUrl.trim(),
      external: true,
    });
  }

  if (fields?.instagramUrl?.trim()) {
    methods.push({
      label: "Instagram",
      value: "Ακολουθήστε / μήνυμα",
      href: fields.instagramUrl.trim(),
      external: true,
    });
  }

  if (fields?.facebookUrl?.trim()) {
    methods.push({
      label: "Facebook",
      value: "Σελίδα / μήνυμα",
      href: fields.facebookUrl.trim(),
      external: true,
    });
  }

  return (
    <>
      <PageHero
        eyebrow="Επικοινωνία"
        title={title}
        description={fields?.introText}
        image={resolveHeroImage(
          resolveWpImage(fields?.heroImage, title),
          "contact",
        )}
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-xl font-medium text-foreground sm:text-2xl">
              Τρόποι επικοινωνίας
            </h2>

            <ul className="mt-8 divide-y divide-border border-y border-border">
              {methods.map((method) => (
                <li
                  key={method.label}
                  className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                    {method.label}
                  </span>
                  {method.external ? (
                    <a
                      href={method.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base text-foreground transition-colors hover:text-accent sm:text-right"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <a
                      href={method.href}
                      className="text-base text-foreground transition-colors hover:text-accent sm:text-right"
                    >
                      {method.value}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                Διεύθυνση
              </h2>
              <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-foreground">
                {address}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                Ώρες
              </h2>
              <ul className="mt-3 space-y-2 text-base text-foreground">
                {displayHours.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
