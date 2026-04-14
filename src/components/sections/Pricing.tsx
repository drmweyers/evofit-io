import Link from "next/link";
import { Check, Zap, Utensils, Dumbbell } from "lucide-react";

type PricingTier = {
  name: string;
  price: string;
  period?: string;
  clients?: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
};

const mealsTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$199",
    period: "one-time",
    clients: "Up to 10 clients",
    features: [
      "AI meal plan generation",
      "3,000+ recipe library",
      "Basic branding",
      "Allergy filtering",
      "Email support",
    ],
    cta: "Get Started",
    href: "https://meals.evofit.io/get-started",
  },
  {
    name: "Pro",
    price: "$299",
    period: "one-time",
    clients: "Up to 50 clients",
    features: [
      "Everything in Starter",
      "White-label branding",
      "Progress tracking",
      "Client management",
      "Priority support",
    ],
    cta: "Go Pro",
    href: "https://meals.evofit.io/get-started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$399",
    period: "one-time",
    clients: "Unlimited clients",
    features: [
      "Everything in Pro",
      "Multi-trainer support",
      "Custom domain",
      "API access",
      "Dedicated support",
    ],
    cta: "Go Enterprise",
    href: "https://meals.evofit.io/get-started",
  },
];

const trainerTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$199",
    period: "one-time",
    clients: "Up to 5 clients",
    features: [
      "1,344 exercise library",
      "Program builder",
      "Workout tracking",
      "Basic scheduling",
      "Email support",
    ],
    cta: "Get Started",
    href: "https://trainer.evofit.io/get-started",
  },
  {
    name: "Pro",
    price: "$299",
    period: "one-time",
    clients: "Up to 19 clients",
    features: [
      "Everything in Starter",
      "ACWR analytics",
      "Advanced scheduling",
      "Client management",
      "Priority support",
    ],
    cta: "Go Pro",
    href: "https://trainer.evofit.io/get-started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$399",
    period: "one-time",
    clients: "Up to 50 clients",
    features: [
      "Everything in Pro",
      "Multi-trainer support",
      "Custom branding",
      "API access",
      "Dedicated support",
    ],
    cta: "Go Enterprise",
    href: "https://trainer.evofit.io/get-started",
  },
];

function PricingCard({
  tier,
  accent,
}: {
  tier: PricingTier;
  accent: "sky" | "blue";
}) {
  const accentClasses = {
    sky: {
      highlight: "border-sky-500 ring-2 ring-sky-500/20",
      badge: "bg-sky-500",
      cta: "bg-gradient-to-r from-sky-500 to-orange-500 hover:opacity-90",
      check: "text-sky-500",
    },
    blue: {
      highlight: "border-blue-600 ring-2 ring-blue-600/20",
      badge: "bg-blue-600",
      cta: "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90",
      check: "text-blue-600",
    },
  };

  const c = accentClasses[accent];

  return (
    <div
      className={`relative rounded-2xl border-2 bg-white p-6 flex flex-col transition-all hover:shadow-lg ${
        tier.highlighted ? c.highlight : "border-slate-100"
      }`}
    >
      {tier.highlighted && (
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-white text-xs font-bold ${c.badge}`}>
          Most Popular
        </div>
      )}
      <div className="mb-6">
        <div className="font-bold text-slate-900 mb-1">{tier.name}</div>
        <div className="flex items-end gap-1">
          <span className="text-3xl font-black text-slate-900">{tier.price}</span>
          <span className="text-slate-500 text-sm mb-1">{tier.period}</span>
        </div>
        {tier.clients && (
          <div className="text-xs text-slate-500 mt-1">{tier.clients}</div>
        )}
      </div>
      <ul className="space-y-2.5 mb-6 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
            <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${c.check}`} />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href={tier.href}
        target="_blank"
        rel="noopener"
        className={`block text-center py-2.5 rounded-xl text-white font-semibold text-sm transition-all ${c.cta}`}
      >
        {tier.cta}
      </Link>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">
            Transparent pricing. No surprises.
          </h2>
          <p className="text-xl text-slate-600 max-w-xl mx-auto">
            Pay once, own it forever. No monthly fees, no subscriptions, no surprises.
          </p>
        </div>

        {/* Meals Pricing */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-orange-400 flex items-center justify-center">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">EvoFit Meals</h3>
              <p className="text-slate-500 text-sm">Nutrition platform for coaches</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mealsTiers.map((tier) => (
              <PricingCard key={tier.name} tier={tier} accent="sky" />
            ))}
          </div>
        </div>

        {/* Trainer Pricing */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">EvoFit Trainer</h3>
              <p className="text-slate-500 text-sm">Training platform for coaches</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainerTiers.map((tier) => (
              <PricingCard key={tier.name} tier={tier} accent="blue" />
            ))}
          </div>
        </div>

        {/* Bundle Banner */}
        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-sky-600 p-10 text-white text-center">
          <div className="flex justify-center gap-3 mb-4">
            <Utensils className="w-8 h-8 opacity-80" />
            <Zap className="w-8 h-8" />
            <Dumbbell className="w-8 h-8 opacity-80" />
          </div>
          <h3 className="text-3xl font-black mb-3">Bundle both — save big</h3>
          <p className="text-blue-100 max-w-xl mx-auto mb-6 text-lg">
            Run the complete fitness business. Nutrition + Training together means your clients get everything — and you get one platform.
          </p>
          <p className="text-white/70 text-sm mb-6">
            Contact us for bundle pricing at{" "}
            <a href="mailto:hello@evofit.io" className="underline text-white">
              hello@evofit.io
            </a>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="https://meals.evofit.io/get-started"
              target="_blank"
              rel="noopener"
              className="px-6 py-3 rounded-xl bg-white text-sky-600 font-bold hover:bg-sky-50 transition-colors"
            >
              Start with Meals
            </Link>
            <Link
              href="https://trainer.evofit.io/get-started"
              target="_blank"
              rel="noopener"
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/30 text-white font-bold hover:bg-white/20 transition-colors"
            >
              Start with Trainer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
