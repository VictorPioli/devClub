import type {
  AISceneRefs,
  BackendSceneRefs,
  DataSceneRefs,
  MobileSceneRefs,
} from "../../sections/Frontend/scenes/sceneRefs";

/** The five text states that crossfade in the same three slots. */
export interface TextRefs {
  eyebrowFrontend: HTMLElement | null;
  eyebrowBackend: HTMLElement | null;
  eyebrowMobile: HTMLElement | null;
  eyebrowData: HTMLElement | null;
  eyebrowAI: HTMLElement | null;
  headlineFrontend: HTMLElement | null;
  headlineBackend: HTMLElement | null;
  headlineMobile: HTMLElement | null;
  headlineData: HTMLElement | null;
  headlineAI: HTMLElement | null;
  sublineA: HTMLElement | null;
  sublineB: HTMLElement | null;
  sublineC: HTMLElement | null;
  taglineAdapt: HTMLElement | null;
  taglineMobile: HTMLElement | null;
  taglineInteraction: HTMLElement | null;
  taglineData: HTMLElement | null;
  taglinePatterns: HTMLElement | null;
  taglineAI: HTMLElement | null;
}

/** The interface that gets built and then dissolved — FRONTEND only. */
export interface MockupRefs {
  mockupGroup: SVGGElement | null;
  dotField: SVGRectElement | null;
  frame: SVGRectElement | null;
  frameGlow: SVGRectElement | null;
  topBarLine: SVGLineElement | null;
  headerItems: (SVGRectElement | null)[];
  titleLine1: SVGRectElement | null;
  titleLine2: SVGRectElement | null;
  subtitleLine: SVGRectElement | null;
  ctaPill: SVGRectElement | null;
  ctaLabel: SVGRectElement | null;
  dissolveParticles: (SVGRectElement | null)[];
  flash: HTMLElement | null;
}

export interface FrontendRefs {
  root: HTMLElement;
  text: TextRefs;
  mockup: MockupRefs;
  /** Depth dust, shared by every stage after FRONTEND. */
  dust: (SVGCircleElement | null)[];
  backend: BackendSceneRefs;
  mobile: MobileSceneRefs;
  data: DataSceneRefs;
  ai: AISceneRefs;
}

/** Every stage builder appends to the one shared, scrubbed timeline. */
export type StageBuilder = (tl: gsap.core.Timeline, refs: FrontendRefs) => void;
