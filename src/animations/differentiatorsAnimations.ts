import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface DifferentiatorsAnimationRefs {
  root: HTMLElement;
  header: HTMLElement | null;
  stats: HTMLElement | null;
  blocks: (HTMLElement | null)[];
}

/**
 * Editorial, not cinematic: header, stats, and the ecosystem each
 * reveal independently as they enter view. Kept intentionally simple
 * — the section's job is to inform, not perform. If any trigger fails
 * to fire (Lenis race, layout shift, HMR), a safety pass forces the
 * final visible state after mount so content is never left invisible.
 */
export function runDifferentiatorsAnimations(
  refs: DifferentiatorsAnimationRefs,
  reduced: boolean,
) {
  const softTargets = [refs.header, refs.stats].filter(
    (el): el is HTMLElement => Boolean(el),
  );

  const ctx = gsap.context(() => {
    // The ecosystem itself is always visible — it's dense and interactive,
    // and hiding it behind a scroll trigger risks it staying invisible if
    // any scroll/refresh race occurs. Only the header and stats get the
    // subtle fade-in.
    if (reduced) {
      gsap.set(softTargets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(softTargets, { opacity: 0, y: 24 });

    softTargets.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    ScrollTrigger.refresh();
  }, refs.root);

  return () => ctx.revert();
}
