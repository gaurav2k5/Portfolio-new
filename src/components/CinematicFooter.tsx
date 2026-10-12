"use client";

import Link from "next/link";
import { studioConfig } from "@/data/studio-config";

interface CinematicFooterProps {
  nextPage?: {
    label: string;
    href: string;
    title: string;
  };
}

export function CinematicFooter({ nextPage }: CinematicFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--black)] text-[var(--ivory)] relative overflow-hidden">
      {/* Next page invitation banner */}
      {nextPage && (
        <div className="border-b border-[var(--border)] py-16 sm:py-24">
          <div className="section-container flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div>
              <p className="font-mono text-[var(--accent)] text-[0.62rem] tracking-[0.2em] uppercase font-normal mb-4">
                NEXT EXPLORATION &bull; {nextPage.label.toUpperCase()}
              </p>
              <Link
                href={nextPage.href}
                className="group block"
                data-cursor
              >
                <h3
                  className="text-[var(--ivory)] hover:text-[var(--accent)] transition-colors duration-300 font-serif font-normal italic text-[clamp(1.9rem,4vw,3.2rem)] leading-tight tracking-tight"
                >
                  {nextPage.title}
                  <span className="inline-block ml-4 transition-transform duration-300 group-hover:translate-x-2">
                    &rarr;
                  </span>
                </h3>
              </Link>
            </div>

            <Link
              href={nextPage.href}
              className="font-sans font-semibold text-xs text-[var(--silver)] hover:text-[var(--ivory)] border border-[var(--border)] px-6 py-3 transition-colors duration-300 tracking-wider uppercase"
              data-cursor
            >
              Enter {nextPage.label}
            </Link>
          </div>
        </div>
      )}

      {/* Direct Contact Bar */}
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-[var(--border-subtle)]">
          <div>
            <p className="font-mono text-[var(--graphite)] text-[0.55rem] tracking-[0.18em] uppercase font-normal mb-2">
              STUDIO CONTACT
            </p>
            <a
              href={`mailto:${studioConfig.email}`}
              className="font-sans text-sm text-[var(--ivory-muted)] hover:text-[var(--ivory)] transition-colors duration-300 font-medium"
              data-cursor
            >
              {studioConfig.email}
            </a>
          </div>

          <div>
            <p className="font-mono text-[var(--graphite)] text-[0.55rem] tracking-[0.18em] uppercase font-normal mb-2">
              INSTAGRAM
            </p>
            <a
              href={studioConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-[var(--ivory-muted)] hover:text-[var(--ivory)] transition-colors duration-300 font-medium"
              data-cursor
            >
              @gauravascends_
            </a>
          </div>

          <div>
            <p className="font-mono text-[var(--graphite)] text-[0.55rem] tracking-[0.18em] uppercase font-normal mb-2">
              STUDIO LOCATION
            </p>
            <p className="font-sans text-sm text-[var(--silver)] font-normal">
              New Delhi &bull; Global Remote
            </p>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[var(--graphite)] text-[0.58rem] tracking-[0.16em] uppercase font-normal">
            &copy; {year} GAURAV PRATAP SINGH &mdash; ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-mono text-[var(--graphite)] text-[0.58rem] tracking-[0.16em] uppercase hover:text-[var(--ivory-muted)] transition-colors duration-300 font-normal"
              data-cursor
            >
              3D Studio
            </Link>
            <a
              href={studioConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[var(--graphite)] text-[0.58rem] tracking-[0.16em] uppercase hover:text-[var(--ivory-muted)] transition-colors duration-300 font-normal"
              data-cursor
            >
              Instagram
            </a>
            <a
              href={`mailto:${studioConfig.email}`}
              className="font-mono text-[var(--graphite)] text-[0.58rem] tracking-[0.16em] uppercase hover:text-[var(--ivory-muted)] transition-colors duration-300 font-normal"
              data-cursor
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
