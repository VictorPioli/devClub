import { useLayoutEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { runTransitionAnimations } from "../../animations/transitionAnimations";
import styles from "./Transition.module.css";

const PARTICLE_COUNT = 14;

/**
 * A quiet chapter break between the Hero and the pinned Frontend->AI
 * sequence. Deliberately simple — one reveal, no pin, no scrub — so it
 * reads as an editorial pause rather than a second act of the
 * animation that follows it. Purple/green echo the palette the next
 * section is built from, previewing it without reproducing it.
 */
export function Transition() {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const particleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const reducedMotion = useReducedMotion();

  const particles = useMemo(
    () =>
      // Kept clear of the top/bottom ~18% so the dots thin out well
      // before the section's own edges — packing them right up to the
      // boundary is what made the seam with the neighboring sections
      // visible in the first place.
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        left: 6 + Math.random() * 88,
        top: 18 + Math.random() * 64,
        size: 2 + Math.random() * 3,
        accent: i % 2 === 0 ? "purple" : "green",
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 4,
      })),
    []
  );

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    return runTransitionAnimations(
      {
        root: rootRef.current,
        title: titleRef.current,
        subtitle: subtitleRef.current,
        particles: particleRefs.current,
      },
      reducedMotion
    );
  }, [reducedMotion]);

  return (
    <section ref={rootRef} className={styles.transition} id="transition">
      <div className={styles.glowPurple} aria-hidden="true" />
      <div className={styles.glowGreen} aria-hidden="true" />

      <div className={styles.particles} aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            ref={(el) => {
              particleRefs.current[i] = el;
            }}
            className={`${styles.particle} ${p.accent === "purple" ? styles.particlePurple : styles.particleGreen}`}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.inner}>
        <h2 ref={titleRef} className={styles.title}>
          A TECNOLOGIA
          <br />
          <span className={styles.titleAccent}>POR TRÁS DE TUDO.</span>
        </h2>

        <p ref={subtitleRef} className={styles.subtitle}>
          Explore as áreas que transformam uma ideia em um produto real.
        </p>
      </div>
    </section>
  );
}
