import {
  Brain,
  BookOpen,
  Users,
  BarChart3,
  Palette,
  Shield,
  Calendar,
  Dumbbell,
  Scale,
  Play,
  LineChart,
  Award,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Meal Plan Generation",
    description: "Build custom nutrition plans in 2 minutes. Dietary restrictions, allergies, macro targets — handled.",
    product: "Meals",
    color: "sky",
  },
  {
    icon: BookOpen,
    title: "3,000+ Recipe Library",
    description: "Professionally curated recipes across every dietary preference. Always growing.",
    product: "Meals",
    color: "sky",
  },
  {
    icon: Dumbbell,
    title: "1,324 Exercise Library",
    description: "Every exercise with GIF demonstrations. 10 body parts, 29 equipment types, 26 target muscles.",
    product: "Trainer",
    color: "blue",
  },
  {
    icon: Play,
    title: "Program Builder",
    description: "Build progressive programs with 8 program types and 7 set types. Your clients stay challenged.",
    product: "Trainer",
    color: "blue",
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Track all your clients, their status, progress, and goals — from one dashboard.",
    product: "Both",
    color: "purple",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Data-driven coaching. Track body metrics, workout loads, and nutrition adherence over time.",
    product: "Both",
    color: "purple",
  },
  {
    icon: LineChart,
    title: "ACWR Training Monitoring",
    description: "Track acute:chronic workload ratio to prevent overtraining and optimize performance.",
    product: "Trainer",
    color: "blue",
  },
  {
    icon: Scale,
    title: "Macro Precision",
    description: "Gram-level macro tracking with automatic adjustments for training days vs rest days.",
    product: "Meals",
    color: "sky",
  },
  {
    icon: Palette,
    title: "White-Label Branding",
    description: "Your logo, your colors, your brand. Deliver professional plans that look like you built them.",
    product: "Both",
    color: "purple",
  },
  {
    icon: Calendar,
    title: "Scheduling & Appointments",
    description: "5 appointment types, built-in scheduling. Your calendar and your clients — in sync.",
    product: "Trainer",
    color: "blue",
  },
  {
    icon: Shield,
    title: "5 Client Status Tiers",
    description: "From prospect to alumni — manage your entire client lifecycle in one place.",
    product: "Both",
    color: "purple",
  },
  {
    icon: Award,
    title: "3 Difficulty Levels",
    description: "Beginner to advanced programming. Meet every client where they are.",
    product: "Trainer",
    color: "blue",
  },
];

const colorMap: Record<string, { badge: string; icon: string }> = {
  sky: { badge: "bg-sky-100 text-sky-700", icon: "text-sky-500" },
  blue: { badge: "bg-blue-100 text-blue-700", icon: "text-blue-500" },
  purple: { badge: "bg-purple-100 text-purple-700", icon: "text-purple-500" },
};

export default function FeaturesGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">
            Everything you need to run a professional coaching business
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Built for trainers who want to spend more time coaching and less time on admin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            const colors = colorMap[feature.color];
            return (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors.badge}`}>
                    {feature.product}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
