import { useEffect, useState } from "react";

export type DeviceTier = "full" | "reduced";

/**
 * Coarse capability check used to scale back particle counts and
 * post-processing on small / touch-primary viewports.
 */
export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("full");

  useEffect(() => {
    const evaluate = () => {
      const isNarrow = window.innerWidth < 820;
      const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      setTier(isNarrow || isCoarsePointer ? "reduced" : "full");
    };

    evaluate();
    window.addEventListener("resize", evaluate);
    return () => window.removeEventListener("resize", evaluate);
  }, []);

  return tier;
}
