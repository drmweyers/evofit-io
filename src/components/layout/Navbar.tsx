"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Dumbbell, Utensils } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm font-black">E</span>
            </div>
            <span className="text-slate-900">
              Evo<span className="text-blue-600">Fit</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/meals"
              className="flex items-center gap-1.5 text-slate-600 hover:text-sky-500 font-medium transition-colors"
            >
              <Utensils className="w-4 h-4" />
              Meals
            </Link>
            <Link
              href="/trainer"
              className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              <Dumbbell className="w-4 h-4" />
              Trainer
            </Link>
            <Link
              href="/free-tools"
              className="text-slate-600 hover:text-purple-600 font-medium transition-colors"
            >
              Free Tools
            </Link>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="https://evofitmeals.com"
              target="_blank"
              rel="noopener"
              className="px-4 py-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 font-semibold text-sm transition-colors"
            >
              Try Meals
            </Link>
            <Link
              href="https://trainer.evofit.io"
              target="_blank"
              rel="noopener"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Try Trainer
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-3">
            <Link
              href="/meals"
              className="flex items-center gap-2 px-2 py-2 text-slate-700 hover:text-sky-500 font-medium"
              onClick={() => setOpen(false)}
            >
              <Utensils className="w-4 h-4" /> EvoFit Meals
            </Link>
            <Link
              href="/trainer"
              className="flex items-center gap-2 px-2 py-2 text-slate-700 hover:text-blue-600 font-medium"
              onClick={() => setOpen(false)}
            >
              <Dumbbell className="w-4 h-4" /> EvoFit Trainer
            </Link>
            <Link
              href="/free-tools"
              className="block px-2 py-2 text-slate-700 font-medium"
              onClick={() => setOpen(false)}
            >
              Free Tools
            </Link>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="https://evofitmeals.com"
                target="_blank"
                rel="noopener"
                className="block text-center py-2 rounded-lg bg-sky-50 text-sky-600 font-semibold"
                onClick={() => setOpen(false)}
              >
                Try Meals →
              </Link>
              <Link
                href="https://trainer.evofit.io"
                target="_blank"
                rel="noopener"
                className="block text-center py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
                onClick={() => setOpen(false)}
              >
                Try Trainer →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
