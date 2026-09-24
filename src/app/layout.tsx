import type { Metadata } from "next";
import localFont from "next/font/local";
// globals.css carries the full design system + section styles (incl. §04 .air-*)
import "./globals.css";
import { PAGE_SEO, SITE_URL } from "./explorations/_shared/seo";

// Self-hosted variable fonts (see ./fonts/README.md). Vendored to avoid
// next/font/google's compile-time network fetch, which stalls behind this
// environment's outbound proxy and can hang the dev server indefinitely.
const inter = localFont({
  src: "./fonts/inter-variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const geist = localFont({
  src: "./fonts/geist-variable.woff2",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-variable.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
});

// Alloy 2026 display family (font/family/ibmPlexSans)
const ibmPlexSans = localFont({
  src: "./fonts/ibm-plex-sans-variable.woff2",
  variable: "--font-ibm-plex-sans",
  weight: "100 700",
  display: "swap",
});

/* the site-wide fallback; every public page overrides it with its own
 * title, description and share card from explorations/_shared/seo.ts */
const HOME = PAGE_SEO["/home"];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME.title,
    template: "%s · Unifize",
  },
  description: HOME.description,
  keywords: [
    "QMS",
    "regulated processes",
    "coordination",
    "medical devices",
    "pharmaceuticals",
    "aerospace",
    "governed layer",
    "audit trail",
    "CAPA",
    "change management",
  ],
  applicationName: "Unifize",
  authors: [{ name: "Unifize" }],
  creator: "Unifize",
  publisher: "Unifize",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Unifize",
    title: HOME.title,
    description: HOME.description,
    images: [{ url: "/og/home", width: 1200, height: 630, alt: "Regulated work, closed on time. Defensible at audit." }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME.title,
    description: HOME.description,
    images: ["/og/home"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geist.variable} ${jetbrainsMono.variable} ${ibmPlexSans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
