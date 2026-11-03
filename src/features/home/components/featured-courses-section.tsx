import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { TRIAL_CTA } from "@/config/site";
import { SectionHeading } from "@/features/home/components/section-heading";
import { FEATURED_COURSES } from "@/features/home/content";
import { cn } from "@/lib/utils";

const COURSE_BUTTON = "h-14 flex-1 rounded-full border-2 border-primary text-base font-bold";

export function FeaturedCoursesSection() {
  return (
    <section className="overflow-hidden bg-[#eff4ff]">
      <div className="container-page flex flex-col gap-8 py-12 lg:py-20">
        <SectionHeading
          title="Các khóa học nổi bật"
          description="Từ những dự án đầu tiên với Scratch đến Python, Web và AI, mỗi chương trình là một bước trong hành trình phát triển của học viên."
        />
        <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0">
          {FEATURED_COURSES.map((course) => (
            <li
              key={course.title}
              className="relative flex w-[85%] max-w-104 shrink-0 snap-start flex-col gap-4 rounded-xl bg-white px-4 pt-4 pb-6"
            >
              <Image
                src={course.image}
                alt=""
                width={384}
                height={206}
                sizes="384px"
                className="aspect-[384/206] w-full rounded-xl object-cover"
              />
              <div>
                <h3 className="text-2xl/10 font-semibold text-navy">{course.title}</h3>
                <p className="text-base/7 text-ink-muted">{course.tagline}</p>
              </div>
              <ul className="list-disc ps-6 text-base/7 text-navy">
                {course.details.map((detail) => (
                  <li key={detail.label}>
                    <span className="text-ink-muted">{detail.label}:</span> {detail.value}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex gap-4">
                <Link
                  href={course.href}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    COURSE_BUTTON,
                    "bg-transparent text-primary hover:bg-primary/5 hover:text-primary",
                  )}
                >
                  Xem chi tiết
                  <span className="sr-only"> khóa {course.title}</span>
                </Link>
                <Link
                  href={TRIAL_CTA.href}
                  className={cn(buttonVariants(), COURSE_BUTTON, "hover:bg-primary/90")}
                >
                  Đăng kí ngay
                  <span className="sr-only"> khóa {course.title}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
