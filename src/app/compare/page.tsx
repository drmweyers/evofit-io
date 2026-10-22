import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PRICING_URL } from "@/lib/cta";
import { OwnItForever, FitnessAgent } from "@/components/sections/TrainerStory";
import {
  TIER_KEYS,
  tierPrice,
  oneTimeSlashes,
  oneTimeList,
  aiPerMonth,
  cloudProPerMonth,
  usd,
  threeYear,
  withAiThreeYear,
  cloudProThreeYear,
} from "@/lib/pricing";

export const metadata: Metadata = {
  title: "EvoFit Trainer vs Trainerize vs Everfit — They Rent. You Own.",
  description:
    "Trainerize and Everfit bill you every month, for as long as you coach. EvoFit Trainer is a one-time purchase: unlimited clients from Professional, with your own Fitness Agent and Cloud Pro as optional extras.",
  openGraph: {
    title: "EvoFit Trainer vs Trainerize vs Everfit — They Rent. You Own.",
    description:
      "Trainerize and Everfit bill you every month, for as long as you coach. EvoFit Trainer is a one-time purchase.",
    url: "https://evofit.io/compare",
  },
  alternates: { canonical: "https://evofit.io/compare" },
};

const DATE_STAMP = "Competitor prices in this table are from their public pricing pages, checked October 21, 2026.";

// Competitor monthly prices as printed on their public pricing pages, checked October 21, 2026.
// Every 36-month total is computed (price x 36), never typed.
const costRows: {
  clients: number;
  evofitTier: (typeof TIER_KEYS)[number];
  everfitMonthly: number | null;
  everfitAnnual: number | null;
  trainerizeMonthly: number | null;
  trainerizeAnnual: number | null;
  trainerizeNote?: string;
}[] = [
  { clients: 5, evofitTier: "starter", everfitMonthly: 19, everfitAnnual: 16, trainerizeMonthly: 25, trainerizeAnnual: 23 },
  {
    clients: 20,
    evofitTier: "professional",
    everfitMonthly: 49,
    everfitAnnual: 41,
    trainerizeMonthly: null,
    trainerizeAnnual: null,
    trainerizeNote: "from $79/mo (up to 30 clients)",
  },
  { clients: 50, evofitTier: "professional", everfitMonthly: 95, everfitAnnual: 79, trainerizeMonthly: 135, trainerizeAnnual: null },
];

const threeYearCell = (monthly: number | null) => (monthly === null ? "n/a" : usd(threeYear(monthly)));
// Trainerize says annual billing saves 10%.
const trainerizeAnnual50 = Math.round(threeYear(135) * 0.9);

const tableRows: { label: string; evofit: string; check?: boolean; trainerize: string; everfit: string }[] = [
  {
    label: "Pricing model",
    evofit: `One-time \u2014 ${oneTimeSlashes}`,
    trainerize: "Monthly, priced by client count",
    everfit: "Monthly, priced by client count (free plan up to 5 clients)",
  },
  {
    label: "Nutrition & macros",
    evofit: "Macro targets and logging included",
    check: true,
    trainerize: "Advanced Nutrition add-on, $20\u201345/mo",
    everfit: "Meal Plans add-on, from $39/mo",
  },
  {
    label: "Client app",
    evofit: "Installable web app, no app-store download",
    trainerize: "Custom branded app available as an add-on",
    everfit: "Native iOS and Android apps",
  },
  {
    label: "Where they lead",
    evofit: "Not in our product today",
    trainerize: "Video coaching, custom branded apps",
    everfit: "Community forums, white label, payments and packages, meal-plan generators, automation",
  },
];

const features = [
  {
    eyebrow: "Program Builder",
    title: "Rotation programs that repeat week after week",
    body: (
      <>
        Build <strong className="text-white font-medium">7-day training cycles</strong> that rotate
        automatically, week after week. Start from the template library or from scratch, assign to
        one client or fifty, and adjust mid-cycle without rebuilding.
      </>
    ),
    image: "/screenshots/trainer-program-builder.png",
    alt: "EvoFit Trainer program builder showing a 7-day rotation training cycle being edited",
    width: 1440,
    height: 900,
    flip: false,
  },
  {
    eyebrow: "Client App",
    title: "The app your clients expect to be handed",
    body: (
      <>
        Four tabs, zero confusion: <strong className="text-white font-medium">Today</strong> for
        the session in front of them, <strong className="text-white font-medium">Coaching</strong>{" "}
        for programs and check-ins, <strong className="text-white font-medium">Inbox</strong> where
        in-app chat lives (for WhatsApp clients it opens a prefilled message you send from your own WhatsApp), and <strong className="text-white font-medium">You</strong>{" "}
        for their progress. Installable to the home screen.
      </>
    ),
    image: "/screenshots/client-today-tab.png",
    alt: "EvoFit client app Today tab showing the day's workout session on a phone",
    width: 1170,
    height: 2532,
    flip: true,
  },
  {
    eyebrow: "Scheduling",
    title: "Drag the week into place",
    body: (
      <>
        A weekly schedule editor with real{" "}
        <strong className="text-white font-medium">drag-and-drop</strong> — move sessions between
        days, copy a day and paste it across the week, restructure a client&rsquo;s split in
        seconds. Scheduling is part of the product, not an add-on.
      </>
    ),
    image: "/screenshots/trainer-schedule.png",
    alt: "EvoFit Trainer weekly schedule editor with drag-and-drop session planning",
    width: 1440,
    height: 900,
    flip: false,
  },
];

const faqs = [
  {
    q: "Is it really one-time?",
    a: `Yes. ${oneTimeList}, paid once. The only monthly charges are the optional Fitness Agent add-on (${aiPerMonth}) and Cloud Pro (${cloudProPerMonth}), and you can skip both.`,
  },
  {
    q: "What happens when I grow from 20 to 200 clients?",
    a: "Nothing. From Professional up there is no client cap, and the price never changes. Your growth is your upside — not a billing event.",
  },
  {
    q: "Can I migrate from Trainerize or Everfit?",
    a: "Yes. Bring your client list over with CSV import, then rebuild your programs fast with the template library and 7-day rotation cycles.",
  },
  {
    q: "Is there a free way to try it?",
    a: "There's a 30-day free trial with 1 client, so you can try the product before you pay anything.",
  },
];

const eyebrowClass =
  "font-body text-xs uppercase tracking-[0.2em] text-brand-accent";

export default function ComparePage() {
  return (
    <main className="bg-black text-white">
      {/* 1 · Hero */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 pt-32 pb-24 md:pt-44 md:pb-36">
        <p className={eyebrowClass}>EvoFit Trainer vs Trainerize vs Everfit</p>
        <h1 className="font-display font-bold uppercase tracking-wider leading-none text-6xl md:text-8xl lg:text-9xl mt-6 mb-9 max-w-4xl">
          They rent. <span className="text-white/40">You own.</span>
        </h1>
        <p className="font-body text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mb-11">
          Beyond Everfit&rsquo;s free 5-client plan, Trainerize and Everfit bill you every month, for as long as you coach.{" "}
          <strong className="text-white font-medium">
            EvoFit Trainer is a one-time purchase
          </strong>{" "}
          with unlimited clients from Professional. The Fitness Agent add-on and Cloud Pro are optional extras.
        </p>
        <div className="flex flex-wrap items-center gap-7">
          <a
            href={PRICING_URL}
            className="inline-block bg-brand-accent text-black px-8 py-4 font-display font-semibold uppercase tracking-wider text-sm hover:bg-white transition-colors duration-300"
          >
            See the three plans &rarr;
          </a>
          <a
            href="#the-math"
            className="font-body text-sm text-white/60 border-b border-white/30 pb-0.5 hover:text-white transition-colors"
          >
            Do the math first &darr;
          </a>
        </div>
      </section>

      <OwnItForever tone="dark" />
      <FitnessAgent tone="light" />

      {/* 2 · The math */}
      <section id="the-math" className="border-t border-white/10 py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="mb-14 md:mb-20">
            <p className={eyebrowClass}>01 &middot; The Math</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-wider leading-none mt-5 max-w-3xl">
              What you pay over 3 years
            </h2>
            <p className="font-body text-lg text-white/60 font-light leading-relaxed max-w-2xl mt-6">
              They rent you the software every month. EvoFit is yours after one payment.
            </p>
          </div>

          <div className="overflow-x-auto border border-white/10">
            <table className="w-full min-w-[880px] border-collapse text-left">
              <caption className="sr-only">36-month cost of the cheapest plan that fits each client count</caption>
              <thead>
                <tr className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                  <th scope="col" className="px-5 pt-6 pb-4">Clients</th>
                  <th scope="col" className="px-5 pt-6 pb-4 text-brand-accent bg-white/5">EvoFit one-time</th>
                  <th scope="col" className="px-5 pt-6 pb-4 text-brand-accent bg-white/5">EvoFit + AI add-on (36 mo)</th>
                  <th scope="col" className="px-5 pt-6 pb-4">Everfit, monthly billing</th>
                  <th scope="col" className="px-5 pt-6 pb-4">Everfit, annual billing</th>
                  <th scope="col" className="px-5 pt-6 pb-4">Trainerize, monthly billing</th>
                  <th scope="col" className="px-5 pt-6 pb-4">Trainerize, annual billing</th>
                </tr>
              </thead>
              <tbody>
                {costRows.map((r) => (
                  <tr key={r.clients} className="border-t border-white/10 font-body text-sm align-top">
                    <th scope="row" className="px-5 py-5 font-medium text-white">{r.clients}</th>
                    <td className="px-5 py-5 text-white bg-white/5">
                      {tierPrice(r.evofitTier)}
                      <span className="block text-xs text-white/40">
                        {r.evofitTier === "starter" ? "Starter" : "Professional"}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-white bg-white/5">{usd(withAiThreeYear(r.evofitTier))}</td>
                    <td className="px-5 py-5 text-white/60">
                      {r.clients === 5 ? (
                        <>
                          $0 on the free Starter plan
                          <span className="block text-xs text-white/40">{threeYearCell(r.everfitMonthly)} on Pro</span>
                        </>
                      ) : (
                        threeYearCell(r.everfitMonthly)
                      )}
                    </td>
                    <td className="px-5 py-5 text-white/60">
                      {threeYearCell(r.everfitAnnual)}
                      {r.clients === 5 && <span className="block text-xs text-white/40">on Pro</span>}
                    </td>
                    <td className="px-5 py-5 text-white/60">
                      {r.trainerizeNote ?? threeYearCell(r.trainerizeMonthly)}
                    </td>
                    <td className="px-5 py-5 text-white/60">
                      {r.trainerizeNote
                        ? "n/a"
                        : r.clients === 50
                          ? usd(trainerizeAnnual50)
                          : threeYearCell(r.trainerizeAnnual)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 space-y-2 font-body text-sm text-white/60 max-w-3xl">
            <p>
              Base plan only, the cheapest plan that fits that client count, no add-ons for any company. Totals
              are the monthly price times 36; annual totals assume the annual price holds for three years.
            </p>
            <p>
              EvoFit columns exclude Cloud Pro. Adding Cloud Pro to Starter or Professional adds{" "}
              {usd(cloudProThreeYear)} over 36 months.
            </p>
            <p>
              Everfit&rsquo;s free plan costs $0 at 5 clients, and we say so. EvoFit&rsquo;s case there is
              ownership, and room to grow to unlimited clients on Professional.
            </p>
            <p>Neither company&rsquo;s pricing page lists a ChatGPT or Claude connector.</p>
            <p className="text-white/40">{DATE_STAMP} Sources: trainerize.com/pricing and everfit.io/pricing.</p>
          </div>
        </div>
      </section>

      {/* 3 · Comparison table */}
      <section className="border-t border-white/10 py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="mb-14 md:mb-20">
            <p className={eyebrowClass}>02 &middot; Line by Line</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-wider leading-none mt-5 max-w-3xl">
              Everything they meter, itemized
            </h2>
          </div>

          <div className="overflow-x-auto border border-white/10">
            <table className="w-full min-w-[880px] border-collapse text-left">
              <thead>
                <tr>
                  <th scope="col" className="px-6 pt-6 pb-4" />
                  <th
                    scope="col"
                    className="px-6 pt-6 pb-4 font-body text-xs font-semibold uppercase tracking-[0.15em] text-brand-accent bg-white/5 border-x border-white/10"
                  >
                    EvoFit Trainer
                  </th>
                  <th
                    scope="col"
                    className="px-6 pt-6 pb-4 font-body text-xs font-semibold uppercase tracking-[0.15em] text-white/40"
                  >
                    Trainerize
                  </th>
                  <th
                    scope="col"
                    className="px-6 pt-6 pb-4 font-body text-xs font-semibold uppercase tracking-[0.15em] text-white/40"
                  >
                    Everfit
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.label} className="border-t border-white/10">
                    <th
                      scope="row"
                      className="px-6 py-5 font-body text-sm font-medium text-white align-top w-1/4"
                    >
                      {row.label}
                    </th>
                    <td className="px-6 py-5 font-body text-sm text-white align-top bg-white/5 border-x border-white/10 w-1/4">
                      {row.check && (
                        <span className="text-brand-accent mr-2" aria-hidden="true">
                          &#10003;
                        </span>
                      )}
                      {row.evofit}
                    </td>
                    <td className="px-6 py-5 font-body text-sm text-white/60 align-top w-1/4">
                      {row.trainerize}
                    </td>
                    <td className="px-6 py-5 font-body text-sm text-white/60 align-top w-1/4">
                      {row.everfit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4 · Editorial callout */}
      <section className="border-t border-white/10 py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <p className={eyebrowClass}>03 &middot; From the Floor</p>
          <p className="font-body text-lg md:text-xl font-medium max-w-2xl mt-13 pt-8 border-t border-white/10">
            Meal plans and advanced nutrition —{" "}
            <span className="text-white/60 font-light">paid add-ons over there.</span> Macro targets and logging are included here.
          </p>
        </div>
      </section>

      {/* 5 · Feature deep-dive */}
      <section className="border-t border-white/10 py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="mb-14 md:mb-20">
            <p className={eyebrowClass}>04 &middot; What You Actually Get</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-wider leading-none mt-5 max-w-3xl">
              Built for the way you already coach
            </h2>
          </div>

          {features.map((feature) => (
            <div
              key={feature.eyebrow}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center py-12 md:py-16 border-t border-white/10 first-of-type:border-t-0"
            >
              <div className={feature.flip ? "md:order-2" : ""}>
                <p className={eyebrowClass}>{feature.eyebrow}</p>
                <h3 className="font-display text-2xl md:text-4xl font-bold uppercase tracking-wider leading-tight mt-4 mb-5">
                  {feature.title}
                </h3>
                <p className="font-body text-white/60 font-light leading-relaxed max-w-lg">
                  {feature.body}
                </p>
              </div>
              <div
                className={`border border-white/10 bg-white/5 p-3 md:p-5 ${
                  feature.flip ? "md:order-1" : ""
                }`}
              >
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={feature.width}
                  height={feature.height}
                  className={`w-full h-auto ${
                    feature.width < feature.height ? "max-h-[560px] w-auto mx-auto" : ""
                  }`}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7 · FAQ */}
      <section className="border-t border-white/10 py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="mb-14 md:mb-20">
            <p className={eyebrowClass}>06 &middot; Straight Answers</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-wider leading-none mt-5 max-w-3xl">
              Asked before you did
            </h2>
          </div>

          <div className="border-t border-white/10 max-w-4xl">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border-b border-white/10">
                <summary className="flex items-baseline justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-display text-lg md:text-xl font-semibold uppercase tracking-wider">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-body font-normal text-2xl text-white/40 transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="font-body text-white/60 font-light leading-relaxed max-w-2xl pb-7">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8 · Final CTA */}
      <section className="border-t border-white/10 py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-wider leading-none max-w-3xl">
            Stop renting your coaching business
          </h2>
          <div className="flex flex-wrap items-center gap-7 mt-10">
            <a
              href={PRICING_URL}
              className="inline-block bg-brand-accent text-black px-8 py-4 font-display font-semibold uppercase tracking-wider text-sm hover:bg-white transition-colors duration-300"
            >
              Get EvoFit Trainer &rarr;
            </a>
            <Link
              href="/trainer"
              className="font-body text-sm text-white/60 border-b border-white/30 pb-0.5 hover:text-white transition-colors"
            >
              See all features
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
