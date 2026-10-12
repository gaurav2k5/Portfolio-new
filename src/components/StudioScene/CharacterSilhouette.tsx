import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Premium cinematic silhouette of a creative director standing in quiet contemplation.
 * Designed like an editorial film still: structured tailored coat, natural anatomical drape,
 * subtle trapezius slope, relaxed posture, and contact shadow on the floor.
 */
export function CharacterSilhouette() {
  const groupRef = useRef<THREE.Group>(null!);

  // Shared procedural materials with smooth opacity fading as camera tracks past
  const mats = useMemo(() => {
    return {
      silhouette: new THREE.MeshStandardMaterial({
        color: "#050508",
        roughness: 0.96,
        metalness: 0.02,
        transparent: true,
        opacity: 1,
      }),
      coat: new THREE.MeshStandardMaterial({
        color: "#07070B",
        roughness: 0.92,
        metalness: 0.06,
        emissive: new THREE.Color("#0C0A08"),
        emissiveIntensity: 0.08,
        transparent: true,
        opacity: 1,
      }),
      trouser: new THREE.MeshStandardMaterial({
        color: "#050507",
        roughness: 0.94,
        metalness: 0.02,
        transparent: true,
        opacity: 1,
      }),
      shadow: new THREE.MeshBasicMaterial({
        color: "#000000",
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
      }),
    };
  }, []);

  // Proximity dissolve: when the camera dollies past the silhouette (Z ≈ -0.5 to -2.2),
  // smoothly dissolve out so there is never an awkward mesh clip.
  useFrame((state) => {
    const camZ = state.camera.position.z;
    let alpha = 1;
    if (camZ < -0.4) {
      // Fade out between Z=-0.4 and Z=-2.0
      alpha = Math.max(0, Math.min(1, (camZ - (-2.0)) / (-0.4 - (-2.0))));
    }
    mats.silhouette.opacity = alpha;
    mats.coat.opacity = alpha;
    mats.trouser.opacity = alpha;
    mats.shadow.opacity = alpha * 0.65;
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0, -2.4]}
      rotation={[0, 0, 0]} // Gazing towards -Z (gallery wall)
    >
      {/* ── Floor Contact Shadow / Ambient Occlusion ──────────── */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.138, 0.05]}
        receiveShadow
        material={mats.shadow}
      >
        <circleGeometry args={[0.42, 32]} />
      </mesh>

      {/* ── Head & Hair ───────────────────────────────────────── */}
      <group position={[0, 1.76, 0.02]} rotation={[-0.06, 0, 0]}>
        {/* Cranium / hair silhouette */}
        <mesh castShadow material={mats.silhouette}>
          <sphereGeometry args={[0.115, 24, 24]} />
        </mesh>
        {/* Hair volume & texture silhouette at top/back */}
        <mesh position={[0, 0.03, 0.025]} castShadow material={mats.silhouette}>
          <sphereGeometry args={[0.118, 20, 20]} />
        </mesh>
        {/* Subtle jaw & nape profile */}
        <mesh position={[0, -0.06, 0.01]} castShadow material={mats.silhouette}>
          <cylinderGeometry args={[0.075, 0.065, 0.08, 16]} />
        </mesh>
      </group>

      {/* ── Neck & Trapezius Slope ────────────────────────────── */}
      <mesh position={[0, 1.62, 0.01]} castShadow material={mats.silhouette}>
        <cylinderGeometry args={[0.06, 0.075, 0.14, 16]} />
      </mesh>
      {/* Trapezius muscle slope connecting neck to shoulders */}
      <mesh position={[0, 1.54, 0]} castShadow material={mats.coat}>
        <cylinderGeometry args={[0.09, 0.22, 0.1, 16]} />
      </mesh>

      {/* ── Structured Tailored Coat Collar ──────────────────── */}
      <mesh position={[0, 1.55, 0.01]} rotation={[0.04, 0, 0]} castShadow material={mats.coat}>
        <torusGeometry args={[0.11, 0.028, 12, 24, Math.PI * 1.3]} />
      </mesh>

      {/* ── Upper Coat & Chest Yoke ───────────────────────────── */}
      {/* Shoulder line — broad, structured architectural tailoring */}
      <mesh position={[0, 1.47, 0]} castShadow material={mats.coat}>
        <boxGeometry args={[0.48, 0.14, 0.22]} />
      </mesh>

      {/* Shoulder caps with natural anatomical curve */}
      <mesh position={[-0.23, 1.45, 0]} castShadow material={mats.coat}>
        <sphereGeometry args={[0.075, 16, 16]} />
      </mesh>
      <mesh position={[0.23, 1.45, 0]} castShadow material={mats.coat}>
        <sphereGeometry args={[0.075, 16, 16]} />
      </mesh>

      {/* Upper torso / chest */}
      <mesh position={[0, 1.32, 0]} castShadow material={mats.coat}>
        <cylinderGeometry args={[0.23, 0.20, 0.26, 18]} />
      </mesh>

      {/* ── Mid & Lower Overcoat (Drapes to Mid-Thigh) ─────────── */}
      {/* Waist taper */}
      <mesh position={[0, 1.10, 0]} castShadow material={mats.coat}>
        <cylinderGeometry args={[0.20, 0.22, 0.28, 18]} />
      </mesh>
      {/* Lower coat body expanding slightly towards hem */}
      <mesh position={[0, 0.88, 0]} castShadow material={mats.coat}>
        <cylinderGeometry args={[0.22, 0.25, 0.32, 18]} />
      </mesh>
      {/* Coat bottom hem */}
      <mesh position={[0, 0.70, 0]} castShadow material={mats.coat}>
        <cylinderGeometry args={[0.25, 0.265, 0.16, 18]} />
      </mesh>

      {/* ── Relaxed Coat Arms (Hands in pockets / by side) ────── */}
      {/* Left upper sleeve */}
      <mesh position={[-0.235, 1.25, 0.02]} rotation={[0.06, 0, 0.04]} castShadow material={mats.coat}>
        <cylinderGeometry args={[0.068, 0.06, 0.38, 14]} />
      </mesh>
      {/* Left forearm angled towards coat pocket */}
      <mesh position={[-0.22, 0.94, 0.06]} rotation={[0.22, 0, 0.02]} castShadow material={mats.coat}>
        <cylinderGeometry args={[0.058, 0.048, 0.34, 14]} />
      </mesh>
      {/* Left hand cuff */}
      <mesh position={[-0.20, 0.78, 0.1]} castShadow material={mats.silhouette}>
        <sphereGeometry args={[0.042, 12, 12]} />
      </mesh>

      {/* Right upper sleeve */}
      <mesh position={[0.235, 1.25, 0.02]} rotation={[0.06, 0, -0.04]} castShadow material={mats.coat}>
        <cylinderGeometry args={[0.068, 0.06, 0.38, 14]} />
      </mesh>
      {/* Right forearm angled towards coat pocket */}
      <mesh position={[0.22, 0.94, 0.06]} rotation={[0.22, 0, -0.02]} castShadow material={mats.coat}>
        <cylinderGeometry args={[0.058, 0.048, 0.34, 14]} />
      </mesh>
      {/* Right hand cuff */}
      <mesh position={[0.20, 0.78, 0.1]} castShadow material={mats.silhouette}>
        <sphereGeometry args={[0.042, 12, 12]} />
      </mesh>

      {/* ── Tailored Straight-Leg Trousers ────────────────────── */}
      {/* Left leg */}
      <mesh position={[-0.10, 0.44, 0]} rotation={[0, 0, 0.015]} castShadow material={mats.trouser}>
        <cylinderGeometry args={[0.075, 0.06, 0.48, 14]} />
      </mesh>
      <mesh position={[-0.10, 0.12, 0]} rotation={[0, 0, 0.01]} castShadow material={mats.trouser}>
        <cylinderGeometry args={[0.06, 0.052, 0.36, 14]} />
      </mesh>

      {/* Right leg */}
      <mesh position={[0.10, 0.44, 0]} rotation={[0, 0, -0.015]} castShadow material={mats.trouser}>
        <cylinderGeometry args={[0.075, 0.06, 0.48, 14]} />
      </mesh>
      <mesh position={[0.10, 0.12, 0]} rotation={[0, 0, -0.01]} castShadow material={mats.trouser}>
        <cylinderGeometry args={[0.06, 0.052, 0.36, 14]} />
      </mesh>

      {/* ── Minimalist Leather Dress Shoes ────────────────────── */}
      {/* Left shoe */}
      <group position={[-0.10, -0.10, 0.04]}>
        <mesh position={[0, 0.02, 0]} castShadow material={mats.silhouette}>
          <boxGeometry args={[0.09, 0.05, 0.22]} />
        </mesh>
        <mesh position={[0, 0.01, 0.08]} castShadow material={mats.silhouette}>
          <cylinderGeometry args={[0.045, 0.042, 0.04, 12]} />
        </mesh>
      </group>

      {/* Right shoe */}
      <group position={[0.10, -0.10, 0.04]}>
        <mesh position={[0, 0.02, 0]} castShadow material={mats.silhouette}>
          <boxGeometry args={[0.09, 0.05, 0.22]} />
        </mesh>
        <mesh position={[0, 0.01, 0.08]} castShadow material={mats.silhouette}>
          <cylinderGeometry args={[0.045, 0.042, 0.04, 12]} />
        </mesh>
      </group>
    </group>
  );
}
