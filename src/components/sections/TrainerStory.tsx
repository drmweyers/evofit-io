// Shared story blocks for the home, /trainer and /compare pages, in the copy-deck order:
// (1) own it forever, (2) the Fitness Agent upsell, (3) why not Everfit or Trainerize (page-specific).
// Every price comes from src/lib/pricing.ts (generated pricing.json); none is typed here.
import { PRICING_URL, AI_PAGE_URL, TRAINER_SIGNUP_URL } from "@/lib/cta";
import {
  TIER_KEYS,
  tierName,
  tierPrice,
  customExercises,
  clientsLabel,
  oneTimeList,
  aiPerMonth,
  cloudProPerMonth,
} from "@/lib/pricing";

type Tone = "light" | "dark";

const palette = {
  light: {
    section: "bg-white text-black",
    muted: "text-neutral-500",
    faint: "text-neutral-400",
    card: "border border-neutral-200 bg-white",
    rule: "border-neutral-200",
    primary: "bg-black text-white hover:bg-brand-accent hover:text-black",
    ghost: "text-black border-b border-black/30 hover:border-black",
  },
  dark: {
    section: "bg-black text-white",
    muted: "text-white/60",
    faint: "text-white/40",
    card: "border border-white/10 bg-white/5",
    rule: "border-white/10",
    primary: "bg-brand-accent text-black hover:bg-white",
    ghost: "text-white/70 border-b border-white/30 hover:text-white",
  },
} as const;

const eyebrow = "font-body text-xs uppercase tracking-[0.2em] text-brand-accent";
const h2 = "font-display text-4xl md:text-6xl font-bold uppercase tracking-wider leading-none mt-5 max-w-3xl";
const btn = "inline-block px-8 py-4 font-display font-semibold uppercase tracking-wider text-sm transition-colors duration-300";

/** (1) Own it forever. */
export function OwnItForever({
  tone = "light",
  id,
  showTiers = true,
}: {
  tone?: Tone;
  id?: string;
  /** false when the page shows its own detailed plan cards right after this block. */
  showTiers?: boolean;
}) {
  const c = palette[tone];
  return (
    <section id={id} className={`${c.section} py-24 md:py-32 border-t ${c.rule}`}>
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <p className={eyebrow}>Own it forever</p>
        <h2 className={h2}>Pay once. Own your coaching software.</h2>
        <p className={`font-body text-lg ${c.muted} font-light leading-relaxed max-w-2xl mt-6`}>
          One payment of {oneTimeList}. No required monthly fees. Your own custom exercises are included.
        </p>

        {showTiers && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {TIER_KEYS.map((t) => (
            <div
              key={t}
              className={`relative flex flex-col p-8 ${c.card} ${t === "professional" ? "ring-2 ring-brand-accent" : ""}`}
            >
              {t === "professional" && (
                <span className="absolute -top-3 left-6 bg-brand-accent text-black font-display text-xs font-semibold uppercase tracking-wider px-3 py-1">
                  Recommended
                </span>
              )}
              <h3 className="font-display text-lg font-semibold uppercase tracking-wider">{tierName(t)}</h3>
              <p className="font-display text-5xl font-bold mt-4">
                {tierPrice(t)}
                <small className={`font-body text-sm font-normal ${c.faint} tracking-normal ml-2`}>one-time</small>
              </p>
              <ul className={`mt-6 font-body text-sm ${c.muted}`}>
                <li className={`py-2 border-t ${c.rule}`}>{clientsLabel(t)}</li>
                <li className={`py-2 border-t ${c.rule}`}>
                  {customExercises(t) === "unlimited"
                    ? "Unlimited custom exercises"
                    : `${customExercises(t)} custom exercises included`}
                </li>
              </ul>
            </div>
          ))}
        </div>
        )}

        <ul className={`mt-10 space-y-2 font-body text-sm ${c.muted}`}>
          <li>1,300+ exercises with GIF demos, and room for your own.</li>
          <li>Log workouts from the web app on any phone.</li>
        </ul>

        <div className="flex flex-wrap items-center gap-7 mt-10">
          <a href={PRICING_URL} className={`${btn} ${c.primary}`}>
            See the three plans
          </a>
        </div>
        <p className={`font-body text-xs uppercase tracking-wider ${c.faint} mt-6`}>
          7-day money-back guarantee.{" "}
          <a href={TRAINER_SIGNUP_URL} className="underline underline-offset-4">
            Try it free for 30 days (1 client)
          </a>
          .
        </p>
      </div>
    </section>
  );
}

/** (2) The upsell: your own Fitness Agent, then Cloud Pro after it. */
export function FitnessAgent({ tone = "light" }: { tone?: Tone }) {
  const c = palette[tone];
  return (
    <section className={`${c.section} py-24 md:py-32 border-t ${c.rule}`}>
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <p className={eyebrow}>Optional, after you own it</p>
        <h2 className={h2}>Not just ChatGPT. Your own Fitness Agent, for {aiPerMonth}.</h2>
        <p className={`font-body text-lg ${c.muted} font-light leading-relaxed max-w-2xl mt-6`}>
          Connect EvoFit to Claude or ChatGPT and give it a daily job. Every morning your agent checks every
          client, flags who skipped, and drafts the messages. You read them and hit send. Plus make your own
          exercise GIFs (beta). One price, on top of any plan you own.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {[
            ["It works before you wake up.", "Set the morning briefing once; it runs every day."],
            ["Nobody slips through.", "Clients who missed a workout or a check-in are flagged before they drift."],
            ["You stay the coach.", "The agent drafts; you approve. Nothing reaches a client without your OK."],
            ["Plus your own exercise GIFs.", `Both in one ${aiPerMonth} add-on, on top of the plan you own.`],
          ].map(([title, body]) => (
            <div key={title} className={`p-7 ${c.card}`}>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wider">{title}</h3>
              <p className={`font-body text-sm ${c.muted} leading-relaxed mt-3`}>{body}</p>
            </div>
          ))}
        </div>

        <p className="font-body text-sm mt-8">Works in Claude and in ChatGPT.</p>

        <div className="flex flex-wrap items-center gap-7 mt-8">
          <a href={PRICING_URL} className={`${btn} ${c.primary}`}>
            Add AI for {aiPerMonth}
          </a>
          <a href={AI_PAGE_URL} className={`font-body text-sm pb-0.5 transition-colors ${c.ghost}`}>
            See what you can ask
          </a>
        </div>
        <p className={`font-body text-xs ${c.faint} leading-relaxed max-w-2xl mt-6`}>
          Needs a one-time plan first. The GIF creator is in beta, with limited monthly creations during the
          beta. Your agent runs inside Claude or ChatGPT (their own plan and scheduling limits apply).
        </p>

        <p className={`font-body text-sm ${c.muted} mt-10 pt-6 border-t ${c.rule} max-w-2xl`}>
          Need client photo uploads and push notifications? Cloud Pro is {cloudProPerMonth} (included in
          Enterprise).
        </p>
      </div>
    </section>
  );
}

/** (3) Why not Everfit or Trainerize: short version; the sourced table lives on /compare. */
export function WhyNotRent({ tone = "light" }: { tone?: Tone }) {
  const c = palette[tone];
  return (
    <section className={`${c.section} py-24 md:py-32 border-t ${c.rule}`}>
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <p className={eyebrow}>Why not Everfit or Trainerize?</p>
        <h2 className={h2}>What you pay over 3 years</h2>
        <p className={`font-body text-lg ${c.muted} font-light leading-relaxed max-w-2xl mt-6`}>
          They rent you the software every month. EvoFit is yours after one payment. Everfit&rsquo;s free plan is
          hard to beat at 5 clients, and we say so. Competitor prices come from their public pricing pages,
          checked October 21, 2026.
        </p>
        <div className="mt-8">
          <a href="/compare" className={`${btn} ${c.primary}`}>
            See the 3-year cost table
          </a>
        </div>
      </div>
    </section>
  );
}
