"use client";
import { useState, FormEvent } from "react";

interface EmailCTAProps {
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundImage?: string;
}

export default function EmailCTA({
  title,
  subtitle,
  buttonText,
  backgroundImage = "/images/cta-mood.png",
}: EmailCTAProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section id="get-started" className="relative py-32 md:py-44 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative z-10 max-w-5xl mx-auto px-8 lg:px-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white uppercase tracking-wider mb-6">
            {title}
          </h2>
          <p className="font-body text-xl font-light text-white/90 leading-relaxed mb-12">
            {subtitle}
          </p>
          {submitted ? (
            <p className="font-body text-xl text-brand-accent">
              You&apos;re in! We&apos;ll be in touch.
            </p>
          ) : (
            <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                  type="text"
                  placeholder="First name (optional)"
                  className="flex-1 px-6 py-4 font-body text-lg text-brand-dark placeholder-brand-muted border-0 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 font-body text-lg text-brand-dark placeholder-brand-muted border-0 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-brand-accent text-brand-black px-8 py-4 font-display font-semibold uppercase tracking-wider text-lg hover:bg-white hover:text-brand-black transition-all duration-300"
                >
                  {buttonText}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
