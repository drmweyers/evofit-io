"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What's the difference between EvoFit Meals and EvoFit Trainer?",
    a: "EvoFit Meals is designed for nutrition professionals and coaches who create meal plans and track nutrition. EvoFit Trainer is for personal trainers who build workout programs, track exercise performance, and manage training loads. Many coaches use both together for a complete coaching business.",
  },
  {
    q: "Do I need to pay monthly or is there a one-time option?",
    a: "Both! EvoFit Meals offers one-time licenses starting at $199, and EvoFit Trainer starts at $149 one-time. We also offer SaaS plans ($39/mo for Meals, $29/mo for Trainer) if you prefer always-current hosted software with no server management.",
  },
  {
    q: "Can I use my own branding with EvoFit?",
    a: "Yes — Pro and Enterprise plans for both products include white-label branding. Add your logo, choose your colors, and deliver plans that look like your own product. Your clients see your brand, not ours.",
  },
  {
    q: "How many clients can I have?",
    a: "It depends on your plan. Starter plans support 9-10 clients. Pro plans support up to 50 clients. Enterprise and SaaS plans support unlimited clients. You can upgrade at any time.",
  },
  {
    q: "Is there a free trial?",
    a: "We offer free resources (meal plan templates, pricing guides) so you can evaluate our approach before purchasing. Contact us at hello@evofit.io for demo access if you're evaluating the Enterprise tier.",
  },
  {
    q: "What does the AI actually do in EvoFit Meals?",
    a: "The AI generates customized meal plans based on your client's dietary restrictions, allergies, macro targets, preferences, and goals. It pulls from a 3,000+ recipe library and assembles complete weekly plans in minutes. You review and adjust — the AI builds the foundation, you add the coaching expertise.",
  },
  {
    q: "What is ACWR in EvoFit Trainer?",
    a: "ACWR stands for Acute:Chronic Workload Ratio — a science-backed method to monitor training load and prevent overtraining injuries. EvoFit Trainer automatically calculates it based on your client's logged workouts, giving you a data-driven red/amber/green safety indicator.",
  },
  {
    q: "Can I buy both products together?",
    a: "Yes! Many coaches use both platforms together. Reach out to us at hello@evofit.io for bundle pricing. Running both gives you a complete nutrition + training coaching platform.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-slate-600">
            Still have questions?{" "}
            <a href="mailto:hello@evofit.io" className="text-blue-600 hover:underline">
              Email us
            </a>
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-100 overflow-hidden hover:border-slate-200 transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 focus:outline-none"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-slate-900">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-50">
                  <div className="pt-4">{faq.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
