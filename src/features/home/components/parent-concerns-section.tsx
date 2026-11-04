import Image from "next/image";

import { PARENT_CONCERNS } from "@/features/home/content";
import { SectionHeading } from "@/features/home/components/section-heading";
import { cn } from "@/lib/utils";

export function ParentConcernsSection() {
  return (
    <section className="bg-[#fbfbfd]">
      <div className="container-page flex flex-col items-center gap-8 py-12 select-none lg:py-20">
        <SectionHeading
          title={
            <>
              Ba mẹ đang băn khoăn điều gì <br className="hidden sm:inline" />
              khi con lớn lên cùng AI?
            </>
          }
          description="Công nghệ mở ra nhiều cơ hội, nhưng đâu là cách tiếp cận phù hợp cho con?"
        />
        <ul className="grid w-full gap-5 md:grid-cols-2">
          {PARENT_CONCERNS.map((concern) => (
            <li
              key={concern.number}
              className="flex items-center gap-4 rounded-3xl bg-white px-4 py-5 drop-shadow-[0px_10px_12px_rgba(13,26,64,0.05)] sm:gap-6 sm:px-6.5 sm:py-6 lg:min-h-47.5"
            >
              <div
                className={cn(
                  "relative size-20 shrink-0 overflow-hidden rounded-full sm:size-33.75",
                  concern.imageBg,
                )}
              >
                <div className={cn("absolute", concern.imageInset ?? "inset-0")}>
                  <Image
                    src={concern.image}
                    alt=""
                    fill
                    sizes="135px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="flex items-center gap-3 text-lg/[1.4] font-bold text-navy sm:text-xl/[1.4]">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#f0f2ff] text-lg font-semibold text-primary">
                    {concern.number}
                  </span>
                  {concern.title}
                </h3>
                <p className="max-w-88 text-base/[1.4] text-ink-body">{concern.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
