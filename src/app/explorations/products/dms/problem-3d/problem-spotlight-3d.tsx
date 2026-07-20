"use client";

/* ----------------------------------------------------------------------------
 * problem-spotlight-3d.tsx - the DMS problem spotlight with the SVG stage
 * swapped for one shared WebGL stage (problem-scenes.tsx). Same shell as
 * DmsProblemSpotlight on the product page: index rail on top, quote + metric
 * left, scene right. The copy panels stay Base UI tabs for a11y; the canvas
 * sits outside them so a single WebGL context survives tab switches.
 * -------------------------------------------------------------------------- */

import { Tabs } from "@base-ui/react/tabs";
import { useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { cn } from "@/lib/cn";
import type { DmsProblemIllustrationKind, DmsProblemItem } from "../dms-problem-visuals";

const ProblemStage3D = dynamic(
  () => import("./problem-scenes").then((m) => m.ProblemStage3D),
  { ssr: false, loading: () => <div className="dms3d-loading" aria-hidden="true" /> },
);

const pad = (value: number) => String(value).padStart(2, "0");

export function DmsProblemSpotlight3D({ items }: { items: DmsProblemItem[] }) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<DmsProblemIllustrationKind>(items[0]?.visual ?? "retrieval");

  return (
    <Tabs.Root
      className="dms-spot dms-spot--3d"
      onValueChange={(value) => {
        if (typeof value === "string") setActive(value as DmsProblemIllustrationKind);
      }}
      orientation="horizontal"
      value={active}
    >
      <Tabs.List activateOnFocus className="dms-spot__list" aria-label="The four document control symptoms">
        {items.map((problem, index) => {
          const selected = active === problem.visual;
          return (
            <Tabs.Tab
              className={cn("dms-spot__it", selected && "is-active")}
              key={problem.visual}
              value={problem.visual}
            >
              <span className="dms-spot__idx" aria-hidden="true">{pad(index + 1)}</span>
              <span className="dms-spot__name">{problem.title}</span>
            </Tabs.Tab>
          );
        })}
      </Tabs.List>

      <div className="dms-spot__stagewrap">
        <div className="dms-spot__body dms-spot__body--3d">
          <div className="dms-spot__ctxcol">
            {items.map((problem) => (
              <Tabs.Panel className="dms-spot__panel" key={problem.visual} value={problem.visual}>
                <div className="dms-spot__context">
                  <span className="dms-spot__category">{problem.category}</span>
                  <blockquote className="dms-spot__quote">
                    <span className="dms-spot__quote-mark" aria-hidden="true">&ldquo;</span>
                    <p>{problem.quote}</p>
                  </blockquote>
                  <div className="dms-spot__fact">
                    <div className="dms-spot__metric">
                      <strong>{problem.metric}</strong>
                      <span>{problem.metricLabel}</span>
                    </div>
                    <p className="dms-spot__detail">{problem.detail}</p>
                  </div>
                </div>
              </Tabs.Panel>
            ))}
          </div>

          <div className="dms-spot__scene dms-spot__scene--3d" aria-hidden="true">
            <ProblemStage3D kind={active} staticMode={Boolean(reducedMotion)} />
          </div>
        </div>
      </div>
    </Tabs.Root>
  );
}
