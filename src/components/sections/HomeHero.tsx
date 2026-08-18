import { PageHero } from "@/components/sections/PageHero";
import type { ResolvedImage } from "@/lib/wordpress/content";

type HomeHeroProps = {
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  primaryLabel?: string | null;
  primaryHref?: string | null;
  secondaryLabel?: string | null;
  secondaryHref?: string | null;
  image: ResolvedImage;
};

/** Homepage landing banner — full-bleed photo. */
export function HomeHero(props: HomeHeroProps) {
  return <PageHero {...props} size="tall" />;
}
