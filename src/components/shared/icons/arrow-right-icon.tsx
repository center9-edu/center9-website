import { IconBase, type IconProps } from "@/components/shared/icons/icon-base";

export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}
