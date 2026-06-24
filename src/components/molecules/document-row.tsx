import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type DocStatus = "approved" | "review" | "blocked" | "draft";

const STATUS_LABEL: Record<DocStatus, string> = {
  approved: "Approved",
  review: "In review",
  blocked: "Blocked",
  draft: "Draft",
};

export interface DocumentRowProps {
  /** Filename. Truncates with ellipsis. */
  name: ReactNode;
  status: DocStatus;
  /** Override status label if you want non-default copy. */
  statusLabel?: ReactNode;
  className?: string;
}

const FileIcon = (
  <svg
    className="ficon"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <path d="M3 1.5h6L13 5.5V14a.5.5 0 0 1-.5.5h-9A.5.5 0 0 1 3 14V1.5z" />
    <path d="M9 1.5V5.5h4" />
  </svg>
);

/**
 * M.14 — Document row. file icon + filename + status pill.
 * Stack into a <DocumentCard> — never standalone.
 */
export function DocumentRow({
  name,
  status,
  statusLabel,
  className,
}: DocumentRowProps) {
  return (
    <div className={cn("doc-row", className)}>
      {FileIcon}
      <span className="name">{name}</span>
      <span className={cn("doc-status", status)}>
        {statusLabel ?? STATUS_LABEL[status]}
      </span>
    </div>
  );
}

export interface DocumentCardProps {
  /** Card header (e.g. "Documents"). */
  head: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Container card for stacked DocumentRow items. */
export function DocumentCard({ head, children, className }: DocumentCardProps) {
  return (
    <div className={cn("doc-card", className)}>
      <div className="head">{head}</div>
      <div className="doc-list">{children}</div>
    </div>
  );
}
