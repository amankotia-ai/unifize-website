/* ----------------------------------------------------------------------------
 * dms-primitives.tsx - static furniture for the DMS product page.
 *   Eyebrow      - mono chapter chip (index + label). Sparse by design: only
 *                  where the index carries structure.
 *   ShellFrame   - browser chrome around a product prototype.
 *   StagePanel   - gradient-noise field panel that stages a prototype.
 * Server components; no state.
 * -------------------------------------------------------------------------- */

export const pad = (n: number) => String(n).padStart(2, "0");

export function Eyebrow({ n, children }: { n?: number; children: React.ReactNode }) {
  return (
    <span className="dms-eyebrow">
      {typeof n === "number" && (
        <span className="dms-eyebrow__num dms-data" aria-hidden="true">{pad(n)}</span>
      )}
      {children}
    </span>
  );
}

export function ShellFrame({
  url,
  panel = false,
  children,
}: {
  url: string;
  panel?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={"dms-appframe" + (panel ? " dms-appframe--panel" : "")}>
      <div className="dms-appframe__bar" aria-hidden="true">
        <span className="dms-dot" /><span className="dms-dot" /><span className="dms-dot" />
        <span className="dms-appframe__url">{url}</span>
      </div>
      {children}
    </div>
  );
}

export function HatchFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={"dms-hframe" + (className ? " " + className : "")}>
      <div className="dms-hframe__inner">{children}</div>
    </div>
  );
}

export function StagePanel({
  crop = "none",
  children,
  className,
}: {
  crop?: "none" | "bottom";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={"dms-stage" + (crop === "bottom" ? " dms-stage--crop-b" : "") + (className ? " " + className : "")}>
      <div className="dms-stage__inner">{children}</div>
    </div>
  );
}
