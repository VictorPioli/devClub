import {
  CABLE_API_RACK,
  CABLE_CLIENT_API,
  CABLE_RACK_BACK,
  CABLE_RACK_DB,
  CLIENT,
  DB,
  GATEWAY,
  LABEL_STYLE,
  RACK,
  RACK_BACK,
  RACK_BACK_BLADE_COUNT,
  RACK_BLADE,
  RACK_BLADE_COUNT,
} from "../layout";
import type { BackendSceneRefs } from "./sceneRefs";

const hexPoints = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
  }).join(" ");

const bladeY = (i: number) => RACK_BLADE.top + i * (RACK_BLADE.height + RACK_BLADE.gap);

/**
 * The engine room. A rack cabinet with real blades, LEDs, drive slots and
 * vents; a gateway plate labelled API; a client that issues a request; a
 * database wired to the rack. Nothing here is a card in a flowchart — the
 * request/processing/response story is told inside the hardware itself.
 */
export function BackendScene({ refs }: { refs: BackendSceneRefs }) {
  const bladeWidth = RACK.width - RACK_BLADE.inset * 2;

  return (
    <g ref={(el) => { refs.group = el; }}>
      {/* Cables first, so every box sits on top of its wiring */}
      {[CABLE_CLIENT_API, CABLE_API_RACK, CABLE_RACK_DB, CABLE_RACK_BACK].map((d, i) => (
        <path
          key={i}
          ref={(el) => { refs.cables[i] = el; }}
          d={d}
          fill="none"
          stroke="rgba(155,44,255,0.34)"
          strokeWidth={1.6}
          pathLength={100}
          strokeDasharray={100}
          // Undrawn until BACKEND draws it; otherwise the wiring is
          // already on screen while the FRONTEND mockup is still up.
          strokeDashoffset={100}
        />
      ))}

      {/* The caller — a small browser window that fires the request */}
      <g ref={(el) => { refs.clientGroup = el; }} opacity={0}>
        <rect
          x={CLIENT.x} y={CLIENT.y} width={CLIENT.width} height={CLIENT.height} rx={CLIENT.rx}
          fill="var(--surface)" stroke="var(--line-strong)" strokeWidth={1.4}
        />
        <line
          x1={CLIENT.x} y1={CLIENT.y + 16} x2={CLIENT.x + CLIENT.width} y2={CLIENT.y + 16}
          stroke="var(--line-strong)" strokeWidth={1}
        />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={CLIENT.x + 10 + i * 9} cy={CLIENT.y + 8} r={2.4} fill="var(--ink-faint)" />
        ))}
        <rect x={CLIENT.x + 12} y={CLIENT.y + 28} width={54} height={6} rx={3} fill="var(--ink-faint)" />
        <rect x={CLIENT.x + 12} y={CLIENT.y + 42} width={34} height={6} rx={3} fill="url(#fe-neonPurple)" />
      </g>

      {/* API gateway — the front door, and later the app's birthplace */}
      <g ref={(el) => { refs.gatewayGroup = el; }} opacity={0}>
        <polygon
          points={hexPoints(GATEWAY.x, GATEWAY.y, GATEWAY.r)}
          fill="var(--void-raised)" stroke="url(#fe-neonPurple)" strokeWidth={2}
        />
        <polygon
          points={hexPoints(GATEWAY.x, GATEWAY.y, GATEWAY.r - 8)}
          fill="none" stroke="rgba(155,44,255,0.35)" strokeWidth={1}
        />
        <circle cx={GATEWAY.x} cy={GATEWAY.y - 9} r={4} fill="url(#fe-neonGreen)" filter="url(#fe-greenGlow)" />
        <text
          x={GATEWAY.x} y={GATEWAY.y + 12} textAnchor="middle" fontSize={13}
          fill="var(--ink)" style={LABEL_STYLE}
        >
          API
        </text>
      </g>

      {/* Rack set back in depth — the system scales sideways */}
      <g ref={(el) => { refs.rackBackGroup = el; }} opacity={0}>
        <rect
          x={RACK_BACK.x} y={RACK_BACK.y} width={RACK_BACK.width} height={RACK_BACK.height} rx={RACK_BACK.rx}
          fill="var(--void-raised)" stroke="rgba(155,44,255,0.4)" strokeWidth={1.4}
        />
        {Array.from({ length: RACK_BACK_BLADE_COUNT }, (_, i) => {
          const y = RACK_BACK.y + 24 + i * 46;
          return (
            <g key={i}>
              <rect
                x={RACK_BACK.x + 10} y={y} width={RACK_BACK.width - 20} height={34} rx={4}
                fill="var(--surface)" stroke="rgba(243,245,247,0.12)" strokeWidth={1}
              />
              <circle cx={RACK_BACK.x + 20} cy={y + 17} r={2} fill="url(#fe-neonGreen)" opacity={0.7} />
              {[0, 1, 2].map((k) => (
                <line
                  key={k}
                  x1={RACK_BACK.x + 32} y1={y + 10 + k * 7} x2={RACK_BACK.x + RACK_BACK.width - 20} y2={y + 10 + k * 7}
                  stroke="rgba(243,245,247,0.1)" strokeWidth={1}
                />
              ))}
            </g>
          );
        })}
      </g>

      {/* The hero rack */}
      <g ref={(el) => { refs.rackGroup = el; }} opacity={0}>
        <rect
          x={RACK.x} y={RACK.y} width={RACK.width} height={RACK.height} rx={RACK.rx}
          fill="var(--void-raised)" stroke="url(#fe-neonPurple)" strokeWidth={2.2}
        />
        <rect
          x={RACK.x + 6} y={RACK.y + 6} width={RACK.width - 12} height={RACK.height - 12} rx={RACK.rx - 3}
          fill="none" stroke="rgba(155,44,255,0.28)" strokeWidth={1}
        />
        {/* Cabinet head — power and network status */}
        <rect x={RACK.x + 14} y={RACK.y + 14} width={RACK.width - 28} height={18} rx={4} fill="var(--surface)" />
        <circle cx={RACK.x + 26} cy={RACK.y + 23} r={3} fill="url(#fe-neonGreen)" filter="url(#fe-greenGlow)" />
        <rect x={RACK.x + 38} y={RACK.y + 20} width={40} height={6} rx={3} fill="var(--ink-faint)" />

        {Array.from({ length: RACK_BLADE_COUNT }, (_, i) => {
          const y = RACK.y + bladeY(i);
          return (
            <g key={i} ref={(el) => { refs.blades[i] = el; }}>
              <rect
                x={RACK.x + RACK_BLADE.inset} y={y} width={bladeWidth} height={RACK_BLADE.height} rx={5}
                fill="var(--surface)" stroke="rgba(243,245,247,0.14)" strokeWidth={1.2}
              />
              {/* LED strip */}
              {[0, 1, 2].map((k) => (
                <circle
                  key={k}
                  ref={(el) => { refs.leds[i * 3 + k] = el; }}
                  cx={RACK.x + RACK_BLADE.inset + 12 + k * 10}
                  cy={y + 10}
                  r={2.6}
                  fill="url(#fe-neonGreen)"
                />
              ))}
              {/* Drive slots */}
              {[0, 1].map((k) => (
                <rect
                  key={k}
                  x={RACK.x + RACK_BLADE.inset + 10 + k * 34} y={y + 20} width={28} height={13} rx={2.5}
                  fill="var(--void)" stroke="rgba(243,245,247,0.16)" strokeWidth={1}
                />
              ))}
              {/* Ventilation grille */}
              {[0, 1, 2, 3, 4].map((k) => (
                <line
                  key={k}
                  x1={RACK.x + RACK_BLADE.inset + 92} y1={y + 9 + k * 6}
                  x2={RACK.x + RACK.width - RACK_BLADE.inset - 10} y2={y + 9 + k * 6}
                  stroke="rgba(243,245,247,0.13)" strokeWidth={1.4}
                />
              ))}
              {/* Ports */}
              <rect
                x={RACK.x + RACK.width - RACK_BLADE.inset - 26} y={y + RACK_BLADE.height - 12}
                width={16} height={6} rx={1.5} fill="url(#fe-neonPurple)" opacity={0.8}
              />
            </g>
          );
        })}

        {/* Processing sweep — the rack visibly working on a request */}
        <rect
          ref={(el) => { refs.scanline = el; }}
          x={RACK.x + 4} y={RACK.y + 40} width={RACK.width - 8} height={26} rx={4}
          fill="url(#fe-neonGreen)" opacity={0} filter="url(#fe-greenGlow)"
        />
      </g>

      {/* Database — wired to the rack, and the DATA stage's future hero */}
      <g ref={(el) => { refs.dbGroup = el; }} opacity={0}>
        <ellipse
          cx={DB.x} cy={DB.y + DB.bodyTop} rx={DB.rx} ry={DB.ry}
          fill="var(--void-raised)" stroke="url(#fe-neonPurple)" strokeWidth={2}
        />
        <path
          d={`M ${DB.x - DB.rx} ${DB.y + DB.bodyTop} L ${DB.x - DB.rx} ${DB.y + DB.bodyBottom} A ${DB.rx} ${DB.ry} 0 0 0 ${DB.x + DB.rx} ${DB.y + DB.bodyBottom} L ${DB.x + DB.rx} ${DB.y + DB.bodyTop}`}
          fill="var(--void-raised)" stroke="url(#fe-neonPurple)" strokeWidth={2}
        />
        <ellipse cx={DB.x} cy={DB.y - 6} rx={DB.rx} ry={DB.ry} fill="none" stroke="rgba(155,44,255,0.3)" strokeWidth={1} />
        <ellipse cx={DB.x} cy={DB.y + 14} rx={DB.rx} ry={DB.ry} fill="none" stroke="rgba(155,44,255,0.3)" strokeWidth={1} />
        {[-22, -14, 4, 12, 22].map((dy, i) => (
          <rect
            key={i}
            ref={(el) => { refs.dbRows[i] = el; }}
            x={DB.x - 24} y={DB.y + dy} width={48} height={3} rx={1.5}
            fill={i % 2 === 0 ? "url(#fe-neonGreen)" : "var(--ink-faint)"} opacity={0}
          />
        ))}
      </g>

      {/* Packets — request in, response out, writes to the database */}
      <g ref={(el) => { refs.requestPacket = el; }} opacity={0}>
        <rect x={-19} y={-9} width={38} height={18} rx={5} fill="var(--void)" stroke="url(#fe-neonGreen)" strokeWidth={1.4} />
        <circle cx={-10} cy={0} r={3} fill="url(#fe-neonGreen)" />
        <rect x={-3} y={-2.5} width={14} height={5} rx={2.5} fill="var(--ink-dim)" />
      </g>
      <g ref={(el) => { refs.responsePacket = el; }} opacity={0}>
        <rect x={-19} y={-9} width={38} height={18} rx={5} fill="var(--void)" stroke="url(#fe-neonPurple)" strokeWidth={1.4} />
        <circle cx={-10} cy={0} r={3} fill="url(#fe-neonPurple)" />
        <rect x={-3} y={-2.5} width={14} height={5} rx={2.5} fill="var(--ink-dim)" />
      </g>
      <circle ref={(el) => { refs.dbPacket = el; }} r={4} fill="url(#fe-neonGreen)" filter="url(#fe-greenGlow)" opacity={0} />

      {/* Labels, attached to the hardware they describe */}
      <text
        ref={(el) => { refs.labelRequest = el; }} data-label
        x={CLIENT.x + CLIENT.width / 2} y={CLIENT.y - 14} textAnchor="middle" fontSize={11}
        fill="var(--ink-dim)" style={LABEL_STYLE} opacity={0}
      >
        Requisição
      </text>
      <text
        ref={(el) => { refs.labelProcessing = el; }} data-label
        x={RACK.x + RACK.width / 2} y={RACK.y - 16} textAnchor="middle" fontSize={11}
        fill="var(--ink)" style={LABEL_STYLE} opacity={0}
      >
        Processando
      </text>
      <text
        ref={(el) => { refs.labelResponse = el; }} data-label
        x={CLIENT.x + CLIENT.width / 2} y={CLIENT.y + CLIENT.height + 24} textAnchor="middle" fontSize={11}
        fill="var(--ink-dim)" style={LABEL_STYLE} opacity={0}
      >
        Resposta
      </text>
      <g ref={(el) => { refs.labelApi = el; }} opacity={0}>
        <text data-label x={GATEWAY.x} y={GATEWAY.y + GATEWAY.r + 22} textAnchor="middle" fontSize={10} fill="var(--ink-faint)" style={LABEL_STYLE}>
          Entrada do sistema
        </text>
      </g>
      <text
        ref={(el) => { refs.labelRack = el; }} data-label
        x={RACK.x + RACK.width / 2} y={RACK.y + RACK.height + 26} textAnchor="middle" fontSize={11}
        fill="var(--ink-dim)" style={LABEL_STYLE} opacity={0}
      >
        Servidores
      </text>
      <text
        ref={(el) => { refs.labelDb = el; }} data-label
        x={DB.x} y={DB.y + 68} textAnchor="middle" fontSize={11}
        fill="var(--ink-dim)" style={LABEL_STYLE} opacity={0}
      >
        Banco de dados
      </text>
    </g>
  );
}
