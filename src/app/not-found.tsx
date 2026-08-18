import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center bg-geo-pattern py-24 sm:py-32">
      <Container className="text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-accent uppercase">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium text-foreground sm:text-5xl">
          Η σελίδα δεν βρέθηκε
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Ο σύνδεσμος μπορεί να έχει αλλάξει ή η σελίδα να μην υπάρχει πλέον.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/">Αρχική</Button>
          <Button href="/services" variant="secondary">
            Υπηρεσίες
          </Button>
          <Link
            href="/contact"
            className="text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            Επικοινωνία
          </Link>
        </div>
      </Container>
    </section>
  );
}
