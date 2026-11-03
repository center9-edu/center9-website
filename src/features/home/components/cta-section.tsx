import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { TRIAL_CTA } from "@/config/site";
import { cn } from "@/lib/utils";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <Image
        src="/images/home/cta-grid.svg"
        alt=""
        width={1440}
        height={813}
        className="absolute top-0 left-1/2 hidden max-w-none -translate-x-1/2 lg:block"
      />
      <div className="container-page relative py-10 lg:py-9.5">
        <div className="relative flex flex-col overflow-hidden rounded-[40px] bg-navy px-6 pt-12 sm:px-10 lg:min-h-111.5 lg:overflow-visible lg:px-15 lg:py-20">
          <div className="relative z-10 flex flex-col items-start gap-8 lg:max-w-[52%] xl:max-w-none">
            <h2 className="max-w-175 text-3xl/[1.2] font-bold text-white sm:text-[48px]/[1.2]">
              Bắt đầu hành trình công nghệ của con từ hôm nay
            </h2>
            <p className="max-w-156 text-base/[1.6] font-medium text-[#ededed]">
              Đăng ký buổi học thử để con trải nghiệm lập trình và nhận tư vấn lộ trình phù hợp.
            </p>
            <Link
              href={TRIAL_CTA.href}
              className={cn(
                buttonVariants({ variant: "cta" }),
                "h-14 px-8 text-base font-bold text-white",
              )}
            >
              {TRIAL_CTA.label}
            </Link>
          </div>

          {/* Decorations positioned relative to the 1280px-wide Figma card. */}
          <Image
            src="/images/home/cta-arrow.svg"
            alt=""
            width={60}
            height={145}
            className="absolute top-[53px] left-[calc(818/1280*100%)] hidden h-[144.8px] w-[60px] max-w-none -scale-y-100 rotate-[103.03deg] xl:block"
          />
          <Image
            src="/images/home/cta-dot-lg.svg"
            alt=""
            width={46}
            height={46}
            className="absolute top-[322px] left-[calc(962/1280*100%)] z-10 hidden xl:block"
          />
          <Image
            src="/images/home/cta-dot-sm.svg"
            alt=""
            width={28}
            height={28}
            className="absolute top-[290px] left-[calc(1160/1280*100%)] z-10 hidden xl:block"
          />
          <p className="absolute top-[74px] left-[calc(915/1280*100%)] z-10 hidden -rotate-[23.14deg] rounded-full bg-[#ffd86b] px-4 py-2.5 text-xs font-bold text-[#071d3d] xl:block">
            HỌC THỬ MIỄN PHÍ
          </p>
          <Image
            src="/images/home/cta-student.png"
            alt="Bé gái vui vẻ giơ ngón tay cái bên máy tính xách tay"
            width={626}
            height={417}
            sizes="(min-width: 1024px) 626px, 100vw"
            className="relative mt-8 -mr-6 self-end sm:-mr-10 lg:absolute lg:right-0 lg:bottom-0 lg:mt-0 lg:mr-0 lg:w-[calc(626/1280*100%)]"
          />
        </div>
      </div>
    </section>
  );
}
