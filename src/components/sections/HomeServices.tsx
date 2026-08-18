import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/service/ServiceCard";
import type { ServiceCard as ServiceCardType } from "@/lib/wordpress/types";

type HomeServicesProps = {
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
  services: ServiceCardType[];
};

export function HomeServices({
  eyebrow,
  title,
  intro,
  services,
}: HomeServicesProps) {
  if (services.length === 0 && !title) return null;

  return (
    <section className="py-14 sm:py-20">
      <Container>
        {title ? (
          <SectionHeading
            eyebrow={eyebrow ?? undefined}
            title={title}
            description={intro ?? undefined}
            className="mb-10"
          />
        ) : null}
        <div className="space-y-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} featured />
          ))}
        </div>
      </Container>
    </section>
  );
}
