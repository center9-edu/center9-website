import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteLogo } from "@/components/layout/site-logo";
import { buttonVariants } from "@/components/ui/button";
import { MAIN_NAV, TRIAL_CTA } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-navy text-navy-foreground">
      <div className="container-page relative flex h-18 items-center justify-between gap-6 lg:h-27">
        <SiteLogo className="h-12 lg:h-17" />

        <nav aria-label="Menu chính" className="hidden xl:block">
          <ul className="flex gap-6 text-xl font-semibold tracking-[0.01em] text-white/60">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={TRIAL_CTA.href}
            className={cn(
              buttonVariants({ variant: "cta", size: "xl" }),
              "hidden sm:inline-flex",
            )}
          >
            {TRIAL_CTA.label}
          </Link>
          <MobileNav items={MAIN_NAV} cta={TRIAL_CTA} />
        </div>
      </div>
    </header>
  );
}
