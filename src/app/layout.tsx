import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { getSiteUrl } from "@/lib/seo";
import {
  buildThemeCssVariables,
  DEFAULT_BRAND_PALETTE,
  resolveBrandPalette,
} from "@/lib/theme";
import { getSiteTheme } from "@/lib/wordpress/queries";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Άρια Τσιάκα | Διαιτολόγος",
    template: "%s | Άρια Τσιάκα",
  },
  description:
    "Διατροφική καθοδήγηση με επίκεντρο την υγεία, την ισορροπία και την αυτοπεποίθηση.",
  openGraph: {
    type: "website",
    locale: "el_GR",
    siteName: "Άρια Τσιάκα",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
  },
};

async function loadThemeCss(): Promise<string> {
  try {
    const data = await getSiteTheme();
    const palette = resolveBrandPalette(data.page?.themeFields);
    return buildThemeCssVariables(palette);
  } catch {
    return buildThemeCssVariables(DEFAULT_BRAND_PALETTE);
  }
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const themeCss = await loadThemeCss();

  return (
    <html lang="el" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent focus:shadow-md"
        >
          Μετάβαση στο περιεχόμενο
        </a>
        {children}
      </body>
    </html>
  );
}
