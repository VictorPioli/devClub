import { useEffect, useRef } from "react";

export interface NormalizedPointer {
  x: number; // -1 .. 1, left to right
  y: number; // -1 .. 1, top to bottom
}

/**
 * Tracks pointer position normalized to -1..1 in a ref (not state) so
 * consumers like R3F's useFrame can read it every frame without
 * triggering React re-renders.
 */
export function useMousePosition() {
  const pointer = useRef<NormalizedPointer>({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return pointer;
}
