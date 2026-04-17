import type { Metadata } from "next";
import HeroSubpage from "@/components/sections/HeroSubpage";
import FullWidthImage from "@/components/sections/FullWidthImage";
import PricingSection from "@/components/sections/PricingSection";
import EmailCTA from "@/components/sections/EmailCTA";

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
    name: "Starter",
    price: "$199",
    period: "One-Time Payment",
    features: [
      "1,344 exercises with GIF demos",
      "Up to 5 active clients",
      "Set-by-set workout logging",
      "PR detection + confetti celebration",
      "Built-in rest timer",
    ],
    cta: "Get Started — $199",
    href: "https://trainer.evofit.io/get-started",
  },
  {
    name: "Professional",
    price: "$299",
    period: "One-Time Payment",
    features: [
      "Everything in Starter, plus:",
      "Up to 19 active clients",
      "8 program types (Strength, Hypertrophy, Rehab\u2026)",
      "7 set types (Drop Sets, Pyramid, AMRAP\u2026)",
      "RPE, RIR & tempo prescriptions",
      "Unlimited custom color tags",
    ],
    cta: "Upgrade to Professional — $299",
    href: "https://trainer.evofit.io/get-started",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Elite",
    price: "$399",
    period: "One-Time Payment",
    features: [
      "Everything in Professional, plus:",
      "Up to 50 active clients",
      "Full user management & roles",
      "Feature flags API",
      "Multi-trainer oversight",
    ],
    cta: "Get Elite — $399",
    href: "https://trainer.evofit.io/get-started",
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
            description: "Professional personal training platform with 1,344 exercises, program builder, and ACWR analytics.",
            offers: { "@type": "Offer", priceCurrency: "USD", price: "199", name: "Starter License" },
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
        cta={{ text: "Start Building Programs \u2192", href: "https://trainer.evofit.io/get-started" }}
        align="left"
        gradient="left"
      />

      <FullWidthImage
        image="/images/lifestyle-class.png"
        alt="Group fitness class in modern gym"
        label="Feature"
        title="1,344 Exercises"
        description="Every exercise with animated GIF demonstrations. Full-text search + multi-filter stacking."
        bullets={[
          "Animated GIF demonstrations",
          "Muscle group targeting + equipment filters",
          "Favorites + custom collections",
        ]}
        cta={{ text: "See The Full Library \u2192", href: "https://trainer.evofit.io/get-started" }}
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
          "Up to 19 clients (Pro) \u00b7 50 (Elite)",
          "Set-by-set logging with auto PR detection",
          "PR confetti celebration + best tracking",
        ]}
        cta={{ text: "Manage Your Roster \u2192", href: "https://trainer.evofit.io/get-started" }}
        align="left"
        gradient="left"
      />

      <FullWidthImage
        image="/images/hero-gym.png"
        alt="Modern premium gym interior"
        label="Coming Soon"
        title="AI Workout Generation"
        description="Full balanced workout in under 5 seconds from 1,344 exercises. RPE-based progression. Plateau detection."
        bullets={[
          "AI-generated workouts in 5 seconds",
          "Confidence-rated suggestions (High/Med/Low)",
          "Stack on any tier \u2014 coming soon",
        ]}
        cta={{ text: "Get Lifetime Access \u2192", href: "https://trainer.evofit.io/get-started" }}
        align="right"
        gradient="right"
      />

      <PricingSection tiers={trainerTiers} />

      <EmailCTA
        title="Start Training Smarter"
        subtitle="Join the trainers who stopped guessing and started growing."
        buttonText="Get EvoFit Trainer"
        productTag="evofit-trainer-interest"
      />
    </>
  );
}
