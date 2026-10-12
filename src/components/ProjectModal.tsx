"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types/portfolio";

import { ProjectArtwork } from "@/components/ProjectArtwork";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const SWATCH_LABELS = ["Primary", "Secondary", "Accent", "Neutral"];

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[200] bg-[rgba(5,5,7,0.85)] backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[210] w-full max-w-2xl bg-[var(--dark)] overflow-y-auto border-l border-[var(--border)]"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} project details`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-[var(--border)] text-[var(--silver)] hover:text-[var(--ivory)] hover:border-[var(--border-hover)] transition-all duration-300 z-10"
              aria-label="Close project details"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>

            <div className="p-8 md:p-14">
              {/* Project Artwork — Native 4:5 Art Direction Framing */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="w-full mb-10 overflow-hidden border border-white/[0.1] relative shadow-2xl bg-[#07070A]"
                style={{
                  aspectRatio: project.aspectRatio === "portrait" ? "4/5" :
                               project.aspectRatio === "landscape" ? "16/10" : "1",
                }}
              >
                <ProjectArtwork
                  projectId={project.id}
                  coverImage={project.coverImage}
                  priority={true}
                />
              </motion.div>

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <p className="font-mono text-[var(--accent)] text-[0.62rem] tracking-[0.2em] uppercase font-normal mb-3">
                  {project.category}
                </p>
                <h2
                  className="text-[var(--ivory)] mb-3 font-serif font-normal text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-tight"
                >
                  {project.title}
                </h2>
                <p className="font-sans text-[var(--ivory-muted)] text-sm md:text-base leading-relaxed font-normal">
                  {project.summary}
                </p>
              </motion.div>

              <hr className="hr-thin mb-8" />

              {/* Meta grid */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                {[
                  { label: "Client", value: project.client },
                  { label: "Year", value: project.year },
                  { label: "Role", value: project.role },
                  { label: "Format", value: project.dimensions },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-mono text-[var(--graphite)] text-[0.55rem] tracking-[0.18em] uppercase font-normal mb-1">
                      {label}
                    </p>
                    <p className="font-sans text-[var(--ivory-muted)] text-sm font-medium">{value}</p>
                  </div>
                ))}
              </motion.div>

              <hr className="hr-thin mb-8" />

              {/* Design narrative */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6 mb-8"
              >
                {[
                  { label: "Concept", text: project.concept },
                  { label: "Challenge", text: project.challenge },
                  { label: "Solution", text: project.solution },
                ].map(({ label, text }) => (
                  <div key={label}>
                    <p className="font-mono text-[var(--accent)] text-[0.58rem] tracking-[0.18em] uppercase font-normal mb-2">
                      {label}
                    </p>
                    <p className="font-sans text-[var(--silver)] text-sm leading-[1.75] font-normal">
                      {text}
                    </p>
                  </div>
                ))}
              </motion.div>

              <hr className="hr-thin mb-8" />

              {/* Typography */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-8"
              >
                <p className="font-mono text-[var(--graphite)] text-[0.55rem] tracking-[0.18em] uppercase font-normal mb-3">
                  TYPOGRAPHY
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.typography.map((font) => (
                    <span
                      key={font}
                      className="px-3 py-1.5 border border-[var(--border)] font-mono text-xs text-[var(--ivory-muted)] font-normal"
                    >
                      {font}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Color palette */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mb-8"
              >
                <p className="font-mono text-[var(--graphite)] text-[0.55rem] tracking-[0.18em] uppercase font-normal mb-3">
                  COLOUR PALETTE
                </p>
                <div className="flex gap-3 flex-wrap">
                  {project.colorPalette.map((color) => (
                    <div key={color.hex} className="flex flex-col items-center gap-2">
                      <div
                        className="w-12 h-12 border border-[var(--border)]"
                        style={{ background: color.hex }}
                        title={color.hex}
                      />
                      <div className="text-center">
                        <p className="font-sans text-[var(--ivory-muted)] text-[0.6rem] font-medium">{color.name}</p>
                        <p className="text-[var(--graphite)] text-[0.55rem] font-mono">{color.hex}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[var(--surface)] text-[var(--graphite)] font-mono text-[0.58rem] tracking-[0.12em] uppercase font-normal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
