import { IconBase, type IconProps } from "@/components/shared/icons/icon-base";

export function PlusIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M12 6V12M12 12V18M12 12H18M12 12L6 12"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}
