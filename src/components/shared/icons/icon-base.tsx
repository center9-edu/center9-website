import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

/**
 * Base for the icon components in this folder (paths from the Figma exports, colors via
 * currentColor so parents control them). Decorative by default; pass `aria-hidden={false}`
 * and `aria-label` for meaningful icons.
 */
export function IconBase({ size = 24, viewBox = "0 0 24 24", children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}
