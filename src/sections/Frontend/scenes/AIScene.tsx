import {
  AI_HIDDEN1_NODES,
  AI_HIDDEN2_NODES,
  AI_INPUT_NODES,
  AI_LAYERS,
  AI_OUTPUT_NODES,
  AI_RESULT_CARD,
  LABEL_STYLE,
  SIGNAL_LANES,
  type Point,
} from "../layout";
import type { AISceneRefs } from "./sceneRefs";

function edges(
  from: Point[],
  to: Point[],
  stroke: string,
  assign: (index: number) => (el: SVGLineElement | null) => void,
  keyPrefix: string
) {
  return from.flatMap((a, i) =>
    to.map((b, j) => (
      <line
        key={`${keyPrefix}-${i}-${j}`}
        ref={assign(i * to.length + j)}
        x1={a.x} y1={a.y} x2={b.x} y2={b.y}
        stroke={stroke} strokeWidth={1} opacity={0} pathLength={100} strokeDasharray={100}
      />
    ))
  );
}

/**
 * A working model, not an orb: data enters on the left, flows through two
 * hidden layers with signals visibly travelling the edges, and leaves as
 * a concrete result on the right. No brain, no robot, no chat bubble.
 */
export function AIScene({ refs }: { refs: AISceneRefs }) {
  return (
    <g ref={(el) => { refs.group = el; }} opacity={0}>
      <ellipse
        ref={(el) => { refs.glow = el; }}
        cx={440} cy={292} rx={280} ry={170}
        fill="url(#fe-neonPurple)" opacity={0}
      />

      {/* Halos marking the patterns the rows grouped into */}
      {AI_INPUT_NODES.map((n, i) => (
        <circle
          key={i}
          ref={(el) => { refs.clusterHalos[i] = el; }}
          cx={n.x} cy={n.y} r={18}
          fill="none" stroke="rgba(85,255,54,0.45)" strokeWidth={1.2} opacity={0}
        />
      ))}

      {edges(AI_INPUT_NODES, AI_HIDDEN1_NODES, "url(#fe-neonGreen)", (i) => (el) => { refs.edgesA[i] = el; }, "a")}
      {edges(AI_HIDDEN1_NODES, AI_HIDDEN2_NODES, "rgba(155,44,255,0.9)", (i) => (el) => { refs.edgesB[i] = el; }, "b")}
      {edges(AI_HIDDEN2_NODES, AI_OUTPUT_NODES, "url(#fe-neonGreen)", (i) => (el) => { refs.edgesC[i] = el; }, "c")}

      {AI_INPUT_NODES.map((n, i) => (
        <circle
          key={i}
          ref={(el) => { refs.inputNodes[i] = el; }}
          cx={n.x} cy={n.y} r={7} fill="url(#fe-neonGreen)" opacity={0}
        />
      ))}
      {AI_HIDDEN1_NODES.map((n, i) => (
        <circle
          key={i}
          ref={(el) => { refs.hidden1Nodes[i] = el; }}
          cx={n.x} cy={n.y} r={7.5} fill="url(#fe-neonPurple)" opacity={0}
        />
      ))}
      {AI_HIDDEN2_NODES.map((n, i) => (
        <circle
          key={i}
          ref={(el) => { refs.hidden2Nodes[i] = el; }}
          cx={n.x} cy={n.y} r={7.5} fill="url(#fe-neonPurple)" opacity={0}
        />
      ))}
      {AI_OUTPUT_NODES.map((n, i) => (
        <circle
          key={i}
          ref={(el) => { refs.outputNodes[i] = el; }}
          cx={n.x} cy={n.y} r={9} fill="url(#fe-neonGreen)" filter="url(#fe-greenGlow)" opacity={0}
        />
      ))}

      {/* Travelling signals — the model is processing, continuously */}
      {SIGNAL_LANES.map((lane, i) => (
        <circle
          key={i}
          ref={(el) => { refs.signals[i] = el; }}
          cx={lane.from.x} cy={lane.from.y} r={3.2}
          fill="var(--ink)" opacity={0}
        />
      ))}

      {/* What the model produces */}
      <g ref={(el) => { refs.resultCard = el; }} opacity={0}>
        <rect
          x={AI_RESULT_CARD.x} y={AI_RESULT_CARD.y} width={AI_RESULT_CARD.width} height={AI_RESULT_CARD.height} rx={AI_RESULT_CARD.rx}
          fill="var(--surface)" stroke="url(#fe-neonGreen)" strokeWidth={1.6}
        />
        <circle cx={AI_RESULT_CARD.x + 26} cy={AI_RESULT_CARD.y + 30} r={13} fill="url(#fe-neonGreen)" opacity={0.16} />
        <path
          ref={(el) => { refs.resultCheck = el; }}
          d={`M ${AI_RESULT_CARD.x + 19} ${AI_RESULT_CARD.y + 30} l 5 6 l 10 -12`}
          fill="none" stroke="url(#fe-neonGreen)" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round"
          pathLength={100} strokeDasharray={100}
        />
        <rect x={AI_RESULT_CARD.x + 48} y={AI_RESULT_CARD.y + 22} width={82} height={7} rx={3.5} fill="var(--ink)" />
        <rect x={AI_RESULT_CARD.x + 48} y={AI_RESULT_CARD.y + 36} width={56} height={6} rx={3} fill="var(--ink-faint)" />
        <line
          x1={AI_RESULT_CARD.x + 16} y1={AI_RESULT_CARD.y + 58} x2={AI_RESULT_CARD.x + AI_RESULT_CARD.width - 16} y2={AI_RESULT_CARD.y + 58}
          stroke="var(--line-strong)" strokeWidth={1}
        />
        <rect x={AI_RESULT_CARD.x + 16} y={AI_RESULT_CARD.y + 70} width={64} height={6} rx={3} fill="var(--ink-faint)" />
        <rect x={AI_RESULT_CARD.x + 90} y={AI_RESULT_CARD.y + 70} width={34} height={6} rx={3} fill="url(#fe-neonPurple)" />
      </g>

      <text
        ref={(el) => { refs.labelData = el; }} data-label
        x={AI_LAYERS.input.x} y={164} textAnchor="middle" fontSize={11}
        fill="var(--ink-dim)" style={LABEL_STYLE} opacity={0}
      >
        Dados
      </text>
      <text
        ref={(el) => { refs.labelModel = el; }} data-label
        x={454} y={452} textAnchor="middle" fontSize={11}
        fill="var(--ink-dim)" style={LABEL_STYLE} opacity={0}
      >
        Rede neural
      </text>
      <text
        ref={(el) => { refs.labelResult = el; }} data-label
        x={AI_RESULT_CARD.x + AI_RESULT_CARD.width / 2} y={AI_RESULT_CARD.y - 14} textAnchor="middle" fontSize={11}
        fill="var(--ink-dim)" style={LABEL_STYLE} opacity={0}
      >
        Resultado
      </text>
    </g>
  );
}
