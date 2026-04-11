import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Dumbbell,
  Play,
  BarChart3,
  Calendar,
  Users,
  LineChart,
  Award,
  Layers,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "EvoFit Trainer — Professional Personal Training Platform",
  description:
    "1,344 exercises with GIFs, program builder, ACWR analytics, and client management. The professional training platform built for serious coaches.",
  openGraph: {
    title: "EvoFit Trainer — Professional Training Platform",
    description:
      "1,344 exercises with GIFs, smart program builder, ACWR analytics. Built for serious coaches.",
    url: "https://evofit.io/trainer",
  },
  alternates: {
    canonical: "https://evofit.io/trainer",
  },
};

const features = [
  {
    icon: Dumbbell,
    title: "1,344 Exercise Library",
    description:
      "Every exercise with GIF demonstrations. 10 body parts, 29 equipment types, 26 target muscles — searchable and filterable.",
  },
  {
    icon: Layers,
    title: "Smart Program Builder",
    description:
      "8 program types, 7 set types, 3 difficulty levels. Build progressive, personalized programs that keep clients engaged.",
  },
  {
    icon: Play,
    title: "Workout Tracking",
    description:
      "Clients log every set, rep, and weight. You see the data. Everyone stays accountable.",
  },
  {
    icon: LineChart,
    title: "ACWR Analytics",
    description:
      "Acute:Chronic Workload Ratio monitoring. Science-backed overtraining prevention. Red/amber/green safety indicators.",
  },
  {
    icon: Calendar,
    title: "Scheduling & Appointments",
    description:
      "5 appointment types built in. Manage your calendar and client sessions from one place.",
  },
  {
    icon: Users,
    title: "Client Management",
    description:
      "5 client status tiers from prospect to alumni. Track goals, progress notes, and session history.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Visualize strength gains, volume progression, and fitness improvements. Data that closes retention conversations.",
  },
  {
    icon: Award,
    title: "Professional Branding",
    description:
      "Your logo and colors on every program. Deliver branded workout plans that look like your own product.",
  },
];

const tiers = [
  {
    name: "Starter",
    price: "$199",
    period: "one-time",
    clients: "Up to 5 clients",
    features: ["1,344 exercise library", "Program builder", "Workout tracking", "Basic scheduling", "Email support"],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$299",
    period: "one-time",
    clients: "Up to 19 clients",
    features: ["Everything in Starter", "ACWR analytics", "Advanced scheduling", "Client management", "Priority support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$399",
    period: "one-time",
    clients: "Up to 50 clients",
    features: ["Everything in Professional", "Multi-trainer support", "Custom branding", "API access", "Dedicated support"],
    highlighted: false,
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
            description:
              "Professional personal training platform with 1,344 exercises, program builder, and ACWR analytics.",
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
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
              💪 EvoFit Trainer — Training Platform
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-slate-900 leading-tight mb-6">
              Fresh programs that keep{" "}
              <span className="text-gradient">clients coming back.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
              Same programs, bored clients, higher churn. EvoFit Trainer gives you 1,344 exercises, a professional program builder, and ACWR analytics to keep every client progressing — and loyal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://trainer.evofit.io/get-started"
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-blue-500/25"
              >
                Get EvoFit Trainer
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-lg hover:border-blue-300 transition-colors"
              >
                See Pricing
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 1,344 exercises with GIFs</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> ACWR safety monitoring</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Professional branding</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "1,344", label: "Exercises with GIFs" },
              { value: "10", label: "Body part categories" },
              { value: "8", label: "Program types" },
              { value: "29", label: "Equipment types" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-black mb-1">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain → Transformation */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl bg-red-50 border border-red-100 p-8">
              <h3 className="text-lg font-bold text-red-700 mb-4">❌ The common trainer problem</h3>
              <ul className="space-y-3 text-slate-700">
                {[
                  "Recycling the same 20 exercises every client",
                  "No data on whether clients are overtraining",
                  "Tracking client progress in messy spreadsheets",
                  "Clients leaving after 3-4 months of 'sameness'",
                  "Looking amateur compared to big-box gyms",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-green-50 border border-green-100 p-8">
              <h3 className="text-lg font-bold text-green-700 mb-4">✅ With EvoFit Trainer</h3>
              <ul className="space-y-3 text-slate-700">
                {[
                  "1,344 exercises — never run out of variety",
                  "ACWR keeps clients in the safe training zone",
                  "Everything in one professional dashboard",
                  "Progressive programs that maintain engagement",
                  "Branded platform that screams professional",
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
              Professional-grade tools for serious coaches
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.description}</p>
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
            <p className="text-xl text-slate-600">Start with 9 clients free of recurring fees — or go SaaS for unlimited everything.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl border-2 bg-white p-6 flex flex-col transition-all hover:shadow-lg ${
                  tier.highlighted ? "border-blue-600 ring-2 ring-blue-600/20" : "border-slate-100"
                }`}
              >
                {tier.highlighted && (
                  <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mx-auto mb-4">
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
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="https://trainer.evofit.io/get-started"
                  target="_blank"
                  rel="noopener"
                  className="block text-center py-2.5 rounded-xl text-white font-semibold text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white border border-blue-100 p-8 max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-lg text-slate-700 italic mb-6">
              &ldquo;The exercise library is insane. 1,344 exercises with GIF demos — I never run out of ideas for my clients. The ACWR tracking keeps them safe.&rdquo;
            </p>
            <div className="font-semibold text-slate-900">James K.</div>
            <div className="text-sm text-slate-500">Personal Trainer, London</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-black mb-4">Ready to run a professional training practice?</h2>
          <p className="text-blue-100 text-xl mb-8">
            Join trainers who deliver better programs, retain more clients, and look the part.
          </p>
          <Link
            href="https://trainer.evofit.io/get-started"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-white text-blue-700 font-black text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get EvoFit Trainer <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
