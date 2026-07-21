/**
 * Shared geometry for the pinned FRONTEND -> BACKEND -> MOBILE -> DATA ->
 * GESTAO DE IA sequence. Both the scene components (which draw) and the
 * stage builders (which animate) read from here, so a position is never
 * written down twice.
 *
 * Everything is in the section's single SVG user space: 900 x 560.
 */

export interface Point {
  x: number;
  y: number;
}

export const VIEWBOX = { width: 900, height: 560 };

/** Micro-labels: technical annotation, never the protagonist. */
export const LABEL_STYLE = {
  fontFamily: "var(--font-mono)",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
} as const;

/** Data values inside tables/JSON — mono, but not letter-spaced. */
export const VALUE_STYLE = {
  fontFamily: "var(--font-mono)",
  letterSpacing: "0.02em",
} as const;

// =====================================================================
// BACKEND — a server room: client -> API gateway -> rack -> database
// =====================================================================

/** The caller: a small browser window that issues the request. */
export const CLIENT = { x: 62, y: 274, width: 92, height: 62, rx: 8 };

/** API gateway plate, drawn as a hexagon centered here. */
export const GATEWAY = { x: 246, y: 300, r: 38 };

/** The hero: a full rack cabinet with blades. */
export const RACK = { x: 348, y: 128, width: 200, height: 344, rx: 10 };
export const RACK_BLADE_COUNT = 6;
export const RACK_BLADE = { height: 42, gap: 10, inset: 14, top: 44 };

/** A second, smaller rack set back in depth. */
export const RACK_BACK = { x: 580, y: 186, width: 122, height: 224, rx: 8 };
export const RACK_BACK_BLADE_COUNT = 4;

/** The database. This exact group becomes the DATA stage's hero. */
export const DB = { x: 790, y: 322, rx: 40, ry: 12, bodyTop: -34, bodyBottom: 30 };

export const CABLE_CLIENT_API = `M ${CLIENT.x + CLIENT.width} ${CLIENT.y + CLIENT.height / 2} C 190 305 200 300 ${GATEWAY.x - GATEWAY.r} 300`;
export const CABLE_API_RACK = `M ${GATEWAY.x + GATEWAY.r} 300 C 312 300 330 300 ${RACK.x} 300`;
export const CABLE_RACK_DB = `M ${RACK.x + RACK.width} 340 C 624 356 700 340 ${DB.x - DB.rx} ${DB.y - 4}`;
export const CABLE_RACK_BACK = `M ${RACK.x + RACK.width} 236 C 560 236 566 250 ${RACK_BACK.x} 252`;

/** Where the backend composition retreats to once MOBILE takes over. */
export const BACKEND_RECEDE = { x: 84, y: -18, scale: 0.58, opacity: 0.16 };

// =====================================================================
// MOBILE — a phone with an actual app on it
// =====================================================================

/** The app is born as a seed at the gateway, then grows and compresses. */
export const DEVICE_SEED = { x: GATEWAY.x - 11, y: GATEWAY.y - 11, width: 22, height: 22, rx: 10 };
export const DEVICE_WINDOW = { x: 250, y: 176, width: 400, height: 236, rx: 16 };
export const PHONE = { x: 340, y: 58, width: 220, height: 444, rx: 34 };
export const SCREEN = { x: 352, y: 70, width: 196, height: 420, rx: 26 };

export const APP = {
  contentLeft: SCREEN.x + 12,
  contentWidth: SCREEN.width - 24,
  statusY: 92,
  headerY: 122,
  searchY: 138,
  listTop: 176,
  cardHeight: 42,
  cardGap: 48,
  ctaY: 322,
  ctaHeight: 44,
  tabLineY: 438,
  tabIconY: 460,
  homeY: 480,
};

export const APP_CARD_YS = [APP.listTop, APP.listTop + APP.cardGap];
export const APP_NEW_CARD_Y = APP.listTop + APP.cardGap * 2;

/** The button the user taps — origin of the whole DATA stage. */
export const TAP_POINT = { x: 450, y: APP.ctaY + APP.ctaHeight / 2 };

/** The record card that leaves the phone and travels to the database. */
export const PACKET_START = { x: TAP_POINT.x, y: TAP_POINT.y };

// =====================================================================
// DATA — the same database, grown, plus a real table of records
// =====================================================================

/** Where the backend database ends up once it becomes the DATA hero. */
export const DATA_DB = { x: 198, y: 300, scale: 2.35 };
export const DATA_DB_SHIFT = { x: DATA_DB.x - DB.x, y: DATA_DB.y - DB.y };

export const TABLE = { x: 348, y: 146, width: 424, height: 304, rx: 12 };
export const TABLE_HEADER_HEIGHT = 34;
export const TABLE_ROW_COUNT = 8;
export const TABLE_ROW = { height: 26, gap: 5, top: TABLE.y + TABLE_HEADER_HEIGHT + 8 };

export const TABLE_COLUMNS = [
  { label: "ID", x: TABLE.x + 20, barWidth: 22 },
  { label: "USUÁRIO", x: TABLE.x + 68, barWidth: 74 },
  { label: "AÇÃO", x: TABLE.x + 202, barWidth: 62 },
  { label: "HORÁRIO", x: TABLE.x + 306, barWidth: 68 },
];

export const tableRowY = (i: number) => TABLE_ROW.top + i * (TABLE_ROW.height + TABLE_ROW.gap);

/** A stylized sample of one stored record. */
export const JSON_CARD = { x: 108, y: 402, width: 184, height: 108, rx: 10 };
export const JSON_FIELDS = [
  { key: "usuario", value: '"aluno_042"' },
  { key: "acao", value: '"toque"' },
  { key: "horario", value: '"19:42:07"' },
];

// =====================================================================
// GESTAO DE IA — a directional network: data in, result out
// =====================================================================

export const AI_LAYERS = {
  input: { x: 236, ys: [206, 262, 318, 374] },
  hidden1: { x: 386, ys: [176, 222, 268, 314, 360, 406] },
  hidden2: { x: 522, ys: [200, 246, 292, 338, 384] },
  output: { x: 648, ys: [252, 328] },
};

export const AI_RESULT_CARD = { x: 706, y: 244, width: 154, height: 96, rx: 10 };

export const nodesOf = (layer: { x: number; ys: number[] }): Point[] =>
  layer.ys.map((y) => ({ x: layer.x, y }));

export const AI_INPUT_NODES = nodesOf(AI_LAYERS.input);
export const AI_HIDDEN1_NODES = nodesOf(AI_LAYERS.hidden1);
export const AI_HIDDEN2_NODES = nodesOf(AI_LAYERS.hidden2);
export const AI_OUTPUT_NODES = nodesOf(AI_LAYERS.output);

/** Signals ride these lanes, one per gap between layers. */
export const SIGNAL_LANES: { from: Point; to: Point }[] = [
  { from: AI_INPUT_NODES[1], to: AI_HIDDEN1_NODES[2] },
  { from: AI_HIDDEN1_NODES[2], to: AI_HIDDEN2_NODES[2] },
  { from: AI_HIDDEN2_NODES[2], to: AI_OUTPUT_NODES[0] },
  { from: AI_INPUT_NODES[2], to: AI_HIDDEN1_NODES[4] },
  { from: AI_HIDDEN1_NODES[4], to: AI_HIDDEN2_NODES[3] },
  { from: AI_HIDDEN2_NODES[3], to: AI_OUTPUT_NODES[1] },
];

/**
 * Each table row becomes a loose node, and pairs of nodes converge on one
 * input node — the "patterns" beat. Row i lands on input node i / 2.
 */
export const clusterTargetFor = (rowIndex: number): Point =>
  AI_INPUT_NODES[Math.floor(rowIndex / 2) % AI_INPUT_NODES.length];
