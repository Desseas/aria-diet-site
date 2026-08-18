import {
  SocialIconLinks,
  type SocialIconLink,
} from "@/components/ui/SocialIconLinks";

type SocialCtaProps = {
  title?: string | null;
  text?: string | null;
  links?: SocialIconLink[];
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
        <SocialIconLinks
          links={visibleLinks}
          tone="onDark"
          size="xl"
          className="mt-8"
        />
      </div>
    </section>
  );
}
