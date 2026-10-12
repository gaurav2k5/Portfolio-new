"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { studioConfig } from "@/data/studio-config";

const EASE = [0.16, 1, 0.3, 1] as const;

function AnimLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "102%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding"
      style={{ background: "var(--black)" }}
    >
      <div className="section-container">
        {/* Grid: text left, portrait right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: text */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="font-mono text-[var(--accent)] text-[0.62rem] tracking-[0.22em] uppercase font-normal mb-8"
            >
              02 / STUDIO PROFILE
            </motion.p>

            {/* Headline — quoted */}
            <div className="mb-10 space-y-1">
              <AnimLine delay={0.1}>
                <p
                  className="text-[var(--ivory)] font-serif italic font-normal leading-[1.08] tracking-tight text-[clamp(1.85rem,3.8vw,3.2rem)]"
                >
                  &ldquo;Design is more than
                </p>
              </AnimLine>
              <AnimLine delay={0.2}>
                <p
                  className="text-[var(--ivory)] font-serif italic font-normal leading-[1.08] tracking-tight text-[clamp(1.85rem,3.8vw,3.2rem)]"
                >
                  how something looks.
                </p>
              </AnimLine>
              <AnimLine delay={0.3}>
                <p
                  className="text-[var(--ivory-muted)] font-serif italic font-normal leading-[1.08] tracking-tight text-[clamp(1.85rem,3.8vw,3.2rem)]"
                >
                  It&rsquo;s how it makes
                </p>
              </AnimLine>
              <AnimLine delay={0.4}>
                <p
                  className="text-[var(--ivory-muted)] font-serif italic font-normal leading-[1.08] tracking-tight text-[clamp(1.85rem,3.8vw,3.2rem)]"
                >
                  people feel.&rdquo;
                </p>
              </AnimLine>
            </div>

            <hr className="hr-thin mb-8" />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
              className="space-y-5 font-sans text-[var(--silver)] text-sm md:text-[0.9375rem] font-normal leading-[1.75] max-w-lg"
            >
              <p>
                I&rsquo;m Gaurav Pratap Singh, a graphic designer and visual creative based in India.
                I work at the intersection of typography, art direction, and conceptual thinking —
                crafting visual work that is both purposeful and emotionally resonant.
              </p>
              <p>
                My practice spans poster design, brand identity, product advertising, and typographic
                experimentation. I&rsquo;m drawn to constraints, to the tension between structure and
                expression, and to the quiet power of a composition that communicates without words.
              </p>
              <p>
                Every project is an opportunity to make something that matters — not just something
                that looks good.
              </p>
            </motion.div>

            {/* Disciplines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 grid grid-cols-2 gap-y-3"
            >
              {[
                "Poster Design",
                "Art Direction",
                "Brand Identity",
                "Typography",
                "Product Advertising",
                "Visual Storytelling",
              ].map((d) => (
                <div key={d} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                  <span className="font-sans text-[var(--ivory-muted)] text-xs font-normal">{d}</span>
                </div>
              ))}
            </motion.div>

            {/* Link to dedicated About page */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-sans font-semibold text-xs text-[var(--silver)] hover:text-[var(--ivory)] border border-[var(--border)] hover:border-[var(--accent)] px-5 py-2.5 transition-colors tracking-wider uppercase"
                data-cursor
              >
                <span>Read Full Biography &amp; Philosophy</span>
                <span>&rarr;</span>
              </Link>
            </motion.div>
          </div>

          {/* Right: Portrait placeholder + meta info */}
          <div className="lg:pt-14">
            {/* Portrait area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
              className="relative w-full overflow-hidden mb-8 border border-[var(--border)] group rounded-none"
              style={{ aspectRatio: "1/1", background: "var(--surface)" }}
            >
              {/* Real photo from user's me folder */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/me/file_00000000c130720792a8f6a815332632.png"
                alt="Gaurav Pratap Singh — Visual Creative & Art Director"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              {/* Editorial bottom gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5,5,7,0.85) 0%, rgba(5,5,7,0.2) 30%, transparent 60%)",
                }}
              />

              {/* Portrait caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex justify-between items-end">
                <div>
                  <p
                    className="text-[var(--ivory)] text-lg font-normal tracking-tight font-serif"
                  >
                    {studioConfig.designerName}
                  </p>
                  <p className="font-mono text-[var(--accent)] text-[0.58rem] tracking-[0.2em] uppercase font-normal mt-1">
                    STUDIO PRACTICE &bull; NEW DELHI
                  </p>
                </div>
                <span className="font-mono text-[var(--silver)] text-[0.6rem] tracking-[0.14em] opacity-70 uppercase font-normal">
                  EST. 2024
                </span>
              </div>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { label: "Location", value: studioConfig.location },
                { label: "Status", value: "Available" },
                { label: "Discipline", value: "Design" },
              ].map(({ label, value }) => (
                <div key={label} className="border-t border-[var(--border)] pt-3">
                  <p className="font-mono text-[var(--graphite)] text-[0.55rem] tracking-[0.18em] uppercase font-normal mb-1">
                    {label}
                  </p>
                  <p className="font-sans text-[var(--ivory-muted)] text-xs font-medium">{value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
