import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroAnimationRefs {
  root: HTMLElement;
  lines: HTMLElement[];
  eyebrow: HTMLElement | null;
  subline: HTMLElement | null;
  meta: HTMLElement | null;
  scrollCue: HTMLElement | null;
  canvasWrapper: HTMLElement | null;
}

/**
 * Runs the hero's cinematic entrance and wires its scroll-out.
 * Returns a cleanup function; caller is responsible for invoking it
 * (typically inside a useLayoutEffect / gsap.context teardown).
 */
export function runHeroAnimations(refs: HeroAnimationRefs, reduced: boolean) {
  const ctx = gsap.context(() => {
    if (reduced) {
      gsap.set([refs.eyebrow, refs.subline, refs.meta, refs.scrollCue], {
        opacity: 1,
        y: 0,
      });
      gsap.set(refs.lines, { yPercent: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.fromTo(
      refs.eyebrow,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7 },
      0.15
    )
      .fromTo(
        refs.lines,
        { yPercent: 110, rotate: 1.5 },
        { yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.09 },
        0.3
      )
      .fromTo(
        refs.subline,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.9
      )
      .fromTo(
        refs.meta,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.05
      )
      .fromTo(
        refs.scrollCue,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.3
      );

    // Scroll-driven exit: the hero recedes as the next stage approaches —
    // text lifts and fades, the 3D core sinks back and dissolves.
    ScrollTrigger.create({
      trigger: refs.root,
      start: "top top",
      end: "+=100%",
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set([refs.eyebrow, refs.lines, refs.subline, refs.meta], {
          opacity: 1 - progress * 1.4,
          y: -progress * 60,
        });
        if (refs.canvasWrapper) {
          gsap.set(refs.canvasWrapper, {
            opacity: 1 - progress,
            scale: 1 - progress * 0.15,
          });
        }
        if (refs.scrollCue) {
          gsap.set(refs.scrollCue, { opacity: 1 - progress * 3 });
        }
      },
    });
  }, refs.root);

  return () => ctx.revert();
}
