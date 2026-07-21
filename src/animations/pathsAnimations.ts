import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface PathsAnimationRefs {
  root: HTMLElement;
  heading: HTMLElement | null;
  cards: (HTMLElement | null)[];
}

/**
 * Deliberately lighter than the Frontend/Backend cinematic sequence:
 * no pin, no scrub, nothing that needs to survive scrolling back up.
 * The heading and four cards simply stagger into place once the
 * section enters view, and never replay — a showcase, not a build.
 */
export function runPathsAnimations(refs: PathsAnimationRefs, reduced: boolean) {
  const ctx = gsap.context(() => {
    if (reduced) {
      gsap.set(refs.heading, { opacity: 1, y: 0 });
      gsap.set(refs.cards, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(refs.heading, { opacity: 0, y: 22 });
    gsap.set(refs.cards, { opacity: 0, y: 40 });

    gsap.timeline({
      defaults: { ease: "expo.out" },
      scrollTrigger: {
        trigger: refs.root,
        start: "top 78%",
        toggleActions: "play none none none",
      },
    })
      .to(refs.heading, { opacity: 1, y: 0, duration: 0.7 })
      .to(refs.cards, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, "-=0.45");
  }, refs.root);

  return () => ctx.revert();
}
