import { Button } from "@/components/ui/Button";
import { siteBrand } from "@/lib/navigation";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[70vh] overflow-hidden sm:min-h-[78vh]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#a8897a] via-[#7d5f55] to-[#4a3630]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(255,220,200,0.22),transparent_50%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/15"
      />

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-end px-5 py-16 sm:min-h-[78vh] sm:items-center sm:px-8 sm:py-24">
        <div className="max-w-xl animate-[fadeUp_700ms_ease_both]">
          <h1 className="text-3xl font-bold leading-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
            Η Υγιεινή Διατροφή όπως δεν την έχεις ξαναδεί!
          </h1>
          <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-white/95 sm:text-lg">
            Από τη δική μου διαδρομή απώλειας βάρους στην ενδυνάμωση κάθε γυναίκας.
            Μαζί θα φτάσουμε τους στόχους σας για υγεία και αυτοπεποίθηση.
          </p>
          <div className="mt-8">
            <Button href="/services" variant="onDark" size="lg">
              Υπηρεσίες
            </Button>
          </div>
        </div>
      </div>

      <p className="pointer-events-none absolute bottom-4 right-5 text-[0.65rem] uppercase tracking-[0.2em] text-white/50 sm:right-8">
        {siteBrand.personName} · photo placeholder
      </p>
    </section>
  );
}
