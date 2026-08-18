import Image from "next/image";
import Link from "next/link";
import type { ServiceCard as ServiceCardType } from "@/lib/wordpress/types";
import { resolveWpImage } from "@/lib/wordpress/content";

type ServiceCardProps = {
  service: ServiceCardType;
  featured?: boolean;
};

export function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const details = service.serviceDetails;
  const image = resolveWpImage(details?.heroImage, service.title);
  const description = details?.shortDescription?.trim();

  return (
    <article
      className={`grid overflow-hidden border border-border bg-surface ${
        featured ? "lg:grid-cols-2" : ""
      }`}
    >
      <div
        className={`relative min-h-[240px] bg-gradient-to-br from-[#e8d8cf] via-[#d7c0b4] to-[#b99a8b] ${
          featured ? "sm:min-h-[360px]" : ""
        }`}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "100vw"}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">
              {service.title}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12">
        <h2 className="text-2xl font-medium text-foreground sm:text-3xl">
          <Link href={`/services/${service.slug}`} className="hover:text-accent">
            {details?.heroTitle?.trim() || service.title}
          </Link>
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
        ) : null}
        <Link
          href={`/services/${service.slug}`}
          className="mt-6 inline-flex text-sm font-medium text-accent hover:text-accent-hover"
        >
          Μάθετε περισσότερα →
        </Link>
      </div>
    </article>
  );
}
