import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "inline" | "mono" | "read";

type Props = Omit<NextLinkProps, "href"> & {
  href: NextLinkProps["href"];
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function Link({ variant = "inline", className, children, ...rest }: Props) {
  if (variant === "mono") {
    return (
      <NextLink className={cn("lnk-mono", className)} {...rest}>
        {children}
        <span className="arr">→</span>
      </NextLink>
    );
  }
  if (variant === "read") {
    return (
      <NextLink className={cn("lnk-read", className)} {...rest}>
        {children}
        <span className="arr">→</span>
      </NextLink>
    );
  }
  return (
    <NextLink className={cn("lnk-inline", className)} {...rest}>
      {children}
    </NextLink>
  );
}
