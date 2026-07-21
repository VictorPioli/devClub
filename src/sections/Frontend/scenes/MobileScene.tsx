import {
  APP,
  APP_CARD_YS,
  APP_NEW_CARD_Y,
  DEVICE_SEED,
  LABEL_STYLE,
  PHONE,
  SCREEN,
  TAP_POINT,
  VALUE_STYLE,
} from "../layout";
import type { MobileSceneRefs } from "./sceneRefs";

const CARD_X = APP.contentLeft;
const CARD_W = APP.contentWidth;

function ListCard({ y, accent }: { y: number; accent: string }) {
  return (
    <>
      <rect
        x={CARD_X} y={y} width={CARD_W} height={APP.cardHeight} rx={9}
        fill="var(--surface)" stroke="var(--line-strong)" strokeWidth={1}
      />
      <circle cx={CARD_X + 20} cy={y + APP.cardHeight / 2} r={10} fill={accent} opacity={0.9} />
      <rect x={CARD_X + 38} y={y + 12} width={84} height={6} rx={3} fill="var(--ink)" />
      <rect x={CARD_X + 38} y={y + 24} width={54} height={5} rx={2.5} fill="var(--ink-faint)" />
    </>
  );
}

/**
 * A phone anyone recognizes, running an app anyone recognizes: status
 * bar, header, search field, a list of cards, a primary button and a tab
 * bar. The tap on the primary button is what produces the record that
 * the DATA stage then stores.
 */
export function MobileScene({ refs }: { refs: MobileSceneRefs }) {
  // Indices are claimed at render time, not inside the callback, so React
  // calling a ref with null-then-element can never shift the slots.
  let ui = 0;
  const nextUi = () => {
    const i = ui++;
    return (el: SVGElement | null) => { refs.ui[i] = el; };
  };
  let chrome = 0;
  const nextChrome = () => {
    const i = chrome++;
    return (el: SVGElement | null) => { refs.chrome[i] = el; };
  };

  return (
    <g ref={(el) => { refs.group = el; }}>
      {/* Body — starts as a seed at the API gateway and morphs into a phone */}
      <rect
        ref={(el) => { refs.deviceFrame = el; }}
        x={DEVICE_SEED.x} y={DEVICE_SEED.y} width={DEVICE_SEED.width} height={DEVICE_SEED.height} rx={DEVICE_SEED.rx}
        fill="var(--void-raised)" stroke="url(#fe-neonPurple)" strokeWidth={2.4} opacity={0}
      />
      <rect
        ref={(el) => { refs.screen = el; }}
        x={SCREEN.x} y={SCREEN.y} width={SCREEN.width} height={SCREEN.height} rx={SCREEN.rx}
        fill="var(--void)" stroke="rgba(155,44,255,0.25)" strokeWidth={1} opacity={0}
      />

      {/* Phone chrome — notch, speaker, side buttons, home indicator */}
      <g ref={nextChrome()} opacity={0}>
        <rect x={PHONE.x + 78} y={PHONE.y + 14} width={64} height={13} rx={6.5} fill="var(--void)" stroke="var(--line-strong)" strokeWidth={1} />
        <circle cx={PHONE.x + 130} cy={PHONE.y + 20.5} r={2.6} fill="var(--ink-faint)" />
        <rect x={PHONE.x + 88} y={PHONE.y + 18.5} width={26} height={4} rx={2} fill="var(--line-strong)" />
      </g>
      <rect ref={nextChrome()} x={PHONE.x - 4} y={PHONE.y + 116} width={4} height={30} rx={2} fill="var(--line-strong)" opacity={0} />
      <rect ref={nextChrome()} x={PHONE.x - 4} y={PHONE.y + 154} width={4} height={30} rx={2} fill="var(--line-strong)" opacity={0} />
      <rect ref={nextChrome()} x={PHONE.x + PHONE.width} y={PHONE.y + 128} width={4} height={46} rx={2} fill="var(--line-strong)" opacity={0} />
      <rect ref={nextChrome()} x={425} y={APP.homeY} width={50} height={4} rx={2} fill="var(--ink-faint)" opacity={0} />

      {/* Status bar */}
      <g ref={nextUi()} opacity={0}>
        <text x={APP.contentLeft + 4} y={APP.statusY} fontSize={10} fill="var(--ink-dim)" style={VALUE_STYLE}>
          19:42
        </text>
        <g transform={`translate(${APP.contentLeft + 118}, ${APP.statusY - 8})`}>
          <rect x={0} y={5} width={3} height={4} fill="var(--ink-faint)" />
          <rect x={5} y={2} width={3} height={7} fill="var(--ink-faint)" />
          <rect x={10} y={-1} width={3} height={10} fill="var(--ink-faint)" />
        </g>
        <g transform={`translate(${APP.contentLeft + 146}, ${APP.statusY - 8})`}>
          <rect x={0} y={0} width={18} height={9} rx={2.5} fill="none" stroke="var(--ink-faint)" strokeWidth={1} />
          <rect x={18.5} y={2.5} width={2} height={4} fill="var(--ink-faint)" />
          <rect x={2} y={2} width={11} height={5} rx={1} fill="url(#fe-neonGreen)" />
        </g>
      </g>

      {/* App header */}
      <g ref={nextUi()} opacity={0}>
        <text x={APP.contentLeft} y={APP.headerY} fontSize={14} fill="var(--ink)" style={LABEL_STYLE}>
          Meu app
        </text>
        <circle cx={APP.contentLeft + APP.contentWidth - 12} cy={APP.headerY - 5} r={11} fill="var(--surface-hi)" stroke="var(--line-strong)" strokeWidth={1} />
        <circle cx={APP.contentLeft + APP.contentWidth - 12} cy={APP.headerY - 9} r={4} fill="var(--ink-faint)" />
        <path
          d={`M ${APP.contentLeft + APP.contentWidth - 20} ${APP.headerY + 4} a 8 7 0 0 1 16 0`}
          fill="var(--ink-faint)"
        />
      </g>

      {/* Search field */}
      <g ref={nextUi()} opacity={0}>
        <rect
          x={APP.contentLeft} y={APP.searchY} width={APP.contentWidth} height={26} rx={13}
          fill="var(--surface)" stroke="var(--line-strong)" strokeWidth={1}
        />
        <circle cx={APP.contentLeft + 16} cy={APP.searchY + 13} r={4.5} fill="none" stroke="var(--ink-faint)" strokeWidth={1.4} />
        <line
          x1={APP.contentLeft + 19.5} y1={APP.searchY + 16.5} x2={APP.contentLeft + 23} y2={APP.searchY + 20}
          stroke="var(--ink-faint)" strokeWidth={1.4} strokeLinecap="round"
        />
        <rect x={APP.contentLeft + 30} y={APP.searchY + 10} width={58} height={6} rx={3} fill="var(--ink-faint)" />
      </g>

      {/* Content list */}
      <g ref={nextUi()} opacity={0}>
        <ListCard y={APP_CARD_YS[0]} accent="url(#fe-neonPurple)" />
      </g>
      <g ref={nextUi()} opacity={0}>
        <ListCard y={APP_CARD_YS[1]} accent="url(#fe-neonGreen)" />
      </g>

      {/* The row that appears as a result of the tap */}
      <g ref={(el) => { refs.newCard = el; }} opacity={0}>
        <ListCard y={APP_NEW_CARD_Y} accent="url(#fe-neonGreen)" />
        <rect
          x={CARD_X} y={APP_NEW_CARD_Y} width={CARD_W} height={APP.cardHeight} rx={9}
          fill="none" stroke="url(#fe-neonGreen)" strokeWidth={1.4}
        />
      </g>

      {/* Primary action — what the user taps */}
      <rect
        ref={(el) => { refs.ctaButton = el; }}
        x={APP.contentLeft} y={APP.ctaY} width={APP.contentWidth} height={APP.ctaHeight} rx={APP.ctaHeight / 2}
        fill="url(#fe-neonGreen)" opacity={0}
      />
      <text
        ref={(el) => { refs.ctaLabel = el; }}
        x={450} y={APP.ctaY + APP.ctaHeight / 2 + 4} textAnchor="middle" fontSize={12}
        fill="var(--void)" style={LABEL_STYLE} opacity={0}
      >
        Enviar
      </text>

      {/* Loading state after the tap */}
      <g ref={(el) => { refs.loader = el; }} opacity={0}>
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            ref={(el) => { refs.loaderDots[i] = el; }}
            cx={434 + i * 16} cy={APP.ctaY + APP.ctaHeight + 22} r={3.4} fill="var(--ink-dim)"
          />
        ))}
      </g>

      {/* Tab bar */}
      <g ref={nextUi()} opacity={0}>
        <line x1={APP.contentLeft} y1={APP.tabLineY} x2={APP.contentLeft + APP.contentWidth} y2={APP.tabLineY} stroke="var(--line-strong)" strokeWidth={1} />
        <rect x={396} y={APP.tabIconY - 8} width={15} height={15} rx={3} fill="none" stroke="var(--ink-faint)" strokeWidth={1.4} />
        <circle cx={450} cy={APP.tabIconY} r={8} fill="url(#fe-neonGreen)" />
        <circle cx={504} cy={APP.tabIconY - 3} r={4.5} fill="none" stroke="var(--ink-faint)" strokeWidth={1.4} />
        <path d="M 496 468 a 8 7 0 0 1 16 0" fill="none" stroke="var(--ink-faint)" strokeWidth={1.4} />
      </g>

      {/* The touch itself */}
      <circle
        ref={(el) => { refs.tapRing = el; }}
        cx={TAP_POINT.x} cy={TAP_POINT.y} r={26}
        fill="none" stroke="var(--ink)" strokeWidth={1.6} opacity={0}
      />
      <circle
        ref={(el) => { refs.tapDot = el; }}
        cx={TAP_POINT.x} cy={TAP_POINT.y} r={13}
        fill="var(--ink)" opacity={0}
      />
      {[0, 1].map((i) => (
        <circle
          key={i}
          ref={(el) => { refs.ripples[i] = el; }}
          cx={TAP_POINT.x} cy={TAP_POINT.y} r={22}
          fill="none" stroke="url(#fe-neonGreen)" strokeWidth={1.6} opacity={0}
        />
      ))}

      <text
        ref={(el) => { refs.label = el; }} data-label
        x={450} y={PHONE.y + PHONE.height + 30} textAnchor="middle" fontSize={11}
        fill="var(--ink-dim)" style={LABEL_STYLE} opacity={0}
      >
        Aplicativo
      </text>
    </g>
  );
}
