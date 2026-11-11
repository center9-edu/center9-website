import { IconBase, type IconProps } from "@/components/shared/icons/icon-base";

export function MinusIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M18 12H6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </IconBase>
  );
}
