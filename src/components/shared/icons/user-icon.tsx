import { IconBase, type IconProps } from "@/components/shared/icons/icon-base";

export function UserIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <g stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z" />
        <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22" />
      </g>
    </IconBase>
  );
}
