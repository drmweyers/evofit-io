import Link from "next/link";
import { TRAINER_SIGNUP_URL, MEALS_SIGNUP_URL } from "@/lib/cta";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-white/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="font-display text-xl font-bold text-white uppercase tracking-wider block mb-4">
              EvoFit
            </Link>
            <p className="text-sm leading-relaxed">
              The platform for elite fitness professionals. Own your career.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-3 text-sm">
              <li><a href={TRAINER_SIGNUP_URL} className="hover:text-white transition-colors">Get EvoFit Trainer</a></li>
              <li><a href={MEALS_SIGNUP_URL} className="hover:text-white transition-colors">Get EvoFit Meals</a></li>
              <li><Link href="/free-tools" className="hover:text-white transition-colors">Free Tools</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/blog/rss.xml" className="hover:text-white transition-colors">RSS Feed</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://bcinnovationlabs.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  BCI Innovation Labs
                </a>
              </li>
              <li>
                <a href="https://meals.evofit.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  meals.evofit.io
                </a>
              </li>
              <li>
                <a href="https://trainer.evofit.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  trainer.evofit.io
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} BCI Innovation Labs. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
