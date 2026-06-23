import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { SiteShell } from "@/components/layout/SiteShell";

const SITE = "https://horsevision.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "HorseVision — Identify any horse breed from a photo",
    template: "%s · HorseVision",
  },
  description:
    "HorseVision uses AI to identify horse breeds from a photograph and explains exactly why — with a cinematic, explainable analysis built for owners, vets, breeders and enthusiasts.",
  keywords: ["horse breed identifier", "AI horse breed", "equine vision", "identify horse breed"],
  openGraph: {
    title: "HorseVision — Identify any horse breed from a photo",
    description: "AI breed identification that explains its reasoning. Cinematic, fast, explainable.",
    url: SITE,
    siteName: "HorseVision",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HorseVision",
    description: "AI horse breed identification, explained.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#100c0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-aurora noise font-sans antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <SiteShell>
            <div id="main">{children}</div>
          </SiteShell>
        </Providers>
      </body>
    </html>
  );
}
