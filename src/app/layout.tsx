import type { Metadata } from "next";
import localFont from "next/font/local";
// globals.css carries the full design system + section styles (incl. §04 .air-*)
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://unifize.com"),
  title: {
    default: "Unifize — The governed layer for regulated processes",
    template: "%s · Unifize",
  },
  description:
    "Coordination tax, visible, measurable, reducible. Unifize is the shared operational source of truth between your systems of record and the conversations that actually move work forward.",
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
    url: "https://unifize.com",
    siteName: "Unifize",
    title: "Unifize — The governed layer for regulated processes",
    description:
      "Work happens in one place. The record lives somewhere else. Unifize closes the gap.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unifize",
    description:
      "Coordination tax, visible, measurable, reducible — for regulated processes.",
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
      className={`${inter.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
