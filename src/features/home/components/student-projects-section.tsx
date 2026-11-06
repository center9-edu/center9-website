import Image from "next/image";

import { SectionHeading } from "@/features/home/components/section-heading";
import {
  FEATURED_PROJECT,
  STUDENT_PROJECTS,
  type StudentProject,
} from "@/features/home/content";
import { cn } from "@/lib/utils";

export function StudentProjectsSection() {
  return (
    <section className="bg-white">
      <div className="container-page flex flex-col gap-8 py-12 lg:gap-10 lg:pt-17 lg:pb-20">
        <SectionHeading title="Sản phẩm học viên" />
        <div className="grid gap-6 lg:grid-cols-[848fr_412fr] lg:gap-4">
          <figure className="flex flex-col gap-2 lg:gap-6">
            <ProjectImage
              project={FEATURED_PROJECT}
              featured
              sizes="(min-width: 1024px) 848px, 100vw"
            />
            <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-2 py-2 text-2xl/[1.4] font-medium text-navy lg:py-6 lg:text-4xl/[1.4]">
              <span className="border-b border-[#f0f0f0]">{FEATURED_PROJECT.title}</span>
              <span className="text-base font-medium text-ink-muted italic">của</span>
              <span className="flex items-center gap-2">
                {FEATURED_PROJECT.authorAvatar ? (
                  <Image
                    src={FEATURED_PROJECT.authorAvatar}
                    alt=""
                    width={50}
                    height={50}
                    className="size-10 rounded-full lg:size-12.5"
                  />
                ) : null}
                {FEATURED_PROJECT.author}
              </span>
            </figcaption>
          </figure>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:content-start lg:gap-5.75">
            {STUDENT_PROJECTS.map((project) => (
              <figure key={project.title} className="flex flex-col gap-4">
                <ProjectImage project={project} sizes="(min-width: 1024px) 412px, (min-width: 640px) 50vw, 100vw" />
                <figcaption className="flex flex-wrap items-center gap-3 text-xl/[25px] font-semibold tracking-[-0.2px] text-[#101828]">
                  {project.title}
                  <span className="text-base/[1.4] font-medium tracking-normal text-ink-muted italic">
                    của
                  </span>
                  {project.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type ProjectImageProps = {
  project: StudentProject;
  sizes: string;
  /** The large showcase image uses the wider Figma ratio. */
  featured?: boolean;
};

// Hovering reveals the dark overlay with the project name (Figma "item showcase" on state).
function ProjectImage({ project, sizes, featured = false }: ProjectImageProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[20px] bg-[#808080]",
        featured ? "aspect-[848/568]" : "aspect-[412/288]",
      )}
    >
      <Image
        src={project.image}
        alt={`Sản phẩm ${project.title} của ${project.author}`}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-b from-black/16 to-black/80 p-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {project.category ? (
          <span className="text-[17px]/[22px] font-medium tracking-[-0.24px]">
            {project.category}
          </span>
        ) : null}
        <span className="text-[22px]/7 font-semibold tracking-[-0.2px]">{project.title}</span>
      </div>
    </div>
  );
}
