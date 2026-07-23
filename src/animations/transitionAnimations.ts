import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface TransitionAnimationRefs {
  root: HTMLElement;
  title: HTMLElement | null;
  subtitle: HTMLElement | null;
  particles: (HTMLElement | null)[];
}

/**
 * A single, simple reveal — no pin, no scrub. This section's whole job
 * is to be a quiet chapter break between the Hero and the pinned
 * Frontend->AI sequence, so its animation stays proportionally modest:
 * title, then subtitle, then the ambient particles settle in behind
 * them. Everything is driven by one ScrollTrigger that fires once and
 * never replays.
 */
export function runTransitionAnimations(refs: TransitionAnimationRefs, reduced: boolean) {
  const particles = refs.particles.filter((el): el is HTMLElement => el !== null);
  const revealTargets = [refs.title, refs.subtitle].filter(
    (el): el is HTMLElement => el !== null
  );

  const ctx = gsap.context(() => {
    if (reduced) {
      gsap.set([...revealTargets, ...particles], { opacity: 1, y: 0 });
      return;
    }

    gsap.set(refs.title, { opacity: 0, y: 28 });
    gsap.set(refs.subtitle, { opacity: 0, y: 18 });
    gsap.set(particles, { opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "expo.out" },
      scrollTrigger: {
        trigger: refs.root,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl.to(refs.title, { opacity: 1, y: 0, duration: 0.75 })
      .to(refs.subtitle, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .to(
        particles,
        { opacity: 1, duration: 0.9, stagger: 0.04, ease: "sine.out" },
        "-=0.5"
      );

    ScrollTrigger.refresh();
  }, refs.root);

  return () => ctx.revert();
}
