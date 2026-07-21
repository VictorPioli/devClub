import { RACK, RACK_BLADE, RACK_BLADE_COUNT } from "../../sections/Frontend/layout";
import type { StageBuilder } from "./types";

/**
 * BACKEND (t 0.72 -> 1.30): the machine room assembles, then a single
 * request is followed all the way through it — in at the gateway, worked
 * on by the rack, written to the database, answered back to the caller.
 * The story is told by the hardware moving, not by captions.
 */
export const buildBackendStage: StageBuilder = (tl, refs) => {
  const b = refs.backend;
  const bladeTop = RACK.y + RACK_BLADE.top;
  const bladeSpan = RACK_BLADE_COUNT * (RACK_BLADE.height + RACK_BLADE.gap);

  // --- the room powers up -------------------------------------------
  tl.fromTo(refs.dust, { opacity: 0, scale: 0.5 }, { opacity: 0.28, scale: 1, duration: 0.1, stagger: 0.008 }, 0.72)
    .fromTo(
      b.rackBackGroup,
      { opacity: 0, y: 40, scale: 0.9, transformOrigin: "center bottom" },
      { opacity: 0.55, y: 0, scale: 1, duration: 0.12 },
      0.74
    )
    .fromTo(
      b.rackGroup,
      { opacity: 0, y: 54, scale: 0.92, transformOrigin: "center bottom" },
      { opacity: 1, y: 0, scale: 1, duration: 0.14, ease: "back.out(1.1)" },
      0.76
    )
    .fromTo(
      b.blades,
      { opacity: 0, x: -26 },
      { opacity: 1, x: 0, duration: 0.1, stagger: 0.022 },
      0.8
    )
    .fromTo(b.labelRack, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.06 }, 0.9);

  // --- the front door and the wiring ---------------------------------
  tl.fromTo(
    b.gatewayGroup,
    { opacity: 0, scale: 0.5, transformOrigin: "center" },
    { opacity: 1, scale: 1, duration: 0.09, ease: "back.out(1.4)" },
    0.86
  )
    .fromTo(b.labelApi, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.93)
    .fromTo(b.cables[1], { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 0.07 }, 0.9)
    .fromTo(b.cables[3], { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 0.06 }, 0.92)
    .fromTo(
      b.dbGroup,
      { opacity: 0, scale: 0.6, transformOrigin: "center" },
      { opacity: 1, scale: 1, duration: 0.09, ease: "back.out(1.3)" },
      0.94
    )
    .fromTo(b.cables[2], { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 0.07 }, 0.96)
    .fromTo(b.dbRows, { opacity: 0 }, { opacity: 1, duration: 0.05, stagger: 0.015 }, 1.0)
    .fromTo(b.labelDb, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.05 }, 1.0)
    .fromTo(
      b.clientGroup,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.08 },
      0.98
    )
    .fromTo(b.cables[0], { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 0.06 }, 1.0);

  // --- REQUISIÇÃO: a packet leaves the caller and reaches the rack ----
  tl.fromTo(b.labelRequest, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.04 }, 1.04)
    .fromTo(b.requestPacket, { opacity: 0 }, { opacity: 1, duration: 0.02 }, 1.06);

  if (b.requestPacket && b.cables[0] && b.cables[1]) {
    tl.to(
      b.requestPacket,
      {
        motionPath: { path: b.cables[0], align: b.cables[0], alignOrigin: [0.5, 0.5] },
        duration: 0.07,
        ease: "none",
      },
      1.06
    ).to(
      b.requestPacket,
      {
        motionPath: { path: b.cables[1], align: b.cables[1], alignOrigin: [0.5, 0.5] },
        duration: 0.06,
        ease: "none",
      },
      1.13
    );
  }
  // The gateway acknowledges it on the way through
  tl.to(b.gatewayGroup, { scale: 1.12, duration: 0.03, yoyo: true, repeat: 1, transformOrigin: "center" }, 1.12)
    .to(b.requestPacket, { opacity: 0, duration: 0.02 }, 1.19)
    .to(b.labelRequest, { opacity: 0, duration: 0.03 }, 1.18);

  // --- PROCESSANDO: the sweep runs down the blades --------------------
  tl.fromTo(b.labelProcessing, { opacity: 0 }, { opacity: 1, duration: 0.03 }, 1.19)
    .fromTo(
      b.scanline,
      { opacity: 0, attr: { y: bladeTop - 8 } },
      { opacity: 0.32, duration: 0.02 },
      1.19
    )
    .to(b.scanline, { attr: { y: bladeTop + bladeSpan - 18 }, duration: 0.09, ease: "none" }, 1.21)
    .to(b.scanline, { opacity: 0, duration: 0.02 }, 1.3)
    .to(b.blades, { x: 4, duration: 0.03, yoyo: true, repeat: 1, stagger: 0.012 }, 1.21);

  // --- the rack writes to the database --------------------------------
  if (b.dbPacket && b.cables[2]) {
    tl.fromTo(b.dbPacket, { opacity: 0 }, { opacity: 1, duration: 0.02 }, 1.22).to(
      b.dbPacket,
      {
        motionPath: { path: b.cables[2], align: b.cables[2], alignOrigin: [0.5, 0.5] },
        duration: 0.08,
        ease: "none",
      },
      1.22
    );
  }
  tl.to(b.dbPacket, { opacity: 0, duration: 0.02 }, 1.3)
    .to(b.dbGroup, { scale: 1.08, duration: 0.03, yoyo: true, repeat: 1, transformOrigin: "center" }, 1.3);

  // --- RESPOSTA: the answer travels back out to the caller -------------
  tl.to(b.labelProcessing, { opacity: 0, duration: 0.03 }, 1.32)
    .fromTo(b.responsePacket, { opacity: 0 }, { opacity: 1, duration: 0.02 }, 1.32);

  if (b.responsePacket && b.cables[0] && b.cables[1]) {
    tl.to(
      b.responsePacket,
      {
        motionPath: { path: b.cables[1], align: b.cables[1], alignOrigin: [0.5, 0.5], start: 1, end: 0 },
        duration: 0.06,
        ease: "none",
      },
      1.32
    ).to(
      b.responsePacket,
      {
        motionPath: { path: b.cables[0], align: b.cables[0], alignOrigin: [0.5, 0.5], start: 1, end: 0 },
        duration: 0.07,
        ease: "none",
      },
      1.38
    );
  }
  tl.fromTo(b.labelResponse, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.04 }, 1.4)
    .to(b.responsePacket, { opacity: 0, duration: 0.02 }, 1.45)
    .to(b.clientGroup, { scale: 1.06, duration: 0.04, yoyo: true, repeat: 1, transformOrigin: "center" }, 1.45);
};
