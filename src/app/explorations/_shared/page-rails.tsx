/* ----------------------------------------------------------------------------
 * page-rails.tsx - the hatched divider band of the rails grammar (22 Sep
 * 2026), shared by every page on the rails (page-rails.css).
 *
 * The rails themselves are CSS (`hm-railed` on a section); the band needs
 * its own elements for the dashed rules, the hatch fill between the rails,
 * and the four crosses where a rule meets a rail.
 *
 * Server module, purely decorative: aria-hidden throughout.
 * -------------------------------------------------------------------------- */

export function HatchBand({ className }: { className?: string }) {
  return (
    <div className={"hm-hatch hm-railed" + (className ? " " + className : "")} aria-hidden="true">
      <i className="hm-hatch__rule hm-hatch__rule--t" />
      <i className="hm-hatch__fill" />
      <i className="hm-hatch__rule hm-hatch__rule--b" />
      <b className="hm-cross hm-cross--tl" />
      <b className="hm-cross hm-cross--tr" />
      <b className="hm-cross hm-cross--bl" />
      <b className="hm-cross hm-cross--br" />
    </div>
  );
}
