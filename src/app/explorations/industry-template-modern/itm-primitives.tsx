/* ----------------------------------------------------------------------------
 * itm-primitives.tsx — static furniture for the industry-template-modern page,
 * in the Unifize enterprise design system (the DMS language):
 *   Eyebrow       — mono chapter chip (index + label), bordered, uppercase.
 *   ShellFrame    — browser chrome around a product screen / prototype.
 *   SeverityIcon  — big color-coded status shape for the trigger register
 *                   (Urgent = red octagon, High = amber triangle). Shape AND
 *                   colour both encode the level, never colour alone.
 * Server components; no state.
 * -------------------------------------------------------------------------- */

export const pad = (n: number) => String(n).padStart(2, "0");

export function Eyebrow({ n, children }: { n?: number; children: React.ReactNode }) {
  return (
    <span className="itm-eyebrow">
      {typeof n === "number" && (
        <span className="itm-eyebrow__num itm-data" aria-hidden="true">{pad(n)}</span>
      )}
      {children}
    </span>
  );
}

export function ShellFrame({
  url,
  children,
  className,
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={"itm-appframe" + (className ? " " + className : "")}>
      <div className="itm-appframe__bar" aria-hidden="true">
        <span className="itm-dot" /><span className="itm-dot" /><span className="itm-dot" />
        <span className="itm-appframe__url">{url}</span>
      </div>
      {children}
    </div>
  );
}

/* trigger severity → shape family. The clock the trigger starts is a status,
 * so it gets a big solid icon: Urgent = red octagon, High = amber triangle,
 * with a knocked-out exclamation keeping them one family. */
const SEV_SHAPE: Record<string, React.ReactNode> = {
  Urgent: <path d="M7.6 2h8.8L22 7.6v8.8L16.4 22H7.6L2 16.4V7.6L7.6 2Z" />,
  High: <path d="M12 2.6 22 20.4a1.4 1.4 0 0 1-1.2 2.1H3.2A1.4 1.4 0 0 1 2 20.4L12 2.6Z" />,
};
const SEV_MARK: Record<string, React.ReactNode> = {
  Urgent: <><rect x="10.8" y="7" width="2.4" height="7" rx="1.2" /><circle cx="12" cy="17.4" r="1.4" /></>,
  High: <><rect x="10.8" y="9" width="2.4" height="6" rx="1.2" /><circle cx="12" cy="18" r="1.3" /></>,
};

export function SeverityIcon({ severity }: { severity: string }) {
  const shape = SEV_SHAPE[severity] ?? SEV_SHAPE.High;
  const mark = SEV_MARK[severity] ?? SEV_MARK.High;
  return (
    <svg className={"itm-sev itm-sev--" + severity.toLowerCase()} viewBox="0 0 24 24" aria-hidden="true">
      <g className="itm-sev__shape">{shape}</g>
      <g className="itm-sev__mark" fill="#fff">{mark}</g>
    </svg>
  );
}
