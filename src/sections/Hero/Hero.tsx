import { useLayoutEffect, useRef } from "react";
import { Experience } from "../../components/scene/Experience";
import { LogoAssembly } from "../../components/brand/LogoAssembly";
import { useMousePosition } from "../../hooks/useMousePosition";
import { useDeviceTier } from "../../hooks/useDeviceTier";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { runHeroAnimations } from "../../animations/heroAnimations";
import styles from "./Hero.module.css";

const HEADLINE_LINES = ["BEM-VINDO", "AO DEVCLUB."];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sublineRef = useRef<HTMLParagraphElement>(null);
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
        <h1 className={styles.headline} aria-label="Bem-vindo ao DevClub.">
          {HEADLINE_LINES.map((line, i) => (
            <span className={styles.lineMask} key={line}>
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className={`${styles.line} ${i === HEADLINE_LINES.length - 1 ? styles.lineAccent : ""}`}
                aria-hidden="true"
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p ref={sublineRef} className={styles.subline}>
          A <strong>maior escola de programação do Brasil</strong> para quem
          quer sair do zero, construir projetos reais e transformar
          conhecimento em uma nova carreira. Aqui você aprende Frontend,
          Backend, Mobile, Data e Inteligência Artificial em um único
          ecossistema — com comunidade, mentoria de carreira e o suporte
          necessário para dar o próximo passo dentro da tecnologia.
        </p>
      </div>

      <div ref={scrollCueRef} className={styles.scrollCue}>
        <span className="mono">Role para começar</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </div>
    </section>
  );
}
