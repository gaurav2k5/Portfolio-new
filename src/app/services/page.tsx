"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { CursorEffect } from "@/components/CursorEffect";
import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";

const EASE = [0.16, 1, 0.3, 1] as const;

interface ServiceDetail {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  timeline: string;
  idealFor: string;
}

const SERVICES_DETAIL: ServiceDetail[] = [
  {
    number: "01",
    title: "Poster Design & Exhibition Prints",
    tagline: "The wall speaks first.",
    description:
      "Large-format graphic posters and limited-edition art prints that arrest viewers through compositional tension, monumental typography, and selective chrominance. Each piece is treated as a piece of architectural art intended for long-term admiration.",
    deliverables: [
      "Archival-grade print posters (A1, A2, 24×36)",
      "Cultural & exhibition promotional series",
      "Screenprint & risograph color separations",
      "Digital display & motion-adapted variations",
    ],
    timeline: "1–2 Weeks",
    idealFor: "Cultural institutions, music events, fashion houses, art collectors",
  },
  {
    number: "02",
    title: "Product Advertising & Commercial Visuals",
    tagline: "Desire begins with a visual.",
    description:
      "Campaign visual direction and hero product advertisements that translate physical objects into emotional experiences. Specializing in luxury goods, fragrance, consumer technology, and premium streetwear where aesthetics drive purchasing conviction.",
    deliverables: [
      "Hero launch key visuals (KV)",
      "E-commerce drop & billboard compositions",
      "Glassmorphism UI & feature callout overlays",
      "Multi-channel responsive advertising kits",
    ],
    timeline: "2–3 Weeks",
    idealFor: "Consumer tech, fragrance, luxury fashion, lifestyle brands",
  },
  {
    number: "03",
    title: "Brand Identity Systems",
    tagline: "A mark that earns its place.",
    description:
      "End-to-end visual identities built on structural strategy, typographic discipline, and emotional resonance. Rather than decorative logos, we build durable visual systems that scale cohesively across every physical and digital touchpoint.",
    deliverables: [
      "Primary brandmark, wordmark & monograms",
      "Bespoke typographic hierarchy guidelines",
      "Curated chromatic palette specifications",
      "Packaging, stationery & collateral systems",
      "Comprehensive digital brand guidelines manual",
    ],
    timeline: "3–5 Weeks",
    idealFor: "Creative studios, architecture firms, bespoke retail, visionary startups",
  },
  {
    number: "04",
    title: "Social Media Creatives & Content Architecture",
    tagline: "Content that doesn't look like content.",
    description:
      "Editorial-grade digital design for brands that refuse to blend into algorithmic homogeny. We design grid systems, bespoke carousels, and launch teasers that elevate social media into a curated digital publication.",
    deliverables: [
      "Curated editorial feed post templates",
      "Story & Reel announcement frames",
      "Drop teaser sequences & countdown graphics",
      "Grid aesthetic architecture guidelines",
    ],
    timeline: "1–2 Weeks or Monthly Retainer",
    idealFor: "Fashion labels, design influencers, cultural publications",
  },
  {
    number: "05",
    title: "Visual Art Direction & Creative Supervision",
    tagline: "The vision behind the vision.",
    description:
      "High-level creative leadership and art direction for photoshoots, brand campaigns, and visual initiatives. From initial concept moodboards and lighting briefs to final retouching supervision, ensuring every image adheres to the aesthetic vision.",
    deliverables: [
      "Concept development & narrative treatment",
      "Photographic lighting & mood reference decks",
      "On-set / remote creative supervision",
      "Post-production grading & retouching notes",
    ],
    timeline: "Project-based",
    idealFor: "Agencies, fashion editorials, independent directors, commercial producers",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--ivory)] flex flex-col">
      <CursorEffect />
      <Navigation />

      <main className="flex-grow">
        <CinematicHeader
          tag="CREATIVE PRACTICE // CAPABILITIES"
          recordNumber="03"
          title="Art Direction &amp; Visual Design Crafted with Intent"
          subtitle="From singular cultural posters to full brand identity architectures and commercial campaigns. Tailored creative execution built for brands and creators with discerning taste."
          metaInfo={[
            { label: "DISCIPLINES", value: "05 Key Areas" },
            { label: "ENGAGEMENT", value: "Project & Retainer" },
            { label: "OUTPUT", value: "Print & Digital" },
            { label: "STATUS", value: "Taking Select Briefs" },
          ]}
        />

        {/* Detailed Service Cards */}
        <section className="section-padding bg-[var(--void)]">
          <div className="section-container space-y-12">
            {SERVICES_DETAIL.map((service, index) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
                className="p-8 sm:p-12 border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-accent)] transition-colors duration-500"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-8 border-b border-[var(--border)]">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-mono text-[var(--accent)] text-sm font-semibold">
                        {service.number}
                      </span>
                      <span className="text-label text-[var(--graphite)] text-[0.55rem] tracking-[0.2em]">
                        DISCIPLINE
                      </span>
                    </div>

                    <h2
                      className="text-2xl sm:text-4xl text-[var(--ivory)] font-normal mb-2"
                      style={{ fontFamily: "var(--font-editorial)" }}
                    >
                      {service.title}
                    </h2>

                    <p
                      className="text-sm sm:text-base text-[var(--accent)] italic"
                      style={{ fontFamily: "var(--font-editorial)" }}
                    >
                      &ldquo;{service.tagline}&rdquo;
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-4 text-xs font-mono text-[var(--silver)]">
                    <div className="p-3 border border-[var(--border)] bg-[var(--void)]">
                      <span className="text-[var(--graphite)] block text-[0.55rem] mb-1">
                        TIMELINE
                      </span>
                      <span>{service.timeline}</span>
                    </div>
                    <div className="p-3 border border-[var(--border)] bg-[var(--void)]">
                      <span className="text-[var(--graphite)] block text-[0.55rem] mb-1">
                        IDEAL FOR
                      </span>
                      <span className="text-[var(--ivory)]">{service.idealFor}</span>
                    </div>
                  </div>
                </div>

                {/* Description & Deliverables */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
                  <div className="lg:col-span-6">
                    <p className="text-label text-[var(--graphite)] text-[0.55rem] tracking-[0.2em] mb-3">
                      OVERVIEW &amp; PHILOSOPHY
                    </p>
                    <p className="text-sm text-[var(--silver)] font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="lg:col-span-6">
                    <p className="text-label text-[var(--accent)] text-[0.55rem] tracking-[0.2em] mb-3">
                      KEY DELIVERABLES
                    </p>
                    <ul className="space-y-2.5">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-xs sm:text-sm text-[var(--ivory-muted)] font-light"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* The 4-Phase Methodology */}
            <div className="mt-20 pt-16 border-t border-[var(--border)]">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <p className="text-label text-[var(--accent)] text-[0.6rem] tracking-[0.25em] mb-3">
                  WORKFLOW &bull; METHODOLOGY
                </p>
                <h3
                  className="text-3xl sm:text-4xl text-[var(--ivory)] font-normal italic"
                  style={{ fontFamily: "var(--font-editorial)" }}
                >
                  How Every Project Unfolds
                </h3>
                <p className="text-xs text-[var(--silver)] mt-3 font-light">
                  A structured four-stage process designed to eliminate guesswork and protect creative integrity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: "01",
                    title: "Discovery & Inquiry",
                    desc: "Uncovering core constraints, audience emotions, and establishing the conceptual moodboard territory.",
                  },
                  {
                    step: "02",
                    title: "Typographic Layout",
                    desc: "Testing monumental type lockups, spatial tension, and grid structures before adding color.",
                  },
                  {
                    step: "03",
                    title: "Chromatic Calibration",
                    desc: "Injecting color palettes, film grain texture, lighting depth, and high-precision finishing touches.",
                  },
                  {
                    step: "04",
                    title: "Master Delivery",
                    desc: "Press-ready color separations, vector assets, and full responsive digital deliverables.",
                  },
                ].map((phase) => (
                  <div
                    key={phase.step}
                    className="p-6 border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-mono text-[var(--accent)] text-xs font-semibold">
                        {phase.step}
                      </span>
                      <h4
                        className="text-lg text-[var(--ivory)] font-normal mt-3 mb-2"
                        style={{ fontFamily: "var(--font-editorial)" }}
                      >
                        {phase.title}
                      </h4>
                      <p className="text-xs text-[var(--silver)] font-light leading-relaxed">
                        {phase.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Project Inquiry Box */}
            <div className="mt-20 p-8 sm:p-14 border border-[var(--border-accent)] bg-[var(--surface)] text-center relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200, 168, 118, 0.15) 0%, transparent 70%)",
                }}
              />
              <p className="text-label text-[var(--accent)] text-[0.6rem] tracking-[0.25em] mb-3">
                LET&rsquo;S COLLABORATE
              </p>
              <h3
                className="text-3xl sm:text-5xl text-[var(--ivory)] font-normal italic mb-4"
                style={{ fontFamily: "var(--font-editorial)" }}
              >
                Have a project or campaign in mind?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--silver)] max-w-xl mx-auto font-light leading-relaxed mb-8">
                Whether you need a single exhibition poster or an entire brand campaign, I&rsquo;m currently taking select commissions.
              </p>
              <Link
                href="/contact"
                className="inline-block text-mono text-xs text-[var(--black)] bg-[var(--accent)] hover:bg-[var(--ivory)] px-8 py-4 transition-colors duration-300 font-semibold tracking-[0.15em] uppercase"
                data-cursor
              >
                Initiate Project Inquiry &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <CinematicFooter
        nextPage={{
          label: "Contact & Collaboration",
          href: "/contact",
          title: "Initiate Direct Communication",
        }}
      />
    </div>
  );
}
