import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { linesFromTextarea } from "@/lib/wordpress/content";
import { getContactPage } from "@/lib/wordpress/queries";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPage();
  const fields = data.page?.contactFields;
  const title = fields?.seoTitle?.trim() || data.page?.title || "Επικοινωνία";
  const description = fields?.seoDescription?.trim() || undefined;

  return {
    title: { absolute: title },
    description,
  };
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

  const methods: ContactMethod[] = [];

  if (fields?.phone?.trim()) {
    methods.push({
      label: "Τηλέφωνο",
      value: fields.phone.trim(),
      href: `tel:${fields.phone.replace(/\s/g, "")}`,
    });
  }

  if (fields?.email?.trim()) {
    methods.push({
      label: "Email",
      value: fields.email.trim(),
      href: `mailto:${fields.email.trim()}`,
    });
  }

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
      <section className="border-b border-border bg-geo-pattern py-16 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Επικοινωνία"
            title={title}
            description={fields?.introText ?? undefined}
          />
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-xl font-medium text-foreground sm:text-2xl">
              Τρόποι επικοινωνίας
            </h2>

            {methods.length === 0 ? (
              <p className="mt-6 text-muted">
                Τα στοιχεία επικοινωνίας θα εμφανιστούν εδώ μόλις συμπληρωθούν στο WordPress
                (Σελίδες → Επικοινωνία).
              </p>
            ) : (
              <ul className="mt-8 divide-y divide-border border-y border-border">
                {methods.map((method) => (
                  <li key={method.label} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                      {method.label}
                    </span>
                    <a
                      href={method.href}
                      className="text-base text-foreground transition-colors hover:text-accent sm:text-right"
                      {...(method.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {method.value}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="space-y-8 rounded-none border border-border bg-surface p-6 sm:p-8">
            {fields?.officeAddress?.trim() ? (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Διεύθυνση
                </h2>
                <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-foreground">
                  {fields.officeAddress.trim()}
                </p>
              </div>
            ) : null}

            {hours.length > 0 ? (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Ώρες
                </h2>
                <ul className="mt-3 space-y-2 text-base leading-relaxed text-foreground">
                  {hours.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {!fields?.officeAddress?.trim() && hours.length === 0 ? (
              <p className="text-sm text-muted">
                Προσθέστε διεύθυνση και ωράριο από το WordPress όταν είναι έτοιμα.
              </p>
            ) : null}
          </aside>
        </Container>
      </section>
    </>
  );
}
