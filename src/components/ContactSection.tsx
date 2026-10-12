"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { studioConfig } from "@/data/studio-config";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const year = new Date().getFullYear();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--black)" }}
    >
      {/* Top border */}
      <div className="hr-thin" />

      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(214,175,100,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="section-container section-padding relative z-10">
        {/* Headline */}
        <div className="mb-16 max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-[var(--accent)] text-[0.62rem] tracking-[0.22em] uppercase font-normal mb-6"
          >
            04 / CONTACT
          </motion.p>

          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.1, ease: EASE }}
              className="text-[var(--ivory)] font-serif font-normal text-[clamp(2.5rem,6vw,5.8rem)] leading-[0.95] tracking-tight"
            >
              LET&rsquo;S CREATE
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.2, ease: EASE }}
              className="text-[var(--ivory-muted)] font-serif italic font-normal text-[clamp(2.5rem,6vw,5.8rem)] leading-[0.95] tracking-tight"
            >
              SOMETHING UNFORGETTABLE.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            className="font-sans text-[var(--silver)] text-sm md:text-[0.9375rem] leading-[1.75] max-w-lg font-normal"
          >
            Whether you have a fully formed brief or just the beginning of an idea —
            I&rsquo;m interested. Send me a message and let&rsquo;s see what we can make together.
          </motion.p>
        </div>

        {/* Contact row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {/* Email */}
          <div className="border-t border-[var(--border)] pt-5">
            <p className="font-mono text-[var(--graphite)] text-[0.55rem] tracking-[0.18em] uppercase font-normal mb-3">
              EMAIL
            </p>
            <a
              href={`mailto:${studioConfig.email}`}
              className="font-sans font-medium text-sm md:text-base text-[var(--ivory-muted)] hover:text-[var(--ivory)] transition-colors duration-300 group flex items-center gap-2"
              data-cursor
            >
              {studioConfig.email}
              <svg
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
              >
                <path d="M1 10L10 1M10 1H4M10 1v6" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
          </div>

          {/* Instagram */}
          <div className="border-t border-[var(--border)] pt-5">
            <p className="font-mono text-[var(--graphite)] text-[0.55rem] tracking-[0.18em] uppercase font-normal mb-3">
              INSTAGRAM
            </p>
            <a
              href={studioConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-medium text-sm md:text-base text-[var(--ivory-muted)] hover:text-[var(--ivory)] transition-colors duration-300 group flex items-center gap-2"
              data-cursor
            >
              @gauravascends_
              <svg
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
              >
                <path d="M1 10L10 1M10 1H4M10 1v6" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Full Inquiry Form CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
          className="mb-20 p-6 border border-[var(--border)] bg-[var(--surface)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <p className="font-mono text-[var(--accent)] text-[0.58rem] tracking-[0.18em] uppercase font-normal mb-1">
              STRUCTURED PROJECT BRIEF
            </p>
            <p className="font-sans text-xs text-[var(--silver)] font-normal leading-relaxed">
              Submit your timeline, deliverables, and vision through the project inquiry lounge.
            </p>
          </div>
          <Link
            href="/contact"
            className="font-sans font-semibold text-xs text-[var(--ivory)] hover:text-[var(--accent)] border border-[var(--border)] hover:border-[var(--accent)] px-5 py-2.5 transition-colors tracking-wider uppercase shrink-0"
            data-cursor
          >
            Launch Project Form &rarr;
          </Link>
        </motion.div>

        {/* Footer */}
        <footer>
          <div className="hr-thin mb-7" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="font-mono text-[var(--graphite)] text-[0.58rem] tracking-[0.16em] uppercase font-normal">
              © {year} GAURAV PRATAP SINGH — ALL RIGHTS RESERVED
            </p>
            <div className="flex items-center gap-6">
              {[
                { label: "Instagram", href: studioConfig.socials.instagram },
                { label: "Email", href: `mailto:${studioConfig.email}` },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-mono text-[var(--graphite)] text-[0.58rem] tracking-[0.16em] uppercase hover:text-[var(--ivory-muted)] transition-colors duration-300 font-normal"
                  data-cursor
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
