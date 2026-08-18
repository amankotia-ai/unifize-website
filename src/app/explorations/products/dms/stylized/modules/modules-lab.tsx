"use client";

/* The modules section as camera work: one persistent SOP-118 record; each
 * module tab is a pose. Document Control lands on the record's status row,
 * Change Control on the revision chain that carries change #77, Training on
 * the release cascade. Same scene, same DOM, the camera glides. Content stays
 * on the page's fictional dataset (SOP-118 Rev D / change #77 / 42 records)
 * and the Arcade-grounded record anatomy. */

import { useState } from "react";
import { ArcadeStepScene } from "../../../_shared/arcade/arcade";
import { STYLIZED_MODULE_ARCADE_CONFIGS } from "../stylized-mocks";
import { MODULES } from "../../dms-data";

export function ModulesLab() {
  const [activeKey, setActiveKey] = useState(MODULES[0]?.key ?? "document-control");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const active = MODULES.find((module) => module.key === activeKey) ?? MODULES[0];

  return (
    <section className={"stx-mlab" + (theme === "dark" ? " is-dark" : "")}>
      <div className="stx-mlab__wrap">
        <header className="stx-mlab__head">
          <div>
            <span className="stx-mlab__eyebrow">Modules · record camera lab</span>
            <h1 className="stx-mlab__title">Three modules. One continuous record.</h1>
            <p className="stx-mlab__lede">
              Each module is a camera pose on the same record: the change, the controlled
              revision, and the training obligation stay connected from the first decision
              to the final signature.
            </p>
          </div>
          <div className="stx-mlab__theme" role="group" aria-label="Section theme">
            <button
              aria-pressed={theme === "light"}
              className={theme === "light" ? "is-active" : ""}
              onClick={() => setTheme("light")}
              type="button"
            >
              Light
            </button>
            <button
              aria-pressed={theme === "dark"}
              className={theme === "dark" ? "is-active" : ""}
              onClick={() => setTheme("dark")}
              type="button"
            >
              Dark
            </button>
          </div>
        </header>

        <div className="stx-mlab__tabs" role="tablist" aria-label="DMS modules">
          {MODULES.map((module) => (
            <button
              aria-selected={module.key === activeKey}
              className={"stx-mlab__tab" + (module.key === activeKey ? " is-active" : "")}
              key={module.key}
              onClick={() => setActiveKey(module.key)}
              role="tab"
              type="button"
            >
              <b>{module.name}</b>
              <span>{module.promise}</span>
            </button>
          ))}
        </div>

        <div className="stx-mlab__stage">
          <ArcadeStepScene config={STYLIZED_MODULE_ARCADE_CONFIGS[activeKey] ?? STYLIZED_MODULE_ARCADE_CONFIGS["document-control"]} />
        </div>

        <p className="stx-mlab__blurb" aria-live="polite">{active?.blurb}</p>
      </div>
    </section>
  );
}
