import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ResolvedImage } from "@/lib/wordpress/content";

type SplitFeatureProps = {
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  htmlContent?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  image?: ResolvedImage | null;
  imageLabel?: string;
  reverse?: boolean;
  dark?: boolean;
};

export function SplitFeature({
  eyebrow,
  title,
  description,
  htmlContent,
  ctaLabel,
  ctaHref,
  image,
  imageLabel = "Photo placeholder",
  reverse = false,
  dark = false,
}: SplitFeatureProps) {
  return (
    <section className={dark ? "bg-[#5c4a42] text-white" : "bg-geo-pattern"}>
      <div
        className={`mx-auto grid max-w-7xl lg:grid-cols-2 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="flex items-center px-5 py-16 sm:px-10 sm:py-20 lg:px-14">
          <div>
            <SectionHeading
              eyebrow={eyebrow ?? undefined}
              title={title}
              description={description ?? undefined}
              tone={dark ? "light" : "default"}
            />
            {htmlContent ? (
              <div
                className={`mt-4 space-y-3 text-base leading-relaxed ${
                  dark ? "text-white/75" : "text-muted"
                } [&_p]:mb-3`}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            ) : null}
            {ctaHref && ctaLabel ? (
              <div className="mt-8">
                <Button href={ctaHref} variant={dark ? "onDark" : "soft"} size="lg">
                  {ctaLabel}
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        <div
          className={`relative min-h-[320px] sm:min-h-[420px] ${
            dark
              ? "bg-gradient-to-br from-[#6d584f] via-[#4f3d37] to-[#3a2c28]"
              : "bg-gradient-to-br from-[#e8d8cf] via-[#d7c0b4] to-[#b99a8b]"
          }`}
        >
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="max-w-xs text-center">
                <p
                  className={`text-sm uppercase tracking-[0.24em] ${
                    dark ? "text-white/55" : "text-accent"
                  }`}
                >
                  Photo placeholder
                </p>
                <p
                  className={`mt-3 text-lg font-medium leading-snug ${
                    dark ? "text-white/90" : "text-foreground/80"
                  }`}
                >
                  {imageLabel}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
