"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import type { NavItem } from "@/config/site";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  items: NavItem[];
  cta: NavItem;
};

export function MobileNav({ items, cta }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Đóng menu" : "Mở menu"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-white/50 focus-visible:outline-none"
      >
        {open ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
      </button>

      <nav
        id="mobile-nav"
        aria-label="Menu chính"
        hidden={!open}
        className="absolute inset-x-0 top-full border-t border-white/10 bg-navy shadow-lg"
      >
        <ul className="container-page flex flex-col py-4">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg font-semibold text-white/60 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-3 sm:hidden">
            <Link
              href={cta.href}
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: "cta", size: "xl" }), "w-full")}
            >
              {cta.label}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
