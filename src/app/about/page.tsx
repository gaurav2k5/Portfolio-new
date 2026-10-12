"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { CursorEffect } from "@/components/CursorEffect";
import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";
import { studioConfig } from "@/data/studio-config";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--ivory)] flex flex-col">
      <CursorEffect />
      <Navigation />

      <main className="flex-grow">
        <CinematicHeader
          tag="DISCIPLINE &amp; PHILOSOPHY"
          recordNumber="02"
          title="Structure, Tension &amp; The Quiet Power of Restraint"
          subtitle="Graphic design at the intersection of classical typography, cinematic atmosphere, and emotional resonance. The story and methodology of Gaurav Pratap Singh."
          metaInfo={[
            { label: "LOCATION", value: "New Delhi, India" },
            { label: "ROLE", value: "Visual Creative" },
            { label: "FOCUS", value: "Posters & Direction" },
            { label: "AVAILABILITY", value: "Select Projects" },
          ]}
        />

        {/* Editorial Feature: Bio & Portrait */}
        <section className="section-padding bg-[var(--void)]">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              {/* Left Column: Portrait */}
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="relative w-full border border-[var(--border)] overflow-hidden group bg-[var(--surface)]"
                  style={{ aspectRatio: "1/1" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/me/file_00000000c130720792a8f6a815332632.png"
                    alt="Gaurav Pratap Singh"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(5,5,7,0.85) 0%, rgba(5,5,7,0.2) 30%, transparent 60%)",
                    }}
                  />

                  {/* Overlay badge */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex justify-between items-end">
                    <div>
                      <p
                        className="text-[var(--ivory)] text-base font-normal"
                        style={{ fontFamily: "var(--font-editorial)" }}
                      >
                        {studioConfig.designerName}
                      </p>
                      <p className="text-label text-[var(--accent)] text-[0.55rem] tracking-[0.22em] mt-1">
                        EDITORIAL PORTRAIT &bull; STUDIO NEW DELHI
                      </p>
                    </div>
                    <span className="text-mono text-[var(--silver)] text-[0.6rem] opacity-70">
                      EST. 2024
                    </span>
                  </div>
                </motion.div>

                {/* Studio spec box below portrait */}
                <div className="mt-8 p-6 border border-[var(--border)] bg-[var(--surface)] space-y-4">
                  <p className="text-label text-[var(--accent)] text-[0.55rem] tracking-[0.25em]">
                    CREATIVE PROFILE
                  </p>
                  <div className="text-xs space-y-2.5 text-[var(--silver)] font-light">
                    <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                      <span className="text-[var(--graphite)]">DISCIPLINE:</span>
                      <span className="text-[var(--ivory)] font-mono">Graphic &amp; Visual Design</span>
                    </div>
                    <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                      <span className="text-[var(--graphite)]">STYLE:</span>
                      <span className="text-[var(--ivory)] font-mono">Cinematic &bull; Typographic</span>
                    </div>
                    <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                      <span className="text-[var(--graphite)]">GEOGRAPHY:</span>
                      <span className="text-[var(--ivory)] font-mono">India / Worldwide</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--graphite)]">INQUIRIES:</span>
                      <span className="text-[var(--accent)] font-mono">Open</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: In-depth Biography & Philosophy */}
              <div className="lg:col-span-7 space-y-10">
                <div>
                  <p className="text-label text-[var(--accent)] text-[0.6rem] tracking-[0.25em] mb-4">
                    BIOGRAPHY &bull; ART DIRECTION
                  </p>
                  <h2
                    className="text-3xl sm:text-4xl text-[var(--ivory)] font-normal leading-tight italic"
                    style={{ fontFamily: "var(--font-editorial)" }}
                  >
                    &ldquo;I believe the strongest design does not scream for attention &mdash; it creates a gravity that makes the viewer pause.&rdquo;
                  </h2>
                </div>

                <div className="space-y-6 text-sm text-[var(--silver)] font-light leading-relaxed">
                  <p>
                    I&rsquo;m Gaurav Pratap Singh, a graphic designer and visual creative working out of India. My creative journey began with an obsession for posters, cinema stills, and the way letters occupy space. Where others saw graphic design as mere commercial ornament, I saw it as visual dramaturgy &mdash; a discipline capable of transforming an idea into an indelible mood.
                  </p>
                  <p>
                    My practice specializes in poster design, campaign advertising, and brand identity systems. I work with tight palettes &mdash; deep charcoals, warm archival ivories, and sharp chromatic punches &mdash; creating atmospheres that feel simultaneously modern and timeless.
                  </p>
                  <p>
                    Every composition is treated like a cinematic frame: light, shadow, texture, and letterforms are balanced to convey quiet authority. I am drawn to the tension between classic Bodoni/Didot serif architectures and modern raw street aesthetics.
                  </p>
                </div>

                {/* 4 Core Pillars */}
                <div className="pt-8 border-t border-[var(--border)]">
                  <p className="text-label text-[var(--accent)] text-[0.6rem] tracking-[0.25em] mb-8">
                    THE FOUR PILLARS OF PRACTICE
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-5 border border-[var(--border)] bg-[var(--surface)]">
                      <span className="text-mono text-[var(--accent)] text-xs font-semibold">01</span>
                      <h3
                        className="text-lg text-[var(--ivory)] font-normal mt-2 mb-2"
                        style={{ fontFamily: "var(--font-editorial)" }}
                      >
                        Constraint Over Clutter
                      </h3>
                      <p className="text-xs text-[var(--silver)] font-light leading-relaxed">
                        True design power lives in what you remove. Every element on the canvas must fight for its survival.
                      </p>
                    </div>

                    <div className="p-5 border border-[var(--border)] bg-[var(--surface)]">
                      <span className="text-mono text-[var(--accent)] text-xs font-semibold">02</span>
                      <h3
                        className="text-lg text-[var(--ivory)] font-normal mt-2 mb-2"
                        style={{ fontFamily: "var(--font-editorial)" }}
                      >
                        Typographic Gravity
                      </h3>
                      <p className="text-xs text-[var(--silver)] font-light leading-relaxed">
                        Typography is not a caption; it is the physical architecture of the poster, dictating rhythm and emotional weight.
                      </p>
                    </div>

                    <div className="p-5 border border-[var(--border)] bg-[var(--surface)]">
                      <span className="text-mono text-[var(--accent)] text-xs font-semibold">03</span>
                      <h3
                        className="text-lg text-[var(--ivory)] font-normal mt-2 mb-2"
                        style={{ fontFamily: "var(--font-editorial)" }}
                      >
                        Cinematic Atmosphere
                      </h3>
                      <p className="text-xs text-[var(--silver)] font-light leading-relaxed">
                        Borrowing lighting, depth of field, and film grain from cinema to give two-dimensional posters tangible physical presence.
                      </p>
                    </div>

                    <div className="p-5 border border-[var(--border)] bg-[var(--surface)]">
                      <span className="text-mono text-[var(--accent)] text-xs font-semibold">04</span>
                      <h3
                        className="text-lg text-[var(--ivory)] font-normal mt-2 mb-2"
                        style={{ fontFamily: "var(--font-editorial)" }}
                      >
                        Resonant Longevity
                      </h3>
                      <p className="text-xs text-[var(--silver)] font-light leading-relaxed">
                        Rejecting ephemeral trends in favor of timeless editorial beauty that feels compelling today and five years from now.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Toolkit & Repertoire */}
                <div className="pt-8 border-t border-[var(--border)]">
                  <p className="text-label text-[var(--graphite)] text-[0.55rem] tracking-[0.2em] mb-4">
                    TYPOGRAPHY &amp; PRODUCTION TOOLKIT
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Didot Display",
                      "Bodoni Poster",
                      "Neue Haas Grotesk",
                      "Clash Display",
                      "Impact Condensed",
                      "Adobe InDesign",
                      "Photoshop",
                      "Illustrator",
                      "Blender 3D",
                      "Archival Screenprint",
                      "High-Resolution Print Prep",
                    ].map((tool) => (
                      <span
                        key={tool}
                        className="text-mono text-[0.6rem] text-[var(--silver)] px-3 py-1.5 border border-[var(--border)] bg-[var(--surface)]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CinematicFooter
        nextPage={{
          label: "Services & Capabilities",
          href: "/services",
          title: "Explore How We Collaborate",
        }}
      />
    </div>
  );
}
