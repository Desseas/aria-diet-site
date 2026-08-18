import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/service/ServiceCard";
import { Button } from "@/components/ui/Button";
import { buildPageMetadata } from "@/lib/seo";
import { getServices } from "@/lib/wordpress/queries";

export const metadata: Metadata = buildPageMetadata({
  title: "Διαιτολογικές Υπηρεσίες",
  description:
    "Γνωρίστε τις διαιτολογικές υπηρεσίες της Άριας Τσιάκα — εξατομικευμένη καθοδήγηση και προγράμματα ευεξίας.",
  path: "/services",
});

export default async function ServicesPage() {
  const data = await getServices();
  const services = data.services.nodes;

  return (
    <>
      <section className="border-b border-border bg-geo-pattern py-16 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Υπηρεσίες"
            title="Διαιτολογικές Υπηρεσίες"
            description="Δύο ξεκάθαρες διαδρομές — με χώρο να προστεθούν κι άλλες όταν χρειαστεί."
          />
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="space-y-10">
          {services.length === 0 ? (
            <p className="text-muted">
              Δεν υπάρχουν δημοσιευμένες υπηρεσίες ακόμη. Προσθέστε από WordPress → Services.
            </p>
          ) : (
            services.map((service) => (
              <ServiceCard key={service.id} service={service} featured />
            ))
          )}
        </Container>
      </section>

      <section className="border-t border-border bg-surface-muted py-14">
        <Container className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-medium text-foreground">Έτοιμη για το επόμενο βήμα;</h2>
            <p className="mt-2 text-muted">Κλείστε ραντεβού ή στείλτε μήνυμα.</p>
          </div>
          <Button href="/contact" size="lg">
            Κλείστε Ραντεβού
          </Button>
        </Container>
      </section>
    </>
  );
}
