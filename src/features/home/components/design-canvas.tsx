import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

// Figma frames on the landing page are 1440px wide. Illustrated sections are laid out on a
// canvas whose `--dp` variable equals one Figma pixel, so absolute positions taken from the
// design scale proportionally with the viewport.
const DESIGN_WIDTH = 1440;

export function dp(value: number) {
  return `calc(${value} * var(--dp))`;
}

export function box(left: number, top: number, width?: number, height?: number): CSSProperties {
  return {
    left: dp(left),
    top: dp(top),
    width: width === undefined ? undefined : dp(width),
    height: height === undefined ? undefined : dp(height),
  };
}

// Exposes the position as CSS variables so it can be applied only at a breakpoint, e.g.
// `lg:absolute lg:left-(--x) lg:top-(--y)`, letting the element stay in normal flow on mobile.
export function boxVars(left: number, top: number): CSSProperties {
  return { "--x": dp(left), "--y": dp(top) } as CSSProperties;
}

type DesignCanvasProps = {
  height: number;
  children: ReactNode;
  className?: string;
};

/**
 * Renders as a normal block on small screens and as a scaled, absolutely positioned
 * Figma canvas from the `lg` breakpoint.
 */
export function DesignCanvas({ height, children, className }: DesignCanvasProps) {
  return (
    <div
      className={cn("relative lg:@container lg:overflow-hidden lg:aspect-(--ratio)", className)}
      style={
        {
          "--ratio": `${DESIGN_WIDTH} / ${height}`,
          "--dp": `calc(100cqw / ${DESIGN_WIDTH})`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
