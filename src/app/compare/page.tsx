import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TRAINER_SIGNUP_URL } from "@/lib/cta";

export const metadata: Metadata = {
  title: "EvoFit Trainer vs Trainerize vs Everfit — They Rent. You Own.",
  description:
    "Trainerize and Everfit charge you per client, forever. EvoFit Trainer is a one-time purchase — unlimited clients, everything included. Prices compared as of June 10, 2026.",
  openGraph: {
    title: "EvoFit Trainer vs Trainerize vs Everfit — They Rent. You Own.",
    description:
      "Trainerize and Everfit charge you per client, forever. EvoFit Trainer is a one-time purchase.",
    url: "https://evofit.io/compare",
  },
  alternates: { canonical: "https://evofit.io/compare" },
};

const DATE_STAMP = "Prices compared as of June 10, 2026.";

const mathRows = [
  {
    name: "Trainerize",
    sub: "~$200 / month",
    figure: "~$2,400",
    per: "/yr",
    note: "Pro 100 plan plus nutrition, business, and payments add-ons.",
    evofit: false,
  },
  {
    name: "Everfit",
    sub: "~$217 / month",
    figure: "~$2,600",
    per: "/yr",
    note: "Pro 100 plan plus meal plans, payments, and Autoflow.",
    evofit: false,
  },
  {
    name: "EvoFit Trainer",
    sub: "Professional",
    figure: "$299",
    per: " once",
    note: "Everything included. Unlimited clients. No add-on menu, no meter running.",
    evofit: true,
  },
];

const tableRows: { label: string; evofit: string; check?: boolean; trainerize: string; everfit: string }[] = [
  {
    label: "Pricing model",
    evofit: "One-time — $199 / $299 / $399",
    trainerize: "Monthly, scales with clients",
    everfit: "Monthly, scales with clients",
  },
  {
    label: "Client limit",
    evofit: "Unlimited (Professional+)",
    trainerize: "Capped per tier, max 500/location",
    everfit: "Capped per tier, max 500",
  },
  {
    label: "Nutrition & macros",
    evofit: "Included",
    check: true,
    trainerize: "+$20–45/mo add-on",
    everfit: "+$39/mo add-on",
  },
  {
    label: "Stripe payments",
    evofit: "Included",
    check: true,
    trainerize: "+$10/mo add-on",
    everfit: "+$9/mo add-on",
  },
  {
    label: "Scheduling + drag-and-drop weekly editor",
    evofit: "Included",
    check: true,
    trainerize: "Scheduling needs $25/mo Business add-on",
    everfit: "Tasks & reminders only",
  },
  {
    label: "Check-ins & form builder",
    evofit: "Included — 10 question types",
    check: true,
    trainerize: "Consultation forms",
    everfit: "Pro tier and up",
  },
  {
    label: "Client messaging",
    evofit: "WhatsApp-native",
    check: true,
    trainerize: "In-app only",
    everfit: "In-app only",
  },
  {
    label: "Exercise library",
    evofit: "1,324 with GIF demos",
    check: true,
    trainerize: "On-demand library",
    everfit: "1,000+",
  },
  {
    label: "Client app",
    evofit:
      "Modern 4-tab coaching app (Today / Coaching / Inbox / You) — installable, works offline",
    trainerize: "Native apps; UI widely called dated",
    everfit: "Native apps; clean",
  },
  {
    label: "Training-load analytics (ACWR) + PDF reports",
    evofit: "Included (Professional)",
    check: true,
    trainerize: "Basic stats",
    everfit: "Dashboards",
  },
];

const features = [
  {
    eyebrow: "Program Builder",
    title: "Rotation programs, the way Trainerize taught you",
    body: (
      <>
        Build <strong className="text-white font-medium">7-day training cycles</strong> that rotate
        automatically, week after week. Start from the template library or from scratch, assign to
        one client or fifty, and adjust mid-cycle without rebuilding. If you&rsquo;re coming from
        Trainerize, the mental model is the same — the bill isn&rsquo;t.
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
        for programs and check-ins, <strong className="text-white font-medium">Inbox</strong> that
        opens straight into WhatsApp, and <strong className="text-white font-medium">You</strong>{" "}
        for their progress. Installable to the home screen, and it keeps working offline in the gym
        basement.
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
        seconds. Over at Trainerize, scheduling lives behind a $25/mo add-on. Here it&rsquo;s just
        part of the product.
      </>
    ),
    image: "/screenshots/trainer-schedule.png",
    alt: "EvoFit Trainer weekly schedule editor with drag-and-drop session planning",
    width: 1440,
    height: 900,
    flip: false,
  },
];

const tiers = [
  {
    name: "Starter",
    price: "$199",
    sub: "For coaches getting their first roster going.",
    features: [
      "Up to 5 clients",
      "Rotation program builder + template library",
      "Nutrition & macros, Stripe payments",
      "Scheduling, check-ins, WhatsApp-native messaging",
    ],
    cta: "Get Starter →",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$299",
    sub: "For working coaches who plan to grow.",
    features: [
      "Unlimited clients",
      "Everything in Starter",
      "Training-load analytics (ACWR)",
      "Client PDF reports",
    ],
    cta: "Get Professional →",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "$399",
    sub: "For studios and multi-coach teams.",
    features: [
      "Everything in Professional",
      "Admin dashboard",
      "Audit trail",
      "Bulk operations",
    ],
    cta: "Get Enterprise →",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Is it really one-time?",
    a: "Yes. $199, $299, or $399 — paid once. No subscription, no renewal email, no per-client meter anywhere in the product.",
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
    a: "There's a free tier at signup — try the product with real clients before you pay anything.",
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
          Trainerize and Everfit charge you per client, forever.{" "}
          <strong className="text-white font-medium">
            EvoFit Trainer is a one-time purchase
          </strong>{" "}
          — unlimited clients, everything included.
        </p>
        <div className="flex flex-wrap items-center gap-7">
          <a
            href={TRAINER_SIGNUP_URL}
            className="inline-block bg-brand-accent text-black px-8 py-4 font-display font-semibold uppercase tracking-wider text-sm hover:bg-white transition-colors duration-300"
          >
            Get EvoFit Trainer &rarr;
          </a>
          <a
            href="#the-math"
            className="font-body text-sm text-white/60 border-b border-white/30 pb-0.5 hover:text-white transition-colors"
          >
            Do the math first &darr;
          </a>
        </div>
        <p className="font-body text-xs uppercase tracking-wider text-white/40 mt-8">
          {DATE_STAMP}
        </p>
      </section>

      {/* 2 · The math */}
      <section id="the-math" className="border-t border-white/10 py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="mb-14 md:mb-20">
            <p className={eyebrowClass}>01 &middot; The Math</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-wider leading-none mt-5 max-w-3xl">
              What 100 clients actually costs you
            </h2>
            <p className="font-body text-lg text-white/60 font-light leading-relaxed max-w-2xl mt-6">
              Their pricing pages call it &ldquo;scaling with your business.&rdquo; Look at the
              line items and it reads more like rent.
            </p>
          </div>

          <div>
            {mathRows.map((row) => (
              <div
                key={row.name}
                className="grid grid-cols-1 md:grid-cols-[minmax(170px,0.9fr)_minmax(0,1.6fr)_minmax(0,1.1fr)] gap-3 md:gap-7 items-baseline py-8 md:py-10 border-t border-white/10 last:border-b"
              >
                <div className="font-body font-medium">
                  {row.name}
                  <span className="block font-body text-xs uppercase tracking-wider text-white/40 mt-1.5">
                    {row.sub}
                  </span>
                </div>
                <div
                  className={`font-display font-bold leading-none whitespace-nowrap text-5xl md:text-8xl ${
                    row.evofit ? "text-brand-accent" : "text-white"
                  }`}
                >
                  {row.figure}
                  <span className="text-[0.3em] text-white/40 font-body font-normal tracking-normal">
                    {row.per}
                  </span>
                </div>
                <p className="font-body text-sm text-white/60 leading-relaxed md:max-w-xs">
                  {row.evofit ? (
                    <>
                      <strong className="text-white font-medium">Everything included.</strong>{" "}
                      Unlimited clients. No add-on menu, no meter running.
                    </>
                  ) : (
                    row.note
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 border border-white/10 px-8 py-7 flex flex-wrap items-baseline gap-y-4 gap-x-14">
            <span className="basis-full font-body text-xs uppercase tracking-[0.2em] text-white/40">
              Run it for three years
            </span>
            <span className="font-display font-bold text-3xl md:text-4xl">
              ~$7,200
              <small className="block font-body font-normal text-xs text-white/40 tracking-wide mt-1.5">
                Trainerize
              </small>
            </span>
            <span className="font-display font-bold text-3xl md:text-4xl">
              ~$7,800
              <small className="block font-body font-normal text-xs text-white/40 tracking-wide mt-1.5">
                Everfit
              </small>
            </span>
            <span className="font-display font-bold text-3xl md:text-4xl text-brand-accent">
              $299
              <small className="block font-body font-normal text-xs text-white/40 tracking-wide mt-1.5">
                EvoFit Trainer — total, ever
              </small>
            </span>
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
          <blockquote className="font-display font-bold text-3xl md:text-5xl lg:text-6xl uppercase tracking-wide leading-tight max-w-4xl mt-6">
            <span className="text-white/40">&ldquo;</span>Everfit is a much cleaner looking program
            but they do nickel and dime you.<span className="text-white/40">&rdquo;</span>
            <cite className="block not-italic font-body text-sm normal-case tracking-wider text-white/40 mt-8">
              — actual trainer, r/personaltraining
            </cite>
          </blockquote>
          <p className="font-body text-lg md:text-xl font-medium max-w-2xl mt-13 pt-8 border-t border-white/10">
            Nutrition, payments, automation, scheduling —{" "}
            <span className="text-white/60 font-light">add-ons over there.</span> Included here.
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

      {/* 6 · Pricing */}
      <section id="pricing" className="border-t border-white/10 py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="mb-14 md:mb-20">
            <p className={eyebrowClass}>05 &middot; Pricing</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-wider leading-none mt-5 max-w-3xl">
              Pay once. That&rsquo;s the whole model.
            </h2>
            <p className="font-body text-lg text-white/60 font-light leading-relaxed max-w-2xl mt-6">
              No per-client meter, no add-on menu, no renewal email. Buy the tier that fits, and
              it&rsquo;s yours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col p-9 border ${
                  tier.highlighted
                    ? "border-brand-accent bg-white/5"
                    : "border-white/10"
                }`}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-7 bg-brand-accent text-black font-display text-xs font-semibold uppercase tracking-wider px-3 py-1">
                    {tier.badge}
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold uppercase tracking-wider">
                  {tier.name}
                </h3>
                <p className="font-display text-5xl md:text-6xl font-bold mt-5 mb-1">
                  {tier.price}
                  <small className="font-body text-sm font-normal text-white/40 tracking-normal ml-2">
                    one-time
                  </small>
                </p>
                <p className="font-body text-sm text-white/60 mb-7">{tier.sub}</p>
                <ul className="grow mb-9">
                  {tier.features.map((f, i) => (
                    <li
                      key={f}
                      className={`py-2.5 border-t border-white/10 font-body text-sm ${
                        i === 0 ? "text-white font-medium" : "text-white/60"
                      }`}
                    >
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={TRAINER_SIGNUP_URL}
                  className={`block text-center py-4 px-6 font-display font-semibold uppercase tracking-wider text-sm transition-colors duration-300 ${
                    tier.highlighted
                      ? "bg-brand-accent text-black hover:bg-white"
                      : "border border-white/30 text-white hover:border-white hover:bg-white hover:text-black"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
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
              href={TRAINER_SIGNUP_URL}
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
          <p className="font-body text-xs uppercase tracking-wider text-white/40 mt-10">
            Competitor prices compared as of June 10, 2026 and may change.
          </p>
        </div>
      </section>
    </main>
  );
}
