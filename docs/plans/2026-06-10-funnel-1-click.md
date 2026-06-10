# Plan: 1-Click Funnel — every visitor reaches a sales page in one click

**Date:** 2026-06-10 · **Branch:** `feat/funnel-1-click` · **Pipeline:** FORGE
**Driver:** Full CTA audit (44 CTAs mapped) found the primary "Get Started" CTA routes to an email-capture anchor (`/#get-started`), not a sales page, and homepage "Discover" CTAs add 2 clicks.

## Sales-page targets (verified 200 OK)
- Trainer: `https://trainer.evofit.io/get-started`
- Meals: `https://meals.evofit.io/get-started` (site convention; evofitmeals.com also live but existing direct CTAs use meals.evofit.io)

## Design decisions (brainstorm output)
1. **No modal, no JS choice widget.** Static two-button pattern everywhere a generic "Get Started" existed — one click, zero interactivity, brand-consistent.
2. **/trainer and /meals remain research pages** reached via nav links and secondary "learn more" links — never the mandatory conversion path.
3. **Email capture stays** (it's the newsletter/lead layer) but its success state must hand off to a sales page.

## Tasks (TDD — failing test first, test + impl same commit)

### T1 — Navbar: "Get Started" → two direct CTAs
- Test: `src/components/layout/Navbar.test.tsx` — links "Get Trainer" → trainer get-started, "Get Meals" → meals get-started; no `/#get-started` link remains. Desktop + mobile menu.
- Impl: `Navbar.tsx` — replace the single accent button with compact "Get Trainer" (accent) + "Get Meals" (outline) buttons; same for mobile menu.

### T2 — HeroHome: split CTA
- Test: `src/components/sections/HeroHome.test.tsx` — "Get EvoFit Trainer" → trainer get-started; "Get EvoFit Meals" → meals get-started; no `/#get-started`.
- Impl: `HeroHome.tsx` — two buttons (white solid + outline), existing motion wrapper.

### T3 — FullWidthImage: optional `secondaryCta` + homepage rewiring
- Test: `src/components/sections/FullWidthImage.test.tsx` — renders primary cta href + secondary cta href when given.
- Impl: add `secondaryCta?: { text: string; href: string }` rendered as understated text link beside/below primary.
- Homepage `src/app/page.tsx`: Trainer showcase cta → trainer get-started ("Get EvoFit Trainer →"), secondaryCta "Learn more" → `/trainer`; Meals showcase likewise; Scale section "Start Building →" → trainer get-started.
- Test: `src/app/page.test.tsx` — render HomePage, assert no link to `/#get-started`, assert ≥2 links to each product get-started URL.

### T4 — EmailCTA: success-state handoff
- Test: `src/components/sections/EmailCTA.test.tsx` — mock fetch success → after submit, success message AND links to both get-started URLs.
- Impl: success branch renders message + two product buttons.

### T5 — Free-tools upsell: direct signup
- Test: `src/app/free-tools/page.test.tsx` — "Get EvoFit Meals" → meals get-started, "Get EvoFit Trainer" → trainer get-started, plus learn-more links to `/meals`, `/trainer`.
- Impl: swap `Link href="/meals|/trainer"` for external get-started anchors; add small secondary learn-more line.

### T6 — Footer: standardize + kill dead links; /privacy + /terms pages
- Test: `src/components/layout/Footer.test.tsx` — Products: "Get EvoFit Trainer"/"Get EvoFit Meals" → get-started URLs, "Free Tools" → /free-tools; Privacy → `/privacy`, Terms → `/terms` (no `href="#"`).
- Impl: `Footer.tsx` per above. New `src/app/privacy/page.tsx` + `src/app/terms/page.tsx` (server components, Metadata API, standard policy copy for BCI Innovation Labs / ConvertKit email capture, effective date 2026-06-10).
- Sitemap picks up new routes automatically? Verify `src/app/sitemap.ts` — add if manual.

## Verification gates
- `npx vitest run` — all green (new + existing).
- `npm run build` — clean prerender of all routes incl. /privacy, /terms.
- QA agents (inventory/E2E/workflow) → @spec-reviewer PASS → @quality-reviewer APPROVE.
- NO deploy — Mark approves deployment.

## Success criteria
Every page's primary CTA reaches `*/get-started` in exactly 1 click; zero `href="#"` dead ends; zero CTAs whose only destination is the email anchor.
