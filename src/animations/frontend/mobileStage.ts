import { APP, BACKEND_RECEDE, DEVICE_WINDOW, PHONE } from "../../sections/Frontend/layout";
import type { StageBuilder } from "./types";

/**
 * BACKEND -> MOBILE (t 1.48 -> 1.82) and MOBILE (t 1.82 -> 2.30).
 *
 * The app is literally born at the API gateway: a seed grows into a wide
 * application window and then compresses into a vertical phone. The rack
 * never blinks out — it recedes and stays faintly visible, so the phone
 * reads as "the same system, now in the user's hand". Then a real app
 * loads, and a tap on its primary button starts the next stage.
 */
export const buildMobileStage: StageBuilder = (tl, refs) => {
  const b = refs.backend;
  const m = refs.mobile;
  const t = refs.text;

  const backendBody = [b.rackGroup, b.rackBackGroup, b.dbGroup, b.clientGroup, ...b.cables];
  const backendLabels = [b.labelRack, b.labelDb, b.labelApi, b.labelResponse, b.labelRequest];

  // --- the infrastructure steps back --------------------------------
  tl.to(backendLabels, { opacity: 0, duration: 0.05 }, 1.48)
    .to(refs.dust, { opacity: 0.12, duration: 0.1 }, 1.48)
    .to(
      backendBody,
      {
        opacity: BACKEND_RECEDE.opacity,
        scale: BACKEND_RECEDE.scale,
        x: BACKEND_RECEDE.x,
        y: BACKEND_RECEDE.y,
        duration: 0.16,
        stagger: 0.012,
        transformOrigin: "center",
        ease: "power2.inOut",
      },
      1.5
    );
  // The gateway stays brighter and in place: the app is about to come
  // out of it, and the tap will travel back into it later.
  tl.to(b.gatewayGroup, { opacity: 0.85, scale: 0.8, duration: 0.14, transformOrigin: "center" }, 1.5);

  tl.fromTo(t.sublineC, { opacity: 1, y: 0 }, { opacity: 0, y: -10, duration: 0.05 }, 1.5)
    .fromTo(t.taglineAdapt, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.06 }, 1.54);

  // --- seed -> application window -> phone ---------------------------
  tl.fromTo(
    m.deviceFrame,
    { opacity: 0 },
    {
      opacity: 1,
      attr: DEVICE_WINDOW,
      duration: 0.14,
      ease: "power2.out",
    },
    1.58
  ).to(
    m.deviceFrame,
    {
      attr: { x: PHONE.x, y: PHONE.y, width: PHONE.width, height: PHONE.height, rx: PHONE.rx },
      duration: 0.18,
      ease: "power2.inOut",
    },
    1.72
  );

  tl.fromTo(
    m.screen,
    { opacity: 0 },
    { opacity: 1, duration: 0.08 },
    1.84
  ).fromTo(
    m.chrome,
    { opacity: 0, scale: 0.9, transformOrigin: "center" },
    { opacity: 1, scale: 1, duration: 0.08, stagger: 0.02 },
    1.86
  );

  tl.fromTo(t.eyebrowBackend, { opacity: 1 }, { opacity: 0, duration: 0.06 }, 1.74)
    .fromTo(t.eyebrowMobile, { opacity: 0 }, { opacity: 1, duration: 0.06 }, 1.78)
    .fromTo(t.headlineBackend, { opacity: 1, filter: "blur(0px)" }, { opacity: 0, filter: "blur(6px)", duration: 0.08 }, 1.74)
    .fromTo(t.headlineMobile, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1 }, 1.79);

  // --- the app loads --------------------------------------------------
  tl.fromTo(
    m.ui,
    { opacity: 0, y: 14 },
    { opacity: 1, y: 0, duration: 0.09, stagger: 0.025 },
    1.92
  )
    .fromTo(
      m.ctaButton,
      { opacity: 0, scale: 0.85, transformOrigin: "center" },
      { opacity: 1, scale: 1, duration: 0.08, ease: "back.out(1.6)" },
      2.06
    )
    .fromTo(m.ctaLabel, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 2.1)
    .fromTo(m.label, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.05 }, 2.1);

  tl.fromTo(t.taglineAdapt, { opacity: 1, y: 0 }, { opacity: 0, y: -10, duration: 0.05 }, 2.0)
    .fromTo(t.taglineMobile, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.06 }, 2.04);

  // --- the tap ---------------------------------------------------------
  tl.fromTo(
    m.tapRing,
    { opacity: 0, y: -46, scale: 1.5, transformOrigin: "center" },
    { opacity: 0.9, y: 0, scale: 1, duration: 0.08, ease: "power2.out" },
    2.16
  )
    .fromTo(m.tapDot, { opacity: 0, scale: 0.4, transformOrigin: "center" }, { opacity: 0.9, scale: 1, duration: 0.04 }, 2.22)
    // the button takes the press
    .to(m.ctaButton, { attr: { height: APP.ctaHeight - 6, y: APP.ctaY + 3 }, duration: 0.03, yoyo: true, repeat: 1 }, 2.24)
    .to([m.tapDot, m.tapRing], { opacity: 0, duration: 0.05 }, 2.3);

  m.ripples.forEach((ripple, i) => {
    const at = 2.25 + i * 0.03;
    tl.fromTo(ripple, { opacity: 0, attr: { r: 22 } }, { opacity: 0.7, duration: 0.001 }, at)
      .to(ripple, { attr: { r: 86 }, opacity: 0, duration: 0.1, ease: "power1.out" }, at + 0.001);
  });

  // --- the action runs: loading, then a new row in the list ------------
  tl.fromTo(m.loader, { opacity: 0 }, { opacity: 1, duration: 0.03 }, 2.28);
  m.loaderDots.forEach((dot, i) => {
    tl.to(dot, { y: -7, duration: 0.035, yoyo: true, repeat: 1, ease: "sine.inOut" }, 2.3 + i * 0.025);
  });
  tl.to(m.loader, { opacity: 0, duration: 0.03 }, 2.4).fromTo(
    m.newCard,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.08, ease: "back.out(1.4)" },
    2.4
  );

  tl.fromTo(t.taglineMobile, { opacity: 1, y: 0 }, { opacity: 0, y: -10, duration: 0.05 }, 2.34)
    .fromTo(t.taglineInteraction, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.06 }, 2.38);
};
