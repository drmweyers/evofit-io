# EvoFit.io — CLAUDE.md

## Project Overview
Marketing website for EvoFit — the complete fitness business platform.
Sells EvoFit Meals and EvoFit Trainer to fitness coaches and personal trainers.

## Stack
- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- lucide-react for icons
- Static site (all pages prerendered)

## Brand
- Primary: #0ea5e9 (sky blue) — Meals brand
- Secondary: #f37316 (orange) — Meals accent
- Gradient: blue-600 to purple-600 — Trainer brand
- Font: Inter (system)

## Routes
- `/` — Homepage (Hero → ProductShowcase → HowItWorks → FeaturesGrid → Pricing → LeadMagnets → Testimonials → FAQ)
- `/meals` — EvoFit Meals dedicated page
- `/trainer` — EvoFit Trainer dedicated page
- `/free-tools` — Lead magnet page with email capture
- `/privacy`, `/terms` — legal pages (added 2026-06-10; keep `text-gray-800` on prose container — global body color is white)
- `/blog` — blog (NOTE: 6 pre-existing test failures — recent posts missing `keywords` frontmatter; cleanup pack needed)

## Funnel Rule (2026-06-10 — NON-NEGOTIABLE)
Every primary CTA must reach a sales page in **1 click**. Signup URLs live in `src/lib/cta.ts`
(`TRAINER_SIGNUP_URL` = trainer.evofit.io/get-started, `MEALS_SIGNUP_URL` = meals.evofit.io/get-started) — import them, never hardcode.
The test suite hard-fails any `href="/#get-started"` or `href="#"` reintroduction.
`/trainer` and `/meals` are research pages (secondary "Learn more" links only), never the mandatory conversion path.
Competitor intel for comparison content: `docs/competitor-intel-2026-06-10.md` (re-scrape via `evofit-competitor-compare` skill before publishing prices).
Product screenshots: `public/screenshots/` (14 prod captures; QA seed data visible — re-seed demo trainer before featuring prominently).

## External Links
- EvoFit Meals: https://evofitmeals.com
- EvoFit Trainer: https://trainer.evofit.io

## Email Capture
- ConvertKit integration placeholder in `src/components/ui/EmailCaptureForm.tsx`
- Set `NEXT_PUBLIC_CONVERTKIT_API_KEY` env var and uncomment the API call
- Each form has a `tag` prop for ConvertKit segmentation

## Deployment
- Target: Vercel on evofit.io domain
- Mark must approve deployment — do NOT deploy autonomously
- `npm run build` for local verification

## SEO
- Metadata in each page.tsx using Next.js Metadata API
- JSON-LD structured data on homepage, /meals, /trainer
- Sitemap: /sitemap.xml (auto-generated)
- Robots: /robots.txt (auto-generated)

## Adding Content
- New sections go in `src/components/sections/`
- Run `npm run build` to verify no TypeScript errors before committing
- Keep components server components unless interactivity is needed ("use client")
