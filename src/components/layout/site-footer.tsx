import { cacheLife } from "next/cache";
import Link from "next/link";

import { SiteLogo } from "@/components/layout/site-logo";
import { FOOTER_LINK_GROUPS, SITE_CONFIG } from "@/config/site";

export async function SiteFooter() {
  "use cache";
  cacheLife("days");

  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-page flex flex-col items-center gap-10 pt-12 pb-10 lg:pt-20">
        <div className="flex w-full flex-col gap-10 border-y border-white/24 py-10 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-6 lg:max-w-md lg:py-4">
            <SiteLogo className="h-20 lg:h-25" />
            <p className="max-w-sm font-medium tracking-[0.01em] text-white/60">
              {SITE_CONFIG.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:flex lg:gap-16">
            {FOOTER_LINK_GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col gap-4">
                <h2 className="text-2xl/9 font-semibold text-white/80">{group.title}</h2>
                <ul className="flex flex-col gap-4.5 font-medium tracking-[0.01em]">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <Link href={link.href} className="transition-colors hover:text-white/70">
                          {link.label}
                        </Link>
                      ) : (
                        <span>{link.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center font-medium tracking-[0.01em]">
          Hotline:{" "}
          <a
            href={`tel:${SITE_CONFIG.hotline.replaceAll(" ", "")}`}
            className="transition-colors hover:text-white/70"
          >
            {SITE_CONFIG.hotline}
          </a>{" "}
          - Thời gian hỗ trợ: {SITE_CONFIG.supportHours}
        </p>
        <p className="text-center font-medium tracking-[0.01em] text-white/40">
          © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
