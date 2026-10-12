/**
 * Generates canvas-based graphic design artworks for the poster wall.
 * Each design is a standalone canvas element with a distinct aesthetic.
 * Replace with real artwork by providing a texture URL to PosterWall instead.
 */

const IVORY = "#F4F3ED";
const GOLD = "#D6AF64";
const DARK = "#07070A";
const GRAPHITE = "#3A3A42";
const SILVER = "#9B9A93";

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

function makeCanvas(w: number, h: number, draw: DrawFn): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  draw(ctx, w, h);
  return c;
}

/** FORMA — Geometric circle study */
function drawForma(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = DARK;
  ctx.fillRect(0, 0, w, h);

  // Subtle background grid
  ctx.strokeStyle = "rgba(244,243,237,0.06)";
  ctx.lineWidth = 0.5;
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
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  // Horizontal rule through center
  ctx.strokeStyle = IVORY;
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
  ctx.strokeStyle = "rgba(244,243,237,0.3)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2);
  ctx.stroke();

  // Small accent dot
  ctx.fillStyle = GOLD;
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fill();

  // Bottom label
  ctx.fillStyle = IVORY;
  ctx.font = `600 ${w * 0.065}px 'Inter', sans-serif`;
  ctx.letterSpacing = `${w * 0.025}px`;
  ctx.textAlign = "center";
  ctx.fillText("FORMA", cx, h * 0.84);

  ctx.fillStyle = SILVER;
  ctx.font = `300 ${w * 0.035}px 'Inter', sans-serif`;
  ctx.letterSpacing = `${w * 0.02}px`;
  ctx.fillText("GEOMETRIC STUDY / 2024", cx, h * 0.9);

  // Side border lines
  ctx.strokeStyle = "rgba(244,243,237,0.12)";
  ctx.lineWidth = 1;
  ctx.strokeRect(w * 0.07, h * 0.06, w * 0.86, h * 0.88);
}

/** AMPLITUDE — Typographic experiment */
function drawAmplitude(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#080810";
  ctx.fillRect(0, 0, w, h);

  // Giant "A" letterform
  ctx.font = `bold ${w * 2.2}px serif`;
  ctx.fillStyle = "rgba(214,175,100,0.07)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("A", w * 0.45, h * 0.45);

  // Overlay visible A
  ctx.font = `bold ${w * 1.4}px serif`;
  ctx.fillStyle = "rgba(214,175,100,0.55)";
  ctx.fillText("A", w * 0.48, h * 0.38);

  // Thin horizontal lines
  ctx.strokeStyle = "rgba(244,243,237,0.08)";
  ctx.lineWidth = 0.5;
  for (let y = 0; y < h; y += h / 20) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  // Bottom text
  ctx.fillStyle = IVORY;
  ctx.font = `400 ${w * 0.07}px 'Inter', sans-serif`;
  ctx.letterSpacing = `${w * 0.03}px`;
  ctx.textBaseline = "alphabetic";
  ctx.fillText("AMPLITUDE", w * 0.5, h * 0.88);

  ctx.fillStyle = GOLD;
  ctx.font = `300 ${w * 0.04}px 'Inter', sans-serif`;
  ctx.letterSpacing = `${w * 0.015}px`;
  ctx.fillText("TYPOGRAPHIC STUDY", w * 0.5, h * 0.94);
}

/** VELA FRAGRANCE — Luxury product ad */
function drawVela(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // Warm dark background
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#0D0A06");
  bg.addColorStop(1, "#1A1208");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Bottle silhouette (abstract rectangles)
  const bx = w * 0.5;
  const by = h * 0.42;
  // Cap
  ctx.fillStyle = "rgba(214,175,100,0.15)";
  ctx.fillRect(bx - w * 0.07, by - h * 0.22, w * 0.14, h * 0.06);
  // Neck
  ctx.fillRect(bx - w * 0.04, by - h * 0.17, w * 0.08, h * 0.08);
  // Body
  ctx.fillStyle = "rgba(214,175,100,0.1)";
  ctx.fillRect(bx - w * 0.14, by - h * 0.09, w * 0.28, h * 0.32);

  // Bottle outline
  ctx.strokeStyle = "rgba(214,175,100,0.6)";
  ctx.lineWidth = 1;
  ctx.strokeRect(bx - w * 0.07, by - h * 0.22, w * 0.14, h * 0.06);
  ctx.strokeRect(bx - w * 0.04, by - h * 0.17, w * 0.08, h * 0.08);
  ctx.strokeRect(bx - w * 0.14, by - h * 0.09, w * 0.28, h * 0.32);

  // Label on bottle
  ctx.fillStyle = "rgba(244,243,237,0.5)";
  ctx.font = `300 ${w * 0.04}px serif`;
  ctx.letterSpacing = `${w * 0.01}px`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("VELA", bx, by + h * 0.08);

  // Decorative rule
  ctx.strokeStyle = "rgba(214,175,100,0.35)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(w * 0.2, h * 0.72);
  ctx.lineTo(w * 0.8, h * 0.72);
  ctx.stroke();

  // Typography
  ctx.fillStyle = IVORY;
  ctx.font = `400 ${w * 0.1}px 'Playfair Display', serif`;
  ctx.letterSpacing = `${w * 0.04}px`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("VELA", w * 0.5, h * 0.8);

  ctx.fillStyle = GOLD;
  ctx.font = `300 ${w * 0.035}px 'Inter', sans-serif`;
  ctx.letterSpacing = `${w * 0.02}px`;
  ctx.fillText("PARFUMS", w * 0.5, h * 0.86);

  ctx.fillStyle = "rgba(244,243,237,0.3)";
  ctx.font = `300 ${w * 0.025}px 'Inter', sans-serif`;
  ctx.fillText("NO. 07 — EAU DE PARFUM", w * 0.5, h * 0.91);
}

/** MERIDIAN — Brand identity */
function drawMeridian(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#0C0C10";
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.42;

  // Geometric mark — two intersecting bars
  const markW = w * 0.45;
  const markH = h * 0.04;
  const gap = h * 0.055;

  ctx.fillStyle = IVORY;
  ctx.fillRect(cx - markW / 2, cy - gap / 2 - markH, markW, markH);
  ctx.fillRect(cx - markW / 2, cy + gap / 2, markW, markH);

  // Center accent rectangle
  ctx.fillStyle = GOLD;
  ctx.fillRect(cx - w * 0.02, cy - gap / 2 - markH, w * 0.04, gap + markH * 2);

  // Wordmark
  ctx.fillStyle = IVORY;
  ctx.font = `300 ${w * 0.09}px 'Inter', sans-serif`;
  ctx.letterSpacing = `${w * 0.05}px`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("MERIDIAN", cx, h * 0.68);

  ctx.fillStyle = SILVER;
  ctx.font = `300 ${w * 0.028}px 'Inter', sans-serif`;
  ctx.letterSpacing = `${w * 0.018}px`;
  ctx.fillText("ARCHITECTURE", cx, h * 0.76);

  // Border
  ctx.strokeStyle = "rgba(244,243,237,0.06)";
  ctx.lineWidth = 1;
  ctx.strokeRect(w * 0.1, h * 0.1, w * 0.8, h * 0.8);

  // Corner marks
  const cm = w * 0.04;
  [[w * 0.1, h * 0.1], [w * 0.9, h * 0.1], [w * 0.1, h * 0.9], [w * 0.9, h * 0.9]].forEach(([x, y]) => {
    ctx.strokeStyle = "rgba(214,175,100,0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y); ctx.lineTo(x + (x < w / 2 ? cm : -cm), y);
    ctx.moveTo(x, y); ctx.lineTo(x, y + (y < h / 2 ? cm : -cm));
    ctx.stroke();
  });
}

/** SIGNAL — Frequency visualization */
function drawSignal(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#030305";
  ctx.fillRect(0, 0, w, h);

  const numLines = 90;
  const lineArea = w * 0.8;
  const startX = w * 0.1;
  const lineH = h * 0.6;
  const lineY = h * 0.2;

  for (let i = 0; i < numLines; i++) {
    const t = i / (numLines - 1);
    const x = startX + t * lineArea;
    // Sine wave modulation for line thickness
    const amp = Math.sin(t * Math.PI * 6) * 0.5 + 0.5;
    const lineWeight = 0.4 + amp * 2.5;
    const alpha = 0.3 + amp * 0.7;

    ctx.strokeStyle = `rgba(244,243,237,${alpha})`;
    ctx.lineWidth = lineWeight;
    ctx.beginPath();
    ctx.moveTo(x, lineY);
    ctx.lineTo(x, lineY + lineH);
    ctx.stroke();
  }

  // Horizontal bounding lines
  ctx.strokeStyle = "rgba(244,243,237,0.15)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(startX, lineY);
  ctx.lineTo(startX + lineArea, lineY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(startX, lineY + lineH);
  ctx.lineTo(startX + lineArea, lineY + lineH);
  ctx.stroke();

  // Label
  ctx.fillStyle = IVORY;
  ctx.font = `500 ${w * 0.09}px 'Inter', sans-serif`;
  ctx.letterSpacing = `${w * 0.04}px`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("SIGNAL", w * 0.5, h * 0.91);

  ctx.fillStyle = GRAPHITE;
  ctx.font = `300 ${w * 0.03}px 'Inter', sans-serif`;
  ctx.letterSpacing = `${w * 0.015}px`;
  ctx.fillText("FREQUENCY STUDY 01", w * 0.5, h * 0.96);
}

/** NOOR — Product campaign */
function drawNoor(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // Split background
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "#1C0808");
  grad.addColorStop(0.6, "#1A0A00");
  grad.addColorStop(1, "#0C0705");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Gold circle motif
  ctx.strokeStyle = "rgba(200,134,42,0.35)";
  ctx.lineWidth = 1;
  const cx = w * 0.5;
  const cy = h * 0.38;
  ctx.beginPath(); ctx.arc(cx, cy, w * 0.35, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = "rgba(200,134,42,0.15)";
  ctx.beginPath(); ctx.arc(cx, cy, w * 0.28, 0, Math.PI * 2); ctx.stroke();

  ctx.fillStyle = "rgba(200,134,42,0.1)";
  ctx.beginPath(); ctx.arc(cx, cy, w * 0.15, 0, Math.PI * 2); ctx.fill();

  // Typography
  ctx.fillStyle = "#F5EDD8";
  ctx.font = `italic 400 ${w * 0.18}px 'Playfair Display', serif`;
  ctx.letterSpacing = `${w * 0.02}px`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Noor", cx, h * 0.74);

  ctx.fillStyle = "rgba(200,134,42,0.8)";
  ctx.font = `300 ${w * 0.032}px 'Inter', sans-serif`;
  ctx.letterSpacing = `${w * 0.015}px`;
  ctx.fillText("BEAUTY / INDIA / MMXXIV", cx, h * 0.82);

  ctx.fillStyle = "rgba(245,237,216,0.3)";
  ctx.font = `300 ${w * 0.025}px 'Inter', sans-serif`;
  ctx.fillText("— illuminate your truth —", cx, h * 0.88);
}

export type PosterKey = "forma" | "amplitude" | "vela" | "meridian" | "signal" | "noor";

interface PosterSpec {
  key: PosterKey;
  draw: DrawFn;
  width: number;
  height: number;
}

const POSTER_SPECS: PosterSpec[] = [
  { key: "forma",     draw: drawForma,    width: 512,  height: 768  },
  { key: "amplitude", draw: drawAmplitude, width: 512,  height: 768  },
  { key: "vela",      draw: drawVela,     width: 512,  height: 682  },
  { key: "meridian",  draw: drawMeridian, width: 512,  height: 512  },
  { key: "signal",    draw: drawSignal,   width: 768,  height: 512  },
  { key: "noor",      draw: drawNoor,     width: 512,  height: 512  },
];

/** Generate all poster canvases (must call on client side) */
export function generateAllPosters(): Map<PosterKey, HTMLCanvasElement> {
  const map = new Map<PosterKey, HTMLCanvasElement>();
  for (const spec of POSTER_SPECS) {
    map.set(spec.key, makeCanvas(spec.width, spec.height, spec.draw));
  }
  return map;
}
