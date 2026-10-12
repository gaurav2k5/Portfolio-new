"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { generateAllPosters, PosterKey } from "./generatePosterTextures";

interface PosterFrame {
  id: string;
  image: string;
  position: [number, number, number];
  size: [number, number];
  label: string;
  fallbackKey: PosterKey;
}

/**
 * Museum-curated layout aligned to an architectural eye-level datum line (Y = 1.85m).
 * Showcasing Gaurav's actual graphic design artworks in 4:5 vertical proportions.
 */
const POSTER_FRAMES: PosterFrame[] = [
  {
    id: "defying",
    image: "/designs/defying-vintage-car.jpeg",
    position: [-4.25, 1.85, -9.8],
    size: [1.36, 1.7],
    label: "01 // DEFYING",
    fallbackKey: "signal",
  },
  {
    id: "frame-mag",
    image: "/designs/frame-magazine.png",
    position: [-2.55, 1.85, -9.8],
    size: [1.36, 1.7],
    label: "02 // FRAME",
    fallbackKey: "forma",
  },
  {
    id: "move-diff",
    image: "/designs/move-different-hoodie.png",
    position: [-0.85, 1.85, -9.8],
    size: [1.36, 1.7],
    label: "03 // MOVE DIFFERENT",
    fallbackKey: "amplitude",
  },
  {
    id: "luxora-ocean",
    image: "/designs/luxora-ocean-perfume.jpeg",
    position: [0.85, 1.85, -9.8],
    size: [1.36, 1.7],
    label: "04 // LUXORA",
    fallbackKey: "vela",
  },
  {
    id: "truke",
    image: "/designs/truke-headphones.png",
    position: [2.55, 1.85, -9.8],
    size: [1.36, 1.7],
    label: "05 // TRÜKE",
    fallbackKey: "meridian",
  },
  {
    id: "fight-club",
    image: "/designs/fightclub-tyler-monograph.jpeg",
    position: [4.25, 1.85, -9.8],
    size: [1.36, 1.7],
    label: "06 // TYLER",
    fallbackKey: "noor",
  },
];

const FRAME_DEPTH = 0.055;
const FRAME_BORDER = 0.04;
const MAT_BORDER = 0.035;

// Shadowbox frame: matte extruded dark graphite
const frameMat = new THREE.MeshStandardMaterial({
  color: "#121217",
  roughness: 0.38,
  metalness: 0.5,
});

// Museum passe-partout: fine warm ivory paper border
const matMat = new THREE.MeshStandardMaterial({
  color: "#ECE9E2",
  roughness: 0.95,
  metalness: 0.0,
});

// Miniature brass gallery plaque material
const plaqueMat = new THREE.MeshStandardMaterial({
  color: "#D6AF64",
  roughness: 0.3,
  metalness: 0.7,
});

function SingleFrame({
  frame,
  fallbackTexture,
}: {
  frame: PosterFrame;
  fallbackTexture?: THREE.CanvasTexture;
}) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let active = true;
    const loader = new THREE.TextureLoader();
    loader.load(
      frame.image,
      (loadedTex) => {
        if (!active) return;
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        loadedTex.needsUpdate = true;
        setTexture(loadedTex);
      },
      undefined,
      (err) => {
        console.warn(`Could not load artwork texture ${frame.image}`, err);
      }
    );
    return () => {
      active = false;
    };
  }, [frame.image]);

  const activeTexture = texture || fallbackTexture;
  if (!activeTexture) return null;

  const [fw, fh] = frame.size;
  const matW = fw + MAT_BORDER * 2;
  const matH = fh + MAT_BORDER * 2;
  const outerW = matW + FRAME_BORDER * 2;
  const outerH = matH + FRAME_BORDER * 2;

  const plaqueY = -(outerH / 2 + 0.12);

  return (
    <group position={frame.position}>
      {/* Outer shadowbox frame */}
      <mesh receiveShadow>
        <boxGeometry args={[outerW, outerH, FRAME_DEPTH]} />
        <primitive object={frameMat} attach="material" />
      </mesh>

      {/* Museum passe-partout / archival matte board */}
      <mesh position={[0, 0, FRAME_DEPTH / 2 - 0.003]}>
        <planeGeometry args={[matW, matH]} />
        <primitive object={matMat} attach="material" />
      </mesh>

      {/* Artwork plane */}
      <mesh position={[0, 0, FRAME_DEPTH / 2 + 0.001]}>
        <planeGeometry args={[fw, fh]} />
        <meshStandardMaterial
          key={activeTexture.uuid}
          map={activeTexture}
          roughness={0.82}
          metalness={0.0}
          toneMapped={false}
        />
      </mesh>

      {/* Anti-reflective museum glass glaze — performant lightweight specular reflection */}
      <mesh position={[0, 0, FRAME_DEPTH / 2 + 0.004]}>
        <planeGeometry args={[matW, matH]} />
        <meshStandardMaterial
          transparent
          opacity={0.045}
          roughness={0.06}
          metalness={0.15}
          color="#F0F4F8"
          depthWrite={false}
        />
      </mesh>

      {/* Miniature gallery wall plaque beneath frame */}
      <mesh position={[0, plaqueY, -0.01]} receiveShadow>
        <boxGeometry args={[0.26, 0.038, 0.01]} />
        <meshStandardMaterial color="#16161D" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Brass label accent rule */}
      <mesh position={[0, plaqueY - 0.022, 0.002]}>
        <planeGeometry args={[0.18, 0.003]} />
        <primitive object={plaqueMat} attach="material" />
      </mesh>
    </group>
  );
}

export function PosterWall() {
  const texturesRef = useRef<Map<PosterKey, THREE.CanvasTexture> | null>(null);

  // Generate fallback poster canvases on client (memoized)
  const fallbackTextures = useMemo<Map<PosterKey, THREE.CanvasTexture>>(() => {
    if (typeof document === "undefined") return new Map();
    const canvases = generateAllPosters();
    const texMap = new Map<PosterKey, THREE.CanvasTexture>();
    canvases.forEach((canvas, key) => {
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      texMap.set(key, tex);
    });
    texturesRef.current = texMap;
    return texMap;
  }, []);

  // Cleanup fallback textures on unmount
  useEffect(() => {
    return () => {
      texturesRef.current?.forEach((t) => t.dispose());
    };
  }, []);

  return (
    <group>
      {/* Individual framed artworks curated along datum line */}
      {POSTER_FRAMES.map((frame) => {
        const fallbackTex = fallbackTextures.get(frame.fallbackKey);
        return (
          <SingleFrame
            key={frame.id}
            frame={frame}
            fallbackTexture={fallbackTex}
          />
        );
      })}
    </group>
  );
}
