"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { studioConfig } from "@/data/studio-config";

interface HeroIntroProps {
  onSkipComplete?: () => void;
  onIntroComplete?: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroIntro({ onIntroComplete }: HeroIntroProps) {
  const [phase, setPhase] = useState<"black" | "reveal" | "done">("black");
  const [showScroll, setShowScroll] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    let lastY = 0;

    const handleScroll = () => {
      const currentY = window.scrollY;
      // If we are already past the 350px fade-out point and lastY was also past it, ignore event
      if (currentY > 350 && lastY > 350) return;
      lastY = currentY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(Math.min(currentY, 350));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Short delay then begin cinematic reveal
    const t1 = setTimeout(() => setPhase("reveal"), 600);
    const t2 = setTimeout(() => {
      setShowScroll(true);
      onIntroComplete?.();
    }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onIntroComplete]);

  // Fade out hero text as soon as user begins scrolling down (over first 350px)
  const fadeProgress = Math.min(Math.max(scrollY / 300, 0), 1);
  const contentOpacity = Math.max(0, 1 - fadeProgress * 1.2);
  const textTranslateY = -fadeProgress * 40;

  const scrollToWork = () => {
    const el = document.getElementById("work") || document.getElementById("main-content");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight * 3, behavior: "smooth" });
    }
  };

  if (contentOpacity <= 0) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-end"
      aria-live="polite"
      style={{ opacity: contentOpacity, pointerEvents: contentOpacity < 0.05 ? "none" : "auto" }}
    >
      {/* ── Initial Film Curtain Fade ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-[#050507] pointer-events-none z-30"
      />

      {/* ── Cinematic Director Viewfinder Corner Brackets ───────── */}
      <div className="absolute inset-0 pointer-events-none p-6 md:p-10 flex flex-col justify-between select-none">
        <div className="flex justify-between items-start opacity-30">
          <span className="text-[10px] font-mono tracking-[0.16em] text-[var(--ivory)]">
            REC ● 24FPS
          </span>
          <span className="text-[10px] font-mono tracking-[0.16em] text-[var(--ivory)]">
            35MM // 1:2.39
          </span>
        </div>
        <div className="flex justify-between items-end opacity-30">
          <span className="text-[10px] font-mono tracking-[0.16em] text-[var(--ivory)]">
            28°36&apos;N 77°12&apos;E
          </span>
          <span className="text-[10px] font-mono tracking-[0.16em] text-[var(--ivory)]">
            MMXXIV
          </span>
        </div>
      </div>

      {/* ── Soft Atmospheric Vignette ─────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(5,5,7,0.7) 0%, rgba(5,5,7,0.15) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(5,5,7,0.85) 0%, rgba(5,5,7,0.2) 28%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Main Cinematic Title Sequence Content ─────────────────── */}
      <div
        className="relative z-10 section-container"
        style={{
          paddingBottom: "clamp(36px, 6vh, 80px)",
          transform: `translateY(${textTranslateY}px)`,
        }}
      >
        <AnimatePresence>
          {phase === "reveal" && (
            <>
              {/* Role descriptor rule */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="w-6 h-px bg-[var(--accent)] opacity-80" />
                <p className="font-mono text-[var(--accent)] tracking-[0.2em] text-[0.62rem] uppercase font-normal">
                  GRAPHIC DESIGNER &bull; VISUAL CREATIVE
                </p>
              </motion.div>

              {/* Main title: GAURAV */}
              <div className="overflow-hidden mb-1">
                <motion.h1
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.45, ease: EASE }}
                  className="text-[var(--ivory)] font-normal leading-[0.92]"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontSize: "clamp(2.5rem, 5.2vw, 5.8rem)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  GAURAV
                </motion.h1>
              </div>

              {/* Second line: Pratap Singh */}
              <div className="overflow-hidden mb-5">
                <motion.h1
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.65, ease: EASE }}
                  className="text-[var(--ivory-muted)] font-normal leading-[0.92]"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontSize: "clamp(2.5rem, 5.2vw, 5.8rem)",
                    fontStyle: "italic",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Pratap Singh
                </motion.h1>
              </div>

              {/* Geographical & studio availability metadata */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.0, ease: "easeOut" }}
                className="font-sans font-normal text-[var(--silver)] max-w-md text-xs sm:text-sm leading-relaxed"
              >
                {studioConfig.location} &mdash; {studioConfig.availability}
              </motion.p>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ── Cinematic Scroll Invitation ───────────────────────────── */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            onClick={scrollToWork}
            className="absolute bottom-8 right-[clamp(24px,5vw,80px)] flex flex-col items-center gap-3 z-10 pointer-events-auto group cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Scroll to exploration"
          >
            <span className="font-mono text-[var(--silver)] text-[0.58rem] tracking-[0.18em] uppercase [writing-mode:vertical-lr] group-hover:text-[var(--accent)] transition-colors">
              SCROLL TO ENTER
            </span>
            <ScrollLine />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function ScrollLine() {
  return (
    <div className="w-px h-14 relative overflow-hidden bg-[var(--border)]">
      <motion.div
        className="absolute top-0 left-0 right-0 bg-[var(--accent)]"
        animate={{ y: ["0%", "100%"], height: ["0%", "100%"] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ height: "40%" }}
      />
    </div>
  );
}
