import { useLayoutEffect, useMemo, useRef } from "react";
import type { ComponentType } from "react";
import { Eyebrow } from "../../components/ui/Eyebrow";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { runFrontendAnimations, type DriftTarget } from "../../animations/frontendAnimations";
import type { MockupRefs, TextRefs } from "../../animations/frontend/types";
import { AIScene } from "./scenes/AIScene";
import { BackendScene } from "./scenes/BackendScene";
import { DataScene } from "./scenes/DataScene";
import { MobileScene } from "./scenes/MobileScene";
import {
  createAISceneRefs,
  createBackendSceneRefs,
  createDataSceneRefs,
  createMobileSceneRefs,
} from "./scenes/sceneRefs";
import { AIMini, BackendMini, DataMini, FrontendMini, MobileMini } from "./anatomy";
import styles from "./Frontend.module.css";

// A small, plain site mockup — nav, headline, subhead, button —
// deliberately far short of a dashboard. Every element earns its place.
const FRAME = { x: 40, y: 40, width: 820, height: 480, rx: 14 };
const TOPBAR_BOTTOM = FRAME.y + 50;
const CENTER_X = FRAME.x + FRAME.width / 2;
const MOCKUP_CENTER = { x: CENTER_X, y: 270 };

// Anchor points sampled along the mockup's own content — where its
// "pixels" appear to lift off from as the interface loosens.
const DISSOLVE_ANCHORS = [
  { x: 280, y: 230 }, { x: 460, y: 230 }, { x: 620, y: 243 },
  { x: 335, y: 266 }, { x: 500, y: 279 }, { x: 565, y: 266 },
  { x: 375, y: 350 }, { x: 450, y: 372 }, { x: 525, y: 350 },
  { x: 375, y: 394 }, { x: 525, y: 394 },
  { x: 64, y: 62 }, { x: 136, y: 69 }, { x: 779, y: 65 },
];

const DUST_COUNT = 14;

// The static "anatomy overview" shown once the built-once sequence has
// played all the way through — five areas side by side, each rendering
// a miniature of the scene that was actually built during its stage of
// the animation (frontend mockup, backend rack, phone, table+db, neural
// network), not a generic line icon.
const ANATOMY_AREAS: ReadonlyArray<{ id: string; title: string; Mini: ComponentType }> = [
  { id: "frontend", title: "FRONTEND", Mini: FrontendMini },
  { id: "backend", title: "BACKEND", Mini: BackendMini },
  { id: "mobile", title: "MOBILE", Mini: MobileMini },
  { id: "data", title: "DATA", Mini: DataMini },
  { id: "ai", title: "GESTÃO DE IA", Mini: AIMini },
];

export function Frontend() {
  const rootRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<SVGSVGElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  const eyebrowFrontendRef = useRef<HTMLDivElement>(null);
  const eyebrowBackendRef = useRef<HTMLDivElement>(null);
  const eyebrowMobileRef = useRef<HTMLDivElement>(null);
  const eyebrowDataRef = useRef<HTMLDivElement>(null);
  const eyebrowAIRef = useRef<HTMLDivElement>(null);
  const headlineFrontendRef = useRef<HTMLHeadingElement>(null);
  const headlineBackendRef = useRef<HTMLHeadingElement>(null);
  const headlineMobileRef = useRef<HTMLHeadingElement>(null);
  const headlineDataRef = useRef<HTMLHeadingElement>(null);
  const headlineAIRef = useRef<HTMLHeadingElement>(null);
  const sublineARef = useRef<HTMLParagraphElement>(null);
  const sublineBRef = useRef<HTMLParagraphElement>(null);
  const sublineCRef = useRef<HTMLParagraphElement>(null);
  const taglineAdaptRef = useRef<HTMLParagraphElement>(null);
  const taglineMobileRef = useRef<HTMLParagraphElement>(null);
  const taglineInteractionRef = useRef<HTMLParagraphElement>(null);
  const taglineDataRef = useRef<HTMLParagraphElement>(null);
  const taglinePatternsRef = useRef<HTMLParagraphElement>(null);
  const taglineAIRef = useRef<HTMLParagraphElement>(null);

  const mockupGroupRef = useRef<SVGGElement>(null);
  const dotFieldRef = useRef<SVGRectElement>(null);
  const frameRef = useRef<SVGRectElement>(null);
  const frameGlowRef = useRef<SVGRectElement>(null);
  const topBarLineRef = useRef<SVGLineElement>(null);
  const logoMarkRef = useRef<SVGRectElement>(null);
  const logoWordmarkRef = useRef<SVGRectElement>(null);
  const titleLine1Ref = useRef<SVGRectElement>(null);
  const titleLine2Ref = useRef<SVGRectElement>(null);
  const subtitleLineRef = useRef<SVGRectElement>(null);
  const ctaPillRef = useRef<SVGRectElement>(null);
  const ctaLabelRef = useRef<SVGRectElement>(null);
  const navLinkRefs = useRef<(SVGRectElement | null)[]>([]);

  const flashRef = useRef<HTMLDivElement>(null);
  const dissolveParticleRefs = useRef<(SVGRectElement | null)[]>([]);
  const dustRefs = useRef<(SVGCircleElement | null)[]>([]);

  // One mutable bag of refs per stage — the scenes fill them in as they
  // render, the stage builders read them when the timeline is assembled.
  const backendRefs = useRef(createBackendSceneRefs()).current;
  const mobileRefs = useRef(createMobileSceneRefs()).current;
  const dataRefs = useRef(createDataSceneRefs()).current;
  const aiRefs = useRef(createAISceneRefs()).current;

  const reducedMotion = useReducedMotion();

  const dissolveParticles = useMemo(() => {
    return DISSOLVE_ANCHORS.map((a) => {
      const dx = a.x - MOCKUP_CENTER.x;
      const dy = a.y - MOCKUP_CENTER.y;
      const len = Math.hypot(dx, dy) || 1;
      const size = 4 + Math.random() * 4;
      const drift: DriftTarget = {
        x: (dx / len) * (140 + Math.random() * 200),
        y: (dy / len) * (140 + Math.random() * 200),
        scale: 2 + Math.random() * 2.5,
      };
      return { ...a, size, drift };
    });
  }, []);

  // Depth dust: sparse, slow, and never the subject — it only exists so
  // the machine room and everything after it has air around it.
  const dust = useMemo(
    () =>
      Array.from({ length: DUST_COUNT }, () => ({
        cx: 60 + Math.random() * 780,
        cy: 50 + Math.random() * 460,
        r: 1.4 + Math.random() * 2.2,
      })),
    []
  );

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const text: TextRefs = {
      eyebrowFrontend: eyebrowFrontendRef.current,
      eyebrowBackend: eyebrowBackendRef.current,
      eyebrowMobile: eyebrowMobileRef.current,
      eyebrowData: eyebrowDataRef.current,
      eyebrowAI: eyebrowAIRef.current,
      headlineFrontend: headlineFrontendRef.current,
      headlineBackend: headlineBackendRef.current,
      headlineMobile: headlineMobileRef.current,
      headlineData: headlineDataRef.current,
      headlineAI: headlineAIRef.current,
      sublineA: sublineARef.current,
      sublineB: sublineBRef.current,
      sublineC: sublineCRef.current,
      taglineAdapt: taglineAdaptRef.current,
      taglineMobile: taglineMobileRef.current,
      taglineInteraction: taglineInteractionRef.current,
      taglineData: taglineDataRef.current,
      taglinePatterns: taglinePatternsRef.current,
      taglineAI: taglineAIRef.current,
    };

    const mockup: MockupRefs = {
      mockupGroup: mockupGroupRef.current,
      dotField: dotFieldRef.current,
      frame: frameRef.current,
      frameGlow: frameGlowRef.current,
      topBarLine: topBarLineRef.current,
      headerItems: [logoMarkRef.current, logoWordmarkRef.current, ...navLinkRefs.current],
      titleLine1: titleLine1Ref.current,
      titleLine2: titleLine2Ref.current,
      subtitleLine: subtitleLineRef.current,
      ctaPill: ctaPillRef.current,
      ctaLabel: ctaLabelRef.current,
      dissolveParticles: dissolveParticleRefs.current,
      flash: flashRef.current,
    };

    const cleanup = runFrontendAnimations(
      {
        root: rootRef.current,
        text,
        mockup,
        dust: dustRefs.current,
        backend: backendRefs,
        mobile: mobileRefs,
        data: dataRefs,
        ai: aiRefs,
        copy: copyRef.current,
        canvas: canvasRef.current,
        overview: overviewRef.current,
      },
      dissolveParticles.map((p) => p.drift),
      reducedMotion
    );

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <section ref={rootRef} className={styles.frontend} id="frontend">
      <div className={styles.stage}>
        <div ref={flashRef} className={styles.flash} aria-hidden="true" />

        <div ref={copyRef} className={styles.copy}>
          <div className={styles.eyebrowStack}>
            <div ref={eyebrowFrontendRef} className={styles.eyebrowLayer}>
              <Eyebrow label="THE INTERFACE" />
            </div>
            <div ref={eyebrowBackendRef} className={styles.eyebrowLayer}>
              <Eyebrow label="THE ENGINE" />
            </div>
            <div ref={eyebrowMobileRef} className={styles.eyebrowLayer}>
              <Eyebrow label="THE DEVICE" />
            </div>
            <div ref={eyebrowDataRef} className={styles.eyebrowLayer}>
              <Eyebrow label="THE DATA" />
            </div>
            <div ref={eyebrowAIRef} className={styles.eyebrowLayer}>
              <Eyebrow label="THE INTELLIGENCE" />
            </div>
          </div>

          <div className={styles.headlineStack}>
            <h2 ref={headlineFrontendRef} className={styles.headline}>FRONTEND</h2>
            <h2 ref={headlineBackendRef} className={styles.headline}>BACKEND</h2>
            <h2 ref={headlineMobileRef} className={styles.headline} style={{ opacity: 0 }}>MOBILE</h2>
            <h2 ref={headlineDataRef} className={styles.headline} style={{ opacity: 0 }}>DATA</h2>
            <h2 ref={headlineAIRef} className={`${styles.headline} ${styles.headlineLong}`} style={{ opacity: 0 }}>GESTÃO DE IA</h2>
          </div>

          <div className={styles.sublineStack}>
            <p ref={sublineARef} className={styles.tagline}>Crie suas próprias telas.</p>
            <p ref={sublineBRef} className={styles.tagline}>Por trás de toda tela, existe um sistema.</p>
            <p ref={sublineCRef} className={styles.tagline}>Faça suas ideias funcionarem.</p>
            <p ref={taglineAdaptRef} className={styles.tagline} style={{ opacity: 0 }}>O sistema chega ao seu bolso.</p>
            <p ref={taglineMobileRef} className={styles.tagline} style={{ opacity: 0 }}>Uma experiência em qualquer tela.</p>
            <p ref={taglineInteractionRef} className={styles.tagline} style={{ opacity: 0 }}>A interação gera informação.</p>
            <p ref={taglineDataRef} className={styles.tagline} style={{ opacity: 0 }}>Transforme dados em possibilidades.</p>
            <p ref={taglinePatternsRef} className={styles.tagline} style={{ opacity: 0 }}>Os padrões se organizam.</p>
            <p ref={taglineAIRef} className={styles.tagline} style={{ opacity: 0 }}>Desenvolva com inteligência.</p>
          </div>
        </div>

        <svg
          ref={canvasRef}
          className={styles.canvas}
          viewBox="0 0 900 560"
          role="img"
          aria-label="Uma interface simples é construída e se dissolve, revelando um rack de servidores com uma API e um banco de dados que processam uma requisição; desse sistema nasce um aplicativo em um smartphone, cujo toque gera um registro que viaja de volta ao servidor e é armazenado em uma tabela de dados; por fim, esses registros se agrupam em padrões e formam uma rede neural que produz um resultado"
        >
          <defs>
            <linearGradient id="fe-neonPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9b2cff" />
              <stop offset="50%" stopColor="#6c1cff" />
              <stop offset="100%" stopColor="#b52cff" />
            </linearGradient>
            <linearGradient id="fe-neonGreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#55ff36" />
              <stop offset="100%" stopColor="#13d927" />
            </linearGradient>
            <pattern id="fe-dotGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.4" fill="rgba(243,245,247,0.1)" />
            </pattern>
            <filter id="fe-purpleGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="fe-greenGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Depth dust, behind everything */}
          {dust.map((p, i) => (
            <circle
              key={i}
              ref={(el) => { dustRefs.current[i] = el; }}
              cx={p.cx} cy={p.cy} r={p.r} fill="var(--ink)" opacity={0}
            />
          ))}

          {/* The built interface — one group, so it can dissolve and zoom
              as a single object once its job is done */}
          <g ref={mockupGroupRef}>
            <rect ref={dotFieldRef} x={FRAME.x} y={FRAME.y} width={FRAME.width} height={FRAME.height} rx={FRAME.rx} fill="url(#fe-dotGrid)" />
            <rect
              ref={frameRef} x={FRAME.x} y={FRAME.y} width={FRAME.width} height={FRAME.height} rx={FRAME.rx}
              fill="none" stroke="url(#fe-neonPurple)" strokeWidth={2.5} pathLength={100} strokeDasharray={100}
            />
            <rect
              ref={frameGlowRef} x={FRAME.x} y={FRAME.y} width={FRAME.width} height={FRAME.height} rx={FRAME.rx}
              fill="none" stroke="#9b2cff" strokeWidth={3.5} filter="url(#fe-purpleGlow)"
            />
            <line
              ref={topBarLineRef} x1={FRAME.x} y1={TOPBAR_BOTTOM} x2={FRAME.x + FRAME.width} y2={TOPBAR_BOTTOM}
              stroke="var(--line-strong)" strokeWidth={1.5} pathLength={100} strokeDasharray={100}
            />
            <rect ref={logoMarkRef} x={64} y={62} width={14} height={14} rx={3} fill="url(#fe-neonPurple)" />
            <rect ref={logoWordmarkRef} x={86} y={65} width={50} height={8} rx={2} fill="var(--ink)" />
            <rect ref={(el) => { navLinkRefs.current[0] = el; }} x={740} y={65} width={34} height={8} rx={2} fill="var(--ink-faint)" />
            <rect ref={(el) => { navLinkRefs.current[1] = el; }} x={784} y={65} width={34} height={8} rx={2} fill="var(--ink-faint)" />
            <rect ref={titleLine1Ref} x={CENTER_X - 170} y={230} width={340} height={26} rx={5} fill="var(--ink)" />
            <rect ref={titleLine2Ref} x={CENTER_X - 115} y={266} width={230} height={26} rx={5} fill="var(--ink)" />
            <rect ref={subtitleLineRef} x={CENTER_X - 90} y={316} width={180} height={10} rx={3} fill="var(--ink-faint)" />
            <rect ref={ctaPillRef} x={CENTER_X - 75} y={350} width={150} height={44} rx={22} fill="url(#fe-neonPurple)" />
            <rect ref={ctaLabelRef} x={CENTER_X - 30} y={369} width={60} height={6} rx={3} fill="var(--void)" />
          </g>

          {/* Loosened pixels — the interface's own substance, about to
              scatter into the space behind it */}
          {dissolveParticles.map((p, i) => (
            <rect
              key={i}
              ref={(el) => { dissolveParticleRefs.current[i] = el; }}
              x={p.x - p.size / 2} y={p.y - p.size / 2} width={p.size} height={p.size} rx={1}
              fill="url(#fe-neonPurple)"
            />
          ))}

          {/* What was behind the screen, and everything it becomes */}
          <BackendScene refs={backendRefs} />
          <MobileScene refs={mobileRefs} />
          <DataScene refs={dataRefs} />
          <AIScene refs={aiRefs} />
        </svg>

        {/* The permanent, static state reached after the built-once
            sequence completes (or immediately, on repeat visits this
            session) — five areas side by side, no longer animating. */}
        <div ref={overviewRef} className={styles.overview} aria-hidden="true">
          {ANATOMY_AREAS.map(({ id, title, Mini }) => (
            <div key={id} data-anatomy-item className={styles.overviewItem}>
              <span className={styles.overviewFrameWrap}>
                <Mini />
              </span>
              <span className={`${styles.overviewTitle} mono`}>{title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
