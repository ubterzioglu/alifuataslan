import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const sans = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Finansal Günlük",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl("/images/hero-desk.svg"),
        width: 1200,
        height: 630,
        alt: "Finansal Günlük",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl("/images/hero-desk.svg")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${sans.variable} ${serif.variable}`}>
      <body className="bg-white text-[var(--color-ink)] antialiased">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(176,141,87,0.08),_transparent_50%)]">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
