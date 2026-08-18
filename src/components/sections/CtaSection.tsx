import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type CtaSectionProps = {
  title?: string | null;
  description?: string | null;
  buttonLabel?: string | null;
  buttonHref?: string | null;
};

export function CtaSection({
  title,
  description,
  buttonLabel,
  buttonHref,
}: CtaSectionProps) {
  if (!title?.trim()) return null;

  return (
    <section className="border-t border-border bg-surface-muted py-14 sm:py-16">
      <Container className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl font-medium text-foreground sm:text-3xl">{title}</h2>
          {description ? (
            <p className="mt-2 text-muted">{description}</p>
          ) : null}
        </div>
        {buttonHref && buttonLabel ? (
          <Button href={buttonHref} size="lg">
            {buttonLabel}
          </Button>
        ) : null}
      </Container>
    </section>
  );
}
