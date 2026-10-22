import type { Metadata } from "next";
import HeroSubpage from "@/components/sections/HeroSubpage";
import FullWidthImage from "@/components/sections/FullWidthImage";
import PricingSection from "@/components/sections/PricingSection";
import EmailCTA from "@/components/sections/EmailCTA";
import { OwnItForever, FitnessAgent, WhyNotRent } from "@/components/sections/TrainerStory";
import { PRICING_URL } from "@/lib/cta";
import { tierPrice, tierName, clientsLabel, customExercises } from "@/lib/pricing";
import pricing from "@/lib/pricing.json";

export const metadata: Metadata = {
  title: "EvoFit Trainer — Programs That Win Clients",
  description:
    "Create workout programs that clients rave about. Manage your roster with precision. Build your reputation on results, not promises.",
  openGraph: {
    title: "EvoFit Trainer — Programs That Win Clients",
    description: "Create workout programs that clients rave about.",
    url: "https://evofit.io/trainer",
  },
  alternates: { canonical: "https://evofit.io/trainer" },
};

const trainerTiers = [
  {
    name: "Free",
    price: "$0",
    period: "30-day trial",
    features: [
      "1 active client",
      "1,300+ exercises with GIF demos",
      "Set-by-set workout logging",
      "Basic program builder",
      "PWA (installable to the home screen)",
      "No credit card required",
    ],
    cta: "Start Free",
    href: "https://trainer.evofit.io/auth/register",
  },
  {
    name: "Starter",
    price: tierPrice("starter"),
    period: "One-Time Payment",
    features: [
      "1,300+ exercises with GIF demos",
      `${clientsLabel("starter")}`,
      `${customExercises("starter")} custom exercises included`,
      "Set-by-set workout logging",
      "PR detection + confetti celebration",
      "Built-in rest timer",
      "Habit tracking + daily macro log",
    ],
    cta: `Get ${tierName("starter")} — ${tierPrice("starter")}`,
    href: PRICING_URL,
  },
  {
    name: "Professional",
    price: tierPrice("professional"),
    period: "One-Time Payment",
    features: [
      "Everything in Starter, plus:",
      "Unlimited active clients",
      `${customExercises("professional")} custom exercises included`,
      "8 program types (Strength, Hypertrophy, Rehab\u2026)",
      "7 set types (Drop Sets, Pyramid, AMRAP\u2026)",
      "RPE, RIR & tempo prescriptions",
      "Unlimited custom color tags",
      "Client check-ins + Client 360 dashboard",
    ],
    cta: `Get ${tierName("professional")} — ${tierPrice("professional")}`,
    href: PRICING_URL,
    highlighted: true,
    badge: "Recommended",
  },
  {
    name: "Enterprise",
    price: tierPrice("enterprise"),
    period: "One-Time Payment",
    features: [
      "Everything in Professional, plus:",
      "Unlimited active clients",
      "API keys and Excel export",
      "Unlimited custom exercises and progress-photo storage",
      "Cloud Pro included",
    ],
    cta: `Get ${tierName("enterprise")} — ${tierPrice("enterprise")}`,
    href: PRICING_URL,
  },
];

export default function TrainerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "EvoFit Trainer",
            applicationCategory: "SportsApplication",
            url: "https://trainer.evofit.io",
            description: "Professional personal training platform with 1,300+ exercises, program builder, and ACWR analytics.",
            offers: { "@type": "Offer", priceCurrency: "USD", price: String(pricing.tiers.starter.priceUsd), name: "Starter License" },
          }),
        }}
      />

      <HeroSubpage
        image="/images/trainer-coaching.png"
        title="PROGRAMS THAT WIN CLIENTS"
        subtitle="Stop winging workouts. Start building programs that clients fight to get into."
        ctaText="See Pricing"
        ctaHref="/trainer#pricing"
      />

      {/* Story: (1) own it forever, (2) the Fitness Agent upsell, (3) why not Everfit or Trainerize */}
      <OwnItForever tone="light" />
      <PricingSection tiers={trainerTiers} />

      <FitnessAgent tone="dark" />
      <WhyNotRent tone="light" />

      <FullWidthImage
        image="/images/trainer-desk.png"
        alt="Trainer working on program builder at desk"
        label="Feature"
        title="Program Builder"
        description="8 program types. 7 set types. RPE, RIR, and tempo prescriptions. Design workouts in minutes, not hours."
        bullets={[
          "Strength, Hypertrophy, Powerlifting, Rehab + more",
          "Drop Sets, Pyramid, AMRAP, Cluster, Rest-Pause",
          "Custom template library",
        ]}
        cta={{ text: "Start Building Programs \u2192", href: PRICING_URL }}
        align="left"
        gradient="left"
      />

      <FullWidthImage
        image="/images/lifestyle-class.png"
        alt="Group fitness class in modern gym"
        label="Feature"
        title="1,300+ Exercises"
        description="Every exercise with animated GIF demonstrations. Full-text search + multi-filter stacking."
        bullets={[
          "Animated GIF demonstrations",
          "Muscle group targeting + equipment filters",
          "Favorites + custom collections",
        ]}
        cta={{ text: "See The Full Library \u2192", href: PRICING_URL }}
        align="right"
        gradient="right"
      />

      <FullWidthImage
        image="/images/lifestyle-ropes.png"
        alt="Dynamic fitness training"
        label="Feature"
        title="Client Management"
        description="5-status lifecycle tracking, email invitations, custom color tags. Know your roster inside and out."
        bullets={[
          "Up to 5 clients (Starter) \u00b7 unlimited (Pro & Enterprise)",
          "Set-by-set logging with auto PR detection",
          "PR confetti celebration + best tracking",
        ]}
        cta={{ text: "Manage Your Roster \u2192", href: PRICING_URL }}
        align="left"
        gradient="left"
      />

      <EmailCTA
        title="Start Training Smarter"
        subtitle="Create your account and start building."
        buttonText="Get EvoFit Trainer"
        productTag="evofit-trainer-interest"
      />
    </>
  );
}
