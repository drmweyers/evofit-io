import type { Metadata } from "next";
import HeroHome from "@/components/sections/HeroHome";
import FullWidthImage from "@/components/sections/FullWidthImage";
import EmailCTA from "@/components/sections/EmailCTA";
import Image from "next/image";

export const metadata: Metadata = {
  title: "EvoFit — The Platform for Elite Fitness Professionals",
  description:
    "EvoFit powers the world's most ambitious fitness professionals with AI-driven workout programming and nutrition planning.",
  alternates: { canonical: "https://evofit.io" },
};

const stats = [
  { value: "10,000+", label: "Exercises" },
  { value: "2,500+", label: "Trainers" },
  { value: "50,000+", label: "Meals Generated" },
  { value: "300%", label: "Average Client Growth" },
];

export default function HomePage() {
  return (
    <>
      <HeroHome />

      {/* One Platform Section */}
      <section className="bg-white py-24 md:py-32 border-t border-neutral-200 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-8 lg:px-16 text-center">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-black uppercase tracking-[0.06em] leading-none mb-10">
            One Platform.<br />Limitless Potential.
          </h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto mb-10" />
          <p className="font-body text-xl md:text-2xl font-light text-neutral-500 leading-relaxed max-w-2xl mx-auto">
            EvoFit powers the world&apos;s most ambitious fitness professionals. We don&apos;t just build software — we build careers.
          </p>
        </div>
      </section>

      {/* EvoFit Trainer Showcase */}
      <FullWidthImage
        image="/images/trainer-coaching.png"
        alt="Professional trainer coaching a client in a premium gym"
        label="Workout Programming"
        title={"EvoFit\nTrainer"}
        description="Create programs that clients rave about. Manage your roster with precision. Build your reputation on results, not promises."
        cta={{ text: "Discover Trainer \u2192", href: "/trainer" }}
        align="left"
        gradient="left"
      />

      {/* EvoFit Meals Showcase */}
      <FullWidthImage
        image="/images/meals-overhead.png"
        alt="Professional meal prep with vibrant colors"
        label="Nutrition Planning"
        title={"EvoFit\nMeals"}
        description="Nutrition plans that actually work. Custom macros, smart recipes, happy clients. Your expertise scaled infinitely."
        cta={{ text: "Discover Meals \u2192", href: "/meals" }}
        align="right"
        gradient="right"
      />

      {/* Stats Section */}
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/lifestyle-ropes.png"
            alt="Stats background"
            fill
            className="object-cover opacity-30"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 divide-white/10 md:divide-x">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center px-4 py-6">
                  <div className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-accent leading-none tracking-wider">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs sm:text-sm text-white/70 uppercase tracking-[0.15em] mt-3">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-black py-32 md:py-44">
        <div className="max-w-5xl mx-auto px-8 lg:px-16 text-center">
          <span className="text-8xl md:text-[10rem] text-brand-accent font-serif leading-none block mb-4">
            &ldquo;
          </span>
          <blockquote className="font-body text-2xl md:text-4xl font-light text-white leading-relaxed mb-16 -mt-12">
            I went from 12 clients to 87 in six months. EvoFit didn&apos;t just change my business — it changed my life.
          </blockquote>
          <cite className="not-italic">
            <span className="font-display text-lg font-semibold text-white uppercase tracking-[0.15em] block">
              Marcus Chen
            </span>
            <span className="font-body text-sm text-white/50 mt-2 block uppercase tracking-[0.1em]">
              Elite Performance Coach
            </span>
          </cite>
        </div>
      </section>

      {/* Scale Section */}
      <FullWidthImage
        image="/images/lifestyle-class.png"
        alt="Group fitness class in modern boutique gym"
        label="Built For Scale"
        title={"From Solo Trainer\nTo Fitness Empire"}
        description="Whether you train one client or one thousand, EvoFit scales with your ambition. No limits. No compromises."
        cta={{ text: "Start Building \u2192", href: "/#get-started" }}
        align="left"
        gradient="left"
      />

      {/* CTA */}
      <EmailCTA
        title="Two Steps, and You're In."
        subtitle="Join the trainers who stopped making excuses and started making money."
        buttonText="Start Building"
      />
    </>
  );
}
