import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — EvoFit",
  description: "How EvoFit and BCI Innovation Labs collect, use, and protect your information.",
  alternates: { canonical: "https://evofit.io/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="bg-white pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 prose prose-neutral text-gray-800">
        <h1>Privacy Policy</h1>
        <p>
          <strong>Effective date:</strong> June 10, 2026
        </p>
        <p>
          EvoFit (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is operated by BCI Innovation Labs. This
          policy describes what we collect on evofit.io and how we use it. Our products, EvoFit
          Trainer (trainer.evofit.io) and EvoFit Meals (meals.evofit.io), have their own terms
          presented at signup.
        </p>
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Email and name</strong> — only when you submit one of our forms (newsletter,
            free tools, lead magnets). We use this to send you the content you requested and
            occasional product updates.
          </li>
          <li>
            <strong>Standard server logs</strong> — our hosting provider processes routine
            technical data (such as IP address and pages requested) to serve and secure the site.
          </li>
        </ul>
        <h2>How we use it</h2>
        <p>
          We send you what you asked for, and we may follow up about EvoFit products. Every email
          includes an unsubscribe link. We do not sell or rent your personal information to third
          parties.
        </p>
        <h2>Service providers</h2>
        <p>
          Email delivery and list management are handled by our email service provider. Data is
          processed only to deliver the services described above.
        </p>
        <h2>Your rights</h2>
        <p>
          You can unsubscribe at any time, or contact us to access or delete your data:{" "}
          <a href="mailto:support@evofit.io">support@evofit.io</a>.
        </p>
        <h2>Changes</h2>
        <p>
          We may update this policy from time to time. Material changes will be reflected by a new
          effective date on this page.
        </p>
      </div>
    </section>
  );
}
