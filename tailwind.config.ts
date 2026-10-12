import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          void: "#050507",
          black: "#09090C",
          dark: "#0F0F14",
          surface: "#15151B",
          card: "#191921",
          elevated: "#20202B",
          border: "rgba(245, 244, 238, 0.08)",
          borderHover: "rgba(245, 244, 238, 0.18)",
          ivory: "#F4F3ED",
          ivoryMuted: "#C6C4BA",
          silver: "#9B9A93",
          graphite: "#5C5B56",
          accent: "#D6AF64", // Warm subtle metallic gold
        },
      },
      fontFamily: {
        serif: ["var(--font-editorial)", "Cormorant Garamond", "Garamond", "serif"],
        sans: ["var(--font-sans)", "Manrope", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "IBM Plex Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      letterSpacing: {
        widest: ".25em",
        ultra: ".35em",
      },
    },
  },
  plugins: [],
};
export default config;
