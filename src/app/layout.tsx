import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://evofit.io"),
  title: {
    default: "EvoFit — The Complete Fitness Business Platform",
    template: "%s | EvoFit",
  },
  description:
    "AI-powered nutrition tools and professional training software for fitness coaches. EvoFit Meals + EvoFit Trainer — own your health, own your business.",
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
    locale: "en_CA",
    url: "https://evofit.io",
    siteName: "EvoFit",
    title: "EvoFit — The Complete Fitness Business Platform",
    description:
      "AI-powered nutrition tools and professional training software for fitness coaches. Own your health. Own your business.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EvoFit — The Complete Fitness Business Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@evofit_io",
    creator: "@evofit_io",
    title: "EvoFit — The Complete Fitness Business Platform",
    description:
      "AI-powered nutrition tools and professional training software for fitness coaches.",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="EvoFit Blog"
          href="/blog/rss.xml"
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
