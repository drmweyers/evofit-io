import { Check } from "lucide-react";

interface Tier {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
  badge?: string;
}

interface PricingSectionProps {
  tiers: Tier[];
}

export default function PricingSection({ tiers }: PricingSectionProps) {
  return (
    <section id="pricing" className="bg-white py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-8">
          <h2 className="font-display text-4xl md:text-7xl font-bold text-black uppercase tracking-[0.06em] leading-none mb-6">
            Simple, One-Time Pricing
          </h2>
          <p className="font-body text-xl text-neutral-500 font-light leading-relaxed max-w-2xl mx-auto mb-4">
            Pay once. Own forever. Save $5,700+ over competitors.
          </p>
          <p className="font-body text-sm text-neutral-400 uppercase tracking-wider">
            No monthly fees &bull; No per-client charges &bull; 14-day money-back guarantee
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-white p-8 lg:p-10 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-accent/20 ${
                tier.highlighted ? "ring-2 ring-brand-accent" : ""
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="whitespace-nowrap px-4 py-1 text-xs font-display font-semibold uppercase tracking-wider bg-brand-accent text-brand-black">
                    {tier.badge}
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl font-bold uppercase tracking-wider text-brand-dark mb-4">
                  {tier.name}
                </h3>
                <div className="mb-6">
                  <div className="font-display text-4xl font-bold text-brand-dark">
                    {tier.price}
                  </div>
                  <div className="font-body text-sm text-brand-muted uppercase tracking-wide mt-1">
                    {tier.period}
                  </div>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start">
                    <Check className="w-[18px] h-[18px] text-brand-green mr-3 mt-0.5 flex-shrink-0" />
                    <span className="font-body text-brand-dark text-sm leading-relaxed">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                className={`block w-full text-center py-4 px-6 font-display font-semibold uppercase tracking-wider transition-all duration-300 ${
                  tier.highlighted
                    ? "bg-brand-black text-white hover:bg-brand-accent hover:text-brand-black"
                    : "bg-white text-brand-black border-2 border-brand-black hover:bg-brand-black hover:text-white"
                }`}
                href={tier.href}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
