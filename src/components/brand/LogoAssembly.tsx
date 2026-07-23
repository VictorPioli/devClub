import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LOGO_FRAGMENTS } from "./logoFragments";

interface LogoAssemblyProps {
  reduced: boolean;
}

// Frame geometry and easing straight from devclub_logo_v2.svg — see
// <rect x="405" y="109" width="445" height="457" .../> in the source file.
const FRAME = { x: 405, y: 109, width: 445, height: 457, rx: 17 };
const FRAME_CENTER = {
  x: FRAME.x + FRAME.width / 2,
  y: FRAME.y + FRAME.height / 2,
};
const EASE_FLUID: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface FragmentMotion {
  id: string;
  d: string;
  startX: number;
  startY: number;
  startRotate: number;
  delay: number;
  duration: number;
}

export function LogoAssembly({ reduced }: LogoAssemblyProps) {
  // Each fragment scatters outward along the direction from the frame's
  // center through its own resting position, so pieces fly in from
  // "outside" the mark rather than from arbitrary screen corners.
  const fragments = useMemo<FragmentMotion[]>(() => {
    return LOGO_FRAGMENTS.map((frag, index) => {
      const dirX = frag.cx - FRAME_CENTER.x;
      const dirY = frag.cy - FRAME_CENTER.y;
      const len = Math.hypot(dirX, dirY) || 1;
      const nx = dirX / len;
      const ny = dirY / len;
      const distance = 190 + Math.random() * 260;
      const jitter = 70;

      return {
        id: frag.id,
        d: frag.d,
        startX: nx * distance + (Math.random() - 0.5) * jitter,
        startY: ny * distance + (Math.random() - 0.5) * jitter,
        startRotate: (Math.random() - 0.5) * 50,
        delay: 0.3 + index * 0.045 + Math.random() * 0.45,
        duration: 1.7 + Math.random() * 0.6,
      };
    });
  }, []);

  const cascadeEnd = useMemo(
    () => Math.max(...fragments.map((f) => f.delay + f.duration)),
    [fragments]
  );

  // Once every fragment has landed and the frame has faded in, the mark
  // settles into a slow, quiet breathing glow — proof it's alive, not
  // a second act of the build. Held off until the cascade actually
  // finishes so it never overlaps the entrance.
  const [assembled, setAssembled] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const settleAt = (cascadeEnd - 0.5 + 0.9) * 1000;
    const timer = setTimeout(() => setAssembled(true), settleAt);
    return () => clearTimeout(timer);
  }, [reduced, cascadeEnd]);

  // Reduced motion wins outright: no entrance animation and no idle
  // loop, regardless of whether the settle timer would otherwise have
  // fired by now.
  const breathing = assembled && !reduced;

  return (
    <svg
      viewBox="0 0 1254 597"
      role="img"
      aria-label="Marca DevClub — logotipo neon que se monta a partir de fragmentos"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <linearGradient id="neonGreen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#55ff36" />
          <stop offset="48%" stopColor="#27f52f" />
          <stop offset="100%" stopColor="#13d927" />
        </linearGradient>

        <linearGradient id="neonPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9b2cff" />
          <stop offset="50%" stopColor="#6c1cff" />
          <stop offset="100%" stopColor="#b52cff" />
        </linearGradient>

        <filter id="greenGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="purpleGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Neon purple frame — fades in once the fragment cascade lands */}
      <g id="outer-border">
        <motion.g
          filter="url(#purpleGlow)"
          initial={reduced ? false : { opacity: 0 }}
          animate={breathing ? { opacity: [0.85, 1, 0.85] } : { opacity: 0.85 }}
          transition={
            breathing
              ? { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.9, ease: EASE_FLUID, delay: reduced ? 0 : cascadeEnd - 0.5 }
          }
        >
          <rect
            x={FRAME.x}
            y={FRAME.y}
            width={FRAME.width}
            height={FRAME.height}
            rx={FRAME.rx}
            fill="none"
            stroke="#7d20ff"
            strokeWidth={9}
          />
        </motion.g>
        <motion.rect
          x={FRAME.x}
          y={FRAME.y}
          width={FRAME.width}
          height={FRAME.height}
          rx={FRAME.rx}
          fill="none"
          stroke="url(#neonPurple)"
          strokeWidth={5}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE_FLUID, delay: reduced ? 0 : cascadeEnd - 0.5 }}
        />
      </g>

      {/* Green logo symbol — 26 fragments, each its own moveto/close subpath
          from the source file, verified to have zero bounding-box overlap
          so splitting them out of the original compound path changes
          nothing about how they render. */}
      <g id="logo-elements">
        <g
          fill="url(#neonGreen)"
          fillRule="evenodd"
          clipRule="evenodd"
          filter="url(#greenGlow)"
        >
          {fragments.map((frag) => (
            <motion.path
              key={`glow-${frag.id}`}
              d={frag.d}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              initial={
                reduced
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.3,
                      x: frag.startX,
                      y: frag.startY,
                      rotate: frag.startRotate,
                    }
              }
              animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
              transition={{ duration: frag.duration, ease: EASE_FLUID, delay: frag.delay }}
            />
          ))}
        </g>
        <g fill="url(#neonGreen)" fillRule="evenodd" clipRule="evenodd">
          {fragments.map((frag) => (
            <motion.path
              key={`crisp-${frag.id}`}
              d={frag.d}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              initial={
                reduced
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.3,
                      x: frag.startX,
                      y: frag.startY,
                      rotate: frag.startRotate,
                    }
              }
              animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
              transition={{ duration: frag.duration, ease: EASE_FLUID, delay: frag.delay }}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
