import { useLayoutEffect, useRef } from "react";
import { Experience } from "../../components/scene/Experience";
import { LogoAssembly } from "../../components/brand/LogoAssembly";
import { Eyebrow } from "../../components/ui/Eyebrow";
import { useMousePosition } from "../../hooks/useMousePosition";
import { useDeviceTier } from "../../hooks/useDeviceTier";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { runHeroAnimations } from "../../animations/heroAnimations";
import styles from "./Hero.module.css";

const HEADLINE_LINES = ["YOU DON'T LEARN", "TO CODE.", "YOU LEARN", "TO BUILD."];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const pointer = useMousePosition();
  const tier = useDeviceTier();
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const lines = lineRefs.current.filter((el): el is HTMLSpanElement => el !== null);

    const cleanup = runHeroAnimations(
      {
        root: rootRef.current,
        lines,
        eyebrow: eyebrowRef.current,
        subline: sublineRef.current,
        meta: metaRef.current,
        scrollCue: scrollCueRef.current,
        canvasWrapper: canvasWrapperRef.current,
      },
      reducedMotion
    );

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <section ref={rootRef} className={styles.hero} id="hero">
      <div ref={canvasWrapperRef} className={styles.canvasWrapper}>
        <Experience pointer={pointer} tier={tier} reducedMotion={reducedMotion} />
        <div className={styles.logoStage}>
          <LogoAssembly reduced={reducedMotion} />
        </div>
      </div>

      <div className={styles.content}>
        <div ref={eyebrowRef} className={styles.eyebrowRow}>
          <Eyebrow index="00 / 04" label="THE JOURNEY BEGINS" />
        </div>

        <h1 className={styles.headline} aria-label="You don't learn to code. You learn to build.">
          {HEADLINE_LINES.map((line, i) => (
            <span className={styles.lineMask} key={line}>
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className={`${styles.line} ${i === 3 ? styles.lineAccent : ""}`}
                aria-hidden="true"
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p ref={sublineRef} className={styles.subline}>
          DevClub takes you from your first line of code to a real, shipped
          product — through four stages built to make you a working full
          stack developer.
        </p>

        <div ref={metaRef} className={styles.meta}>
          <ol className={`${styles.pipeline} mono`}>
            <li className={styles.pipelineActive}>Learn</li>
            <li>Build</li>
            <li>Ship</li>
            <li>Become</li>
          </ol>
          <span className={`${styles.pageIndex} mono`}>01 — 04</span>
        </div>
      </div>

      <div ref={scrollCueRef} className={styles.scrollCue}>
        <span className="mono">Scroll to enter</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </div>
    </section>
  );
}
