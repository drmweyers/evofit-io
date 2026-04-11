import Link from "next/link";
import { ArrowRight, Check, Utensils, Dumbbell } from "lucide-react";

const mealsFeatures = [
  "AI meal plan generation in minutes",
  "3,000+ recipe library",
  "Custom branding & white-label",
  "Allergy & dietary filtering",
  "Client progress tracking",
  "Macro precision tools",
];

const trainerFeatures = [
  "1,344 exercises with GIF demos",
  "Program builder & templates",
  "Workout tracking & analytics",
  "ACWR training load monitoring",
  "Client scheduling & management",
  "8 program types, 7 set types",
];

export default function ProductShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">
            Two platforms. One mission.
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Whether you&apos;re a nutrition coach, personal trainer, or both — EvoFit has the tools that make you look like a pro.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Meals Card */}
          <div className="group relative rounded-3xl border-2 border-sky-100 bg-gradient-to-br from-sky-50 to-orange-50 p-8 hover:border-sky-300 transition-all hover:shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-orange-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
                <Utensils className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">EvoFit Meals</h3>
                <p className="text-sky-600 font-semibold">Nutrition Platform</p>
              </div>
            </div>

            <p className="text-slate-700 mb-6 leading-relaxed">
              You&apos;re a trainer, not a dietitian — but your clients expect both. EvoFit Meals bridges that gap. AI builds the nutrition plan. You add the coaching magic.
            </p>

            <ul className="space-y-3 mb-8">
              {mealsFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-sky-600" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">Starting from</div>
                <div className="text-3xl font-black text-slate-900">$199</div>
                <div className="text-sm text-slate-500">one-time or $39/mo</div>
              </div>
              <Link
                href="/meals"
                className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-orange-500 text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-sky-500/20"
              >
                See Details
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Trainer Card */}
          <div className="group relative rounded-3xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 p-8 hover:border-blue-300 transition-all hover:shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Dumbbell className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">EvoFit Trainer</h3>
                <p className="text-blue-600 font-semibold">Training Platform</p>
              </div>
            </div>

            <p className="text-slate-700 mb-6 leading-relaxed">
              Same programs, bored clients, higher churn. EvoFit Trainer gives you 1,344 exercises and a program builder that keeps clients coming back — week after week.
            </p>

            <ul className="space-y-3 mb-8">
              {trainerFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">Starting from</div>
                <div className="text-3xl font-black text-slate-900">$149</div>
                <div className="text-sm text-slate-500">one-time or $29/mo</div>
              </div>
              <Link
                href="/trainer"
                className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-500/20"
              >
                See Details
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bundle CTA */}
        <div id="bundle" className="mt-10 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
          <h3 className="text-2xl font-black mb-2">Get both and save</h3>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Run the complete nutrition + training business. Bundle EvoFit Meals + Trainer and scale faster.
          </p>
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-bold hover:bg-blue-50 transition-colors"
          >
            View Bundle Pricing <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
