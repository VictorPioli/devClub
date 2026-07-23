import styles from "./anatomy.module.css";

const W = 240;
const H = 160;

const LAYERS = {
  input: { x: 32, ys: [46, 78, 110] },
  hidden1: { x: 78, ys: [34, 62, 90, 118] },
  hidden2: { x: 128, ys: [46, 78, 110] },
  output: { x: 174, ys: [62, 94] },
};

const RESULT = { x: 196, y: 60, w: 38, h: 40, rx: 4 };

type Node = { x: number; y: number };
const toNodes = (layer: { x: number; ys: number[] }): Node[] =>
  layer.ys.map((y) => ({ x: layer.x, y }));

const INPUTS = toNodes(LAYERS.input);
const HIDDEN1 = toNodes(LAYERS.hidden1);
const HIDDEN2 = toNodes(LAYERS.hidden2);
const OUTPUTS = toNodes(LAYERS.output);

/**
 * Miniatura da cena GESTÃO DE IA: rede direcional de 4 camadas com
 * conexões visíveis e um card de resultado com check. Mesma anatomia
 * de AIScene, denso o suficiente pra ser reconhecível como rede.
 */
export function AIMini() {
  return (
    <svg
      className={styles.mini}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="am-neonPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9b2cff" />
          <stop offset="50%" stopColor="#6c1cff" />
          <stop offset="100%" stopColor="#b52cff" />
        </linearGradient>
        <linearGradient id="am-neonGreen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#55ff36" />
          <stop offset="100%" stopColor="#13d927" />
        </linearGradient>
      </defs>

      {/* Edges input -> hidden1 (green) */}
      {INPUTS.flatMap((a, i) =>
        HIDDEN1.map((b, j) => (
          <line
            key={`a-${i}-${j}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="url(#am-neonGreen)"
            strokeWidth={0.5}
            opacity={0.32}
          />
        ))
      )}

      {/* Edges hidden1 -> hidden2 (purple) */}
      {HIDDEN1.flatMap((a, i) =>
        HIDDEN2.map((b, j) => (
          <line
            key={`b-${i}-${j}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="rgba(155,44,255,0.75)"
            strokeWidth={0.5}
            opacity={0.35}
          />
        ))
      )}

      {/* Edges hidden2 -> output (green) */}
      {HIDDEN2.flatMap((a, i) =>
        OUTPUTS.map((b, j) => (
          <line
            key={`c-${i}-${j}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="url(#am-neonGreen)"
            strokeWidth={0.5}
            opacity={0.4}
          />
        ))
      )}

      {/* Cluster halos on inputs */}
      {INPUTS.map((n, i) => (
        <circle
          key={`h-${i}`}
          cx={n.x}
          cy={n.y}
          r={8}
          fill="none"
          stroke="rgba(85,255,54,0.4)"
          strokeWidth={0.6}
        />
      ))}

      {/* Nodes */}
      {INPUTS.map((n, i) => (
        <circle key={`in-${i}`} cx={n.x} cy={n.y} r={3.2} fill="url(#am-neonGreen)" />
      ))}
      {HIDDEN1.map((n, i) => (
        <circle key={`h1-${i}`} cx={n.x} cy={n.y} r={3.4} fill="url(#am-neonPurple)" />
      ))}
      {HIDDEN2.map((n, i) => (
        <circle key={`h2-${i}`} cx={n.x} cy={n.y} r={3.4} fill="url(#am-neonPurple)" />
      ))}
      {OUTPUTS.map((n, i) => (
        <circle key={`out-${i}`} cx={n.x} cy={n.y} r={4} fill="url(#am-neonGreen)" />
      ))}

      {/* Result card */}
      <g>
        <rect
          x={RESULT.x}
          y={RESULT.y}
          width={RESULT.w}
          height={RESULT.h}
          rx={RESULT.rx}
          fill="var(--surface)"
          stroke="url(#am-neonGreen)"
          strokeWidth={1}
        />
        <circle cx={RESULT.x + 9} cy={RESULT.y + 12} r={5} fill="url(#am-neonGreen)" opacity={0.18} />
        <path
          d={`M ${RESULT.x + 6} ${RESULT.y + 12} l 2 2.5 l 4 -5`}
          fill="none"
          stroke="url(#am-neonGreen)"
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x={RESULT.x + 17} y={RESULT.y + 8} width={16} height={3} rx={1.5} fill="var(--ink)" />
        <rect x={RESULT.x + 17} y={RESULT.y + 14} width={11} height={2.5} rx={1.2} fill="var(--ink-faint)" />
        <line
          x1={RESULT.x + 5}
          y1={RESULT.y + 24}
          x2={RESULT.x + RESULT.w - 5}
          y2={RESULT.y + 24}
          stroke="var(--line-strong)"
          strokeWidth={0.6}
        />
        <rect x={RESULT.x + 5} y={RESULT.y + 28} width={14} height={2.5} rx={1.2} fill="var(--ink-faint)" />
        <rect x={RESULT.x + 22} y={RESULT.y + 28} width={10} height={2.5} rx={1.2} fill="url(#am-neonPurple)" />
      </g>
    </svg>
  );
}
