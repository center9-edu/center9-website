import Image from "next/image";

import { SectionHeading } from "@/features/home/components/section-heading";
import { STUDENT_PROJECTS, type StudentProject } from "@/features/home/content";
import { cn } from "@/lib/utils";

// Figma tag colours; Python and Web text are darkened to reach 4.5:1 contrast.
const TAG_TONE_CLASS: Record<StudentProject["tag"]["tone"], string> = {
  game: "bg-[#f0f1ff] text-[#4556a8]",
  python: "bg-[#fff9f0] text-[#b45309]",
  web: "bg-[#f0fff2] text-[#1d7a46]",
};

export function StudentProjectsSection() {
  return (
    <section className="bg-white">
      <div className="container-page flex flex-col gap-8 py-12 lg:py-20">
        <SectionHeading title="Sản phẩm học viên" />
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {STUDENT_PROJECTS.map((project, index) => (
            <li
              key={index}
              className="flex flex-col overflow-hidden rounded-[14px] border border-[#e2e6ec] bg-white shadow-[0px_3px_10px_-3px_rgba(8,26,51,0.12)]"
            >
              <Image
                src={project.image}
                alt={`Sản phẩm ${project.title} của ${project.student.name}`}
                width={307}
                height={235}
                sizes="(min-width: 1280px) 307px, (min-width: 640px) 50vw, 100vw"
                className="aspect-[307/235] w-full object-cover"
              />
              <div className="flex min-h-66.25 flex-1 flex-col items-start gap-5 px-4 py-6">
                <div className="flex w-full items-center gap-3">
                  <Image
                    src={project.student.avatar}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 shrink-0 rounded-full"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px]/5 font-semibold tracking-[-0.16px] text-[#101828]">
                      {project.student.name}
                    </p>
                    <p className="truncate text-[13px]/[18px] font-medium tracking-[-0.08px] text-[#6176a0]">
                      {project.student.course}
                    </p>
                  </div>
                  <p className="shrink-0 text-[13px]/[18px] font-medium tracking-[-0.08px] text-[#6176a0]">
                    {project.student.age} tuổi
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl/[25px] font-semibold tracking-[-0.2px] text-[#101828]">
                    {project.title}
                  </h3>
                  <p className="text-[15px]/5 tracking-[-0.16px] text-ink-body">
                    {project.description}
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-lg px-3 py-1.75 text-[13px]/[18px] font-medium tracking-[-0.08px]",
                    TAG_TONE_CLASS[project.tag.tone],
                  )}
                >
                  {project.tag.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
