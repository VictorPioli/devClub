import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { runTestimonialsAnimations } from "../../animations/testimonialsAnimations";
import { Eyebrow } from "../../components/ui/Eyebrow";
import styles from "./Testimonials.module.css";

interface Testimonial {
  id: string;
  name: string;
  previousCareer: string;
  currentRole: string;
  company: string;
  location: string;
  isRemote: boolean;
  formation: string;
  studyTime: string;
  quote: string;
  featured: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "marina",
    name: "Marina Costa",
    previousCareer: "Analista Administrativa",
    currentRole: "Desenvolvedora Frontend",
    company: "Nuvem Digital",
    location: "São Paulo, Brasil",
    isRemote: true,
    formation: "FrontEnd Club",
    studyTime: "8 meses",
    quote:
      "Eu não tinha experiência com programação e trabalhava em outra área. Comecei do zero e, com consistência, consegui construir meus primeiros projetos e conquistar minha primeira oportunidade como desenvolvedora.",
    featured: true,
  },
  {
    id: "lucas",
    name: "Lucas Mendes",
    previousCareer: "Designer Gráfico",
    currentRole: "Desenvolvedor Full Stack",
    company: "TechFlow",
    location: "Belo Horizonte, Brasil",
    isRemote: false,
    formation: "DevClub Full Stack",
    studyTime: "10 meses",
    quote:
      "Eu já trabalhava com tecnologia, mas não sabia programar. O DevClub me ajudou a entender como transformar ideias em produtos reais.",
    featured: false,
  },
  {
    id: "ana",
    name: "Ana Beatriz",
    previousCareer: "Professora",
    currentRole: "Desenvolvedora Backend",
    company: "DataPulse",
    location: "Recife, Brasil",
    isRemote: true,
    formation: "BackEnd Club",
    studyTime: "9 meses",
    quote:
      "Eu achava que programação era algo distante da minha realidade. Começar do zero e conseguir minha primeira oportunidade mudou completamente minha visão sobre carreira.",
    featured: false,
  },
  {
    id: "rafael",
    name: "Rafael Oliveira",
    previousCareer: "Suporte Técnico",
    currentRole: "Desenvolvedor Full Stack",
    company: "BuildBase",
    location: "Curitiba, Brasil",
    isRemote: false,
    formation: "DevClub Full Stack",
    studyTime: "7 meses",
    quote:
      "Eu já estava próximo da tecnologia, mas não conseguia avançar profissionalmente. Aprender a construir projetos reais foi o ponto de virada.",
    featured: false,
  },
  {
    id: "camila",
    name: "Camila Ferreira",
    previousCareer: "Assistente Financeira",
    currentRole: "Desenvolvedora Frontend",
    company: "PixelCraft",
    location: "Porto Alegre, Brasil",
    isRemote: true,
    formation: "FrontEnd Club",
    studyTime: "6 meses",
    quote:
      "Eu nunca tinha escrito uma linha de código. Hoje trabalho remotamente como desenvolvedora e continuo aprendendo todos os dias.",
    featured: false,
  },
  {
    id: "pedro",
    name: "Pedro Henrique",
    previousCareer: "Estudante",
    currentRole: "Desenvolvedor Mobile",
    company: "AppVerse",
    location: "Fortaleza, Brasil",
    isRemote: true,
    formation: "DevClub Full Stack",
    studyTime: "11 meses",
    quote:
      "Comecei sem saber exatamente por onde seguir. Ter uma trilha estruturada fez toda a diferença para transformar estudo em prática.",
    featured: false,
  },
];

const METRICS = [
  { value: "+10.000", label: "Alunos estudando" },
  { value: "+500", label: "Trabalhando na área" },
  { value: "12", label: "Países alcançados" },
];

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #5eead4, #2dd4bf)",
  "linear-gradient(135deg, #9b2cff, #7c3aed)",
  "linear-gradient(135deg, #ff8a5c, #f97316)",
  "linear-gradient(135deg, #55ff36, #22c55e)",
];

const ACCENT_CLASSES = [
  styles.accentCyan,
  styles.accentPurple,
  styles.accentAmber,
  styles.accentGreen,
];

function getInitials(name: string) {
  const parts = name.split(" ");
  return (parts[0][0] + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

export function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const metricsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    return runTestimonialsAnimations(
      {
        root: rootRef.current,
        heading: headingRef.current,
        cards: cardsRef.current,
        metrics: metricsRef.current,
      },
      reduced,
    );
  }, [reduced]);

  return (
    <section ref={rootRef} id="testimonials" className={styles.testimonials}>
      <div className={styles.inner}>
        <div ref={headingRef} className={styles.heading}>
          <Eyebrow label="TRANSFORMAÇÕES" />
          <h2 className={styles.title}>
            ELES TAMBÉM COMEÇARAM{" "}
            <span className={styles.titleAccent}>DO ZERO</span>.
          </h2>
          <p className={styles.subtitle}>
            Histórias reais de pessoas que decidiram começar, aprender e
            construir uma nova carreira na tecnologia.
          </p>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`${styles.card} ${t.featured ? styles.featured : ""} ${ACCENT_CLASSES[i % ACCENT_CLASSES.length]}`}
            >
              <div className={styles.cardHeader}>
                <div
                  className={styles.avatar}
                  style={{ background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length] }}
                >
                  {getInitials(t.name)}
                </div>
                <div>
                  <div className={styles.cardName}>{t.name}</div>
                  <div className={styles.cardLocation}>{t.location}</div>
                </div>
              </div>

              <div className={styles.transformation}>
                <span className={`${styles.tagBefore} mono`}>{t.previousCareer}</span>
                <span className={styles.arrow}>→</span>
                <span className={`${styles.tagAfter} mono`}>{t.currentRole}</span>
              </div>

              <p className={styles.quote}>"{t.quote}"</p>

              <div className={styles.cardFooter}>
                <span className={`${styles.badge} mono`}>{t.formation}</span>
                <span className={`${styles.badge} mono`}>{t.studyTime}</span>
                {t.isRemote && (
                  <span className={`${styles.badge} ${styles.badgeRemote} mono`}>
                    Remoto
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div ref={metricsRef} className={styles.metrics}>
          {METRICS.map((m) => (
            <div key={m.label} className={styles.metric}>
              <div className={styles.metricValue}>{m.value}</div>
              <div className={`${styles.metricLabel} mono`}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
