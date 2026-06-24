const dagre = require("@dagrejs/dagre");
const SIZE = { step:{w:198,h:90}, decision:{w:84,h:84}, terminal:{w:156,h:40}, handoff:{w:178,h:58} };
// CAPA nodes/edges (mirrors workflows.ts)
const nodes = [
 ["start","terminal"],["s1","step"],["s2","step"],["s3","step"],["d3","decision"],
 ["s4","step"],["s5","step"],["d5","decision"],["s6","step"],["s7","step"],
 ["s8","step"],["d8","decision"],["end","terminal"],["hoC","handoff"]];
const edges = [
 ["start","s1","flow"],["s1","s2","flow"],["s2","s3","flow"],["s3","d3","flow"],
 ["d3","s4","flow"],["s4","s5","flow"],["s5","d5","flow"],["d5","s6","flow"],
 ["s6","s7","flow"],["s7","s8","flow"],["s8","d8","flow"],["d8","end","flow"],
 ["d3","s3","rework"],["d5","s4","rework"],["d8","s7","rework"],["d8","s4","rework"],
 ["end","hoC","handoff"]];
const kind = Object.fromEntries(nodes);
const g = new dagre.graphlib.Graph();
g.setGraph({rankdir:"LR",nodesep:30,ranksep:62,marginx:20,marginy:28});
g.setDefaultEdgeLabel(()=>({}));
for (const [id,k] of nodes) if(k!=="handoff") g.setNode(id,{width:SIZE[k].w,height:SIZE[k].h});
for (const [f,t,kd] of edges){ if(kd==="handoff") continue; if(kind[f]==="handoff"||kind[t]==="handoff") continue; g.setEdge(f,t);}
dagre.layout(g);
let bottom=0; const pos={};
for (const [id,k] of nodes){ if(k==="handoff") continue; const n=g.node(id); const s=SIZE[k]; pos[id]={x:n.x-s.w/2,y:n.y-s.h/2,w:s.w,h:s.h}; bottom=Math.max(bottom,pos[id].y+s.h);}
// overlap check among spine nodes
function overlap(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;}
const ids=Object.keys(pos); let ov=0;
for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++) if(overlap(pos[ids[i]],pos[ids[j]])) {ov++; console.log("OVERLAP",ids[i],ids[j]);}
const xs=ids.map(i=>pos[i].x), ys=ids.map(i=>pos[i].y);
console.log("nodes laid:",ids.length,"  overlaps:",ov);
console.log("bounding W:",Math.round(Math.max(...xs.map((x,k)=>x+pos[ids[k]].w))-Math.min(...xs)),"  H:",Math.round(Math.max(...ys.map((y,k)=>y+pos[ids[k]].h))-Math.min(...ys)));
console.log("ranks (x of each step left→right):", ids.map(i=>`${i}:${Math.round(pos[i].x)}`).join("  "));
console.log("handoff row Y:", Math.round(bottom+44));
