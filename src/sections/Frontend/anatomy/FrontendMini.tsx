import styles from "./anatomy.module.css";

const W = 240;
const H = 160;
const CX = W / 2;

/**
 * Miniatura da cena FRONTEND: janela de browser com barra de topo,
 * bloco de título, subtítulo e CTA — a mesma gramática visual do mockup
 * animado, comprimida para um quadro de card.
 */
export function FrontendMini() {
  return (
    <svg
      className={styles.mini}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fm-neonPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9b2cff" />
          <stop offset="50%" stopColor="#6c1cff" />
          <stop offset="100%" stopColor="#b52cff" />
        </linearGradient>
        <pattern id="fm-dotGrid" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.7" fill="rgba(243,245,247,0.14)" />
        </pattern>
      </defs>

      <rect x={10} y={10} width={W - 20} height={H - 20} rx={8} fill="url(#fm-dotGrid)" />
      <rect
        x={10}
        y={10}
        width={W - 20}
        height={H - 20}
        rx={8}
        fill="none"
        stroke="url(#fm-neonPurple)"
        strokeWidth={1.6}
      />

      <line x1={10} y1={32} x2={W - 10} y2={32} stroke="var(--line-strong)" strokeWidth={1} />
      <rect x={20} y={19} width={8} height={8} rx={2} fill="url(#fm-neonPurple)" />
      <rect x={32} y={20} width={26} height={6} rx={2} fill="var(--ink)" />
      <rect x={170} y={20} width={22} height={5} rx={2} fill="var(--ink-faint)" />
      <rect x={198} y={20} width={22} height={5} rx={2} fill="var(--ink-faint)" />

      <rect x={CX - 68} y={60} width={136} height={14} rx={3} fill="var(--ink)" />
      <rect x={CX - 44} y={80} width={88} height={14} rx={3} fill="var(--ink)" />
      <rect x={CX - 34} y={102} width={68} height={5} rx={2.5} fill="var(--ink-faint)" />

      <rect
        x={CX - 36}
        y={118}
        width={72}
        height={22}
        rx={11}
        fill="url(#fm-neonPurple)"
      />
      <rect x={CX - 14} y={127} width={28} height={4} rx={2} fill="var(--void)" />
    </svg>
  );
}
