"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-1 items-center bg-geo-pattern py-24 sm:py-32">
      <Container className="text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-accent uppercase">
          Σφάλμα
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium text-foreground sm:text-5xl">
          Κάτι πήγε στραβά
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Δοκιμάστε ξανά σε λίγο. Αν το πρόβλημα συνεχίζεται, επιστρέψτε στην αρχική.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button type="button" onClick={reset}>
            Ξανά
          </Button>
          <Button href="/" variant="secondary">
            Αρχική
          </Button>
        </div>
      </Container>
    </section>
  );
}
