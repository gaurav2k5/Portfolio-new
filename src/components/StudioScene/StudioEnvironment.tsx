import { useMemo } from "react";
import * as THREE from "three";

/**
 * Expansive architectural gallery environment:
 * - Monumental seamless back gallery wall
 * - Wide polished concrete floor with subtle artwork reflections
 * - Architectural lighting track rail
 * - Deep chiaroscuro atmospheric falloff
 */
export function StudioEnvironment() {
  return (
    <group>
      {/* ── Polished Gallery Floor (Dark Architectural Terrazzo) ──── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.14, -4]} receiveShadow>
        <planeGeometry args={[44, 32]} />
        <meshStandardMaterial
          color="#07070A"
          roughness={0.24}
          metalness={0.35}
          envMapIntensity={0.6}
        />
      </mesh>

      {/* Subtle exhibition floor runner / viewing strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.136, -8.2]} receiveShadow>
        <planeGeometry args={[16, 4.2]} />
        <meshStandardMaterial
          color="#09090D"
          roughness={0.16}
          metalness={0.45}
        />
      </mesh>

      {/* ── Monumental Gallery Back Wall (Expansive, no box corners) ── */}
      <mesh position={[0, 4.2, -10.0]} receiveShadow>
        <planeGeometry args={[44, 14]} />
        <meshStandardMaterial
          color="#0A0A0E"
          roughness={0.92}
          metalness={0.02}
        />
      </mesh>

      {/* ── High Architectural Ceiling ────────────────────────────── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 7.5, -5]}>
        <planeGeometry args={[44, 32]} />
        <meshStandardMaterial color="#050507" roughness={1} metalness={0} />
      </mesh>

      {/* ── Architectural Gallery Track Rail ──────────────────────── */}
      {/* Horizontal rail beam */}
      <mesh position={[0, 4.6, -8.0]}>
        <boxGeometry args={[16, 0.05, 0.06]} />
        <meshStandardMaterial color="#14141A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Track rail suspension cables */}
      {[-7, -3.5, 0, 3.5, 7].map((x, i) => (
        <mesh key={`cable-${i}`} position={[x, 6.0, -8.0]}>
          <cylinderGeometry args={[0.006, 0.006, 2.8, 6]} />
          <meshStandardMaterial color="#1F1F28" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}

      {/* Miniature track spotlight cylinders */}
      {[-5.0, -3.0, -1.0, 1.0, 3.0, 5.0].map((x, i) => (
        <group key={`track-light-${i}`} position={[x, 4.52, -8.0]} rotation={[0.4, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.038, 0.045, 0.14, 12]} />
            <meshStandardMaterial color="#1C1C24" roughness={0.25} metalness={0.85} />
          </mesh>
          {/* Subtle warm lens glow */}
          <mesh position={[0, -0.072, 0]}>
            <circleGeometry args={[0.035, 12]} />
            <meshBasicMaterial color="#FFECC8" />
          </mesh>
        </group>
      ))}

      {/* ── Floor Skirting Reveal (Minimalist negative detail) ─────── */}
      <mesh position={[0, -0.08, -9.96]}>
        <boxGeometry args={[44, 0.12, 0.02]} />
        <meshStandardMaterial color="#050507" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* ── Subtle Atmospheric Dust Points Cloud (1 single draw call) ── */}
      <DustMotes />
    </group>
  );
}

function DustMotes() {
  const positions = useMemo(() => {
    const coords = new Float32Array(24 * 3);
    for (let i = 0; i < 24; i++) {
      coords[i * 3 + 0] = Math.sin(i * 1.7) * 6;
      coords[i * 3 + 1] = 0.8 + ((i * 1.3) % 3.6);
      coords[i * 3 + 2] = -2.5 - ((i * 2.1) % 6.0);
    }
    return coords;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#F5EFE6"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
