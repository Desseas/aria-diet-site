import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { ResolvedImage } from "@/lib/wordpress/content";

type HomePersonHeroProps = {
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  aboutText?: string | null;
  primaryLabel?: string | null;
  primaryHref?: string | null;
  secondaryLabel?: string | null;
  secondaryHref?: string | null;
  aboutLabel?: string | null;
  aboutHref?: string | null;
  image: ResolvedImage;
};

/**
 * Person-first homepage intro: portrait + headline in one composition.
 * Mobile shows her photo first; desktop places copy left / photo right.
 */
export function HomePersonHero({
  eyebrow,
  title,
  description,
  aboutText,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  aboutLabel,
  aboutHref,
  image,
}: HomePersonHeroProps) {
  const hasPrimary = Boolean(primaryHref && primaryLabel);
  const hasSecondary = Boolean(secondaryHref && secondaryLabel);
  const hasAboutCta =
    Boolean(aboutHref && aboutLabel) &&
    aboutHref !== primaryHref &&
    aboutHref !== secondaryHref;

  return (
    <section className="bg-dark-band text-white">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2 lg:min-h-[min(78vh,760px)]">
        {/* Portrait — first on mobile, right on desktop */}
        <div className="relative order-1 min-h-[56vh] overflow-hidden bg-dark-band sm:min-h-[60vh] lg:order-2 lg:min-h-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            className="object-cover object-[center_15%]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark-band to-transparent lg:hidden"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-20 bg-gradient-to-r from-dark-band to-transparent lg:block"
          />
        </div>

        {/* Copy — second on mobile, left on desktop */}
        <div className="order-2 flex items-center px-5 py-12 sm:px-10 sm:py-16 lg:order-1 lg:px-14 lg:py-20">
          <div className="max-w-xl animate-[fadeUp_700ms_ease_both]">
            {eyebrow?.trim() ? (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                {eyebrow.trim()}
              </p>
            ) : null}
            <h1 className="mt-3 font-display text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description?.trim() ? (
              <p className="mt-5 text-base font-medium leading-relaxed text-white/90 sm:text-lg">
                {description.trim()}
              </p>
            ) : null}
            {aboutText?.trim() ? (
              <p className="mt-4 text-base leading-relaxed text-white/75">
                {aboutText.trim()}
              </p>
            ) : null}
            {hasPrimary || hasSecondary || hasAboutCta ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {hasPrimary ? (
                  <Button href={primaryHref!} variant="onDark" size="lg">
                    {primaryLabel}
                  </Button>
                ) : null}
                {hasSecondary ? (
                  <Button href={secondaryHref!} variant="soft" size="lg">
                    {secondaryLabel}
                  </Button>
                ) : null}
                {hasAboutCta ? (
                  <Button href={aboutHref!} variant="onDark" size="lg">
                    {aboutLabel}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
