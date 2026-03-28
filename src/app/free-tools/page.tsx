import type { Metadata } from "next";
import EmailCaptureForm from "@/components/ui/EmailCaptureForm";
import { Calculator, FileText, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Tools for Fitness Professionals — EvoFit",
  description:
    "Free macro calculator, 7-day meal plan starter kit, and personal trainer pricing guide. Built for coaches ready to level up.",
  openGraph: {
    title: "Free Tools for Fitness Professionals — EvoFit",
    description:
      "Free resources for nutrition coaches and personal trainers. Download now.",
    url: "https://evofit.io/free-tools",
  },
  alternates: {
    canonical: "https://evofit.io/free-tools",
  },
};

export default function FreeToolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-semibold mb-6">
            100% Free — No Credit Card Required
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-6">
            Free Tools for Fitness Professionals
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We want you to win — even before you&apos;re a paying customer. Download our resources and start delivering better results today.
          </p>
        </div>
      </section>

      {/* Macro Calculator */}
      <section id="macro-calculator" className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border-2 border-slate-100 bg-slate-50 p-10">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center flex-shrink-0">
                <Calculator className="w-7 h-7 text-sky-600" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-semibold mb-2">
                  Coming Soon
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">Free Macro Calculator</h2>
                <p className="text-slate-600 text-lg">
                  Calculate precise macros for any client — cutting, bulking, or maintaining. Factored for activity level, goals, and body composition.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {["Protein, Carbs & Fats", "Activity Level Adjusted", "Goal-Based Targets"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-slate-700 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  {item}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-slate-600 mb-4 font-medium">Get notified when it launches:</p>
              <EmailCaptureForm
                id="macro-calculator"
                placeholder="your@email.com"
                buttonText="Notify Me"
                successMessage="You're on the list! We'll email you when the macro calculator launches."
                tag="macro-calculator-waitlist"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7-Day Meal Plan Starter Kit */}
      <section id="meal-plan-kit" className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border-2 border-orange-100 bg-orange-50 p-10">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                <FileText className="w-7 h-7 text-orange-600" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-2">
                  Free PDF Download
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">7-Day Meal Plan Starter Kit</h2>
                <p className="text-slate-600 text-lg">
                  A professionally designed 7-day template you can customize for any client. Save hours of planning from day one.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                "7 days of balanced meals with macros",
                "Customizable for any dietary preference",
                "Includes snacks and meal timing",
                "Shopping list template included",
                "Printable and client-ready format",
                "Built by nutrition professionals",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-slate-700 text-sm">
                  <span className="text-green-500">✓</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-orange-100 p-6">
              <p className="text-slate-600 mb-1 font-medium">Where should we send it?</p>
              <p className="text-slate-500 text-sm mb-4">Enter your email and we&apos;ll send the PDF straight to your inbox.</p>
              <EmailCaptureForm
                id="meal-plan-kit"
                placeholder="your@email.com"
                buttonText="Send Me the Kit"
                successMessage="Check your inbox! Your 7-Day Meal Plan Starter Kit is on its way."
                tag="meal-plan-kit"
                accent="orange"
              />
              <p className="text-xs text-slate-400 mt-3">No spam. Unsubscribe any time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Trainer Pricing Guide */}
      <section id="pricing-guide" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border-2 border-purple-100 bg-purple-50 p-10">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-2">
                  Free PDF Download
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">Personal Trainer Pricing Guide</h2>
                <p className="text-slate-600 text-lg">
                  Exactly what to charge for 1-on-1 sessions, online coaching, and programs. With market benchmarks and positioning tips.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                "2024 market rate benchmarks",
                "1-on-1 vs. online coaching rates",
                "How to package and price programs",
                "When and how to raise your rates",
                "Positioning tips that justify premium pricing",
                "Scripts for the pricing conversation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-slate-700 text-sm">
                  <span className="text-green-500">✓</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-purple-100 p-6">
              <p className="text-slate-600 mb-1 font-medium">Where should we send it?</p>
              <p className="text-slate-500 text-sm mb-4">Enter your email and we&apos;ll send the PDF straight to your inbox.</p>
              <EmailCaptureForm
                id="pricing-guide"
                placeholder="your@email.com"
                buttonText="Send Me the Guide"
                successMessage="Check your inbox! Your Personal Trainer Pricing Guide is on its way."
                tag="pricing-guide"
                accent="purple"
              />
              <p className="text-xs text-slate-400 mt-3">No spam. Unsubscribe any time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upsell section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">Ready for the full platform?</h2>
          <p className="text-blue-100 text-lg mb-8">
            These free tools give you a taste. EvoFit Meals and EvoFit Trainer deliver the whole package — AI meal plans, exercise library, client management, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/meals"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-white text-sky-600 font-bold hover:bg-sky-50 transition-colors"
            >
              Explore EvoFit Meals <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/trainer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-white/10 border border-white/30 text-white font-bold hover:bg-white/20 transition-colors"
            >
              Explore EvoFit Trainer <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
