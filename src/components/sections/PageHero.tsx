import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { ResolvedImage } from "@/lib/wordpress/content";

type PageHeroProps = {
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  image: ResolvedImage;
  primaryLabel?: string | null;
  primaryHref?: string | null;
  secondaryLabel?: string | null;
  secondaryHref?: string | null;
  /** taller landing hero vs inner pages */
  size?: "tall" | "medium";
  /** Prefer display font for page titles */
  displayTitle?: boolean;
};

/**
 * Full-bleed photo banner. Image is always required (CMS or curated fallback).
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  size = "medium",
  displayTitle = false,
}: PageHeroProps) {
  const heightClass =
    size === "tall"
      ? "min-h-[70vh] sm:min-h-[78vh]"
      : "min-h-[52vh] sm:min-h-[58vh]";

  return (
    <section className={`relative isolate overflow-hidden ${heightClass}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10"
      />

      <Container
        className={`relative flex ${heightClass} items-end py-14 sm:items-center sm:py-20`}
      >
        <div className="max-w-2xl animate-[fadeUp_700ms_ease_both] text-white">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={
              displayTitle
                ? "mt-3 font-display text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl"
                : "mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
            }
          >
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/95 sm:text-lg">
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
      </Container>
    </section>
  );
}
