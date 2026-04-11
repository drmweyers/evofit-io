import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://evofit.io"),
  title: {
    default: "EvoFit — The Platform for Elite Fitness Professionals",
    template: "%s | EvoFit",
  },
  description:
    "EvoFit powers the world's most ambitious fitness professionals with AI-driven workout programming and nutrition planning.",
  keywords: [
    "fitness business platform",
    "AI meal plans",
    "personal trainer software",
    "nutrition coaching tools",
    "workout program builder",
    "EvoFit",
    "fitness coach platform",
  ],
  authors: [{ name: "BCI Innovation Labs" }],
  creator: "BCI Innovation Labs",
  publisher: "BCI Innovation Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://evofit.io",
    siteName: "EvoFit",
    title: "EvoFit — The Platform for Elite Fitness Professionals",
    description:
      "EvoFit powers the world's most ambitious fitness professionals with AI-driven workout programming and nutrition planning.",
    images: [
      {
        url: "/images/hero-gym.png",
        width: 1200,
        height: 630,
        alt: "EvoFit - Elite Fitness Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@evofit_io",
    creator: "@evofit_io",
    title: "EvoFit — The Platform for Elite Fitness Professionals",
    description:
      "EvoFit powers the world's most ambitious fitness professionals with AI-driven workout programming and nutrition planning.",
    images: ["/images/hero-gym.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#000000",
  },
  icons: {
    icon: "/logos/evofit-favicon-32.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="EvoFit Blog"
          href="/blog/rss.xml"
        />
      </head>
      <body className="font-body antialiased">
        <Navbar />
        <main className="bg-black">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
