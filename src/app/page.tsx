"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import type { Project } from "@/types/portfolio";

import { Navigation } from "@/components/Navigation";
import { HeroIntro } from "@/components/HeroIntro";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { ProjectModal } from "@/components/ProjectModal";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { CursorEffect } from "@/components/CursorEffect";

// 3D scene loaded only on client with no SSR
const StudioScene = dynamic(
  () => import("@/components/StudioScene").then((m) => m.StudioScene),
  {
    ssr: false,
    loading: () => <StudioFallback />,
  }
);

function StudioFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 50% 90%, #1a1510 0%, #050507 70%)",
      }}
    />
  );
}

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  const handleSkipIntro = useCallback(() => {
    setIntroComplete(true);
    const workEl = document.getElementById("work") || document.getElementById("main-content");
    if (workEl) {
      workEl.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleProjectOpen = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleProjectClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <>
      {/* Custom cursor (desktop only) */}
      <CursorEffect />

      {/* Navigation */}
      <Navigation
        showSkip={!introComplete}
        onSkipIntro={handleSkipIntro}
      />

      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      {/* Sticky container that holds the 3D canvas while page scrolls */}
      <div className="relative" style={{ height: "400vh" }}>
        {/* Sticky 3D canvas — stays fixed while scrolling through hero */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          <StudioScene scrollHeight={300} />
          <HeroIntro onIntroComplete={handleIntroComplete} />
        </div>
      </div>

      {/* ── PORTFOLIO SECTION ────────────────────────────────────────── */}
      <main id="main-content">
        <PortfolioGrid onProjectOpen={handleProjectOpen} />

        {/* ── ABOUT SECTION ──────────────────────────────────────────── */}
        <AboutSection />

        {/* ── SERVICES SECTION ───────────────────────────────────────── */}
        <ServicesSection />

        {/* ── CONTACT SECTION ────────────────────────────────────────── */}
        <ContactSection />
      </main>

      {/* ── PROJECT DETAIL MODAL ────────────────────────────────────── */}
      <ProjectModal project={selectedProject} onClose={handleProjectClose} />
    </>
  );
}
