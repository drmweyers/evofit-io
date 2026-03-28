import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import HowItWorks from "@/components/sections/HowItWorks";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import Pricing from "@/components/sections/Pricing";
import LeadMagnets from "@/components/sections/LeadMagnets";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "EvoFit — The Complete Fitness Business Platform",
  description:
    "AI-powered meal plans + professional training software for fitness coaches. EvoFit Meals and EvoFit Trainer — own your health, own your business.",
  alternates: {
    canonical: "https://evofit.io",
  },
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "EvoFit",
            url: "https://evofit.io",
            logo: "https://evofit.io/logo.png",
            description:
              "The complete fitness business platform — AI-powered nutrition tools and professional training software for fitness coaches.",
            sameAs: [
              "https://twitter.com/evofit_io",
              "https://instagram.com/evofit_io",
            ],
            offers: [
              {
                "@type": "Offer",
                name: "EvoFit Meals",
                url: "https://evofitmeals.com",
                priceCurrency: "USD",
                price: "199",
                description: "AI-powered meal plan generator for nutrition professionals",
              },
              {
                "@type": "Offer",
                name: "EvoFit Trainer",
                url: "https://trainer.evofit.io",
                priceCurrency: "USD",
                price: "149",
                description: "Professional personal training platform with 1,344 exercises",
              },
            ],
          }),
        }}
      />
      <Hero />
      <ProductShowcase />
      <HowItWorks />
      <FeaturesGrid />
      <Pricing />
      <LeadMagnets />
      <Testimonials />
      <FAQ />
    </>
  );
}
