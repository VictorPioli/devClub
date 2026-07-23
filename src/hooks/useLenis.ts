import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives smooth scrolling via Lenis and keeps it in lockstep with GSAP's
 * ticker so ScrollTrigger-based animations never drift out of sync.
 * No-ops (native scroll only) when the user has requested reduced motion.
 */
export function useLenis(enabled: boolean = true) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!enabled || prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // The active instance is exposed on window so the pinned frontend
    // sequence can reset Lenis' internal target when it collapses its
    // ScrollTrigger; otherwise Lenis' next tick snaps the user back to
    // wherever it thinks scroll should be, undoing our jump.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [enabled]);
}
