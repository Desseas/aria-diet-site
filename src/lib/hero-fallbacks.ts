import type { ResolvedImage } from "@/lib/wordpress/content";

type FallbackPhoto = {
  src: string;
  alt: string;
};

function unsplash(id: string, alt: string): FallbackPhoto {
  return {
    src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80`,
    alt,
  };
}

/**
 * Curated lifestyle photos used when CMS media is empty.
 * Replace anytime by uploading the matching image field in WordPress.
 */
export const IMAGE_FALLBACKS = {
  home: unsplash(
    "photo-1512621776951-a57141f2eefd",
    "Φρέσκα λαχανικά και υγιεινή διατροφή",
  ),
  about: unsplash(
    "photo-1498837167922-ddd27525d352",
    "Υγιεινά συστατικά και ισορροπημένη διατροφή",
  ),
  services: unsplash(
    "photo-1490645935967-10de6ba17061",
    "Υγιεινό γεύμα σε ξύλινο τραπέζι",
  ),
  contact: unsplash(
    "photo-1515378791036-0648a3ef77b2",
    "Ήρεμος χώρος για ραντεβού και επικοινωνία",
  ),
  service: unsplash(
    "photo-1466637574441-749b8f19452f",
    "Φρέσκα υλικά για εξατομικευμένη διατροφή",
  ),
  homeAbout: unsplash(
    "photo-1546069901-ba9599a7e63c",
    "Χρωματιστό μπολ υγιεινής σαλάτας",
  ),
  homeApproach: unsplash(
    "photo-1490645935967-10de6ba17061",
    "Ισορροπημένο γεύμα με φρέσκα υλικά",
  ),
  homePhilosophy: unsplash(
    "photo-1610832958506-aa56368176cf",
    "Φρέσκα φρούτα και φυσική διατροφή",
  ),
  aboutLifestyle: unsplash(
    "photo-1571019614242-c5c5dee9f50b",
    "Ενεργός τρόπος ζωής και ευεξία",
  ),
  serviceSecondary: unsplash(
    "photo-1512621776951-a57141f2eefd",
    "Προετοιμασία υγιεινού γεύματος",
  ),
  serviceAltA: unsplash(
    "photo-1505576399279-565b52d4ac71",
    "Πράσινα smoothie και υγιεινά ροφήματα",
  ),
  serviceAltB: unsplash(
    "photo-1512621776951-a57141f2eefd",
    "Φρέσκα λαχανικά για διατροφικά προγράμματα",
  ),
  campaign: unsplash(
    "photo-1490645935967-10de6ba17061",
    "Καλοκαιρινή διατροφή και ανανέωση",
  ),
  campaignSecondary: unsplash(
    "photo-1511690743698-d9d85f2fbf38",
    "Φρέσκα φρούτα και καλοκαιρινή ενέργεια",
  ),
  legal: unsplash(
    "photo-1450101499163-c8848c66ca85",
    "Έγγραφα και νομικές πληροφορίες",
  ),
} as const;

export type ImageFallbackKey = keyof typeof IMAGE_FALLBACKS;

/** @deprecated Use IMAGE_FALLBACKS — kept for existing imports */
export const HERO_FALLBACKS = IMAGE_FALLBACKS;

export type HeroFallbackKey = ImageFallbackKey;

export function resolveContentImage(
  image: ResolvedImage | null | undefined,
  fallbackKey: ImageFallbackKey,
): ResolvedImage {
  if (image?.src) {
    return image;
  }

  const fallback = IMAGE_FALLBACKS[fallbackKey];
  return {
    src: fallback.src,
    alt: fallback.alt,
    width: 1800,
    height: 1200,
  };
}

export function resolveHeroImage(
  image: ResolvedImage | null | undefined,
  fallbackKey: ImageFallbackKey,
): ResolvedImage {
  return resolveContentImage(image, fallbackKey);
}

/** Pick a varied service card photo from slug when CMS image is missing. */
export function resolveServiceCardImage(
  image: ResolvedImage | null | undefined,
  slug: string,
  title: string,
): ResolvedImage {
  if (image?.src) {
    return image;
  }

  const pool: ImageFallbackKey[] = ["service", "serviceAltA", "serviceAltB", "homeApproach"];
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % pool.length;
  }

  const resolved = resolveContentImage(null, pool[hash] ?? "service");
  return { ...resolved, alt: title || resolved.alt };
}
