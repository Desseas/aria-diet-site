import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SocialIconLinks } from "@/components/ui/SocialIconLinks";
import { mainNav, siteBrand } from "@/lib/navigation";
import { resolveSocialUrl } from "@/lib/wordpress/content";
import type { SiteContact } from "@/lib/wordpress/types";

const legalLinks = [
  { href: "/privacy", label: "Πολιτική Απορρήτου" },
  { href: "/cookies", label: "Πολιτική Cookies" },
];

type FooterProps = {
  contact?: SiteContact;
};

export function Footer({ contact }: FooterProps) {
  const year = new Date().getFullYear();
  const phone = contact?.phone?.trim() || "";
  const email = contact?.email?.trim() || "";
  const address = contact?.address?.trim() || "";
  const socialLinks = [
    {
      network: "instagram" as const,
      href: resolveSocialUrl(contact?.instagramUrl),
      label: "Instagram",
    },
    {
      network: "facebook" as const,
      href: resolveSocialUrl(contact?.facebookUrl),
      label: "Facebook",
    },
    {
      network: "tiktok" as const,
      href: resolveSocialUrl(contact?.tiktokUrl),
      label: "TikTok",
    },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">{siteBrand.personName}</h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {siteBrand.tagline}
          </p>
          {address ? (
            <p className="mt-4 max-w-xs whitespace-pre-line text-sm leading-relaxed text-muted">
              {address}
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
            {phone ? (
              <li>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-accent">
                  {phone}
                </a>
              </li>
            ) : null}
            {email ? (
              <li>
                <a href={`mailto:${email}`} className="hover:text-accent">
                  {email}
                </a>
              </li>
            ) : null}
            <li>
              <Link href="/contact" className="hover:text-accent">
                Στοιχεία επικοινωνίας
              </Link>
            </li>
          </ul>
          <SocialIconLinks links={socialLinks} className="mt-5" />
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
