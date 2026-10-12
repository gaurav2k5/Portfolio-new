"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface CinematicHeaderProps {
  tag: string;
  recordNumber?: string;
  title: string;
  subtitle?: string;
  metaInfo?: { label: string; value: string }[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function CinematicHeader({
  tag,
  recordNumber = "01",
  title,
  subtitle,
  metaInfo,
}: CinematicHeaderProps) {
  return (
    <header className="relative pt-36 pb-20 sm:pt-44 sm:pb-24 overflow-hidden border-b border-[var(--border)]">
      {/* Top ambient studio spotlight beam */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] pointer-events-none opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(200, 168, 118, 0.14) 0%, rgba(200, 168, 118, 0.03) 45%, rgba(5, 5, 7, 0) 75%)",
        }}
      />

      {/* Subtle architectural vertical guides */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex justify-between max-w-7xl mx-auto px-6">
        <div className="w-px h-full bg-white" />
        <div className="w-px h-full bg-white hidden md:block" />
        <div className="w-px h-full bg-white" />
      </div>

      <div className="section-container relative z-10">
        {/* Navigation Breadcrumb & Archive Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-[var(--border-subtle)]">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-sans font-semibold text-[0.68rem] tracking-wider text-[var(--silver)] hover:text-[var(--ivory)] transition-colors duration-300 uppercase"
            data-cursor
          >
            <span className="w-4 h-px bg-[var(--graphite)] group-hover:bg-[var(--accent)] group-hover:w-6 transition-all duration-300" />
            <span>RETURN TO STUDIO</span>
          </Link>

          <div className="flex items-center gap-4 font-mono text-[0.58rem] tracking-[0.18em] text-[var(--graphite)] uppercase font-normal">
            <span>ARCHIVE REF &bull; {recordNumber}</span>
            <span className="text-[var(--accent)]">&bull;</span>
            <span>GAURAV PRATAP SINGH</span>
          </div>
        </div>

        {/* Section Pill / Category */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-none border border-[var(--border)] bg-[rgba(255,255,255,0.02)] backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="font-mono text-[var(--accent)] text-[0.62rem] tracking-[0.2em] uppercase font-normal">
            {tag}
          </span>
        </motion.div>

        {/* Grand Cinematic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="text-[var(--ivory)] font-serif font-normal italic leading-[1.04] tracking-tight max-w-4xl text-[clamp(2.4rem,6vw,5.2rem)]"
        >
          {title}
        </motion.h1>

        {/* Subtitle / Statement */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="mt-6 font-sans text-[var(--silver)] text-sm sm:text-base leading-relaxed max-w-2xl font-normal"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Optional Meta Stat Bar */}
        {metaInfo && metaInfo.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="mt-12 pt-8 border-t border-[var(--border)] grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {metaInfo.map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[var(--graphite)] text-[0.55rem] tracking-[0.18em] uppercase font-normal mb-1.5">
                  {item.label}
                </p>
                <p className="font-mono text-[var(--ivory)] text-xs font-normal">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </header>
  );
}
