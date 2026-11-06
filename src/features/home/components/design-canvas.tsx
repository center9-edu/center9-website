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

// Exposes the position as CSS variables for the `canvas-item` utility, so the element is only
// positioned from `xl` and stays in normal flow on smaller screens.
export function boxVars(left: number, top: number): CSSProperties {
  return { "--x": dp(left), "--y": dp(top) } as CSSProperties;
}

type DesignCanvasProps = {
  height: number;
  children: ReactNode;
  /** Layout of the stacked fallback below `xl` (gap, padding, alignment). */
  className?: string;
};

/**
 * Renders as a stacked, padded column on small screens and as a scaled, absolutely
 * positioned Figma canvas (at most 1440px wide) from the `xl` breakpoint.
 */
export function DesignCanvas({ height, children, className }: DesignCanvasProps) {
  return (
    <div
      className={cn(
        "container-page relative flex flex-col",
        className,
        "xl:@container xl:block xl:aspect-(--ratio) xl:max-w-360 xl:overflow-hidden xl:px-0 xl:py-0",
      )}
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
