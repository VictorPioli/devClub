import {
  JSON_CARD,
  JSON_FIELDS,
  LABEL_STYLE,
  TABLE,
  TABLE_COLUMNS,
  TABLE_HEADER_HEIGHT,
  TABLE_ROW,
  TABLE_ROW_COUNT,
  VALUE_STYLE,
  tableRowY,
} from "../layout";
import type { DataSceneRefs } from "./sceneRefs";

/** Cell widths vary per row so the table reads as real data, not a grid. */
const CELL_JITTER = [1, 0.82, 0.94, 0.7, 1, 0.88, 0.76, 0.96];
const SAMPLE_IDS = ["1284", "1285", "1286", "1287", "1288", "1289", "1290", "1291"];

/**
 * Storage made literal: the database cylinder (carried over from BACKEND)
 * on the left, and on the right an actual table of records — header,
 * columns, rows arriving one by one — plus one record shown as JSON.
 */
export function DataScene({ refs }: { refs: DataSceneRefs }) {
  return (
    <g ref={(el) => { refs.group = el; }}>
      {/* The pipe feeding the table from the database */}
      <path
        ref={(el) => { refs.feedLine = el; }}
        d={`M 240 300 C 290 300 310 300 ${TABLE.x} 300`}
        fill="none" stroke="rgba(94,234,212,0.35)" strokeWidth={1.4}
        pathLength={100} strokeDasharray={100} opacity={0}
      />

      {/* Table panel */}
      <rect
        ref={(el) => { refs.panel = el; }}
        x={TABLE.x} y={TABLE.y} width={TABLE.width} height={TABLE.height} rx={TABLE.rx}
        fill="var(--void-raised)" stroke="url(#fe-neonPurple)" strokeWidth={1.8} opacity={0}
      />

      <g ref={(el) => { refs.headerRow = el; }} opacity={0}>
        {TABLE_COLUMNS.map((col) => (
          <text
            key={col.label}
            data-label="tight" x={col.x} y={TABLE.y + 22} fontSize={10}
            fill="var(--ink-dim)" style={LABEL_STYLE}
          >
            {col.label}
          </text>
        ))}
      </g>
      <line
        ref={(el) => { refs.headerDivider = el; }}
        x1={TABLE.x + 12} y1={TABLE.y + TABLE_HEADER_HEIGHT} x2={TABLE.x + TABLE.width - 12} y2={TABLE.y + TABLE_HEADER_HEIGHT}
        stroke="var(--line-strong)" strokeWidth={1} pathLength={100} strokeDasharray={100} strokeDashoffset={100}
      />

      {Array.from({ length: TABLE_ROW_COUNT }, (_, i) => {
        const y = tableRowY(i);
        const jitter = CELL_JITTER[i % CELL_JITTER.length];
        return (
          <g key={i} ref={(el) => { refs.rows[i] = el; }} opacity={0}>
            <rect
              x={TABLE.x + 12} y={y} width={TABLE.width - 24} height={TABLE_ROW.height} rx={5}
              fill={i % 2 === 0 ? "var(--surface)" : "transparent"}
            />
            <text
              data-label="tight" x={TABLE_COLUMNS[0].x} y={y + 17} fontSize={10}
              fill="var(--ink-faint)" style={VALUE_STYLE}
            >
              {SAMPLE_IDS[i]}
            </text>
            {TABLE_COLUMNS.slice(1).map((col, k) => (
              <rect
                key={col.label}
                x={col.x} y={y + 9} width={col.barWidth * (k === 1 ? jitter : 1)} height={8} rx={4}
                fill={k === 1 ? "url(#fe-neonGreen)" : k === 0 ? "var(--ink)" : "var(--ink-faint)"}
                opacity={k === 1 ? 0.85 : 0.7}
              />
            ))}
          </g>
        );
      })}

      {/* The row that just arrived */}
      <rect
        ref={(el) => { refs.newestRowGlow = el; }}
        x={TABLE.x + 12} y={tableRowY(TABLE_ROW_COUNT - 1)} width={TABLE.width - 24} height={TABLE_ROW.height} rx={5}
        fill="none" stroke="url(#fe-neonGreen)" strokeWidth={1.4} opacity={0}
      />

      {/* Compact stand-ins for each row — these are what leave the table
          and cluster into the network's input layer */}
      {Array.from({ length: TABLE_ROW_COUNT }, (_, i) => (
        <circle
          key={i}
          ref={(el) => { refs.rowNodes[i] = el; }}
          cx={TABLE.x + TABLE.width / 2} cy={tableRowY(i) + TABLE_ROW.height / 2} r={5}
          fill="url(#fe-neonGreen)" opacity={0}
        />
      ))}

      {/* One record, shown as structured data */}
      <g ref={(el) => { refs.jsonCard = el; }} opacity={0}>
        <rect
          x={JSON_CARD.x} y={JSON_CARD.y} width={JSON_CARD.width} height={JSON_CARD.height} rx={JSON_CARD.rx}
          fill="var(--surface)" stroke="var(--line-strong)" strokeWidth={1.2}
        />
        <text x={JSON_CARD.x + 14} y={JSON_CARD.y + 22} fontSize={11} fill="var(--ink-faint)" style={VALUE_STYLE}>
          {"{"}
        </text>
        {JSON_FIELDS.map((field, i) => (
          <text
            key={field.key}
            data-label="tight" x={JSON_CARD.x + 24} y={JSON_CARD.y + 42 + i * 18} fontSize={10.5} style={VALUE_STYLE}
          >
            <tspan fill="#55ff36">{field.key}</tspan>
            <tspan fill="var(--ink-faint)">: </tspan>
            <tspan fill="var(--ink)">{field.value}</tspan>
          </text>
        ))}
        <text x={JSON_CARD.x + 14} y={JSON_CARD.y + JSON_CARD.height - 10} fontSize={11} fill="var(--ink-faint)" style={VALUE_STYLE}>
          {"}"}
        </text>
      </g>

      {/* The record in transit, from the phone to the database */}
      <g ref={(el) => { refs.recordPacket = el; }} opacity={0}>
        <rect x={-30} y={-15} width={60} height={30} rx={6} fill="var(--void)" stroke="url(#fe-neonGreen)" strokeWidth={1.5} />
        <rect x={-22} y={-8} width={16} height={4} rx={2} fill="url(#fe-neonGreen)" />
        <rect x={-2} y={-8} width={24} height={4} rx={2} fill="var(--ink)" />
        <rect x={-22} y={0} width={12} height={4} rx={2} fill="url(#fe-neonGreen)" />
        <rect x={-6} y={0} width={28} height={4} rx={2} fill="var(--ink-dim)" />
      </g>

      <text
        ref={(el) => { refs.counter = el; }} data-label
        x={198} y={188} textAnchor="middle" fontSize={11}
        fill="var(--ink-dim)" style={LABEL_STYLE} opacity={0}
      >
        1.291 registros
      </text>
      <text
        ref={(el) => { refs.labelDb = el; }} data-label
        x={198} y={166} textAnchor="middle" fontSize={11}
        fill="var(--ink-dim)" style={LABEL_STYLE} opacity={0}
      >
        Banco de dados
      </text>
      <text
        ref={(el) => { refs.labelTable = el; }} data-label
        x={TABLE.x + TABLE.width / 2} y={TABLE.y + TABLE.height + 26} textAnchor="middle" fontSize={11}
        fill="var(--ink-dim)" style={LABEL_STYLE} opacity={0}
      >
        Registros armazenados
      </text>
    </g>
  );
}
