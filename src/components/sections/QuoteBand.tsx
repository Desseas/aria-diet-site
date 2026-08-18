type QuoteBandProps = {
  text?: string | null;
};

export function QuoteBand({ text }: QuoteBandProps) {
  if (!text?.trim()) return null;

  return (
    <section className="relative overflow-hidden bg-dark-band-mid py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30 bg-geo-pattern"
      />
      <blockquote className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="text-lg font-light leading-relaxed text-white sm:text-xl md:text-2xl">
          {text}
        </p>
      </blockquote>
    </section>
  );
}
