"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { studioConfig } from "@/data/studio-config";

interface NavigationProps {
  onSkipIntro?: () => void;
  showSkip?: boolean;
}

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Navigation({ onSkipIntro, showSkip }: NavigationProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const targetId = href.replace(/^#/, "");
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between bg-transparent"
        style={{ padding: "20px clamp(24px, 5vw, 60px)" }}
        aria-label="Main navigation"
      >
        {/* Logo / Name */}
        <a
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2 font-mono text-xs text-[var(--ivory-muted)] tracking-[0.16em] uppercase hover:text-[var(--ivory)] transition-colors duration-300 group"
          data-cursor
        >
          <span className="text-[var(--accent)] font-semibold">G</span>
          <span>PS</span>
          <span className="hidden sm:inline-block text-[0.55rem] text-[var(--graphite)] tracking-[0.2em] pl-2 border-l border-[var(--border)] group-hover:text-[var(--silver)] transition-colors">
            STUDIO
          </span>
        </a>

        {/* Desktop Links — Scrolls directly to sections */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const targetHref = pathname === "/" ? link.href : `/${link.href}`;
            return (
              <a
                key={link.label}
                href={targetHref}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-sans font-medium text-[0.72rem] tracking-[0.1em] uppercase text-[var(--silver)] hover:text-[var(--ivory)] transition-colors duration-300"
                data-cursor
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right side: Skip + Menu toggle */}
        <div className="flex items-center gap-6">
          <AnimatePresence>
            {showSkip && pathname === "/" && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onSkipIntro}
                className="hidden md:flex items-center gap-2 font-sans font-medium text-[0.65rem] tracking-[0.1em] uppercase text-[var(--graphite)] hover:text-[var(--ivory-muted)] transition-colors duration-300"
              >
                Skip intro
                <span className="w-4 h-px bg-current" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden flex-col gap-1.5 p-1"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-px bg-[var(--ivory-muted)] transition-transform duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[4.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-[var(--ivory-muted)] transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-[var(--ivory-muted)] transition-transform duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[var(--void)] flex flex-col items-center justify-center gap-8"
          >
            <a
              href="/"
              onClick={(e) => {
                setMenuOpen(false);
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="font-serif font-normal italic text-[clamp(2.2rem,7vw,3.5rem)] transition-colors duration-300 tracking-tight text-[var(--ivory-muted)] hover:text-[var(--ivory)]"
            >
              Studio
            </a>

            {navLinks.map((link, i) => {
              const targetHref = pathname === "/" ? link.href : `/${link.href}`;
              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={targetHref}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-serif font-normal italic text-[clamp(2.2rem,7vw,3.5rem)] transition-colors duration-300 tracking-tight text-[var(--ivory-muted)] hover:text-[var(--ivory)]"
                  >
                    {link.label}
                  </a>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 font-mono text-[var(--graphite)] text-[0.62rem] tracking-[0.2em]"
            >
              {studioConfig.email}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
