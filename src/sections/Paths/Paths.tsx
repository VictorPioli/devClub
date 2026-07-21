import { useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { runPathsAnimations } from "../../animations/pathsAnimations";
import styles from "./Paths.module.css";

interface PathCard {
  id: string;
  lines: [string, string];
  description: string;
  tags: string[];
  accent: "purple" | "green" | "mixed";
}

const CARDS: PathCard[] = [
  {
    id: "fullstack",
    lines: ["DEVCLUB", "FULL STACK"],
    description:
      "Aprenda a construir aplicações completas, do Frontend ao Backend, e transforme suas ideias em produtos reais.",
    tags: ["FRONTEND", "BACKEND", "API", "BANCO DE DADOS", "DEPLOY"],
    accent: "purple",
  },
  {
    id: "data",
    lines: ["DATA", "CLUB"],
    description: "Aprenda a transformar dados em informação, decisões e novas possibilidades.",
    tags: ["ANÁLISE", "VISUALIZAÇÃO", "PADRÕES", "ESTRUTURAS", "INTELIGÊNCIA"],
    accent: "green",
  },
  {
    id: "frontend-club",
    lines: ["FRONT END", "CLUB"],
    description:
      "Aprenda a transformar ideias em interfaces modernas, interativas e experiências digitais.",
    tags: ["UI/UX", "COMPONENTES", "INTERAÇÃO", "PROTOTIPAGEM", "DESIGN"],
    accent: "purple",
  },
  {
    id: "ai",
    lines: ["GESTOR", "DE IA"],
    description:
      "Aprenda a utilizar, integrar e gerenciar Inteligência Artificial para potencializar o desenvolvimento e criar soluções mais inteligentes.",
    tags: ["INTEGRAÇÃO", "AUTOMAÇÃO", "REDES", "PROCESSAMENTO", "PRODUTIVIDADE"],
    accent: "mixed",
  },
];

// Minimalist line icons — single stroke, no fill, no glow. Color comes
// from the card via currentColor so hover/active states can brighten
// them without touching the markup.

function FullstackVisual() {
  return (
    <svg viewBox="0 0 48 48" className={styles.visualSvg} aria-hidden="true">
      <rect x={9} y={11} width={30} height={26} rx={4} fill="none" stroke="currentColor" strokeWidth={2} />
      <line x1={9} y1={19} x2={39} y2={19} stroke="currentColor" strokeWidth={2} />
    </svg>
  );
}

function DataVisual() {
  return (
    <svg viewBox="0 0 48 48" className={styles.visualSvg} aria-hidden="true">
      <rect x={10} y={24} width={7} height={14} rx={1.5} fill="none" stroke="currentColor" strokeWidth={2} />
      <rect x={20.5} y={16} width={7} height={22} rx={1.5} fill="none" stroke="currentColor" strokeWidth={2} />
      <rect x={31} y={9} width={7} height={29} rx={1.5} fill="none" stroke="currentColor" strokeWidth={2} />
    </svg>
  );
}

function FrontendVisual() {
  const teeth = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    return {
      x1: 24 + Math.cos(angle) * 11,
      y1: 24 + Math.sin(angle) * 11,
      x2: 24 + Math.cos(angle) * 16.5,
      y2: 24 + Math.sin(angle) * 16.5,
    };
  });
  return (
    <svg viewBox="0 0 48 48" className={styles.visualSvg} aria-hidden="true">
      <circle cx={24} cy={24} r={7} fill="none" stroke="currentColor" strokeWidth={2} />
      {teeth.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      ))}
    </svg>
  );
}

function AiVisual() {
  return (
    <svg viewBox="0 0 48 48" className={styles.visualSvg} aria-hidden="true">
      <path d="M14 18 L14 30" stroke="currentColor" strokeWidth={2} fill="none" />
      <path d="M18 16 L30 23" stroke="currentColor" strokeWidth={2} fill="none" />
      <path d="M18 32 L30 25" stroke="currentColor" strokeWidth={2} fill="none" />
      <circle cx={14} cy={14} r={4} fill="none" stroke="currentColor" strokeWidth={2} />
      <circle cx={14} cy={34} r={4} fill="none" stroke="currentColor" strokeWidth={2} />
      <circle cx={34} cy={24} r={4} fill="none" stroke="currentColor" strokeWidth={2} />
    </svg>
  );
}

export function Paths() {
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const cleanup = runPathsAnimations(
      {
        root: rootRef.current,
        heading: headingRef.current,
        cards: cardRefs.current,
      },
      reducedMotion
    );

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <section ref={rootRef} className={styles.paths} id="paths">
      <div className={styles.inner}>
        <div ref={headingRef} className={styles.heading}>
          <h2 className={styles.title}>ESCOLHA SEU CAMINHO</h2>
          <p className={styles.subtitle}>
            Cada formação é uma porta de entrada diferente para o mundo da tecnologia.
          </p>
        </div>

        <div className={styles.row}>
          {CARDS.map((card, i) => {
            const stateClass =
              activeIndex === null ? "" : activeIndex === i ? styles.active : styles.dimmed;
            const accentClass =
              styles[
                `accent${card.accent === "purple" ? "Purple" : card.accent === "green" ? "Green" : "Mixed"}`
              ];
            return (
              <div
                key={card.id}
                role="button"
                tabIndex={0}
                className={[styles.card, stateClass, accentClass].filter(Boolean).join(" ")}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(i)}
                onBlur={() => setActiveIndex(null)}
                onClick={() => setActiveIndex((prev) => (prev === i ? null : i))}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveIndex((prev) => (prev === i ? null : i));
                  }
                }}
              >
                {/* The entrance animation targets this inner wrapper
                    only — never the outer card, which is what the
                    hover zoom (above) controls. */}
                <div ref={(el) => { cardRefs.current[i] = el; }} className={styles.cardInner}>
                  <span className={styles.visual}>
                    {card.id === "fullstack" && <FullstackVisual />}
                    {card.id === "data" && <DataVisual />}
                    {card.id === "frontend-club" && <FrontendVisual />}
                    {card.id === "ai" && <AiVisual />}
                  </span>

                  <span className={styles.body}>
                    <span className={styles.cardTitle}>
                      {card.lines[0]}
                      <br />
                      {card.lines[1]}
                    </span>

                    <span className={styles.infoPanel}>
                      <span className={styles.description}>{card.description}</span>
                      <span className={styles.tags}>
                        {card.tags.map((tag) => (
                          <span key={tag} className={`${styles.tag} mono`}>
                            {tag}
                          </span>
                        ))}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
