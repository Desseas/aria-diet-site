import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { mainNav, siteBrand } from "@/lib/navigation";

const legalLinks = [
  { href: "/privacy", label: "Πολιτική Απορρήτου" },
  { href: "/cookies", label: "Πολιτική Cookies" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">{siteBrand.personName}</h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {siteBrand.tagline}
          </p>
          {siteBrand.address ? (
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {siteBrand.address}
            </p>
          ) : null}
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground">Πλοήγηση</h2>
          <ul className="mt-3 space-y-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-muted transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground">Επικοινωνία</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {siteBrand.phone ? (
              <li>
                <a href={`tel:${siteBrand.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                  {siteBrand.phone}
                </a>
              </li>
            ) : null}
            {siteBrand.email ? (
              <li>
                <a href={`mailto:${siteBrand.email}`} className="hover:text-accent">
                  {siteBrand.email}
                </a>
              </li>
            ) : null}
            <li>
              <Link href="/contact" className="hover:text-accent">
                Φόρμα επικοινωνίας
              </Link>
            </li>
            <li>
              <a
                href={siteBrand.instagramUrl}
                className="hover:text-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-3 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteBrand.personName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
