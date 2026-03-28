import Link from "next/link";
import { Calculator, FileText, DollarSign, ArrowRight } from "lucide-react";

const magnets = [
  {
    icon: Calculator,
    title: "Free Macro Calculator",
    description:
      "Calculate precise macros for any client — cutting, bulking, or maintaining. Factored for activity level and goals.",
    tag: "Coming Soon",
    tagColor: "bg-slate-100 text-slate-600",
    href: "/free-tools#macro-calculator",
    accent: "border-sky-100 bg-sky-50",
    iconBg: "bg-sky-100 text-sky-600",
    cta: "Get Notified",
    disabled: true,
  },
  {
    icon: FileText,
    title: "7-Day Meal Plan Starter Kit",
    description:
      "A professionally designed 7-day template you can customize for any client. Save hours of planning from day one.",
    tag: "Free PDF",
    tagColor: "bg-green-100 text-green-700",
    href: "/free-tools#meal-plan-kit",
    accent: "border-orange-100 bg-orange-50",
    iconBg: "bg-orange-100 text-orange-600",
    cta: "Download Free",
    disabled: false,
  },
  {
    icon: DollarSign,
    title: "Personal Trainer Pricing Guide",
    description:
      "Exactly what to charge for 1-on-1, online coaching, and programs. With market benchmarks and positioning tips.",
    tag: "Free PDF",
    tagColor: "bg-green-100 text-green-700",
    href: "/free-tools#pricing-guide",
    accent: "border-purple-100 bg-purple-50",
    iconBg: "bg-purple-100 text-purple-600",
    cta: "Download Free",
    disabled: false,
  },
];

export default function LeadMagnets() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-semibold mb-4">
            100% Free
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">
            Free Tools for Fitness Professionals
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We want you to win — even before you&apos;re a paying customer. Download our resources and start delivering better results today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {magnets.map((magnet) => {
            const Icon = magnet.icon;
            return (
              <div
                key={magnet.title}
                className={`rounded-2xl border-2 p-8 ${magnet.accent} flex flex-col`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl ${magnet.iconBg} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${magnet.tagColor}`}>
                    {magnet.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{magnet.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-8 flex-1">{magnet.description}</p>
                <Link
                  href={magnet.href}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                    magnet.disabled
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-slate-900 text-white hover:bg-slate-700"
                  }`}
                >
                  {magnet.cta}
                  {!magnet.disabled && <ArrowRight className="w-4 h-4" />}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/free-tools"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            See all free tools and resources
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
