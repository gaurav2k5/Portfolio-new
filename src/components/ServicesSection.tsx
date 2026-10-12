"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

const SERVICES: Service[] = [
  {
    id: "poster",
    number: "01",
    title: "Poster Design",
    tagline: "The wall speaks first.",
    description:
      "Graphic posters that communicate ideas through composition, typography, and restraint. From cultural events to art prints, each piece is designed to arrest, hold, and resonate.",
    deliverables: ["Art poster", "Event poster", "Exhibition print", "Limited edition series"],
  },
  {
    id: "product",
    number: "02",
    title: "Commercial Key Visuals",
    tagline: "Visual power behind commercial campaigns.",
    description:
      "Campaign key visuals and graphic direction that translate concepts into arresting imagery. Editorial aesthetics, spatial typography, and 3D visualizers.",
    deliverables: ["Campaign key visuals", "Poster series", "3D product staging", "Editorial visuals"],
  },
  {
    id: "brand",
    number: "03",
    title: "Brand Identity",
    tagline: "A mark that earns its place.",
    description:
      "Complete visual identity systems grounded in strategy and built for longevity. Logos, type systems, colour, and the logic that holds them together across every surface.",
    deliverables: ["Logo & mark", "Typography system", "Colour palette", "Brand guidelines", "Stationery"],
  },
  {
    id: "social",
    number: "04",
    title: "Social Media Creatives",
    tagline: "Content that doesn't look like content.",
    description:
      "Editorial-quality social media design for brands that refuse to be generic. Grid layouts, Stories, campaigns, and content systems with a consistent, considered voice.",
    deliverables: ["Feed posts", "Stories / Reels", "Campaign templates", "Content strategy"],
  },
  {
    id: "direction",
    number: "05",
    title: "Visual Art Direction",
    tagline: "The vision behind the vision.",
    description:
      "Art direction for photoshoots, campaigns, and brand moments. Concept development, mood boarding, set direction, and creative supervision from idea to final image.",
    deliverables: ["Concept development", "Mood boards", "Shoot direction", "Retouching", "Final delivery"],
  },
];

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE }}
      className="border-t border-[var(--border)]"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left py-7 flex items-start gap-6 group"
        aria-expanded={expanded}
        data-cursor
      >
        {/* Number */}
        <span
          className="text-[var(--graphite)] text-xs font-mono font-normal tracking-[0.16em] pt-1 shrink-0 w-8 transition-colors duration-300 group-hover:text-[var(--accent)]"
        >
          {service.number}
        </span>

        {/* Title area */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <h3
              className="text-[var(--ivory-muted)] group-hover:text-[var(--ivory)] transition-colors duration-300 font-serif font-normal text-[clamp(1.4rem,2.5vw,2.2rem)] leading-[1.1] tracking-tight"
            >
              {service.title}
            </h3>
            <div
              className="shrink-0 w-8 h-8 flex items-center justify-center border border-[var(--border)] group-hover:border-[var(--border-hover)] transition-all duration-300"
              style={{ transform: expanded ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.4s ease" }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.5 0v11M0 5.5h11" stroke="var(--silver)" strokeWidth="1" />
              </svg>
            </div>
          </div>

          <p className="text-[var(--graphite)] font-serif italic text-sm mt-1">
            {service.tagline}
          </p>
        </div>
      </button>

      {/* Expandable detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="ml-14 pb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <p className="font-sans text-[var(--silver)] text-sm leading-[1.75] font-normal">
                {service.description}
              </p>
              <div>
                <p className="font-mono text-[var(--graphite)] text-[0.55rem] tracking-[0.18em] uppercase font-normal mb-3">
                  DELIVERABLES
                </p>
                <ul className="space-y-2">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 font-sans text-[var(--ivory-muted)] text-xs font-normal">
                      <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding"
      style={{ background: "var(--void)" }}
    >
      <div className="section-container">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-[var(--accent)] text-[0.62rem] tracking-[0.22em] uppercase font-normal mb-4"
          >
            03 / WHAT I DO
          </motion.p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="text-3xl sm:text-4xl lg:text-[clamp(2.5rem,4.5vw,3.8rem)] text-[var(--ivory)] font-serif font-normal tracking-tight leading-[1.05]"
            >
              Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-sans text-[var(--silver)] text-sm max-w-xs leading-relaxed font-normal"
            >
              Each discipline is practiced with the same rigour, curiosity, and commitment to the idea.
            </motion.p>
          </div>
        </div>

        {/* Services accordion */}
        <div>
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
          {/* Closing rule */}
          <div className="border-t border-[var(--border)]" />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="font-sans text-[var(--silver)] text-sm max-w-sm font-normal leading-relaxed">
            Have a project in mind? Let&rsquo;s discuss deliverables and creative vision.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/services"
              className="font-sans font-semibold text-xs text-[var(--silver)] hover:text-[var(--ivory)] border border-[var(--border)] px-5 py-2.5 transition-colors tracking-wider uppercase"
              data-cursor
            >
              Explore All Deliverables &rarr;
            </Link>
            <Link
              href="/contact"
              className="btn-ghost font-sans font-semibold text-xs tracking-wider uppercase whitespace-nowrap"
              data-cursor
            >
              Get in touch
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
