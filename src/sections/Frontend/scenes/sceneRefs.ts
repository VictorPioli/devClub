/**
 * The mutable ref bags each scene fills in as it renders and each stage
 * builder reads when the timeline is assembled. They live outside the
 * scene components so those files export components only.
 */

export interface BackendSceneRefs {
  group: SVGGElement | null;
  clientGroup: SVGGElement | null;
  gatewayGroup: SVGGElement | null;
  rackGroup: SVGGElement | null;
  rackBackGroup: SVGGElement | null;
  blades: (SVGGElement | null)[];
  leds: (SVGCircleElement | null)[];
  scanline: SVGRectElement | null;
  dbGroup: SVGGElement | null;
  dbRows: (SVGRectElement | null)[];
  cables: (SVGPathElement | null)[];
  requestPacket: SVGGElement | null;
  responsePacket: SVGGElement | null;
  dbPacket: SVGCircleElement | null;
  labelRequest: SVGTextElement | null;
  labelProcessing: SVGTextElement | null;
  labelResponse: SVGTextElement | null;
  labelApi: SVGGElement | null;
  labelRack: SVGTextElement | null;
  labelDb: SVGTextElement | null;
}

export const createBackendSceneRefs = (): BackendSceneRefs => ({
  group: null,
  clientGroup: null,
  gatewayGroup: null,
  rackGroup: null,
  rackBackGroup: null,
  blades: [],
  leds: [],
  scanline: null,
  dbGroup: null,
  dbRows: [],
  cables: [],
  requestPacket: null,
  responsePacket: null,
  dbPacket: null,
  labelRequest: null,
  labelProcessing: null,
  labelResponse: null,
  labelApi: null,
  labelRack: null,
  labelDb: null,
});

export interface MobileSceneRefs {
  group: SVGGElement | null;
  /** The morphing rect: seed at the gateway -> window -> phone body. */
  deviceFrame: SVGRectElement | null;
  screen: SVGRectElement | null;
  chrome: (SVGElement | null)[];
  ui: (SVGElement | null)[];
  ctaButton: SVGRectElement | null;
  ctaLabel: SVGTextElement | null;
  loader: SVGGElement | null;
  loaderDots: (SVGCircleElement | null)[];
  newCard: SVGGElement | null;
  tapRing: SVGCircleElement | null;
  tapDot: SVGCircleElement | null;
  ripples: (SVGCircleElement | null)[];
  label: SVGTextElement | null;
}

export const createMobileSceneRefs = (): MobileSceneRefs => ({
  group: null,
  deviceFrame: null,
  screen: null,
  chrome: [],
  ui: [],
  ctaButton: null,
  ctaLabel: null,
  loader: null,
  loaderDots: [],
  newCard: null,
  tapRing: null,
  tapDot: null,
  ripples: [],
  label: null,
});

export interface DataSceneRefs {
  group: SVGGElement | null;
  panel: SVGRectElement | null;
  headerRow: SVGGElement | null;
  headerDivider: SVGLineElement | null;
  rows: (SVGGElement | null)[];
  /** Each row's compact form — what flies out to seed the network. */
  rowNodes: (SVGCircleElement | null)[];
  newestRowGlow: SVGRectElement | null;
  jsonCard: SVGGElement | null;
  counter: SVGTextElement | null;
  recordPacket: SVGGElement | null;
  labelDb: SVGTextElement | null;
  labelTable: SVGTextElement | null;
  feedLine: SVGPathElement | null;
}

export const createDataSceneRefs = (): DataSceneRefs => ({
  group: null,
  panel: null,
  headerRow: null,
  headerDivider: null,
  rows: [],
  rowNodes: [],
  newestRowGlow: null,
  jsonCard: null,
  counter: null,
  recordPacket: null,
  labelDb: null,
  labelTable: null,
  feedLine: null,
});

export interface AISceneRefs {
  group: SVGGElement | null;
  clusterHalos: (SVGCircleElement | null)[];
  inputNodes: (SVGCircleElement | null)[];
  hidden1Nodes: (SVGCircleElement | null)[];
  hidden2Nodes: (SVGCircleElement | null)[];
  outputNodes: (SVGCircleElement | null)[];
  edgesA: (SVGLineElement | null)[];
  edgesB: (SVGLineElement | null)[];
  edgesC: (SVGLineElement | null)[];
  signals: (SVGCircleElement | null)[];
  resultCard: SVGGElement | null;
  resultCheck: SVGPathElement | null;
  labelData: SVGTextElement | null;
  labelModel: SVGTextElement | null;
  labelResult: SVGTextElement | null;
  glow: SVGEllipseElement | null;
}

export const createAISceneRefs = (): AISceneRefs => ({
  group: null,
  clusterHalos: [],
  inputNodes: [],
  hidden1Nodes: [],
  hidden2Nodes: [],
  outputNodes: [],
  edgesA: [],
  edgesB: [],
  edgesC: [],
  signals: [],
  resultCard: null,
  resultCheck: null,
  labelData: null,
  labelModel: null,
  labelResult: null,
  glow: null,
});
