import { useLayoutEffect, useRef, useState } from "react";
import type { JSX } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { runDifferentiatorsAnimations } from "../../animations/differentiatorsAnimations";
import { Eyebrow } from "../../components/ui/Eyebrow";
import styles from "./Differentiators.module.css";

type Accent = "purple" | "green" | "cyan" | "amber";

interface Pillar {
  id: string;
  short: string;         // short label used in the ecosystem/orbit
  title: string;         // full title used in the detail panel
  text: string;          // longer explanatory paragraph
  highlights: string[];  // pill tags
  featured: string;      // large accent copy
  accent: Accent;
  icon: (props: { className?: string }) => JSX.Element;
}

const PILLARS: Pillar[] = [
  {
    id: "aprendizado",
    short: "Aprendizado",
    title: "APRENDIZADO TÉCNICO",
    text: "Aprenda os fundamentos da programação, desenvolva sua lógica e construa projetos reais utilizando tecnologias presentes no mercado. A jornada vai dos primeiros conceitos até a construção de aplicações completas.",
    highlights: ["Fundamentos", "Tecnologias", "Projetos reais", "Prática"],
    featured: "Do primeiro código à construção de aplicações reais.",
    accent: "purple",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M8 6l-5 6 5 6M16 6l5 6-5 6M14 4l-4 16" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "comunidade",
    short: "Comunidade",
    title: "COMUNIDADE",
    text: "Você não precisa aprender sozinho. Faça parte de uma comunidade de pessoas em diferentes momentos da jornada, compartilhando experiências, tirando dúvidas, mostrando projetos e evoluindo juntas.",
    highlights: ["Troca de experiências", "Networking", "Suporte", "Compartilhamento de projetos"],
    featured: "O aprendizado continua mesmo quando a aula termina.",
    accent: "green",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx={9} cy={9} r={3} stroke="currentColor" strokeWidth={1.7} />
        <circle cx={16} cy={15} r={2.5} stroke="currentColor" strokeWidth={1.7} />
        <path d="M3 20c0-3 3-5 6-5s6 2 6 5M14 20c0-1.7 1.7-3 3.5-3s3.5 1.3 3.5 3" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "carreira",
    short: "Carreira",
    title: "MENTORIA DE CARREIRA",
    text: "Aprender a programar é apenas o começo. A mentoria ajuda o aluno a entender como transformar conhecimento em próximos passos profissionais — construção de portfólio, preparação para processos seletivos, posicionamento profissional e identificação de oportunidades.",
    highlights: ["Portfólio", "Processos seletivos", "Posicionamento", "Oportunidades"],
    featured: "Aprenda a programar. Aprenda também a construir sua carreira.",
    accent: "cyan",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M3 20l4-4 4 3 6-8 4 5" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={21} cy={16} r={1.2} fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    short: "Currículo & LinkedIn",
    title: "CURRÍCULO & LINKEDIN",
    text: "Seu conhecimento precisa ser percebido. Aprender a construir projetos é importante, saber apresentar suas habilidades, experiências e resultados também. O aluno recebe orientação para construir uma presença profissional mais preparada para o mercado.",
    highlights: ["Currículo", "LinkedIn", "Portfólio", "Apresentação"],
    featured: "Não basta saber fazer. É preciso saber mostrar.",
    accent: "amber",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <rect x={4} y={4} width={16} height={16} rx={2} stroke="currentColor" strokeWidth={1.7} />
        <path d="M8 10v7M8 7.5v.01M12 17v-4c0-1.5 3-1.5 3 0v4" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "freelancer",
    short: "Freelancer",
    title: "FREELANCER",
    text: "Nem toda oportunidade começa com um emprego tradicional. Desenvolva habilidades para transformar conhecimento técnico em projetos reais, entender necessidades de clientes e criar soluções que geram valor.",
    highlights: ["Projetos reais", "Clientes", "Portfólio", "Experiência prática"],
    featured: "Do conhecimento para projetos reais.",
    accent: "purple",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M4 7h16M4 12h10M4 17h16" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
        <circle cx={19} cy={12} r={2.5} stroke="currentColor" strokeWidth={1.7} />
      </svg>
    ),
  },
  {
    id: "ingles",
    short: "Inglês",
    title: "INGLÊS",
    text: "A tecnologia não fala apenas português. Documentações, ferramentas, comunidades e oportunidades internacionais fazem do inglês uma habilidade cada vez mais importante para quem trabalha com tecnologia.",
    highlights: ["Documentação", "Vocabulário técnico", "Comunicação", "Oportunidades globais"],
    featured: "Quanto mais você entende, mais longe pode chegar.",
    accent: "green",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx={12} cy={12} r={9} stroke="currentColor" strokeWidth={1.7} />
        <path d="M3 12h18M12 3a13 13 0 010 18M12 3a13 13 0 000 18" stroke="currentColor" strokeWidth={1.7} />
      </svg>
    ),
  },
  {
    id: "ia",
    short: "IA",
    title: "INTELIGÊNCIA ARTIFICIAL",
    text: "A forma de construir software está mudando. Aprenda a utilizar ferramentas de Inteligência Artificial para acelerar o aprendizado, aumentar a produtividade, automatizar tarefas e explorar novas possibilidades na criação de produtos.",
    highlights: ["IA aplicada", "Automação", "Produtividade", "Desenvolvimento de produtos"],
    featured: "A tecnologia muda. A capacidade de aprender continua.",
    accent: "cyan",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx={12} cy={12} r={3} stroke="currentColor" strokeWidth={1.7} />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
      </svg>
    ),
  },
];

const STATS = [
  { value: "+10.000", label: "Alunos na comunidade" },
  { value: "+500", label: "Projetos compartilhados" },
  { value: "+100", label: "Histórias de transição de carreira" },
];

function accentClass(accent: Accent) {
  switch (accent) {
    case "purple": return styles.accentPurple;
    case "green":  return styles.accentGreen;
    case "amber":  return styles.accentAmber;
    default:        return styles.accentCyan;
  }
}

export function Differentiators() {
  const rootRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const [activeId, setActiveId] = useState<string>(PILLARS[0].id);
  const activePillar = PILLARS.find((p) => p.id === activeId) ?? PILLARS[0];

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    return runDifferentiatorsAnimations(
      {
        root: rootRef.current,
        header: headerRef.current,
        stats: statsRef.current,
        blocks: ecosystemRef.current ? [ecosystemRef.current] : [],
      },
      reduced,
    );
  }, [reduced]);

  return (
    <section ref={rootRef} id="differentiators" className={styles.differentiators}>
      <div className={styles.inner}>
        <div ref={headerRef} className={styles.header}>
          <Eyebrow label="O ECOSSISTEMA" />
          <h2 className={styles.title}>
            O QUE TORNA
            <br />O DEVCLUB <span className={styles.titleAccent}>DIFERENTE</span>?
          </h2>
          <p className={styles.intro}>
            Aprender a programar é apenas uma parte da jornada. No DevClub, o
            aluno encontra uma comunidade, orientação e um ambiente criado
            para acompanhar diferentes momentos da sua evolução — desde os
            primeiros passos até a construção de uma carreira na tecnologia.
          </p>
        </div>

        <div ref={statsRef} className={styles.stats}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={`${styles.statLabel} mono`}>{stat.label}</span>
            </div>
          ))}
        </div>

        <div ref={ecosystemRef} className={styles.ecosystem} data-anim="visual">
          <div className={styles.ecosystemIntro}>
            <span className={`${styles.ecosystemEyebrow} mono`} data-anim="highlight">Os 7 pilares</span>
            <h3 className={styles.ecosystemTitle} data-anim="title">
              Você não aprende apenas a programar.
              <br />
              <span className={styles.ecosystemTitleAccent}>
                Você constrói as ferramentas para evoluir dentro da tecnologia.
              </span>
            </h3>
          </div>

          <div className={styles.ecosystemLayout}>
            {/* Pillar selector — left */}
            <div className={styles.pillarList} role="tablist" aria-label="Pilares do DevClub">
              {PILLARS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={p.id === activeId}
                  aria-controls={`pillar-panel-${p.id}`}
                  id={`pillar-tab-${p.id}`}
                  onClick={() => setActiveId(p.id)}
                  onMouseEnter={() => setActiveId(p.id)}
                  className={`${styles.pillarButton} ${accentClass(p.accent)} ${p.id === activeId ? styles.pillarActive : ""}`}
                  data-anim="text"
                >
                  <span className={`${styles.pillarIndex} mono`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.pillarIcon}>
                    <p.icon className={styles.pillarIconSvg} />
                  </span>
                  <span className={styles.pillarLabel}>{p.short}</span>
                  <span className={styles.pillarDot} aria-hidden="true" />
                </button>
              ))}
            </div>

            {/* Detail panel — right */}
            <div
              className={`${styles.pillarPanel} ${accentClass(activePillar.accent)}`}
              role="tabpanel"
              id={`pillar-panel-${activePillar.id}`}
              aria-labelledby={`pillar-tab-${activePillar.id}`}
              key={activePillar.id}
            >
              <div className={styles.pillarPanelHeader}>
                <span className={styles.pillarPanelIcon}>
                  <activePillar.icon className={styles.pillarPanelIconSvg} />
                </span>
                <div>
                  <span className={`${styles.pillarPanelEyebrow} mono`}>PILAR</span>
                  <h4 className={styles.pillarPanelTitle}>{activePillar.title}</h4>
                </div>
              </div>

              <p className={styles.pillarPanelText}>{activePillar.text}</p>

              <div className={styles.pillarHighlights}>
                {activePillar.highlights.map((h) => (
                  <span key={h} className={`${styles.pillarHighlight} mono`}>
                    {h}
                  </span>
                ))}
              </div>

              <p className={styles.pillarFeatured}>{activePillar.featured}</p>
            </div>
          </div>

          <div className={styles.ecosystemFlow} data-anim="highlight">
            {["Aprender", "Praticar", "Construir", "Se conectar", "Se preparar", "Evoluir"].map((step, i, arr) => (
              <span key={step} className={styles.ecosystemFlowItem}>
                <span className={`${styles.ecosystemFlowLabel} mono`}>{step}</span>
                {i < arr.length - 1 && <span className={styles.ecosystemFlowArrow} aria-hidden="true">→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
