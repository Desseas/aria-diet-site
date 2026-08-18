import type { ThemeFields } from "@/lib/wordpress/types";

export type BrandPalette = {
  accent: string;
  nav: string;
  pattern: string;
  surfaceMuted: string;
  darkBand: string;
  text: string;
};

export const DEFAULT_BRAND_PALETTE: BrandPalette = {
  accent: "#3d6b5c",
  nav: "#c5b8ab",
  pattern: "#f2efe9",
  surfaceMuted: "#f6f3ee",
  darkBand: "#3a403c",
  text: "#2a2e2c",
};

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export function normalizeHex(value: string | null | undefined, fallback: string): string {
  const raw = value?.trim();
  if (!raw || !HEX_RE.test(raw)) {
    return fallback;
  }

  if (raw.length === 4) {
    const [, r, g, b] = raw;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }

  return raw.toLowerCase();
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("")}`;
}

/** Mix toward black (amount 0–1). */
export function darken(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const t = 1 - amount;
  return rgbToHex(r * t, g * t, b * t);
}

/** Mix toward white (amount 0–1). */
export function lighten(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(
    r + (255 - r) * amount,
    g + (255 - g) * amount,
    b + (255 - b) * amount,
  );
}

export function resolveBrandPalette(fields?: ThemeFields | null): BrandPalette {
  return {
    accent: normalizeHex(fields?.accent, DEFAULT_BRAND_PALETTE.accent),
    nav: normalizeHex(fields?.nav, DEFAULT_BRAND_PALETTE.nav),
    pattern: normalizeHex(fields?.pattern, DEFAULT_BRAND_PALETTE.pattern),
    surfaceMuted: normalizeHex(
      fields?.surfaceMuted,
      DEFAULT_BRAND_PALETTE.surfaceMuted,
    ),
    darkBand: normalizeHex(fields?.darkBand, DEFAULT_BRAND_PALETTE.darkBand),
    text: normalizeHex(fields?.text, DEFAULT_BRAND_PALETTE.text),
  };
}

/**
 * Build a `:root { ... }` CSS block from CMS brand colors.
 * Derived tokens (hover, soft, borders, gradients) stay code-owned.
 */
export function buildThemeCssVariables(palette: BrandPalette): string {
  const accentHover = darken(palette.accent, 0.18);
  const accentSoft = lighten(palette.accent, 0.88);
  const navActive = lighten(palette.nav, 0.12);
  const border = darken(palette.pattern, 0.08);
  const darkBandDeep = darken(palette.darkBand, 0.28);
  const darkBandMid = darken(palette.darkBand, 0.12);
  const softFrom = lighten(palette.pattern, 0.15);
  const softVia = palette.pattern;
  const softTo = darken(palette.nav, 0.05);
  const heroFrom = lighten(palette.nav, 0.05);
  const heroVia = darken(palette.nav, 0.25);
  const heroTo = darken(palette.darkBand, 0.2);
  const textMutedRgb = hexToRgb(palette.text);

  const lines = [
    `--accent: ${palette.accent}`,
    `--accent-hover: ${accentHover}`,
    `--accent-soft: ${accentSoft}`,
    `--focus: ${palette.accent}`,
    `--nav: ${palette.nav}`,
    `--nav-active: ${navActive}`,
    `--pattern: ${palette.pattern}`,
    `--surface-muted: ${palette.surfaceMuted}`,
    `--dark-band: ${palette.darkBand}`,
    `--dark-band-mid: ${darkBandMid}`,
    `--dark-band-deep: ${darkBandDeep}`,
    `--text: ${palette.text}`,
    `--text-muted: rgba(${textMutedRgb.r}, ${textMutedRgb.g}, ${textMutedRgb.b}, 0.55)`,
    `--border: ${border}`,
    `--soft-from: ${softFrom}`,
    `--soft-via: ${softVia}`,
    `--soft-to: ${softTo}`,
    `--hero-from: ${heroFrom}`,
    `--hero-via: ${heroVia}`,
    `--hero-to: ${heroTo}`,
  ];

  return `:root {\n  ${lines.join(";\n  ")};\n}`;
}
