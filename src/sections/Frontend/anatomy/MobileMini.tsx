import styles from "./anatomy.module.css";

const W = 240;
const H = 160;

const PHONE = { x: 92, y: 8, w: 56, h: 144, rx: 12 };
const SCREEN = { x: 96, y: 16, w: 48, h: 128, rx: 8 };
const CONTENT_X = SCREEN.x + 4;
const CONTENT_W = SCREEN.w - 8;

/**
 * Miniatura da cena MOBILE: telefone com notch, header do app, campo
 * de busca, dois cards de lista e o botão "Enviar" verde. Espelha a
 * composição de MobileScene em escala.
 */
export function MobileMini() {
  return (
    <svg
      className={styles.mini}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mm-neonPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9b2cff" />
          <stop offset="50%" stopColor="#6c1cff" />
          <stop offset="100%" stopColor="#b52cff" />
        </linearGradient>
        <linearGradient id="mm-neonGreen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#55ff36" />
          <stop offset="100%" stopColor="#13d927" />
        </linearGradient>
      </defs>

      {/* Side buttons */}
      <rect x={PHONE.x - 2} y={PHONE.y + 34} width={2} height={12} rx={1} fill="var(--line-strong)" />
      <rect x={PHONE.x - 2} y={PHONE.y + 50} width={2} height={12} rx={1} fill="var(--line-strong)" />
      <rect x={PHONE.x + PHONE.w} y={PHONE.y + 40} width={2} height={18} rx={1} fill="var(--line-strong)" />

      {/* Body + screen */}
      <rect
        x={PHONE.x}
        y={PHONE.y}
        width={PHONE.w}
        height={PHONE.h}
        rx={PHONE.rx}
        fill="var(--void-raised)"
        stroke="url(#mm-neonPurple)"
        strokeWidth={1.6}
      />
      <rect
        x={SCREEN.x}
        y={SCREEN.y}
        width={SCREEN.w}
        height={SCREEN.h}
        rx={SCREEN.rx}
        fill="var(--void)"
        stroke="rgba(155,44,255,0.28)"
        strokeWidth={0.7}
      />

      {/* Notch */}
      <rect
        x={PHONE.x + 18}
        y={PHONE.y + 12}
        width={20}
        height={4}
        rx={2}
        fill="var(--void)"
        stroke="var(--line-strong)"
        strokeWidth={0.6}
      />

      {/* Header */}
      <rect x={CONTENT_X} y={26} width={22} height={4} rx={2} fill="var(--ink)" />
      <circle cx={CONTENT_X + CONTENT_W - 4} cy={28} r={3.5} fill="var(--surface-hi)" stroke="var(--line-strong)" strokeWidth={0.6} />

      {/* Search field */}
      <rect
        x={CONTENT_X}
        y={36}
        width={CONTENT_W}
        height={9}
        rx={4.5}
        fill="var(--surface)"
        stroke="var(--line-strong)"
        strokeWidth={0.7}
      />
      <circle cx={CONTENT_X + 5} cy={40.5} r={1.6} fill="none" stroke="var(--ink-faint)" strokeWidth={0.7} />
      <rect x={CONTENT_X + 10} y={39} width={16} height={3} rx={1.5} fill="var(--ink-faint)" />

      {/* List cards */}
      {[52, 68, 84].map((y, i) => {
        const accent = i === 2 ? "url(#mm-neonGreen)" : i === 0 ? "url(#mm-neonPurple)" : "url(#mm-neonGreen)";
        const highlight = i === 2;
        return (
          <g key={i}>
            <rect
              x={CONTENT_X}
              y={y}
              width={CONTENT_W}
              height={13}
              rx={3}
              fill="var(--surface)"
              stroke={highlight ? "url(#mm-neonGreen)" : "var(--line-strong)"}
              strokeWidth={highlight ? 1 : 0.7}
            />
            <circle cx={CONTENT_X + 5} cy={y + 6.5} r={3} fill={accent} opacity={0.9} />
            <rect x={CONTENT_X + 11} y={y + 3.5} width={24} height={2.5} rx={1.2} fill="var(--ink)" />
            <rect x={CONTENT_X + 11} y={y + 8} width={16} height={2} rx={1} fill="var(--ink-faint)" />
          </g>
        );
      })}

      {/* CTA button */}
      <rect
        x={CONTENT_X}
        y={104}
        width={CONTENT_W}
        height={13}
        rx={6.5}
        fill="url(#mm-neonGreen)"
      />
      <text
        x={PHONE.x + PHONE.w / 2}
        y={112.5}
        textAnchor="middle"
        fontSize={5.5}
        fill="var(--void)"
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em" }}
      >
        ENVIAR
      </text>

      {/* Tab bar */}
      <line x1={CONTENT_X} y1={128} x2={CONTENT_X + CONTENT_W} y2={128} stroke="var(--line-strong)" strokeWidth={0.7} />
      <rect x={CONTENT_X + 4} y={132} width={5} height={5} rx={1} fill="none" stroke="var(--ink-faint)" strokeWidth={0.7} />
      <circle cx={PHONE.x + PHONE.w / 2} cy={134.5} r={3} fill="url(#mm-neonGreen)" />
      <circle cx={CONTENT_X + CONTENT_W - 6} cy={133.5} r={1.8} fill="none" stroke="var(--ink-faint)" strokeWidth={0.7} />

      {/* Home indicator */}
      <rect x={PHONE.x + 18} y={PHONE.y + PHONE.h - 6} width={20} height={2} rx={1} fill="var(--ink-faint)" />
    </svg>
  );
}
