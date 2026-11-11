import { IconBase, type IconProps } from "@/components/shared/icons/icon-base";

export function ArrowLeftIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M15 19.92L8.48 13.4C7.71 12.63 7.71 11.37 8.48 10.6L15 4.08"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}
