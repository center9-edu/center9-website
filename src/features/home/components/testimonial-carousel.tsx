"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Testimonial } from "@/features/home/content";
import { cn } from "@/lib/utils";

// From `xl` all four cards fit, so Embla is turned off and the controls are hidden.
const CAROUSEL_OPTIONS = {
  align: "start",
  breakpoints: { "(min-width: 1280px)": { active: false } },
} as const;

const ARROW_CLASS =
  "hidden size-14.5 border-0 bg-white shadow-[0px_8px_20px_0px_rgba(13,31,64,0.08)] hover:bg-muted sm:flex xl:hidden [&_svg:not([class*='size-'])]:size-6";

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [snapCount, setSnapCount] = useState(0);
  const [selectedSnap, setSelectedSnap] = useState(0);

  // Embla is an external system; its snap list changes on resize (`reInit`).
  useEffect(() => {
    if (!api) return;

    const update = () => {
      setSnapCount(api.scrollSnapList().length);
      setSelectedSnap(api.selectedScrollSnap());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <div className="w-full">
      <Carousel
        opts={CAROUSEL_OPTIONS}
        setApi={setApi}
        aria-label="Cảm nhận của phụ huynh và học viên"
        className="w-full sm:px-20.5 xl:px-0"
      >
        {/* Vertical padding leaves room for the card shadow inside Embla's overflow-hidden viewport. */}
        <CarouselContent className="-ml-6 py-6">
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="basis-[min(299px,100%)] pl-6 xl:basis-1/4">
              <figure className="flex h-full min-h-105 flex-col items-center gap-4.5 rounded-[28px] bg-white px-7.5 py-8.5 text-center shadow-[0px_10px_12px_0px_rgba(15,26,64,0.06)]">
                <Image
                  src={testimonial.portrait}
                  alt=""
                  width={128}
                  height={128}
                  className="size-32 rounded-full"
                />
                <figcaption className="flex flex-col items-center gap-2.5">
                  <span className="text-[23px]/[1.4] font-bold text-[#050d33]">
                    {testimonial.name}
                  </span>
                  <span className="text-base/[1.4] text-[#6176a0]">{testimonial.role}</span>
                </figcaption>
                <span aria-hidden className="h-px w-53.75 rounded-[1px] bg-[#e5ebf5]" />
                <blockquote className="text-base/[1.4] text-[#404557]">
                  {testimonial.quote}
                </blockquote>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={cn(ARROW_CLASS, "left-0")} />
        <CarouselNext className={cn(ARROW_CLASS, "right-0")} />
      </Carousel>

      {snapCount > 1 ? (
        <div className="mt-2 flex justify-center xl:hidden">
          {Array.from({ length: snapCount }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Chuyển tới nhóm đánh giá ${index + 1}`}
              aria-current={index === selectedSnap}
              onClick={() => api?.scrollTo(index)}
              className="group flex size-6 items-center justify-center"
            >
              <span
                className={cn(
                  "size-2.5 rounded-full transition-colors",
                  index === selectedSnap ? "bg-[#1a73e8]" : "bg-[#d0d5dd] group-hover:bg-[#98a2b3]",
                )}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
