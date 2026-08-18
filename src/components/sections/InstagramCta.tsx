import { Button } from "@/components/ui/Button";

type InstagramCtaProps = {
  title?: string | null;
  text?: string | null;
  buttonLabel?: string | null;
  href?: string | null;
};

export function InstagramCta({
  title,
  text,
  buttonLabel,
  href,
}: InstagramCtaProps) {
  if (!title?.trim()) return null;

  return (
    <section className="relative overflow-hidden bg-[#3f322e] py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(225,48,108,0.22),transparent_50%)]"
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <h2 className="text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {text ? (
          <p className="mt-4 text-base text-[#e2e2e2] sm:text-lg">{text}</p>
        ) : null}
        {href && buttonLabel ? (
          <div className="mt-8">
            <Button href={href} variant="onDark" size="lg">
              {buttonLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
