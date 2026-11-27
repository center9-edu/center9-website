"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Header link that turns white and sets aria-current on its own page. */
export function NavLink({ href, className, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const isActive = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(className, isActive && "text-white")}
      {...props}
    />
  );
}
