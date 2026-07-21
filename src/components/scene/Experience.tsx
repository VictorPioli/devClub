import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ParticleField } from "./ParticleField";
import type { NormalizedPointer } from "../../hooks/useMousePosition";
import type { DeviceTier } from "../../hooks/useDeviceTier";

interface ExperienceProps {
  pointer: React.RefObject<NormalizedPointer>;
  tier: DeviceTier;
  reducedMotion: boolean;
}

/**
 * Ambient background only now — the drifting data-point field. The
 * signature mark itself is the 2D LogoAssembly layered on top; see
 * Hero.tsx.
 */
export function Experience({ pointer, tier, reducedMotion }: ExperienceProps) {
  const particleCount = tier === "reduced" ? 550 : 1800;

  return (
    <Canvas
      dpr={[1, tier === "reduced" ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <ParticleField count={particleCount} pointer={pointer} reduced={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}
