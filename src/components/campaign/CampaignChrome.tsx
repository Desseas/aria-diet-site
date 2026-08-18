import Link from "next/link";
import { siteBrand } from "@/lib/navigation";

/** Slim chrome for Instagram campaign landings — less nav noise, strong brand + CTA. */
export function CampaignChrome({
  children,
  ctaHref = "/contact",
  ctaLabel = "Επικοινωνία",
}: {
  children: React.ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-surface">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="min-w-0">
            <span className="block font-display text-xl tracking-wide text-accent sm:text-2xl">
              {siteBrand.personNameDisplay}
            </span>
          </Link>
          <Link
            href={ctaHref}
            className="shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            {ctaLabel}
          </Link>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="border-t border-border py-6 text-center text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          ← {siteBrand.personName}
        </Link>
      </footer>
    </div>
  );
}
