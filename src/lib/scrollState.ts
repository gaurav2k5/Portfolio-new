/** Shared scroll progress state — readable from both GSAP and R3F useFrame */
export const scrollState = {
  /** Normalized scroll progress 0→1 over the hero section */
  progress: 0,
  /** Raw scroll Y in pixels */
  scrollY: 0,
  /** Pixels per second (velocity) */
  velocity: 0,
};
