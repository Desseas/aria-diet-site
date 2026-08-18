import { HomeHero } from "@/components/sections/HomeHero";
import { InstagramCta } from "@/components/sections/InstagramCta";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { SplitFeature } from "@/components/sections/SplitFeature";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <SplitFeature
        title="Γνωρίστε τις υπηρεσίες μας."
        description="Μεταμορφώστε το σώμα σας και τη ζωή σας. Μαζί θα βρούμε τη δύναμη που κρύβεται μέσα σας."
        ctaLabel="Διαιτολογικές Υπηρεσίες"
        ctaHref="/services"
        imageLabel="Lifestyle portrait — θα αντικατασταθεί από WordPress media"
      />

      <SplitFeature
        title="About me"
        description="Η προσωπική μου διαδρομή είναι η βάση της δουλειάς μου: πρακτική καθοδήγηση, ενσυναίσθηση και στόχοι που αντέχουν."
        ctaLabel="Γνωρίστε με"
        ctaHref="/about"
        imageLabel="Personal brand photo placeholder"
        reverse
        dark
      />

      <QuoteBand />
      <InstagramCta />
    </>
  );
}
