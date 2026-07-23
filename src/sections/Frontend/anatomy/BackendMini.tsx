import styles from "./anatomy.module.css";

const W = 240;
const H = 160;

const hex = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
  }).join(" ");

const RACK = { x: 92, y: 22, w: 64, h: 116, rx: 6 };
const BLADES = 3;
const BLADE_H = 26;
const BLADE_GAP = 6;
const BLADE_TOP = 30;

/**
 * Miniatura da cena BACKEND: cliente -> hexágono da API -> rack com
 * blades e LEDs -> cilindro do banco. Mesmas formas do BackendScene,
 * densidade reduzida para um card.
 */
export function BackendMini() {
  const bladeX = RACK.x + 6;
  const bladeW = RACK.w - 12;

  return (
    <svg
      className={styles.mini}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bm-neonPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9b2cff" />
          <stop offset="50%" stopColor="#6c1cff" />
          <stop offset="100%" stopColor="#b52cff" />
        </linearGradient>
        <linearGradient id="bm-neonGreen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#55ff36" />
          <stop offset="100%" stopColor="#13d927" />
        </linearGradient>
      </defs>

      {/* Cables */}
      <path
        d="M 30 80 C 42 80 46 80 54 80"
        fill="none"
        stroke="rgba(155,44,255,0.42)"
        strokeWidth={1.2}
      />
      <path
        d="M 82 80 C 86 80 88 80 92 80"
        fill="none"
        stroke="rgba(155,44,255,0.42)"
        strokeWidth={1.2}
      />
      <path
        d="M 156 90 C 180 96 188 90 196 84"
        fill="none"
        stroke="rgba(155,44,255,0.42)"
        strokeWidth={1.2}
      />

      {/* Client browser */}
      <rect x={6} y={64} width={24} height={32} rx={3} fill="var(--surface)" stroke="var(--line-strong)" strokeWidth={1} />
      <line x1={6} y1={70} x2={30} y2={70} stroke="var(--line-strong)" strokeWidth={0.8} />
      <circle cx={9} cy={67} r={1} fill="var(--ink-faint)" />
      <circle cx={12} cy={67} r={1} fill="var(--ink-faint)" />
      <circle cx={15} cy={67} r={1} fill="var(--ink-faint)" />
      <rect x={9} y={75} width={14} height={2.5} rx={1} fill="var(--ink-faint)" />
      <rect x={9} y={80} width={9} height={2.5} rx={1} fill="url(#bm-neonPurple)" />

      {/* API hexagon */}
      <polygon
        points={hex(68, 80, 14)}
        fill="var(--void-raised)"
        stroke="url(#bm-neonPurple)"
        strokeWidth={1.4}
      />
      <polygon
        points={hex(68, 80, 10)}
        fill="none"
        stroke="rgba(155,44,255,0.4)"
        strokeWidth={0.8}
      />
      <circle cx={68} cy={76} r={1.6} fill="url(#bm-neonGreen)" />
      <text
        x={68}
        y={84}
        textAnchor="middle"
        fontSize={6.5}
        fill="var(--ink)"
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em" }}
      >
        API
      </text>

      {/* Rack cabinet */}
      <rect
        x={RACK.x}
        y={RACK.y}
        width={RACK.w}
        height={RACK.h}
        rx={RACK.rx}
        fill="var(--void-raised)"
        stroke="url(#bm-neonPurple)"
        strokeWidth={1.5}
      />
      <rect
        x={RACK.x + 4}
        y={RACK.y + 4}
        width={RACK.w - 8}
        height={RACK.h - 8}
        rx={RACK.rx - 2}
        fill="none"
        stroke="rgba(155,44,255,0.28)"
        strokeWidth={0.7}
      />

      {/* Head panel */}
      <rect x={RACK.x + 6} y={RACK.y + 6} width={RACK.w - 12} height={10} rx={2} fill="var(--surface)" />
      <circle cx={RACK.x + 12} cy={RACK.y + 11} r={1.6} fill="url(#bm-neonGreen)" />
      <rect x={RACK.x + 20} y={RACK.y + 9} width={20} height={3} rx={1.5} fill="var(--ink-faint)" />

      {/* Blades */}
      {Array.from({ length: BLADES }, (_, i) => {
        const y = RACK.y + BLADE_TOP + i * (BLADE_H + BLADE_GAP);
        return (
          <g key={i}>
            <rect
              x={bladeX}
              y={y}
              width={bladeW}
              height={BLADE_H}
              rx={3}
              fill="var(--surface)"
              stroke="rgba(243,245,247,0.15)"
              strokeWidth={0.8}
            />
            {/* LEDs */}
            {[0, 1, 2].map((k) => (
              <circle
                key={k}
                cx={bladeX + 5 + k * 5}
                cy={y + 6}
                r={1.4}
                fill="url(#bm-neonGreen)"
              />
            ))}
            {/* Vents */}
            {[0, 1, 2, 3].map((k) => (
              <line
                key={k}
                x1={bladeX + 24}
                y1={y + 5 + k * 4}
                x2={bladeX + bladeW - 6}
                y2={y + 5 + k * 4}
                stroke="rgba(243,245,247,0.14)"
                strokeWidth={0.8}
              />
            ))}
            {/* Port */}
            <rect
              x={bladeX + bladeW - 14}
              y={y + BLADE_H - 6}
              width={10}
              height={3}
              rx={1}
              fill="url(#bm-neonPurple)"
              opacity={0.85}
            />
          </g>
        );
      })}

      {/* Database cylinder */}
      <g>
        <ellipse
          cx={210}
          cy={62}
          rx={22}
          ry={7}
          fill="var(--void-raised)"
          stroke="url(#bm-neonPurple)"
          strokeWidth={1.4}
        />
        <path
          d="M 188 62 L 188 100 A 22 7 0 0 0 232 100 L 232 62"
          fill="var(--void-raised)"
          stroke="url(#bm-neonPurple)"
          strokeWidth={1.4}
        />
        <ellipse cx={210} cy={76} rx={22} ry={7} fill="none" stroke="rgba(155,44,255,0.35)" strokeWidth={0.8} />
        <ellipse cx={210} cy={90} rx={22} ry={7} fill="none" stroke="rgba(155,44,255,0.35)" strokeWidth={0.8} />
        {[68, 82, 96].map((y, i) => (
          <rect
            key={i}
            x={196}
            y={y}
            width={28}
            height={2}
            rx={1}
            fill={i === 1 ? "url(#bm-neonGreen)" : "var(--ink-faint)"}
            opacity={0.85}
          />
        ))}
      </g>
    </svg>
  );
}
