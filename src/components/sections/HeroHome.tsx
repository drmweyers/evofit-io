"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroHome() {
  return (
    <section className="relative w-full h-screen min-h-[500px] overflow-hidden">
      {/* Desktop bg */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/images/hero-gym.png"
          alt="Hero background"
          fill
          className="object-cover animate-ken-burns"
          priority
        />
      </div>
      {/* Mobile bg */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/hero-mobile.png"
          alt="Hero background mobile"
          fill
          className="object-cover animate-ken-burns"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 pt-20">
          <div className="max-w-3xl">
            <motion.h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-wide leading-[1.1] mb-6"
              style={{ textShadow: "0 2px 30px rgba(0,0,0,0.7)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              IT&apos;S NOT FITNESS. IT&apos;S YOUR CAREER.
            </motion.h1>
            <motion.p
              className="font-body text-lg md:text-xl font-light text-white/90 leading-relaxed mb-10 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The platform where elite trainers build empires and transform lives.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a
                className="inline-block bg-white text-black px-8 py-4 font-display font-semibold uppercase tracking-wider text-base hover:bg-brand-accent transition-all duration-500"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
                href="/#get-started"
              >
                Get Started
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
