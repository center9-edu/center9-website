import { IconBase, type IconProps } from "@/components/shared/icons/icon-base";

export function RoutingIcon(props: IconProps) {
  return (
    <IconBase size={18} viewBox="0 0 18 18" {...props}>
      <g stroke="currentColor" strokeWidth={1.5}>
        <path d="M1.5525 3.45C2.1525 0.855 6.06 0.855 6.6525 3.45C7.005 4.9725 6.0375 6.2625 5.1975 7.065C4.5825 7.65 3.615 7.6425 3 7.065C2.1675 6.2625 1.2 4.9725 1.5525 3.45Z" />
        <path d="M11.3025 12.45C11.9025 9.855 15.8325 9.855 16.4325 12.45C16.785 13.9725 15.8175 15.2625 14.97 16.065C14.355 16.65 13.38 16.6425 12.765 16.065C11.9175 15.2625 10.95 13.9725 11.3025 12.45Z" />
        <path
          d="M9 3.75H11.01C12.3975 3.75 13.0425 5.4675 12 6.3825L6.0075 11.625C4.965 12.5325 5.61 14.25 6.99 14.25H9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M4.11466 4.125H4.12333" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.8647 13.125H13.8733" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </IconBase>
  );
}
