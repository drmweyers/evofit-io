import type { Metadata } from "next";
import HeroSubpage from "@/components/sections/HeroSubpage";
import FullWidthImage from "@/components/sections/FullWidthImage";
import PricingSection from "@/components/sections/PricingSection";
import EmailCTA from "@/components/sections/EmailCTA";

export const metadata: Metadata = {
  title: "EvoFit Meals — Nutrition Plans That Work",
  description:
    "Stop guessing at macros. Start delivering meal plans that get results. Custom macros, smart recipes, happy clients.",
  openGraph: {
    title: "EvoFit Meals — Nutrition Plans That Work",
    description: "Stop guessing at macros. Start delivering meal plans that get results.",
    url: "https://evofit.io/meals",
  },
  alternates: { canonical: "https://evofit.io/meals" },
};

const mealsTiers = [
  {
    name: "Starter",
    price: "$199",
    period: "One-Time Payment",
    features: [
      "1,500 recipes with nutrition data",
      "Up to 5 active clients",
      "Automated macro calculations",
      "Meal plan PDF exports",
      "Email support",
    ],
    cta: "Get Started — $199",
    href: "https://meals.evofit.io/get-started",
  },
  {
    name: "Professional",
    price: "$299",
    period: "One-Time Payment",
    features: [
      "3,000 recipes with nutrition data",
      "Up to 19 active clients",
      "Custom branding on meal plans",
      "Progress tracking tools",
      "Advanced analytics suite",
      "Priority support",
    ],
    cta: "Upgrade to Professional — $299",
    href: "https://meals.evofit.io/get-started",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Elite",
    price: "$399",
    period: "One-Time Payment",
    features: [
      "6,000 recipes with nutrition data",
      "Everything in Professional, plus",
      "White-label platform",
      "API access & integrations",
      "Up to 50 active clients",
      "Dedicated support manager",
    ],
    cta: "Get Elite — $399",
    href: "https://meals.evofit.io/get-started",
  },
];

export default function MealsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "EvoFit Meals",
            applicationCategory: "HealthApplication",
            url: "https://meals.evofit.io",
            description: "AI-powered meal plan generator for nutrition coaches and personal trainers.",
            offers: { "@type": "Offer", priceCurrency: "USD", price: "199", name: "Starter License" },
          }),
        }}
      />

      <HeroSubpage
        image="/images/meals-overhead.png"
        title="NUTRITION PLANS THAT WORK"
        subtitle="Stop guessing at macros. Start delivering meal plans that get results."
        ctaText="See Pricing"
        ctaHref="/meals#pricing"
      />

      <FullWidthImage
        image="/images/meals-consult.png"
        alt="Nutrition consultant working with client"
        label="Feature"
        title="Smart Recipe Library"
        description="Full nutrition data on every recipe. Goal-specific suggestions that match your client's dietary needs."
        bullets={[
          "Goal-specific recipe suggestions",
          "Dietary restriction accommodation",
          "Complete nutrition breakdown",
        ]}
        cta={{ text: "Explore The Library \u2192", href: "https://meals.evofit.io/get-started" }}
        align="left"
        gradient="left"
      />

      <FullWidthImage
        image="/images/meals-overhead.png"
        alt="Perfectly balanced meal prep spread"
        label="Feature"
        title="Automatic Macro Balancing"
        description="Perfect macros, every time. Set the targets, let the system handle the math."
        bullets={[
          "Precise macro calculations",
          "Real-time nutritional analysis",
          "Flexible meal swapping",
        ]}
        cta={{ text: "See It In Action \u2192", href: "https://meals.evofit.io/get-started" }}
        align="right"
        gradient="right"
      />

      <FullWidthImage
        image="/images/trainer-desk.png"
        alt="Professional managing client nutrition plans"
        label="Feature"
        title="Client Management"
        description="Track eating habits, monitor progress, adjust plans instantly. Your expertise, amplified."
        bullets={[
          "Up to 19 clients (Pro) \u00b7 50 (Elite)",
          "Meal plan compliance monitoring",
          "Branded PDF exports",
        ]}
        cta={{ text: "Manage Your Clients \u2192", href: "https://meals.evofit.io/get-started" }}
        align="left"
        gradient="left"
      />

      <FullWidthImage
        image="/images/brand-exterior.png"
        alt="Premium fitness facility"
        label="Coming Soon"
        title="AI Meal Plan Generation"
        description="AI-powered meal plans customized to every client. Unlimited variations. Smart macro auto-balancing."
        bullets={[
          "AI-generated meal plans in seconds",
          "Unlimited recipe variations",
          "Stack on any tier \u2014 coming soon",
        ]}
        cta={{ text: "Get Lifetime Access \u2192", href: "https://meals.evofit.io/get-started" }}
        align="right"
        gradient="right"
      />

      <PricingSection tiers={mealsTiers} />

      <EmailCTA
        title="Start Planning Smarter"
        subtitle="Join the trainers who stopped guessing and started delivering results."
        buttonText="Get EvoFit Meals"
        productTag="evofit-meals-interest"
      />
    </>
  );
}
