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
      "Full recipe library with nutrition data",
      "Up to 5 active clients",
      "Automated macro calculations",
      "Meal plan PDF exports",
      "Email support",
    ],
    cta: "Get Started — $199",
    href: "https://evofitmeals.com/get-started",
  },
  {
    name: "Professional",
    price: "$299",
    period: "One-Time Payment",
    features: [
      "Up to 19 active clients",
      "Custom branding on meal plans",
      "Progress tracking tools",
      "Advanced analytics suite",
      "Priority support",
    ],
    cta: "Upgrade to Professional — $299",
    href: "https://evofitmeals.com/get-started",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Elite",
    price: "$399",
    period: "One-Time Payment",
    features: [
      "Everything in Professional, plus",
      "White-label platform",
      "API access & integrations",
      "Up to 50 active clients",
      "Dedicated support manager",
    ],
    cta: "Get Elite — $399",
    href: "https://evofitmeals.com/get-started",
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
            url: "https://evofitmeals.com",
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
        align="left"
        gradient="left"
      />

      {/* CTA after Recipe Library */}
      <div className="bg-black py-10 text-center border-b border-white/10">
        <a
          href="https://evofitmeals.com/get-started"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#F97316] text-black font-bold rounded-full hover:bg-white transition-colors text-lg"
        >
          Explore the recipe library <span aria-hidden="true">&#8594;</span>
        </a>
      </div>

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
        align="right"
        gradient="right"
      />

      {/* CTA after Macro Balancing */}
      <div className="bg-black py-10 text-center border-b border-white/10">
        <p className="font-body text-white/60 text-sm uppercase tracking-[0.15em] mb-4">
          Perfect macros. Every client. Every time.
        </p>
        <a
          href="https://evofitmeals.com/get-started"
          className="text-[#F97316] font-semibold text-lg hover:text-white transition-colors"
        >
          Try it free &#8594;
        </a>
      </div>

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
        align="left"
        gradient="left"
      />

      {/* CTA after Client Management */}
      <div className="bg-black py-10 text-center border-b border-white/10">
        <a
          href="https://evofitmeals.com/get-started"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#F97316] text-black font-bold rounded-full hover:bg-white transition-colors text-lg"
        >
          Start managing clients smarter <span aria-hidden="true">&#8594;</span>
        </a>
      </div>

      <FullWidthImage
        image="/images/brand-exterior.png"
        alt="Premium fitness facility"
        label="Coming Soon"
        title="AI Meal Plan Generation"
        description="AI-powered meal plans customized to every client. Unlimited variations. Smart macro auto-balancing."
        bullets={[
          "AI-generated meal plans in seconds",
          "Unlimited recipe variations",
          "Stack on any tier — coming soon",
        ]}
        align="right"
        gradient="right"
      />

      {/* Strong CTA bridge to pricing */}
      <div className="bg-black py-16 text-center border-b border-white/10">
        <p className="font-body text-white/50 text-sm uppercase tracking-[0.15em] mb-6">
          Ready to deliver results your clients talk about?
        </p>
        <a
          href="https://evofitmeals.com/get-started"
          className="inline-flex items-center gap-2 px-10 py-5 bg-[#F97316] text-black font-bold rounded-full hover:bg-white transition-colors text-xl"
        >
          Get lifetime access <span aria-hidden="true">&#8594;</span>
        </a>
        <p className="font-body text-white/30 text-sm mt-4">
          One-time payment. No subscriptions. No surprises.
        </p>
      </div>

      <PricingSection tiers={mealsTiers} />

      <EmailCTA
        title="Start Planning Smarter"
        subtitle="Join the trainers who stopped guessing and started delivering results."
        buttonText="Get EvoFit Meals"
      />
    </>
  );
}
