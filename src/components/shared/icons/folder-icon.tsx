import { IconBase, type IconProps } from "@/components/shared/icons/icon-base";

export function FolderIcon(props: IconProps) {
  return (
    <IconBase size={18} viewBox="0 0 18 18" {...props}>
      <path
        d="M16.5 8.25V12.75C16.5 15.75 15.75 16.5 12.75 16.5H5.25C2.25 16.5 1.5 15.75 1.5 12.75V5.25C1.5 2.25 2.25 1.5 5.25 1.5H6.375C7.5 1.5 7.7475 1.83 8.175 2.4L9.3 3.9C9.585 4.275 9.75 4.5 10.5 4.5H12.75C15.75 4.5 16.5 5.25 16.5 8.25Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
    </IconBase>
  );
}
