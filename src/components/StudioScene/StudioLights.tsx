import { useMemo } from "react";
import * as THREE from "three";

interface GallerySpotProps {
  position: [number, number, number];
  targetPosition: [number, number, number];
  intensity: number;
  color?: string;
  angle?: number;
  penumbra?: number;
}

function GallerySpot({
  position,
  targetPosition,
  intensity,
  color = "#FFF4E0",
  angle = 0.55,
  penumbra = 0.7,
}: GallerySpotProps) {
  const target = useMemo(() => {
    const obj = new THREE.Object3D();
    obj.position.set(...targetPosition);
    return obj;
  }, [targetPosition]);

  return (
    <>
      <primitive object={target} />
      <spotLight
        position={position}
        target={target}
        intensity={intensity}
        color={color}
        angle={angle}
        penumbra={penumbra}
        decay={1.6}
      />
    </>
  );
}

export function StudioLights() {
  return (
    <>
      {/* ── Ambient Museum Atmosphere ────────────────────────────── */}
      <ambientLight intensity={0.42} color="#ECE7DE" />

      {/* ── Soft Directional Architectural Key Light ─────────────── */}
      {/* High overhead directional light casting crisp floor contact shadows */}
      <directionalLight
        position={[0, 6.5, -4.0]}
        intensity={1.15}
        color="#FFF5E4"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
        shadow-camera-near={0.5}
        shadow-camera-far={22}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={5}
        shadow-camera-bottom={-2}
      />

      {/* ── Museum Track Spotlights — Grazing the Artworks ───────── */}
      {/* Left wing — lights DEFYING, FRAME & MOVE */}
      <GallerySpot
        position={[-3.2, 4.6, -7.2]}
        targetPosition={[-3.2, 1.85, -9.8]}
        intensity={115}
        color="#FDECCC"
        angle={0.68}
        penumbra={0.9}
      />

      {/* Center hero — lights MOVE & LUXORA directly behind silhouette */}
      <GallerySpot
        position={[0.0, 4.6, -7.2]}
        targetPosition={[0.0, 1.85, -9.8]}
        intensity={135}
        color="#FFF6E8"
        angle={0.72}
        penumbra={0.9}
      />

      {/* Right wing — lights TRÜKE & TYLER */}
      <GallerySpot
        position={[3.2, 4.6, -7.2]}
        targetPosition={[3.2, 1.85, -9.8]}
        intensity={110}
        color="#EDE2D0"
        angle={0.68}
        penumbra={0.9}
      />

      {/* ── Cinematic Rim Light on Silhouette ─────────────────────── */}
      {/* Warm champagne backlight that grazes shoulders, collar and head */}
      <pointLight
        position={[0, 2.05, -3.2]}
        intensity={16}
        color="#E2C17D"
        decay={1.8}
        distance={4.2}
      />

      {/* ── Floor Specular Bounce ─────────────────────────────────── */}
      <pointLight
        position={[0, 0.2, -6.5]}
        intensity={12}
        color="#342A1E"
        decay={1.8}
        distance={8}
      />

      {/* ── Room Atmosphere Fill ──────────────────────────────────── */}
      <hemisphereLight args={["#2E2720", "#08080C", 0.35]} />
    </>
  );
}

