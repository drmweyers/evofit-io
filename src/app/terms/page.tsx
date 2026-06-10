import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — EvoFit",
  description: "Terms of use for the evofit.io website, operated by BCI Innovation Labs.",
  alternates: { canonical: "https://evofit.io/terms" },
};

export default function TermsPage() {
  return (
    <section className="bg-white pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 prose prose-neutral">
        <h1>Terms of Service</h1>
        <p>
          <strong>Effective date:</strong> June 10, 2026
        </p>
        <p>
          These terms govern your use of the evofit.io website, operated by BCI Innovation Labs.
          By using this site you agree to them. EvoFit Trainer (trainer.evofit.io) and EvoFit
          Meals (meals.evofit.io) are governed by their own product terms presented at signup.
        </p>
        <h2>Use of the site</h2>
        <p>
          This site provides information about EvoFit products and free resources for fitness
          professionals. You may not misuse the site, attempt to disrupt it, or use its content to
          mislead others.
        </p>
        <h2>Content and intellectual property</h2>
        <p>
          All content on this site — text, images, downloads, and branding — belongs to BCI
          Innovation Labs unless otherwise noted. Free resources are for your personal or
          professional use and may not be resold.
        </p>
        <h2>No professional advice</h2>
        <p>
          Content on this site, including free tools and guides, is for general information only
          and is not medical, nutritional, legal, or financial advice.
        </p>
        <h2>Disclaimer and limitation of liability</h2>
        <p>
          The site is provided &ldquo;as is&rdquo; without warranties of any kind. To the maximum
          extent permitted by law, BCI Innovation Labs is not liable for any damages arising from
          your use of this site.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms: <a href="mailto:support@evofit.io">support@evofit.io</a>.
        </p>
      </div>
    </section>
  );
}
