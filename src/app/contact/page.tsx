"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { CursorEffect } from "@/components/CursorEffect";
import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";
import { studioConfig } from "@/data/studio-config";

const PROJECT_TYPES = [
  "Poster Design & Prints",
  "Product Advertising",
  "Brand Identity System",
  "Social Media Creatives",
  "Art Direction & Supervision",
  "Other Creative Collaboration",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Poster Design & Prints",
    timeline: "",
    message: "",
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(studioConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--ivory)] flex flex-col">
      <CursorEffect />
      <Navigation />

      <main className="flex-grow">
        <CinematicHeader
          tag="COMMISSION &amp; COLLABORATION"
          recordNumber="04"
          title="Let&rsquo;s Create Something Unforgettable"
          subtitle="Whether you have a fully formed brief, a product launch on the horizon, or just the seed of an idea &mdash; let&rsquo;s craft visual work with lasting weight."
          metaInfo={[
            { label: "EMAIL", value: studioConfig.email },
            { label: "INSTAGRAM", value: "@gauravascends_" },
            { label: "BASE", value: "New Delhi • Remote" },
            { label: "STATUS", value: "Open for Inquiries" },
          ]}
        />

        {/* Contact Section */}
        <section className="section-padding bg-[var(--void)]">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              {/* Left Column: Direct Studio Channels */}
              <div className="lg:col-span-5 space-y-10">
                <div>
                  <p className="text-label text-[var(--accent)] text-[0.6rem] tracking-[0.25em] mb-3">
                    DIRECT COMMUNICATION
                  </p>
                  <h2
                    className="text-2xl sm:text-3xl text-[var(--ivory)] font-normal italic leading-snug"
                    style={{ fontFamily: "var(--font-editorial)" }}
                  >
                    Direct lines to Gaurav Pratap Singh
                  </h2>
                  <p className="text-xs text-[var(--silver)] font-light mt-3 leading-relaxed">
                    Prefer direct email or social outreach? Connect directly through the channels below.
                  </p>
                </div>

                {/* Email Action Card */}
                <div className="p-6 border border-[var(--border)] bg-[var(--surface)] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-label text-[var(--graphite)] text-[0.55rem] tracking-[0.2em]">
                      PRIMARY EMAIL
                    </span>
                    {copied && (
                      <span className="text-mono text-[var(--accent)] text-[0.6rem] animate-fade-in">
                        COPIED TO CLIPBOARD &check;
                      </span>
                    )}
                  </div>

                  <a
                    href={`mailto:${studioConfig.email}`}
                    className="block text-lg sm:text-xl text-[var(--ivory)] hover:text-[var(--accent)] transition-colors duration-300 font-mono tracking-tight"
                    data-cursor
                  >
                    {studioConfig.email}
                  </a>

                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center gap-3">
                    <button
                      onClick={handleCopyEmail}
                      className="text-label text-[0.6rem] tracking-[0.18em] px-3 py-1.5 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--silver)] hover:text-[var(--ivory)] transition-colors"
                      data-cursor
                    >
                      {copied ? "COPIED" : "COPY ADDRESS"}
                    </button>
                    <a
                      href={`mailto:${studioConfig.email}`}
                      className="text-label text-[0.6rem] tracking-[0.18em] px-3 py-1.5 border border-[var(--border-accent)] bg-[rgba(200,168,118,0.1)] text-[var(--ivory)] hover:bg-[rgba(200,168,118,0.2)] transition-colors"
                      data-cursor
                    >
                      OPEN IN EMAIL CLIENT &rarr;
                    </a>
                  </div>
                </div>

                {/* Instagram Action Card */}
                <div className="p-6 border border-[var(--border)] bg-[var(--surface)] space-y-4">
                  <span className="text-label text-[var(--graphite)] text-[0.55rem] tracking-[0.2em] block">
                    INSTAGRAM FEED
                  </span>

                  <a
                    href={studioConfig.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group"
                    data-cursor
                  >
                    <div>
                      <p className="text-lg text-[var(--ivory)] group-hover:text-[var(--accent)] transition-colors duration-300 font-mono">
                        @gauravascends_
                      </p>
                      <p className="text-xs text-[var(--silver)] font-light mt-1">
                        Posters, design experiments &amp; process reels
                      </p>
                    </div>
                    <span className="text-mono text-xs text-[var(--accent)] group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </a>
                </div>

                {/* Studio Location & Timing */}
                <div className="p-6 border border-[var(--border)] bg-[var(--surface)] space-y-3">
                  <span className="text-label text-[var(--graphite)] text-[0.55rem] tracking-[0.2em] block">
                    LOCATION &amp; TIMING
                  </span>
                  <p className="text-sm text-[var(--ivory)] font-light">
                    Based in India &bull; Operating on IST (UTC+5:30)
                  </p>
                  <p className="text-xs text-[var(--silver)] font-light leading-relaxed">
                    Working with clients globally across timezones. Typical inquiry response time is within 24 hours.
                  </p>
                </div>
              </div>

              {/* Right Column: Project Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="p-8 sm:p-12 border border-[var(--border)] bg-[var(--surface)] relative overflow-hidden">
                  <p className="text-label text-[var(--accent)] text-[0.6rem] tracking-[0.25em] mb-2">
                    PROJECT INQUIRY FORM
                  </p>
                  <h3
                    className="text-2xl sm:text-3xl text-[var(--ivory)] font-normal italic mb-8"
                    style={{ fontFamily: "var(--font-editorial)" }}
                  >
                    Start a New Commission
                  </h3>

                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="py-12 text-center space-y-4"
                      >
                        <div className="w-12 h-12 rounded-full border border-[var(--accent)] text-[var(--accent)] flex items-center justify-center mx-auto text-xl font-mono">
                          &check;
                        </div>
                        <h4
                          className="text-2xl text-[var(--ivory)] font-normal italic"
                          style={{ fontFamily: "var(--font-editorial)" }}
                        >
                          Inquiry Dispatched
                        </h4>
                        <p className="text-xs text-[var(--silver)] max-w-md mx-auto font-light leading-relaxed">
                          Thank you for reaching out, {formData.name || "friend"}. Your project brief has been recorded. Gaurav will review your inquiry and follow up at {formData.email || "your email"} shortly.
                        </p>
                        <button
                          onClick={() => {
                            setSubmitted(false);
                            setFormData({
                              name: "",
                              email: "",
                              projectType: "Poster Design & Prints",
                              timeline: "",
                              message: "",
                            });
                          }}
                          className="text-mono text-xs text-[var(--accent)] hover:text-[var(--ivory)] pt-4 underline tracking-wider"
                          data-cursor
                        >
                          Send another message
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name & Email Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="text-label text-[var(--graphite)] text-[0.55rem] tracking-[0.2em] block mb-2">
                              YOUR NAME *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Jane Doe"
                              className="w-full bg-[var(--void)] border border-[var(--border)] focus:border-[var(--accent)] px-4 py-3 text-sm text-[var(--ivory)] outline-none transition-colors placeholder:text-[var(--graphite)]"
                            />
                          </div>

                          <div>
                            <label className="text-label text-[var(--graphite)] text-[0.55rem] tracking-[0.2em] block mb-2">
                              EMAIL ADDRESS *
                            </label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="jane@example.com"
                              className="w-full bg-[var(--void)] border border-[var(--border)] focus:border-[var(--accent)] px-4 py-3 text-sm text-[var(--ivory)] outline-none transition-colors placeholder:text-[var(--graphite)]"
                            />
                          </div>
                        </div>

                        {/* Project Type */}
                        <div>
                          <label className="text-label text-[var(--graphite)] text-[0.55rem] tracking-[0.2em] block mb-2">
                            PROJECT DISCIPLINE *
                          </label>
                          <select
                            value={formData.projectType}
                            onChange={(e) =>
                              setFormData({ ...formData, projectType: e.target.value })
                            }
                            className="w-full bg-[var(--void)] border border-[var(--border)] focus:border-[var(--accent)] px-4 py-3 text-sm text-[var(--ivory)] outline-none transition-colors cursor-pointer"
                          >
                            {PROJECT_TYPES.map((type) => (
                              <option key={type} value={type} className="bg-[var(--void)]">
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Timeline / Budget */}
                        <div>
                          <label className="text-label text-[var(--graphite)] text-[0.55rem] tracking-[0.2em] block mb-2">
                            ESTIMATED TIMELINE / LAUNCH DATE
                          </label>
                          <input
                            type="text"
                            value={formData.timeline}
                            onChange={(e) =>
                              setFormData({ ...formData, timeline: e.target.value })
                            }
                            placeholder="e.g. November 2026 / 3 weeks"
                            className="w-full bg-[var(--void)] border border-[var(--border)] focus:border-[var(--accent)] px-4 py-3 text-sm text-[var(--ivory)] outline-none transition-colors placeholder:text-[var(--graphite)]"
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label className="text-label text-[var(--graphite)] text-[0.55rem] tracking-[0.2em] block mb-2">
                            PROJECT DETAILS &amp; VISION *
                          </label>
                          <textarea
                            required
                            rows={5}
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                            placeholder="Tell me about the brand, the product, or the mood you are looking to create..."
                            className="w-full bg-[var(--void)] border border-[var(--border)] focus:border-[var(--accent)] p-4 text-sm text-[var(--ivory)] outline-none transition-colors placeholder:text-[var(--graphite)] resize-none"
                          />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="w-full text-mono text-xs text-[var(--black)] bg-[var(--accent)] hover:bg-[var(--ivory)] py-4 transition-colors duration-300 font-semibold tracking-[0.2em] uppercase"
                          data-cursor
                        >
                          Transmit Inquiry &rarr;
                        </motion.button>
                      </form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CinematicFooter
        nextPage={{
          label: "3D Studio",
          href: "/",
          title: "Return to the Opening Cinematic Studio",
        }}
      />
    </div>
  );
}
