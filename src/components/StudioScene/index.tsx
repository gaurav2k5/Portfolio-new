"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor, AdaptiveDpr } from "@react-three/drei";
import { StudioLights } from "./StudioLights";
import { CharacterSilhouette } from "./CharacterSilhouette";
import { PosterWall } from "./PosterWall";
import { StudioEnvironment } from "./StudioEnvironment";
import { SceneCamera } from "./SceneCamera";
import { scrollState } from "@/lib/scrollState";

function SceneContents() {
  return (
    <>
      <fog attach="fog" args={["#050507", 6, 24]} />
      <SceneCamera />
      <StudioLights />
      <StudioEnvironment />
      <PosterWall />
      <CharacterSilhouette />
    </>
  );
}

interface StudioSceneProps {
  /** Height in viewport units that the scroll should travel over */
  scrollHeight?: number;
}

export function StudioScene({ scrollHeight = 300 }: StudioSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  // Update scrollState.progress and pause Canvas when scrolled past the hero
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = window.innerHeight * (scrollHeight / 100);
          scrollState.scrollY = scrollY;
          scrollState.progress = Math.min(scrollY / maxScroll, 1);

          // Once user has scrolled past 3.6 viewports into #work, pause WebGL loop
          const visible = scrollY < window.innerHeight * 3.6;
          setInView((prev) => (prev !== visible ? visible : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollHeight]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <Canvas
        frameloop={inView ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: 1, // ACESFilmicToneMapping
          toneMappingExposure: 1.35,
          stencil: false,
          depth: true,
        }}
        camera={{
          fov: 40,
          near: 0.1,
          far: 60,
          position: [0, 1.62, 3.2],
        }}
        shadows
        dpr={[1, 1.25]}
        style={{ background: "#050507" }}
      >
        <PerformanceMonitor>
          <AdaptiveDpr pixelated />
          <Suspense fallback={null}>
            <SceneContents />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}

/** Lightweight fallback when WebGL is not available */
export function StudioSceneFallback() {
  return (
    <div
      className="absolute inset-0 w-full h-full flex items-end justify-center pb-24"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 50% 100%, #1A1510 0%, #050507 70%)",
      }}
    >
      <div className="text-center space-y-1">
        <p className="text-label text-[var(--graphite)] text-[0.6rem] tracking-[0.2em]">
          CREATIVE STUDIO
        </p>
      </div>
    </div>
  );
}
