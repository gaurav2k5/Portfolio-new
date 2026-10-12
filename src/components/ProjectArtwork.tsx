"use client";

import { useEffect, useRef } from "react";

// ProjectArtwork component renders either a curated image or programmatic generative graphic fallback

const IVORY = "#F4F3ED";
const GOLD = "#D6AF64";
const DARK = "#07070A";
const GRAPHITE = "#3A3A42";
const SILVER = "#9B9A93";

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

/** FORMA — Geometric circle study */
function drawForma(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = DARK;
  ctx.fillRect(0, 0, w, h);

  // Subtle background grid
  ctx.strokeStyle = "rgba(244,243,237,0.06)";
  ctx.lineWidth = 1;
  const g = w / 8;
  for (let x = 0; x <= w; x += g) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y <= h; y += g) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  const cx = w * 0.5;
  const cy = h * 0.44;
  const r = w * 0.33;

  // Outer circle
  ctx.strokeStyle = IVORY;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  // Horizontal rule through center
  ctx.strokeStyle = "rgba(244,243,237,0.6)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - r, cy);
  ctx.lineTo(cx + r, cy);
  ctx.stroke();

  // Vertical rule
  ctx.beginPath();
  ctx.moveTo(cx, cy - r);
  ctx.lineTo(cx, cy + r);
  ctx.stroke();

  // Inner detail circle
  ctx.strokeStyle = "rgba(214,175,100,0.45)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2);
  ctx.stroke();

  // Small accent dot
  ctx.fillStyle = GOLD;
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fill();

  // Bottom label
  ctx.fillStyle = IVORY;
  ctx.font = `600 ${w * 0.075}px 'Playfair Display', serif`;
  ctx.textAlign = "center";
  ctx.fillText("FORMA", cx, h * 0.82);

  ctx.fillStyle = SILVER;
  ctx.font = `400 ${w * 0.032}px 'Inter', sans-serif`;
  ctx.fillText("GEOMETRIC STUDY / 2024", cx, h * 0.88);

  // Border frame
  ctx.strokeStyle = "rgba(244,243,237,0.15)";
  ctx.lineWidth = 1;
  ctx.strokeRect(w * 0.06, h * 0.05, w * 0.88, h * 0.9);
}

/** AMPLITUDE — Typographic experiment */
function drawAmplitude(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#090910";
  ctx.fillRect(0, 0, w, h);

  // Background subtle noise / lines
  ctx.strokeStyle = "rgba(244,243,237,0.05)";
  ctx.lineWidth = 0.8;
  for (let y = 0; y < h; y += h / 24) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  // Giant "A" letterform
  ctx.font = `italic bold ${w * 1.5}px 'Playfair Display', serif`;
  ctx.fillStyle = "rgba(214,175,100,0.12)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("A", w * 0.44, h * 0.44);

  // Foreground sharp A
  ctx.font = `italic 400 ${w * 1.05}px 'Playfair Display', serif`;
  ctx.fillStyle = IVORY;
  ctx.fillText("A", w * 0.48, h * 0.42);

  // Waveform lines cutting through
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let x = w * 0.1; x <= w * 0.9; x += 4) {
    const y = h * 0.65 + Math.sin((x / w) * Math.PI * 8) * 14;
    if (x === w * 0.1) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Bottom text
  ctx.fillStyle = IVORY;
  ctx.font = `600 ${w * 0.065}px 'Inter', sans-serif`;
  ctx.fillText("AMPLITUDE", w * 0.5, h * 0.84);

  ctx.fillStyle = GOLD;
  ctx.font = `400 ${w * 0.03}px 'Inter', sans-serif`;
  ctx.fillText("TYPOGRAPHIC EXPERIMENT / 2024", w * 0.5, h * 0.89);
}

/** VELA FRAGRANCE — Luxury perfume campaign */
function drawVela(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#0E0A06");
  bg.addColorStop(0.5, "#161009");
  bg.addColorStop(1, "#0A0704");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const bx = w * 0.5;
  const by = h * 0.4;

  // Ambient glow behind bottle
  const radial = ctx.createRadialGradient(bx, by, 10, bx, by, w * 0.35);
  radial.addColorStop(0, "rgba(214,175,100,0.18)");
  radial.addColorStop(1, "transparent");
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, w, h);

  // Bottle cap
  ctx.fillStyle = "#D6AF64";
  ctx.fillRect(bx - w * 0.08, by - h * 0.2, w * 0.16, h * 0.06);

  // Bottle neck
  ctx.fillStyle = "#1E1810";
  ctx.fillRect(bx - w * 0.05, by - h * 0.14, w * 0.1, h * 0.06);

  // Bottle body
  ctx.fillStyle = "rgba(214,175,100,0.12)";
  ctx.fillRect(bx - w * 0.18, by - h * 0.08, w * 0.36, h * 0.32);
  ctx.strokeStyle = "rgba(214,175,100,0.6)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(bx - w * 0.18, by - h * 0.08, w * 0.36, h * 0.32);

  // Bottle label
  ctx.fillStyle = IVORY;
  ctx.font = `300 ${w * 0.045}px 'Playfair Display', serif`;
  ctx.textAlign = "center";
  ctx.fillText("VELA", bx, by + h * 0.08);

  // Typography
  ctx.fillStyle = IVORY;
  ctx.font = `400 ${w * 0.09}px 'Playfair Display', serif`;
  ctx.fillText("VELA", w * 0.5, h * 0.8);

  ctx.fillStyle = GOLD;
  ctx.font = `300 ${w * 0.032}px 'Inter', sans-serif`;
  ctx.fillText("PARFUMS DE LUXE", w * 0.5, h * 0.86);

  ctx.fillStyle = SILVER;
  ctx.font = `300 ${w * 0.024}px 'Inter', sans-serif`;
  ctx.fillText("EAU DE PARFUM / 100 ML", w * 0.5, h * 0.91);
}

/** MERIDIAN — Architecture & identity */
function drawMeridian(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#0B0C10";
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.42;

  // Architectural blueprint grid
  ctx.strokeStyle = "rgba(244,243,237,0.06)";
  ctx.lineWidth = 0.5;
  for (let x = 0; x < w; x += 30) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += 30) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  // Intersecting architectural bars
  const markW = w * 0.5;
  const markH = h * 0.035;
  const gap = h * 0.05;

  ctx.fillStyle = IVORY;
  ctx.fillRect(cx - markW / 2, cy - gap / 2 - markH, markW, markH);
  ctx.fillRect(cx - markW / 2, cy + gap / 2, markW, markH);

  // Center gold axis
  ctx.fillStyle = GOLD;
  ctx.fillRect(cx - w * 0.025, cy - gap / 2 - markH - 10, w * 0.05, gap + markH * 2 + 20);

  // Typography
  ctx.fillStyle = IVORY;
  ctx.font = `300 ${w * 0.08}px 'Inter', sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("MERIDIAN", cx, h * 0.72);

  ctx.fillStyle = SILVER;
  ctx.font = `400 ${w * 0.028}px 'Inter', sans-serif`;
  ctx.fillText("SPATIAL ARCHITECTURE & DESIGN", cx, h * 0.79);

  // Frame corners
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 1;
  const c = 24;
  ctx.strokeRect(w * 0.08, h * 0.08, w * 0.84, h * 0.84);
}

/** KINETICS — Dynamic diagonal motion poster */
function drawKinetics(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#0A0A0E";
  ctx.fillRect(0, 0, w, h);

  // Bold diagonal stripes
  ctx.save();
  ctx.translate(w * 0.5, h * 0.45);
  ctx.rotate(-Math.PI / 6);

  for (let i = -6; i <= 6; i++) {
    const isGold = i === 1 || i === -2;
    ctx.fillStyle = isGold ? "rgba(214,175,100,0.7)" : "rgba(244,243,237,0.12)";
    ctx.fillRect(i * 35, -h * 0.8, isGold ? 18 : 6, h * 1.6);
  }
  ctx.restore();

  // Typography
  ctx.fillStyle = IVORY;
  ctx.font = `900 ${w * 0.095}px 'Inter', sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("KINETICS", w * 0.5, h * 0.8);

  ctx.fillStyle = GOLD;
  ctx.font = `500 ${w * 0.03}px 'Inter', sans-serif`;
  ctx.fillText("MOTION SYSTEM / MMXXIV", w * 0.5, h * 0.86);

  ctx.strokeStyle = "rgba(244,243,237,0.15)";
  ctx.lineWidth = 1;
  ctx.strokeRect(w * 0.07, h * 0.06, w * 0.86, h * 0.88);
}

/** NOOR — Editorial beauty campaign */
function drawNoor(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "#1A0909");
  grad.addColorStop(0.5, "#140A04");
  grad.addColorStop(1, "#0A0503");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.38;

  // Concentric sun circles
  ctx.strokeStyle = "rgba(214,175,100,0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(cx, cy, w * 0.32, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = "rgba(214,175,100,0.18)";
  ctx.beginPath(); ctx.arc(cx, cy, w * 0.24, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = "rgba(214,175,100,0.08)";
  ctx.beginPath(); ctx.arc(cx, cy, w * 0.16, 0, Math.PI * 2); ctx.fill();

  // Typography
  ctx.fillStyle = "#F5EDD8";
  ctx.font = `italic 400 ${w * 0.14}px 'Playfair Display', serif`;
  ctx.textAlign = "center";
  ctx.fillText("Noor", cx, h * 0.72);

  ctx.fillStyle = GOLD;
  ctx.font = `300 ${w * 0.03}px 'Inter', sans-serif`;
  ctx.fillText("EDITORIAL CAMPAIGN", cx, h * 0.8);

  ctx.fillStyle = SILVER;
  ctx.font = `300 ${w * 0.024}px 'Inter', sans-serif`;
  ctx.fillText("STUDIO ESSENCE / INDIA", cx, h * 0.86);
}

/** MONOLITH — Brutalist poster study */
function drawMonolith(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#08080A";
  ctx.fillRect(0, 0, w, h);

  // Bold central brutalist block
  const bw = w * 0.65;
  const bh = h * 0.45;
  ctx.fillStyle = "#181820";
  ctx.fillRect(w * 0.175, h * 0.18, bw, bh);

  // Contrasting ivory slice
  ctx.fillStyle = IVORY;
  ctx.fillRect(w * 0.175 + bw * 0.6, h * 0.18, bw * 0.4, bh);

  // Monospace tech specs
  ctx.fillStyle = SILVER;
  ctx.font = `400 ${w * 0.025}px 'JetBrains Mono', monospace`;
  ctx.textAlign = "left";
  ctx.fillText("COORD: 45° 19' N // 09° 12' E", w * 0.18, h * 0.15);
  ctx.fillText("WEIGHT: 840 TONS // PURE CONCRETE", w * 0.18, h * 0.68);

  // Bold title
  ctx.fillStyle = IVORY;
  ctx.font = `900 ${w * 0.11}px 'Inter', sans-serif`;
  ctx.fillText("MONOLITH", w * 0.18, h * 0.82);

  ctx.fillStyle = GOLD;
  ctx.font = `400 ${w * 0.03}px 'Inter', sans-serif`;
  ctx.fillText("BRUTALIST ARCHITECTURAL STUDY", w * 0.18, h * 0.88);
}

/** ECHOES — Soundwave spectrogram */
function drawEchoes(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#05060A";
  ctx.fillRect(0, 0, w, h);

  const numLines = 64;
  const lineArea = w * 0.8;
  const startX = w * 0.1;
  const lineH = h * 0.45;
  const lineY = h * 0.22;

  for (let i = 0; i < numLines; i++) {
    const t = i / (numLines - 1);
    const x = startX + t * lineArea;
    const wave = Math.sin(t * Math.PI * 4) * Math.cos(t * Math.PI * 8) * 0.5 + 0.5;
    const len = lineH * (0.15 + wave * 0.85);
    const yTop = lineY + (lineH - len) / 2;

    ctx.strokeStyle = i % 8 === 0 ? GOLD : "rgba(244,243,237,0.7)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, yTop);
    ctx.lineTo(x, yTop + len);
    ctx.stroke();
  }

  // Typography
  ctx.fillStyle = IVORY;
  ctx.font = `400 ${w * 0.08}px 'Playfair Display', serif`;
  ctx.textAlign = "center";
  ctx.fillText("ECHOES", w * 0.5, h * 0.78);

  ctx.fillStyle = GOLD;
  ctx.font = `300 ${w * 0.03}px 'Inter', sans-serif`;
  ctx.fillText("SONIC IDENTITY & VINYL SLEEVE", w * 0.5, h * 0.85);
}

const ARTWORK_MAP: Record<string, DrawFn> = {
  forma: drawForma,
  amplitude: drawAmplitude,
  "vela-fragrance": drawVela,
  vela: drawVela,
  meridian: drawMeridian,
  kinetics: drawKinetics,
  "noor-social": drawNoor,
  noor: drawNoor,
  monolith: drawMonolith,
  echoes: drawEchoes,
};

import { useState } from "react";
import { projects } from "@/data/projects";
import type { Project } from "@/types/portfolio";

interface ProjectArtworkProps {
  projectId?: string;
  project?: Project;
  coverImage?: string;
  className?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}

export function ProjectArtwork({
  projectId: explicitId,
  project: explicitProject,
  coverImage: explicitCover,
  className = "",
  priority = false,
  fit = "cover",
}: ProjectArtworkProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const resolvedId = explicitId || explicitProject?.id || "";
  const resolvedProject = explicitProject || projects.find((p) => p.id === resolvedId);
  const imageSrc = explicitCover || resolvedProject?.coverImage;

  useEffect(() => {
    // Only initialize canvas fallback if no image or image errored
    if (imageSrc && !imageError) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 640;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    const drawFn = (resolvedId && ARTWORK_MAP[resolvedId]) || drawForma;
    drawFn(ctx, width, height);
  }, [resolvedId, imageSrc, imageError]);

  if (imageSrc && !imageError) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#07070A] ${className}`}>
        <img
          src={imageSrc}
          alt={resolvedProject?.title || "Curated Artwork"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          ref={(img) => {
            if (img && img.complete && img.naturalWidth > 0 && !imageLoaded) {
              setImageLoaded(true);
            }
          }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full ${fit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-700 ease-[0.16,1,0.3,1] ${
            imageLoaded ? "opacity-100" : "opacity-95"
          }`}
        />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full object-cover select-none pointer-events-none ${className}`}
      aria-label={`Artwork for project ${resolvedId || "creative"}`}
    />
  );
}
