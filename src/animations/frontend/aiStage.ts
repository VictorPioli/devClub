import { clusterTargetFor } from "../../sections/Frontend/layout";
import type { StageBuilder } from "./types";

/**
 * DATA -> GESTAO DE IA (t 3.34 -> 3.62) and GESTAO DE IA (t 3.56 -> 4.20).
 *
 * The model is not summoned out of nowhere: the stored rows detach from
 * the table, collapse into single nodes, group in pairs into four
 * patterns, and those patterns *are* the network's input layer. From
 * there the hidden layers and the output are drawn, and the model ends
 * up producing something concrete.
 */
export const buildAIStage: StageBuilder = (tl, refs) => {
  const d = refs.data;
  const a = refs.ai;
  const t = refs.text;

  // --- rows leave the table as single nodes ---------------------------
  tl.fromTo(
    d.rowNodes,
    { opacity: 0, scale: 0.4, transformOrigin: "center" },
    { opacity: 1, scale: 1, duration: 0.06, stagger: 0.012 },
    3.34
  )
    .to(d.rows, { opacity: 0.12, duration: 0.08, stagger: 0.008 }, 3.36)
    .to([d.newestRowGlow, d.headerRow, d.headerDivider], { opacity: 0, duration: 0.06 }, 3.4)
    .to([d.panel, d.jsonCard, d.labelTable, d.counter, d.labelDb, d.feedLine], { opacity: 0, duration: 0.1 }, 3.42)
    .to(refs.backend.dbGroup, { opacity: 0.14, scale: 1.6, duration: 0.14, ease: "power2.in", transformOrigin: "center" }, 3.42)
    .to(d.rows, { opacity: 0, duration: 0.06 }, 3.5)
    .to(refs.backend.dbGroup, { opacity: 0, duration: 0.08 }, 3.56);

  tl.fromTo(t.taglineData, { opacity: 1, y: 0 }, { opacity: 0, y: -10, duration: 0.05 }, 3.38)
    .fromTo(t.taglinePatterns, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.06 }, 3.42);

  // --- pairs of rows converge into four patterns ----------------------
  d.rowNodes.forEach((node, i) => {
    const target = clusterTargetFor(i);
    tl.to(
      node,
      { attr: { cx: target.x, cy: target.y }, duration: 0.16, ease: "power2.inOut" },
      3.44 + (i % 2) * 0.02
    );
  });

  tl.fromTo(a.group, { opacity: 0 }, { opacity: 1, duration: 0.04 }, 3.5)
    .fromTo(
      a.clusterHalos,
      { opacity: 0, scale: 1.8, transformOrigin: "center" },
      { opacity: 1, scale: 1, duration: 0.1, stagger: 0.03 },
      3.56
    )
    .fromTo(a.glow, { opacity: 0 }, { opacity: 0.07, duration: 0.12 }, 3.58);

  tl.fromTo(t.eyebrowData, { opacity: 1 }, { opacity: 0, duration: 0.06 }, 3.52)
    .fromTo(t.eyebrowAI, { opacity: 0 }, { opacity: 1, duration: 0.06 }, 3.56)
    .fromTo(t.headlineData, { opacity: 1, filter: "blur(0px)" }, { opacity: 0, filter: "blur(6px)", duration: 0.07 }, 3.52)
    .fromTo(t.headlineAI, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.09 }, 3.57);

  // --- the patterns become the input layer ----------------------------
  tl.fromTo(
    a.inputNodes,
    { opacity: 0, scale: 0.4, transformOrigin: "center" },
    { opacity: 1, scale: 1, duration: 0.08, stagger: 0.025, ease: "back.out(1.5)" },
    3.62
  )
    .to(d.rowNodes, { opacity: 0, duration: 0.06 }, 3.64)
    .fromTo(a.labelData, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.05 }, 3.66);

  // --- the model is drawn, layer by layer -----------------------------
  tl.fromTo(
    a.edgesA,
    { opacity: 0, strokeDashoffset: 100 },
    { opacity: 0.38, strokeDashoffset: 0, duration: 0.12, stagger: 0.005 },
    3.7
  )
    .fromTo(
      a.hidden1Nodes,
      { opacity: 0, scale: 0.4, transformOrigin: "center" },
      { opacity: 1, scale: 1, duration: 0.08, stagger: 0.02, ease: "back.out(1.4)" },
      3.78
    )
    .fromTo(
      a.edgesB,
      { opacity: 0, strokeDashoffset: 100 },
      { opacity: 0.32, strokeDashoffset: 0, duration: 0.12, stagger: 0.004 },
      3.86
    )
    .fromTo(
      a.hidden2Nodes,
      { opacity: 0, scale: 0.4, transformOrigin: "center" },
      { opacity: 1, scale: 1, duration: 0.08, stagger: 0.02, ease: "back.out(1.4)" },
      3.94
    )
    .fromTo(a.labelModel, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.05 }, 3.96)
    .fromTo(
      a.edgesC,
      { opacity: 0, strokeDashoffset: 100 },
      { opacity: 0.38, strokeDashoffset: 0, duration: 0.1, stagger: 0.006 },
      4.02
    )
    .fromTo(
      a.outputNodes,
      { opacity: 0, scale: 0.4, transformOrigin: "center" },
      { opacity: 1, scale: 1, duration: 0.1, stagger: 0.04, ease: "back.out(1.6)" },
      4.1
    );

  // Halos have done their job once the layer exists.
  tl.to(a.clusterHalos, { opacity: 0.25, duration: 0.08 }, 3.9);

  // --- and it produces something --------------------------------------
  tl.fromTo(a.signals, { opacity: 0 }, { opacity: 0.9, duration: 0.06 }, 4.06)
    .fromTo(
      a.resultCard,
      { opacity: 0, x: 26, scale: 0.94, transformOrigin: "center" },
      { opacity: 1, x: 0, scale: 1, duration: 0.1, ease: "back.out(1.3)" },
      4.16
    )
    .fromTo(a.resultCheck, { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 0.07 }, 4.22)
    .fromTo(a.labelResult, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.05 }, 4.22);

  tl.fromTo(t.taglinePatterns, { opacity: 1, y: 0 }, { opacity: 0, y: -10, duration: 0.05 }, 4.1)
    .fromTo(t.taglineAI, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.06 }, 4.16);

  // A beat of held stillness at the end, so the finished model is on
  // screen for a moment before the section releases the scroll.
  tl.to({}, { duration: 0.28 }, 4.29);
};
