import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SIGNAL_LANES } from "../sections/Frontend/layout";
import { buildAIStage } from "./frontend/aiStage";
import { buildBackendStage } from "./frontend/backendStage";
import { buildDataStage } from "./frontend/dataStage";
import { buildMobileStage } from "./frontend/mobileStage";
import type { FrontendRefs } from "./frontend/types";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export type { FrontendRefs, MockupRefs, TextRefs } from "./frontend/types";

export interface DriftTarget {
  x: number;
  y: number;
  scale: number;
}

const EASE = "expo.out" as const;

/**
 * One continuous, fully reversible scroll sequence, pinned once.
 *
 * The interface builds (FRONTEND), loosens and lets the camera push
 * through it into the machine room behind it (BACKEND) — a rack, an API
 * gateway, a database, and one request followed all the way through.
 * That same gateway then gives birth to an app which becomes a phone
 * (MOBILE); tapping the phone's button produces a record that travels
 * back through the API and the rack into the database, which comes
 * forward and fills a table (DATA); those rows then detach, group into
 * patterns and become the input layer of a working model (GESTAO DE IA).
 *
 * Every stage reuses real elements from the stage before it. Scrubbed
 * directly by scroll position throughout, so scrolling back up plays
 * every stage in reverse.
 */
export function runFrontendAnimations(
  refs: FrontendRefs,
  dissolveDrift: DriftTarget[],
  reduced: boolean
) {
  const ctx = gsap.context(() => {
    const idleTweens: gsap.core.Animation[] = [];
    const m = refs.mockup;
    const t = refs.text;
    const drawnLines = [m.frame, m.topBarLine].filter(
      (el): el is SVGRectElement | SVGLineElement => el !== null
    );

    if (reduced) {
      // Land on the end of the story, static: the model, assembled.
      gsap.set(drawnLines, { strokeDashoffset: 0 });
      gsap.set(m.mockupGroup, { opacity: 0 });
      gsap.set(m.flash, { opacity: 0 });
      gsap.set(m.dissolveParticles, { opacity: 0 });
      gsap.set(refs.dust, { opacity: 0.12 });
      gsap.set(
        [
          t.eyebrowFrontend, t.eyebrowBackend, t.eyebrowMobile, t.eyebrowData,
          t.headlineFrontend, t.headlineBackend, t.headlineMobile, t.headlineData,
          t.sublineA, t.sublineB, t.sublineC,
          t.taglineAdapt, t.taglineMobile, t.taglineInteraction, t.taglineData, t.taglinePatterns,
        ],
        { opacity: 0 }
      );
      gsap.set([t.eyebrowAI, t.headlineAI, t.taglineAI], { opacity: 1 });

      const backendAll = [
        refs.backend.group,
        refs.mobile.group,
        refs.data.group,
      ];
      gsap.set(backendAll, { opacity: 0 });

      gsap.set(refs.ai.group, { opacity: 1 });
      gsap.set(
        [
          ...refs.ai.inputNodes,
          ...refs.ai.hidden1Nodes,
          ...refs.ai.hidden2Nodes,
          ...refs.ai.outputNodes,
        ],
        { opacity: 1 }
      );
      gsap.set([...refs.ai.edgesA, ...refs.ai.edgesB, ...refs.ai.edgesC], {
        opacity: 0.35,
        strokeDashoffset: 0,
      });
      gsap.set(refs.ai.clusterHalos, { opacity: 0.2 });
      gsap.set(refs.ai.glow, { opacity: 0.07 });
      gsap.set(refs.ai.resultCard, { opacity: 1 });
      gsap.set(refs.ai.resultCheck, { strokeDashoffset: 0 });
      gsap.set([refs.ai.labelData, refs.ai.labelModel, refs.ai.labelResult], { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: {
        trigger: refs.root,
        start: "top top",
        end: () => `+=${window.innerHeight * 7.0}`,
        scrub: 0.7,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onLeaveBack: () => idleTweens.forEach((tw) => tw.pause()),
        onEnterBack: () => idleTweens.forEach((tw) => tw.resume()),
      },
    });

    // === FRONTEND: the interface builds ================================
    tl.fromTo(t.eyebrowFrontend, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.09 }, 0)
      .fromTo(t.headlineFrontend, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.1 }, 0)
      .fromTo(t.sublineA, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.1 }, 0.02)
      .fromTo(m.dotField, { opacity: 0 }, { opacity: 0.4, duration: 0.14 }, 0);

    tl.fromTo(
      m.frame,
      { opacity: 0, strokeDashoffset: 100 },
      { opacity: 1, strokeDashoffset: 0, duration: 0.1 },
      0.08
    )
      .fromTo(m.topBarLine, { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 0.06 }, 0.15)
      .fromTo(m.headerItems, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.07, stagger: 0.015 }, 0.17);

    tl.fromTo(
      m.titleLine1,
      { opacity: 0, scaleX: 0, transformOrigin: "left center" },
      { opacity: 1, scaleX: 1, duration: 0.08 },
      0.24
    )
      .fromTo(
        m.titleLine2,
        { opacity: 0, scaleX: 0, transformOrigin: "left center" },
        { opacity: 1, scaleX: 1, duration: 0.07 },
        0.28
      )
      .fromTo(m.subtitleLine, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.32)
      .fromTo(
        m.ctaPill,
        { opacity: 0, scale: 0.8, transformOrigin: "center" },
        { opacity: 1, scale: 1, duration: 0.07, ease: "back.out(1.5)" },
        0.35
      )
      .fromTo(m.ctaLabel, { opacity: 0 }, { opacity: 1, duration: 0.04 }, 0.39)
      .fromTo(m.frameGlow, { opacity: 0 }, { opacity: 0.5, duration: 0.05 }, 0.4);

    // === THE CROSSING: it loosens, the camera pushes through ===========
    tl.fromTo(
      m.dissolveParticles,
      { opacity: 0, scale: 0.4, x: 0, y: 0 },
      { opacity: 0.85, scale: 1, duration: 0.08, stagger: 0.008 },
      0.44
    );

    tl.fromTo(t.sublineA, { opacity: 1, y: 0 }, { opacity: 0, y: -10, duration: 0.06 }, 0.46)
      .fromTo(t.sublineB, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.06 }, 0.49);

    tl.fromTo(
      m.mockupGroup,
      { scale: 1, opacity: 1 },
      { scale: 6.5, opacity: 0, duration: 0.18, ease: "power2.in", transformOrigin: "center" },
      0.5
    )
      .to(
        m.dissolveParticles,
        {
          x: (i: number) => dissolveDrift[i]?.x ?? 0,
          y: (i: number) => dissolveDrift[i]?.y ?? 0,
          scale: (i: number) => dissolveDrift[i]?.scale ?? 2,
          opacity: 0,
          duration: 0.17,
          stagger: 0.007,
          ease: "power1.in",
        },
        0.5
      )
      .fromTo(m.flash, { opacity: 0 }, { opacity: 0.4, duration: 0.05 }, 0.6)
      .to(m.flash, { opacity: 0, duration: 0.08 }, 0.65);

    tl.fromTo(t.eyebrowFrontend, { opacity: 1 }, { opacity: 0, duration: 0.05 }, 0.58)
      .fromTo(t.eyebrowBackend, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.61)
      .fromTo(
        t.headlineFrontend,
        { opacity: 1, filter: "blur(0px)" },
        { opacity: 0, filter: "blur(6px)", duration: 0.07 },
        0.58
      )
      .fromTo(
        t.headlineBackend,
        { opacity: 0, filter: "blur(6px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.08 },
        0.63
      )
      .fromTo(t.sublineB, { opacity: 1, y: 0 }, { opacity: 0, y: -10, duration: 0.05 }, 0.68)
      .fromTo(t.sublineC, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.06 }, 0.71);

    // === The rest of the story, one stage per module ===================
    buildBackendStage(tl, refs);
    buildMobileStage(tl, refs);
    buildDataStage(tl, refs);
    buildAIStage(tl, refs);

    // === Ambient life, independent of scroll ===========================

    // Rack LEDs: the machines look busy even while the scroll is still.
    // Only the LEDs themselves are touched here — their blades are what
    // the timeline animates, so the two never fight over a property.
    const leds = refs.backend.leds.filter((el): el is SVGCircleElement => el !== null);
    if (leds.length) {
      idleTweens.push(
        gsap.to(leds, {
          opacity: 0.35,
          duration: 0.5,
          ease: "sine.inOut",
          stagger: { each: 0.09, repeat: -1, yoyo: true },
        })
      );
    }

    // Loading dots keep breathing while the request is in flight.
    idleTweens.push(
      gsap.to(refs.mobile.loaderDots.filter(Boolean), {
        opacity: 0.35,
        duration: 0.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.12,
      })
    );

    // Signals travelling the network's edges: the model is processing.
    // These only ever move on their own — the timeline just reveals them.
    refs.ai.signals.forEach((signal, i) => {
      const lane = SIGNAL_LANES[i];
      if (!signal || !lane) return;
      idleTweens.push(
        gsap.fromTo(
          signal,
          { x: 0, y: 0 },
          {
            x: lane.to.x - lane.from.x,
            y: lane.to.y - lane.from.y,
            duration: 1.1,
            repeat: -1,
            delay: (i % 3) * 0.36,
            ease: "power1.inOut",
          }
        )
      );
    });

    // A soft breathing pulse, cascading layer by layer so the network
    // reads as actively processing. Fill opacity is used rather than the
    // radius or a transform: it neither collides with the scrubbed
    // scale-in nor forces the glow filters to be recomputed each frame.
    const pulse = (nodes: (SVGCircleElement | null)[], offset: number) => {
      const els = nodes.filter((el): el is SVGCircleElement => el !== null);
      if (!els.length) return;
      idleTweens.push(
        gsap.to(els, {
          fillOpacity: 0.45,
          duration: 0.7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: offset,
          stagger: 0.06,
        })
      );
    };
    pulse(refs.ai.inputNodes, 0);
    pulse(refs.ai.hidden1Nodes, 0.24);
    pulse(refs.ai.hidden2Nodes, 0.48);
    pulse(refs.ai.outputNodes, 0.72);

    // Pin distance is measured from document layout, which can still be
    // settling (web fonts swapping in, the hero's WebGL canvas coming
    // online) after this effect fires and after `load` has already
    // passed — leaving the pin-spacer permanently undersized with no
    // later event to correct it. Force a couple of safety-net refreshes.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts) {
      document.fonts.ready.then(refresh);
    }
    if (document.readyState === "complete") {
      requestAnimationFrame(refresh);
    } else {
      window.addEventListener("load", refresh, { once: true });
    }
  }, refs.root);

  return () => ctx.revert();
}
