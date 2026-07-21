import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { NormalizedPointer } from "../../hooks/useMousePosition";

interface ParticleFieldProps {
  count: number;
  pointer: React.RefObject<NormalizedPointer>;
  reduced?: boolean;
}

/**
 * A sparse field of drifting points standing in for "data" — the raw
 * material a developer learns to shape. Deliberately restrained: this
 * is atmosphere, not a starfield backdrop. Holds still when the user
 * has asked for reduced motion.
 */
export function ParticleField({ count, pointer, reduced = false }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      const radius = 4.5 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i * 3 + 2] = radius * Math.cos(phi) * 0.6 - 2;
      spd[i] = 0.04 + Math.random() * 0.08;
    }
    return [pos, spd];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reduced) return;
    const positionAttr = pointsRef.current.geometry.attributes.position;
    const array = positionAttr.array as Float32Array;

    for (let i = 0; i < count; i += 1) {
      array[i * 3 + 1] += speeds[i] * delta * 4;
      if (array[i * 3 + 1] > 6) array[i * 3 + 1] = -6;
    }
    positionAttr.needsUpdate = true;

    const target = pointer.current;
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(
      pointsRef.current.rotation.y,
      target.x * 0.12 + state.clock.elapsedTime * 0.01,
      0.02
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#5eead4"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
