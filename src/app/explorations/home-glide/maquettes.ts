/* ----------------------------------------------------------------------------
 * maquettes.ts - the hero's five worlds: rendered cutaway facility maquettes
 * (scripts/facility-render/build.py, Blender + Cycles). Each render ships with
 * a sidecar of where the record's pin and the departments on it land in the
 * image (0..1, y down), so the page can draw the connectors over the render.
 * -------------------------------------------------------------------------- */

import pharma from "./points/pharma.json";
import medicalDevices from "./points/medical-devices.json";
import chemicals from "./points/chemicals.json";
import cosmetics from "./points/cosmetics.json";
import laboratories from "./points/laboratories.json";

export const RENDER_W = 3200;
export const RENDER_H = 1000;

export type Point = { x: number; y: number };
export type Points = { pin: Point | null; links: ({ id: string; role: string } & Point)[] };
export type Maquette = {
  key: string;
  name: string;
  caption: string;
  src: string;
  points: Points;
  record: { code: string; kind: string; title: string; state: string; people: string[] };
};

export const MAQUETTES: Maquette[] = [
  {
    key: "pharma",
    name: "Pharmaceuticals",
    caption: "Cutaway model of an oral solid dose plant: warehouse, dispensing, granulation and compression on the ground floor, offices and QC above, coating and packaging next door.",
    src: "/explorations/home-glide/pharma.png",
    points: pharma as Points,
    record: { code: "DEV-2231", kind: "Deviation", title: "Tablet press 3 hardness out of range on lot 4471", state: "Investigation open. QA review due 16:00", people: ["Production", "QA", "QC"] },
  },
  {
    key: "medical-devices",
    name: "Medical devices",
    caption: "Cutaway model of a device plant: injection moulding, cleanroom assembly and gowning on the ground floor, design and quality engineering above, sterilisation and packaging next door.",
    src: "/explorations/home-glide/medical-devices.png",
    points: medicalDevices as Points,
    record: { code: "NC-0418", kind: "Nonconformance", title: "Catheter hub bond strength below spec, lot 2290", state: "Containment done. CAPA proposed, awaiting quality engineering", people: ["Quality Eng.", "Production", "Design"] },
  },
  {
    key: "chemicals",
    name: "Chemicals",
    caption: "Cutaway model of a speciality chemicals site: control room and offices, a double-height reactor hall, drum filling and warehouse, QC above, silos outside.",
    src: "/explorations/home-glide/chemicals.png",
    points: chemicals as Points,
    record: { code: "CC-0972", kind: "Change control", title: "Reactor R-2 agitator speed setpoint, 90 to 110 rpm", state: "Risk assessment in review. EHS sign-off pending", people: ["Process Eng.", "EHS", "QA"] },
  },
  {
    key: "cosmetics",
    name: "Cosmetics",
    caption: "Cutaway model of a cosmetics site: mixing and filling on the ground floor, formulation lab and offices above, packaging and warehouse next door.",
    src: "/explorations/home-glide/cosmetics.png",
    points: cosmetics as Points,
    record: { code: "BR-1183", kind: "Batch release", title: "Lot 1183 fill-weight verification, serum line", state: "Awaiting QC release. Packaging on hold", people: ["QC", "Production", "QA"] },
  },
  {
    key: "laboratories",
    name: "Laboratories",
    caption: "Cutaway model of a testing laboratory: sample reception, chemistry lab and autoclave on the ground floor, microbiology and stability above, offices on top.",
    src: "/explorations/home-glide/laboratories.png",
    points: laboratories as Points,
    record: { code: "OOS-0341", kind: "Out of specification", title: "Assay result 91.2 percent against 95 to 105", state: "Phase 1 lab investigation. Analyst and supervisor assigned", people: ["Analyst", "Lab Supervisor", "QA"] },
  },
];
