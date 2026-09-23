"use client";

/* ============================================================================
 * about-map.tsx. The locations section: the map is the stage and the two
 * office rows beneath it are the controls. It opens fitted to both offices; clicking a row flies
 * to that address at street level, and "Show both offices" returns to the
 * overview. MapLibre GL over OpenFreeMap's Positron style (vector, no API
 * key, attribution required), loaded on the client only. Square cobalt
 * markers with a permanent city label, in the kit's grammar. Scroll-wheel
 * zoom is off until the visitor clicks the map, so the page still scrolls
 * past it. Reduced motion swaps the fly for a cut.
 * ========================================================================== */

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { Map as GlMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export type Office = {
  key: string;
  city: string;
  country: string;
  lines: string[];
  lat: number;
  lng: number;
};

const STYLE = "https://tiles.openfreemap.org/styles/positron";
const STREET_ZOOM = 15;

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function markerElement(city: string) {
  const el = document.createElement("div");
  el.className = "ab-map__pin";
  el.innerHTML = `<span class="ab-map__pin-dot"></span><span class="ab-map__label">${city}</span>`;
  return el;
}

export function AboutMap({ head, offices }: { head: ReactNode; offices: Office[] }) {
  const canvas = useRef<HTMLDivElement>(null);
  const map = useRef<GlMap | null>(null);
  const markers = useRef<Marker[]>([]);
  const [active, setActive] = useState<string | null>(null);

  const overview = useCallback((animate: boolean) => {
    const m = map.current;
    if (!m) return;
    const lngs = offices.map((o) => o.lng);
    const lats = offices.map((o) => o.lat);
    m.fitBounds(
      [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
      { padding: { top: 56, right: 120, bottom: 56, left: 56 }, maxZoom: 4, animate: animate && !reducedMotion(), duration: 1200 },
    );
    setActive(null);
  }, [offices]);

  const focus = useCallback((key: string) => {
    const m = map.current;
    const o = offices.find((x) => x.key === key);
    if (!m || !o) return;
    if (reducedMotion()) m.jumpTo({ center: [o.lng, o.lat], zoom: STREET_ZOOM });
    else m.flyTo({ center: [o.lng, o.lat], zoom: STREET_ZOOM, duration: 1800, essential: true });
    setActive(key);
    /* the rows sit under the map; keep the map in view when one is picked */
    canvas.current?.scrollIntoView({ block: "nearest", behavior: reducedMotion() ? "auto" : "smooth" });
  }, [offices]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;
      if (cancelled || !canvas.current || map.current) return;
      /* no WebGL (old browser, blocked GPU): drop the map and keep the rows
       * as plain addresses rather than showing an empty frame */
      let m: GlMap;
      try {
        m = new maplibregl.Map({
          container: canvas.current,
          style: STYLE,
          center: [0, 25],
          zoom: 1.5,
          minZoom: 0.9,
          maxZoom: 18,
          attributionControl: { compact: false },
          scrollZoom: false,
          dragRotate: false,
          pitchWithRotate: false,
          touchPitch: false,
        });
      } catch (err) {
        console.warn("about-map: map unavailable", err);
        canvas.current.hidden = true;
        return;
      }
      m.touchZoomRotate.disableRotation();
      m.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");

      offices.forEach((o) => {
        const el = markerElement(o.city);
        el.addEventListener("click", () => focus(o.key));
        markers.current.push(new maplibregl.Marker({ element: el, anchor: "left" }).setLngLat([o.lng, o.lat]).addTo(m));
      });

      /* wheel zoom only once the visitor has engaged with the map */
      m.on("click", () => m.scrollZoom.enable());
      m.getCanvas().addEventListener("mouseleave", () => m.scrollZoom.disable());

      map.current = m;
      overview(false);
    })();
    return () => {
      cancelled = true;
      markers.current.forEach((mk) => mk.remove());
      markers.current = [];
      map.current?.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ab-map">
      <header className="pf-split-head ab-head" data-reveal>{head}</header>
      <div className="ab-map__canvas" ref={canvas} role="region" aria-label="Map of the Unifize offices in Palo Alto and Bengaluru" />
      <ul className="ab-offices">
        {offices.map((o) => {
          const on = active === o.key;
          return (
            <li key={o.key} className={"ab-offices__row" + (on ? " is-active" : "")}>
              <button type="button" className="ab-offices__btn" onClick={() => focus(o.key)} aria-pressed={on}>
                <span className="ab-offices__city">
                  <span className="ab-offices__name">{o.city}</span>
                  <span className="ab-offices__country">{o.country}</span>
                </span>
                <address className="dms-body">
                  {o.lines.map((l) => <span key={l}>{l}</span>)}
                </address>
              </button>
            </li>
          );
        })}
      </ul>
      <button type="button" className="ab-map__all" onClick={() => overview(true)} hidden={active === null}>
        Show both offices &rarr;
      </button>
    </div>
  );
}
