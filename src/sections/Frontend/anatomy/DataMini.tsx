import styles from "./anatomy.module.css";

const W = 240;
const H = 160;

const TABLE = { x: 76, y: 14, w: 156, h: 108, rx: 5 };
const ROW_H = 12;
const ROW_TOP = TABLE.y + 20;

const ROW_COLORS: Array<"green" | "purple" | "faint" | "ink"> = ["green", "faint", "green", "faint", "green"];

const COLS = [
  { x: TABLE.x + 8, label: "ID" },
  { x: TABLE.x + 32, label: "USUÁRIO" },
  { x: TABLE.x + 82, label: "AÇÃO" },
  { x: TABLE.x + 122, label: "HORA" },
];

const IDS = ["1288", "1289", "1290", "1291", "1292"];

/**
 * Miniatura da cena DATA: cilindro do banco à esquerda + painel de
 * tabela à direita com header, linhas coloridas e o card JSON logo
 * abaixo. Mesma linguagem visual de DataScene, condensada.
 */
export function DataMini() {
  return (
    <svg
      className={styles.mini}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dm-neonPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9b2cff" />
          <stop offset="50%" stopColor="#6c1cff" />
          <stop offset="100%" stopColor="#b52cff" />
        </linearGradient>
        <linearGradient id="dm-neonGreen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#55ff36" />
          <stop offset="100%" stopColor="#13d927" />
        </linearGradient>
      </defs>

      {/* Feed pipe from DB to table */}
      <path
        d={`M 52 60 C 62 60 68 60 ${TABLE.x} 60`}
        fill="none"
        stroke="rgba(94,234,212,0.4)"
        strokeWidth={1}
      />

      {/* Database cylinder */}
      <g>
        <ellipse cx={30} cy={44} rx={22} ry={7} fill="var(--void-raised)" stroke="url(#dm-neonPurple)" strokeWidth={1.4} />
        <path
          d="M 8 44 L 8 84 A 22 7 0 0 0 52 84 L 52 44"
          fill="var(--void-raised)"
          stroke="url(#dm-neonPurple)"
          strokeWidth={1.4}
        />
        <ellipse cx={30} cy={58} rx={22} ry={7} fill="none" stroke="rgba(155,44,255,0.35)" strokeWidth={0.7} />
        <ellipse cx={30} cy={72} rx={22} ry={7} fill="none" stroke="rgba(155,44,255,0.35)" strokeWidth={0.7} />
      </g>

      {/* Table panel */}
      <rect
        x={TABLE.x}
        y={TABLE.y}
        width={TABLE.w}
        height={TABLE.h}
        rx={TABLE.rx}
        fill="var(--void-raised)"
        stroke="url(#dm-neonPurple)"
        strokeWidth={1.4}
      />

      {/* Header row */}
      {COLS.map((c) => (
        <text
          key={c.label}
          x={c.x}
          y={TABLE.y + 12}
          fontSize={5}
          fill="var(--ink-dim)"
          style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.18em" }}
        >
          {c.label}
        </text>
      ))}
      <line
        x1={TABLE.x + 6}
        y1={TABLE.y + 16}
        x2={TABLE.x + TABLE.w - 6}
        y2={TABLE.y + 16}
        stroke="var(--line-strong)"
        strokeWidth={0.7}
      />

      {/* Data rows */}
      {IDS.map((id, i) => {
        const y = ROW_TOP + i * ROW_H;
        const zebra = i % 2 === 0;
        const highlight = i === IDS.length - 1;
        const barFill =
          ROW_COLORS[i] === "green"
            ? "url(#dm-neonGreen)"
            : ROW_COLORS[i] === "purple"
              ? "url(#dm-neonPurple)"
              : "var(--ink-faint)";
        return (
          <g key={i}>
            {zebra && (
              <rect
                x={TABLE.x + 6}
                y={y}
                width={TABLE.w - 12}
                height={ROW_H - 2}
                rx={2}
                fill="var(--surface)"
              />
            )}
            {highlight && (
              <rect
                x={TABLE.x + 6}
                y={y}
                width={TABLE.w - 12}
                height={ROW_H - 2}
                rx={2}
                fill="none"
                stroke="url(#dm-neonGreen)"
                strokeWidth={0.9}
              />
            )}
            <text
              x={COLS[0].x}
              y={y + 7}
              fontSize={5.4}
              fill="var(--ink-faint)"
              style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.02em" }}
            >
              {id}
            </text>
            <rect x={COLS[1].x} y={y + 3.5} width={40} height={3.2} rx={1.5} fill="var(--ink)" opacity={0.75} />
            <rect x={COLS[2].x} y={y + 3.5} width={28} height={3.2} rx={1.5} fill={barFill} opacity={0.85} />
            <rect x={COLS[3].x} y={y + 3.5} width={22} height={3.2} rx={1.5} fill="var(--ink-faint)" opacity={0.7} />
          </g>
        );
      })}

      {/* JSON card */}
      <g>
        <rect
          x={16}
          y={100}
          width={54}
          height={46}
          rx={4}
          fill="var(--surface)"
          stroke="var(--line-strong)"
          strokeWidth={0.8}
        />
        <text x={20} y={110} fontSize={5.5} fill="var(--ink-faint)" style={{ fontFamily: "var(--font-mono)" }}>
          {"{"}
        </text>
        {[
          { k: "usuario", v: '"aluno_042"' },
          { k: "acao", v: '"toque"' },
          { k: "hora", v: '"19:42"' },
        ].map((f, i) => (
          <text
            key={f.k}
            x={22}
            y={118 + i * 8}
            fontSize={4.6}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <tspan fill="#55ff36">{f.k}</tspan>
            <tspan fill="var(--ink-faint)">: </tspan>
            <tspan fill="var(--ink)">{f.v}</tspan>
          </text>
        ))}
        <text x={20} y={144} fontSize={5.5} fill="var(--ink-faint)" style={{ fontFamily: "var(--font-mono)" }}>
          {"}"}
        </text>
      </g>
    </svg>
  );
}
