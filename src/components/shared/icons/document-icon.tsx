import { IconBase, type IconProps } from "@/components/shared/icons/icon-base";

export function DocumentIcon(props: IconProps) {
  return (
    <IconBase size={28} viewBox="0 0 28 28" {...props}>
      <g stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M11.6667 7H16.3333C18.6667 7 18.6667 5.83333 18.6667 4.66667C18.6667 2.33333 17.5 2.33333 16.3333 2.33333H11.6667C10.5 2.33333 9.33333 2.33333 9.33333 4.66667C9.33333 7 10.5 7 11.6667 7Z" />
        <path d="M18.6667 4.69C22.5517 4.9 24.5 6.335 24.5 11.6667V18.6667C24.5 23.3333 23.3333 25.6667 17.5 25.6667H10.5C4.66667 25.6667 3.5 23.3333 3.5 18.6667V11.6667C3.5 6.34667 5.44833 4.9 9.33333 4.69" />
      </g>
    </IconBase>
  );
}
