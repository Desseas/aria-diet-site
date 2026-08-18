"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { mainNav, siteBrand } from "@/lib/navigation";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const titleId = useId();
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40"
        aria-label="Κλείσιμο μενού"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col bg-surface shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <p id={titleId} className="text-lg font-medium text-foreground">
            Μενού
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted hover:bg-surface-muted hover:text-foreground"
            aria-label="Κλείσιμο"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-4" aria-label="Κινητή πλοήγηση">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`rounded-xl px-4 py-3 text-base transition-colors ${
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-foreground hover:bg-surface-muted hover:text-accent"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-5">
          <Button href={siteBrand.ctaHref} className="w-full" onClick={onClose}>
            {siteBrand.ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40">
      {/* Top utility + centered brand */}
      <div className="border-b border-border/50 bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 py-3 sm:px-8 sm:py-4">
          {siteBrand.phone ? (
            <a
              href={`tel:${siteBrand.phone.replace(/\s/g, "")}`}
              className="hidden text-sm font-medium text-accent sm:block"
            >
              {siteBrand.phone}
            </a>
          ) : (
            <span className="hidden sm:block" aria-hidden="true" />
          )}

          <Link href="/" className="col-start-2 justify-self-center text-center">
            <span className="block font-display text-[1.35rem] font-medium tracking-[0.04em] text-accent sm:text-[1.7rem]">
              {siteBrand.personNameDisplay}
            </span>
            <span className="mt-0.5 block text-[0.65rem] uppercase tracking-[0.32em] text-foreground/55">
              {siteBrand.tagline}
            </span>
          </Link>

          <div className="flex items-center justify-end gap-3">
            {siteBrand.email ? (
              <a
                href={`mailto:${siteBrand.email}`}
                className="hidden text-sm font-medium text-accent md:block"
              >
                {siteBrand.email}
              </a>
            ) : null}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-border p-2.5 text-foreground lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Άνοιγμα μενού"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Taupe nav bar */}
      <div className="hidden bg-nav lg:block">
        <nav className="mx-auto flex max-w-7xl items-center justify-center px-4" aria-label="Κύρια πλοήγηση">
          <ul className="flex items-center">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex px-5 py-3.5 text-[0.95rem] font-medium tracking-wide text-nav-text transition-colors ${
                      active ? "bg-nav-active" : "hover:bg-nav-active/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div id="mobile-menu">
        <MobileMenu open={open} onClose={() => setOpen(false)} />
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
