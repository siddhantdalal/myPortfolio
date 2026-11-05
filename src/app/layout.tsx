import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CommandPalette } from "@/components/command-palette";
import { Providers } from "@/components/providers";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/toaster";
import { profile } from "@/content/profile";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${profile.name} | ${profile.role}`;

export const metadata: Metadata = {
  // Origin only: Next.js already adds the base path to generated image URLs.
  metadataBase: new URL(new URL(profile.url).origin),
  title,
  description: profile.description,
  authors: [{ name: profile.name, url: profile.url }],
  openGraph: {
    type: "profile",
    url: profile.url,
    title,
    description: profile.description,
    siteName: profile.name,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title, description: profile.description },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark light",
};

/** Structured data so search engines can show a proper profile card. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.url,
  sameAs: [profile.links.github, profile.links.linkedin].filter(Boolean),
  address: { "@type": "PostalAddress", addressLocality: "Nagpur", addressCountry: "IN" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-dvh font-sans">
        <Providers>
          <ScrollProgress />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <CommandPalette />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
