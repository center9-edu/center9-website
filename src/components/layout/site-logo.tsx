import Image from "next/image";
import Link from "next/link";

import { SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0", className)}>
      <Image
        src="/images/logo.svg"
        alt={SITE_CONFIG.name}
        width={221}
        height={68}
        className="h-full w-auto"
      />
    </Link>
  );
}
