import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface NumberedItem {
  lead: ReactNode;
  body: ReactNode;
}

export interface NumberedListProps {
  items: NumberedItem[];
  className?: string;
  start?: number;
}

export function NumberedList({ items, className, start = 1 }: NumberedListProps) {
  return (
    <ul className={cn("numlist", className)}>
      {items.map((item, i) => {
        const n = (start + i).toString().padStart(2, "0");
        return (
          <li key={n}>
            <span className="num">{n}</span>
            <span>
              <strong>{item.lead}</strong> {item.body}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
