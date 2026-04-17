"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-display text-xl font-bold text-white uppercase tracking-wider">
            EvoFit
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/trainer" className="font-body text-sm text-white/70 hover:text-white uppercase tracking-wider transition-colors">
              Trainer
            </Link>
            <Link href="/meals" className="font-body text-sm text-white/70 hover:text-white uppercase tracking-wider transition-colors">
              Meals
            </Link>
            <Link href="/blog" className="font-body text-sm text-white/70 hover:text-white uppercase tracking-wider transition-colors">
              Blog
            </Link>
            <a
              href="/#get-started"
              className="bg-brand-accent text-black px-6 py-2 font-display font-semibold uppercase tracking-wider text-sm hover:bg-white transition-all duration-300"
            >
              Get Started
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {open && (
          <div className="md:hidden py-6 border-t border-white/10 space-y-4">
            <Link href="/trainer" className="block font-body text-sm text-white/70 uppercase tracking-wider" onClick={() => setOpen(false)}>
              Trainer
            </Link>
            <Link href="/meals" className="block font-body text-sm text-white/70 uppercase tracking-wider" onClick={() => setOpen(false)}>
              Meals
            </Link>
            <Link href="/blog" className="block font-body text-sm text-white/70 uppercase tracking-wider" onClick={() => setOpen(false)}>
              Blog
            </Link>
            <a
              href="/#get-started"
              className="inline-block bg-brand-accent text-black px-6 py-2 font-display font-semibold uppercase tracking-wider text-sm"
              onClick={() => setOpen(false)}
            >
              Get Started
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
