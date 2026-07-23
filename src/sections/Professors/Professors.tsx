import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { runProfessorsAnimations } from "../../animations/professorsAnimations";
import { Eyebrow } from "../../components/ui/Eyebrow";
import styles from "./Professors.module.css";

interface Professor {
  id: string;
  name: string;
  image: string | null;
  specialty: string;
  description: string;
  tags: string[];
}

// Vite serves everything under public/ relative to BASE_URL, not the
// domain root — on GitHub Pages that's /devClub/, not /. A hardcoded
// leading-slash path bypasses that and 404s once the site isn't
// hosted at the root.
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const PROFESSORS: Professor[] = [
  {
    id: "rodolfo",
    name: "Rodolfo Mori",
    image: asset("professors/rodolfo-mori.jpg"),
    specialty: "Desenvolvimento Full Stack e Arquitetura de Software",
    description:
      "Especialista em transformar fundamentos de programação em aplicações reais, conectando frontend, backend e arquitetura de sistemas.",
    tags: ["Full Stack", "Arquitetura", "JavaScript"],
  },
  {
    id: "andrei",
    name: "Andrei Maia",
    image: asset("professors/andrey-maia.png"),
    specialty: "Engenharia de Software e Desenvolvimento Backend",
    description:
      "Focado na construção de sistemas robustos, APIs escaláveis e na aplicação de boas práticas para transformar código em produtos confiáveis.",
    tags: ["Backend", "APIs", "Arquitetura"],
  },
  {
    id: "victor",
    name: "Victor Soares",
    image: asset("professors/victor-soares.jpg"),
    specialty: "Frontend, Interfaces e Experiência do Usuário",
    description:
      "Especialista em transformar ideias em interfaces modernas, funcionais e experiências digitais que conectam tecnologia e pessoas.",
    tags: ["Frontend", "React", "UI Engineering"],
  },
  {
    id: "deyvid",
    name: "Deyvid Nascimento",
    image: asset("professors/deyvid-nascimento.jpg"),
    specialty: "Inteligência Artificial e Desenvolvimento de Produtos",
    description:
      "Focado na aplicação prática de Inteligência Artificial para acelerar o desenvolvimento e criar novas possibilidades com tecnologia.",
    tags: ["IA", "Automação", "Produtos Digitais"],
  },
];

const PHOTO_ACCENTS = [
  { accent: "rgba(155, 44, 255, 0.45)", secondary: "rgba(94, 234, 212, 0.3)" },
  { accent: "rgba(94, 234, 212, 0.4)", secondary: "rgba(155, 44, 255, 0.25)" },
  { accent: "rgba(255, 138, 92, 0.4)", secondary: "rgba(155, 44, 255, 0.25)" },
  { accent: "rgba(39, 245, 47, 0.35)", secondary: "rgba(94, 234, 212, 0.25)" },
];

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #9b2cff, #7c3aed)",
  "linear-gradient(135deg, #5eead4, #2dd4bf)",
  "linear-gradient(135deg, #ff8a5c, #f97316)",
  "linear-gradient(135deg, #55ff36, #22c55e)",
];

function getInitials(name: string) {
  const parts = name.split(" ");
  return (parts[0][0] + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

function ChevronLeft() {
  return (
    <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Professors() {
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const navControlsRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    return runProfessorsAnimations(
      {
        root: rootRef.current,
        heading: headingRef.current,
        showcase: showcaseRef.current,
        navControls: navControlsRef.current,
      },
      reduced,
    );
  }, [reduced]);

  function goTo(nextIndex: number, direction: 1 | -1) {
    if (isAnimating.current) return;

    if (reduced) {
      setActiveIndex(nextIndex);
      return;
    }

    isAnimating.current = true;
    const targets = [photoRef.current, infoRef.current].filter(Boolean);

    gsap.to(targets, {
      opacity: 0,
      x: -40 * direction,
      filter: "blur(6px)",
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(nextIndex);
        gsap.fromTo(
          targets,
          { opacity: 0, x: 40 * direction, filter: "blur(6px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "expo.out",
            onComplete: () => {
              isAnimating.current = false;
            },
          },
        );
      },
    });
  }

  function handlePrev() {
    const nextIndex = (activeIndex - 1 + PROFESSORS.length) % PROFESSORS.length;
    goTo(nextIndex, -1);
  }

  function handleNext() {
    const nextIndex = (activeIndex + 1) % PROFESSORS.length;
    goTo(nextIndex, 1);
  }

  function handleDot(i: number) {
    if (i === activeIndex) return;
    goTo(i, i > activeIndex ? 1 : -1);
  }

  const professor = PROFESSORS[activeIndex];
  const accent = PHOTO_ACCENTS[activeIndex % PHOTO_ACCENTS.length];

  return (
    <section ref={rootRef} id="professors" className={styles.professors}>
      <div className={styles.inner}>
        <div ref={headingRef} className={styles.heading}>
          <Eyebrow label="INSTRUTORES" />
          <h2 className={styles.title}>
            APRENDA COM QUEM <span className={styles.titleAccent}>CONSTRÓI</span>.
          </h2>
          <p className={styles.subtitle}>
            Conheça os profissionais que transformam experiência em conhecimento
            e ajudam você a construir sua próxima etapa.
          </p>
        </div>

        <div ref={showcaseRef} className={styles.showcaseWrap}>
          <button
            type="button"
            className={styles.navButton}
            onClick={handlePrev}
            aria-label="Professor anterior"
          >
            <ChevronLeft />
          </button>

          <div className={styles.showcase}>
            <div
              ref={photoRef}
              className={styles.photoFrame}
              style={
                {
                  "--photo-accent": accent.accent,
                  "--photo-accent-secondary": accent.secondary,
                } as React.CSSProperties
              }
            >
              {professor.image ? (
                <img src={professor.image} alt={professor.name} className={styles.photo} />
              ) : (
                <div
                  className={styles.photoInitials}
                  style={{ background: AVATAR_GRADIENTS[activeIndex % AVATAR_GRADIENTS.length] }}
                >
                  {getInitials(professor.name)}
                </div>
              )}
            </div>

            <div ref={infoRef} className={styles.info}>
              <h3 className={styles.professorName}>{professor.name}</h3>
              <p className={`${styles.specialty} mono`}>{professor.specialty}</p>
              <p className={styles.description}>{professor.description}</p>
              <div className={styles.tags}>
                {professor.tags.map((tag) => (
                  <span key={tag} className={`${styles.tag} mono`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className={styles.navButton}
            onClick={handleNext}
            aria-label="Próximo professor"
          >
            <ChevronRight />
          </button>
        </div>

        <div ref={navControlsRef} className={styles.navControls}>
          <span className={`${styles.indicator} mono`}>
            {String(activeIndex + 1).padStart(2, "0")} / {String(PROFESSORS.length).padStart(2, "0")}
          </span>
          <div className={styles.dots}>
            {PROFESSORS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={`${styles.dot} ${i === activeIndex ? styles.active : ""}`}
                onClick={() => handleDot(i)}
                aria-label={`Ver ${p.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
