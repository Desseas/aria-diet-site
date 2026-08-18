import { Button } from "@/components/ui/Button";

export type SocialLink = {
  label: string;
  href: string;
};

type SocialCtaProps = {
  title?: string | null;
  text?: string | null;
  links?: SocialLink[];
};

export function SocialCta({ title, text, links = [] }: SocialCtaProps) {
  const visibleLinks = links.filter((link) => link.href.trim().length > 0);
  const heading = title?.trim() || "";

  if (!heading && visibleLinks.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-dark-band-deep py-20 sm:py-24">
      <div aria-hidden="true" className="absolute inset-0 bg-instagram-glow" />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        {heading ? (
          <h2 className="text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl">
            {heading}
          </h2>
        ) : null}
        {text?.trim() ? (
          <p className="mt-4 text-base text-white/85 sm:text-lg">{text.trim()}</p>
        ) : null}
        {visibleLinks.length > 0 ? (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {visibleLinks.map((link) => (
              <Button key={link.href} href={link.href} variant="onDark" size="lg">
                {link.label}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
