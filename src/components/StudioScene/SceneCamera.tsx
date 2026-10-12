import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollState";

/** Camera path start/end positions and look-at target */
const CAM = {
  startPos:   new THREE.Vector3(0.0, 1.62, 3.2),
  endPos:     new THREE.Vector3(0.0, 1.72, -4.5),
  lookAtPos:  new THREE.Vector3(0.0, 1.78, -9.8),
};

export function SceneCamera() {
  const { camera } = useThree();
  const currentPos = useRef(CAM.startPos.clone());
  const targetPos  = useRef(CAM.startPos.clone());

  useFrame((state) => {
    const t = scrollState.progress;
    const time = state.clock.getElapsedTime();

    // Subtle organic steadicam breathing drift (fades as user dollies forward)
    const driftX = Math.sin(time * 0.42) * 0.015 * (1 - t * 0.85);
    const driftY = Math.cos(time * 0.55) * 0.012 * (1 - t * 0.85);

    // Over-the-shoulder crane arc: gracefully swings 52cm to the right of the silhouette
    // as it pushes past, creating classic cinematic framing and zero mesh collision
    const arcX = Math.sin(t * Math.PI) * 0.52;

    // Target position at this scroll progress
    targetPos.current.lerpVectors(CAM.startPos, CAM.endPos, t);
    targetPos.current.x += arcX + driftX;
    targetPos.current.y += driftY;

    // Silky smooth follow (lerp 0.055)
    currentPos.current.lerp(targetPos.current, 0.055);
    camera.position.copy(currentPos.current);
    camera.lookAt(CAM.lookAtPos);
  });

  return null;
}
