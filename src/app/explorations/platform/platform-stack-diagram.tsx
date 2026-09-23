"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import "./platform-stack-diagram.css";

type Layer = "outcomes" | "products" | "components";
const PRODUCTS = [
  { name: "QMS", detail: "Quality brings the assessment, evidence, and sign-off together on CC-2148." },
  { name: "DMS", detail: "The revised procedure, SOP-118, stays linked to the same change." },
  { name: "PLM", detail: "Engineering connects the affected drawing, DWG-2201, to the change." },
  { name: "MES", detail: "Operations follows the revised specification through production readiness." },
];
const COMPONENTS = ["Templates", "Stages", "Gates", "Automations", "Forms", "Roles", "Evidence", "Approvals"];
const COMPONENT_DETAILS = [
  "A repeatable change-control process, shaped to your team.",
  "Raise → Assess → Approve → Close.",
  "The assessment and evidence must be complete before sign-off.",
  "Notify the assigned reviewer when approval is requested.",
  "Capture the reason for change and the affected drawing.",
  "Engineering assesses. Quality reviews. Operations implements.",
  "DWG-2201 and SOP-118 stay connected to the decision.",
  "A named person reviews and signs on the record.",
];
const OUTCOMES = ["AI assist", "Human review", "Connected evidence"];
const OUTCOME_DETAILS = [
  "AI suggests affected documents; a person chooses what to add. In beta.",
  "Your team reviews the context and keeps the decision.",
  "The change, supporting documents, and sign-off stay connected.",
];
const LAYERS: { id: Layer; title: string; text: string }[] = [
  { id: "outcomes", title: "Outcomes + AI Assist", text: "Move work forward with context, evidence, and AI assistance. Your people keep the decisions." },
  { id: "products", title: "Product suite", text: "Start with QMS, DMS, PLM, or MES. Each product connects to the same platform underneath." },
  { id: "components", title: "Workflow components", text: "Shape the process with reusable stages, roles, gates, and approvals. Built around how your team works." },
];

// Every visible surface uses the same rounded-square extrusion. Sampling the
// rounded perimeter keeps the sides flush with the cap, including the corners.
const ISO = .8660254;
const COMPONENT_ICONS: ReactNode[] = [
  <><rect x="3" y="2" width="10" height="12" rx="1" /><path d="M6 5h4M6 8h4M6 11h2" /></>,
  <><rect x="1.5" y="5" width="4" height="6" rx=".5" /><rect x="10.5" y="5" width="4" height="6" rx=".5" /><path d="M5.5 8h5" /></>,
  <><path d="m8 1.5 6.5 6.5L8 14.5 1.5 8Z" /><path d="m5 8 2 2 4-4" /></>,
  <path d="M9.5 1.5 3.5 9h4L6.5 14.5 12.5 7h-4Z" />,
  <><path d="M6 3h8M6 8h8M6 13h8" /><rect x="1" y="2" width="2" height="2" /><rect x="1" y="7" width="2" height="2" /><rect x="1" y="12" width="2" height="2" /></>,
  <><circle cx="8" cy="4.5" r="2.5" /><path d="M2.5 14v-1.5a5.5 5.5 0 0 1 11 0V14" /></>,
  <path d="m6 9 4.5-4.5a2 2 0 0 1 3 3L7 14a3.5 3.5 0 0 1-5-5L9 2" />,
  <><path d="M2 14h12M3 10l7.5-7.5 3 3L6 13l-3 .5Z" /><path d="m9 4 3 3" /></>,
];
/* exported so the coexistence drawing (platform-coexistence.tsx) is built from
 * the same rounded-square extrusion and reads as one family */
export const ISO_K = ISO;
export function Plate({ center, size = 108, depth = 26, inset = true }: { center: number; size?: number; depth?: number; inset?: boolean }) {
  const radius = size > 50 ? 10 : 5;
  const corners = [[size-radius, -size+radius, -90], [size-radius, size-radius, 0], [-size+radius, size-radius, 90], [-size+radius, -size+radius, 180]];
  const points = corners.flatMap(([x,y,start]) => Array.from({length:9}, (_,i) => {
    const angle = (start+i*90/8)*Math.PI/180;
    return [x+radius*Math.cos(angle), y+radius*Math.sin(angle)];
  }));
  const projected = points.map(([x,y]) => [260+(x-y)*ISO, center+(x+y)*.5]);
  const contour = (drop: number) => projected.map(([x,y],i) => `${i ? "L" : "M"}${x},${y+drop}`).join(" ")+"Z";
  return <g className="pf-iso__plate">
    <path className="pf-iso__underside" d={contour(depth)} />
    {projected.map(([x,y],i) => {
      const next = projected[(i+1)%projected.length];
      const original = points[i];
      if (original[0] < size-radius && original[1] < size-radius) return null;
      return <path key={i} className={original[0] > original[1] ? "pf-iso__side pf-iso__side--right" : "pf-iso__side"} d={`M${x},${y}L${next[0]},${next[1]}L${next[0]},${next[1]+depth}L${x},${y+depth}Z`} />;
    })}
    <path className="pf-iso__surface" d={contour(0)} />
    <g transform={`translate(260 ${center}) matrix(${ISO} .5 -${ISO} .5 0 0)`}>
      <rect className="pf-iso__rim" x={-size+7} y={-size+7} width={size*2-14} height={size*2-14} rx={radius-2} />
      {inset ? <><rect className="pf-iso__inset" x={-size+28} y={-size+28} width={size*2-56} height={size*2-56} rx="5" /><rect className="pf-iso__chip" x={-size+46} y={-size+46} width={size*2-92} height={size*2-92} rx="4" /></> : null}
      {size > 50 ? [[-size+16,-size+16],[size-16,-size+16],[size-16,size-16],[-size+16,size-16]].map(([x,y],i)=><circle className="pf-iso__pin" key={i} cx={x} cy={y} r="1.4" />) : null}
    </g>
    <path className="pf-iso__edge" d={`M${260},${center+size-radius*.3}v${depth} M${260-(size*2-radius*.3)*ISO},${center}v${depth} M${260+(size*2-radius*.3)*ISO},${center}v${depth}`} />
  </g>;
}

function Module({ x, y, center, size, selected, label, icon, onSelect }: { x: number; y: number; center: number; size: number; selected: boolean; label: string; icon?: ReactNode; onSelect: () => void }) {
  return <g className="pf-iso__module" data-selected={selected} role="button" tabIndex={0} aria-label={label} aria-pressed={selected} onClick={(event) => { event.stopPropagation(); onSelect(); }} onKeyDown={(event) => activate(event, onSelect)}>
    <title>{label}</title>
    <g transform={`translate(${(x-y)*ISO} ${(x+y)*.5})`}>
      <Plate center={center} size={size} depth={10} inset={false} />
      <g transform={`translate(260 ${center}) matrix(${ISO} .5 -${ISO} .5 0 0)`}>
        <rect className="pf-iso__module-core" x={-size+5} y={-size+5} width={size*2-10} height={size*2-10} rx="3" />
        {icon ? <g className="pf-iso__component-icon" transform="translate(-15 -15) scale(1.875)">{icon}</g> : <text className="pf-iso__module-label" textAnchor="middle" dominantBaseline="central">{label.split(":")[0]}</text>}
      </g>
    </g>
  </g>;
}
function activate(event: KeyboardEvent<SVGGElement>, callback: () => void) {
  if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); callback(); }
}

export function PlatformStackDiagram() {
  const id = useId();
  const [active, setActive] = useState<Layer | null>(null);
  const [product, setProduct] = useState(0);
  const [component, setComponent] = useState(1);
  const [outcome, setOutcome] = useState(0);
  const [hover, setHover] = useState<Layer | null>(null);
  const current = LAYERS.find((entry) => entry.id === active);
  const productPositions = [[-45, -45], [45, -45], [-45, 45], [45, 45]];
  const componentPositions = [[-68, -68], [0, -68], [68, -68], [-68, 0], [68, 0], [-68, 68], [0, 68], [68, 68]];
  const selectProduct = (index: number) => { setProduct(index); setActive("products"); };
  const selectComponent = (index: number) => { setComponent(index); setActive("components"); };
  const panelId = (layer: Layer) => `${id}-${layer}`;

  return <div className="pf-iso" data-active={active}>
    {/* the instruction strip ("Explore the platform, layer by layer / Click a
      * layer or a component") was removed on 22 Sep 2026 (Abhishek: "get rid
      * of these texts"); the layers' +/- affordance carries the interaction */}
    <div className="pf-iso__composition">
      <div className="pf-iso__scene">
        <svg className="pf-iso__drawing" viewBox="0 0 520 790" role="group" aria-label="Exploded isometric diagram of the Unifize platform">
          <g className="pf-iso__guides" aria-hidden="true"><path d="M73 142V630M447 142V630M260 34V752" /></g>
          {/* Three bands only: workflow components on the base plate,
              the product suite in the middle, outcomes and AI above.
              Back-to-front painting preserves depth. */}
          <g className="pf-iso__layer" data-band="components" data-selected={active === "components"} data-hover={hover === "components"} onMouseEnter={() => setHover("components")} onMouseLeave={() => setHover(null)}>
            <title>Workflow components</title>
            <g role="button" tabIndex={0} aria-label="Explore workflow components" aria-pressed={active === "components"} aria-controls={panelId("components")} onClick={() => setActive("components")} onKeyDown={(event) => activate(event, () => setActive("components"))}><Plate center={625} inset={false} /></g>
            {componentPositions.map(([x,y],index)=><Module key={COMPONENTS[index]} x={x} y={y} center={610} size={30} icon={COMPONENT_ICONS[index]} selected={active === "components" && component === index} label={COMPONENTS[index]} onSelect={()=>selectComponent(index)} />)}
          </g>
          <g className="pf-iso__layer" data-band="products" data-selected={active === "products"} data-hover={hover === "products"} onMouseEnter={() => setHover("products")} onMouseLeave={() => setHover(null)}>
            <title>Product suite</title>
            {productPositions.map(([x,y],index)=><Module key={PRODUCTS[index].name} x={x} y={y} center={387} size={40} selected={active === "products" && product === index} label={`${PRODUCTS[index].name}: explore product`} onSelect={()=>selectProduct(index)} />)}
          </g>
          <g className="pf-iso__layer" data-band="outcomes" data-selected={active === "outcomes"} data-hover={hover === "outcomes"} role="button" tabIndex={0} aria-label="Explore outcomes and AI assistance" aria-pressed={active === "outcomes"} aria-controls={panelId("outcomes")} onClick={() => setActive("outcomes")} onKeyDown={(event) => activate(event, () => setActive("outcomes"))} onMouseEnter={() => setHover("outcomes")} onMouseLeave={() => setHover(null)}>
            <title>Outcomes and AI assistance</title><Plate center={142} />
            <g transform={`translate(260 142) matrix(${ISO} .5 -${ISO} .5 0 0)`} aria-hidden="true">
              {/* Exact symbol paths extracted from public/logo_light.svg. */}
              <image href="/unifize-symbol.svg" x="-39" y="-33" width="78" height="66" />
            </g>
          </g>
        </svg>
        <span className="pf-iso__scene-note">One platform. Every layer connected.</span>
      </div>
      {LAYERS.map((layer) => <section key={layer.id} className={`pf-iso__annotation pf-iso__annotation--${layer.id}`} data-selected={active === layer.id} data-hover={hover === layer.id} onMouseEnter={() => setHover(layer.id)} onMouseLeave={() => setHover(null)}>
        <button className="pf-iso__annotation-button" aria-expanded={active === layer.id} aria-controls={panelId(layer.id)} onClick={() => setActive(active === layer.id ? null : layer.id)}>
          <span className="pf-iso__annotation-title">{layer.title}</span><span className="pf-iso__annotation-index" aria-hidden="true">{active === layer.id ? "−" : "+"}</span>
          <span className="pf-iso__annotation-copy">{layer.text}</span>
        </button>
        <div className="pf-iso__detail" id={panelId(layer.id)} hidden={active !== layer.id}>
          {layer.id === "products" ? <><div className="pf-iso__choices" aria-label="Products">{PRODUCTS.map((entry, index) => <button type="button" key={entry.name} aria-pressed={product === index} onClick={() => selectProduct(index)}>{entry.name}</button>)}</div><p>{PRODUCTS[product].detail}</p><Link href={`/explorations/products/${PRODUCTS[product].name.toLowerCase()}`}>Explore {PRODUCTS[product].name}<span aria-hidden="true"> ↗</span></Link><small>Illustrative change control · CC-2148</small></> : null}
          {layer.id === "components" ? <><div className="pf-iso__choices" aria-label="Workflow components">{COMPONENTS.map((entry, index) => <button type="button" key={entry} aria-pressed={component === index} onClick={() => selectComponent(index)}>{entry}</button>)}</div><p>{COMPONENT_DETAILS[component]}</p><small>Illustrative change control · CC-2148</small></> : null}
          {layer.id === "outcomes" ? <><div className="pf-iso__choices" aria-label="Outcomes">{OUTCOMES.map((entry, index) => <button type="button" key={entry} aria-pressed={outcome === index} onClick={() => setOutcome(index)}>{entry}</button>)}</div><p>{OUTCOME_DETAILS[outcome]}</p><Link href="#ai">See AI in the workflow<span aria-hidden="true"> ↗</span></Link></> : null}
        </div>
      </section>)}
    </div>
    <p className="pf-iso__status" role="status">{current ? `Exploring ${current.title}` : "Platform overview"}{active === "products" ? `: ${PRODUCTS[product].name}` : active === "components" ? `: ${COMPONENTS[component]}` : active === "outcomes" ? `: ${OUTCOMES[outcome]}` : ""}.</p>
  </div>;
}
