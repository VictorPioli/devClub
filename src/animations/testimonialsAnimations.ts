import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface TestimonialsAnimationRefs {
  root: HTMLElement;
  heading: HTMLElement | null;
  cards: (HTMLElement | null)[];
  metrics: HTMLElement | null;
}

export function runTestimonialsAnimations(refs: TestimonialsAnimationRefs, reduced: boolean) {
  const ctx = gsap.context(() => {
    if (reduced) {
      gsap.set(refs.heading, { opacity: 1, y: 0 });
      gsap.set(refs.cards, { opacity: 1, y: 0 });
      gsap.set(refs.metrics, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(refs.heading, { opacity: 0, y: 22 });
    gsap.set(refs.cards, { opacity: 0, y: 40 });
    gsap.set(refs.metrics, { opacity: 0, y: 22 });

    gsap.timeline({
      defaults: { ease: "expo.out" },
      scrollTrigger: {
        trigger: refs.root,
        start: "top 78%",
        toggleActions: "play none none none",
      },
    })
      .to(refs.heading, { opacity: 1, y: 0, duration: 0.7 })
      .to(refs.cards, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.45")
      .to(refs.metrics, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3");
  }, refs.root);

  return () => ctx.revert();
}
