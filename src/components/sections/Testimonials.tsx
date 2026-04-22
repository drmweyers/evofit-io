import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Online Nutrition Coach",
    avatar: "SM",
    rating: 5,
    text: "EvoFit Meals cut my meal plan creation time from 2 hours to 15 minutes. My clients can't tell the difference — except the plans are better.",
    product: "EvoFit Meals",
    color: "sky",
  },
  {
    name: "James K.",
    role: "Personal Trainer, London",
    avatar: "JK",
    rating: 5,
    text: "The exercise library is insane. 1,324 exercises with GIF demos — I never run out of ideas for my clients. The ACWR tracking keeps them safe.",
    product: "EvoFit Trainer",
    color: "blue",
  },
  {
    name: "Priya L.",
    role: "Gym Owner & Head Coach",
    avatar: "PL",
    rating: 5,
    text: "We run both Meals and Trainer for our 3-trainer team. Onboarding took one afternoon. Now it just runs.",
    product: "Both Products",
    color: "purple",
  },
];

const colorMap: Record<string, { bg: string; text: string; badge: string }> = {
  sky: { bg: "bg-sky-50", text: "text-sky-700", badge: "bg-sky-100 text-sky-700" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", badge: "bg-purple-100 text-purple-700" },
};

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">
            Coaches who switched to EvoFit
          </h2>
          <p className="text-xl text-slate-600 max-w-xl mx-auto">
            Real results from real fitness professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => {
            const colors = colorMap[t.color];
            return (
              <div
                key={t.name}
                className={`rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md transition-shadow`}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-700 leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center font-bold text-sm ${colors.text}`}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                      <div className="text-slate-500 text-xs">{t.role}</div>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
                    {t.product}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "1,324", label: "Exercises with GIFs" },
            { value: "3,000+", label: "Recipes in library" },
            { value: "2 min", label: "Avg. plan creation time" },
            { value: "5★", label: "Average rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center py-6 rounded-2xl bg-white border border-slate-100">
              <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
