"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Alignment = "left" | "right";

interface FullWidthImageProps {
  image: string;
  alt: string;
  label: string;
  title: string;
  description: string;
  bullets?: string[];
  cta?: { text: string; href: string };
  align?: Alignment;
  gradient?: "left" | "right";
}

export default function FullWidthImage({
  image,
  alt,
  label,
  title,
  description,
  bullets,
  cta,
  align = "left",
  gradient = "left",
}: FullWidthImageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover scale-110"
          loading="lazy"
        />
      </div>
      <div
        className={`absolute inset-0 ${
          gradient === "left"
            ? "bg-gradient-to-r from-black/80 via-black/50 to-transparent"
            : "bg-gradient-to-l from-black/80 via-black/50 to-transparent"
        }`}
      />
      <div className="relative z-10 h-full flex items-center">
        <div
          className={`w-full max-w-7xl mx-auto px-8 lg:px-16 flex ${
            align === "right" ? "justify-end" : "justify-start"
          }`}
        >
          <motion.div
            ref={ref}
            className="max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-sm uppercase tracking-[0.2em] text-brand-accent mb-4">
              {label}
            </p>
            <h3
              className="font-display text-3xl md:text-5xl font-bold text-white uppercase tracking-wider leading-none mb-6"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            >
              {title}
            </h3>
            <p className="font-body text-lg text-white/80 font-light leading-relaxed mb-8">
              {description}
            </p>
            {bullets && (
              <ul className="space-y-3">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="font-body text-white/70 text-sm flex items-center gap-3"
                  >
                    <span className="text-brand-accent">&#10003;</span> {b}
                  </li>
                ))}
              </ul>
            )}
            {cta && (
              <a
                className="inline-block mt-8 bg-white text-black px-8 py-4 font-display font-semibold uppercase tracking-wider text-sm hover:bg-brand-accent hover:text-black transition-all duration-500"
                href={cta.href}
              >
                {cta.text}
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
