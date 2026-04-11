import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Brain,
  BookOpen,
  Users,
  Palette,
  Scale,
  Shield,
  BarChart3,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "EvoFit Meals — AI Meal Plan Generator for Nutrition Coaches",
  description:
    "Generate custom meal plans in 2 minutes with AI. 3,000+ recipes, allergy filtering, white-label branding. The nutrition platform built for fitness professionals.",
  openGraph: {
    title: "EvoFit Meals — AI Meal Plan Generator",
    description:
      "Build professional meal plans in minutes with AI. 3,000+ recipes, custom branding, client management.",
    url: "https://evofit.io/meals",
  },
  alternates: {
    canonical: "https://evofit.io/meals",
  },
};

const features = [
  {
    icon: Brain,
    title: "AI Meal Plan Generation",
    description:
      "Describe your client's goals, restrictions, and preferences. The AI assembles a complete weekly meal plan in 2 minutes. You review, tweak, and deliver.",
  },
  {
    icon: BookOpen,
    title: "3,000+ Recipe Library",
    description:
      "Professionally curated recipes covering every dietary preference — keto, vegan, Mediterranean, high-protein, and more. Always growing.",
  },
  {
    icon: Scale,
    title: "Macro Precision",
    description:
      "Gram-level accuracy. Set macro targets by percentage or grams. Automatically adjusts for training days vs. rest days.",
  },
  {
    icon: Shield,
    title: "Allergy & Dietary Filtering",
    description:
      "Celiac, nut allergy, lactose intolerance, halal, kosher — filter it all. No more manual recipe checking.",
  },
  {
    icon: Palette,
    title: "White-Label Branding",
    description:
      "Your logo, your colors, your brand. Clients receive meal plans that look like your own product. Pro and Enterprise only.",
  },
  {
    icon: Users,
    title: "Client Management",
    description:
      "Track all clients, their goals, dietary needs, and progress from one dashboard. Know exactly where each client stands.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Log body metrics, adherence rates, and outcomes over time. Data-backed coaching conversations that build trust.",
  },
  {
    icon: BookOpen,
    title: "Grocery Lists",
    description:
      "Auto-generated shopping lists from any meal plan. Clients love it. You save another 20 minutes per client.",
  },
];

const tiers = [
  {
    name: "Starter",
    price: "$199",
    period: "one-time",
    clients: "Up to 9 clients",
    features: ["AI meal plan generation", "3,000+ recipe library", "Basic branding", "Allergy filtering", "Email support"],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$299",
    period: "one-time",
    clients: "Up to 20 clients",
    features: ["Everything in Starter", "White-label branding", "Progress tracking", "Client management", "Priority support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$399",
    period: "one-time",
    clients: "Unlimited clients",
    features: ["Everything in Professional", "Multi-trainer support", "Custom domain", "API access", "Dedicated support"],
    highlighted: false,
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
            description:
              "AI-powered meal plan generator for nutrition coaches and personal trainers.",
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: "199",
              name: "Starter License",
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-orange-50 pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold mb-6">
              🥗 EvoFit Meals — Nutrition Platform
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-slate-900 leading-tight mb-6">
              Your clients expect{" "}
              <span className="text-gradient-orange">nutrition coaching.</span>{" "}
              Now you can deliver it.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
              You&apos;re a trainer, not a dietitian — but your clients expect both. EvoFit Meals generates custom AI meal plans in 2 minutes. You look like you have a nutrition team on staff.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://evofitmeals.com/get-started"
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-orange-500 text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-sky-500/25"
              >
                Get EvoFit Meals
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-lg hover:border-sky-300 transition-colors"
              >
                See Pricing
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 3,000+ recipes</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> AI-generated plans</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Your branding</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pain → Transformation */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl bg-red-50 border border-red-100 p-8">
              <h3 className="text-lg font-bold text-red-700 mb-4">❌ Without EvoFit Meals</h3>
              <ul className="space-y-3 text-slate-700">
                {[
                  "2 hours per client creating meal plans",
                  "Manually checking every food for allergies",
                  "Generic templates that don't fit client goals",
                  "Turning away nutrition coaching inquiries",
                  "Losing clients who want the full package",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-green-50 border border-green-100 p-8">
              <h3 className="text-lg font-bold text-green-700 mb-4">✅ With EvoFit Meals</h3>
              <ul className="space-y-3 text-slate-700">
                {[
                  "Custom meal plans in 2 minutes flat",
                  "AI handles all allergy & dietary filtering",
                  "Plans personalized to each client's exact goals",
                  "Offer full nutrition coaching with confidence",
                  "Keep clients longer with better results",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              Everything a nutrition coach needs
            </h2>
            <p className="text-xl text-slate-600 max-w-xl mx-auto">
              Built specifically for personal trainers and nutrition coaches who want to deliver professional results.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-sky-500" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">{f.description}</p>
                  <Link href="https://evofitmeals.com/get-started" target="_blank" rel="noopener" className="text-sm font-semibold text-sky-500 hover:text-orange-500 transition-colors">
                    Get started &rarr;
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Simple pricing</h2>
            <p className="text-xl text-slate-600">Pay once, own it forever. No monthly fees. No subscriptions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl border-2 bg-white p-6 flex flex-col transition-all hover:shadow-lg ${
                  tier.highlighted ? "border-sky-500 ring-2 ring-sky-500/20" : "border-slate-100"
                }`}
              >
                {tier.highlighted && (
                  <div className="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mx-auto mb-4">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <div className="font-bold text-slate-900 mb-1">{tier.name}</div>
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-black text-slate-900">{tier.price}</span>
                    <span className="text-slate-500 text-sm mb-1">{tier.period}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{tier.clients}</div>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-sky-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="https://evofitmeals.com/get-started"
                  target="_blank"
                  rel="noopener"
                  className="block text-center py-2.5 rounded-xl text-white font-semibold text-sm bg-gradient-to-r from-sky-500 to-orange-500 hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white border border-sky-100 p-8 max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-lg text-slate-700 italic mb-6">
              &ldquo;EvoFit Meals cut my meal plan creation time from 2 hours to 15 minutes. My clients can&apos;t tell the difference — except the plans are better.&rdquo;
            </p>
            <div className="font-semibold text-slate-900">Sarah M.</div>
            <div className="text-sm text-slate-500">Online Nutrition Coach</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-sky-500 to-orange-500 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-black mb-4">Ready to level up your nutrition coaching?</h2>
          <p className="text-sky-100 text-xl mb-8">
            Stop spending hours on meal plans. Start building the practice you deserve.
          </p>
          <Link
            href="https://evofitmeals.com/get-started"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-white text-sky-600 font-black text-lg hover:bg-sky-50 transition-colors shadow-lg"
          >
            Get EvoFit Meals <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
