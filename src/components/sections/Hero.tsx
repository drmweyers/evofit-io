import Link from "next/link";
import { ArrowRight, Utensils, Dumbbell, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-16 pb-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-purple-100/40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-sky-50/30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Fitness Business Tools
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-none mb-6">
            The Complete{" "}
            <span className="text-gradient">Fitness Business</span>{" "}
            Platform
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            AI-powered nutrition tools + professional training software. Scale your coaching business without the admin chaos.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              href="/meals"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-orange-500 text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-sky-500/25"
            >
              <Utensils className="w-5 h-5" />
              Explore Meals
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/trainer"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-blue-500/25"
            >
              <Dumbbell className="w-5 h-5" />
              Explore Trainer
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-8 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              No recurring fees on lifetime plans
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Built for fitness professionals
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Ready in minutes
            </div>
          </div>
        </div>

        {/* Product preview cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-orange-400 flex items-center justify-center">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-slate-900">EvoFit Meals</div>
                <div className="text-xs text-slate-500">Nutrition Platform</div>
              </div>
            </div>
            <p className="text-sm text-slate-600">AI meal plan generator with 3,000+ recipes. Your clients get custom nutrition — you get the credit.</p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-slate-900">EvoFit Trainer</div>
                <div className="text-xs text-slate-500">Training Platform</div>
              </div>
            </div>
            <p className="text-sm text-slate-600">1,324 exercises with GIFs, program builder, ACWR analytics. Professional-grade tools for serious coaches.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
