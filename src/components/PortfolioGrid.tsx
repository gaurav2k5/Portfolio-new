"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types/portfolio";
import { ProjectArtwork } from "@/components/ProjectArtwork";

const CATEGORIES: { label: string; value: ProjectCategory }[] = [
  { label: "All Exhibits", value: "All" },
  { label: "Poster Design", value: "Poster Design" },
  { label: "Key Visuals", value: "Key Visuals" },
  { label: "Brand Identity", value: "Brand Identity" },
  { label: "Social Media", value: "Social Media" },
  { label: "Typography & Experiments", value: "Typography & Experiments" },
];

// Silky, luxurious gallery momentum spring
const SLIDE_TRANSITION = {
  type: "spring",
  stiffness: 140,
  damping: 22,
  mass: 0.95,
} as const;

interface PortfolioGridProps {
  onProjectOpen: (project: Project) => void;
}

export function PortfolioGrid({ onProjectOpen }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; time: number; moved: boolean } | null>(null);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Reset index when category changes
  useEffect(() => {
    setActiveIndex(0);
    setDragOffset(0);
  }, [activeCategory]);

  const total = filtered.length;
  const currentProject = filtered[activeIndex] || filtered[0] || projects[0];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const workEl = document.getElementById("work");
      if (!workEl) return;
      const rect = workEl.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Smooth wheel scrubbing with throttle
  const lastWheelTime = useRef(0);
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 280) return;
    if (Math.abs(e.deltaX) > 20 || Math.abs(e.deltaY) > 35) {
      lastWheelTime.current = now;
      if (e.deltaX > 20 || e.deltaY > 35) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // ── Real-Time 1:1 Gesture Tracking (Mouse & Touch) ─────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag with primary mouse button or touch
    if (e.button !== 0 && e.pointerType === "mouse") return;
    dragStartRef.current = {
      x: e.clientX,
      time: Date.now(),
      moved: false,
    };
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStartRef.current) return;
    const diff = e.clientX - dragStartRef.current.x;

    if (Math.abs(diff) > 4) {
      dragStartRef.current.moved = true;
    }

    // Rubber-band resistance at edges
    let resistedDiff = diff;
    if ((activeIndex === 0 && diff > 0) || (activeIndex === total - 1 && diff < 0)) {
      resistedDiff = diff * 0.38;
    }

    setDragOffset(resistedDiff);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragStartRef.current) return;
    const diff = e.clientX - dragStartRef.current.x;
    const elapsed = Date.now() - dragStartRef.current.time;
    const velocity = diff / (elapsed || 1);
    const wasMoved = dragStartRef.current.moved;

    dragStartRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    // If moved with intent, advance/rewind with momentum
    if (wasMoved && (Math.abs(diff) > 45 || Math.abs(velocity) > 0.32)) {
      if (diff < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Convert pixel drag offset to fractional index offset
  const cardStepPx = isMobile ? 140 : 210;
  const dragIndexOffset = dragOffset / cardStepPx;

  return (
    <section
      id="work"
      className="relative min-h-screen py-10 md:py-14 bg-[#060608] text-[var(--ivory)] overflow-hidden select-none flex flex-col justify-between"
      onWheel={handleWheel}
    >
      {/* ── Studio Ambient Lighting: Overhead Spotlight Beam ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] pointer-events-none opacity-45"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 0%, rgba(214, 175, 100, 0.22) 0%, transparent 75%)",
        }}
      />

      {/* ── Floor Spotlight Halo on Polished Studio Ground ── */}
      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[900px] h-[260px] pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 30% at 50% 85%, rgba(214, 175, 100, 0.25) 0%, transparent 70%)",
        }}
      />

      {/* ── Subtle Studio Concrete Floor Grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,243,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(244,243,237,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          backgroundPosition: "center center",
        }}
      />

      <div className="section-container relative z-10 w-full flex-grow flex flex-col justify-between">
        {/* ── Top Header & Discipline Filter Strip ────────────────────── */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-px bg-[var(--accent)]" />
                <span className="font-mono text-[var(--accent)] text-[0.62rem] tracking-[0.22em] uppercase font-normal">
                  01 / STUDIO SHOWROOM
                </span>
                <span className="font-mono text-[var(--graphite)] text-[0.55rem] tracking-[0.18em]">
                  &bull; 3D POSTER DECK
                </span>
              </div>

              <h2
                className="text-3xl sm:text-4xl lg:text-[clamp(2.4rem,4.2vw,3.6rem)] text-[var(--ivory)] font-serif font-normal tracking-tight leading-[1.08]"
              >
                Curated Graphic Works
              </h2>
            </div>

            {/* Discipline Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map(({ label, value }) => {
                const count =
                  value === "All"
                    ? projects.length
                    : projects.filter((p) => p.category === value).length;
                const isActive = activeCategory === value;

                return (
                  <button
                    key={value}
                    onClick={() => setActiveCategory(value)}
                    className={`font-sans font-medium text-[0.68rem] tracking-[0.08em] uppercase px-3.5 py-1.5 transition-all duration-300 border rounded-full cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "border-[var(--accent)] text-[var(--ivory)] bg-[var(--accent)]/15 shadow-[0_0_12px_rgba(214,175,100,0.25)]"
                        : "border-white/10 text-[var(--silver)] hover:text-[var(--ivory)] hover:border-white/20 bg-white/[0.02]"
                    }`}
                    data-cursor
                  >
                    <span>{label}</span>
                    <span className="font-mono text-[9px] opacity-60">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Active Artwork Cinematic Title Placard ───────────────── */}
          <div className="pt-6 pb-2 flex flex-col md:flex-row md:items-end justify-between gap-6 min-h-[105px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className="max-w-2xl"
              >
                <div className="flex items-center gap-3 mb-1.5 font-mono text-xs">
                  <span className="text-[var(--accent)] tracking-[0.16em] uppercase font-normal">
                    EXHIBIT {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[var(--graphite)]" />
                  <span className="text-[var(--silver)] tracking-[0.14em] uppercase font-normal">
                    {currentProject.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[var(--graphite)]" />
                  <span className="text-[var(--graphite)] tracking-[0.12em] font-normal">
                    {currentProject.year}
                  </span>
                </div>

                <h3
                  className="text-2xl sm:text-3xl lg:text-[clamp(1.9rem,3.2vw,2.75rem)] text-[var(--ivory)] font-serif font-normal tracking-tight leading-tight"
                >
                  {currentProject.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[var(--silver)] font-normal mt-1 line-clamp-1 leading-relaxed">
                  {currentProject.summary}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Quick Expand Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onProjectOpen(currentProject)}
              className="shrink-0 px-6 py-2.5 bg-gradient-to-r from-[var(--accent)] to-[#b88c42] text-[#07070a] font-sans text-xs font-semibold tracking-wider uppercase rounded-full shadow-[0_0_20px_rgba(214,175,100,0.3)] hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer"
              data-cursor
            >
              <span>Inspect Full Artwork</span>
              <span>&rarr;</span>
            </motion.button>
          </div>
        </div>

        {/* ── THE 3D PERSPECTIVE DECK (Curved Studio Floor Stack) ─────── */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`relative w-full h-[400px] sm:h-[450px] md:h-[490px] my-3 flex items-center justify-center touch-pan-y ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            perspective: "1400px",
            perspectiveOrigin: "50% 48%",
          }}
        >
          {/* 3D Stage Space */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {filtered.map((project, idx) => {
              // Calculate continuous 3D offset including live drag
              const continuousDelta = idx - activeIndex - dragIndexOffset;
              const absDelta = Math.abs(continuousDelta);
              const isCenter = absDelta < 0.45;

              // Smoothly fade out distant cards along the arc with zero pop-in
              const isFar = absDelta > 3.8;

              // 3D curved pavilion geometry
              const spacing = isMobile ? 125 : 195;
              const translateX = continuousDelta * spacing;
              const translateZ = 50 - Math.pow(absDelta, 1.25) * 110;
              const rotateY = Math.max(-52, Math.min(52, -continuousDelta * 20));
              const rotateZ = -continuousDelta * 1.2; // organic subtle tilt
              const scale = Math.max(0.65, 1 - absDelta * 0.08);
              const blurPx = Math.min(6, Math.max(0, absDelta - 0.35) * 2.2);
              const opacity = isFar ? 0 : Math.max(0, 1 - absDelta * 0.28);
              const brightness = Math.max(0.42, 1 - absDelta * 0.2);
              const zIndex = Math.round(60 - absDelta * 10);

              return (
                <motion.div
                  key={project.id}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY: rotateY,
                    rotateZ: rotateZ,
                    scale: scale,
                    opacity: opacity,
                    filter: `blur(${blurPx}px) brightness(${brightness})`,
                  }}
                  transition={isDragging ? { duration: 0 } : SLIDE_TRANSITION}
                  onClick={(e) => {
                    e.stopPropagation();
                    // If user was dragging, don't trigger click
                    if (dragStartRef.current?.moved) return;

                    if (isCenter) {
                      onProjectOpen(project);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  style={{
                    position: "absolute",
                    transformStyle: "preserve-3d",
                    zIndex: zIndex,
                    pointerEvents: isFar ? "none" : "auto",
                  }}
                  className="w-[220px] sm:w-[260px] md:w-[290px] aspect-[3/4] cursor-pointer group"
                  data-cursor
                >
                  {/* ── The Physical Framed Poster ─────────────────────── */}
                  <div
                    className={`relative w-full h-full rounded-sm overflow-hidden bg-[#0d0d14] border transition-all duration-500 p-2 sm:p-2.5 ${
                      isCenter
                        ? "border-[var(--accent)]/80 shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(214,175,100,0.25)]"
                        : "border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group-hover:border-white/30"
                    }`}
                  >
                    {/* Inner Graphic Frame */}
                    <div className="relative w-full h-full overflow-hidden bg-[#050507] border border-white/10">
                      <ProjectArtwork
                        projectId={project.id}
                        coverImage={project.coverImage}
                        fit="contain"
                        priority={absDelta <= 1.5}
                        className="w-full h-full transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.025]"
                      />

                      {/* Dynamic light sheen shifting across the glass */}
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(${115 + rotateY * 0.8}deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)`,
                        }}
                      />

                      {/* Hover action cue for active card */}
                      {isCenter && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                          <span className="font-sans text-xs font-semibold text-[var(--ivory)] tracking-wider uppercase px-4 py-2 border border-white/30 bg-black/85 backdrop-blur-md rounded-full shadow-lg">
                            Inspect Artwork &rarr;
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── Floor Inverted Reflection ───────────────────────── */}
                  <div
                    className="absolute top-full left-0 right-0 h-40 pointer-events-none overflow-hidden opacity-20 sm:opacity-25"
                    style={{
                      transform: "scaleY(-1)",
                      maskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 65%)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 65%)",
                    }}
                  >
                    <div className="w-full h-full p-2 bg-[#0d0d14]">
                      <ProjectArtwork
                        projectId={project.id}
                        coverImage={project.coverImage}
                        fit="contain"
                        className="w-full h-full filter blur-[1px]"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Studio Navigation HUD (Bottom Controls) ────────────────── */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Interaction Instruction Cues */}
          <div className="flex items-center gap-3 font-mono text-[0.62rem] text-[var(--graphite)]">
            <span className="hidden md:inline-block tracking-[0.16em] uppercase">
              DRAG OR SWIPE TO ROTATE &bull; ARROW KEYS &bull; SCROLL TO NAVIGATE
            </span>
          </div>

          {/* Interactive Pagination Scrub Track */}
          <div className="flex items-center gap-2">
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 transition-all duration-400 rounded-full cursor-pointer ${
                  i === activeIndex
                    ? "w-8 bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                title={`Go to Exhibit ${i + 1}`}
                data-cursor
              />
            ))}
          </div>

          {/* Prev / Next Minimalist Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="px-4 py-2 font-sans font-semibold text-xs border border-white/15 bg-white/[0.03] text-[var(--silver)] hover:text-[var(--ivory)] hover:border-[var(--accent)] transition-all flex items-center gap-2 rounded-full cursor-pointer tracking-wider uppercase"
              title="Previous poster (Arrow Left)"
              data-cursor
            >
              <span>&larr;</span>
              <span>PREV</span>
            </button>

            <span className="font-mono text-xs text-[var(--accent)] px-2 font-normal tracking-[0.14em]">
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>

            <button
              onClick={handleNext}
              className="px-4 py-2 font-sans font-semibold text-xs border border-white/15 bg-white/[0.03] text-[var(--silver)] hover:text-[var(--ivory)] hover:border-[var(--accent)] transition-all flex items-center gap-2 rounded-full cursor-pointer tracking-wider uppercase"
              title="Next poster (Arrow Right)"
              data-cursor
            >
              <span>NEXT</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
