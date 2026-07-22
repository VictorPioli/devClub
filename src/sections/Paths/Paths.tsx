import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { runPathsAnimations } from "../../animations/pathsAnimations";
import styles from "./Paths.module.css";

type CardId = "fullstack" | "data" | "frontend-club" | "ai";

interface PathCard {
  id: CardId;
  lines: [string, string];
  description: string;
  tags: string[];
  accent: "purple" | "green" | "mixed";
}

interface TrackModule {
  number: string;
  title: string;
  description: string;
  technologies?: string[];
}

interface Track {
  finalLine?: string;
  modules: TrackModule[];
}

const TRACKS: Record<CardId, Track> = {
  fullstack: {
    modules: [
      {
        number: "01",
        title: "Fundamentos",
        description: "Aprenda os fundamentos da programação e desenvolva sua lógica.",
        technologies: ["JavaScript", "TypeScript", "Git"],
      },
      {
        number: "02",
        title: "Frontend",
        description: "Construa interfaces modernas e experiências para a web.",
        technologies: ["HTML", "CSS", "JavaScript", "React"],
      },
      {
        number: "03",
        title: "Backend",
        description: "Aprenda a construir APIs e sistemas que funcionam por trás das aplicações.",
        technologies: ["Node.js", "APIs", "Banco de Dados"],
      },
      {
        number: "04",
        title: "Banco de Dados",
        description: "Aprenda a armazenar, organizar e consultar informações.",
        technologies: ["SQL", "NoSQL", "Modelagem"],
      },
      {
        number: "05",
        title: "Projetos Reais",
        description: "Aplique o conhecimento construindo aplicações completas.",
      },
    ],
    finalLine: "Do primeiro código → à construção de aplicações completas.",
  },
  data: {
    modules: [
      {
        number: "01",
        title: "Fundamentos de Dados",
        description: "Entenda como dados são estruturados e utilizados.",
      },
      {
        number: "02",
        title: "Programação",
        description: "Desenvolva as habilidades necessárias para trabalhar com dados.",
      },
      {
        number: "03",
        title: "Análise",
        description: "Transforme dados brutos em informações úteis.",
      },
      {
        number: "04",
        title: "Engenharia de Dados",
        description:
          "Aprenda a construir pipelines e sistemas para trabalhar com grandes volumes de dados.",
      },
      {
        number: "05",
        title: "Inteligência e Decisão",
        description: "Utilize dados para encontrar padrões e gerar insights.",
      },
    ],
    finalLine: "Do dado bruto → a decisões que geram impacto.",
  },
  "frontend-club": {
    modules: [
      {
        number: "01",
        title: "Fundamentos da Web",
        description: "Entenda como a web funciona.",
        technologies: ["HTML", "CSS", "JavaScript"],
      },
      {
        number: "02",
        title: "Interfaces",
        description: "Aprenda a transformar ideias em interfaces funcionais.",
      },
      {
        number: "03",
        title: "Desenvolvimento Moderno",
        description: "Construa aplicações utilizando ferramentas modernas.",
        technologies: ["React", "TypeScript"],
      },
      {
        number: "04",
        title: "Experiência",
        description: "Crie interfaces interativas, responsivas e agradáveis de utilizar.",
      },
      {
        number: "05",
        title: "Projetos",
        description: "Construa aplicações reais e desenvolva seu portfólio.",
      },
    ],
    finalLine: "Da primeira tela → à construção de experiências digitais completas.",
  },
  ai: {
    modules: [
      {
        number: "01",
        title: "Fundamentos de IA",
        description: "Entenda os conceitos fundamentais da Inteligência Artificial.",
      },
      {
        number: "02",
        title: "Ferramentas",
        description: "Conheça as principais ferramentas e tecnologias de IA.",
      },
      {
        number: "03",
        title: "Prompting",
        description:
          "Aprenda a se comunicar de forma eficiente com modelos de Inteligência Artificial.",
      },
      {
        number: "04",
        title: "Automação",
        description: "Utilize IA para automatizar processos e aumentar sua produtividade.",
      },
      {
        number: "05",
        title: "Aplicação",
        description: "Aprenda a utilizar IA na criação de produtos e soluções reais.",
      },
    ],
    finalLine: "Da utilização de ferramentas → à aplicação estratégica de Inteligência Artificial.",
  },
};

function accentClassFor(accent: PathCard["accent"]): string {
  return accent === "purple"
    ? styles.accentPurple
    : accent === "green"
      ? styles.accentGreen
      : styles.accentMixed;
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (selectedIndex === null) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedIndex(null);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

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
            const displayIndex = activeIndex ?? selectedIndex;
            const stateClass =
              displayIndex === null ? "" : displayIndex === i ? styles.active : styles.dimmed;
            const selectedClass = selectedIndex === i ? styles.selected : "";
            const accentClass = accentClassFor(card.accent);
            const toggleSelected = () =>
              setSelectedIndex((prev) => (prev === i ? null : i));
            return (
              <div
                key={card.id}
                role="button"
                tabIndex={0}
                aria-pressed={selectedIndex === i}
                aria-expanded={selectedIndex === i}
                aria-controls="paths-track-panel"
                className={[styles.card, stateClass, selectedClass, accentClass]
                  .filter(Boolean)
                  .join(" ")}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(i)}
                onBlur={() => setActiveIndex(null)}
                onClick={toggleSelected}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleSelected();
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

        <div
          id="paths-track-panel"
          role="region"
          aria-label={
            selectedIndex !== null ? `Trilha ${CARDS[selectedIndex].lines.join(" ")}` : undefined
          }
          className={[
            styles.trackPanel,
            selectedIndex !== null ? styles.trackOpen : "",
            selectedIndex !== null ? accentClassFor(CARDS[selectedIndex].accent) : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {selectedIndex !== null && (
            <TrackContent card={CARDS[selectedIndex]} track={TRACKS[CARDS[selectedIndex].id]} />
          )}
        </div>
      </div>
    </section>
  );
}

function TrackContent({ card, track }: { card: PathCard; track: Track }) {
  return (
    <div className={styles.trackContent}>
      <div className={styles.trackHeader}>
        <span className={`${styles.trackEyebrow} mono`}>TRILHA DE ESTUDOS</span>
        <h3 className={styles.trackTitle}>
          {card.lines[0]} {card.lines[1]}
        </h3>
      </div>

      <ol className={styles.trackModules}>
        {track.modules.map((module, i) => (
          <li
            key={module.number}
            className={styles.moduleItem}
            style={{ ["--module-i" as string]: i }}
          >
            <div className={styles.moduleMarker} aria-hidden="true">
              <span className={styles.moduleDot} />
              {i < track.modules.length - 1 && <span className={styles.moduleConnector} />}
            </div>
            <div className={styles.moduleBody}>
              <span className={`${styles.moduleNumber} mono`}>{module.number}</span>
              <h4 className={styles.moduleTitle}>{module.title}</h4>
              <p className={styles.moduleDescription}>{module.description}</p>
              {module.technologies && module.technologies.length > 0 && (
                <div className={styles.moduleTech}>
                  {module.technologies.map((tech) => (
                    <span key={tech} className={`${styles.tag} mono`}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>

      {track.finalLine && <p className={styles.trackFinalLine}>{track.finalLine}</p>}
    </div>
  );
}
