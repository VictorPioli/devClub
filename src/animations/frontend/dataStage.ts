import { DATA_DB, DATA_DB_SHIFT, GATEWAY, PACKET_START } from "../../sections/Frontend/layout";
import type { StageBuilder } from "./types";

/** Where the receded rack sits after BACKEND_RECEDE has been applied. */
const RECEDED_RACK = { x: 532, y: 282 };

/**
 * MOBILE -> DATA (t 2.48 -> 2.82) and DATA (t 2.78 -> 3.20).
 *
 * The tap is followed literally: the app turns it into a record, the
 * record leaves the phone, passes through the API, is processed by the
 * rack and lands in the database — which then comes forward as the
 * stage's hero and fills a real table of stored records.
 */
export const buildDataStage: StageBuilder = (tl, refs) => {
  const b = refs.backend;
  const d = refs.data;
  const t = refs.text;

  // --- the phone hands the record over -------------------------------
  tl.fromTo(
    d.recordPacket,
    { opacity: 0, scale: 0.4, x: PACKET_START.x, y: PACKET_START.y, transformOrigin: "center" },
    { opacity: 1, scale: 1, duration: 0.05 },
    2.48
  );

  tl.to([...refs.mobile.ui, refs.mobile.ctaButton, refs.mobile.ctaLabel, refs.mobile.newCard, refs.mobile.label], { opacity: 0, duration: 0.08 }, 2.54)
    .to([refs.mobile.deviceFrame, refs.mobile.screen, ...refs.mobile.chrome], {
      opacity: 0,
      scale: 0.86,
      duration: 0.12,
      transformOrigin: "center",
    }, 2.58);

  // out of the device, into the gateway...
  tl.to(d.recordPacket, { x: 296, y: 350, duration: 0.06, ease: "power1.in" }, 2.54)
    .to(d.recordPacket, { x: GATEWAY.x, y: GATEWAY.y, duration: 0.07, ease: "power1.inOut" }, 2.6)
    .to(b.gatewayGroup, { scale: 0.95, duration: 0.03, yoyo: true, repeat: 1, transformOrigin: "center" }, 2.66)
    // ...through the servers...
    .to(d.recordPacket, { x: RECEDED_RACK.x, y: RECEDED_RACK.y, duration: 0.08, ease: "power1.inOut" }, 2.68)
    .to(b.blades, { opacity: 0.6, duration: 0.02, yoyo: true, repeat: 1, stagger: 0.008 }, 2.72);

  // The rest of the infrastructure bows out; only the database goes on.
  tl.to([b.rackGroup, b.rackBackGroup, b.clientGroup, b.gatewayGroup, ...b.cables], { opacity: 0, duration: 0.1 }, 2.76);

  tl.fromTo(t.eyebrowMobile, { opacity: 1 }, { opacity: 0, duration: 0.06 }, 2.62)
    .fromTo(t.eyebrowData, { opacity: 0 }, { opacity: 1, duration: 0.06 }, 2.66)
    .fromTo(t.headlineMobile, { opacity: 1, filter: "blur(0px)" }, { opacity: 0, filter: "blur(6px)", duration: 0.07 }, 2.62)
    .fromTo(t.headlineData, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.09 }, 2.67);

  // --- the database comes forward as the hero -------------------------
  tl.to(
    b.dbGroup,
    {
      opacity: 1,
      x: DATA_DB_SHIFT.x,
      y: DATA_DB_SHIFT.y,
      scale: DATA_DB.scale,
      duration: 0.2,
      ease: "power2.inOut",
      transformOrigin: "center",
    },
    2.7
  );

  // ...and the record drops into it
  tl.to(d.recordPacket, { x: DATA_DB.x, y: DATA_DB.y, duration: 0.09, ease: "power2.in" }, 2.78)
    .to(d.recordPacket, { opacity: 0, scale: 0.3, duration: 0.04, transformOrigin: "center" }, 2.86)
    .to(b.dbGroup, { scale: DATA_DB.scale * 1.05, duration: 0.04, yoyo: true, repeat: 1, transformOrigin: "center" }, 2.88)
    .fromTo(b.dbRows, { opacity: 0.4 }, { opacity: 1, duration: 0.05, stagger: 0.02 }, 2.88);

  tl.fromTo(d.labelDb, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.05 }, 2.9)
    .fromTo(d.counter, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 2.94);

  // --- the table fills with stored records ----------------------------
  tl.fromTo(d.feedLine, { opacity: 0, strokeDashoffset: 100 }, { opacity: 1, strokeDashoffset: 0, duration: 0.07 }, 2.94)
    .fromTo(
      d.panel,
      { opacity: 0, scaleX: 0.9, transformOrigin: "left center" },
      { opacity: 1, scaleX: 1, duration: 0.1, ease: "power2.out" },
      2.98
    )
    .fromTo(d.headerRow, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 3.04)
    .fromTo(d.headerDivider, { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 0.06 }, 3.04)
    .fromTo(
      d.rows,
      { opacity: 0, x: -22 },
      { opacity: 1, x: 0, duration: 0.07, stagger: 0.022 },
      3.08
    )
    .fromTo(d.labelTable, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.05 }, 3.14);

  tl.fromTo(t.taglineInteraction, { opacity: 1, y: 0 }, { opacity: 0, y: -10, duration: 0.05 }, 2.94)
    .fromTo(t.taglineData, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.06 }, 2.98);

  // The last record to arrive is the one the tap produced.
  tl.fromTo(d.newestRowGlow, { opacity: 0 }, { opacity: 1, duration: 0.04 }, 3.18)
    .fromTo(
      d.jsonCard,
      { opacity: 0, y: 20, scale: 0.94, transformOrigin: "center" },
      { opacity: 1, y: 0, scale: 1, duration: 0.09, ease: "back.out(1.2)" },
      3.16
    );
};
