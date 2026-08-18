import type { ReactNode } from "react";

export type SocialNetwork = "instagram" | "facebook" | "tiktok";

export type SocialIconLink = {
  network: SocialNetwork;
  href: string;
  label: string;
};

const iconPaths: Record<SocialNetwork, ReactNode> = {
  instagram: (
    <path
      fill="currentColor"
      d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.9A3.1 3.1 0 1 1 12 8.9a3.1 3.1 0 0 1 0 6.2Zm5.3-8.1a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM12 4.4c-2.1 0-2.36.01-3.19.05-.82.04-1.38.17-1.87.36a3.78 3.78 0 0 0-1.37.89 3.78 3.78 0 0 0-.89 1.37c-.19.49-.32 1.05-.36 1.87C4.41 9.64 4.4 9.9 4.4 12s.01 2.36.05 3.19c.04.82.17 1.38.36 1.87.2.5.46.92.89 1.37.45.43.87.69 1.37.89.49.19 1.05.32 1.87.36.83.04 1.09.05 3.19.05s2.36-.01 3.19-.05c.82-.04 1.38-.17 1.87-.36a3.78 3.78 0 0 0 1.37-.89 3.78 3.78 0 0 0 .89-1.37c.19-.49.32-1.05.36-1.87.04-.83.05-1.09.05-3.19s-.01-2.36-.05-3.19c-.04-.82-.17-1.38-.36-1.87a3.78 3.78 0 0 0-.89-1.37 3.78 3.78 0 0 0-1.37-.89c-.49-.19-1.05-.32-1.87-.36C14.36 4.41 14.1 4.4 12 4.4Zm0 1.53c2.06 0 2.31.01 3.12.05.75.03 1.16.16 1.43.27.36.14.62.3.89.57.27.27.43.53.57.89.11.27.24.68.27 1.43.04.81.05 1.06.05 3.12s-.01 2.31-.05 3.12c-.03.75-.16 1.16-.27 1.43-.14.36-.3.62-.57.89a2.4 2.4 0 0 1-.89.57c-.27.11-.68.24-1.43.27-.81.04-1.06.05-3.12.05s-2.31-.01-3.12-.05c-.75-.03-1.16-.16-1.43-.27a2.4 2.4 0 0 1-.89-.57 2.4 2.4 0 0 1-.57-.89c-.11-.27-.24-.68-.27-1.43-.04-.81-.05-1.06-.05-3.12s.01-2.31.05-3.12c.03-.75.16-1.16.27-1.43.14-.36.3-.62.57-.89.27-.27.53-.43.89-.57.27-.11.68-.24 1.43-.27.81-.04 1.06-.05 3.12-.05Z"
    />
  ),
  facebook: (
    <path
      fill="currentColor"
      d="M14.5 8.4h1.9V5.6h-1.9c-2.2 0-3.6 1.3-3.6 3.5v1.5H9.2v2.8h1.7V20h3.1v-6.6h2.1l.4-2.8h-2.5V9.5c0-.7.3-1.1 1.5-1.1Z"
    />
  ),
  tiktok: (
    <path
      fill="currentColor"
      d="M16.7 9.1a4.7 4.7 0 0 1-2.8-2.4V15a4.1 4.1 0 1 1-3.5-4.05v2.15a2 2 0 1 0 1.4 1.9V4.4h2.1c.3 1.5 1.5 2.8 3 3.3v1.4c-.07 0-.13.01-.2.01Z"
    />
  ),
};

const toneClass = {
  default:
    "border-border text-muted hover:border-accent hover:bg-accent hover:text-white",
  onDark:
    "border-white/45 text-white hover:border-white hover:bg-white hover:text-accent",
} as const;

type SocialIconLinksProps = {
  links: SocialIconLink[];
  className?: string;
  tone?: keyof typeof toneClass;
  size?: "md" | "lg" | "xl";
};

export function SocialIconLinks({
  links,
  className = "",
  tone = "default",
  size = "md",
}: SocialIconLinksProps) {
  const visible = links.filter((link) => link.href.trim().length > 0);
  if (visible.length === 0) return null;

  const sizeClass =
    size === "xl" ? "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]" : size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const iconSize = size === "xl" ? 28 : size === "lg" ? 20 : 18;
  const gapClass = size === "xl" ? "gap-4" : "gap-2.5";

  return (
    <ul
      className={`flex flex-wrap items-center justify-center ${gapClass} ${className}`.trim()}
    >
      {visible.map((link) => (
        <li key={link.network}>
          <a
            href={link.href}
            aria-label={link.label}
            title={link.label}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center rounded-full border transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${sizeClass} ${toneClass[tone]}`}
          >
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {iconPaths[link.network]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
