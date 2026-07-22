import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ProfessorsAnimationRefs {
  root: HTMLElement;
  heading: HTMLElement | null;
  showcase: HTMLElement | null;
  navControls: HTMLElement | null;
}

/**
 * Entrance only — the section itself is static once revealed. Switching
 * between professors is handled separately, inline in the component, via
 * a click-driven GSAP tween (never scroll-linked).
 */
export function runProfessorsAnimations(refs: ProfessorsAnimationRefs, reduced: boolean) {
  const ctx = gsap.context(() => {
    if (reduced) {
      gsap.set(refs.heading, { opacity: 1, y: 0 });
      gsap.set(refs.showcase, { opacity: 1, y: 0 });
      gsap.set(refs.navControls, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(refs.heading, { opacity: 0, y: 22 });
    gsap.set(refs.showcase, { opacity: 0, y: 40 });
    gsap.set(refs.navControls, { opacity: 0, y: 22 });

    gsap.timeline({
      defaults: { ease: "expo.out" },
      scrollTrigger: {
        trigger: refs.root,
        start: "top 78%",
        toggleActions: "play none none none",
      },
    })
      .to(refs.heading, { opacity: 1, y: 0, duration: 0.7 })
      .to(refs.showcase, { opacity: 1, y: 0, duration: 0.8 }, "-=0.45")
      .to(refs.navControls, { opacity: 1, y: 0, duration: 0.6 }, "-=0.35");
  }, refs.root);

  return () => ctx.revert();
}
