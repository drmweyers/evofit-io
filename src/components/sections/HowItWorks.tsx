import { MousePointerClick, Zap, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MousePointerClick,
    title: "Choose Your Tool",
    description:
      "Start with EvoFit Meals, EvoFit Trainer, or both. Pick the plan that fits your business size — from solo coaches to multi-trainer gyms.",
    color: "sky",
  },
  {
    number: "02",
    icon: Zap,
    title: "Set Up in Minutes",
    description:
      "No tech degree required. Add your branding, import your client list, and you're live. The AI does the heavy lifting on plans and programs.",
    color: "blue",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Grow Your Business",
    description:
      "Deliver better results to more clients without burning out. Track progress, retain clients longer, and look like the professional you are.",
    color: "purple",
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
  sky: {
    bg: "bg-sky-50",
    border: "border-sky-100",
    icon: "bg-sky-100 text-sky-600",
    badge: "text-sky-600",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    icon: "bg-blue-100 text-blue-600",
    badge: "text-blue-600",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-100",
    icon: "bg-purple-100 text-purple-600",
    badge: "text-purple-600",
  },
};

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">
            How it works
          </h2>
          <p className="text-xl text-slate-600 max-w-xl mx-auto">
            From setup to scaling — EvoFit fits into your workflow, not the other way around.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            const colors = colorMap[step.color];
            return (
              <div
                key={step.number}
                className={`relative rounded-2xl border ${colors.border} ${colors.bg} p-8`}
              >
                <div className={`text-6xl font-black opacity-10 ${colors.badge} mb-4 leading-none`}>
                  {step.number}
                </div>
                <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
