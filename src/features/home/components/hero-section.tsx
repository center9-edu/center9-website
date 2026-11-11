import Image from "next/image";
import Link from "next/link";

import { ArrowCircleRightIcon } from "@/components/shared/icons/arrow-circle-right-icon";
import { CalendarIcon } from "@/components/shared/icons/calendar-icon";
import { CodeIcon } from "@/components/shared/icons/code-icon";
import { FolderIcon } from "@/components/shared/icons/folder-icon";
import { RoutingIcon } from "@/components/shared/icons/routing-icon";
import { TeacherIcon } from "@/components/shared/icons/teacher-icon";
import { buttonVariants } from "@/components/ui/button";
import { TRIAL_CTA } from "@/config/site";
import { cn } from "@/lib/utils";

const BENEFITS = [
  { label: "Tư vấn lộ trình miễn phí", icon: RoutingIcon },
  { label: "Học thử 1:1", icon: FolderIcon },
  { label: "Đánh giá đầu vào", icon: TeacherIcon },
];

export function HeroSection() {
  return (
    <section className="overflow-hidden bg-linear-to-r from-[#fafbff] to-[#ebedff]">
      <div className="container-page grid items-center gap-12 py-12 lg:grid-cols-2 lg:gap-8 lg:py-20 xl:grid-cols-[1fr_minmax(0,680px)]">
        <div className="flex flex-col items-start gap-10 lg:gap-16">
          <div className="flex flex-col items-start gap-6 lg:gap-8">
            <p className="inline-flex items-center gap-2.5 rounded-full bg-[#ebedff] px-4.5 py-2 text-sm/[1.4] font-semibold text-[#00095f] sm:text-base/[1.4]">
              <CodeIcon className="select-none pointer-events-none" />
              LẬP TRÌNH & CÔNG NGHỆ CHO HỌC SINH 7–18 TUỔI
            </p>
            <h1 className="text-3xl/[1.4] font-bold text-balance text-[#00095f] sm:text-[40px]/[1.4] lg:text-[34px]/[1.4] xl:text-[40px]/[1.4]">
              Giúp con tư duy, sáng tạo và làm chủ công nghệ trong thời đại AI.
            </h1>
            <ul className="flex flex-wrap gap-x-6.5 gap-y-3 text-sm/[1.4] text-ink-body">
              {BENEFITS.map((benefit) => (
                <li key={benefit.label} className="flex items-center gap-3">
                  <benefit.icon className="text-primary" />
                  {benefit.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4.5">
            <Link
              href={TRIAL_CTA.href}
              className={cn(
                buttonVariants({ size: "xl" }),
                "h-16 w-57.5 rounded-full bg-brand-blue px-6 font-semibold text-white hover:bg-brand-blue/90",
              )}
            >
              <CalendarIcon className="size-5.5" />
              {TRIAL_CTA.label}
            </Link>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "outline", size: "xl" }),
                "h-16 w-62.5 rounded-full border-[1.5px] border-brand-blue bg-transparent px-6 font-semibold text-brand-blue hover:bg-brand-blue/5 hover:text-brand-blue",
              )}
            >
              Khám phá khóa học
              <ArrowCircleRightIcon className="size-5.5" />
            </Link>
          </div>
        </div>

        {/* Layers and offsets follow the Figma "Hero Visual" frame (680 × 660). */}
        <div className="relative mx-auto aspect-[680/660] w-full max-w-170">
          <div className="absolute inset-0 overflow-hidden rounded-[32px]">
            <div className="absolute top-[-23.85%] left-[-26.8%] size-[129.12%]">
              <Image
                src="/images/home/hero-photo.jpg"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 880px, 130vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute top-[13.18%] left-[-13.68%] h-[86.82%] w-[111.62%] overflow-hidden">
            <div className="relative h-[105.41%] w-full">
              <Image
                src="/images/home/hero-student.png"
                alt="Học sinh vui vẻ học lập trình trên máy tính xách tay"
                fill
                priority
                sizes="(min-width: 1024px) 760px, 112vw"
                className="select-none pointer-events-none object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
