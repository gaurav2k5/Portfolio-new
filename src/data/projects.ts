import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "frame-magazine",
    title: "FRAME MONOGRAPH",
    category: "Poster Design",
    year: "2024",
    client: "Editorial Monograph Study",
    role: "Poster & Editorial Art Director",
    aspectRatio: "portrait",
    dimensions: "1080 × 1350 px / Archival Print",
    summary:
      "An avant-garde fashion editorial poster exploring gaze, negative space, and selective chrominance against high-contrast monochrome portraiture.",
    concept:
      "FRAME investigates the tension between classic Bodoni typographic architecture and contemporary fashion photography. The semi-translucent crimson lens over the subject's eye functions as a chromatic viewfinder, questioning the relationship between observer and observed.",
    challenge:
      "Balancing a monumental Didone masthead ('FRAME') with intimate asymmetric captions ('CATCHY', 'SINCE 1989', 'LOOK DIFFERENT') while keeping the subject's gaze commanding.",
    solution:
      "A light-grey architectural field allows the high-contrast portrait and delicate Bodoni letterforms to breathe, while the crimson ocular box acts as an immediate chromatic anchor.",
    typography: ["Didot Display", "Bodoni Poster", "Neue Haas Grotesk"],
    colorPalette: [
      { name: "Crimson Lens", hex: "#A3383B" },
      { name: "Editorial Obsidian", hex: "#0A0A0C" },
      { name: "Archival Mist", hex: "#E4E3DF" },
      { name: "Pure White", hex: "#FFFFFF" },
    ],
    featuredIn3D: true,
    wallPosition: [-3.85, 1.85, -9.8],
    wallScale: [1.32, 1.65],
    coverImage: "/designs/frame-magazine.png",
    additionalImages: ["/designs/SAMPLE 1.png"],
    tags: ["Editorial", "Poster Art", "Typography", "Monochrome", "Layout"],
  },
  {
    id: "move-different",
    title: "MOVE DIFFERENT",
    category: "Key Visuals",
    year: "2024",
    client: "Apparel Campaign Key Visual",
    role: "Key Visual Designer / Typographer",
    aspectRatio: "portrait",
    dimensions: "1080 × 1350 px / Poster Artwork",
    summary:
      "High-octane apparel campaign poster merging raw street attitude with layered kinetic typography and floating garment composition.",
    concept:
      "Streetwear thrives on kinetic energy and unapologetic presence. This graphic artwork establishes a monumental typographic backdrop ('HOODIE') that sandwiches the floating garment in three-dimensional space, giving physical gravity and weight to the composition.",
    challenge:
      "Creating an apparel graphic poster that commands immediate attention while preserving the tactile detail of the bleached tie-dye sleeve texture.",
    solution:
      "A rich crimson-to-dusk gradient backdrop combined with bold condensed gothic letterforms, offset by crisp editorial serifs ('RAW ATTITUDE' / 'OWN THE MOMENT').",
    typography: ["Impact Condensed", "Bebas Neue", "Didot Serif"],
    colorPalette: [
      { name: "Crimson Pulse", hex: "#9E1B32" },
      { name: "Hot Magenta", hex: "#D83A6F" },
      { name: "Bleached Rose", hex: "#E9B6C7" },
      { name: "Dusk Charcoal", hex: "#221A20" },
    ],
    featuredIn3D: true,
    wallPosition: [-2.35, 1.85, -9.8],
    wallScale: [1.32, 1.65],
    coverImage: "/designs/move-different-hoodie.png",
    additionalImages: ["/designs/SAMPLE 2.png"],
    tags: ["Key Visual", "Kinetic Type", "Graphic Art", "Poster Design", "Composition"],
  },
  {
    id: "truke-audio",
    title: "TRÜKE — AURA SOUND",
    category: "Key Visuals",
    year: "2024",
    client: "Commercial Key Visual Study",
    role: "Visual Art Director / 3D Layout",
    aspectRatio: "portrait",
    dimensions: "1126 × 1350 px / Campaign Poster",
    summary:
      "Commercial technology advertising poster for ANC headphones, featuring floating frosted glassmorphism player UI and acoustic wave visualizers.",
    concept:
      "Modern acoustic engineering translated into visual rhythm. The poster pairs tactile sage-and-blush industrial forms with translucent frosted UI layers, making sound feel tangible, calm, and immersive.",
    challenge:
      "Balancing complex technical specifications (50H playtime, ENC environmental noise cancellation, 40mm titanium drivers) without cluttering the heroic presentation of the hardware.",
    solution:
      "An asymmetric composition featuring a floating glassmorphism player widget ('Ishq — Faheem Abdullah') suspended through the headband, grounded by metallic 3D badge icons at the lower baseline.",
    typography: ["Inter Display", "Clash Display", "SF Pro Display"],
    colorPalette: [
      { name: "Sage Moss", hex: "#5B6647" },
      { name: "Blush Leather", hex: "#DFBCB2" },
      { name: "Brushed Champagne", hex: "#CBB588" },
      { name: "Obsidian Core", hex: "#1A1D16" },
    ],
    featuredIn3D: true,
    wallPosition: [-0.85, 1.85, -9.8],
    wallScale: [1.35, 1.65],
    coverImage: "/designs/truke-headphones.png",
    additionalImages: ["/designs/SAMPLE 3.png"],
    tags: ["Key Visual", "Audio", "Glassmorphism", "Poster Art", "3D Composition"],
  },
  {
    id: "luxora-ocean",
    title: "LUXORA AEGEAN",
    category: "Key Visuals",
    year: "2024",
    client: "High-End Fragrance Art Direction",
    role: "Art Director / Retoucher",
    aspectRatio: "portrait",
    dimensions: "1080 × 1350 px / Campaign Visual",
    summary:
      "Seascape advertising poster for the LXO Aquamarine fragrance, balancing pristine glass refractions with rugged Mediterranean coastal geology.",
    concept:
      "A sensory translation of coastal salinity, marine air, and Mediterranean sunlight. The bottle is framed like a natural crystal emerging from granite boulders overlooking turquoise open water.",
    challenge:
      "Directing natural sunlight refractions through high-clarity flacon glass while maintaining clear, legible luxury typography on the label.",
    solution:
      "Sharp overhead noon lighting casts brilliant caustics across the stone plinth, while high-contrast serifs on the emerald-tinted label create an unmistakable signature mark.",
    typography: ["Canela Display", "Cinzel Decorative", "Montserrat Light"],
    colorPalette: [
      { name: "Aegean Turquoise", hex: "#1CA7A6" },
      { name: "Coastal Granite", hex: "#7A6658" },
      { name: "Sunlight Caustic", hex: "#EBFDFE" },
      { name: "Deep Marine", hex: "#0C3C47" },
    ],
    featuredIn3D: true,
    wallPosition: [0.65, 1.85, -9.8],
    wallScale: [1.32, 1.65],
    coverImage: "/designs/luxora-ocean-perfume.jpeg",
    additionalImages: ["/designs/WhatsApp Image 2026-10-11 at 13.47.23.jpeg"],
    tags: ["Key Visual", "Art Direction", "Lighting Caustics", "Poster Design"],
  },
  {
    id: "pearlbeat",
    title: "PEARLBEAT",
    category: "Social Media",
    year: "2024",
    client: "Kinetic Typography & Social Poster",
    role: "Graphic Designer / Typographer",
    aspectRatio: "portrait",
    dimensions: "1024 × 1280 px / Social Graphic",
    summary:
      "Clean, high-impact social creative for pearl-nude wireless earbuds, utilizing dimensional depth of field, repeating kinetic typography, and soft-touch lighting.",
    concept:
      "Engineered with editorial depth. The design creates an optical illusion of sonic immersion by blurring satellite earbuds in the extreme foreground and background while locking focus on the open charging capsule.",
    challenge:
      "Delivering strong visual engagement without sacrificing boutique editorial aesthetics.",
    solution:
      "Vertical typographic repetition of 'MUSIC' creates visual rhythm, paired with a soft warm taupe backdrop and an ultra-minimal pill CTA element.",
    typography: ["Cabinet Grotesk", "Plus Jakarta Sans", "Helvetica Neue"],
    colorPalette: [
      { name: "Pearl Blush", hex: "#D8B5A7" },
      { name: "Soft Taupe", hex: "#EFE8E1" },
      { name: "Graphite Accent", hex: "#2B2B30" },
      { name: "Warm Amber", hex: "#FF8C38" },
    ],
    featuredIn3D: false,
    coverImage: "/designs/pearlbeat-earbuds.jpeg",
    additionalImages: ["/designs/WhatsApp Image 2026-10-11 at 13.47.57.jpeg"],
    tags: ["Social Design", "Kinetic Type", "Graphic Art", "Editorial"],
  },
  {
    id: "luxora-nocturne",
    title: "LUXORA NOCTURNE",
    category: "Brand Identity",
    year: "2024",
    client: "Botanical Packaging Monograph",
    role: "Art Director / Botanical Stylist",
    aspectRatio: "portrait",
    dimensions: "1080 × 1350 px / Packaging Study",
    summary:
      "Dark botanical flatlay monograph capturing the nocturnal side of LXO, pairing deep amethyst flacon glass with wild elderberry clusters and textured limestone stucco.",
    concept:
      "The nocturnal counterpart to Aegean. Where the day fragrance captures oceanic light, Nocturne explores the olfactory universe of dusk, ripe berry juices, and shadowed stone.",
    challenge:
      "Composing high-density botanical elements around the product without obscuring the geometric silhouette of the flacon.",
    solution:
      "Framing the bottle symmetrically between two organic cascades of wild elderberries dusted with crushed pigment on textured limestone.",
    typography: ["Playfair Display", "Cinzel", "Futura PT"],
    colorPalette: [
      { name: "Amethyst Plum", hex: "#4E173C" },
      { name: "Elderberry Noir", hex: "#1A1118" },
      { name: "Limestone Chalk", hex: "#D6D0CC" },
      { name: "Gilded Serif", hex: "#D4B382" },
    ],
    featuredIn3D: false,
    coverImage: "/designs/luxora-amethyst-perfume.jpeg",
    additionalImages: ["/designs/WhatsApp Image 2026-10-11 at 13.51.51.jpeg"],
    tags: ["Brand Identity", "Botanical Flatlay", "Art Direction", "Graphic Study"],
  },
  {
    id: "defying-gravity",
    title: "DEFYING GRAVITY",
    category: "Poster Design",
    year: "2024",
    client: "Independent Art Direction",
    role: "Poster Designer / Screenprinter",
    aspectRatio: "portrait",
    dimensions: "1080 × 1350 px / Screenprint Poster",
    summary:
      "Surrealist retro automotive poster suspending a classic 1970s coupe among clouds with glowing neon balloons, seasoned with distressed screenprint textures and dry editorial wit.",
    concept:
      "'They said rise above your problems. I took it literally.' A playful neo-Dadaist commentary on escapism, elevating automotive industrial design into the surreal dreamscape of the clouds.",
    challenge:
      "Achieving authentic analog print feel with weathered creases, halftone imperfections, and vibrant neon lithographic inks on aged paper.",
    solution:
      "Contrast between the weathered cyan sky, distressed editorial Didone typography ('DEFYING'), and fluorescent magenta/amber balloons tied with taut crimson chords.",
    typography: ["Didot Bold", "Bodoni MT", "Newsreader"],
    colorPalette: [
      { name: "Cyan Horizon", hex: "#2C7DA0" },
      { name: "Hot Coral Balloon", hex: "#FF3366" },
      { name: "Vintage Sage Coupe", hex: "#8EA89D" },
      { name: "Weathered Paper", hex: "#E8E2D2" },
    ],
    featuredIn3D: true,
    wallPosition: [2.15, 1.85, -9.8],
    wallScale: [1.32, 1.65],
    coverImage: "/designs/defying-vintage-car.jpeg",
    additionalImages: ["/designs/WhatsApp Image 2026-10-11 at 13.52.44.jpeg"],
    tags: ["Surrealism", "Poster Design", "Screenprint", "Neo-Dada", "Typography"],
  },
  {
    id: "fight-club-tyler",
    title: "TYLER — FIGHT CLUB",
    category: "Typography & Experiments",
    year: "2024",
    client: "Cinematic Monograph Series",
    role: "Visual Designer / Typographer",
    aspectRatio: "portrait",
    dimensions: "1080 × 1350 px / Film Monograph",
    summary:
      "A gritty 35mm film tribute to Fincher's Fight Club, capturing Tyler Durden's portrait through heavy analog silver-halide grain, acid green anamorphic light leaks, and sacred emblem geometry.",
    concept:
      "Exploring the deconstruction of modern identity ('You are not your name. Not your past. Not your fears. You're what survives when everything else burns.').",
    challenge:
      "Transforming iconic cinematic photography into a fresh graphic art artifact without falling into generic movie poster tropes.",
    solution:
      "Deconstructing the portrait with a stark white geometric emblem star ('K4S') over the eye, subtle hairline framing rules repeated at the borders ('fightclub fightclub fightclub'), and acid-green edge lighting.",
    typography: ["Helvetica Neue Mono", "Courier Prime", "Neue Montreal"],
    colorPalette: [
      { name: "Silver Halide", hex: "#18181A" },
      { name: "Acid Green Leak", hex: "#76B82A" },
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Grain Charcoal", hex: "#323236" },
    ],
    featuredIn3D: true,
    wallPosition: [3.65, 1.85, -9.8],
    wallScale: [1.32, 1.65],
    coverImage: "/designs/fightclub-tyler-monograph.jpeg",
    additionalImages: ["/designs/WhatsApp Image 2026-10-11 at 13.54.06.jpeg"],
    tags: ["Typography", "Film Grain", "Experimental", "Poster Monograph"],
  },
];
