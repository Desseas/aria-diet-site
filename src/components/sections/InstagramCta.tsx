import { Button } from "@/components/ui/Button";
import { siteBrand } from "@/lib/navigation";

export function InstagramCta() {
  return (
    <section className="relative overflow-hidden bg-[#3f322e] py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(225,48,108,0.22),transparent_50%)]"
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <h2 className="text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl">
          Ακολουθήστε με στο <span className="font-medium">Instagram</span>
        </h2>
        <p className="mt-4 text-base text-[#e2e2e2] sm:text-lg">
          για να μαθαίνετε πρώτοι tips και νέα από το γραφείο.
        </p>
        <div className="mt-8">
          <Button href={siteBrand.instagramUrl} variant="onDark" size="lg">
            Ακολουθήστε
          </Button>
        </div>
      </div>
    </section>
  );
}
