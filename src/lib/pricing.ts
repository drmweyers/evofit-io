// Prices shown on evofit.io. Every number comes from pricing.json, which the trainer repo
// generates (scripts/sync-pricing.mjs) from tiers.ts and ai-addon.ts. Never type a price in JSX.
import raw from "./pricing.json";

export type TierKey = "starter" | "professional" | "enterprise";
export const TIER_KEYS: TierKey[] = ["starter", "professional", "enterprise"];

export const usd = (n: number): string => `$${n.toLocaleString("en-US")}`;

export const tierPrice = (t: TierKey): string => usd(raw.tiers[t].priceUsd);
export const tierName = (t: TierKey): string => raw.tiers[t].name;

/** "50", "500" or "unlimited" custom exercises. */
export const customExercises = (t: TierKey): string => String(raw.tiers[t].customExercises);

/** "Up to 5 clients" / "Unlimited clients". */
export const clientsLabel = (t: TierKey): string => {
  const c = raw.tiers[t].clients;
  return c === "unlimited" ? "Unlimited clients" : `Up to ${c} clients`;
};

export const AI_ADDON_USD = raw.aiAddonMonthlyUsd;
export const CLOUD_PRO_USD = raw.cloudProMonthlyUsd;
export const aiPerMonth = `${usd(AI_ADDON_USD)}/mo`;
export const cloudProPerMonth = `${usd(CLOUD_PRO_USD)}/mo`;

/** "One payment of $199, $299 or $399." */
export const oneTimeList = TIER_KEYS.map(tierPrice).join(", ").replace(/, ([^,]*)$/, " or $1");
/** "$199 / $299 / $399" */
export const oneTimeSlashes = TIER_KEYS.map(tierPrice).join(" / ");

export const MONTHS_3Y = 36;
export const threeYear = (monthly: number): number => monthly * MONTHS_3Y;
/** One-time price plus the AI add-on for 36 months. */
export const withAiThreeYear = (t: TierKey): number => raw.tiers[t].priceUsd + threeYear(AI_ADDON_USD);
export const cloudProThreeYear = threeYear(CLOUD_PRO_USD);
