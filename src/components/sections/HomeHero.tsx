import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { ResolvedImage } from "@/lib/wordpress/content";

type HomeHeroProps = {
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  primaryLabel?: string | null;
  primaryHref?: string | null;
  secondaryLabel?: string | null;
  secondaryHref?: string | null;
  image?: ResolvedImage | null;
};

export function HomeHero({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  image,
}: HomeHeroProps) {
  return (
    <section className="relative isolate min-h-[70vh] overflow-hidden sm:min-h-[78vh]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#a8897a] via-[#7d5f55] to-[#4a3630]"
      />
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(255,220,200,0.22),transparent_50%)]"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/15"
      />

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-end px-5 py-16 sm:min-h-[78vh] sm:items-center sm:px-8 sm:py-24">
        <div className="max-w-xl animate-[fadeUp_700ms_ease_both]">
          {eyebrow ? (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl font-bold leading-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-white/95 sm:text-lg">
              {description}
            </p>
          ) : null}
          {(primaryHref && primaryLabel) || (secondaryHref && secondaryLabel) ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryHref && primaryLabel ? (
                <Button href={primaryHref} variant="onDark" size="lg">
                  {primaryLabel}
                </Button>
              ) : null}
              {secondaryHref && secondaryLabel ? (
                <Button href={secondaryHref} variant="soft" size="lg">
                  {secondaryLabel}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
