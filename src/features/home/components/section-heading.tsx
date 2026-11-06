import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function SectionHeading({ title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 text-center", className)}>
      <h2 className="text-3xl/[1.4] font-semibold text-navy text-balance lg:text-[44px]/[1.4]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-4xl text-[17px]/[22px] tracking-[-0.24px] text-ink-body text-balance">
          {description}
        </p>
      ) : null}
    </div>
  );
}
