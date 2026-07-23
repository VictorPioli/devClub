import { useLayoutEffect, useRef } from "react";
import { Experience } from "../../components/scene/Experience";
import { LogoAssembly } from "../../components/brand/LogoAssembly";
import { useMousePosition } from "../../hooks/useMousePosition";
import { useDeviceTier } from "../../hooks/useDeviceTier";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { runHeroAnimations } from "../../animations/heroAnimations";
import styles from "./Hero.module.css";

const HEADLINE_LINE_1 = "BEM-VINDO ";
// The second line is split so "DEV" can echo the assembled logo's
// purple frame while "CLUB." keeps the wordmark's green — the same
// two-tone identity as the logo itself, not an arbitrary split.
const ACCENT_PREFIX = "AO ";
const ACCENT_DEV = "DEV";
const ACCENT_SUFFIX = "CLUB.";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const logoStageRef = useRef<HTMLDivElement>(null);
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
        subline: sublineRef.current,
        logoStage: logoStageRef.current,
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
      </div>

      <div className={styles.content}>
        <h1 className={styles.headline} aria-label="Bem-vindo ao DevClub.">
          <span className={styles.lineMask}>
            <span
              ref={(el) => {
                lineRefs.current[0] = el;
              }}
              className={styles.line}
              aria-hidden="true"
            >
              {HEADLINE_LINE_1}
              {ACCENT_PREFIX}
            </span>
          </span>
          <span className={styles.lineMask}>
            <span
              ref={(el) => {
                lineRefs.current[1] = el;
              }}
              className={`${styles.line} ${styles.lineAccent}`}
              aria-hidden="true"
            >
              
              <span className={styles.lineAccentDev}>{ACCENT_DEV}</span>
              {ACCENT_SUFFIX}
            </span>
          </span>
        </h1>

        <p ref={sublineRef} className={styles.subline}>
          A <strong>maior escola de programação do Brasil</strong> para quem
          quer sair do zero, construir projetos reais e transformar
          conhecimento em uma nova carreira.
        </p>

        <div ref={logoStageRef} className={styles.logoStage}>
          <LogoAssembly reduced={reducedMotion} />
        </div>
      </div>

      <div ref={scrollCueRef} className={styles.scrollCue}>
        <span className="mono">Role para começar</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </div>
    </section>
  );
}
