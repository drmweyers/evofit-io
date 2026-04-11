import Link from "next/link";
import { Utensils, Dumbbell, ExternalLink, Rss } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-black">E</span>
              </div>
              <span className="text-white">
                Evo<span className="text-sky-400">Fit</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Own your health. Own your business. The complete fitness professional platform.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/evofit_io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-sky-400 transition-colors text-sm font-medium"
                aria-label="X / Twitter"
              >
                X (Twitter)
              </a>
              <a
                href="https://instagram.com/evofit_io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-sky-400 transition-colors text-sm font-medium"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/meals" className="hover:text-sky-400 transition-colors flex items-center gap-2">
                  <Utensils className="w-3.5 h-3.5 text-sky-500" />
                  EvoFit Meals
                </Link>
              </li>
              <li>
                <Link href="/trainer" className="hover:text-sky-400 transition-colors flex items-center gap-2">
                  <Dumbbell className="w-3.5 h-3.5 text-purple-400" />
                  EvoFit Trainer
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-sky-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#bundle" className="hover:text-sky-400 transition-colors">
                  Bundle &amp; Save
                </Link>
              </li>
            </ul>
          </div>

          {/* Free Tools */}
          <div>
            <h3 className="font-semibold text-white mb-4">Free Tools</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/free-tools#macro-calculator" className="hover:text-sky-400 transition-colors">
                  Macro Calculator
                </Link>
              </li>
              <li>
                <Link href="/free-tools#meal-plan-kit" className="hover:text-sky-400 transition-colors">
                  7-Day Meal Plan Starter Kit
                </Link>
              </li>
              <li>
                <Link href="/free-tools#pricing-guide" className="hover:text-sky-400 transition-colors">
                  Trainer Pricing Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/blog" className="hover:text-sky-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/rss.xml"
                  className="flex items-center gap-1.5 hover:text-orange-400 transition-colors text-slate-500"
                  aria-label="Subscribe to blog RSS feed"
                >
                  <Rss className="w-3.5 h-3.5" />
                  RSS Feed
                </Link>
              </li>
              <li>
                <a
                  href="https://bcinnovationlabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors"
                >
                  BCI Innovation Labs
                </a>
              </li>
              <li>
                <a
                  href="https://evofitmeals.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors"
                >
                  evofitmeals.com ↗
                </a>
              </li>
              <li>
                <a
                  href="https://trainer.evofit.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors"
                >
                  trainer.evofit.io ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} BCI Innovation Labs. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
