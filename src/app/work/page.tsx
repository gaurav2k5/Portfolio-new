"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types/portfolio";
import { Navigation } from "@/components/Navigation";
import { CursorEffect } from "@/components/CursorEffect";
import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";
import { ProjectArtwork } from "@/components/ProjectArtwork";
import { ProjectModal } from "@/components/ProjectModal";

const CATEGORIES: ProjectCategory[] = [
  "All",
  "Poster Design",
  "Key Visuals",
  "Brand Identity",
  "Social Media",
  "Typography & Experiments",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--ivory)] flex flex-col">
      <CursorEffect />
      <Navigation />

      <main className="flex-grow">
        {/* Cinematic Header matching 3D Studio atmosphere */}
        <CinematicHeader
          tag="ARCHIVE // SELECTED WORKS"
          recordNumber="01"
          title="The Wall of Works: A Curated Exhibition"
          subtitle="A deliberate exploration of typographic tension, poster art direction, and commercial visual identity. Each piece is crafted to arrest attention and evoke emotional resonance."
          metaInfo={[
            { label: "TOTAL WORKS", value: "09 Pieces" },
            { label: "MEDIUM", value: "Print & Digital" },
            { label: "PRACTICE", value: "Art Direction" },
            { label: "TIMELINE", value: "2024 — Present" },
          ]}
        />

        {/* Gallery Section */}
        <section className="section-padding bg-[var(--void)]">
          <div className="section-container">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-16 pb-6 border-b border-[var(--border)]">
              <span className="text-label text-[var(--graphite)] text-[0.55rem] tracking-[0.2em] mr-4 hidden sm:inline-block">
                FILTER BY:
              </span>
              {CATEGORIES.map((cat) => {
                const count =
                  cat === "All"
                    ? projects.length
                    : projects.filter((p) => p.category === cat).length;
                const isActive = activeCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`font-sans font-medium text-[0.68rem] tracking-[0.08em] uppercase px-3.5 py-1.5 transition-all duration-300 border flex items-center gap-2 ${
                      isActive
                        ? "border-[var(--accent)] text-[var(--ivory)] bg-[rgba(200,168,118,0.1)]"
                        : "border-[var(--border)] text-[var(--silver)] hover:text-[var(--ivory)] hover:border-[var(--silver)]"
                    }`}
                    data-cursor
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[9px] font-mono ${
                        isActive ? "text-[var(--accent)]" : "text-[var(--graphite)]"
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Responsive Artwork Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
            >
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: index * 0.05, ease: EASE }}
                    className="group flex flex-col border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-accent)] transition-colors duration-500 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                    data-cursor
                  >
                    {/* Artwork Container */}
                    <div className="relative overflow-hidden w-full bg-[var(--void)] p-2 sm:p-3">
                      <div className="relative overflow-hidden aspect-[3/4] w-full">
                        <ProjectArtwork
                          projectId={project.id}
                          coverImage={project.coverImage}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,7,0.92)] via-[rgba(5,5,7,0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                          <p className="font-sans text-xs font-semibold tracking-wider text-[var(--accent)] mb-1 uppercase">
                            VIEW CASE BREAKDOWN &rarr;
                          </p>
                          <p className="font-sans text-xs text-[var(--ivory-muted)] line-clamp-2 font-normal leading-relaxed">
                            {project.concept}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Card Footer */}
                    <div className="p-5 flex-grow flex flex-col justify-between border-t border-[var(--border)] bg-[var(--surface)]">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2 font-mono">
                          <span className="text-[var(--accent)] text-[0.58rem] tracking-[0.18em] uppercase font-normal">
                            {project.category}
                          </span>
                          <span className="text-[var(--graphite)] text-[0.6rem] font-normal">
                            {project.year}
                          </span>
                        </div>

                        <h2
                          className="text-[var(--ivory)] text-xl font-serif font-normal group-hover:text-[var(--accent)] transition-colors duration-300 tracking-tight"
                        >
                          {project.title}
                        </h2>

                        <p className="font-sans text-xs text-[var(--silver)] mt-2 line-clamp-2 font-normal leading-relaxed">
                          {project.summary}
                        </p>
                      </div>

                      {/* Tag list */}
                      <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[0.55rem] text-[var(--graphite)] font-mono px-1.5 py-0.5 border border-[var(--border-subtle)]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Editorial Statement */}
            <div className="mt-24 p-8 sm:p-12 border border-[var(--border)] bg-[var(--surface)] relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-20"
                style={{
                  background:
                    "radial-gradient(circle at center, var(--accent) 0%, transparent 70%)",
                }}
              />
              <p className="font-mono text-[var(--accent)] text-[0.62rem] tracking-[0.2em] uppercase font-normal mb-3">
                CURATORIAL PHILOSOPHY
              </p>
              <h3
                className="text-2xl sm:text-3xl text-[var(--ivory)] font-serif font-normal italic max-w-2xl leading-snug tracking-tight"
              >
                &ldquo;Poster design is not surface decoration; it is visual architecture conceived under strict emotional constraints.&rdquo;
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[var(--silver)] mt-4 max-w-xl font-normal leading-relaxed">
                Every composition is created through rigorous typographic testing, palette reduction, and spatial hierarchy &mdash; ensuring that whether viewed from 10 feet away or on a mobile screen, the message commands stillness.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Footer pointing to About page */}
      <CinematicFooter
        nextPage={{
          label: "About & Philosophy",
          href: "/about",
          title: "The Mind Behind the Studio",
        }}
      />
    </div>
  );
}
